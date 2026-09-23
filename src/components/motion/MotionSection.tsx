"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registerReveal } from "@/lib/motion/scroll-engine";

/**
 * Scene-reveal primitive — SCROLL-LINKED since D-079.
 *
 * The section registers with the scroll engine, which writes `--t`
 * (0 → 1, eased, with a delay) from the section's entry into the
 * viewport. Scrolling down advances the reveal; scrolling back up
 * returns it exactly — the reveal is a position, not an event.
 *
 * Variants (Rev3 §14, re-expressed on `--t`):
 *   rise (default) · opacity + translateY(16px → 0)
 *   mask           · the children unclip from the top down
 *   converge       · scale(.988 → 1) + translateY(10px → 0) — no blur
 *                    (a filter on a whole layer is not allowed, D-079)
 *   trace          · a signal line draws across the top edge
 * `sweep` was retired at D-079; its sections use `mask`.
 * Inside every variant the section title wipes in from the start of the
 * line and `.section-lead` rises with `--t`.
 *
 * Once `--t` reaches 1 the engine sets `data-rs="1"` and no transform
 * rule applies: the computed transform is literally `none` (closes
 * D075-RESIDUAL-TRANSFORM, where converge kept scale(.988) forever).
 * `.is-visible` survives as a class with hysteresis for the rules keyed
 * on it. STATIC tier: nothing registers, the server markup is final;
 * without JS the content is fully visible.
 */
export type RevealVariant = "rise" | "mask" | "converge" | "trace";

export function MotionSection({
  children,
  className,
  as: Tag = "section",
  reveal = "rise",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "li";
  reveal?: RevealVariant;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.getAttribute("data-motion-tier") === "static") return;
    return registerReveal(el);
  }, []);

  return (
    // @ts-expect-error -- polymorphic ref typing kept simple at P3
    <Tag ref={ref} className={className} data-reveal={reveal === "rise" ? undefined : reveal} {...rest}>
      {children}
    </Tag>
  );
}
