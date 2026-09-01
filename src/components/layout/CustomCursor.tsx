"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * CUSTOM CURSOR (§38 · D-050) — a small brand halo that ACCOMPANIES
 * the native cursor (never replaces it; text fields keep their native
 * caret experience with the halo withdrawn). Desktop fine-pointer
 * only; never mounted for touch/coarse pointers or reduced motion.
 *
 * States: default dot+ring · "link" (interactive targets grow the
 * ring) · "drag" over [data-cursor="drag"] surfaces (carousels) ·
 * "view" over [data-cursor="view"] media (gallery) — the latter two
 * carry a localized microlabel. Pure transform updates on rAF lerp;
 * zero layout cost; pointer-events: none throughout.
 *
 * MAGNETIC CONTROLS (D-054 §14). The same loop gives a SELECTIVE set of
 * major controls — the ones marked `.magnetic` — a short attraction as
 * the pointer approaches: the control leans toward the visitor, then
 * settles back when they leave. It is deliberately not a site-wide
 * cursor behaviour: only a handful of controls carry the class, the pull
 * is capped at a few pixels, and everything here is already gated to
 * fine pointers with motion enabled. Nothing about the site depends on
 * it — the control is in exactly the same place when it is off.
 */

/** how far outside a control's box the attraction begins (px) */
const MAGNET_RANGE = 84;
/** the furthest a control ever leans (px) */
const MAGNET_MAX = 7;
export function CustomCursor() {
  const t = useTranslations("common");
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () =>
      setActive(
        fine.matches &&
          !reduce.matches &&
          document.documentElement.getAttribute("data-motion-tier") !== "static",
      );
    decide();
    fine.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = -100;
    let ty = -100;
    let x = -100;
    let y = -100;
    let shown = false;

    /* --- magnetic controls: rects are cached and only re-measured when
       the page actually moves, so the loop never forces layout --- */
    type Magnet = { el: HTMLElement; cx: number; cy: number; w: number; h: number; dx: number; dy: number };
    let magnets: Magnet[] = [];
    let magnetsStale = true;
    const markStale = () => {
      magnetsStale = true;
      wake();
    };
    const measure = () => {
      magnets = [...document.querySelectorAll<HTMLElement>(".magnetic")].map((m) => {
        const prev = magnets.find((p) => p.el === m);
        const r = m.getBoundingClientRect();
        return {
          el: m,
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          w: r.width,
          h: r.height,
          dx: prev?.dx ?? 0,
          dy: prev?.dy ?? 0,
        };
      });
      magnetsStale = false;
    };

    const stepMagnets = (): boolean => {
      if (magnetsStale) measure();
      let moving = false;
      for (const m of magnets) {
        const withinX = Math.abs(tx - m.cx) - m.w / 2;
        const withinY = Math.abs(ty - m.cy) - m.h / 2;
        const near = withinX < MAGNET_RANGE && withinY < MAGNET_RANGE && shown;
        let goalX = 0;
        let goalY = 0;
        if (near) {
          // strongest at the centre, nothing at the edge of the range
          const falloff = 1 - Math.max(0, Math.max(withinX, withinY)) / MAGNET_RANGE;
          goalX = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (tx - m.cx) * 0.22 * falloff));
          goalY = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (ty - m.cy) * 0.22 * falloff));
        }
        m.dx += (goalX - m.dx) * 0.16;
        m.dy += (goalY - m.dy) * 0.16;
        if (Math.abs(m.dx) < 0.05 && Math.abs(m.dy) < 0.05) {
          if (m.el.style.transform) m.el.style.transform = "";
          m.dx = 0;
          m.dy = 0;
        } else {
          m.el.style.transform = `translate(${m.dx.toFixed(2)}px, ${m.dy.toFixed(2)}px)`;
          moving = true;
        }
        if (near) moving = true;
      }
      return moving;
    };

    /* The loop sleeps when nothing is moving (D-054 §27): once the halo
       has caught up with the pointer and every magnet has settled, the
       next frame is not scheduled. Any pointer movement wakes it. */
    let idleFrames = 0;
    const step = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate(${x}px, ${y}px)`;
      const magnetsMoving = stepMagnets();
      const settled = Math.abs(tx - x) < 0.15 && Math.abs(ty - y) < 0.15 && !magnetsMoving;
      idleFrames = settled ? idleFrames + 1 : 0;
      if (idleFrames > 8) {
        raf = 0; // asleep; onMove restarts it
        return;
      }
      raf = requestAnimationFrame(step);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    const stateFor = (target: Element | null): string => {
      if (!target) return "";
      if (target.closest("input, textarea, select, [contenteditable]")) return "text";
      if (target.closest('[data-cursor="drag"]')) return "drag";
      if (target.closest('[data-cursor="view"]')) return "view";
      if (target.closest("a, button, [role='button'], summary, label")) return "link";
      return "";
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        x = tx;
        y = ty;
        el.dataset.on = "";
      }
      const s = stateFor(e.target as Element | null);
      if (s) el.dataset.state = s;
      else delete el.dataset.state;
      wake();
    };
    const onLeave = () => {
      shown = false;
      delete el.dataset.on;
      wake(); // let the magnets release before the loop sleeps again
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", markStale, { passive: true });
    window.addEventListener("resize", markStale);
    raf = requestAnimationFrame(step);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", markStale);
      window.removeEventListener("resize", markStale);
      if (raf) cancelAnimationFrame(raf);
      for (const m of magnets) m.el.style.transform = "";
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={ref} className="sc-cursor" aria-hidden="true">
      <span className="sc-cursor-dot" />
      <span className="sc-cursor-ring" />
      <span className="sc-cursor-label" data-label="drag">
        {t("cursorDrag")}
      </span>
      <span className="sc-cursor-label" data-label="view">
        {t("cursorView")}
      </span>
    </div>
  );
}
