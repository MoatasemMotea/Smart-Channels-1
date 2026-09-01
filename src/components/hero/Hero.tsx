import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { Link } from "@/i18n/navigation";
import { HeroBackdropStatic } from "./HeroBackdropStatic";
import { HeroRiyadh } from "./HeroRiyadh";
import { HeroTechObjects } from "./HeroTechObjects";

// Statically imported: the opening must hydrate WITH the page — a lazy
// chunk raced the auto-skip window and cancelled the sequence on
// real-world loads (opening-visibility root cause #2).
import { OpeningExperience } from "@/components/opening/OpeningExperience";

/**
 * HERO — reference-locked composition (D-042; D-014/D-015 wording, D-019
 * dark cinematic environment, D-041 Riyadh photographic scene).
 *
 * Layout (final pre-media directive §2 · D-050): editorial column on
 * the inline-start (brand-only overline → locked headline → copy →
 * CTAs), the Riyadh photograph dominant center/end with the small
 * technology-object layer drifting above it, and the scroll indicator
 * on the bottom edge. NO statistics, NO project/event references, NO
 * industry descriptor and NO geographic text labels live in the hero —
 * those belong to their own homepage sections.
 *
 * Server-rendered content is the STATIC/no-JS baseline; the opening
 * choreography only *stages* its reveal (CSS keyed off
 * html[data-opening]). Sub-headline copy is P2-A04-approved working copy.
 */
export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");

  return (
    <section className="hero-scene" aria-label={t("ariaLabel")} data-scene="hero" data-env="dark">
      <HeroBackdropStatic />
      {/* D-041: the owner-approved Riyadh photographic scene — the
          photograph, the registered technology-network overlay, and the
          D-024 video slot all live inside its art-direction frame. The
          live particle canvas paints above it. */}
      <HeroRiyadh />
      {/* §2.1/§2.2: small drifting technology objects — the hero's only
          decorative motion layer besides the particle field */}
      <HeroTechObjects />
      {/* CSS-only pre-stage (D-050): darkness + a subtle signal pulse
          from the FIRST paint of a pending opening — never the logo
          (the logo appears ONCE, after the cinematic motion). The
          engine's fixed stage (z-60) takes over above it. */}
      <div className="opening-prestage" aria-hidden="true">
        <span className="prestage-pulse" />
      </div>
      <OpeningExperience />

      {/* the editorial column centers vertically; the proof/scroll bar
          anchors to the bottom edge (mt-auto against the flex column) */}
      <div className="hero-content mx-auto flex w-full max-w-360 flex-1 flex-col justify-center px-6 pb-10 pt-28 lg:px-12">
        <div className="hero-editorial max-w-xl">
          <p className="hero-stage hero-overline microlabel" data-stage="1">
            <span aria-hidden="true" className="text-accent">
              ●
            </span>
            &nbsp;&nbsp;{t("overline")}
          </p>
          <h1 className="hero-headline mt-5 font-display font-bold text-ink">
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
          <p className="hero-stage hero-sub mt-6 max-w-lg text-base text-ink-muted" data-stage="5">
            {t("sub")}
          </p>
          <div className="hero-stage mt-8 flex flex-wrap gap-4" data-stage="6">
            <Link
              href="/projects"
              className="magnetic rounded bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink"
            >
              {t("ctaProjects")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/#contact"
              className="rounded border border-line px-6 py-3.5 text-sm font-semibold text-ink"
            >
              {t("ctaContact")}
            </Link>
          </div>
        </div>

        {/* §2: statistics live in the Reach section, not the hero. Only
            the scroll indicator anchors to the bottom edge (pe-20 keeps
            it clear of the floating action stack). */}
        <div className="hero-stage mt-auto flex items-center justify-end pe-20 pt-10" data-stage="7">
          <p className="microlabel hidden items-center gap-3 sm:flex" aria-hidden="true">
            {t("scroll")}
            <span className="hero-scroll-line" />
          </p>
        </div>
      </div>
    </section>
  );
}
