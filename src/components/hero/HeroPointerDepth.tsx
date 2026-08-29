"use client";

import { useEffect, useRef } from "react";

/**
 * Gentle pointer depth for the Riyadh hero (D-041 · FULL tier only via
 * CSS gating): writes normalized --hx/--hy custom properties on the
 * photo stage; the network overlay shifts a few px against the
 * photograph. rAF-throttled, passive, removed with the component.
 */
export function HeroPointerDepth() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = ref.current?.closest<HTMLElement>(".hero-photo-stage");
    const scene = stage?.closest<HTMLElement>(".hero-scene");
    if (!stage || !scene) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = scene.getBoundingClientRect();
        stage.style.setProperty("--hx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        stage.style.setProperty("--hy", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
      });
    };
    const onLeave = () => {
      stage.style.setProperty("--hx", "0");
      stage.style.setProperty("--hy", "0");
    };
    scene.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <span ref={ref} hidden />;
}
