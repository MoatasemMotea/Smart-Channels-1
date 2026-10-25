import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_TTL_MS,
  adminConfigured,
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/admin/auth";
import { LOGIN_RULE, clearLimit, limit } from "@/lib/leads/rate-limit";
import { clientIp, declaredTooLarge, mediaType, sameOriginRequest } from "@/lib/http/request-guard";

/**
 * Admin sign-in (§28 · D-088): same-origin form posts only, 64 KB cap
 * before reading, shared rate limit with progressive lockout,
 * constant-time check, revocable sameSite=strict session cookie.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64 * 1024;
const FORM_TYPES = new Set(["application/x-www-form-urlencoded", "multipart/form-data"]);

export async function POST(req: NextRequest) {
  const to = (q: string) => NextResponse.redirect(new URL(`/admin/leads${q}`, req.url), 303);

  if (!sameOriginRequest(req)) return NextResponse.json({ ok: false, error: "forbidden-origin" }, { status: 403 });
  if (!FORM_TYPES.has(mediaType(req))) return NextResponse.json({ ok: false, error: "unsupported-media-type" }, { status: 415 });
  if (declaredTooLarge(req, MAX_BODY_BYTES)) return NextResponse.json({ ok: false, error: "too-large" }, { status: 413 });

  if (!adminConfigured()) return to("");
  const key = `admin-login:${clientIp(req)}`;
  if (!(await limit(key, LOGIN_RULE)).ok) return to("?error=rate");

  const form = await req.formData().catch(() => null);
  const password = String(form?.get("password") ?? "");
  if (!password || !verifyPassword(password)) return to("?error=auth");

  await clearLimit(key);
  const res = to("");
  res.cookies.set(ADMIN_COOKIE, await createSessionToken(), sessionCookieOptions(Math.floor(SESSION_TTL_MS / 1000)));
  return res;
}
