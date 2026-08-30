import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

/**
 * Security headers (Q-P3-12 / Amendment 4).
 *
 * Production CSP — every allowance documented:
 * - default-src 'none'        : deny-by-default baseline.
 * - script-src 'self' 'unsafe-inline'
 *     WHY: Next.js App Router streams its framework payload as inline
 *     <script> bootstrap chunks in statically generated HTML. With static
 *     generation (owner priority Q-P3-2) there is no per-request nonce, and
 *     the chunks vary per page so hashes are impractical. This is the ONE
 *     inline allowance; it applies to SCRIPT only because Next requires it.
 *     REMOVABLE LATER: yes — by moving to nonce-based CSP if pages become
 *     dynamically rendered, or when Next ships hash/nonce support for
 *     static output. External script origins remain fully blocked.
 * - style-src 'self' 'unsafe-inline'
 *     WHY: React style attributes and Next's inline critical CSS.
 *     Scope: STYLE only. Low risk with no user-generated content.
 * - img/media/font-src 'self' (+ data: for inline SVG placeholders/favicons)
 * - connect-src 'self'        : the lead API is same-origin; any future
 *     analytics/AI/form provider requires an explicit CSP amendment +
 *     decision-log entry.
 * - frame-src https://www.google.com
 *     WHY (D-050 §27): the owner-directed location map embeds Google
 *     Maps — and ONLY after the visitor explicitly clicks to load it
 *     (LocationMap.tsx). Keyless query embed on the approved address;
 *     no other frames are permitted.
 * - frame-ancestors 'none', object-src 'none', base-uri 'self',
 *   form-action 'self'.
 *
 * Development additions (never applied in production): 'unsafe-eval' for
 * React Refresh/HMR and ws: for the dev socket.
 */
const csp = [
  "default-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "media-src 'self'",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-src https://www.google.com",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
