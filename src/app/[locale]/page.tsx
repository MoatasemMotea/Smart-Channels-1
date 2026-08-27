import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import {
  getCompany,
  getClients,
  getFeaturedIndustries,
  getPartners,
  getPublicProjects,
  getSolutionFamilies,
  localize,
} from "@/lib/content";
import { Hero } from "@/components/hero/Hero";
import { NetworkScene } from "@/components/network/NetworkScene";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

/**
 * HOMEPAGE.
 *
 * Chapters 01/02 (opening + hero) and 04 (Track Record × National
 * Network, Revision 2) are implemented. The remaining chapters are
 * deliberately minimal foundation placeholders; each is a clean mount
 * point its authorized phase (P6–P13) replaces with the approved designed
 * experience. The journey closes Alliances → Clients → Final CTA (D-020:
 * no public Company Profile chapter exists).
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
      {/* 01 Opening + 02 Hero — cinematic sequence + hero (P4/D-017). */}
      <Hero />

      {/* 03 About */}
      <MotionSection reveal="mask" className={chapter} aria-label={t("about")} data-scene="about">
        <div className={inner}>
          <SectionHeading index={t("about")}>
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

      {/* 04 Track Record × National Network — Saudi/Gulf cinematic scene
          with choreography-synchronized counters (Revision 2 §§3–9). */}
      <NetworkScene />

      {/* 05 Solutions — ecosystem experience at P7 */}
      <MotionSection reveal="trace" className={chapter} aria-label={t("solutions")} data-scene="solutions">
        <div className={inner}>
          <SectionHeading>{t("solutions")}</SectionHeading>
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
          <SectionHeading>{t("industries")}</SectionHeading>
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
      <MotionSection reveal="converge" className={chapter} aria-label={t("projects")} data-scene="projects">
        <div className={inner}>
          <SectionHeading>{t("projects")}</SectionHeading>
          {/* §18: the numeric identifier anchors the block's INLINE-START —
              upper-LEFT in English, upper-RIGHT in Arabic — via logical
              flow, never a mirrored afterthought. Numerals stay 0–9. */}
          <ul className="grid gap-x-10 md:grid-cols-2">
            {getPublicProjects()
              .slice(0, 8)
              .map((p, i) => (
                <li key={p.id} className="project-entry border-b border-line">
                  <span aria-hidden="true" className="project-entry-no microlabel" dir="ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="project-entry-body">
                    <p className="project-entry-title tx-link font-display font-semibold">
                      {localize(p.name, locale)}
                    </p>
                    <p className="project-entry-meta text-sm text-ink-muted">
                      {p.location ? localize(p.location, locale) : null}
                      {p.location && p.years ? " · " : null}
                      {p.years ? (
                        <span dir="ltr">
                          {p.years.to ? `${p.years.from}–${p.years.to}` : p.years.from}
                        </span>
                      ) : null}
                    </p>
                  </div>
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
          <SectionHeading>{t("gallery")}</SectionHeading>
          <p className="text-ink-muted">{tc("comingInPhase")}</p>
        </div>
      </MotionSection>
      <MotionSection reveal="trace" className={chapter} aria-label={t("smartAi")} data-scene="smart-ai" id="smart-ai">
        <div className={inner}>
          <SectionHeading>{t("smartAi")}</SectionHeading>
          <p className="text-ink-muted">{tc("comingInPhase")}</p>
        </div>
      </MotionSection>

      {/* 10 Alliances + 11 Clients — designed treatments at P12 */}
      <MotionSection reveal="sweep" className={chapter} aria-label={t("partners")} data-scene="partners">
        <div className={inner}>
          <SectionHeading>{t("partners")}</SectionHeading>
          <p className="text-sm leading-8 text-ink-muted">
            {getPartners()
              .map((p) => p.name.en)
              .join(" · ")}
          </p>
        </div>
      </MotionSection>
      <MotionSection reveal="mask" className={chapter} aria-label={t("clients")} data-scene="clients">
        <div className={inner}>
          <SectionHeading>{t("clients")}</SectionHeading>
          <p className="max-w-3xl text-lg">{localize(company.reach, locale)}</p>
          <p className="mt-4 text-sm leading-8 text-ink-muted">
            {getClients()
              .map((c) => c.name.en)
              .join(" · ")}
          </p>
        </div>
      </MotionSection>

      {/* D-020: the former Company Profile download chapter is removed by
          owner ruling — the journey closes Alliances → Clients → Final CTA. */}

      {/* 12 Final CTA — cinematic close at P13 */}
      <MotionSection reveal="converge" aria-label={t("contact")} data-scene="cta">
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
