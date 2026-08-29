import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getClients, getCompany, getPartners, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * TECHNOLOGY ALLIANCES + CLIENTS (P5 · Q-P5-7).
 *
 * Two deliberately DIFFERENT typographic treatments — no logos until the
 * owner supplies presentation-grade assets (D-005; records upgrade to
 * logo-backed via data only):
 *
 * - Alliances = engineered technical vendor index: structured grid,
 *   vertical rules, mono metadata voice, interaction color.
 * - Clients = calm structural trust field: the approved reach statement
 *   leading a dense, quiet flowing name field. No grid, no rules.
 */
export async function AlliancesIndex() {
  const t = await getTranslations();
  const partners = getPartners();

  return (
    <MotionSection
      reveal="trace"
      className="border-b border-line"
      aria-label={t("sections.partners")}
      data-scene="partners"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.partners")}</SectionHeading>
        <ul className="alliances-index">
          {partners.map((p) => (
            <li key={p.id} className="alliance-cell">
              {/* vendor names keep their official Latin form (Q5) */}
              <span className="alliance-name tx-link" dir="ltr">
                {p.name.en}
              </span>
            </li>
          ))}
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
      reveal="mask"
      className="border-b border-line"
      aria-label={t("sections.clients")}
      data-scene="clients"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.clients")}</SectionHeading>
        <p className="max-w-3xl text-xl leading-9">{localize(company.reach, locale)}</p>
        <p className="clients-field" dir="ltr">
          {clients.map((c, i) => (
            <span key={c.id}>
              {i > 0 ? <span aria-hidden="true" className="clients-sep"> · </span> : null}
              <span className="clients-name">{c.name.en}</span>
            </span>
          ))}
        </p>
      </div>
    </MotionSection>
  );
}
