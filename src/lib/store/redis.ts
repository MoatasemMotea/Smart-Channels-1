// Server-only guard (dependency-free): importing this module in a
// client bundle is a build-breaking mistake — fail loudly at runtime.
if (typeof window !== "undefined") {
  throw new Error("store/redis is server-only and must never reach the client bundle");
}

/**
 * UPSTASH REDIS over its REST API (D-088) — no client library.
 *
 * The owner creates the database in the Vercel Marketplace and links it to
 * the project; Vercel then provides KV_REST_API_URL / KV_REST_API_TOKEN (or
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN). Without them the
 * callers fall back: the local file store and in-memory limits in
 * development, an explicit "storage unavailable" on Vercel — never a fake
 * success.
 *
 * Wire format (Upstash REST): POST <url> with a JSON command array →
 * {"result": …} or {"error": "…"}; POST <url>/pipeline with an array of
 * commands → one such object per command.
 */
export type RedisCommand = (string | number)[];

const TIMEOUT_MS = 5000;

function config(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

export function redisConfigured(): boolean {
  return config() !== null;
}

export class RedisError extends Error {}

async function post(path: string, body: unknown): Promise<unknown> {
  const c = config();
  if (!c) throw new RedisError("redis is not configured");
  const res = await fetch(`${c.url}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new RedisError(`redis http ${res.status}`);
  return res.json();
}

function unwrap(reply: unknown): unknown {
  const r = reply as { result?: unknown; error?: string };
  if (r && typeof r.error === "string") throw new RedisError(r.error);
  return r?.result ?? null;
}

/** one command */
export async function redis<T = unknown>(command: RedisCommand): Promise<T> {
  return unwrap(await post("", command)) as T;
}

/** several commands in one round trip, results in order */
export async function redisPipeline(commands: RedisCommand[]): Promise<unknown[]> {
  if (commands.length === 0) return [];
  const replies = (await post("/pipeline", commands)) as unknown[];
  return replies.map(unwrap);
}
