import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getProductCategories, getProductCategoryBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { CategoryCatalog } from "@/components/products/CategoryCatalog";

/* nine categories × two locales = eighteen static routes (D-059 §3) */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProductCategories().map((c) => ({ locale, category: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getProductCategoryBySlug(category);
  if (!cat) return {};
  const t = await getTranslations({ locale, namespace: "pages.products" });
  return pageMetadata({
    locale: locale as Locale,
    path: `/products/${category}`,
    title: locale === "ar" ? cat.fullAr : cat.fullEn,
    description: t("description"),
  });
}

/**
 * PRODUCT CATEGORY page (D-059 · D-061 · D-063): resolves the slug and
 * hands it to CategoryCatalog — the side list of the nine categories and
 * the card grid, shared with /products since D-063. Unknown slugs fall
 * through to the branded not-found boundary.
 */
export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: raw, category } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const cat = getProductCategoryBySlug(category);
  if (!cat) notFound();

  return <CategoryCatalog locale={locale} category={cat} />;
}
