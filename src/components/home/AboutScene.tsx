import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getAboutMedia, getCompany, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { LangText } from "@/components/ui/LangText";
import { AboutSkewCards } from "./AboutSkewCards";

/**
 * ABOUT (D-092 — owner-approved design, replaces the old photo + 4-pillar
 * layout). The fiber-splicing photograph is gone; its place is a dark 4:3
 * placeholder until the owner supplies a new image. Icons are bespoke
 * inline SVG (viewBox 0 0 24 24, stroke --brand-magenta, no icon library).
 */
function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "about-icon"}
    >
      {children}
    </svg>
  );
}

const PulseIcon = () => (
  <Icon>
    <path d="M4 12h4l3-7 4 14 3-7h2" />
  </Icon>
);
const PinIcon = () => (
  <Icon>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);
const SupportIcon = () => (
  <Icon>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H4zM20 13v4a2 2 0 0 1-2 2h-1v-6h3z" />
  </Icon>
);
/** The paragraph opens with the company name — set apart in bold magenta
 *  per the approved design, in both languages (both authored forms start
 *  with the literal brand name). */
const ABOUT_BRAND_PREFIX = "Smart Channels";

export async function AboutScene({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const company = getCompany();
  const media = getAboutMedia();
  const heading = t("home.aboutHeading");
  const aboutText = localize(company.about, locale);
  const aboutRest = aboutText.startsWith(ABOUT_BRAND_PREFIX) ? aboutText.slice(ABOUT_BRAND_PREFIX.length) : null;

  return (
    <MotionSection
      id="about"
      reveal="mask"
      className="border-b border-line"
      aria-label={heading}
      data-scene="about"
      data-stack="cover"
    >
      {/* D-079: light line + fading shadow on the rising edge */}
      <div className="scene-edge" aria-hidden="true" />
      <div className="about-shell mx-auto max-w-360 px-6 py-24 lg:px-12 lg:py-32">
        {/* أ) centered header */}
        <div className="about-header">
          <h2 className="section-title mx-auto font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {heading}
          </h2>
          <p className="about-subtitle mx-auto mt-4 max-w-[60ch] text-lg text-ink-muted">
            <LangText text={localize(company.positioning, locale)} />
          </p>
        </div>

        {/* ب) intro row: paragraph + highlights / image placeholder */}
        <div className="about-intro mt-16 grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="about-intro-text max-w-[58ch]">
            <p className="about-lede">
              {aboutRest !== null ? (
                <>
                  <strong className="about-lede-brand">
                    <LangText text={ABOUT_BRAND_PREFIX} />
                  </strong>
                  <LangText text={aboutRest} />
                </>
              ) : (
                <LangText text={aboutText} />
              )}
            </p>
            <ul className="about-highlights mt-7">
              {company.aboutHighlights.map((h, i) => {
                const HighlightIcon = [PulseIcon, PinIcon, SupportIcon][i] ?? PulseIcon;
                return (
                  <li
                    key={h.en}
                    className="about-highlight stagger-item-lg"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <HighlightIcon />
                    <span>
                      <LangText text={localize(h, locale)} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="about-media-slot">
            {media.photoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- D-101: owner-supplied photo path, swapped in via content only
              <img
                src={media.photoSrc}
                alt=""
                className="about-media-placeholder about-media-photo"
              />
            ) : (
              <div className="about-media-placeholder" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element -- D-101: tiny decorative watermark, CSS-sized, no real image yet */}
                <img src="/brand/logo-mark-small.webp" alt="" aria-hidden="true" className="about-media-mark" />
              </div>
            )}
            <div className="about-media-accent" aria-hidden="true" />
          </div>
        </div>

        {/* ج-هـ) vision / mission / values / goals — one 4-card grid (D-101) */}
        <AboutSkewCards locale={locale} />
      </div>
    </MotionSection>
  );
}
