import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { Hero } from "@/components/hero/Hero";
import { NetworkScene } from "@/components/network/NetworkScene";
import { AboutScene } from "@/components/home/AboutScene";
import { SolutionsIndex } from "@/components/home/SolutionsIndex";
import { IndustriesMatrix } from "@/components/home/IndustriesMatrix";
import { ProductsTeaser } from "@/components/home/ProductsStage";
import { ProjectsWall } from "@/components/home/ProjectsWall";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { SmartAiTeaser } from "@/components/home/SmartAiTeaser";
import { AlliancesIndex, ClientsField } from "@/components/home/TrustSections";
import { FinalCta } from "@/components/home/FinalCta";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * HOMEPAGE — the complete designed journey (P5).
 *
 * Approved rhythm (no adjacent section repeats a composition):
 *   Cinematic Hero → Editorial About → Cinematic Saudi Network/Track
 *   Record → Technical Solutions index → Structural Industries matrix →
 *   Evidence Projects wall → Media Gallery preview → Cinematic Smart AI
 *   teaser → Engineered Alliances index → Calm Clients trust field →
 *   Cinematic Final CTA (the signal field returns) → Footer.
 *
 * Every section is data-driven; D-020 keeps the Company Profile
 * source-only (no public document chapter exists).
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations("sections");

  return (
    <>
      <Hero />

      <AboutScene locale={locale} />

      <NetworkScene />

      {/* Solutions — technical ecosystem index (Q-P5-2a) */}
      <MotionSection
        reveal="trace"
        className="border-b border-line"
        aria-label={t("solutions")}
        data-scene="solutions"
      >
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <SectionHeading>{t("solutions")}</SectionHeading>
          <SolutionsIndex />
        </div>
      </MotionSection>

      <ProductsTeaser />

      <IndustriesMatrix locale={locale} />

      <ProjectsWall locale={locale} />

      {/* Gallery — approved starter media, editorial masonry (Q-P5-5) */}
      <MotionSection
        reveal="sweep"
        className="border-b border-line"
        aria-label={t("gallery")}
        data-scene="gallery"
      >
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
          <SectionHeading>{t("gallery")}</SectionHeading>
          <GalleryPreview />
        </div>
      </MotionSection>

      <SmartAiTeaser />

      <AlliancesIndex locale={locale} />

      <ClientsField locale={locale} />

      <FinalCta locale={locale} />
    </>
  );
}
