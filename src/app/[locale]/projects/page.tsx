import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getPublicProjects, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.projects" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/projects",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("pages.projects");

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1" index="Projects">
        {t("title")}
      </SectionHeading>
      <p className="mb-10 max-w-2xl text-ink-muted">{t("description")}</p>
      <ul>
        {getPublicProjects().map((p) => (
          <li key={p.id} className="flex flex-wrap items-baseline gap-x-6 border-b border-line py-4">
            <span className="text-lg font-semibold">{localize(p.name, locale)}</span>
            <span className="microlabel">
              {[
                p.location ? localize(p.location, locale) : null,
                p.years ? (p.years.to ? `${p.years.from}—${p.years.to}` : `${p.years.from}`) : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
            {p.scope ? (
              <span className="mt-1 w-full text-sm text-ink-muted">
                {p.scope.map((s) => localize(s, locale)).join(" · ")}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
