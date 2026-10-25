import { redis, redisConfigured, redisPipeline } from "@/lib/store/redis";

// Server-only guard (dependency-free): importing this module in a
// client bundle is a build-breaking mistake — fail loudly at runtime.
if (typeof window !== "undefined") {
  throw new Error("leads/rate-limit is server-only and must never reach the client bundle");
}

/**
 * Shared rate limit with progressive lockout (§33 · SEC-3 · D-088).
 *
 * `limit` hits per `windowSec` per key. Going over it locks the key for
 * `lockBaseSec`, doubling with each further lock inside 24 h (the
 * "strikes"), up to `lockMaxSec`. With Upstash Redis configured the
 * counters are shared by every server instance; without it (local
 * development) the same algorithm runs per process in memory.
 */
export interface LimitRule {
  limit: number;
  windowSec: number;
  lockBaseSec: number;
  lockMaxSec: number;
}
export interface LimitResult {
  ok: boolean;
  /** seconds until the key may try again (0 when ok) */
  retryAfter: number;
}

const STRIKE_TTL_SEC = 24 * 60 * 60;
const lockFor = (rule: LimitRule, strikes: number) => Math.min(rule.lockBaseSec * 2 ** Math.max(0, strikes - 1), rule.lockMaxSec);

/* ---- in-memory fallback (one process) ---- */
interface Entry {
  count: number;
  windowEnd: number;
  lockEnd: number;
  strikes: number;
  strikesEnd: number;
}
const memory = new Map<string, Entry>();

function memoryLimit(key: string, rule: LimitRule, now = Date.now()): LimitResult {
  if (memory.size > 10_000) {
    for (const [k, e] of memory) if (e.windowEnd <= now && e.lockEnd <= now && e.strikesEnd <= now) memory.delete(k);
  }
  const e = memory.get(key) ?? { count: 0, windowEnd: 0, lockEnd: 0, strikes: 0, strikesEnd: 0 };
  memory.set(key, e);
  if (e.lockEnd > now) return { ok: false, retryAfter: Math.ceil((e.lockEnd - now) / 1000) };
  if (e.windowEnd <= now) {
    e.count = 0;
    e.windowEnd = now + rule.windowSec * 1000;
  }
  e.count += 1;
  if (e.count <= rule.limit) return { ok: true, retryAfter: 0 };
  if (e.strikesEnd <= now) e.strikes = 0;
  e.strikes += 1;
  e.strikesEnd = now + STRIKE_TTL_SEC * 1000;
  const lock = lockFor(rule, e.strikes);
  e.lockEnd = now + lock * 1000;
  e.count = 0;
  return { ok: false, retryAfter: lock };
}

/* ---- shared (Upstash Redis) ---- */
async function redisLimit(key: string, rule: LimitRule): Promise<LimitResult> {
  const lockKey = `sc:rl:lock:${key}`;
  const countKey = `sc:rl:n:${key}`;
  const [lockTtl, , count] = (await redisPipeline([
    ["PTTL", lockKey],
    ["SET", countKey, 0, "EX", rule.windowSec, "NX"],
    ["INCR", countKey],
  ])) as [number, unknown, number];
  if (lockTtl > 0) return { ok: false, retryAfter: Math.ceil(lockTtl / 1000) };
  if (count <= rule.limit) return { ok: true, retryAfter: 0 };
  const strikesKey = `sc:rl:strikes:${key}`;
  const [strikes] = (await redisPipeline([
    ["INCR", strikesKey],
    ["EXPIRE", strikesKey, STRIKE_TTL_SEC],
  ])) as [number, unknown];
  const lock = lockFor(rule, strikes);
  await redisPipeline([
    ["SET", lockKey, 1, "EX", lock],
    ["DEL", countKey],
  ]);
  return { ok: false, retryAfter: lock };
}

export async function limit(key: string, rule: LimitRule): Promise<LimitResult> {
  if (!redisConfigured()) return memoryLimit(key, rule);
  try {
    return await redisLimit(key, rule);
  } catch (err) {
    // a Redis outage must not open the gate wider than one process allows
    console.error("[rate-limit] redis failure, using the in-memory limit:", err);
    return memoryLimit(key, rule);
  }
}

/** test hook: forget every in-memory counter */
export function resetMemoryLimits(): void {
  memory.clear();
}

/** clears a key's lock and counters (e.g. after a successful sign-in) */
export async function clearLimit(key: string): Promise<void> {
  memory.delete(key);
  if (redisConfigured()) {
    await redis(["DEL", `sc:rl:n:${key}`, `sc:rl:lock:${key}`]).catch(() => undefined);
  }
}

/** Admin sign-in and the public lead intake (D-088 values). */
export const LOGIN_RULE: LimitRule = { limit: 5, windowSec: 15 * 60, lockBaseSec: 15 * 60, lockMaxSec: 24 * 60 * 60 };
export const LEADS_RULE: LimitRule = { limit: 5, windowSec: 10 * 60, lockBaseSec: 10 * 60, lockMaxSec: 24 * 60 * 60 };
