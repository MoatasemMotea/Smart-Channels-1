import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getDetailProjects, getProductCategories, getSolutionFamilies } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

/**
 * Sitemap generated from the same route/data sources as the pages.
 * Only public content appears (publish filtering lives in the accessors).
 * D-088: absolute URLs from siteUrl() (NEXT_PUBLIC_SITE_URL → Vercel's
 * production URL → localhost) instead of the old placeholder origin; the
 * nine product categories are listed, and /products itself is not (it is
 * a 308 to the first category).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().origin;
  const staticPaths = [
    "",
    "/solutions",
    "/projects",
    "/industries",
    "/company",
    "/partners",
    "/clients",
    ...getProductCategories().map((c) => `/products/${c.slug}`),
    ...getSolutionFamilies().map((f) => `/solutions/${f.slug}`),
    ...getDetailProjects().map((p) => `/projects/${p.slug}`),
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
