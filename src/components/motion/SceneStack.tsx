"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registerStack } from "@/lib/motion/scroll-engine";

/**
 * SCENE STACK (D-079) — two adjacent homepage chapters where the second
 * rises over the first. The first child carrying `data-stack="stick"`
 * stays sticky while the child carrying `data-stack="cover"` scrolls up
 * over it; the wrapper is the sticky scene's containing block, so the
 * stuck scene is released (already fully covered) when the pair ends
 * and never lingers under the rest of the page.
 *
 * FULL tier and ≥ 768 px only — the engine sets `data-stack-on` after
 * measuring. LITE, STATIC, reduced motion and no-JS keep the plain flow.
 */
export function SceneStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (document.documentElement.getAttribute("data-motion-tier") !== "full") return;
    const stick = root.querySelector<HTMLElement>(':scope > [data-stack="stick"]');
    const cover = root.querySelector<HTMLElement>(':scope > [data-stack="cover"]');
    if (!stick || !cover) return;
    return registerStack(root, stick, cover);
  }, []);
  return (
    <div ref={ref} className="scene-stack">
      {children}
    </div>
  );
}
