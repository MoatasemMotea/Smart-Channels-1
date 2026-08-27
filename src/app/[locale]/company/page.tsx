import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getCompany, getDocuments, getStats, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.company" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/company",
    title: t("title"),
    description: t("description"),
  });
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const company = getCompany();

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1" index={t("pages.company.title")}>
        {localize(company.positioning, locale)}
      </SectionHeading>
      <p className="max-w-3xl text-lg text-ink-muted">{localize(company.about, locale)}</p>
      <h2 className="mt-12 text-2xl font-semibold">{t("sections.trackRecord")}</h2>
      <dl className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
        {getStats().map((s) => (
          <div key={s.id} className="border-t border-line pt-4">
            <dd className="font-display text-4xl font-bold tabular-nums" dir="ltr">
              {s.value}
              {s.suffix ? <span className="text-accent">{s.suffix}</span> : null}
            </dd>
            <dt className="mt-2 text-sm text-ink-muted">{localize(s.label, locale)}</dt>
          </div>
        ))}
      </dl>
      <h2 className="mt-12 text-2xl font-semibold">{t("sections.profile")}</h2>
      <ul className="mt-6 flex flex-wrap gap-4">
        {getDocuments().map((d) => (
          <li key={d.src}>
            <a
              href={d.src}
              className="inline-block rounded border border-line px-5 py-3 font-semibold transition-colors hover:border-accent"
            >
              {localize(d.label, locale)} — {t("profileDownload.download")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
