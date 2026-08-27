import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Handles the bare "/" locale redirect and locale cookie (Q4).
 * Content pages themselves are statically generated; the middleware only
 * negotiates and redirects — it never renders content.
 */
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and all static files.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
