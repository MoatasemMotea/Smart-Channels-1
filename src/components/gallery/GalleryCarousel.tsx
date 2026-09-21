"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { GalleryItem, Locale } from "@/types/content";
import { localize } from "@/lib/content";

/**
 * 3D COVER CAROUSEL (D-065).
 *
 * One horizontal ring of square cards. The centre card is upright and
 * full size; its neighbours step down in size, tilt their TOP edge
 * toward the centre, fade, and sit beneath it (see the [data-pos] rules
 * in globals.css — every geometry value lives there, keyed by the signed
 * logical offset so RTL flips by CSS alone). Positions beyond
 * floor((n - 1) / 2) are hidden, so an item is never on screen twice
 * (owner decision D-065 §3). Only `transform` and `opacity` animate.
 *
 * Video discipline: the centre video plays muted (playsInline, loop,
 * preload=metadata, poster mandatory) — but only while the carousel is
 * in the viewport (IntersectionObserver, threshold 0.5, D067-OFFSCREEN-
 * PLAY): off screen it stays paused, so a homepage load at scroll 0
 * fetches metadata at most and plays nothing. Leaving the centre pauses,
 * rewinds and re-mutes it. The speaker button toggles mute in place
 * without opening the lightbox. Clicking the card opens the lightbox
 * (with sound — the click is the browser's permission). No autoplay
 * with sound, ever, and no automatic rotation: the visitor drives.
 */
const SWIPE_PX = 40;
const WHEEL_PX = 30;
const LOCK_MS = 600;

export function GalleryCarousel({
  items,
  index,
  onIndexChange,
  onOpen,
}: {
  items: GalleryItem[];
  index: number;
  onIndexChange: (next: number) => void;
  onOpen: (idx: number, opener: HTMLElement) => void;
}) {
  const locale = useLocale() as Locale;
  const rtl = locale === "ar";
  const t = useTranslations();
  const n = items.length;
  const limit = Math.min(3, Math.floor((n - 1) / 2));
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const swipe = useRef<{ x: number; t: number } | null>(null);
  const lock = useRef(0);
  const [inView, setInView] = useState(false);
  // the speaker toggle is remembered for the index it was pressed on, so a
  // step re-mutes by definition (no state write inside the effect)
  const [unmutedAt, setUnmutedAt] = useState<number | null>(null);
  const unmuted = unmutedAt === index;

  const step = (dir: 1 | -1) => {
    if (n < 2) return;
    onIndexChange((index + dir + n) % n);
  };

  // signed logical offset of item i from the centre, in [-(n/2), n/2)
  const offsetOf = (i: number) => {
    let d = (((i - index) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  // centre video plays muted while the ring is in view; off screen it pauses
  // where it is; everything else is parked at the start, muted
  useEffect(() => {
    for (const [id, v] of videoRefs.current) {
      const i = items.findIndex((it) => it.id === id);
      if (i === index) {
        v.muted = true;
        if (inView) v.play().catch(() => undefined); // codec/network failures show the poster
        else v.pause();
      } else {
        v.pause();
        try { v.currentTime = 0; } catch { /* not seekable yet */ }
        v.muted = true;
      }
    }
  }, [index, items, inView]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRefs.current.get(items[index]!.id);
    if (!v) return;
    v.muted = !v.muted;
    setUnmutedAt(v.muted ? null : index);
  };

  // keyboard, swipe and horizontal wheel — registered imperatively on the
  // region element, which itself carries no JSX interaction handlers
  const regionRef = useRef<HTMLDivElement>(null);

  // viewport gate for playback (threshold 0.5 of the ring)
  useEffect(() => {
    const el = regionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(!!e && e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  });
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const right: 1 | -1 = rtl ? -1 : 1;
    const left: 1 | -1 = rtl ? 1 : -1;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); stepRef.current(right); }
      if (e.key === "ArrowLeft") { e.preventDefault(); stepRef.current(left); }
    };
    const onDown = (e: PointerEvent) => { swipe.current = { x: e.clientX, t: Date.now() }; };
    const onUp = (e: PointerEvent) => {
      const s = swipe.current;
      swipe.current = null;
      if (!s || Date.now() - s.t > 800) return;
      const dx = e.clientX - s.x;
      if (Math.abs(dx) < SWIPE_PX) return;
      // physical: dragging left brings the card on the right into the centre
      stepRef.current(dx < 0 ? right : left);
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < WHEEL_PX || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      const now = Date.now();
      if (now - lock.current < LOCK_MS) return;
      lock.current = now;
      stepRef.current(e.deltaX > 0 ? right : left);
    };
    el.addEventListener("keydown", onKey);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [rtl]);

  const current = items[index];

  return (
    <div
      ref={regionRef}
      className="gcar"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("gallery.carousel.label")}
    >
      <ul className="gcar-track">
        {items.map((item, i) => {
          const d = offsetOf(i);
          const pos = Math.abs(d) <= limit ? String(d) : "hidden";
          const centre = d === 0;
          const label = localize(item.alt, locale);
          return (
            <li
              key={item.id}
              className="gcar-card"
              data-pos={pos}
              data-kind={item.type}
              aria-hidden={centre ? undefined : "true"}
            >
              {item.type === "video" ? (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current.set(item.id, el);
                    else videoRefs.current.delete(item.id);
                  }}
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- approved published media, CSS-sized
                <img src={item.thumb ?? item.src} alt="" loading={centre ? "eager" : "lazy"} decoding="async" style={item.focus ? { objectPosition: item.focus } : undefined} />
              )}
              {item.type === "video" ? (
                <span className="gallery-play-badge" aria-hidden="true">
                  <svg viewBox="0 0 16 16" focusable="false">
                    <path d="M5 3.5v9l8-4.5z" fill="currentColor" />
                  </svg>
                </span>
              ) : null}
              <button
                type="button"
                className="gcar-open"
                data-cursor="view"
                aria-label={label}
                tabIndex={centre ? 0 : -1}
                onClick={(e) => onOpen(i, e.currentTarget)}
              />
              {item.type === "video" && centre ? (
                <button
                  type="button"
                  className="gcar-mute"
                  aria-label={unmuted ? t("gallery.carousel.mute") : t("gallery.carousel.unmute")}
                  aria-pressed={unmuted}
                  onClick={toggleMute}
                >
                  {unmuted ? (
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                      <path d="M2 6h2.5L8 3v10L4.5 10H2z" fill="currentColor" />
                      <path d="M10.5 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6 6 0 0 1 0 9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                      <path d="M2 6h2.5L8 3v10L4.5 10H2z" fill="currentColor" />
                      <path d="M10.5 6l4 4M14.5 6l-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="sr-only" aria-live="polite">{current ? localize(current.alt, locale) : ""}</p>

      <div className="gcar-nav">
        <button type="button" className="gcar-btn" aria-label={t("gallery.carousel.prev")} disabled={n < 2} onClick={() => step(-1)}>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M10.5 3 5.5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="gcar-btn" aria-label={t("gallery.carousel.next")} disabled={n < 2} onClick={() => step(1)}>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M5.5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
