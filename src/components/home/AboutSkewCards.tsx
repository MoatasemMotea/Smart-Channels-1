import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getCompany, localize } from "@/lib/content";
import { LangText } from "@/components/ui/LangText";

/**
 * ABOUT — "skew cards" (D-101, idea adapted from a 21st.dev reference, not
 * copied verbatim). Replaces the separate vision/mission boxes, values
 * grid and goals panel (D-092–D-095) with one 4-card grid: رؤيتنا ·
 * رسالتنا · قيمنا · أهدافنا — same copy, same per-value/per-goal icons,
 * no content change. Bespoke inline SVG icons only (viewBox 0 0 24 24,
 * stroke currentColor), no icon library.
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
const VALUE_ICONS = [ShieldIcon, TargetIcon, BoltIcon, PartnershipIcon];

export async function AboutSkewCards({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const company = getCompany();
  const pillars = company.aboutPillars;

  const cards = [
    {
      id: "vision",
      title: t("home.aboutPillars.vision"),
      icon: EyeIcon,
      from: "var(--brand-magenta)",
      to: "var(--brand-magenta-deep)",
      body: (
        <p className="skew-card-text">
          <LangText text={localize(pillars.vision, locale)} />
        </p>
      ),
    },
    {
      id: "mission",
      title: t("home.aboutPillars.mission"),
      icon: FlagIcon,
      from: "var(--brand-magenta-deep)",
      to: "var(--brand-magenta-deepest)",
      body: (
        <p className="skew-card-text">
          <LangText text={localize(company.mission, locale)} />
        </p>
      ),
    },
    {
      id: "values",
      title: t("home.aboutPillars.values"),
      icon: null,
      from: "var(--brand-magenta-bright)",
      to: "var(--brand-magenta)",
      body: (
        <>
          <p className="skew-card-text">
            <LangText text={localize(company.aboutSectionIntros.values, locale)} />
          </p>
          <ul className="skew-card-list mt-5">
            {company.values.map((v, i) => {
              const ValueIcon = VALUE_ICONS[i] ?? ShieldIcon;
              return (
                <li key={v.name.en} className="skew-card-list-item">
                  <p className="skew-card-item-name">
                    <ValueIcon />
                    <span>
                      <LangText text={localize(v.name, locale)} />
                    </span>
                  </p>
                  <p className="skew-card-item-line">
                    <LangText text={localize(v.line, locale)} />
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      ),
    },
    {
      id: "goals",
      title: t("home.aboutPillars.goals"),
      icon: null,
      from: "var(--brand-magenta)",
      to: "var(--brand-magenta-darkest)",
      body: (
        <ul className="skew-card-list mt-2">
          {pillars.goals.map((g) => (
            <li key={g.en} className="skew-card-goal">
              <CheckIcon />
              <span>
                <LangText text={localize(g, locale)} />
              </span>
            </li>
          ))}
        </ul>
      ),
    },
  ] as const;

  return (
    <ul className="skew-cards-grid mt-16">
      {cards.map((c, i) => {
        const CardIcon = c.icon;
        return (
          <li
            key={c.id}
            className="skew-card stagger-item-lg"
            role="group"
            aria-label={c.title}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- D-101: a focusable non-interactive group by design, so Tab triggers the same hover-reveal treatment for keyboard users (focus-within)
            tabIndex={0}
            style={{ "--i": i, "--sk-from": c.from, "--sk-to": c.to } as CSSProperties}
          >
            <span className="skew-card-panel skew-card-panel-glow" aria-hidden="true" />
            <span className="skew-card-panel skew-card-panel-solid" aria-hidden="true" />
            <span className="skew-card-blob skew-card-blob-a" aria-hidden="true" />
            <span className="skew-card-blob skew-card-blob-b" aria-hidden="true" />
            <div className="skew-card-content">
              <p className="skew-card-title">
                {CardIcon && <CardIcon />}
                <span>
                  <LangText text={c.title} />
                </span>
              </p>
              <div className="skew-card-body">{c.body}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
