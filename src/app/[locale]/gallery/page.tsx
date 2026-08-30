import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getPublishedGalleryItems } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";

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
 * GALLERY (P10 · D-045) — the complete system: editorial masonry with
 * category filtering + FLIP reflow, poster-first media cards, and an
 * accessible lightbox (see GalleryExperience). Renders ONLY published
 * approved records — the system is complete at any collection size and
 * future population is a pure data edit.
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
      </MotionSection>

      <MotionSection as="div" reveal="sweep" className="mt-10">
        {items.length === 0 ? (
          <p className="text-ink-muted">{t("common.comingInPhase")}</p>
        ) : (
          <GalleryExperience />
        )}
      </MotionSection>
    </div>
  );
}
