"use client";

import { useLayoutEffect } from "react";
import { currentMotionTier } from "@/lib/motion/capability";
import { restoreOpeningState } from "@/lib/opening-state";

/**
 * Cinematic-state guard (P4 Revision 3 §§4/5/17 — root-cause fix).
 *
 * A locale switch is a soft navigation that re-renders the root <html>
 * element; React then resets its attributes to the server JSX defaults
 * (`data-motion-tier="static"`, `data-theme="dark"`) and drops JS-set
 * attributes like `data-opening`. That silently destroyed every canvas
 * and animation until a full refresh.
 *
 * This runs a dependency-free layout effect after EVERY layout commit and
 * re-asserts the client-owned attributes synchronously before paint — so
 * mutation observers only ever see the corrected values and the cinematic
 * world (hero field, Saudi map, header environment) survives locale and
 * theme changes intact.
 */
export function HtmlStateGuard() {
  useLayoutEffect(() => {
    const el = document.documentElement;
    let theme: string | null = null;
    try {
      theme = localStorage.getItem("sc-theme");
    } catch {
      /* storage unavailable — keep current DOM value */
    }
    el.setAttribute("data-theme", theme === "light" ? "light" : "dark");
    el.setAttribute("data-motion-tier", currentMotionTier());
    restoreOpeningState();
    if (!el.hasAttribute("data-header-env")) {
      // recompute promptly; ScrollState listens for this
      window.dispatchEvent(new Event("scroll"));
    }
  });
  return null;
}
