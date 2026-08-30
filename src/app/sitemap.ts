import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSolutionFamilies } from "@/lib/content";

/**
 * Sitemap generated from the same route/data sources as the pages.
 * Only public content appears (publish filtering lives in the accessors).
 * The base URL is a placeholder until a production domain is approved
 * (D-010) — sitemaps only matter once indexing is enabled (Q-P3-11).
 */
const BASE = "https://example.invalid";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/products",
    "/solutions",
    "/projects",
    "/industries",
    "/gallery",
    "/company",
    "/partners",
    "/clients",
    "/contact",
    ...getSolutionFamilies().map((f) => `/solutions/${f.slug}`),
  ];
  return routing.locales.flatMap((locale) =>
    staticPaths.map((p) => ({
      url: `${BASE}/${locale}${p}`,
      changeFrequency: "monthly" as const,
    })),
  );
}
