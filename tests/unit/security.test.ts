import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { csvCell } from "@/lib/leads/csv";
import { LOGIN_RULE, limit, resetMemoryLimits } from "@/lib/leads/rate-limit";
import { createSessionToken, revokeSessionToken, verifySessionToken } from "@/lib/admin/auth";
import { LEAD_TTL_SEC, LeadStoreUnavailableError, getLeadStore, leadStoreKind } from "@/lib/leads/store";
import type { Lead } from "@/types/lead";

/**
 * D-088 security units (SEC-3 · SEC-4 · SEC-5 · SEC-11). Redis is never
 * contacted: `fetch` is replaced by a small in-memory stand-in that speaks
 * the Upstash REST wire format for exactly the commands the site sends.
 */

type Val = { v: string; exp: number | null };

function fakeUpstash() {
  const kv = new Map<string, Val>();
  const zsets = new Map<string, Map<string, number>>();
  const calls: unknown[][] = [];
  const live = (k: string) => {
    const e = kv.get(k);
    if (e && e.exp !== null && e.exp <= Date.now()) kv.delete(k);
    return kv.get(k);
  };
  const run = (cmd: unknown[]): unknown => {
    calls.push(cmd);
    const [op, ...a] = cmd.map(String);
    const k = a[0]!;
    switch (op!.toUpperCase()) {
      case "SET": {
        const opts = a.slice(2).map((s) => s.toUpperCase());
        if (opts.includes("NX") && live(k)) return null;
        const exIdx = opts.indexOf("EX");
        const keep = opts.includes("KEEPTTL") ? (live(k)?.exp ?? null) : null;
        kv.set(k, { v: a[1]!, exp: exIdx >= 0 ? Date.now() + Number(a[2 + exIdx + 1]) * 1000 : keep });
        return "OK";
      }
      case "GET":
        return live(k)?.v ?? null;
      case "MGET":
        return a.map((x) => live(x)?.v ?? null);
      case "INCR": {
        const e = live(k);
        const n = Number(e?.v ?? 0) + 1;
        kv.set(k, { v: String(n), exp: e?.exp ?? null });
        return n;
      }
      case "EXPIRE": {
        const e = live(k);
        if (!e) return 0;
        e.exp = Date.now() + Number(a[1]) * 1000;
        return 1;
      }
      case "PTTL": {
        const e = live(k);
        if (!e) return -2;
        return e.exp === null ? -1 : e.exp - Date.now();
      }
      case "EXISTS":
        return a.filter((x) => live(x)).length;
      case "DEL":
        return a.filter((x) => kv.delete(x)).length;
      case "ZADD": {
        const z = zsets.get(k) ?? new Map<string, number>();
        z.set(a[2]!, Number(a[1]));
        zsets.set(k, z);
        return 1;
      }
      case "ZREMRANGEBYSCORE": {
        const z = zsets.get(k);
        if (!z) return 0;
        let n = 0;
        for (const [m, s] of z) if (s <= Number(a[2])) (z.delete(m), n++);
        return n;
      }
      case "ZRANGE": {
        const z = [...(zsets.get(k) ?? new Map<string, number>())].sort((x, y) => x[1] - y[1]).map(([m]) => m);
        return a.map((s) => s.toUpperCase()).includes("REV") ? z.reverse() : z;
      }
      default:
        return { __error: `unsupported ${op}` };
    }
  };
  const reply = (r: unknown) =>
    r && typeof r === "object" && "__error" in r ? { error: (r as { __error: string }).__error } : { result: r };
  const fetchMock = vi.fn(async (url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body)) as unknown[];
    const out = url.endsWith("/pipeline") ? (body as unknown[][]).map((c) => reply(run(c))) : reply(run(body));
    return new Response(JSON.stringify(out), { status: 200, headers: { "content-type": "application/json" } });
  });
  return { kv, zsets, calls, fetchMock };
}

const ENV_KEYS = ["KV_REST_API_URL", "KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "VERCEL", "ADMIN_PASSWORD"];
const saved: Record<string, string | undefined> = {};

beforeEach(() => {
  for (const k of ENV_KEYS) {
    saved[k] = process.env[k];
    delete process.env[k];
  }
  resetMemoryLimits();
});
afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function withRedis() {
  const fake = fakeUpstash();
  process.env.KV_REST_API_URL = "https://fake-upstash.invalid";
  process.env.KV_REST_API_TOKEN = "test-token";
  vi.stubGlobal("fetch", fake.fetchMock);
  return fake;
}

describe("CSV export neutralises formulas (SEC-4)", () => {
  it("prefixes cells that a spreadsheet would evaluate", () => {
    for (const s of ["=HYPERLINK(\"http://x\")", "+1+1", "-2+3", "@SUM(A1)", "\tcmd", "\rcmd"]) {
      expect(csvCell(s)).toBe(`"'${s.replace(/"/g, '""')}"`);
    }
  });
  it("quotes and escapes ordinary values, keeps empty ones empty", () => {
    expect(csvCell('Acme "Ltd", Riyadh')).toBe('"Acme ""Ltd"", Riyadh"');
    expect(csvCell("محمد")).toBe('"محمد"');
    expect(csvCell(null)).toBe('""');
    expect(csvCell(undefined)).toBe('""');
    expect(csvCell(42)).toBe('"42"');
  });
});

describe("progressive lockout (SEC-3)", () => {
  const rule = { limit: 2, windowSec: 60, lockBaseSec: 60, lockMaxSec: 200 };

  async function exhaust(key: string) {
    let last = await limit(key, rule);
    for (let i = 0; i < rule.limit + 1; i++) last = await limit(key, rule);
    return last;
  }

  for (const mode of ["memory", "redis"] as const) {
    it(`doubles the lock with each strike and caps it (${mode})`, async () => {
      vi.useFakeTimers({ now: new Date("2026-10-25T10:00:00Z"), toFake: ["Date"] });
      if (mode === "redis") withRedis();
      const key = `t:${mode}`;
      expect((await limit(key, rule)).ok).toBe(true);
      expect((await limit(key, rule)).ok).toBe(true);
      const first = await limit(key, rule);
      expect(first).toEqual({ ok: false, retryAfter: 60 });
      // still locked: attempts are refused without extending anything
      expect((await limit(key, rule)).ok).toBe(false);

      vi.setSystemTime(Date.now() + 61_000);
      expect(await exhaust(key)).toEqual({ ok: false, retryAfter: 120 });
      vi.setSystemTime(Date.now() + 121_000);
      expect(await exhaust(key)).toEqual({ ok: false, retryAfter: 200 }); // 240 capped at 200
    });
  }

  it("keeps separate keys apart and uses the approved login rule", async () => {
    for (let i = 0; i < LOGIN_RULE.limit; i++) expect((await limit("ip:a", LOGIN_RULE)).ok).toBe(true);
    expect((await limit("ip:a", LOGIN_RULE)).ok).toBe(false);
    expect((await limit("ip:b", LOGIN_RULE)).ok).toBe(true);
  });

  it("falls back to the in-memory limit when Redis fails", async () => {
    process.env.KV_REST_API_URL = "https://fake-upstash.invalid";
    process.env.KV_REST_API_TOKEN = "t";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("down", { status: 503 })));
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    for (let i = 0; i < rule.limit; i++) expect((await limit("t:down", rule)).ok).toBe(true);
    expect((await limit("t:down", rule)).ok).toBe(false);
  });
});

describe("admin session revocation (SEC-11)", () => {
  it("a token stops working everywhere after sign-out", async () => {
    process.env.ADMIN_PASSWORD = "correct horse";
    const fake = withRedis();
    const token = await createSessionToken();
    expect(await verifySessionToken(token)).toBe(true);
    expect([...fake.kv.keys()].some((k) => k.startsWith("sc:session:"))).toBe(true);

    await revokeSessionToken(token);
    expect(await verifySessionToken(token)).toBe(false);
    expect([...fake.kv.keys()].some((k) => k.startsWith("sc:session:"))).toBe(false);
  });

  it("fails closed when Redis cannot answer", async () => {
    process.env.ADMIN_PASSWORD = "correct horse";
    withRedis();
    const token = await createSessionToken();
    vi.stubGlobal("fetch", vi.fn(async () => new Response("down", { status: 500 })));
    expect(await verifySessionToken(token)).toBe(false);
  });

  it("rejects tampered and expired tokens", async () => {
    process.env.ADMIN_PASSWORD = "correct horse";
    const token = await createSessionToken();
    expect(await verifySessionToken(token)).toBe(true); // stateless without Redis
    const [exp, sid, mac] = token.split(".");
    expect(await verifySessionToken(`${Number(exp) + 1}.${sid}.${mac}`)).toBe(false);
    expect(await verifySessionToken(await createSessionToken(Date.now() - 9 * 60 * 60 * 1000))).toBe(false);
    expect(await verifySessionToken(undefined)).toBe(false);
  });
});

describe("lead store selection (SEC-5)", () => {
  const lead = (id: string, createdAt: string) =>
    ({ leadId: id, createdAt, name: "Test", email: "t@example.com", message: "m", status: "NEW", source: "contact-form" }) as unknown as Lead;

  it("uses the local file store in development", () => {
    expect(leadStoreKind()).toBe("file");
  });

  it("refuses to store on Vercel without Redis — never a fake success", async () => {
    process.env.VERCEL = "1";
    expect(leadStoreKind()).toBe("unavailable");
    await expect(getLeadStore().create(lead("lead_x", new Date().toISOString()))).rejects.toBeInstanceOf(
      LeadStoreUnavailableError,
    );
  });

  it("stores leads in Redis with the 12-month TTL, newest first", async () => {
    process.env.VERCEL = "1";
    const fake = withRedis();
    expect(leadStoreKind()).toBe("redis");
    const store = getLeadStore();
    await store.create(lead("lead_a", "2026-10-24T10:00:00.000Z"));
    await store.create(lead("lead_b", "2026-10-25T10:00:00.000Z"));
    expect((await store.list()).map((l) => l.leadId)).toEqual(["lead_b", "lead_a"]);

    const set = fake.calls.find((c) => c[0] === "SET" && c[1] === "sc:lead:lead_a")!;
    expect(set.slice(3)).toEqual(["EX", LEAD_TTL_SEC]);
    expect(LEAD_TTL_SEC).toBe(365 * 24 * 60 * 60);

    const updated = await store.update("lead_a", (l) => ({ ...l, status: "CONTACTED" }));
    expect(updated?.status).toBe("CONTACTED");
    expect(fake.calls.at(-1)).toEqual(["SET", "sc:lead:lead_a", JSON.stringify(updated), "KEEPTTL"]);
    expect(fake.kv.get("sc:lead:lead_a")?.exp).not.toBeNull(); // TTL kept
  });
});
