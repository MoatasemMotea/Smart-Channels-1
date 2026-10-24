import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getCompany, localize } from "@/lib/content";
import { aboutMedia } from "@/content/company";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LangText } from "@/components/ui/LangText";
import { LazyVideo } from "@/components/ui/LazyVideo";

/**
 * ABOUT — editorial split (P5 · Q-P5-1).
 *
 * Large positioning statement + approved mission copy on one side, the
 * authentic fiber-splicing field still on the other (masked editorial
 * reveal — evidence, not decoration), and the four capability pillars as
 * a structural row beneath. All copy is approved company content; the
 * image is owner-supplied source media (never stock, never AI-as-evidence).
 */
export async function AboutScene({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const company = getCompany();
  const pillars = company.aboutPillars;

  return (
    <MotionSection
      id="about"
      reveal="mask"
      className="border-b border-line"
      aria-label={t("sections.about")}
      data-scene="about"
      data-stack="cover"
    >
      {/* D-079: light line + fading shadow on the rising edge */}
      <div className="scene-edge" aria-hidden="true" />
      {/* D-054 §10: the chapter breathes — a wider vertical measure and a
          calmer rhythm between the editorial column, the media and the
          capability row. */}
      <div className="mx-auto max-w-360 px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <SectionHeading index={t("sections.about")}>
              <LangText text={localize(company.positioning, locale)} />
            </SectionHeading>
            <p className="max-w-xl text-lg leading-8 text-ink-muted">
              <LangText text={localize(company.about, locale)} />
            </p>
          </div>
          <figure className="media-frame self-center">
            <div className="media-reveal">
              {/* §7 media-ready: an owner-approved company film replaces
                  the photograph the moment aboutMedia is enabled — the
                  photograph stays the poster/fallback. */}
              {aboutMedia.enabled && aboutMedia.videoSrc ? (
                <LazyVideo
                  src={aboutMedia.videoSrc}
                  poster={aboutMedia.poster ?? undefined}
                  className="h-auto w-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src="/media/gallery/fiber-splicing-riyadh-2025.webp"
                  alt={
                    locale === "ar"
                      ? "لِحام ألياف بصرية بيد فنيّ من Smart Channels، الرياض 2025"
                      : "Fiber-optic fusion splicing by a Smart Channels technician, Riyadh 2025"
                  }
                  width={848}
                  height={464}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              )}
            </div>
            <figcaption className="microlabel mt-3">{t("home.aboutImageCaption")}</figcaption>
          </figure>
        </div>

        {/* D-081: the four parts under the photograph — vision · mission ·
            values · goals (h3 under the section's h2). Still READ along
            the row: each column rises after the one before it and its rule
            draws from the reading edge (D-054 §§4, 6); with D-079 the
            arrival reverses on the way back up (.is-visible hysteresis). */}
        <ul className="about-pillars mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <li className="stagger-item stagger-rule pt-4" style={{ "--i": 0 } as CSSProperties}>
            <h3 className="font-display text-lg font-semibold">{t("home.aboutPillars.vision")}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-muted">{localize(pillars.vision, locale)}</p>
          </li>
          <li className="stagger-item stagger-rule pt-4" style={{ "--i": 1 } as CSSProperties}>
            <h3 className="font-display text-lg font-semibold">{t("home.aboutPillars.mission")}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-muted">{localize(company.mission, locale)}</p>
          </li>
          <li className="stagger-item stagger-rule pt-4" style={{ "--i": 2 } as CSSProperties}>
            <h3 className="font-display text-lg font-semibold">{t("home.aboutPillars.values")}</h3>
            <ul className="about-values mt-3">
              {company.values.map((v) => (
                <li key={v.name.en} className="text-sm leading-7">
                  <strong className="font-semibold text-ink">{localize(v.name, locale)}</strong>
                  <span className="text-ink-muted"> — {localize(v.line, locale)}</span>
                </li>
              ))}
            </ul>
          </li>
          <li className="stagger-item stagger-rule pt-4" style={{ "--i": 3 } as CSSProperties}>
            <h3 className="font-display text-lg font-semibold">{t("home.aboutPillars.goals")}</h3>
            <ul className="about-goals mt-3">
              {pillars.goals.map((g) => (
                <li key={g.en} className="text-sm leading-7 text-ink-muted">
                  {localize(g, locale)}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </MotionSection>
  );
}
