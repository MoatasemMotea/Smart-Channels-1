import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProductCategories, getSolutionFamilies } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

/**
 * Sitemap generated from the same route/data sources as the pages.
 * Only public content appears (publish filtering lives in the accessors).
 * D-088: absolute URLs from siteUrl() (NEXT_PUBLIC_SITE_URL → Vercel's
 * production URL → localhost) instead of the old placeholder origin; the
 * nine product categories are listed, and /products itself is not (it is
 * a 308 to the first category). D-092: /projects and its detail slugs are
 * removed the same way — /projects/* is now a 308 to /#projects.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().origin;
  const staticPaths = [
    "",
    "/solutions",
    "/industries",
    "/company",
    "/partners",
    "/clients",
    ...getProductCategories().map((c) => `/products/${c.slug}`),
    ...getSolutionFamilies().map((f) => `/solutions/${f.slug}`),
  ];
  return routing.locales.flatMap((locale) =>
    staticPaths.map((p) => ({
      url: `${base}/${locale}${p}`,
      changeFrequency: "monthly" as const,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}${p}`])),
      },
    })),
  );
}
