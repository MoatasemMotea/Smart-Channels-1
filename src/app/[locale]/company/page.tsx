import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getCompany, getStats, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

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

/**
 * COMPANY (P6 · D-043) — premium editorial company experience.
 *
 * Cinematic dark intro (approved positioning + about, signal motif) →
 * theme-aware editorial chapters: mission as a large pull statement,
 * the p.4 value statements as a numbered index, the four capability
 * pillars, the approved Track Record figures, and the reach statement
 * closing into a contact CTA. Every sentence is approved profile
 * content (D-002/D-006); D-020 keeps the profile itself source-only —
 * no public document exists.
 */
export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const company = getCompany();

  return (
    // fragment: the dark PageHero is main's first child, so the fixed-header
    // clearance padding lands INSIDE its dark band (same device as /products)
    <>
      <PageHero
        motif="signal"
        overline={t("sections.about")}
        title={localize(company.positioning, locale)}
        lede={localize(company.about, locale)}
      />

      {/* Mission — a single large editorial statement */}
      <MotionSection reveal="mask" className="border-b border-line" aria-label={t("inner.mission")}>
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <p className="microlabel mb-6 text-accent">{t("inner.mission")}</p>
          <blockquote className="company-mission max-w-4xl font-display text-2xl font-semibold leading-relaxed md:text-[2rem] md:leading-snug">
            {localize(company.mission, locale)}
          </blockquote>
        </div>
      </MotionSection>

      {/* Values — the approved p.4 numbered statements as a technical index */}
      <MotionSection reveal="trace" className="border-b border-line" aria-label={t("inner.values")}>
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <p className="microlabel mb-8 text-accent">{t("inner.values")}</p>
          <ol className="company-values">
            {company.values.map((v, i) => (
              <li key={i} className="company-value">
                <span aria-hidden="true" className="company-value-index microlabel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xl font-semibold md:text-2xl">{localize(v, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      {/* Capabilities — four pillars with a quiet signal response */}
      <MotionSection reveal="rise" className="border-b border-line" aria-label={t("inner.capabilities")}>
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <SectionHeading>{t("inner.capabilities")}</SectionHeading>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {company.capabilities.map((c) => (
              <article key={c.id} className="capability-pillar">
                <h3 className="text-lg font-semibold">{localize(c.name, locale)}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">
                  {localize(c.description, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Track Record — approved figures, single D-002 source */}
      <MotionSection reveal="converge" className="border-b border-line" aria-label={t("sections.trackRecord")}>
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <SectionHeading>{t("sections.trackRecord")}</SectionHeading>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {getStats().map((s) => (
              <div key={s.id} className="stat-block border-t border-line pt-4">
                {/* block follows the reading direction; only the numeric token
                    is bidi-isolated so 200+ never renders as +200 */}
                <dd className="font-display text-4xl font-bold tabular-nums md:text-5xl">
                  <span dir="ltr" className="inline-block">
                    {s.value}
                    {s.suffix ? <span className="text-accent">{s.suffix}</span> : null}
                  </span>
                </dd>
                <dt className="mt-2 text-sm text-ink-muted">{localize(s.label, locale)}</dt>
              </div>
            ))}
          </dl>
        </div>
      </MotionSection>

      {/* Reach → conversation */}
      <MotionSection reveal="sweep" aria-label={t("sections.clients")}>
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <p className="max-w-3xl text-xl leading-9">{localize(company.reach, locale)}</p>
          <p className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded border border-accent px-6 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
            >
              {t("inner.startConversation")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </MotionSection>
      {/* D-020: the Company Profile is source material only — no public
          download section exists by owner ruling. */}
    </>
  );
}
