"use client";

import { useEffect } from "react";
import { arriveAt } from "@/components/layout/HeaderNav";

/**
 * Robust cross-route hash navigation (final pre-media directive §5).
 *
 * Mounted only on the homepage. Whenever the page arrives carrying a
 * section hash — a deep link, a soft navigation from an inner route,
 * or a hashchange — the target section receives the same cinematic
 * arrival as an in-page nav click. Two cases the browser alone gets
 * wrong are handled here:
 *
 * 1. FULL DOCUMENT LOAD with a pending opening: the opening's scroll
 *    guard holds the viewport at the top while the sequence plays, so
 *    the native hash jump is suppressed — we deliver the section once
 *    html[data-opening] settles to "done"/"skipped".
 * 2. SOFT NAVIGATION from an inner route: the section exists only
 *    after this render, so we resolve it after paint.
 *
 * Never scroll-jacks: it fires once per hash event and only toward the
 * user's explicitly requested destination.
 */
const SECTION_IDS = new Set([
  "about",
  "solutions",
  "industries",
  "gallery",
  "partners",
  "clients",
  "contact",
]);

export function HashArrival() {
  useEffect(() => {
    let cancelled = false;
    let obs: MutationObserver | null = null;

    const go = (smooth: boolean) => {
      const id = window.location.hash.slice(1);
      if (!SECTION_IDS.has(id)) return;
      const html = document.documentElement;
      const opening = html.getAttribute("data-opening");
      if (opening === "pending" || opening === "running" || opening === "revealing") {
        // wait for the opening to release the viewport, then arrive
        obs?.disconnect();
        obs = new MutationObserver(() => {
          const s = html.getAttribute("data-opening");
          if (s === "done" || s === "skipped" || s === null) {
            obs?.disconnect();
            if (!cancelled) arriveAt(id, true);
          }
        });
        obs.observe(html, { attributes: true, attributeFilter: ["data-opening"] });
        return;
      }
      arriveAt(id, smooth);
    };

    // after paint so soft-navigation sections exist and layout settled
    const raf = requestAnimationFrame(() => {
      if (!cancelled) go(false);
    });
    const onHash = () => go(true);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      obs?.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return null;
}
