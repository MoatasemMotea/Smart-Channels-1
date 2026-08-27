import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getClients, getCompany, getPartners, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("sections");

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1" index="Partners">
        {t("partners")}
      </SectionHeading>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-5">
        {getPartners().map((p) => (
          <li key={p.id} className="border-t border-line py-3 font-medium">
            {p.name.en}
          </li>
        ))}
      </ul>
      <SectionHeading index="Clients">{t("clients")}</SectionHeading>
      <p className="max-w-3xl text-lg">{localize(getCompany().reach, locale)}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-5">
        {getClients().map((c) => (
          <li key={c.id} className="border-t border-line py-3">
            {c.name.en}
          </li>
        ))}
      </ul>
    </div>
  );
}
