"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { heroMedia } from "@/content/hero-media";

/**
 * Hero cinematic media layer (P4 Rev3 §§7–9 · D-024).
 *
 * Production-ready slot for the AI-generated event-technology film:
 * poster-first, muted, looped, playsinline, preload="none" — the video
 * never blocks LCP (the server-rendered hero text is the meaningful
 * first frame; playback starts only after the browser signals readiness
 * and the hero is on screen). Tier rules: FULL/LITE play the appropriate
 * derivative, STATIC (and reduced motion) shows the poster only. Media
 * pauses offscreen. Renders NOTHING until an owner-approved asset is
 * configured in src/content/hero-media.ts (no stock footage, no
 * placeholder video — §30).
 */
function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";

export function HeroMedia() {
  const tier = useSyncExternalStore(subscribeTier, getTier, () => "static");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { enabled, videoSrc, videoMobileSrc, poster } = heroMedia;
  const wantsVideo = enabled && tier !== "static" && Boolean(videoSrc);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !wantsVideo) return;
    // play only when visible; pause offscreen / hidden tab (§25)
    let inView = true;
    const sync = () => {
      if (inView && document.visibilityState === "visible") {
        video.play().catch(() => {
          /* autoplay rejected — poster remains, which is a valid state */
        });
      } else {
        video.pause();
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView = e.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [wantsVideo]);

  if (!enabled || !poster) return null;

  if (!wantsVideo) {
    // STATIC tier (or no video yet): the poster is the designed still
    // eslint-disable-next-line @next/next/no-img-element -- full-bleed decorative layer; sizing is CSS-driven
    return <img src={poster} alt="" aria-hidden="true" className="hero-media" />;
  }

  const src = typeof window !== "undefined" && window.innerWidth < 768 && videoMobileSrc
    ? videoMobileSrc
    : videoSrc!;

  return (
    <video
      ref={videoRef}
      className="hero-media"
      poster={poster}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
