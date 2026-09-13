import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getProductCards, getProductCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
import { CategoryBar } from "@/components/products/CategoryBar";
import { Link } from "@/i18n/navigation";

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
 * PRODUCTS index (D-059) — the nine categories as a tile grid under the
 * category strip. Each tile carries the short name (as on the strip)
 * and the full name (as on its page). No counts, no model numbers.
 */
export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const ar = locale === "ar";
  const categories = getProductCategories();
  const cards = getProductCards();

  const bar = categories.map((c) => ({
    slug: c.slug,
    label: ar ? c.shortAr : c.shortEn,
    full: ar ? c.fullAr : c.fullEn,
    href: `/products/${c.slug}`,
    types: [...new Set(cards.filter((k) => k.category === c.slug).map((k) => (ar ? k.typeAr : k.typeEn)))],
  }));

  return (
    <>
      <PageHero
        motif="grid"
        overline={t("sections.products")}
        title={t("pages.products.title")}
        lede={t("pages.products.description")}
      />

      <CategoryBar categories={bar} viewAllLabel={t("catalog.viewAll")} ariaLabel={t("catalog.categoriesNav")} />

      <MotionSection reveal="rise" className="border-b border-line" aria-label={t("inner.categories")}>
        <div className="mx-auto max-w-360 px-6 py-14 lg:px-12">
          <ul className="catalog-tiles">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="catalog-tile">
                  <span className="catalog-tile-short">{ar ? c.shortAr : c.shortEn}</span>
                  <span className="catalog-tile-full font-display">{ar ? c.fullAr : c.fullEn}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>
    </>
  );
}
