import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getFeaturedProducts, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { Link } from "@/i18n/navigation";

/**
 * PRODUCTS — homepage preview (final pre-media directive §10 · D-050).
 *
 * The preview is DESIGNED FOR EXACTLY FOUR featured products: a fixed
 * four-slot stage reading getFeaturedProducts() (products.ts ships
 * empty by design — D-034). Filled slots present the owner-approved
 * photograph, name and category; unfilled slots render as quiet
 * reserved frames — a deliberate empty state, never invented items,
 * never stock imagery. The doorway CTA leads to the full /products
 * catalogue.
 */
export async function ProductsTeaser() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const featured = getFeaturedProducts().slice(0, 4);
  const slots: Array<(typeof featured)[number] | null> = [
    ...featured,
    ...Array(Math.max(0, 4 - featured.length)).fill(null),
  ];

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

        {/* the four-slot featured stage — §10 fixed architecture */}
        <ul
          className="products-slots"
          aria-hidden={featured.length === 0 ? "true" : undefined}
        >
          {slots.map((p, i) =>
            p ? (
              <li key={p.id} className="product-slot product-slot-filled">
                <Link href={`/products#${p.slug}`} className="block">
                  {p.image ? (
                    /* fit/focus are data-driven art direction (D-052):
                       cover crops toward the record's focal point;
                       contain presents the whole device on a light
                       plate (low-res source — never upscaled/cropped) */
                    <div
                      className="product-slot-media"
                      data-fit={p.image.fit ?? "cover"}
                      data-plate={p.image.plate}
                    >
                      <Image
                        src={p.image.src}
                        alt={localize(p.image.alt, locale)}
                        width={p.image.width ?? 640}
                        height={p.image.height ?? 480}
                        sizes="(max-width: 768px) 50vw, 22vw"
                        style={p.image.focus ? { objectPosition: p.image.focus } : undefined}
                      />
                    </div>
                  ) : (
                    <div className="product-slot-media product-slot-media-empty" aria-hidden="true" />
                  )}
                  <p className="mt-4 font-display text-base font-semibold">
                    {localize(p.name, locale)}
                  </p>
                </Link>
              </li>
            ) : (
              /* reserved frame — awaits the owner's featured catalogue */
              <li key={`reserved-${i}`} className="product-slot" aria-hidden="true">
                <div className="product-slot-media product-slot-media-empty">
                  <span className="product-slot-mark" />
                </div>
              </li>
            ),
          )}
        </ul>

        <p className="relative mt-12">
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
