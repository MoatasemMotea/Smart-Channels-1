"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The single P3 motion primitive (motion contract; Amendment 5): an
 * IntersectionObserver-driven reveal honoring the capability tier via the
 * `.reveal` CSS in globals.css. STATIC tier renders instantly; without JS
 * content is fully visible (server markup carries no hidden state — the
 * class is added client-side only when animation is possible).
 */
export function MotionSection({
  children,
  className,
  as: Tag = "section",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "li";
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tier = document.documentElement.getAttribute("data-motion-tier");
    if (tier === "static") return; // no reveal treatment at all
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // @ts-expect-error -- polymorphic ref typing kept simple at P3
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
