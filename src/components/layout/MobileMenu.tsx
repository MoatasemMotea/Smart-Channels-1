"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { navigation } from "@/content/navigation";
import { contact } from "@/content/contact";
import { Link } from "@/i18n/navigation";

/**
 * Full-screen mobile navigation (P4 · F-8).
 *
 * Same visual universe as the cinematic environment (deep dark ground,
 * restrained atmospheric glow), but usability first: large readable type,
 * ≥48px targets, focus trap, ESC to close, scroll lock, focus returned to
 * the trigger, staggered entrance that STATIC tier disables. Content is
 * data-driven (navigation.ts + approved contact) — never hard-coded.
 */
export function MobileMenu({ label, closeLabel }: { label: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const items = [...navigation].sort((a, b) => a.order - b.order);
  const label_ = (v: { en: string; ar?: string }) => (locale === "ar" && v.ar ? v.ar : v.en);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : label}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded border border-line text-ink"
      >
        <span aria-hidden="true">☰</span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={t("common.menu")}
          className="mobile-menu-overlay"
        >
          <div className="relative flex items-center justify-between">
            <p className="microlabel">{t("common.menu")}</p>
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="flex h-12 w-12 items-center justify-center rounded border border-line text-lg text-ink"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <nav aria-label="Main" className="relative mt-8 flex-1">
            <ul className="flex flex-col">
              {items
                .filter((i) => i.highlight !== "cta")
                .map((item, i) => (
                  <li
                    key={item.id}
                    className="mobile-menu-item border-b border-line"
                    style={{ animationDelay: `${40 + i * 45}ms` }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="tx-link block py-4 font-display text-2xl font-semibold text-ink"
                    >
                      {label_(item.label)}
                    </Link>
                  </li>
                ))}
            </ul>

            {items
              .filter((i) => i.highlight === "cta")
              .map((cta) => (
                <Link
                  key={cta.id}
                  href={cta.href}
                  onClick={close}
                  className="mobile-menu-item mt-8 flex w-full items-center justify-center rounded bg-accent px-6 py-4 font-semibold text-accent-ink"
                  style={{ animationDelay: "400ms" }}
                >
                  {label_(cta.label)}
                </Link>
              ))}
          </nav>

          <address className="relative mt-10 text-sm not-italic leading-7 text-ink-muted">
            <p dir="ltr">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </address>
        </div>
      ) : null}
    </div>
  );
}
