import { getTranslations } from "next-intl/server";
import { MotionSection } from "@/components/motion/MotionSection";
import { Link } from "@/i18n/navigation";

/**
 * PRODUCTS — homepage teaser (P5 Visual Correction §3 · D-034).
 *
 * Route-first architecture: the full cinematic product stage lives on
 * /products; the homepage carries only a minimal, deliberate teaser —
 * title, the approved one-line intro, and a cinematic doorway CTA. No
 * product cards here, invented or otherwise. The restrained ring motif
 * hints at the stage waiting behind the route.
 */
export async function ProductsTeaser() {
  const t = await getTranslations();

  return (
    <MotionSection
      className="products-scene border-b border-line"
      aria-label={t("sections.products")}
      data-scene="products"
      data-env="dark"
      id="products"
    >
      <div className="relative mx-auto max-w-360 px-6 py-24 text-center lg:px-12">
        <p className="microlabel text-accent">{t("sections.products")}</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">
          {t("home.products.title")}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink-muted">
          {t("home.products.sub")}
        </p>

        {/* the doorway: a single light-ring horizon, not the full stage */}
        <div className="products-teaser-motif" aria-hidden="true">
          <div className="teaser-ring" />
        </div>

        <p className="relative mt-2">
          <Link
            href="/products"
            className="inline-block rounded border border-accent px-7 py-4 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
          >
            {t("home.products.explore")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </MotionSection>
  );
}
