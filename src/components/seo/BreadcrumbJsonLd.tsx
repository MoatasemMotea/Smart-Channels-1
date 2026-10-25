import type { Locale } from "@/types/content";
import { breadcrumbSchema, indexingAllowed } from "@/lib/seo";
import { getNavigation, localize } from "@/lib/content";

/**
 * BreadcrumbList structured data for a sub-page (D-088 · SEO-11).
 * Emitted, like the Organization graph, only when indexing is allowed —
 * a noindex preview publishes no structured data (Q-P3-11). Names reuse
 * existing labels: "Home" from the navigation, the rest from each page.
 */
export function BreadcrumbJsonLd({ locale, trail }: { locale: Locale; trail: { name: string; path: string }[] }) {
  if (!indexingAllowed()) return null;
  const home = getNavigation().find((n) => n.id === "home");
  const json = JSON.stringify(
    breadcrumbSchema({ locale, home: home ? localize(home.label, locale) : "Home", trail }),
  ).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
