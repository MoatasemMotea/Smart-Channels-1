"use client";

import { useEffect, useRef } from "react";

export type SeamVariant = "trace" | "converge" | "node";

/**
 * SECTION SEAM — the visible joint between two chapters (D-054 §6).
 *
 * A boundary is not a gap: the canvas continues and a thread of signal
 * crosses it once, as the next chapter arrives. Three devices keep
 * consecutive boundaries from repeating themselves:
 *
 * - "trace"    — light travels the rule from the reading edge.
 * - "converge" — light opens outward from the centre of the rule.
 * - "node"     — a single node lands on the rule and the light leaves it.
 *
 * One shot per boundary, never a loop; STATIC renders the rule alone.
 */
export function SectionSeam({ variant = "trace" }: { variant?: SeamVariant }) {
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
            io.disconnect();
          }
        }
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="seam" data-seam={variant} aria-hidden="true" />;
}
