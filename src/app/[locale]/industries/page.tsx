import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getIndustries, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.industries" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/industries",
    title: t("title"),
    description: t("description"),
  });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("pages.industries");

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1" index="Industries">
        {t("title")}
      </SectionHeading>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {getIndustries().map((i) => (
          <li key={i.id} className="border-t border-line py-4 font-medium">
            {localize(i.name, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}
