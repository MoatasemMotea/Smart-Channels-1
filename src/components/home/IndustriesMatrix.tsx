import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getIndustries, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * INDUSTRIES — structural technical matrix (P5 · Q-P5-3).
 *
 * All 16 approved sectors, typography and structural rhythm only — no
 * cards, no invented statistics or imagery. Featured focus sectors carry
 * the accent marker and heavier ink (visually stronger, honestly framed).
 * Grid direction follows the reading direction; RTL flows right-to-left.
 */
export async function IndustriesMatrix({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const industries = getIndustries();

  return (
    <MotionSection
      id="industries"
      className="border-b border-line"
      aria-label={t("sections.industries")}
      data-scene="industries"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.industries")}</SectionHeading>
        <ul className="industries-matrix">
          {industries.map((i) => (
            <li key={i.id} className="industry-cell" data-featured={i.featured || undefined}>
              <span className="industry-name">{localize(i.name, locale)}</span>
              {i.featured ? (
                <>
                  <span aria-hidden="true" className="industry-mark" />
                  <span className="sr-only">{t("home.featuredMark")}</span>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
