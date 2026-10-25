import type { MetadataRoute } from "next";
import { indexingAllowed, siteUrl } from "@/lib/seo";

/**
 * Indexing gate (Q-P3-11): disallow everything unless the authorized
 * production deployment sets NEXT_PUBLIC_ALLOW_INDEXING=true.
 */
export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  // D-088: crawlers find the sitemap from here once indexing is on
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl().origin}/sitemap.xml` };
}
