import dynamic from "next/dynamic";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { Link } from "@/i18n/navigation";
import { HeroBackdropStatic } from "./HeroBackdropStatic";

// Opening engine loads as its own chunk, never blocking first paint (J-12).
const OpeningExperience = dynamic(
  () => import("@/components/opening/OpeningExperience").then((m) => m.OpeningExperience),
);

/**
 * HERO — P4/P5 shared composition (D-014 typography · D-015 headline ·
 * D-019 dark cinematic environment in BOTH themes).
 *
 * Server-rendered content is the STATIC/no-JS baseline: everything below
 * is present and readable immediately; the opening choreography only
 * *stages* its reveal on first cinematic visits (CSS keyed off
 * html[data-opening]). Sub-headline copy is P2-A04-approved working copy.
 */
export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");

  return (
    <section className="hero-scene" aria-label={t("ariaLabel")} data-scene="hero" data-env="dark">
      <HeroBackdropStatic />
      <OpeningExperience />
      {/* flex-1 against the flex-column scene: content bottom-anchors to the
          real viewport height; pt-28 keeps tall headlines clear of the nav */}
      <div className="hero-content mx-auto flex w-full max-w-360 flex-1 flex-col justify-end px-6 pb-24 pt-28 lg:px-12">
        <p className="hero-stage hero-overline microlabel" data-stage="1">
          <span aria-hidden="true" className="text-accent">
            ●
          </span>
          &nbsp;&nbsp;{t("overline")}
        </p>
        <h1 className="hero-headline font-display font-bold text-ink">
          {locale === "ar" ? (
            <>
              <span className="hero-stage hero-line" data-stage="2">
                التقنية التي
              </span>
              <span className="hero-stage hero-line" data-stage="3">
                تصنع <em className="hero-accent-word">التجربة.</em>
              </span>
            </>
          ) : (
            <>
              <span className="hero-stage hero-line" data-stage="2">
                TECHNOLOGY
              </span>
              <span className="hero-stage hero-line" data-stage="3">
                BEHIND THE
              </span>
              <span className="hero-stage hero-line" data-stage="4">
                <em className="hero-accent-word">EXPERIENCE.</em>
              </span>
            </>
          )}
        </h1>
        <p className="hero-stage hero-sub mt-7 max-w-2xl text-lg text-ink-muted" data-stage="5">
          {t("sub")}
        </p>
        <div className="hero-stage mt-9 flex flex-wrap gap-4" data-stage="6">
          <Link
            href="/projects"
            className="rounded bg-accent px-7 py-4 text-sm font-semibold text-accent-ink"
          >
            {t("ctaProjects")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/#smart-ai"
            className="rounded border border-line px-7 py-4 text-sm font-semibold text-ink"
          >
            {t("ctaSmartAi")}
          </Link>
        </div>
        <div className="hero-stage mt-12 flex items-center justify-between" data-stage="7">
          <p className="microlabel flex items-center gap-3">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {t("proof")}
          </p>
          <p className="microlabel hidden items-center gap-3 sm:flex" aria-hidden="true">
            {t("scroll")}
            <span className="hero-scroll-line" />
          </p>
        </div>
      </div>
    </section>
  );
}
