import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getIndustries, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.industries" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/industries",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * INDUSTRIES (P6 · D-043) — structural editorial matrix. Light-led
 * (Q-P6-3): the approved sectors as a hairline-ruled index with large
 * numerals and a quiet signal response — structure over decoration.
 * No per-industry statistics or claims exist, so none are shown.
 */
export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("pages.industries");
  const industries = getIndustries();

  return (
    <div className="mx-auto max-w-360 px-6 pb-24 pt-16 lg:px-12">
      <MotionSection as="div" reveal="rise">
        <p className="microlabel mb-4 text-accent">
          01–{String(industries.length).padStart(2, "0")}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">{t("description")}</p>
      </MotionSection>

      <MotionSection as="div" reveal="converge" className="mt-14">
        <ul className="industries-matrix">
          {industries.map((ind, i) => (
            <li key={ind.id} className="industry-cell">
              <span aria-hidden="true" className="industry-cell-index microlabel">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="industry-cell-name">{localize(ind.name, locale)}</span>
            </li>
          ))}
        </ul>
      </MotionSection>
    </div>
  );
}
