import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getProductCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CategoryCatalog } from "@/components/products/CategoryCatalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.products" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/products",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * PRODUCTS index (D-059 · D-061 · D-063) — renders the FIRST category by
 * `order` (networking) exactly as its own page does: hero with the
 * category name, the side list with that category marked current, and
 * its card grid. The nine-tile grid that stood here until D-063 is gone;
 * the side list is the navigation. Metadata stays the generic Products
 * title and description — it does not inherit the category's.
 */
export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const first = getProductCategories()[0]!;

  return <CategoryCatalog locale={locale} category={first} />;
}
