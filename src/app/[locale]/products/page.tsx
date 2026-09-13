import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getProductCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
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
 * PRODUCTS index (D-059 · D-061) — the nine categories as a tile grid.
 * The tiles ARE the navigation: each links to its category page (the
 * horizontal strip and its reveal panel were removed at D-061). Each
 * tile carries the short name and the full name. No counts, no model
 * numbers.
 */
export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const ar = locale === "ar";
  const categories = getProductCategories();

  return (
    <>
      <PageHero
        motif="grid"
        overline={t("sections.products")}
        title={t("pages.products.title")}
        lede={t("pages.products.description")}
      />

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
