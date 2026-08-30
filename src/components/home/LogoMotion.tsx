"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Cinematic logo carousels (D-042 · reference-locked presentation).
 *
 * One premium horizontal rail per ecosystem — dark glass cells on a
 * single seamless row with arrow controls, drag/swipe, and slow
 * continuous auto-flow:
 * - Technology Alliances ≈ 30 px/s with a periodic signal sweep;
 * - Our Clients ≈ 22 px/s — the same design family, calmer voice.
 *
 * Legibility contract: ~30% of the approved marks are near-black
 * glyphs, and recoloring is forbidden (D-033), so every cell is a dark
 * glass frame carrying a compact light plate that preserves each
 * logo's original color, geometry and proportions — never recolored,
 * mirrored, stretched, cropped or distorted.
 *
 * Motion engine: rAF-driven offset over a duplicated sequence,
 * wrapping at one copy-width — physically continuous, no restart, no
 * gap. Interaction pauses the flow (hover/focus immediately; arrows,
 * drag, swipe and horizontal wheel schedule a ~4 s resume). RTL
 * reverses FLOW and paging direction only. Rails pause offscreen and
 * when the tab hides. STATIC renders the identical rail without
 * auto-flow (arrows still work, instantly); with no JS at all the
 * rail is a native horizontally scrollable strip.
 */
export interface RailLogo {
  id: string;
  name: string;
  src: string;
}

function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";
const useTier = () => useSyncExternalStore(subscribeTier, getTier, () => "static");

const RESUME_DELAY = 4000; // ms after a manual interaction (§8: 3–5 s)

export function LogoCarousel({
  logos,
  rtl,
  kind,
  speed,
  prevLabel,
  nextLabel,
}: {
  logos: RailLogo[];
  rtl: boolean;
  kind: "alliance" | "client";
  speed: number; // auto-flow, px/s
  prevLabel: string;
  nextLabel: string;
}) {
  const tier = useTier();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // motion state lives in refs — the rAF loop never re-renders React
  const xRef = useRef(0); // 0..copyWidth, in flow direction
  const copyWRef = useRef(0);
  const pausesRef = useRef(new Set<string>());
  const resumeTimer = useRef(0);
  const tweenRef = useRef<{ from: number; to: number; start: number } | null>(null);
  const autoOn = tier === "full" || tier === "lite";

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const copyA = track.firstElementChild as HTMLElement | null;
    if (!copyA) return;

    const pauses = pausesRef.current;
    const measure = () => {
      copyWRef.current = copyA.getBoundingClientRect().width;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(copyA);
    copyA.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    // x grows in the FLOW direction; RTL flips only the applied sign
    const apply = () => {
      const w = copyWRef.current;
      if (w < 10) return;
      let x = xRef.current;
      x = ((x % w) + w) % w;
      xRef.current = x;
      track.style.transform = `translateX(${rtl ? x : -x}px)`;
    };

    const holdThenResume = () => {
      pauses.add("manual");
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => pauses.delete("manual"), RESUME_DELAY);
    };

    // continuous loop: auto-flow + eased arrow tweens share one clock
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const tween = tweenRef.current;
      if (tween) {
        const p = Math.min(1, (now - tween.start) / 480);
        const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
        xRef.current = tween.from + (tween.to - tween.from) * e;
        if (p >= 1) tweenRef.current = null;
        apply();
      } else if (autoOn && pauses.size === 0) {
        xRef.current += speed * dt;
        apply();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // §17/§21: offscreen and hidden-tab discipline
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) pauses.delete("offscreen");
          else pauses.add("offscreen");
        }
      },
      { threshold: 0.05 },
    );
    io.observe(viewport);
    const onVis = () => {
      if (document.visibilityState === "visible") pauses.delete("hidden");
      else pauses.add("hidden");
    };
    document.addEventListener("visibilitychange", onVis);

    // hover (mouse) and keyboard focus pause the flow in place
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pauses.add("hover");
    };
    const onLeave = () => pauses.delete("hover");
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    viewport.addEventListener("focusin", () => pauses.add("focus"));
    viewport.addEventListener("focusout", () => pauses.delete("focus"));

    // drag / swipe: the rail follows the pointer 1:1, then resumes
    let dragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      dragStartX = e.clientX;
      dragStartOffset = xRef.current;
      tweenRef.current = null;
      pauses.add("manual");
      window.clearTimeout(resumeTimer.current);
      viewport.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - dragStartX;
      // moving the pointer along the row carries the row with it
      xRef.current = dragStartOffset + (rtl ? dx : -dx);
      apply();
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      holdThenResume();
    };
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);

    // trackpad: horizontal wheel gestures steer the rail
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      xRef.current += rtl ? -e.deltaX : e.deltaX;
      apply();
      holdThenResume();
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer.current);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("wheel", onWheel);
    };
  }, [rtl, speed, autoOn, logos.length]);

  // arrows page the rail by ~60% of the viewport, eased; never a reset
  const page = (dir: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const dist = viewport.clientWidth * 0.6 * dir;
    const from = xRef.current;
    if (tier === "static") {
      xRef.current = from + dist;
      const track = trackRef.current;
      const w = copyWRef.current;
      if (track && w > 10) {
        const x = (((xRef.current % w) + w) % w);
        xRef.current = x;
        track.style.transform = `translateX(${rtl ? x : -x}px)`;
      }
    } else {
      tweenRef.current = { from, to: from + dist, start: performance.now() };
    }
    pausesRef.current.add("manual");
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(
      () => pausesRef.current.delete("manual"),
      RESUME_DELAY,
    );
  };

  const seq = (copy: "a" | "b") => (
    <ul className={`rail-copy rail-copy-${copy}`} aria-hidden={copy === "b" || undefined}>
      {logos.map((l) => (
        <li key={`${copy}-${l.id}`} className={`rail-cell ${kind}-rail-cell`}>
          <span className="rail-plate">
            {/* original color/geometry preserved — never recolored,
                mirrored, stretched, cropped or distorted */}
            {/* eslint-disable-next-line @next/next/no-img-element -- approved marks, CSS contain sizing */}
            <img src={l.src} alt={copy === "a" ? l.name : ""} loading="lazy" draggable={false} />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`logo-rail logo-rail-${kind}`}>
      <button
        type="button"
        className="rail-nav rail-nav-prev"
        aria-label={prevLabel}
        onClick={() => page(-1)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M10.5 3 5.5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* the viewport is direction-isolated: the row itself is physical
          artwork; RTL reverses flow/paging semantics in the engine */}
      <div ref={viewportRef} className="rail-viewport" dir="ltr" data-cursor="drag">
        <div ref={trackRef} className="rail-track">
          {seq("a")}
          {seq("b")}
        </div>
        {kind === "alliance" && tier === "full" ? (
          <div className="rail-sweep" aria-hidden="true" />
        ) : null}
      </div>

      <button
        type="button"
        className="rail-nav rail-nav-next"
        aria-label={nextLabel}
        onClick={() => page(1)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M5.5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="rail-underline" aria-hidden="true" />
    </div>
  );
}
