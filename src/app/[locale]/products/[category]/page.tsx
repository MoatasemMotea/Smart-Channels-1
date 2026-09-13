import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getProductCards, getProductCategories, getProductCategoryBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
import { CategorySidebar } from "@/components/products/CategorySidebar";
import { CategoryCards } from "@/components/products/CategoryCards";

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
 * PRODUCT CATEGORY page (D-059 · D-061): a side list of the nine
 * categories (sticky on desktop, a horizontal strip on small screens —
 * the only category navigation since D-061), a brand filter row and
 * the card grid. Unknown slugs fall through to the branded not-found boundary.
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
  const t = await getTranslations();
  const ar = locale === "ar";
  const categories = getProductCategories();

  const side = categories.map((c) => ({
    slug: c.slug,
    label: ar ? c.shortAr : c.shortEn,
    href: `/products/${c.slug}`,
  }));
  const cards = getProductCards(cat.slug).map((k, i) => ({
    key: `${k.typeEn}|${k.brand}|${i}`,
    name: ar ? k.typeAr : k.typeEn,
    brand: k.brand,
    image: k.image,
    alt: ar ? k.typeAr : k.typeEn,
  }));

  return (
    <>
      <PageHero motif="grid" overline={t("sections.products")} title={ar ? cat.fullAr : cat.fullEn} />

      <MotionSection reveal="rise" className="border-b border-line" aria-label={ar ? cat.fullAr : cat.fullEn}>
        <div className="mx-auto max-w-360 px-6 py-14 lg:px-12">
          <div className="catalog-layout">
            <CategorySidebar items={side} current={cat.slug} ariaLabel={t("catalog.categoriesNav")} />
            <CategoryCards cards={cards} brandsLabel={t("catalog.brands")} />
          </div>
        </div>
      </MotionSection>
    </>
  );
}
