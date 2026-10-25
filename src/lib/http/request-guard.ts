import { siteUrl } from "@/lib/seo";

// Server-only guard (dependency-free): importing this module in a
// client bundle is a build-breaking mistake — fail loudly at runtime.
if (typeof window !== "undefined") {
  throw new Error("http/request-guard is server-only and must never reach the client bundle");
}

/**
 * Request guards for the API routes (D-088 · SEC-3 / SEC-11).
 */

/**
 * The client IP for rate limiting. On Vercel the platform sets
 * x-vercel-forwarded-for / x-real-ip (and rewrites x-forwarded-for), so
 * the value cannot be chosen by the visitor. Anywhere else a raw
 * x-forwarded-for is client-controlled and is NOT trusted: those requests
 * share one bucket.
 */
export function clientIp(req: Request): string {
  const h = req.headers;
  const platform = h.get("x-vercel-forwarded-for") ?? h.get("x-real-ip");
  if (platform) return platform.split(",")[0]!.trim();
  if (process.env.VERCEL) {
    const fwd = h.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0]!.trim();
  }
  return "local";
}

/**
 * State-changing requests must come from this site: the Origin header has
 * to be present and name this host — the Host the browser addressed (a
 * cross-site page cannot change it), the request URL's own origin, or the
 * configured site origin. `next start` reports req.url as "localhost"
 * whatever the visitor typed, hence the Host comparison. GETs carry no
 * Origin on navigation, so they are judged by Sec-Fetch-Site instead:
 * "cross-site" is refused.
 */
export function sameOriginRequest(req: Request): boolean {
  if (req.method === "GET" || req.method === "HEAD") {
    return req.headers.get("sec-fetch-site") !== "cross-site";
  }
  const origin = req.headers.get("origin");
  if (!origin) return false;
  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }
  if (originUrl.origin === new URL(req.url).origin || originUrl.origin === siteUrl().origin) return true;
  const host = req.headers.get("host");
  return host !== null && originUrl.host === host.toLowerCase() && /^https?:$/.test(originUrl.protocol);
}

/** the media type only, lower-cased (parameters such as charset dropped) */
export function mediaType(req: Request): string {
  return (req.headers.get("content-type") ?? "").split(";")[0]!.trim().toLowerCase();
}

/** a declared body over `max` bytes is refused before anything is read */
export function declaredTooLarge(req: Request, max: number): boolean {
  const len = Number(req.headers.get("content-length") ?? "0");
  return Number.isFinite(len) && len > max;
}

/**
 * Reads the body as text but stops at `max` bytes — a body without (or
 * lying about) its content-length still cannot exhaust memory.
 * Returns null when the cap is exceeded.
 */
export async function readTextCapped(req: Request, max: number): Promise<string | null> {
  if (!req.body) return "";
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}
