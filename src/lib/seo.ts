import type { Metadata } from "next";
import type { Locale } from "@/types/content";

/**
 * Indexing gate (Q-P3-11): everything is noindex unless the authorized
 * production deployment explicitly sets NEXT_PUBLIC_ALLOW_INDEXING=true.
 * A preview/test deployment can therefore never leak into search engines.
 */
export function indexingAllowed(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export const SITE_NAME = "Smart Channels";

/** hreflang alternates for a route path (without locale prefix). */
export function localeAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const p = path === "/" ? "" : path;
  return {
    canonical: undefined, // set per page with the locale prefix
    languages: {
      en: `/en${p}`,
      ar: `/ar${p}`,
      "x-default": `/en${p}`,
    },
  };
}

export function pageMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const p = opts.path === "/" ? "" : opts.path;
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: `/${opts.locale}${p}`,
      languages: localeAlternates(opts.path).languages,
    },
    robots: indexingAllowed() ? undefined : { index: false, follow: false },
    openGraph: {
      title: opts.title,
      description: opts.description,
      siteName: SITE_NAME,
      locale: opts.locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}
