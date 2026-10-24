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
 * wrong is handled here: on a SOFT NAVIGATION from an inner route the
 * section exists only after this render, so we resolve it after paint
 * (D-086: no opening holds the viewport any more).
 *
 * Never scroll-jacks: it fires once per hash event and only toward the
 * user's explicitly requested destination.
 */
const SECTION_IDS = new Set([
  "about",
  "solutions",
  "industries",
  "projects",
  "gallery",
  "partners",
  "clients",
  "contact",
]);

export function HashArrival() {
  useEffect(() => {
    let cancelled = false;

    const go = (smooth: boolean) => {
      const id = window.location.hash.slice(1);
      if (!SECTION_IDS.has(id)) return;
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
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return null;
}
