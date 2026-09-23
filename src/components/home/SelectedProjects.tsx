import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getHomeProjects, getIndustries, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { ProjectsAccordion } from "./ProjectsAccordion";

/**
 * SELECTED PROJECTS (D-075) — a horizontal accordion of the owner's five
 * homepage projects (`homeOrder` 1..5 in projects.ts), replacing the D-050
 * §12 cinematic moments. Each panel links to the project's detail route;
 * the sector tag comes from industries.ts through `sectorIds`. Reads only
 * the D-003 ledger through the content accessors: a panel shows the
 * project's first approved image as its ground and a designed no-image
 * state until one exists — no picture is invented.
 */
export async function SelectedProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const industries = getIndustries();
  const items = getHomeProjects().map((p) => {
    const sector = industries.find((x) => x.id === p.sectorIds[0]);
    const visual = p.media?.find((m) => m.type === "image");
    return {
      slug: p.slug,
      title: localize(p.name, locale),
      sector: sector ? localize(sector.name, locale) : "",
      location: p.location ? localize(p.location, locale) : "",
      years: p.years ? `${p.years.from}${p.years.to ? `–${p.years.to}` : ""}` : "",
      image: visual ? { src: visual.src, alt: localize(visual.alt, locale) } : null,
    };
  });

  return (
    <MotionSection
      id="projects"
      reveal="converge"
      className="border-b border-line"
      aria-label={t("sections.projects")}
      data-scene="projects"
      data-stack="cover"
    >
      {/* D-079: light line + fading shadow on the rising edge */}
      <div className="scene-edge" aria-hidden="true" />
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <SectionHeading>{t("sections.projects")}</SectionHeading>
        <ProjectsAccordion items={items} />
        <p className="mt-10">
          <Link
            href="/projects"
            className="inline-block rounded bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-ink hover:text-bg focus-visible:bg-ink focus-visible:text-bg"
          >
            {t("home.selectedProjects.allProjects")}&nbsp;&nbsp;
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </MotionSection>
  );
}
