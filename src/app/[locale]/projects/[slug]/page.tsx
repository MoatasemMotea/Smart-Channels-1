import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale, Project, ProjectMedia } from "@/types/content";
import {
  getDetailProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getPublishedGalleryItems,
  getRelatedProjects,
  localize,
  projectHasDetail,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { MotionSection } from "@/components/motion/MotionSection";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  // evidence-adaptive rule (D-044): only Featured or deep-evidence
  // records earn detail routes — thin pages never exist
  return routing.locales.flatMap((locale) =>
    getDetailProjects().map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !projectHasDetail(project)) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/projects/${slug}`,
    title: localize(project.name, locale as Locale),
    description: [
      project.location ? localize(project.location, locale as Locale) : null,
      project.years ? `${project.years.from}${project.years.to ? `–${project.years.to}` : ""}` : null,
    ]
      .filter(Boolean)
      .join(" · "),
  });
}

/** The project's approved media pool: its own entries + referenced
 *  published Gallery items (by reference, never duplicated — D-013). */
function mediaPool(project: Project): ProjectMedia[] {
  const gallery = getPublishedGalleryItems()
    .filter((g) => project.galleryItemIds?.includes(g.id))
    .map((g, i) => ({
      id: `gal-${g.id}`,
      type: g.type,
      src: g.src,
      poster: g.poster,
      alt: g.alt,
      caption: g.caption,
      order: 1000 + i,
    }));
  return [...(project.media ?? []), ...gallery].sort((a, b) => a.order - b.order);
}

/**
 * PROJECT DETAIL (P9 · D-044) — evidence-adaptive architecture.
 *
 * CINEMATIC MEDIA MODE: when owner-approved media exists
 * (caseStudy.heroMedia or the media pool), the page opens on the
 * authentic asset and carries large media moments + a media rail —
 * activated purely by data (D-016: a media-backed Featured project is
 * never reduced to typography).
 *
 * EVIDENCE-LED MODE: until then the page opens on a programmatic
 * signal composition and tells the approved story through facts —
 * name, location, period, delivered scope, services. No placeholders,
 * no fake imagery, no invented facts; absent fields simply do not
 * render (Amendment 2).
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const project = getProjectBySlug(slug);
  if (!project || !projectHasDetail(project)) notFound();

  const media = mediaPool(project);
  const hero = project.caseStudy?.heroMedia ?? media[0];
  const rail = hero ? media.filter((m) => m.id !== hero.id) : media;
  const related = getRelatedProjects(project);
  const featured = getFeaturedProjects();
  const fIdx = featured.findIndex((p) => p.id === project.id);
  const nextFeatured = fIdx >= 0 ? featured[(fIdx + 1) % featured.length] : undefined;
  const years = project.years
    ? `${project.years.from}${project.years.to ? `—${project.years.to}` : ""}`
    : null;

  return (
    <>
      {/* cinematic opening — media mode when approved media exists,
          programmatic signal composition otherwise */}
      <header
        className="project-opening"
        data-env="dark"
        data-mode={hero ? "media" : "evidence"}
      >
        {hero ? (
          <div className="project-opening-media" aria-hidden="true">
            {hero.type === "video" ? (
              <video src={hero.src} poster={hero.poster} muted loop playsInline autoPlay preload="metadata" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- owner-approved project media, art-directed cover
              <img src={hero.src} alt="" />
            )}
          </div>
        ) : (
          <div className="project-opening-backdrop" aria-hidden="true">
            <span className="po-a" />
            <span className="po-b" />
            <span className="po-c" />
          </div>
        )}
        <div className="relative mx-auto w-full max-w-360 px-6 lg:px-12">
          <p className="page-hero-overline microlabel">
            <span aria-hidden="true" className="text-accent">●</span>
            &nbsp;&nbsp;
            {project.featured ? t("inner.featuredChapter") : t("pages.projects.title")}
          </p>
          <h1 className="page-hero-title font-display font-bold">
            {localize(project.name, locale)}
          </h1>
          <p className="project-opening-meta microlabel">
            {project.location ? <span>{localize(project.location, locale)}</span> : null}
            {years ? (
              <span dir="ltr" className="inline-block">
                {years}
              </span>
            ) : null}
          </p>
        </div>
      </header>

      {/* overview — renders only when approved copy exists */}
      {project.caseStudy?.overview ? (
        <MotionSection reveal="mask" className="border-b border-line" aria-label={t("inner.overview")}>
          <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
            <p className="microlabel mb-6 text-accent">{t("inner.overview")}</p>
            <p className="max-w-3xl text-xl leading-9">{localize(project.caseStudy.overview, locale)}</p>
          </div>
        </MotionSection>
      ) : null}

      {/* delivered scope — the approved technical evidence */}
      {project.scope && project.scope.length > 0 ? (
        <MotionSection reveal="trace" className="border-b border-line" aria-label={t("inner.deliveredScope")}>
          <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
            <p className="microlabel mb-8 text-accent">{t("inner.deliveredScope")}</p>
            <ol className="scope-index">
              {project.scope.map((item, i) => (
                <li key={i} className="scope-item">
                  <span aria-hidden="true" className="scope-item-index microlabel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-semibold md:text-xl">{localize(item, locale)}</p>
                </li>
              ))}
            </ol>
          </div>
        </MotionSection>
      ) : null}

      {/* services — only if approved records exist */}
      {project.services && project.services.length > 0 ? (
        <MotionSection reveal="rise" className="border-b border-line" aria-label={t("sections.solutions")}>
          <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {project.services.map((s) => (
                <article key={s.id} className="capability-pillar">
                  <h2 className="text-lg font-semibold">{localize(s.title, locale)}</h2>
                  {s.description ? (
                    <p className="mt-3 text-sm leading-7 text-ink-muted">{localize(s.description, locale)}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </MotionSection>
      ) : null}

      {/* media rail — appears the moment approved media is added (data-only) */}
      {rail.length > 0 ? (
        <MotionSection reveal="sweep" className="border-b border-line" aria-label={t("inner.projectMedia")}>
          <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
            <p className="microlabel mb-8 text-accent">{t("inner.projectMedia")}</p>
            <ul className="project-media-rail">
              {rail.map((m) => (
                <li key={m.id} className="project-media-card">
                  <figure>
                    <div className="gallery-shell-media">
                      {m.type === "video" ? (
                        <video src={m.src} poster={m.poster} muted loop playsInline preload="none" controls aria-label={localize(m.alt, locale)} />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element -- owner-approved project media
                        <img src={m.src} alt={localize(m.alt, locale)} loading="lazy" />
                      )}
                    </div>
                    {m.caption ? (
                      <figcaption className="gallery-shell-caption">
                        <span>{localize(m.caption, locale)}</span>
                      </figcaption>
                    ) : null}
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>
      ) : null}

      {/* related projects — same approved sector, links only where a
          detail route exists */}
      {related.length > 0 ? (
        <MotionSection reveal="converge" className="border-b border-line" aria-label={t("inner.relatedProjects")}>
          <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
            <p className="microlabel mb-8 text-accent">{t("inner.relatedProjects")}</p>
            <ul className="related-projects">
              {related.map((r) => (
                <li key={r.id} className="related-project">
                  {projectHasDetail(r) ? (
                    <Link href={`/projects/${r.slug}`} className="related-project-link tx-link">
                      {localize(r.name, locale)}
                    </Link>
                  ) : (
                    <span>{localize(r.name, locale)}</span>
                  )}
                  {r.location ? (
                    <span className="microlabel">{localize(r.location, locale)}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>
      ) : null}

      {/* project-to-project transition: the signal hands off to the next
          Featured story; the ledger stays one step away */}
      <MotionSection reveal="rise" aria-label={t("inner.allProjects")}>
        <div className="mx-auto max-w-360 px-6 py-14 lg:px-12">
          <nav className="solution-xnav" aria-label={t("inner.allProjects")}>
            <Link href="/projects" className="solution-xnav-link">
              <span className="microlabel text-ink-muted">{t("inner.allProjects")}</span>
              <span className="mt-1 block font-display text-lg font-semibold">
                {t("pages.projects.title")}
              </span>
            </Link>
            <span aria-hidden="true" className="project-xnav-signal" />
            {nextFeatured && nextFeatured.id !== project.id ? (
              <Link href={`/projects/${nextFeatured.slug}`} className="solution-xnav-link solution-xnav-next" rel="next">
                <span className="microlabel text-ink-muted">{t("inner.nextProject")}</span>
                <span className="mt-1 block font-display text-lg font-semibold">
                  {localize(nextFeatured.name, locale)}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </MotionSection>
    </>
  );
}
