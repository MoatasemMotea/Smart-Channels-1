import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getSolutionFamilies, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.solutions" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/solutions",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * SOLUTIONS INDEX (P6 · D-043) — a technical, indexed overview of the
 * seven approved families, not a generic card grid. Light-led editorial
 * page (Q-P6-3): oversized numbered rows carrying name, tagline and the
 * family's sub-solution voices as quiet technical tags; hovering/focus
 * draws the signal trace. Fully data-driven from solutions.ts.
 */
export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("pages.solutions");
  const families = getSolutionFamilies();

  return (
    <div className="mx-auto max-w-360 px-6 pb-24 pt-16 lg:px-12">
      <MotionSection as="div" reveal="rise">
        <p className="microlabel mb-4 text-accent">
          {String(families.length).padStart(2, "0")} · {t("title")}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">{t("description")}</p>
      </MotionSection>

      <MotionSection as="div" reveal="trace" className="mt-14">
        <ol className="solutions-index-list">
          {families.map((f, i) => (
            <li key={f.id} className="solution-row">
              <Link href={`/solutions/${f.slug}`} className="solution-row-link">
                <span aria-hidden="true" className="solution-row-index font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="solution-row-body">
                  <span className="solution-row-name font-display">
                    {localize(f.name, locale)}
                  </span>
                  <span className="solution-row-tagline">{localize(f.tagline, locale)}</span>
                  <span className="solution-row-tags" aria-hidden="true">
                    {f.subSolutions.map((s) => (
                      <span key={s.id} className="solution-tag microlabel">
                        {localize(s.name, locale)}
                      </span>
                    ))}
                  </span>
                </span>
                <span aria-hidden="true" className="solution-row-arrow">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </MotionSection>
    </div>
  );
}
