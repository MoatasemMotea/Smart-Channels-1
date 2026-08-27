/**
 * FULL / LITE / STATIC capability tiers (motion contract §2).
 *
 * - STATIC: prefers-reduced-motion or Save-Data or no JS (server default in
 *   markup is upgraded client-side; JS failure therefore yields STATIC).
 * - LITE: small viewports or low device signals.
 * - FULL: everything else.
 *
 * The resolved tier is exposed as data-motion-tier on <html>; CSS and
 * future scene code read the same attribute. Scenes may self-downgrade at
 * runtime via requestTierDowngrade() when they miss frame budgets (§3).
 */
export type MotionTier = "full" | "lite" | "static";

export function resolveMotionTier(): MotionTier {
  if (typeof window === "undefined") return "static";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return "static";
  const smallViewport = window.matchMedia("(max-width: 767px)").matches;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const fewCores = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  if (smallViewport || lowMemory || fewCores) return "lite";
  return "full";
}

export function applyMotionTier(tier: MotionTier): void {
  document.documentElement.setAttribute("data-motion-tier", tier);
}

/** One-way downgrade for scenes that miss their frame budget. */
export function requestTierDowngrade(): void {
  const current = document.documentElement.getAttribute("data-motion-tier");
  if (current === "full") applyMotionTier("lite");
  else if (current === "lite") applyMotionTier("static");
}
