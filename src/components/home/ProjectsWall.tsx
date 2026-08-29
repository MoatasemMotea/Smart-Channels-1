import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getPublicProjects, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

/**
 * SELECTED PROJECTS — equal-weight evidence wall (P5 · Q-P5-4).
 *
 * Approved records only: name, approved location/period, and approved
 * scope where the source provides it (p.26 venues). Deliberately NO
 * featured hierarchy — D-004's Project × Media × Evidence assessment at
 * P9 decides promotion to cinematic case studies. Identifier anchors the
 * inline-start (upper-right in Arabic); a signal rule answers hover/focus.
 */
export async function ProjectsWall({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const projects = getPublicProjects().slice(0, 8);

  return (
    <MotionSection
      reveal="converge"
      className="border-b border-line"
      aria-label={t("sections.projects")}
      data-scene="projects"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.projects")}</SectionHeading>
        <ul className="grid gap-x-14 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.id} className="project-entry border-b border-line">
              <span aria-hidden="true" className="project-entry-no microlabel" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="project-entry-body">
                <p className="project-entry-title tx-link font-display text-xl font-semibold md:text-2xl">
                  {localize(p.name, locale)}
                </p>
                <p className="project-entry-meta text-sm text-ink-muted">
                  {p.location ? localize(p.location, locale) : null}
                  {p.location && p.years ? " · " : null}
                  {p.years ? (
                    <span dir="ltr">
                      {p.years.to ? `${p.years.from}–${p.years.to}` : p.years.from}
                    </span>
                  ) : null}
                </p>
                {p.scope ? (
                  <p className="project-entry-scope text-xs leading-6 text-ink-muted">
                    {p.scope
                      .slice(0, 3)
                      .map((s) => localize(s, locale))
                      .join(" · ")}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/projects" className="tx-link font-semibold text-accent">
            {t("common.explore")} →
          </Link>
        </p>
      </div>
    </MotionSection>
  );
}
