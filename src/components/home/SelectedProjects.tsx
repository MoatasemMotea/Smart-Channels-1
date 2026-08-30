import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getFeaturedProjects, getIndustries, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

/**
 * SELECTED PROJECTS — cinematic large-moment sequence (final pre-media
 * directive §12 · D-050).
 *
 * The owner's four Selected Projects present as full-width cinematic
 * moments — numbered index, display-scale title, approved sector and
 * location voice, and an "Explore Project" doorway into the detail
 * route. Deliberately NOT a card grid.
 *
 * MEDIA-READY: each moment carries a media slot — when a project's
 * first approved `media` entry exists it becomes the moment's visual
 * ground; until then an engineered signal backdrop holds the stage
 * (programmatic, never stock, never invented evidence). Reads only the
 * D-003 ledger through the content accessors.
 */
export async function SelectedProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const featured = getFeaturedProjects();
  const industries = getIndustries();
  const sectorName = (ids?: string[]) => {
    const s = industries.find((x) => x.id === ids?.[0]);
    return s ? localize(s.name, locale) : null;
  };

  return (
    <MotionSection
      reveal="converge"
      className="border-b border-line"
      aria-label={t("sections.projects")}
      data-scene="projects"
      data-env="dark"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.projects")}</SectionHeading>
      </div>
      <ol className="selected-projects">
        {featured.map((p, i) => {
          const visual = p.media?.find((m) => m.type === "image");
          return (
            <li key={p.id} className="project-moment" data-moment={i % 2 ? "end" : "start"}>
              {/* media-ready ground: approved project media when it
                  exists, engineered signal field until then */}
              <div className="project-moment-ground" aria-hidden="true">
                {visual ? (
                  <Image
                    src={visual.src}
                    alt=""
                    fill
                    sizes="100vw"
                    className="project-moment-photo"
                  />
                ) : (
                  <div className="project-moment-field">
                    <span className="project-moment-beam" />
                    <span className="project-moment-node" />
                  </div>
                )}
              </div>
              <div className="project-moment-content mx-auto max-w-360 px-6 lg:px-12">
                <p className="microlabel text-accent" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="project-moment-title font-display font-bold">
                  {localize(p.name, locale)}
                </h3>
                <p className="mt-4 text-sm text-ink-muted">
                  {sectorName(p.sectorIds)}
                  {sectorName(p.sectorIds) && p.location ? " · " : null}
                  {p.location ? localize(p.location, locale) : null}
                </p>
                <p className="mt-8">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="project-moment-cta inline-block rounded border border-accent px-6 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
                  >
                    {t("home.selectedProjects.exploreProject")}&nbsp;&nbsp;
                    <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mx-auto max-w-360 px-6 py-10 lg:px-12">
        <Link href="/projects" className="tx-link font-semibold text-accent">
          {t("home.selectedProjects.allProjects")} →
        </Link>
      </div>
    </MotionSection>
  );
}
