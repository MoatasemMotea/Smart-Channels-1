import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getCompany, localize } from "@/lib/content";
import { aboutMedia } from "@/content/company";
import { MotionSection } from "@/components/motion/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * ABOUT — editorial split (P5 · Q-P5-1).
 *
 * Large positioning statement + approved mission copy on one side, the
 * authentic fiber-splicing field still on the other (masked editorial
 * reveal — evidence, not decoration), and the four capability pillars as
 * a structural row beneath. All copy is approved company content; the
 * image is owner-supplied source media (never stock, never AI-as-evidence).
 */
export async function AboutScene({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const company = getCompany();

  return (
    <MotionSection
      id="about"
      reveal="mask"
      className="border-b border-line"
      aria-label={t("sections.about")}
      data-scene="about"
    >
      <div className="mx-auto max-w-360 px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <SectionHeading index={t("sections.about")}>
              {localize(company.positioning, locale)}
            </SectionHeading>
            <p className="max-w-xl text-lg leading-8 text-ink-muted">
              {localize(company.about, locale)}
            </p>
            <p className="microlabel mt-10 text-accent">{t("home.missionLabel")}</p>
            <p className="mt-3 max-w-xl border-s-2 border-accent ps-5 text-base leading-8">
              {localize(company.mission, locale)}
            </p>
          </div>
          <figure className="media-frame self-center">
            <div className="media-reveal">
              {/* §7 media-ready: an owner-approved company film replaces
                  the photograph the moment aboutMedia is enabled — the
                  photograph stays the poster/fallback. */}
              {aboutMedia.enabled && aboutMedia.videoSrc ? (
                <video
                  src={aboutMedia.videoSrc}
                  poster={aboutMedia.poster ?? undefined}
                  className="h-auto w-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src="/media/gallery/fiber-splicing-riyadh-2025.webp"
                  alt={
                    locale === "ar"
                      ? "لِحام ألياف بصرية بيد فنيّ من Smart Channels، الرياض 2025"
                      : "Fiber-optic fusion splicing by a Smart Channels technician, Riyadh 2025"
                  }
                  width={848}
                  height={464}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              )}
            </div>
            <figcaption className="microlabel mt-3">{t("home.aboutImageCaption")}</figcaption>
          </figure>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {company.capabilities.map((c) => (
            <li key={c.id} className="border-t border-line pt-4">
              <p className="font-display text-lg font-semibold">{localize(c.name, locale)}</p>
              <p className="mt-2 text-sm leading-7 text-ink-muted">
                {localize(c.description, locale)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
