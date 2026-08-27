"use client";

import { useEffect } from "react";

/**
 * Sets html[data-scrolled] so the header can move from transparent (over
 * the hero) to its blur/solid state (F-7). rAF-throttled, passive — no
 * layout reads per frame beyond scrollY.
 */
export function ScrollState() {
  useEffect(() => {
    let ticking = false;
    const apply = () => {
      document.documentElement.setAttribute("data-scrolled", window.scrollY > 24 ? "true" : "false");
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
