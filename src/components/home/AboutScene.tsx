import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getCompany, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { LangText } from "@/components/ui/LangText";

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
const EyeIcon = () => (
  <Icon>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
const FlagIcon = () => (
  <Icon>
    <path d="M5 21V4" />
    <path d="M5 4h11l-2 4 2 4H5" />
  </Icon>
);
/* D-093 item 5: the five "قيمنا" icons redrawn as one cohesive set — same
   viewBox, stroke and visual footprint (~18×18 inside the 24×24 box). */
const ShieldIcon = () => (
  <Icon>
    <path d="M12 3.5l7 2.7v5.3c0 4.6-3 7.7-7 8.5-4-0.8-7-3.9-7-8.5V6.2z" />
    <path d="M8.4 12.3l2.4 2.4 4.6-5" />
  </Icon>
);
const TargetIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.7" />
    <circle cx="12" cy="12" r={0.8} />
  </Icon>
);
const BoltIcon = () => (
  <Icon>
    <path d="M13 4L6 14h5l-1 6 7-10h-5z" />
  </Icon>
);
/* a hard hat profile — dome, a wide extended brim, a top ridge bump —
   not a dish/lid */
const HelmetIcon = () => (
  <Icon>
    <path d="M4 16a8 8 0 0 1 16 0" />
    <path d="M1.5 16h21" />
    <path d="M9.5 7.5q2.5-2.5 5 0" />
  </Icon>
);
/* two people side by side, not a handshake */
const PartnershipIcon = () => (
  <Icon>
    <circle cx="8" cy="7.5" r="2.3" />
    <path d="M3.8 19c0-3.2 1.9-5.3 4.2-5.3s4.2 2.1 4.2 5.3" />
    <circle cx="16" cy="7.5" r="2.3" />
    <path d="M11.8 19c0-3.2 1.9-5.3 4.2-5.3s4.2 2.1 4.2 5.3" />
  </Icon>
);
const CheckIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l3 3 5-6" />
  </Icon>
);

const VALUE_ICONS = [ShieldIcon, TargetIcon, BoltIcon, HelmetIcon, PartnershipIcon];

/** The paragraph opens with the company name — set apart in bold magenta
 *  per the approved design, in both languages (both authored forms start
 *  with the literal brand name). */
const ABOUT_BRAND_PREFIX = "Smart Channels";

export async function AboutScene({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const company = getCompany();
  const pillars = company.aboutPillars;
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
          <h2 className="section-title font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            <LangText text={localize(company.positioning, locale)} />
          </p>
        </div>

        {/* ب) intro row: paragraph + highlights / image placeholder */}
        <div className="about-intro mt-16 grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="about-intro-text">
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
            <div className="about-media-placeholder" aria-hidden="true" />
            <div className="about-media-accent" aria-hidden="true" />
          </div>
        </div>

        {/* ج) vision / mission */}
        <div className="about-vm mt-16 grid gap-5 lg:grid-cols-2">
          <div className="about-vm-card about-vm-vision stagger-item-lg" style={{ "--i": 0 } as CSSProperties}>
            <p className="about-vm-label">
              <EyeIcon />
              <span>{t("home.aboutPillars.vision")}</span>
            </p>
            <p className="about-vm-text">
              <LangText text={localize(pillars.vision, locale)} />
            </p>
          </div>
          <div className="about-vm-card about-vm-mission stagger-item-lg" style={{ "--i": 1 } as CSSProperties}>
            <p className="about-vm-label">
              <FlagIcon />
              <span>{t("home.aboutPillars.mission")}</span>
            </p>
            <p className="about-vm-text">
              <LangText text={localize(company.mission, locale)} />
            </p>
          </div>
        </div>

        {/* د) values */}
        <div className="about-values-section mt-20">
          <div className="about-values-head">
            <h3 className="font-display text-3xl font-bold md:text-4xl">{t("home.aboutPillars.values")}</h3>
            <p className="text-ink-muted">
              <LangText text={localize(company.aboutSectionIntros.values, locale)} />
            </p>
          </div>
          <ul className="about-values-grid mt-8">
            {company.values.map((v, i) => {
              const ValueIcon = VALUE_ICONS[i] ?? ShieldIcon;
              return (
                <li
                  key={v.name.en}
                  className="about-value-card stagger-item-lg"
                  style={{ "--i": i } as CSSProperties}
                >
                  <p className="about-value-name">
                    <ValueIcon />
                    <span>
                      <LangText text={localize(v.name, locale)} />
                    </span>
                  </p>
                  <p className="about-value-line">
                    <LangText text={localize(v.line, locale)} />
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* هـ) goals */}
        <div className="about-goals-panel mt-16">
          <div className="about-goals-head">
            <h3 className="font-display text-3xl font-bold md:text-4xl">{t("home.aboutPillars.goals")}</h3>
            <p className="text-ink-muted">
              <LangText text={localize(company.aboutSectionIntros.goals, locale)} />
            </p>
          </div>
          <ul className="about-goals-grid">
            {pillars.goals.map((g, i) => (
              <li key={g.en} className="about-goal-item stagger-item-lg" style={{ "--i": i } as CSSProperties}>
                <CheckIcon />
                <span>
                  <LangText text={localize(g, locale)} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MotionSection>
  );
}
