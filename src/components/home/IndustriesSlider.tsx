"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

/**
 * INDUSTRIES SLIDER (D-072, corrected at D-073).
 *
 * Sixteen full-width slides — the scene shown WHOLE (`object-fit: contain`)
 * over a blurred, dimmed copy of itself (the 960 px file, `cover`), the
 * name and tagline, a 01…16 counter and a bottom strip of labels that
 * scrolls the active one into view with a 5 s progress line.
 *
 * Transition (900 ms): the leaving slide stays still underneath; the
 * entering slide is revealed by a growing circle (clip-path) while its
 * blur and scale settle; a light orb crosses from the line end to the
 * line start (mirrored in RTL); the text leaves in the first 250 ms and
 * arrives between 450 and 900 ms. The leaving slide is released on the
 * entering slide's transitionend (never a fixed timer). Under
 * prefers-reduced-motion (or the STATIC tier): a 200 ms fade, no orb, no
 * clip-path, no blur, no autoplay.
 *
 * Autoplay 5 s. It stops ONLY for the visible pause button, the section
 * leaving the viewport (IntersectionObserver, 0.5), a hidden tab
 * (visibilitychange) and reduced motion — never for hover or focus. A
 * click on a label or an arrow moves with the full transition and restarts
 * the timer from zero.
 *
 * Only the active slide is in the accessibility tree (the rest are
 * aria-hidden + inert); a polite live region announces the name. Images
 * are mounted for the active slide and its two neighbours only. A slide
 * without an approved scene (image "") shows the dark gradient alone.
 */
export interface IndustrySlide {
  id: string;
  name: string;
  tagline: string;
  /** full-width WebP path, or "" when no scene is approved yet */
  image: string;
  /** real pixel width of `image` — its srcset descriptor */
  imageWidth: number;
}

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 40;
const phone = (src: string) => src.replace(/\.webp$/, "-960.webp");
const pad = (n: number) => String(n).padStart(2, "0");

export function IndustriesSlider({ items }: { items: IndustrySlide[] }) {
  const t = useTranslations("industries.carousel");
  const locale = useLocale();
  const rtl = locale === "ar";
  const n = items.length;

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [userPlaying, setUserPlaying] = useState(true); // the visible pause/play button
  const [hidden, setHidden] = useState(false); // document.visibilityState
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const regionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; t: number; type: string } | null>(null);

  const go = useCallback(
    (to: number) => {
      const next = ((to % n) + n) % n;
      setIndex((cur) => {
        if (next === cur) return cur;
        setLeaving(cur);
        return next;
      });
    },
    [n],
  );
  const step = useCallback((dir: 1 | -1) => go(index + dir), [go, index]);

  // reduced motion: from the media query or the site's STATIC tier — no autoplay, fade only
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () =>
      setReduced(mq.matches || document.documentElement.getAttribute("data-motion-tier") === "static");
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  // the leaving slide stays underneath until the ENTERING slide's reveal ends
  // (transitionend / transitioncancel, never a fixed timer); when no transition
  // runs at all — STATIC tier, or a step back to a slide still at its target —
  // it is released on the next frame
  useEffect(() => {
    if (leaving === null) return;
    const el = regionRef.current?.querySelector<HTMLElement>(`[data-slide="${index}"]`);
    if (!el) {
      setLeaving(null);
      return;
    }
    const done = (e: TransitionEvent) => {
      if (e.target === el) setLeaving(null);
    };
    el.addEventListener("transitionend", done);
    el.addEventListener("transitioncancel", done);
    const raf = requestAnimationFrame(() => {
      if (el.getAnimations().length === 0) setLeaving(null);
    });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("transitionend", done);
      el.removeEventListener("transitioncancel", done);
    };
  }, [leaving, index]);

  // a hidden tab stops the clock
  useEffect(() => {
    const read = () => setHidden(document.visibilityState === "hidden");
    read();
    document.addEventListener("visibilitychange", read);
    return () => document.removeEventListener("visibilitychange", read);
  }, []);

  // visibility: autoplay only while at least half the region is on screen
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e && e.intersectionRatio >= 0.5), { threshold: [0, 0.5, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = !reduced && userPlaying && inView && !hidden;
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, index, go]);

  // the active label centres itself in the strip
  useEffect(() => {
    const btn = stripRef.current?.querySelector<HTMLElement>(`[data-tab="${index}"]`);
    btn?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, [index, reduced]);

  // interaction on the region itself (keys, pointer swipe) is registered
  // imperatively — the region is a landmark, not a control
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(rtl ? -1 : 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(rtl ? 1 : -1); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(n - 1); }
    };
    const onDown = (e: PointerEvent) => {
      swipe.current = { x: e.clientX, t: Date.now(), type: e.pointerType };
    };
    const onUp = (e: PointerEvent) => {
      const s = swipe.current;
      swipe.current = null;
      if (!s || s.type === "mouse" || Date.now() - s.t > 700) return;
      const dx = e.clientX - s.x;
      if (Math.abs(dx) < SWIPE_PX) return;
      step(dx < 0 ? 1 : -1); // physical: dragging left brings the slide on the right
    };
    el.addEventListener("keydown", onKey);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
    };
  }, [step, go, n, rtl]);

  const current = items[index]!;
  const mounted = (i: number) => i === index || i === (index + 1) % n || i === (index - 1 + n) % n;

  return (
    <div
      ref={regionRef}
      className="industries-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("label")}
      data-autoplay={reduced ? "off" : autoplay ? "running" : "paused"}
      data-reduced={reduced || undefined}
    >
      <div className="industries-slider-stage">
        {items.map((item, i) => {
          const active = i === index;
          const state = active ? "active" : i === leaving ? "leaving" : "idle";
          return (
            <div
              key={item.id}
              className="industries-slide"
              data-slide={i}
              data-id={item.id}
              data-state={state}
              data-entering={active && leaving !== null ? "" : undefined}
              data-empty={item.image ? undefined : ""}
              aria-hidden={!active}
              inert={!active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${pad(i + 1)} / ${pad(n)}`}
            >
              {item.image && mounted(i) ? (
                <div className="industries-slide-backdrop" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element -- the same owner-supplied 960 px file as the phone foreground, blurred as a ground; CSS-sized */}
                  <img src={phone(item.image)} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                </div>
              ) : null}
              {item.image && mounted(i) ? (
                <picture className="industries-slide-media">
                  <source srcSet={`${phone(item.image)} 960w, ${item.image} ${item.imageWidth}w`} sizes="100vw" type="image/webp" />
                  <img
                    src={item.image}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={active ? "high" : "low"}
                    decoding="async"
                  />
                </picture>
              ) : null}
              <div className="industries-slide-scrim" aria-hidden="true" />
              <div className="industries-slide-text">
                <h3 className="industries-slide-title">{item.name}</h3>
                <p className="industries-slide-tagline">{item.tagline}</p>
              </div>
            </div>
          );
        })}

        {leaving !== null && !reduced ? <div className="industries-slider-orb" aria-hidden="true" /> : null}

        <div className="industries-slider-counter" aria-hidden="true">
          <span className="industries-slider-counter-now">{pad(index + 1)}</span>
          <span className="industries-slider-counter-total">{pad(n)}</span>
        </div>

        <button type="button" className="industries-slider-arrow" data-dir="prev" aria-label={t("prev")} onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className="industries-slider-arrow" data-dir="next" aria-label={t("next")} onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {!reduced ? (
          <button
            type="button"
            className="industries-slider-toggle"
            aria-label={userPlaying ? t("pause") : t("play")}
            aria-pressed={!userPlaying}
            onClick={() => setUserPlaying((p) => !p)}
          >
            {userPlaying ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 6v12M16 6v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            )}
          </button>
        ) : null}
      </div>

      <div ref={stripRef} className="industries-slider-strip">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="industries-slider-tab"
            data-tab={i}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
          >
            <span className="industries-slider-tab-line" aria-hidden="true">
              <span className="industries-slider-tab-fill" />
            </span>
            {item.name}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">{current.name}</p>
    </div>
  );
}
