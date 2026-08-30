import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_TTL_MS,
  adminConfigured,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin/auth";
import { rateLimit } from "@/lib/leads/rate-limit";

/** Admin sign-in (§28): constant-time check, rate-limited, HMAC cookie. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return `admin-login:${fwd ? fwd.split(",")[0]!.trim() : "local"}`;
}

export async function POST(req: NextRequest) {
  const to = (q: string) => NextResponse.redirect(new URL(`/admin/leads${q}`, req.url), 303);

  if (!adminConfigured()) return to("");
  if (!rateLimit(clientKey(req), 5, 15 * 60 * 1000)) return to("?error=rate");

  const form = await req.formData().catch(() => null);
  const password = String(form?.get("password") ?? "");
  if (!password || !verifyPassword(password)) return to("?error=auth");

  const res = to("");
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
  return res;
}
