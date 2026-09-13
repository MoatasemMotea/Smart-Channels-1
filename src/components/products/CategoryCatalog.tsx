import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import type { ProductCategory } from "@/content/product-catalog";
import { getProductCards, getProductCategories } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
import { CategorySidebar } from "@/components/products/CategorySidebar";
import { CategoryCards } from "@/components/products/CategoryCards";

/**
 * ONE CATEGORY, RENDERED (D-063).
 *
 * The whole body of a product category page — hero, the nine-category
 * side list with the current one marked, and the card grid. Extracted
 * from `/products/[category]` so that `/products` (which shows the first
 * category by `order`) renders the very same tree instead of a copy.
 * Server component; the caller has already resolved the category and
 * called setRequestLocale. Metadata stays with each route.
 */
export async function CategoryCatalog({ locale, category: cat }: { locale: Locale; category: ProductCategory }) {
  const t = await getTranslations();
  const ar = locale === "ar";

  const side = getProductCategories().map((c) => ({
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
            <CategoryCards cards={cards} />
          </div>
        </div>
      </MotionSection>
    </>
  );
}
