import { createHash, createHmac, timingSafeEqual } from "node:crypto";

// Server-only guard (dependency-free): importing this module in a
// client bundle is a build-breaking mistake — fail loudly at runtime.
if (typeof window !== "undefined") {
  throw new Error("admin/auth is server-only and must never reach the client bundle");
}

/**
 * ADMIN AUTH (§28 · D-050) — real authentication, no fake gate.
 *
 * Credential: the ADMIN_PASSWORD environment variable — set by the
 * operator at deploy time, NEVER committed (§50). While it is unset
 * the console renders an explicit locked state; nothing is bypassable.
 *
 * Session: an HMAC-signed, httpOnly cookie carrying only an expiry
 * timestamp — `exp.HMAC_SHA256(secret, exp)`. The signing secret is
 * ADMIN_SESSION_SECRET when provided, otherwise derived from the
 * password (restarting with a changed password invalidates sessions —
 * the right failure mode). Comparisons are constant-time.
 */
export const ADMIN_COOKIE = "sc_admin";
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret(): Buffer {
  const s = process.env.ADMIN_SESSION_SECRET || `sc-admin:${process.env.ADMIN_PASSWORD ?? ""}`;
  return createHash("sha256").update(s).digest();
}

function sign(exp: string): string {
  return createHmac("sha256", secret()).update(exp).digest("hex");
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function createSessionToken(now = Date.now()): string {
  const exp = String(now + SESSION_TTL_MS);
  return `${exp}.${sign(exp)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!adminConfigured() || !token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const exp = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  if (mac.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(mac, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}
