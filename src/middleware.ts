import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

/**
 * Handles the bare "/" locale redirect and locale cookie (Q4).
 * Content pages themselves are statically generated; the middleware only
 * negotiates and redirects — it never renders content.
 *
 * D-088 (SEO-7): every new visitor lands on /ar (defaultLocale), whatever
 * the browser language; an explicit choice — the locale cookie — still
 * wins. next-intl's `localeDetection: false` would ignore that cookie too,
 * so detection stays on and only the Accept-Language header is withheld.
 */
const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.delete("accept-language");
  return intl(new NextRequest(req, { headers }));
}

export const config = {
  // Skip Next internals, API routes, the non-localized admin console
  // (D-050 §28) and all static files.
  matcher: "/((?!api|admin|_next|_vercel|.*\\..*).*)",
};
