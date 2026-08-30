import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getGalleryCategories, getPublishedGalleryItems, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.gallery" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/gallery",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * GALLERY — P6 SHELL ONLY (D-043). A designed editorial shell that
 * belongs to the site: category index as quiet structural tags and the
 * published starter set as poster-first media cards (approved records
 * only — captions carry source-supported metadata, unresolved fields
 * simply absent). The full P10 system (masonry reflow, FLIP, lightbox,
 * media utility completion) is intentionally NOT implemented here.
 */
export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const items = getPublishedGalleryItems();

  return (
    <div className="mx-auto max-w-360 px-6 pb-24 pt-16 lg:px-12">
      <MotionSection as="div" reveal="rise">
        <p className="microlabel mb-4 text-accent">{t("inner.categories")}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          {t("pages.gallery.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
          {t("pages.gallery.description")}
        </p>
        <ul className="mt-8 flex flex-wrap gap-2.5" aria-label={t("inner.categories")}>
          {getGalleryCategories().map((c) => (
            <li key={c.id} className="gallery-cat microlabel">
              {localize(c.label, locale)}
            </li>
          ))}
        </ul>
      </MotionSection>

      <MotionSection as="div" reveal="sweep" className="mt-14">
        {items.length === 0 ? (
          <p className="text-ink-muted">{t("common.comingInPhase")}</p>
        ) : (
          <ul className="gallery-shell-grid">
            {items.map((g) => (
              <li key={g.id} className="gallery-shell-card media-frame-host">
                <figure>
                  <div className="gallery-shell-media">
                    {g.type === "video" ? (
                      <video
                        poster={g.poster}
                        src={g.src}
                        muted
                        loop
                        playsInline
                        preload="none"
                        controls
                        aria-label={localize(g.alt, locale)}
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element -- approved published media, CSS-sized
                      <img src={g.src} alt={localize(g.alt, locale)} loading="lazy" />
                    )}
                  </div>
                  <figcaption className="gallery-shell-caption">
                    <span>{localize(g.alt, locale)}</span>
                    <span className="microlabel">
                      {[
                        g.location ? localize(g.location, locale) : null,
                        g.year ? String(g.year) : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </MotionSection>
    </div>
  );
}
