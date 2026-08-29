import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getFeaturedProducts, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { Link } from "@/i18n/navigation";

/**
 * PRODUCTS — cinematic stage (P5 §4 · D-034).
 *
 * The architectural scene ships NOW; the products arrive later as data.
 * A dark environmental stage — perspective floor grid, elliptical light
 * platform, controlled beams (pure SVG/CSS, aria-hidden) — with a strong
 * headline and solution-backed supporting copy. When the owner publishes
 * featured records they appear as depth objects on the platform (image +
 * name + importance) with zero component redesign. No invented products,
 * no stock imagery, no placeholder cards — the empty stage is the
 * designed state, not a gap.
 */
export async function ProductsStage({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const featured = getFeaturedProducts();

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

        {/* the stage: platform + grid + beams — environment, not decoration */}
        <div className="products-stage" aria-hidden="true">
          <div className="stage-grid" />
          <div className="stage-beam stage-beam-a" />
          <div className="stage-beam stage-beam-b" />
          <div className="stage-ring" />
          {featured.length > 0 ? (
            <ul className="stage-rail">
              {featured.map((p) => (
                <li key={p.id} className="stage-pedestal">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- owner-supplied catalogue media
                    <img src={p.image.src} alt="" loading="lazy" />
                  ) : null}
                  <p className="stage-product-name">{localize(p.name, locale)}</p>
                  <p className="stage-product-importance">{localize(p.importance, locale)}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <p className="relative mt-10">
          <Link
            href="/products"
            className="inline-block rounded border border-accent px-6 py-3.5 font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
          >
            {t("home.products.cta")} →
          </Link>
        </p>
      </div>
    </MotionSection>
  );
}
