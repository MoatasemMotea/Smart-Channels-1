import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getClients, getCompany, localize } from "@/lib/content";
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
  const t = await getTranslations({ locale, namespace: "pages.clients" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/clients",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * OUR CLIENTS route (P6 · D-043). Reuses the approved D-042 client
 * carousel — same component, same calmer trust-oriented motion identity,
 * same data source of truth — framed by the approved reach statement,
 * with the complete typographic index of every approved client below.
 * Never a text wall in place of the approved presentation.
 */
export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const clients = getClients();
  const logos: RailLogo[] = clients.map((c) => ({
    id: c.id,
    name: localize(c.name, locale),
    src: c.logo?.src ?? "",
  }));

  return (
    <>
      <PageHero
        motif="field"
        overline={t("pages.clients.title")}
        title={t("sections.clients")}
        lede={localize(getCompany().reach, locale)}
      />

      <MotionSection reveal="mask" className="border-b border-line" aria-label={t("sections.clients")}>
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
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

      <MotionSection reveal="rise" aria-label={t("inner.completeIndex")}>
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
          <p className="microlabel mb-8 text-accent">{t("inner.completeIndex")}</p>
          <ul className="name-index">
            {clients.map((c) => (
              <li key={c.id} className="name-index-cell">
                {c.name.en}
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>
    </>
  );
}
