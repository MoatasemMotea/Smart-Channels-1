"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { navigation } from "@/content/navigation";
import { contact } from "@/content/contact";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeSwitch } from "./ThemeSwitch";

/**
 * Mobile navigation (P4 · F-8, rebuilt at D-069).
 *
 * ONE toggle button (☰ ⇄ ✕ as a morphing inline SVG, ≥44×44,
 * aria-controls="site-menu", truthful aria-expanded, labels from the
 * messages) and ONE panel, `nav#site-menu`, rendered through a PORTAL
 * into document.body. That portal is the root-cause fix: the old panel
 * lived inside the fixed header, and once the page scrolled the header's
 * `backdrop-filter` made it the containing block for its fixed
 * descendants — the "full-screen" overlay collapsed to the 80 px header
 * strip (label + ✕, no links). Outside the header it cannot happen.
 *
 * The panel covers the viewport UNDER the header (canvas ground, dimmed
 * backdrop, z-index 70 above the floating chat / WhatsApp buttons at
 * 60/59). Enter/exit 220 ms; the DOM node stays until `transitionend`
 * (no fixed timer), and under reduced motion / the STATIC tier, where
 * no transition runs, it unmounts at once. Open locks body scroll and
 * moves focus to the first link; Escape closes and returns focus to
 * the toggle; a link click, a backdrop click, a route change, or the
 * viewport growing past the desktop breakpoint all close it; Tab cycles
 * inside the panel. Content is data-driven (navigation.ts + approved
 * contact) and the locale / theme switches live inside the panel.
 */
const DESKTOP = "(min-width: 64rem)";

export function MobileMenu({ label, closeLabel }: { label: string; closeLabel: string }) {
  const [open, setOpen] = useState(false); // logical state (aria-expanded)
  const [rendered, setRendered] = useState(false); // DOM presence (stays through the exit transition)
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const pathname = usePathname();
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const items = [...navigation].sort((a, b) => a.order - b.order);
  const label_ = (v: { en: string; ar?: string }) => (locale === "ar" && v.ar ? v.ar : v.en);

  // `rendered` can only become true from a click, so the portal target
  // (document.body) is never touched during server rendering / hydration.
  const openMenu = useCallback(() => {
    setRendered(true);
    setOpen(true);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // open: lock scroll (the panel itself is mounted by openMenu)
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !rendered) return;
    const panel = panelRef.current;
    if (!panel) return;
    const raf = requestAnimationFrame(() => {
      // flush the "closed" style first: a node inserted and flipped in the same
      // frame has no before-change style, so no transition would run
      void panel.getBoundingClientRect();
      panel.setAttribute("data-state", "open");
      panel.previousElementSibling?.setAttribute("data-state", "open");
      panel.querySelector<HTMLElement>("a[href]")?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open, rendered]);

  // exit: play the transition, unmount on transitionend — or at once when nothing transitions
  useEffect(() => {
    if (open || !rendered) return;
    const panel = panelRef.current;
    if (!panel) {
      setRendered(false);
      return;
    }
    // will an opacity transition actually run? not when nothing transitions
    // (reduced motion / STATIC tier), when the sheet is display:none (the
    // viewport grew past the breakpoint) or when it is still fully transparent
    const style = getComputedStyle(panel);
    const willTransition =
      style.display !== "none" && (parseFloat(style.transitionDuration) || 0) > 0 && style.opacity !== "0";
    panel.setAttribute("data-state", "closing");
    panel.previousElementSibling?.setAttribute("data-state", "closing");
    if (!willTransition) {
      setRendered(false);
      return;
    }
    const onEnd = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName === "opacity") setRendered(false);
    };
    panel.addEventListener("transitionend", onEnd);
    panel.addEventListener("transitioncancel", onEnd);
    return () => {
      panel.removeEventListener("transitionend", onEnd);
      panel.removeEventListener("transitioncancel", onEnd);
    };
  }, [open, rendered]);

  // keyboard: Escape closes; Tab cycles inside the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      const panel = panelRef.current;
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const inside = panel.contains(document.activeElement);
      if (!inside || (e.shiftKey && document.activeElement === first)) {
        e.preventDefault();
        (e.shiftKey || !inside ? (inside ? last : first) : first).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // route change closes (guards against a panel surviving back/forward navigation)
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  // growing past the desktop breakpoint closes and resets
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(DESKTOP);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) close(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? closeLabel : label}
        data-open={open || undefined}
        onClick={() => (open ? close() : openMenu())}
        className="menu-toggle"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <line className="menu-toggle-bar" data-bar="top" x1="4" y1="7" x2="20" y2="7" />
          <line className="menu-toggle-bar" data-bar="mid" x1="4" y1="12" x2="20" y2="12" />
          <line className="menu-toggle-bar" data-bar="bot" x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {rendered
        ? createPortal(
            <>
              <button
                type="button"
                className="site-menu-backdrop"
                data-state="closed"
                aria-label={closeLabel}
                tabIndex={-1}
                onClick={() => close()}
              />
              <nav ref={panelRef} id="site-menu" className="site-menu" data-state="closed" aria-label={t("common.menu")}>
                <ul className="site-menu-list">
                  {items
                    .filter((i) => i.highlight !== "cta")
                    .map((item) => (
                      <li key={item.id}>
                        <Link href={item.href} onClick={() => close(false)} className="site-menu-link tx-link">
                          {label_(item.label)}
                        </Link>
                      </li>
                    ))}
                </ul>
                {items
                  .filter((i) => i.highlight === "cta")
                  .map((cta) => (
                    <Link key={cta.id} href={cta.href} onClick={() => close(false)} className="site-menu-cta">
                      {label_(cta.label)}
                    </Link>
                  ))}
                <div className="site-menu-tools">
                  <LocaleSwitch />
                  <ThemeSwitch />
                </div>
                <address className="site-menu-contact">
                  <p dir="ltr">
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                  </p>
                  <p>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </p>
                </address>
              </nav>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
