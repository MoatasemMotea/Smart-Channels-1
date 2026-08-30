import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getSolutionFamilies, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
import { SmartAiShell } from "@/components/smartai/SmartAiShell";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.smartAi" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/smart-ai",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * SMART AI experience (P11 · D-046 · D-009 absolute).
 *
 * The dedicated route the homepage teaser has pointed toward since P5:
 * concept introduction (approved copy), an honest three-step
 * explanation of how the FUTURE experience will work, the approved
 * solution families as the domains it will draw on (data-driven), and
 * the integration-ready interaction shell in its explicit prototype
 * state. No live provider, no fake chat, no simulated streaming — the
 * adapter boundary (src/lib/smart-ai) is where a separately-authorized
 * integration will land.
 */
export default async function SmartAiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const families = getSolutionFamilies();

  return (
    <>
      <PageHero
        motif="trace"
        overline={t("sections.smartAi")}
        title={t("home.smartAi.title")}
        lede={t("home.smartAi.body")}
      />

      {/* how it WILL work — future-tense concept, no invented claims */}
      <MotionSection reveal="trace" className="border-b border-line" aria-label={t("smartai.stepsTitle")}>
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <p className="microlabel mb-8 text-accent">{t("smartai.stepsTitle")}</p>
          <ol className="smartai-steps">
            {(["step1", "step2", "step3"] as const).map((k, i) => (
              <li key={k} className="smartai-step">
                <span aria-hidden="true" className="smartai-step-index font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg font-semibold md:text-xl">{t(`smartai.${k}`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      {/* the approved solution families are the guidance domains */}
      <MotionSection reveal="rise" className="border-b border-line" aria-label={t("smartai.domains")}>
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
          <p className="microlabel mb-6 text-accent">{t("smartai.domains")}</p>
          <ul className="smartai-domains">
            {families.map((f) => (
              <li key={f.id}>
                <Link href={`/solutions/${f.slug}`} className="solution-tag microlabel smartai-domain">
                  {localize(f.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>

      {/* integration-ready shell — explicit prototype state (D-009) */}
      <MotionSection reveal="converge" aria-label={t("sections.smartAi")}>
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <SmartAiShell />
        </div>
      </MotionSection>
    </>
  );
}
