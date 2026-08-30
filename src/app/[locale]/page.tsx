import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { Hero } from "@/components/hero/Hero";
import { NetworkScene } from "@/components/network/NetworkScene";
import { AboutScene } from "@/components/home/AboutScene";
import { SolutionsShowcase } from "@/components/home/SolutionsShowcase";
import { IndustriesMatrix } from "@/components/home/IndustriesMatrix";
import { ProductsTeaser } from "@/components/home/ProductsStage";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AlliancesIndex, ClientsField } from "@/components/home/TrustSections";
import { LetsTalk } from "@/components/home/LetsTalk";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HashArrival } from "@/components/motion/HashArrival";

/**
 * HOMEPAGE — the primary one-page experience (final pre-media
 * directive §4 · D-050).
 *
 * Approved journey (no adjacent section repeats a composition):
 *   Opening → Cinematic Hero → Editorial About → Cinematic Reach →
 *   Technical Solutions index → Products preview → Structural
 *   Industries matrix → Selected Projects → Media Gallery preview →
 *   Engineered Alliances index → Calm Clients trust field →
 *   Let's Talk → Footer.
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
      <Hero />

      <AboutScene locale={locale} />

      <NetworkScene />

      {/* Solutions — cinematic media showcase (D-050 Solutions
          integration): the reach/evidence system resolves into tangible
          technology media, then hands off toward the Products stage */}
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

      <ProductsTeaser />

      <IndustriesMatrix locale={locale} />

      <SelectedProjects locale={locale} />

      {/* Gallery — approved starter media, editorial masonry (Q-P5-5) */}
      <MotionSection
        id="gallery"
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

      <AlliancesIndex locale={locale} />

      <ClientsField locale={locale} />

      <LetsTalk />
    </>
  );
}
