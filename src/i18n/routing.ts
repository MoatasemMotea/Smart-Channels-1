import { defineRouting } from "next-intl/routing";

/**
 * Locale routing (Q1/Q4): explicit /en and /ar canonical routes.
 * Detection on bare "/": preference cookie (set when the visitor uses the
 * language switcher) → Accept-Language (Arabic-preferred → /ar) → /en.
 * next-intl implements exactly this priority via its locale cookie +
 * accept-language negotiation; an explicit choice persists and is never
 * overridden by detection on later visits.
 */
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    // Long-lived so an explicit choice keeps winning on future visits (Q4).
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type AppLocale = (typeof routing.locales)[number];

export function isRtl(locale: string): boolean {
  return locale === "ar";
}
