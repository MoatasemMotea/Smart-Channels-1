"use client";

import { useEffect, useRef } from "react";

/**
 * SECTION SEAM (D-054 §6) — the boundary between two chapters.
 *
 * Instead of "section A ends, section B appears", the seam carries a
 * travelling signal trace across the join as the next chapter arrives,
 * so adjacent compositions read as one connected system.
 *
 * Motion contract (§4): the trace REVEALS the boundary and CONNECTS the
 * chapters — it fires ONCE per seam and never loops. STATIC/reduced
 * motion renders the hairline alone, which is visually complete.
 */
export function SectionSeam() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.getAttribute("data-motion-tier") === "static") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.disconnect(); // one-shot: never a loop
          }
        }
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className="seam" aria-hidden="true" />;
}
