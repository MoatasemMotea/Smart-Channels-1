"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

/**
 * INDUSTRIES SLIDER (D-072).
 *
 * Sixteen full-width slides — scene photograph, name, tagline, a 01…16
 * counter and a bottom strip of labels that scrolls the active one into
 * view — with a 700 ms cross-fade (image opacity + 1.04→1 scale, text
 * rising in with a 150 ms delay), 6 s autoplay that pauses on hover, on
 * focus inside the region and while the section is out of view
 * (IntersectionObserver, 0.5), arrow keys, Home/End, a 40 px touch swipe
 * and a visible pause/play button. Under prefers-reduced-motion (or the
 * STATIC tier) there is no autoplay and the change is a 200 ms fade.
 *
 * Only the active slide is in the accessibility tree (the rest are
 * aria-hidden + inert); a polite live region announces the name. Images
 * are mounted for the active slide and its two neighbours only, so the
 * first paint fetches one scene (plus the neighbours at low priority) and
 * the rest never load until they are next in line. A slide without an
 * approved scene (image "") shows the dark gradient alone.
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

const AUTOPLAY_MS = 6000;
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
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
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

  // the leaving slide keeps its exit state until its transition ends (no fixed timer)
  useEffect(() => {
    if (leaving === null) return;
    const el = regionRef.current?.querySelector<HTMLElement>(`[data-slide="${leaving}"]`);
    if (!el) {
      setLeaving(null);
      return;
    }
    // no transition will run when nothing transitions (STATIC tier) or when the
    // slide never became visible (stepped away within the same frame) — clear at once
    const style = getComputedStyle(el);
    if ((parseFloat(style.transitionDuration) || 0) === 0 || style.opacity === "0") {
      setLeaving(null);
      return;
    }
    const done = (e: TransitionEvent) => {
      if (e.target === el && e.propertyName === "opacity") setLeaving(null);
    };
    el.addEventListener("transitionend", done);
    el.addEventListener("transitioncancel", done);
    return () => {
      el.removeEventListener("transitionend", done);
      el.removeEventListener("transitioncancel", done);
    };
  }, [leaving]);

  // visibility: autoplay only while at least half the region is on screen
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e && e.intersectionRatio >= 0.5), { threshold: [0, 0.5, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = !reduced && userPlaying && !hovered && !focused && inView;
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

  // interaction on the region itself (keys, pointer swipe, hover / focus pause)
  // is registered imperatively — the region is a landmark, not a control
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
    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    const focusIn = () => setFocused(true);
    const focusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node | null)) setFocused(false);
    };
    el.addEventListener("keydown", onKey);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("focusin", focusIn);
    el.addEventListener("focusout", focusOut);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("focusin", focusIn);
      el.removeEventListener("focusout", focusOut);
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
              data-state={state}
              data-empty={item.image ? undefined : ""}
              aria-hidden={!active}
              inert={!active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${pad(i + 1)} / ${pad(n)}`}
            >
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
