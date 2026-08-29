import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getClients, getCompany, getPartners, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AllianceStream, ClientConstellation, type RailLogo } from "./LogoMotion";

/**
 * TECHNOLOGY ALLIANCES + OUR CLIENTS (D-033 content · P5 §§2–3 motion).
 *
 * Both sections are cinematic moving ecosystems now — never static walls,
 * never typed names:
 * - Alliances = engineered technology stream (counter-flowing depth rows,
 *   signal sweep, localized hover response).
 * - Clients = trusted institutional constellation (three calm multi-row
 *   trajectories, depth variation, edge masks, pointer parallax).
 *
 * The server render carries the premium STATIC grid compositions (the
 * reduced-motion and no-JS experience); FULL/LITE swap in the rails after
 * the tier resolves. Logos are the approved D-033 extractions — never
 * distorted, recolored, or mirrored; RTL reverses flow direction only.
 * Section ids anchor the header's cinematic arrivals (§9).
 */
export async function AlliancesIndex({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const logos: RailLogo[] = getPartners().map((p) => ({
    id: p.id,
    name: localize(p.name, locale),
    src: p.logo?.src ?? "",
  }));

  return (
    <MotionSection
      reveal="trace"
      className="border-b border-line"
      aria-label={t("sections.partners")}
      data-scene="partners"
      id="partners"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.partners")}</SectionHeading>
        <AllianceStream logos={logos.filter((l) => l.src)} rtl={locale === "ar"} />
        {/* §4: the continuation note lives BELOW the ecosystem, never
            inside the moving rails — restrained, typographic. */}
        <p className="ecosystem-more microlabel">{t("home.morePartners")}</p>
      </div>
    </MotionSection>
  );
}

export async function ClientsField({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const company = getCompany();
  const logos: RailLogo[] = getClients().map((c) => ({
    id: c.id,
    name: localize(c.name, locale),
    src: c.logo?.src ?? "",
  }));

  return (
    <MotionSection
      reveal="mask"
      className="border-b border-line"
      aria-label={t("sections.clients")}
      data-scene="clients"
      id="clients"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.clients")}</SectionHeading>
        <p className="max-w-3xl text-xl leading-9">{localize(company.reach, locale)}</p>
        <ClientConstellation logos={logos.filter((l) => l.src)} rtl={locale === "ar"} />
        {/* §5: continuation note below the constellation (owner wording). */}
        <p className="ecosystem-more microlabel">{t("home.moreClients")}</p>
      </div>
    </MotionSection>
  );
}
