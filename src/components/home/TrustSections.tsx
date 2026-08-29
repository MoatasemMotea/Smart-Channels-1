import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getClients, getCompany, getPartners, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoCarousel, type RailLogo } from "./LogoMotion";

/**
 * TECHNOLOGY ALLIANCES + OUR CLIENTS (D-033 content · D-042 presentation).
 *
 * Both sections are premium cinematic horizontal logo rails now — the
 * reference-locked family: dark glass cells on one seamless auto-flowing
 * row with arrow controls and drag/swipe. Distinct voices within the
 * family:
 * - Alliances — the engineered stream: ≈30 px/s with a signal sweep;
 * - Clients — the trusted institutional rail: ≈22 px/s, calmer.
 *
 * The section head pairs the current locale's title with its
 * counterpart-language name as a quiet accent subtitle (both are
 * approved section names — no invented copy). Logos are the approved
 * D-033 extractions — never distorted, recolored, or mirrored; RTL
 * reverses flow/paging semantics only. The continuation notes stay
 * BELOW each ecosystem as restrained editorial lines (never chips
 * inside the rails). Section ids anchor the header's cinematic
 * arrivals (§9).
 */
async function railStrings(locale: Locale) {
  const other = (locale === "ar" ? "en" : "ar") as Locale;
  const t = await getTranslations();
  const tOther = await getTranslations({ locale: other });
  return { t, tOther, otherDir: other === "ar" ? "rtl" : "ltr" } as const;
}

export async function AlliancesIndex({ locale }: { locale: Locale }) {
  const { t, tOther, otherDir } = await railStrings(locale);
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
        <div className="rail-head">
          <SectionHeading>{t("sections.partners")}</SectionHeading>
          <p className="rail-head-echo" dir={otherDir} aria-hidden="true">
            {tOther("sections.partners")}
          </p>
        </div>
        <LogoCarousel
          logos={logos.filter((l) => l.src)}
          rtl={locale === "ar"}
          kind="alliance"
          speed={30}
          prevLabel={t("carousel.prev")}
          nextLabel={t("carousel.next")}
        />
        {/* continuation note BELOW the ecosystem, never inside the rail */}
        <p className="ecosystem-more microlabel">{t("home.morePartners")}</p>
      </div>
    </MotionSection>
  );
}

export async function ClientsField({ locale }: { locale: Locale }) {
  const { t, tOther, otherDir } = await railStrings(locale);
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
        <div className="rail-head">
          <SectionHeading>{t("sections.clients")}</SectionHeading>
          <p className="rail-head-echo" dir={otherDir} aria-hidden="true">
            {tOther("sections.clients")}
          </p>
        </div>
        <p className="max-w-3xl text-lg leading-8">{localize(company.reach, locale)}</p>
        <LogoCarousel
          logos={logos.filter((l) => l.src)}
          rtl={locale === "ar"}
          kind="client"
          speed={22}
          prevLabel={t("carousel.prev")}
          nextLabel={t("carousel.next")}
        />
        <p className="ecosystem-more microlabel">{t("home.moreClients")}</p>
      </div>
    </MotionSection>
  );
}
