import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getGalleryCategories, getPublishedGalleryItems, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
 * P3 foundation gallery route: proves the data-driven pipeline. The
 * editorial masonry + lightbox experience lands at P10. Only published
 * items render (A-004/Amendment 3) — at P3 there are none by design.
 */
export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("pages.gallery");
  const tc = await getTranslations("common");
  const items = getPublishedGalleryItems();

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1" index="Gallery">
        {t("title")}
      </SectionHeading>
      <ul className="mb-10 flex flex-wrap gap-3" aria-label={t("title")}>
        {getGalleryCategories().map((c) => (
          <li key={c.id} className="rounded-full border border-line px-4 py-2 text-sm">
            {localize(c.label, locale)}
          </li>
        ))}
      </ul>
      {items.length === 0 ? (
        <p className="text-ink-muted">{tc("comingInPhase")}</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-3">
          {items.map((g) => (
            <li key={g.id} className="border border-line p-4 text-sm">
              {localize(g.alt, locale)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
