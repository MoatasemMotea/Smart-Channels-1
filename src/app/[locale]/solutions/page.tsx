import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getSolutionFamilies, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.solutions" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/solutions",
    title: t("title"),
    description: t("description"),
  });
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("pages.solutions");

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1" index="Solutions">
        {t("title")}
      </SectionHeading>
      <p className="mb-10 max-w-2xl text-ink-muted">{t("description")}</p>
      <ol className="grid gap-6 md:grid-cols-2">
        {getSolutionFamilies().map((f, i) => (
          <li key={f.id} className="border-t border-line pt-5">
            <p aria-hidden="true" className="microlabel mb-2">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="text-2xl font-semibold">
              <Link href={`/solutions/${f.slug}`} className="hover:text-accent">
                {localize(f.name, locale)}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{localize(f.tagline, locale)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
