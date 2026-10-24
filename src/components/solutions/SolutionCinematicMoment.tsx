"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import type { Locale, SolutionMedia } from "@/types/content";
import { localize } from "@/lib/content";
import { LazyVideo } from "@/components/ui/LazyVideo";

/**
 * SOLUTION DETAIL — cinematic media moment (D-050 Solutions
 * integration §12). The family's owner-approved film as a full-width
 * band between the chapter opening and the technical body. Same
 * structured record as the homepage stage (§13) — no duplicate files.
 *
 * Playback: poster-first; the video mounts for animating tiers only
 * and downloads and plays only while on screen (LazyVideo, preload
 * "none"; off screen it is released — §7, D-086).
 * STATIC/reduced-motion renders the reviewed poster frame only.
 * Portrait media keeps the §10 treatment: masked portrait frame over a
 * same-media depth atmosphere — never stretched, never mirrored.
 */
function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";

export function SolutionCinematicMoment({ media }: { media: SolutionMedia }) {
  const locale = useLocale() as Locale;
  const tier = useSyncExternalStore(subscribeTier, getTier, () => "static");
  const portrait = media.orientation === "portrait";
  const showVideo = tier !== "static";

  const visual = showVideo ? (
    <LazyVideo src={media.video} poster={media.poster} muted loop playsInline autoPlay aria-hidden="true" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- owner-approved poster
    <img src={media.poster} alt={localize(media.alt, locale)} loading="lazy" />
  );

  return (
    <div
      className="solution-moment"
      data-orientation={media.orientation}
      role="img"
      aria-label={localize(media.alt, locale)}
    >
      {portrait ? (
        <>
          <div
            className="ss-depth"
            style={{ backgroundImage: `url(${media.poster})` }}
            aria-hidden="true"
          />
          <div className="ss-portrait-frame">{visual}</div>
        </>
      ) : (
        <div
          className="ss-cover"
          style={
            {
              "--ss-focus": media.focus?.desktop ?? "50% 50%",
              "--ss-focus-m": media.focus?.mobile ?? media.focus?.desktop ?? "50% 50%",
            } as React.CSSProperties
          }
        >
          {visual}
        </div>
      )}
      <div className="ss-grade" aria-hidden="true" />
    </div>
  );
}
