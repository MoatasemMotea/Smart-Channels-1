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
 */
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

    const step = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(step);
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
    };
    const onLeave = () => {
      shown = false;
      delete el.dataset.on;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(step);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
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
