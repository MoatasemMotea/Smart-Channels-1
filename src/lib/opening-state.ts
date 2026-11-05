/**
 * Client-side mirror of html[data-opening] (P4 Revision 3 §4).
 *
 * Locale switching is a soft navigation that re-renders the root <html>
 * element; React then resets its attributes to the server JSX values and
 * drops JS-set ones. The opening state must survive that (a locale switch
 * must never replay the brand opening — §20), so the source of truth for
 * the current DOCUMENT lifetime lives here and HtmlStateGuard re-asserts
 * it after every layout commit. A full page load starts fresh (§1: the
 * opening replays on every full refresh).
 */

let state: string | null | undefined;

/** Lazily adopt whatever the pre-paint bootstrap set for this document. */
function init(): void {
  if (state !== undefined) return;
  state = typeof document === "undefined"
    ? null
    : document.documentElement.getAttribute("data-opening");
}

export function getOpeningState(): string | null {
  init();
  return state ?? null;
}

export function setOpeningState(next: string): void {
  init();
  state = next;
  document.documentElement.setAttribute("data-opening", next);
}

/** Re-apply the mirrored state onto <html> (used by HtmlStateGuard). */
export function restoreOpeningState(): void {
  init();
  const el = document.documentElement;
  if (state == null) el.removeAttribute("data-opening");
  else el.setAttribute("data-opening", state);
}
