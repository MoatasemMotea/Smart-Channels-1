"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import type { Locale, SolutionMedia } from "@/types/content";
import { localize } from "@/lib/content";

/**
 * SOLUTION DETAIL — cinematic media moment (D-050 Solutions
 * integration §12). The family's owner-approved film as a full-width
 * band between the chapter opening and the technical body. Same
 * structured record as the homepage stage (§13) — no duplicate files.
 *
 * Playback: poster-first; the video mounts for animating tiers only
 * and plays while on screen (IntersectionObserver pause/resume, §7).
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const portrait = media.orientation === "portrait";
  const showVideo = tier !== "static";

  useEffect(() => {
    if (!showVideo) return;
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) videoRef.current?.play().catch(() => {});
          else videoRef.current?.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(root);
    const onVis = () => {
      if (document.visibilityState === "hidden") videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [showVideo]);

  const visual = showVideo ? (
    <video
      ref={videoRef}
      src={media.video}
      poster={media.poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden="true"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- owner-approved poster
    <img src={media.poster} alt={localize(media.alt, locale)} loading="lazy" />
  );

  return (
    <div
      ref={rootRef}
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
