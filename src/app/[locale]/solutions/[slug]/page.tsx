import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getPartners, getSolutionFamilies, getSolutionFamilyBySlug, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
import { Link } from "@/i18n/navigation";

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

/**
 * SOLUTION DETAIL (P6 · D-043) — each family opens with its own dark
 * technical intro (chapter index + name + approved tagline over the
 * node-lattice motif), then a theme-aware technical body: the approved
 * summary as a lede, sub-solutions as structured columns with their
 * profile-backed capability lists, the certified-vendor marks (approved
 * D-033 extractions, only where the profile associates them — pp.18–19),
 * and consistent cross-solution navigation (previous / next / index).
 * No invented imagery: the visual system is programmed, not photographed.
 */
export default async function SolutionFamilyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const families = getSolutionFamilies();
  const family = getSolutionFamilyBySlug(slug);
  if (!family) notFound();
  const idx = families.findIndex((f) => f.id === family.id);
  const prev = families[(idx - 1 + families.length) % families.length]!;
  const next = families[(idx + 1) % families.length]!;
  const vendors = getPartners().filter((p) => family.relatedVendorIds?.includes(p.id));

  return (
    <>
      <PageHero
        motif="nodes"
        overline={`${t("inner.solutionsChapter")} · ${String(idx + 1).padStart(2, "0")} / ${String(families.length).padStart(2, "0")}`}
        title={localize(family.name, locale)}
        lede={localize(family.tagline, locale)}
      />

      <MotionSection reveal="mask" className="border-b border-line" aria-label={localize(family.name, locale)}>
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
          <p className="max-w-3xl text-xl leading-9">{localize(family.summary, locale)}</p>
        </div>
      </MotionSection>

      {/* sub-solutions: structured technical columns */}
      <MotionSection reveal="trace" className="border-b border-line" aria-label={localize(family.name, locale)}>
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {family.subSolutions.map((sub, i) => (
              <section key={sub.id} className="subsolution">
                <p aria-hidden="true" className="microlabel mb-2 text-accent">
                  {String(idx + 1).padStart(2, "0")}.{i + 1}
                </p>
                <h2 className="font-display text-xl font-semibold md:text-2xl">
                  {localize(sub.name, locale)}
                </h2>
                {sub.items ? (
                  <ul className="subsolution-items mt-4">
                    {sub.items.map((item, j) => (
                      <li key={j}>{localize(item, locale)}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* certified vendors — only where the profile associates them */}
      {vendors.length > 0 ? (
        <MotionSection reveal="sweep" className="border-b border-line" aria-label={t("inner.vendors")}>
          <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
            <p className="microlabel mb-6 text-accent">{t("inner.vendors")}</p>
            <ul className="vendor-row">
              {vendors.map((v) => (
                <li key={v.id} className="vendor-chip">
                  {v.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element -- approved marks, never distorted
                    <img src={v.logo.src} alt={localize(v.name, locale)} loading="lazy" />
                  ) : (
                    <span className="text-sm font-semibold">{v.name.en}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>
      ) : null}

      {/* cross-solution navigation: previous / index / next */}
      <MotionSection reveal="rise" aria-label={t("inner.allSolutions")}>
        <div className="mx-auto max-w-360 px-6 py-14 lg:px-12">
          <nav className="solution-xnav" aria-label={t("inner.allSolutions")}>
            <Link href={`/solutions/${prev.slug}`} className="solution-xnav-link" rel="prev">
              <span className="microlabel text-ink-muted">{t("inner.prevSolution")}</span>
              <span className="mt-1 block font-display text-lg font-semibold">
                {localize(prev.name, locale)}
              </span>
            </Link>
            <Link href="/solutions" className="solution-xnav-index tx-link microlabel">
              {t("inner.allSolutions")}
            </Link>
            <Link href={`/solutions/${next.slug}`} className="solution-xnav-link solution-xnav-next" rel="next">
              <span className="microlabel text-ink-muted">{t("inner.nextSolution")}</span>
              <span className="mt-1 block font-display text-lg font-semibold">
                {localize(next.name, locale)}
              </span>
            </Link>
          </nav>
        </div>
      </MotionSection>
    </>
  );
}
