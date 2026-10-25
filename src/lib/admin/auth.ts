import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { redis, redisConfigured } from "@/lib/store/redis";

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
 * Session: an HMAC-signed, httpOnly, sameSite=strict cookie —
 * `exp.sid.HMAC_SHA256(secret, exp.sid)`, where `sid` is a random session
 * id. With Upstash Redis configured (D-088 · SEC-11) the sid is also
 * registered server-side for the session's lifetime and deleted at
 * sign-out, so a copied cookie stops working the moment its owner signs
 * out; a Redis failure fails closed. Without Redis (local development)
 * the token is checked statelessly, as before. The signing secret is
 * ADMIN_SESSION_SECRET when provided, otherwise derived from the password
 * (changing the password invalidates every session). Comparisons are
 * constant-time.
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

const SESSION_KEY = (sid: string) => `sc:session:${sid}`;

/** a fresh signed token; its sid is registered in Redis when configured */
export async function createSessionToken(now = Date.now()): Promise<string> {
  const exp = String(now + SESSION_TTL_MS);
  const sid = randomBytes(16).toString("hex");
  if (redisConfigured()) {
    await redis(["SET", SESSION_KEY(sid), 1, "EX", Math.ceil(SESSION_TTL_MS / 1000)]);
  }
  const body = `${exp}.${sid}`;
  return `${body}.${sign(body)}`;
}

/** signature and expiry only — the sid, or null when the token is not ours */
function parseToken(token: string | undefined): { sid: string } | null {
  if (!adminConfigured() || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [exp, sid, mac] = parts as [string, string, string];
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now() || !/^[0-9a-f]{32}$/.test(sid)) return null;
  const expected = sign(`${exp}.${sid}`);
  if (mac.length !== expected.length) return null;
  try {
    return timingSafeEqual(Buffer.from(mac, "utf8"), Buffer.from(expected, "utf8")) ? { sid } : null;
  } catch {
    return null;
  }
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const parsed = parseToken(token);
  if (!parsed) return false;
  if (!redisConfigured()) return true;
  try {
    return (await redis<number>(["EXISTS", SESSION_KEY(parsed.sid)])) === 1;
  } catch {
    return false; // fail closed
  }
}

/** sign-out: the session id stops being valid everywhere */
export async function revokeSessionToken(token: string | undefined): Promise<void> {
  const parsed = parseToken(token);
  if (!parsed || !redisConfigured()) return;
  await redis(["DEL", SESSION_KEY(parsed.sid)]).catch(() => undefined);
}

/** cookie attributes shared by sign-in and sign-out (D-088: strict) */
export function sessionCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSec,
  };
}
