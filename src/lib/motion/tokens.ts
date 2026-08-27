/**
 * Motion tokens — the single JS source of animation values
 * (docs/motion-implementation-contract.md §8). CSS reads the same values
 * from custom properties in globals.css; keep both in sync.
 * No component may use ad-hoc durations/easings.
 */
export const duration = {
  micro: 150,
  control: 300,
  component: 450,
  section: 700,
  narrative: 1000,
} as const;

export const easing = {
  engineered: "cubic-bezier(0.2, 0, 0, 1)",
  cinematic: "cubic-bezier(0.65, 0, 0.15, 1)",
} as const;

export const stagger = {
  engineered: 50,
  cinematic: 100,
  /** Max staggered children before grouping (contract §8). */
  maxChildren: 8,
} as const;

export const distance = {
  micro: 8,
  component: 24,
  section: 48,
} as const;
