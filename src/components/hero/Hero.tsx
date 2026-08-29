import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { Link } from "@/i18n/navigation";
import { stats } from "@/content/stats";
import { localize } from "@/lib/content";
import { HeroBackdropStatic } from "./HeroBackdropStatic";
import { HeroRiyadh } from "./HeroRiyadh";

// Statically imported: the opening must hydrate WITH the page — a lazy
// chunk raced the auto-skip window and cancelled the sequence on
// real-world loads (opening-visibility root cause #2).
import { OpeningExperience } from "@/components/opening/OpeningExperience";

/**
 * HERO — reference-locked composition (D-042; D-014/D-015 wording, D-019
 * dark cinematic environment, D-041 Riyadh photographic scene).
 *
 * Layout follows the approved visual target: editorial column on the
 * inline-start (overline → restrained headline → copy → CTAs), the
 * Riyadh skyline and network center/end, the approved Track Record
 * figures as a quiet vertical rail on the inline-end (single-sourced
 * from stats.ts — never duplicated literals, D-002), and the scroll
 * indicator on the bottom edge. No geographic text labels anywhere in
 * the composition — the geography is communicated visually.
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
      {/* CSS-only pre-stage: guarantees darkness → readable authoritative
          logo from the FIRST paint of a pending opening, before any JS —
          the engine's fixed stage (z-60) takes over above it. Hidden for
          STATIC (reduced-motion exempt) and once the opening resolves. */}
      <div className="opening-prestage" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- preloaded authoritative asset; CSS choreographs it pre-hydration */}
        <img src="/brand/logo-dark.png" alt="" width={264} height={216} />
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
              className="rounded bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink"
            >
              {t("ctaProjects")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/#smart-ai"
              className="rounded border border-line px-6 py-3.5 text-sm font-semibold text-ink"
            >
              {t("ctaSmartAi")}
            </Link>
          </div>
        </div>

        {/* approved Track Record figures — quiet vertical rail on the
            inline-end (reference composition §5). Reads stats.ts, the
            single D-002 source; numeric tokens stay bidi-isolated. */}
        <aside className="hero-stage hero-stats-rail" data-stage="7" aria-label={t("proof")}>
          {stats.map((s) => (
            <div key={s.id} className="hero-stat">
              <p className="hero-stat-value font-display">
                <bdi dir="ltr">
                  {s.value}
                  {s.suffix ?? ""}
                </bdi>
              </p>
              <p className="hero-stat-label">{localize(s.label, locale)}</p>
            </div>
          ))}
        </aside>

        {/* pe-20 keeps the scroll indicator clear of the floating action */}
        <div className="hero-stage mt-auto flex items-center justify-between pe-20 pt-10" data-stage="8">
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
