import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getHomeProjects, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LangText } from "@/components/ui/LangText";

/**
 * SELECTED PROJECTS (D-092) — the owner's five homepage projects
 * (`homeOrder` 1..5 in projects.ts), same order as before. Names only:
 * project detail pages no longer exist (D-092), so this is a plain text
 * list, not a navigational accordion — no city, no year, no image, no
 * link. The name turns --brand-magenta on hover; it is not made
 * artificially focusable (there is nothing for a keyboard user to
 * activate), so no focus-visible state is defined for it.
 */
export async function SelectedProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const items = getHomeProjects().map((p) => ({ id: p.id, name: localize(p.name, locale) }));

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
        <SectionHeading center>{t("sections.projects")}</SectionHeading>
        <ul className="selected-projects-list">
          {items.map((p) => (
            <li key={p.id} className="selected-projects-name">
              <LangText text={p.name} />
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
