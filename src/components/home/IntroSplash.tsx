"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";

/**
 * VIDEO INTRO SPLASH (D-085) — homepage only, once per session.
 *
 * IntroScript decides pre-paint and marks html[data-intro="on"]; CSS shows
 * this container (and locks scroll) only under that attribute, so the
 * server markup is identical for every visitor and nothing flashes. The
 * <video> and its two sources mount on the client ONLY when the intro is
 * on — a visitor who never sees it downloads none of it.
 *
 * Sound never starts by itself: the video plays muted and only the sound
 * button unmutes it. It closes on the first of: video end, currentTime
 * past duration − 0.9 s, Skip, Esc, a media error, play() rejected, or
 * no playback within 3 s. The exit (0.9 s) scales and blurs the video,
 * fades the container and the sound together; then it records
 * sessionStorage "sc-intro"="1", releases the scroll lock, leaves the DOM
 * and fires window "sc:intro-done". ThemeAndTierScript has already set
 * the opening to "skipped", so the hero below is in its final state.
 */
const EXIT_MS = 900;
const START_GUARD_MS = 3000;
const END_LEAD_S = 0.9;

type Snap = "unknown" | "on" | "off";
const noSubscribe = () => () => {};
const getSnap = (): Snap => (document.documentElement.getAttribute("data-intro") === "on" ? "on" : "off");
const getServerSnap = (): Snap => "unknown";

export function IntroSplash() {
  const t = useTranslations("intro");
  const locale = useLocale();
  // server + hydration render "unknown" (the hidden shell); the client
  // then reads the pre-paint decision
  const snap = useSyncExternalStore(noSubscribe, getSnap, getServerSnap);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const soundRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setOut(true);
    const v = videoRef.current;
    // the sound fades out with the picture
    if (v && !v.muted) {
      const from = v.volume;
      const t0 = performance.now();
      const fade = () => {
        const k = Math.min(1, (performance.now() - t0) / EXIT_MS);
        v.volume = from * (1 - k);
        if (k < 1) requestAnimationFrame(fade);
      };
      requestAnimationFrame(fade);
    }
    window.setTimeout(() => {
      v?.pause();
      try {
        sessionStorage.setItem("sc-intro", "1");
      } catch {
        /* storage unavailable — the intro may show again next load */
      }
      document.documentElement.removeAttribute("data-intro"); // releases the scroll lock
      setGone(true);
      window.dispatchEvent(new Event("sc:intro-done"));
    }, EXIT_MS);
  }, []);

  const active = snap === "on" && !gone;

  useEffect(() => {
    if (!active) return;
    const v = videoRef.current;
    if (!v) return;
    skipRef.current?.focus({ preventScroll: true });

    let started = false;
    const onPlaying = () => {
      started = true;
    };
    const onTime = () => {
      if (v.duration && v.currentTime > v.duration - END_LEAD_S) close();
    };
    let raf = 0;
    const tick = () => {
      if (barRef.current && v.duration) barRef.current.style.transform = `scaleX(${Math.min(1, v.currentTime / v.duration)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // a failed <source> fires its error on that source, not the video —
    // only the LAST one failing means nothing can play (WebM → MP4)
    const lastSource = v.querySelector("source:last-of-type");
    v.addEventListener("playing", onPlaying);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", close);
    v.addEventListener("error", close);
    lastSource?.addEventListener("error", close);
    const guard = window.setTimeout(() => {
      if (!started) close();
    }, START_GUARD_MS);
    v.muted = true; // never autoplay sound
    const p = v.play();
    if (p) p.catch(() => close());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        // a modal dialog: Tab stays on its two buttons
        const items = [soundRef.current, skipRef.current].filter((x): x is HTMLButtonElement => !!x);
        const i = items.indexOf(document.activeElement as HTMLButtonElement);
        e.preventDefault();
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(guard);
      window.removeEventListener("keydown", onKey);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", close);
      v.removeEventListener("error", close);
      lastSource?.removeEventListener("error", close);
    };
  }, [active, close]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v || closing.current) return;
    v.muted = !v.muted;
    if (!v.muted) v.volume = 1;
    setMuted(v.muted);
  };

  if (gone || snap === "off") return null;

  return (
    <div className={`intro-splash${out ? " is-out" : ""}`} role="dialog" aria-modal="true" aria-label={t("label")}>
      {snap === "on" ? (
        <video
          ref={videoRef}
          className="intro-video"
          muted
          playsInline
          autoPlay
          preload="auto"
          poster="/media/intro/intro-poster.jpg"
          aria-hidden="true"
        >
          <source src="/media/intro/intro.webm" type="video/webm" />
          <source src="/media/intro/intro.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="intro-controls">
        <button
          ref={soundRef}
          type="button"
          className="intro-btn intro-sound"
          aria-pressed={!muted}
          aria-label={muted ? t("soundOn") : t("soundOff")}
          onClick={toggleSound}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
          </svg>
        </button>
        <button ref={skipRef} type="button" className="intro-btn intro-skip" onClick={close}>
          {t("skip")}
          <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
          <i ref={barRef} className="intro-skip-bar" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
