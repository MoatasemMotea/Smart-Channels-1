import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";
import type { Lead } from "@/types/lead";
import { redis, redisConfigured, redisPipeline } from "@/lib/store/redis";

// Server-only guard (dependency-free): importing this module in a
// client bundle is a build-breaking mistake — fail loudly at runtime.
if (typeof window !== "undefined") {
  throw new Error("leads/store is server-only and must never reach the client bundle");
}

/**
 * LEAD STORE — provider-neutral persistence boundary (§50 · D-050).
 *
 * The application talks ONLY to the LeadStore interface. The default
 * implementation is a local JSON file store (.data/leads.json —
 * gitignored, server-only): fully functional for development and
 * single-instance deployments, transparent and dependency-free.
 *
 * D-088: production uses Upstash Redis (owner decision, Vercel
 * Marketplace) through `RedisLeadStore` — each lead under its own key with
 * a 12-month expiry, indexed by time. The file store remains for local
 * development only. On Vercel without Redis the store is UNAVAILABLE: its
 * filesystem is read-only/ephemeral, so writing would fail or vanish — the
 * intake answers 503 and the form never claims success.
 */
export interface LeadStore {
  create(lead: Lead): Promise<void>;
  list(): Promise<Lead[]>;
  get(leadId: string): Promise<Lead | null>;
  /** Atomically applies `mutate` to the stored lead; null if absent. */
  update(leadId: string, mutate: (lead: Lead) => Lead): Promise<Lead | null>;
}

export function newLeadId(): string {
  // sortable + unguessable: time prefix, 10 random bytes
  return `lead_${Date.now().toString(36)}_${randomBytes(10).toString("hex")}`;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

class FileLeadStore implements LeadStore {
  /** serializes all mutations — last write never clobbers a concurrent one */
  private queue: Promise<unknown> = Promise.resolve();

  private enqueue<T>(job: () => Promise<T>): Promise<T> {
    const next = this.queue.then(job, job);
    this.queue = next.catch(() => {});
    return next;
  }

  private async readAll(): Promise<Lead[]> {
    try {
      const raw = await readFile(DATA_FILE, "utf8");
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Lead[]) : [];
    } catch {
      return [];
    }
  }

  private async writeAll(leads: Lead[]): Promise<void> {
    await mkdir(DATA_DIR, { recursive: true });
    const tmp = `${DATA_FILE}.tmp`;
    await writeFile(tmp, JSON.stringify(leads, null, 2), "utf8");
    await rename(tmp, DATA_FILE); // atomic on the same filesystem
  }

  create(lead: Lead): Promise<void> {
    return this.enqueue(async () => {
      const leads = await this.readAll();
      leads.push(lead);
      await this.writeAll(leads);
    });
  }

  list(): Promise<Lead[]> {
    return this.enqueue(async () => {
      const leads = await this.readAll();
      return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    });
  }

  get(leadId: string): Promise<Lead | null> {
    return this.enqueue(async () => {
      const leads = await this.readAll();
      return leads.find((l) => l.leadId === leadId) ?? null;
    });
  }

  update(leadId: string, mutate: (lead: Lead) => Lead): Promise<Lead | null> {
    return this.enqueue(async () => {
      const leads = await this.readAll();
      const i = leads.findIndex((l) => l.leadId === leadId);
      if (i === -1) return null;
      const updated = mutate(leads[i]!);
      leads[i] = updated;
      await this.writeAll(leads);
      return updated;
    });
  }
}

/** Retention (D-088): 12 months — "[للتأكيد]" in the privacy draft. */
export const LEAD_TTL_SEC = 365 * 24 * 60 * 60;
const LEAD_KEY = (id: string) => `sc:lead:${id}`;
const LEAD_INDEX = "sc:leads";

class RedisLeadStore implements LeadStore {
  async create(lead: Lead): Promise<void> {
    const now = Date.now();
    await redisPipeline([
      ["SET", LEAD_KEY(lead.leadId), JSON.stringify(lead), "EX", LEAD_TTL_SEC],
      ["ZADD", LEAD_INDEX, Date.parse(lead.createdAt) || now, lead.leadId],
      // the index forgets what the keys have already expired
      ["ZREMRANGEBYSCORE", LEAD_INDEX, "-inf", now - LEAD_TTL_SEC * 1000],
    ]);
  }

  async list(): Promise<Lead[]> {
    const ids = await redis<string[]>(["ZRANGE", LEAD_INDEX, 0, -1, "REV"]);
    const out: Lead[] = [];
    for (let i = 0; i < ids.length; i += 100) {
      const chunk = ids.slice(i, i + 100);
      const values = await redis<(string | null)[]>(["MGET", ...chunk.map(LEAD_KEY)]);
      for (const v of values) if (v) out.push(JSON.parse(v) as Lead);
    }
    return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async get(leadId: string): Promise<Lead | null> {
    const v = await redis<string | null>(["GET", LEAD_KEY(leadId)]);
    return v ? (JSON.parse(v) as Lead) : null;
  }

  /** read-modify-write; a single operator console makes conflicts moot */
  async update(leadId: string, mutate: (lead: Lead) => Lead): Promise<Lead | null> {
    const current = await this.get(leadId);
    if (!current) return null;
    const updated = mutate(current);
    await redis(["SET", LEAD_KEY(leadId), JSON.stringify(updated), "KEEPTTL"]);
    return updated;
  }
}

/** thrown by the unavailable store; the intake maps it to 503 */
export class LeadStoreUnavailableError extends Error {
  constructor() {
    super("lead storage is not configured on this deployment (Upstash Redis variables missing)");
  }
}

class UnavailableLeadStore implements LeadStore {
  async create(): Promise<void> {
    throw new LeadStoreUnavailableError();
  }
  async list(): Promise<Lead[]> {
    return [];
  }
  async get(): Promise<Lead | null> {
    return null;
  }
  async update(): Promise<Lead | null> {
    return null;
  }
}

export type LeadStoreKind = "redis" | "file" | "unavailable";

/** which store this deployment uses (pure — reads the environment) */
export function leadStoreKind(): LeadStoreKind {
  if (redisConfigured()) return "redis";
  return process.env.VERCEL ? "unavailable" : "file";
}

/** survives dev hot-reload; one store per server process */
const g = globalThis as unknown as { __scLeadStores?: Partial<Record<LeadStoreKind, LeadStore>> };

export function getLeadStore(): LeadStore {
  const kind = leadStoreKind();
  g.__scLeadStores ??= {};
  return (g.__scLeadStores[kind] ??=
    kind === "redis" ? new RedisLeadStore() : kind === "file" ? new FileLeadStore() : new UnavailableLeadStore());
}
