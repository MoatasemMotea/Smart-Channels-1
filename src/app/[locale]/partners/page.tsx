import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getPartners, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
import { LogoCarousel, type RailLogo } from "@/components/home/LogoMotion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.partners" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/partners",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * TECHNOLOGY ALLIANCES route (P6 · D-043). Alliances-only now — clients
 * live at /clients. Reuses the approved D-042 carousel (same component,
 * same data source of truth — never a competing presentation), framed
 * with the approved certified-alliances description, plus the complete
 * typographic index of every approved partner for reference and
 * accessibility. Clients moved to their own route.
 */
export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const partners = getPartners();
  const logos: RailLogo[] = partners.map((p) => ({
    id: p.id,
    name: localize(p.name, locale),
    src: p.logo?.src ?? "",
    originalColor: p.originalColor,
  }));

  return (
    <>
      <PageHero
        motif="grid"
        overline={t("pages.partners.title")}
        title={t("sections.partners")}
        lede={t("pages.partners.description")}
      />

      <MotionSection reveal="trace" className="border-b border-line" aria-label={t("sections.partners")}>
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
          <LogoCarousel
            logos={logos.filter((l) => l.src)}
            rtl={locale === "ar"}
            kind="alliance"
            label={t("sections.partners")}
          />
          <p className="ecosystem-more microlabel">{t("home.morePartners")}</p>
        </div>
      </MotionSection>

      {/* the complete index — every approved alliance, typographic */}
      <MotionSection reveal="rise" aria-label={t("inner.completeIndex")}>
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
          <p className="microlabel mb-8 text-accent">{t("inner.completeIndex")}</p>
          <ul className="name-index">
            {partners.map((p) => (
              <li key={p.id} className="name-index-cell">
                {p.name.en}
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>
    </>
  );
}
