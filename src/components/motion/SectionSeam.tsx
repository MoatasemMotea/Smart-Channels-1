"use client";

import { useEffect, useRef } from "react";
import { registerReveal } from "@/lib/motion/scroll-engine";

export type SeamVariant = "trace" | "converge" | "node";

/**
 * SECTION SEAM — the visible joint between two chapters (D-054 §6).
 *
 * A boundary is not a gap: the canvas continues and a thread of signal
 * crosses it as the next chapter arrives. Three devices keep
 * consecutive boundaries from repeating themselves:
 *
 * - "trace"    — light travels the rule from the reading edge.
 * - "converge" — light opens outward from the centre of the rule.
 * - "node"     — a single node lands on the rule and the light leaves it.
 *
 * D-079: driven by the scroll engine (no IntersectionObserver of its
 * own). `.is-visible` is added when the seam's entry passes 0.6 and
 * removed below 0.3, so scrolling back up resets the thread and the next
 * arrival draws it again. STATIC renders the rule alone.
 */
export function SectionSeam({ variant = "trace" }: { variant?: SeamVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.getAttribute("data-motion-tier") === "static") return;
    return registerReveal(el, "seam");
  }, []);
  return <div ref={ref} className="seam" data-seam={variant} aria-hidden="true" />;
}
