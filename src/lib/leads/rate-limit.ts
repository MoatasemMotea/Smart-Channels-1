// Server-only guard (dependency-free): importing this module in a
// client bundle is a build-breaking mistake — fail loudly at runtime.
if (typeof window !== "undefined") {
  throw new Error("leads/rate-limit is server-only and must never reach the client bundle");
}


/**
 * Fixed-window in-memory rate limiter (§33 anti-spam · D-050).
 *
 * Per-process and dependency-free — honest about its scope: on a
 * single-instance deployment it genuinely bounds abuse; multi-instance
 * production should back this with a shared store (same provider
 * decision as the lead store). The API stays identical.
 */
interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

/** allows `limit` hits per `windowMs` per key; prunes expired windows */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (windows.size > 10_000) {
    for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
  }
  const w = windows.get(key);
  if (!w || w.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  w.count += 1;
  return w.count <= limit;
}
