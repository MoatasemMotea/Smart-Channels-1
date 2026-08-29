/* eslint-disable @next/next/no-img-element -- approved extracted marks;
   fixed-height contain sizing is CSS-driven, next/image adds nothing */
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getClients, getCompany, getPartners, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * TECHNOLOGY ALLIANCES + OUR CLIENTS — logo-driven (P5 logo revision).
 *
 * The ACTUAL approved marks from the Company Profile grids (p.28 / p.30),
 * extracted at 300 DPI — never typed names, never internet substitutes
 * (D-005). The source PDF itself stays private (D-020). Records upgrade
 * to official vendor/client assets via `logo.src` data edits only.
 *
 * Two deliberately different identities:
 * - Alliances = ENGINEERED VENDOR INDEX: hairline-ruled technical grid,
 *   per-cell masked entrance sweeping across rows, signal-line hover.
 * - Clients = CALM TRUST CONSTELLATION: floating rounded chips at natural
 *   widths, soft row-staggered rise, quiet depth on hover.
 *
 * Logos sit on neutral light surfaces in BOTH themes (marks are drawn for
 * light ground); geometry never mirrors in RTL — only flow order adapts.
 */
export async function AlliancesIndex({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const partners = getPartners();

  return (
    <MotionSection
      className="border-b border-line"
      aria-label={t("sections.partners")}
      data-scene="partners"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.partners")}</SectionHeading>
        <ul className="alliances-grid">
          {partners.map((p, i) => (
            <li
              key={p.id}
              className="alliance-cell"
              style={{ transitionDelay: `${(i % 7) * 45 + Math.floor(i / 7) * 80}ms` }}
            >
              {p.logo ? (
                <img
                  src={p.logo.src}
                  alt={localize(p.name, locale)}
                  loading="lazy"
                  className="alliance-logo"
                />
              ) : (
                <span className="alliance-name">{p.name.en}</span>
              )}
            </li>
          ))}
          {/* the profile's own "And more" closes the grid (p.28) */}
          <li className="alliance-cell alliance-more" aria-hidden="true">
            {t("home.andMore")}
          </li>
        </ul>
      </div>
    </MotionSection>
  );
}

export async function ClientsField({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const company = getCompany();
  const clients = getClients();

  return (
    <MotionSection
      className="border-b border-line"
      aria-label={t("sections.clients")}
      data-scene="clients"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.clients")}</SectionHeading>
        <p className="max-w-3xl text-xl leading-9">{localize(company.reach, locale)}</p>
        <ul className="clients-wall">
          {clients.map((c, i) => (
            <li
              key={c.id}
              className="client-chip"
              style={{ transitionDelay: `${Math.floor(i / 5) * 110 + (i % 5) * 35}ms` }}
            >
              {c.logo ? (
                <img
                  src={c.logo.src}
                  alt={localize(c.name, locale)}
                  loading="lazy"
                  className="client-logo"
                />
              ) : (
                <span>{c.name.en}</span>
              )}
            </li>
          ))}
          {/* p.30 closes with "And more" — kept as an honest ghost chip */}
          <li className="client-chip client-more" aria-hidden="true">
            {t("home.andMore")}
          </li>
        </ul>
      </div>
    </MotionSection>
  );
}
