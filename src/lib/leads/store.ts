import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";
import type { Lead } from "@/types/lead";

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
 * ARCHITECTED-NEEDS-PROVIDER: a production deployment on serverless or
 * multi-instance infrastructure needs a durable store (the owner
 * decides the provider — see the report's decision matrix). Swapping =
 * implement LeadStore against the chosen service and return it from
 * getLeadStore(). No API-route or UI changes.
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

/** survives dev hot-reload; one store per server process */
const g = globalThis as unknown as { __scLeadStore?: LeadStore };

export function getLeadStore(): LeadStore {
  g.__scLeadStore ??= new FileLeadStore();
  return g.__scLeadStore;
}
