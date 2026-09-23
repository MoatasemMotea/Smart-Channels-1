import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { Hero } from "@/components/hero/Hero";
import { NetworkScene } from "@/components/network/NetworkScene";
import { AboutScene } from "@/components/home/AboutScene";
import { SolutionsShowcase } from "@/components/home/SolutionsShowcase";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { GallerySection } from "@/components/home/GallerySection";
import { AlliancesIndex, ClientsField } from "@/components/home/TrustSections";
import { LetsTalk } from "@/components/home/LetsTalk";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HashArrival } from "@/components/motion/HashArrival";
import { SectionSeam } from "@/components/motion/SectionSeam";
import { SceneStack } from "@/components/motion/SceneStack";
import { SceneIndex } from "@/components/motion/SceneIndex";

/**
 * HOMEPAGE — the primary one-page experience (final pre-media
 * directive §4 · D-050).
 *
 * Approved journey (no adjacent section repeats a composition):
 *   Opening → Cinematic Hero → Editorial About → Cinematic Reach →
 *   Technical Solutions index → Structural
 *   Industries slider → Selected Projects → Media Gallery preview →
 *   Engineered Alliances index → Calm Clients trust field →
 *   Let's Talk → Footer.
 *
 * D-079 (scroll-linked cinematics): two adjacent scene stacks — About
 * rises over the Hero, Selected Projects rises over Industries (the
 * first of each pair is sticky, FULL tier ≥ 768 px only). Every other
 * section reveals with the reversible MotionSection progress.
 *
 * Header anchors land on the section ids declared here (§5); Smart AI
 * is no longer a homepage section (§14 — the Digital Employee is a
 * floating experience). Every section is data-driven; D-020 keeps the
 * Company Profile source-only (no public document chapter exists).
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("sections");

  return (
    <>
      <HashArrival />
      <SceneIndex />
      <SceneStack>
        <Hero />
        <AboutScene locale={locale} />
      </SceneStack>

      <SectionSeam variant="converge" />

      <NetworkScene />

      {/* Solutions — cinematic media showcase (D-050 Solutions
          integration): the reach/evidence system resolves into tangible
          technology media (the Products preview that followed it was removed at D-062) */}
      <MotionSection
        id="solutions"
        reveal="trace"
        className="solutions-scene border-b border-line"
        aria-label={t("solutions")}
        data-scene="solutions"
      >
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <SectionHeading>{t("solutions")}</SectionHeading>
          <SolutionsShowcase />
        </div>
      </MotionSection>

      {/* D-062: no seam here — Solutions already reveals as `trace` and ends
          on border-b; a trace seam after it separated without distinguishing */}
      <SceneStack>
        <IndustriesSection locale={locale} />
        <SectionSeam variant="node" />
        <SelectedProjects locale={locale} />
      </SceneStack>

      {/* Gallery — approved starter media in the D-065 cover carousel; this section IS the gallery since D-067 */}
      <MotionSection
        id="gallery"
        reveal="mask"
        className="border-b border-line"
        aria-label={t("gallery")}
        data-scene="gallery"
      >
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <SectionHeading>{t("gallery")}</SectionHeading>
          <GallerySection />
        </div>
      </MotionSection>

      <SectionSeam variant="converge" />

      <AlliancesIndex locale={locale} />

      <ClientsField locale={locale} />

      <SectionSeam variant="trace" />

      <LetsTalk />
    </>
  );
}
