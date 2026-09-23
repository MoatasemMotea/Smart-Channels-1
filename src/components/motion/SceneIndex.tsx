"use client";

import { useEffect, useRef } from "react";
import { registerIndex } from "@/lib/motion/scroll-engine";

/**
 * SIDE SCENE INDEX (D-079) — one dot per homepage chapter at the end of
 * the line, mid-height; the active chapter's dot is a pink bar. No
 * numbers, no labels, no interaction: decorative orientation only
 * (aria-hidden — the header navigation is the accessible route).
 * Desktop only (hidden below 880 px) and never in the STATIC tier.
 */
const SCENES = ["hero", "about", "track-record", "solutions", "industries", "projects", "gallery", "partners", "clients", "cta"];

export function SceneIndex() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (document.documentElement.getAttribute("data-motion-tier") === "static") return;
    const dots = [...root.querySelectorAll<HTMLElement>("span")];
    const scenes = SCENES.map((s) => document.querySelector<HTMLElement>(`main [data-scene="${s}"]`));
    if (scenes.some((s) => !s)) return;
    return registerIndex(dots, scenes as HTMLElement[]);
  }, []);
  return (
    <div ref={ref} className="scene-index" aria-hidden="true">
      {SCENES.map((s) => (
        <span key={s} data-for={s} />
      ))}
    </div>
  );
}
