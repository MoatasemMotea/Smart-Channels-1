/**
 * Provider-neutral analytics abstraction (Q-P3-11).
 *
 * The site calls trackEvent(); nothing is sent anywhere until an analytics
 * provider is explicitly approved by the owner and wired here. Connecting
 * Google Analytics, Meta Pixel or any other provider requires separate
 * owner approval plus a CSP amendment (next.config.ts) and a decision-log
 * entry. Until then this is a no-op.
 */
export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

export function trackEvent(_event: AnalyticsEvent): void {
  // Intentionally a no-op. See file header before changing.
}
