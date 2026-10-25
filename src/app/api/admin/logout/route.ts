import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, revokeSessionToken, sessionCookieOptions } from "@/lib/admin/auth";
import { sameOriginRequest } from "@/lib/http/request-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Sign-out (D-088): the session id is revoked server-side, then the
 *  cookie is cleared with the same attributes it was set with. */
export async function POST(req: NextRequest) {
  if (!sameOriginRequest(req)) return NextResponse.json({ ok: false, error: "forbidden-origin" }, { status: 403 });
  await revokeSessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
  const res = NextResponse.redirect(new URL("/admin/leads", req.url), 303);
  res.cookies.set(ADMIN_COOKIE, "", sessionCookieOptions(0));
  return res;
}
