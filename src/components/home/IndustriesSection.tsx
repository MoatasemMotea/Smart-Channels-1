import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getIndustries, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustriesSlider } from "./IndustriesSlider";

/**
 * INDUSTRIES (D-072) — a full-width hero slider of the 16 approved sectors
 * in the owner's importance order, replacing the Q-P5-3 typographic matrix
 * (and its "featured" marks, which are gone from the data). The section
 * shell (id, scene, heading) is unchanged so hash arrival and the seams
 * around it keep working; the slider itself is a client component.
 */
export async function IndustriesSection({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const items = getIndustries().map((i) => ({
    id: i.id,
    name: localize(i.name, locale),
    tagline: localize(i.tagline, locale),
    image: i.image ? `/media/industries/${i.image}` : "",
    imageWidth: i.imageWidth,
  }));

  return (
    <MotionSection
      id="industries"
      className="border-b border-line"
      aria-label={t("sections.industries")}
      data-scene="industries"
    >
      <div className="mx-auto max-w-360 px-6 pt-20 lg:px-12">
        <SectionHeading>{t("sections.industries")}</SectionHeading>
      </div>
      <IndustriesSlider items={items} />
    </MotionSection>
  );
}
