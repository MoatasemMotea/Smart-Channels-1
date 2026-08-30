import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getPublicProjects, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";

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

/**
 * PROJECTS (P6 · D-043) — evidence-focused listing. Light-led editorial
 * ledger: every approved record at EQUAL WEIGHT (no featured hierarchy —
 * that is P9's D-004-gated decision), each row carrying only
 * source-backed facts: name, location, years, scope. No detail routes
 * yet (D-011: /projects/[slug] belongs to P9/P10). Numbers stay
 * bidi-isolated in Arabic.
 */
export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const projects = getPublicProjects();

  return (
    <div className="mx-auto max-w-360 px-6 pb-24 pt-16 lg:px-12">
      <MotionSection as="div" reveal="rise">
        <p className="microlabel mb-4 text-accent">{t("inner.evidenceNote")}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          {t("pages.projects.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
          {t("pages.projects.description")}
        </p>
      </MotionSection>

      <MotionSection as="div" reveal="trace" className="mt-14">
        <ul className="projects-ledger">
          {projects.map((p, i) => (
            <li key={p.id} className="project-entry">
              <span aria-hidden="true" className="project-entry-index microlabel">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="project-entry-body">
                <p className="project-entry-name font-display">{localize(p.name, locale)}</p>
                {p.scope ? (
                  <p className="project-entry-scope">
                    {p.scope.map((s) => localize(s, locale)).join(" · ")}
                  </p>
                ) : null}
              </div>
              <p className="project-entry-meta microlabel">
                {p.location ? <span>{localize(p.location, locale)}</span> : null}
                {p.years ? (
                  <span dir="ltr" className="inline-block">
                    {p.years.to ? `${p.years.from}—${p.years.to}` : `${p.years.from}`}
                  </span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </MotionSection>
    </div>
  );
}
