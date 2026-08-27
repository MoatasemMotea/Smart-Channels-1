"use client";

import { useEffect } from "react";

/**
 * Header environment tracking (P4 · F-7, Revision 2).
 *
 * Sets two html attributes the header CSS keys off:
 * - data-scrolled: transparent (over the top of a scene) vs the controlled
 *   blur/surface state.
 * - data-header-env: "dark" while the fixed header band overlaps a
 *   dark-committed cinematic scene ([data-env="dark"], D-019), "surface"
 *   over ordinary themed content. This is what keeps the header legible in
 *   the Light theme over the dark Hero / network scenes — the header
 *   adopts the environment beneath it, not the global theme.
 *
 * rAF-throttled and passive; recomputed on scroll and resize.
 */
export function ScrollState() {
  useEffect(() => {
    let ticking = false;
    const apply = () => {
      const html = document.documentElement;
      html.setAttribute("data-scrolled", window.scrollY > 24 ? "true" : "false");
      const bandY = 40; // header midline
      let env = "surface";
      for (const el of document.querySelectorAll<HTMLElement>('[data-env="dark"]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= bandY && r.bottom >= bandY) {
          env = "dark";
          break;
        }
      }
      html.setAttribute("data-header-env", env);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
