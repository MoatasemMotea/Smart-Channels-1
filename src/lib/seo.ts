import type { Metadata } from "next";
import type { Locale, SocialLink } from "@/types/content";
import { getContact, getSocialLinks, localize } from "@/lib/content";

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

/* ------------------------------------------------------------------ */
/* Organization structured data (D-055)                                */
/* ------------------------------------------------------------------ */

/**
 * The authoritative brand artwork already shipped in /public (D-001).
 * Kept site-relative on purpose: no production domain is approved yet
 * (D-010 — see the placeholder BASE in src/app/sitemap.ts), and a
 * fabricated absolute origin would be an invented value. JSON-LD
 * resolves a relative IRI against the document, so this stays correct
 * and becomes absolute for free once a domain is approved.
 */
const ORGANIZATION_LOGO = "/brand/logo-dark.png";

/**
 * sameAs admits ORGANIZATION profiles only (D-055).
 *
 * On an Organization, schema.org `sameAs` asserts "this URL is another
 * official page OF THIS ENTITY". A personal/member profile is a
 * different entity (a Person), so listing one here would be a false
 * identity claim to search engines — even when the account is operated
 * by the company.
 *
 * The distinction is read from each platform's own URL grammar rather
 * than from a hand-maintained list of blocked URLs, so the rule keeps
 * working for links nobody has entered yet:
 *   - linkedin: organizations live under /company/, /showcase/ or
 *     /school/; /in/<slug> is a member (Person) profile.
 *   - instagram / x / tiktok: people and organizations share one handle
 *     namespace, so the URL carries no signal and the record is taken
 *     at face value.
 *
 * TO REVERSE: delete the platform's entry below and every enabled
 * record flows straight through to sameAs.
 */
const ORGANIZATION_PROFILE_PATH: Partial<Record<SocialLink["platform"], RegExp>> = {
  linkedin: /^\/(company|showcase|school)\//,
};

function isOrganizationProfile(link: SocialLink): boolean {
  const shape = ORGANIZATION_PROFILE_PATH[link.platform];
  if (!shape) return true; // platform cannot express the distinction
  try {
    return shape.test(new URL(link.url!).pathname);
  } catch {
    return false; // unparseable URL is never an identity claim
  }
}

/**
 * Official organization profiles, derived from the same single source of
 * truth the footer renders (`getSocialLinks()`). Enabling a real company
 * URL in src/content/social.ts fills this automatically — data edit only,
 * no engineering (D-029/D-055).
 */
export function organizationSameAs(): string[] {
  return getSocialLinks().filter(isOrganizationProfile).map((l) => l.url!);
}

/**
 * Organization JSON-LD built strictly from approved content (D-011): the
 * brand name, the shipped logo, and the contact block the footer already
 * renders. Optional schema fields whose data does not exist in the
 * project are omitted rather than invented — notably `url`, which waits
 * on an approved production domain (D-010).
 */
export function organizationSchema(opts: {
  locale: Locale;
  /** Localized brand name, from the same message key the footer uses. */
  name: string;
}): Record<string, unknown> {
  const contact = getContact();
  const sameAs = organizationSameAs();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: opts.name,
    logo: ORGANIZATION_LOGO,
    /* Text form: the approved address is authored as one localized line
       (src/content/contact.ts) and splitting it into PostalAddress parts
       would invent structure the content does not carry. */
    address: localize(contact.address, opts.locale),
    telephone: contact.phone,
    email: contact.email,
    /* An empty sameAs is worse than no sameAs — omit the field entirely
       until an organization profile exists (D-055 §3). */
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
