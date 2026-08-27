import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getPartners, getSolutionFamilies, getSolutionFamilyBySlug, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getSolutionFamilies().map((f) => ({ locale, slug: f.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const family = getSolutionFamilyBySlug(slug);
  if (!family) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/solutions/${slug}`,
    title: localize(family.name, locale as Locale),
    description: localize(family.summary, locale as Locale),
  });
}

export default async function SolutionFamilyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const family = getSolutionFamilyBySlug(slug);
  if (!family) notFound();
  const vendors = getPartners().filter((p) => family.relatedVendorIds?.includes(p.id));

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1" index={localize(family.tagline, locale)}>
        {localize(family.name, locale)}
      </SectionHeading>
      <p className="max-w-3xl text-lg text-ink-muted">{localize(family.summary, locale)}</p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {family.subSolutions.map((sub) => (
          <section key={sub.id} className="border-t border-line pt-5">
            <h2 className="text-xl font-semibold">{localize(sub.name, locale)}</h2>
            {sub.items ? (
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-muted">
                {sub.items.map((item, i) => (
                  <li key={i}>{localize(item, locale)}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
      {vendors.length > 0 ? (
        <p className="microlabel mt-12">
          {vendors.map((v) => v.name.en).join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
