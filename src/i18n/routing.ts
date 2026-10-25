import { defineRouting } from "next-intl/routing";

/**
 * Locale routing (Q1/Q4 · D-088): explicit /en and /ar canonical routes.
 * Bare "/": preference cookie (set when the visitor uses the language
 * switcher) → /ar. Arabic is the default (D-088, SEO-7); the middleware
 * withholds Accept-Language so the browser language no longer picks /en,
 * while an explicit choice still persists across visits.
 */
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "ar",
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
