import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import {
  getCompany,
  getClients,
  getDocuments,
  getFeaturedIndustries,
  getPartners,
  getPublicProjects,
  getSolutionFamilies,
  getStats,
  localize,
} from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

/**
 * HOMEPAGE — P3 foundation shell (Amendment 5).
 *
 * Deliberately minimal chapter placeholders proving the content layer,
 * localization, themes and accessibility. Each chapter is a clean mount
 * point that its authorized phase (P4–P13) replaces with the approved
 * cinematic experience — this page must NOT attempt to reproduce the P2
 * boards.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("sections");
  const tc = await getTranslations("common");
  const company = getCompany();

  const chapter = "border-b border-line";
  const inner = "mx-auto max-w-360 px-6 py-16 lg:px-12";

  return (
    <>
      {/* 01 Opening + 02 Hero — implemented at P4/P5. Static foundation statement. */}
      <section className={chapter} aria-label="Hero" data-scene="hero">
        <div className={inner}>
          <p className="microlabel mb-4 text-accent">Smart Channels — Systems Integration</p>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {locale === "ar" ? "التقنية التي تصنع التجربة." : "Technology behind the experience."}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            {localize(company.about, locale)}
          </p>
          <p className="microlabel mt-8">{tc("comingInPhase")}</p>
        </div>
      </section>

      {/* 03 About */}
      <MotionSection className={chapter} aria-label={t("about")} data-scene="about">
        <div className={inner}>
          <SectionHeading index={`03 — ${t("about")}`}>
            {localize(company.positioning, locale)}
          </SectionHeading>
          <ul className="grid gap-4 md:grid-cols-4">
            {company.capabilities.map((c) => (
              <li key={c.id} className="border-t border-line pt-4">
                <p className="font-semibold">{localize(c.name, locale)}</p>
                <p className="mt-2 text-sm text-ink-muted">{localize(c.description, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>

      {/* 04 Track Record — count-up + National Signal Field at P6 */}
      <MotionSection className={chapter} aria-label={t("trackRecord")} data-scene="track-record">
        <div className={inner}>
          <SectionHeading index={`04 — ${t("trackRecord")}`}>{t("trackRecord")}</SectionHeading>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {getStats().map((s) => (
              <div key={s.id} className="border-t border-line pt-4">
                <dd className="font-display text-5xl font-bold tabular-nums" dir="ltr">
                  {s.value}
                  {s.suffix ? <span className="text-accent">{s.suffix}</span> : null}
                </dd>
                <dt className="mt-2 text-sm text-ink-muted">{localize(s.label, locale)}</dt>
              </div>
            ))}
          </dl>
        </div>
      </MotionSection>

      {/* 05 Solutions — ecosystem experience at P7 */}
      <MotionSection className={chapter} aria-label={t("solutions")} data-scene="solutions">
        <div className={inner}>
          <SectionHeading index={`05 — ${t("solutions")}`}>{t("solutions")}</SectionHeading>
          <ol className="grid gap-3 md:grid-cols-2">
            {getSolutionFamilies().map((f, i) => (
              <li key={f.id}>
                <Link
                  href={`/solutions/${f.slug}`}
                  className="flex items-baseline gap-4 border-b border-line py-4 transition-colors hover:text-accent"
                >
                  <span aria-hidden="true" className="microlabel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-semibold">{localize(f.name, locale)}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      {/* 06 Industries — showcase at P8 */}
      <MotionSection className={chapter} aria-label={t("industries")} data-scene="industries">
        <div className={inner}>
          <SectionHeading index={`06 — ${t("industries")}`}>{t("industries")}</SectionHeading>
          <ul className="flex flex-wrap gap-3">
            {getFeaturedIndustries().map((i) => (
              <li key={i.id} className="rounded-full border border-line px-4 py-2 text-sm">
                {localize(i.name, locale)}
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>

      {/* 07 Projects — cinematic featured + evidence wall at P9 */}
      <MotionSection className={chapter} aria-label={t("projects")} data-scene="projects">
        <div className={inner}>
          <SectionHeading index={`07 — ${t("projects")}`}>{t("projects")}</SectionHeading>
          <ul className="grid gap-2 md:grid-cols-2">
            {getPublicProjects()
              .slice(0, 8)
              .map((p) => (
                <li key={p.id} className="border-b border-line py-3 font-medium">
                  {localize(p.name, locale)}
                  {p.location ? (
                    <span className="ms-3 text-sm text-ink-muted">{localize(p.location, locale)}</span>
                  ) : null}
                </li>
              ))}
          </ul>
          <p className="mt-6">
            <Link href="/projects" className="font-semibold text-accent">
              {tc("explore")} →
            </Link>
          </p>
        </div>
      </MotionSection>

      {/* 08 Gallery (P10) · 09 Smart AI (P11) — mount points only */}
      <MotionSection className={chapter} aria-label={t("gallery")} data-scene="gallery">
        <div className={inner}>
          <SectionHeading index={`08 — ${t("gallery")}`}>{t("gallery")}</SectionHeading>
          <p className="text-ink-muted">{tc("comingInPhase")}</p>
        </div>
      </MotionSection>
      <MotionSection className={chapter} aria-label={t("smartAi")} data-scene="smart-ai" id="smart-ai">
        <div className={inner}>
          <SectionHeading index={`09 — ${t("smartAi")}`}>{t("smartAi")}</SectionHeading>
          <p className="text-ink-muted">{tc("comingInPhase")}</p>
        </div>
      </MotionSection>

      {/* 10 Alliances + 11 Clients — designed treatments at P12 */}
      <MotionSection className={chapter} aria-label={t("partners")} data-scene="partners">
        <div className={inner}>
          <SectionHeading index={`10 — ${t("partners")}`}>{t("partners")}</SectionHeading>
          <p className="text-sm leading-8 text-ink-muted">
            {getPartners()
              .map((p) => p.name.en)
              .join(" · ")}
          </p>
        </div>
      </MotionSection>
      <MotionSection className={chapter} aria-label={t("clients")} data-scene="clients">
        <div className={inner}>
          <SectionHeading index={`11 — ${t("clients")}`}>{t("clients")}</SectionHeading>
          <p className="max-w-3xl text-lg">{localize(company.reach, locale)}</p>
          <p className="mt-4 text-sm leading-8 text-ink-muted">
            {getClients()
              .map((c) => c.name.en)
              .join(" · ")}
          </p>
        </div>
      </MotionSection>

      {/* 12 Company Profile download */}
      <MotionSection className={chapter} aria-label={t("profile")} data-scene="profile">
        <div className={inner}>
          <SectionHeading index={`12 — ${t("profile")}`}>{t("profile")}</SectionHeading>
          <ul className="flex flex-wrap gap-4">
            {getDocuments().map((d) => (
              <li key={d.src}>
                <a
                  href={d.src}
                  className="inline-block rounded border border-line px-5 py-3 font-semibold transition-colors hover:border-accent"
                >
                  {localize(d.label, locale)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>

      {/* 13 Final CTA — cinematic close at P13 */}
      <MotionSection aria-label={t("contact")} data-scene="cta">
        <div className={`${inner} text-center`}>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            {locale === "ar" ? (
              <>
                لنبنِه <span className="text-accent">معًا.</span>
              </>
            ) : (
              <>
                Let&apos;s build it <span className="text-accent">together.</span>
              </>
            )}
          </h2>
          <p className="mt-6">
            <Link
              href="/contact"
              className="inline-block rounded bg-accent px-7 py-4 font-semibold text-accent-ink"
            >
              {locale === "ar" ? "تواصل معنا" : "Let's Talk"} →
            </Link>
          </p>
        </div>
      </MotionSection>
    </>
  );
}
