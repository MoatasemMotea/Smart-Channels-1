import { preload } from "react-dom";
import { getTranslations } from "next-intl/server";
import { heroScene } from "@/content/hero-media";
import { HeroMedia } from "./HeroMedia";
import { HeroPointerDepth } from "./HeroPointerDepth";

/**
 * HERO — Riyadh photographic scene (owner-approved media · D-041).
 *
 * Layer architecture (bottom → top):
 *   1. the approved Riyadh skyline photograph (untouched — never traced,
 *      recolored, mirrored or redrawn), presented full-bleed through a
 *      manual cover frame so the composition is art-directed per
 *      orientation instead of relying on object-position guesswork;
 *   2. the programmatic RIYADH TECHNOLOGY NETWORK — an SVG overlay that
 *      shares the photograph's exact coordinate space (1672×941), so the
 *      luminous origin stays registered on the Kingdom Centre crown at
 *      every viewport: origin ring, fine signal routes, traveling pulses
 *      (SMIL — removed entirely on STATIC), activation nodes;
 *   3. the live particle field (opening canvas) renders above this whole
 *      stage, re-tuned to telemetry density.
 *
 * The frame + overlay scale-drift together (the network is attached to
 * the city); pointer depth shifts the overlay a few px against the
 * photograph in FULL only. Server-rendered: the photograph and network
 * exist in STATIC/no-JS immediately. The photograph is preloaded with
 * high priority so the opening never reveals into an empty hero.
 *
 * Brand storytelling only: the single caption reuses the approved
 * "RIYADH — HEADQUARTERS" wording; the Gulf reach story remains in the
 * approved network scene's geography (§5) — nothing here pretends the
 * Gulf exists inside the Riyadh photograph.
 */
export async function HeroRiyadh() {
  const t = await getTranslations("opening");
  preload(heroScene.src, {
    as: "image",
    imageSrcSet: heroScene.srcSet,
    imageSizes: heroScene.sizes,
    fetchPriority: "high",
  });

  return (
    <div className="hero-photo-stage" aria-hidden="true">
      <div className="hero-photo-frame">
        <div className="hero-photo-drift">
          {/* eslint-disable-next-line @next/next/no-img-element -- LCP-critical art-directed frame; Next/Image cannot drive the manual cover math */}
          <img
            src={heroScene.src}
            srcSet={heroScene.srcSet}
            sizes={heroScene.sizes}
            width={heroScene.width}
            height={heroScene.height}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            draggable={false}
          />

          {/* D-024 video slot: when the owner approves the cinematic film
              it plays here, inside the same art-direction frame, above
              the photograph (which remains poster/fallback). Renders
              nothing until configured. */}
          <HeroMedia />

          {/* Riyadh technology network — registered to the photograph */}
          <svg
            className="riyadh-overlay"
            viewBox="0 0 1672 941"
            preserveAspectRatio="none"
            role="presentation"
            focusable="false"
          >
            <defs>
              <radialGradient id="riyadh-origin-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="var(--brand-magenta)" stopOpacity="0.3" />
                <stop offset="0.55" stopColor="var(--brand-purple)" stopOpacity="0.12" />
                <stop offset="1" stopColor="var(--brand-purple)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="riyadh-horizon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4468e0" stopOpacity="0" />
                <stop offset="1" stopColor="#4468e0" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            {/* gentle extra horizon glow — atmosphere, never a recolor */}
            <rect x="0" y="700" width="1672" height="241" fill="url(#riyadh-horizon)" />

            {/* luminous origin above the Kingdom Centre crown */}
            <circle cx="1177" cy="146" r="86" fill="url(#riyadh-origin-glow)" />
            <circle className="riyadh-origin-ring" cx="1177" cy="146" r="14" fill="none" stroke="var(--brand-magenta)" strokeWidth="1.4" opacity="0.85" />
            <circle className="riyadh-origin-core" cx="1177" cy="146" r="3.2" fill="var(--brand-magenta)" />

            {/* fine signal routes — Riyadh as the network origin */}
            <path id="riyadh-route-a" className="riyadh-route" d="M1177 146 Q640 110 150 628" fill="none" stroke="var(--brand-magenta)" strokeWidth="1" opacity="0.32" />
            <path id="riyadh-route-b" className="riyadh-route" d="M1177 146 Q1430 210 1618 458" fill="none" stroke="#5f7bdc" strokeWidth="1" opacity="0.3" />
            <path id="riyadh-route-c" className="riyadh-route" d="M1177 146 Q900 390 486 796" fill="none" stroke="#5f7bdc" strokeWidth="0.9" opacity="0.24" />
            <path id="riyadh-route-d" className="riyadh-route riyadh-route-far" d="M1177 146 Q1310 430 1508 694" fill="none" stroke="var(--brand-magenta)" strokeWidth="0.9" opacity="0.2" />

            {/* endpoint + activation nodes */}
            <circle className="riyadh-node" cx="150" cy="628" r="2.4" fill="var(--brand-magenta)" opacity="0.75" />
            <circle className="riyadh-node" cx="1618" cy="458" r="2.4" fill="#8ea4ec" opacity="0.75" />
            <circle className="riyadh-node" cx="486" cy="796" r="2.2" fill="#8ea4ec" opacity="0.65" />
            <circle className="riyadh-node" cx="1508" cy="694" r="2.2" fill="var(--brand-magenta)" opacity="0.6" />
            <circle className="riyadh-node" cx="620" cy="318" r="1.8" fill="#8ea4ec" opacity="0.55" />
            <circle className="riyadh-node" cx="1445" cy="270" r="1.8" fill="#8ea4ec" opacity="0.55" />

            {/* traveling signal pulses (SMIL — display:none removes them on
                STATIC/reduced-motion; LITE keeps a single pulse) */}
            <circle className="riyadh-pulse" r="2.6" fill="var(--brand-magenta)">
              <animateMotion dur="9s" repeatCount="indefinite">
                <mpath href="#riyadh-route-a" />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.12;0.85;1" dur="9s" repeatCount="indefinite" />
            </circle>
            <circle className="riyadh-pulse riyadh-pulse-b" r="2.4" fill="#8ea4ec">
              <animateMotion dur="12s" begin="3s" repeatCount="indefinite">
                <mpath href="#riyadh-route-b" />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.12;0.85;1" dur="12s" begin="3s" repeatCount="indefinite" />
            </circle>
            <circle className="riyadh-pulse riyadh-pulse-c" r="2.2" fill="#8ea4ec">
              <animateMotion dur="11s" begin="6s" repeatCount="indefinite">
                <mpath href="#riyadh-route-c" />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.12;0.85;1" dur="11s" begin="6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* approved wording only — Riyadh is the origin, not a project
            claim. Inside the frame (outside the drift) so it stays
            beside the tower at every viewport. */}
        <p className="riyadh-hq-label microlabel">{t("hqLabel")}</p>
      </div>

      <HeroPointerDepth />
    </div>
  );
}
