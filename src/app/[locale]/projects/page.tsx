import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getFeaturedProjects, getPublicProjects, localize, projectHasDetail } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { Link } from "@/i18n/navigation";

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
 * PROJECTS (P9 · D-044) — Featured chapter + complete evidence ledger.
 *
 * The owner-selected Featured set (D-004 resolution) opens the page as
 * cinematic evidence cards — media-ready: each card upgrades to its
 * approved hero media automatically once `caseStudy.heroMedia` /
 * `media` data exists; until then the composition is programmatic
 * (never a blank placeholder, never fake imagery). The complete ledger
 * below keeps every record at equal weight; rows link only where the
 * evidence-adaptive rule grants a detail route.
 */
export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const projects = getPublicProjects();
  const featured = getFeaturedProjects();

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

      {/* Featured chapter — cinematic evidence cards */}
      {featured.length > 0 ? (
        <MotionSection as="div" reveal="converge" className="mt-14" aria-label={t("inner.featuredChapter")}>
          <p className="microlabel mb-8 text-accent">{t("inner.featuredChapter")}</p>
          <ul className="featured-grid">
            {featured.map((p, i) => {
              const hero = p.caseStudy?.heroMedia ?? p.media?.[0];
              return (
                <li key={p.id} className={`featured-card${hero ? " featured-card-media" : ""}`}>
                  <Link href={`/projects/${p.slug}`} className="featured-card-link">
                    {hero ? (
                      <div className="featured-card-photo" aria-hidden="true">
                        {hero.type === "video" ? (
                          <video src={hero.src} poster={hero.poster} muted loop playsInline preload="none" />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element -- owner-approved project media
                          <img src={hero.src} alt="" loading="lazy" />
                        )}
                      </div>
                    ) : (
                      <div className="featured-card-motif" aria-hidden="true" data-seat={i % 4}>
                        <span className="fc-a" />
                        <span className="fc-b" />
                      </div>
                    )}
                    <div className="featured-card-body">
                      <p className="featured-card-meta microlabel">
                        {p.location ? <span>{localize(p.location, locale)}</span> : null}
                        {p.years ? (
                          <span dir="ltr" className="inline-block">
                            {p.years.to ? `${p.years.from}—${p.years.to}` : `${p.years.from}`}
                          </span>
                        ) : null}
                      </p>
                      <h2 className="featured-card-name font-display">{localize(p.name, locale)}</h2>
                      {p.scope ? (
                        <p className="featured-card-scope">
                          {p.scope.slice(0, 3).map((s) => localize(s, locale)).join(" · ")}
                        </p>
                      ) : null}
                      <p className="featured-card-cta microlabel">
                        {t("inner.enterProject")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </MotionSection>
      ) : null}

      {/* the complete record — every approved engagement at equal weight */}
      <MotionSection as="div" reveal="trace" className="mt-16">
        <p className="microlabel mb-8 text-accent">{t("inner.completeRecord")}</p>
        <ul className="projects-ledger">
          {projects.map((p, i) => {
            const body = (
              <>
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
              </>
            );
            return (
              <li key={p.id}>
                {projectHasDetail(p) ? (
                  <Link href={`/projects/${p.slug}`} className="project-entry project-entry-link">
                    {body}
                  </Link>
                ) : (
                  <div className="project-entry">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </MotionSection>
    </div>
  );
}
