import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getFeaturedProducts, getPublishedProducts, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { ProductCatalog } from "@/components/products/ProductCatalog";
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
 * PRODUCTS route (P5 Visual Correction §3 · D-034).
 *
 * Route-first: this page carries the FULL cinematic product presentation —
 * the dark environmental stage (perspective floor grid, elliptical light
 * platform, controlled beams; pure SVG/CSS, aria-hidden) that the homepage
 * only teases. Published catalogue records land on the platform as depth
 * objects (image + name + importance) with zero redesign; the empty stage
 * is the designed state, not a gap — no invented products, no stock
 * imagery, no placeholder cards. Copy states only approved facts.
 */
export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const products = getPublishedProducts();
  const featured = getFeaturedProducts();

  return (
    <>
      <section
        className="products-scene border-b border-line"
        aria-label={t("pages.products.title")}
        data-env="dark"
      >
        <div className="relative mx-auto max-w-360 px-6 pb-24 pt-16 text-center lg:px-12">
          <p className="microlabel text-accent">{t("sections.products")}</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl">
            {t("home.products.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink-muted">
            {t("home.products.sub")}
          </p>

          {/* the stage: platform + grid + beams — environment, not decoration */}
          <div className="products-stage">
            <div className="stage-grid" aria-hidden="true" />
            <div className="stage-beam stage-beam-a" aria-hidden="true" />
            <div className="stage-beam stage-beam-b" aria-hidden="true" />
            <div className="stage-ring" aria-hidden="true" />
            {/* D-052: the four owner-featured, image-backed categories
                ride the stage; the complete index lives below */}
            {featured.length > 0 ? (
              <ul className="stage-rail">
                {featured.map((p) => (
                  <li key={p.id} className="stage-pedestal" data-fit={p.image?.fit ?? "cover"}>
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- owner-supplied catalogue media
                      <img
                        src={p.image.src}
                        alt={localize(p.image.alt, locale)}
                        loading="lazy"
                        style={p.image.focus ? { objectPosition: p.image.focus } : undefined}
                      />
                    ) : null}
                    <p className="stage-product-name">{localize(p.name, locale)}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <p className="relative mt-10">
            <Link
              href="/#contact"
              className="inline-block rounded border border-accent px-6 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
            >
              {t("home.products.cta")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* catalogue below the stage — full media-ready architecture
          (filter chips, photo/typographic cards); appears once records
          publish (D-048) */}
      {products.length > 0 ? (
        <MotionSection className="border-b border-line" aria-label={t("pages.products.title")}>
          <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
            <ProductCatalog />
          </div>
        </MotionSection>
      ) : null}
    </>
  );
}
