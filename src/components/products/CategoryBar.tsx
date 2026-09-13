"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

/**
 * CATEGORY STRIP with hover-reveal panels (D-059 §4).
 *
 * Nine category links in one horizontally scrollable row. Resting the
 * pointer on a link reveals a panel listing that category's unique
 * product types and a "view all" link. Timing is deliberate:
 *   open after 110 ms  — a pointer crossing the strip never flickers it
 *   close after 220 ms — the gap between link and panel is safe to cross
 * Entering the panel cancels a pending close.
 *
 * Pointerless devices ((hover: none)): the first tap on a closed
 * category opens its panel, the second tap follows the link.
 * Keyboard: focus opens, Escape closes, focus leaving the strip closes.
 * aria-expanded / aria-controls keep assistive tech in step; a closed
 * panel is visibility:hidden, so it is out of the tab order and the
 * accessibility tree without extra attributes.
 */
export interface BarCategory {
  slug: string;
  label: string;
  full: string;
  href: string;
  types: string[];
}

const OPEN_DELAY = 110;
const CLOSE_DELAY = 220;

export function CategoryBar({
  categories,
  current,
  viewAllLabel,
  ariaLabel,
}: {
  categories: BarCategory[];
  /** slug of the category page being viewed, if any */
  current?: string;
  viewAllLabel: string;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const openTimer = useRef(0);
  const closeTimer = useRef(0);
  const pointerless = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    pointerless.current = window.matchMedia("(hover: none)").matches;
    return () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  const cancel = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };
  const scheduleOpen = (slug: string) => {
    cancel();
    openTimer.current = window.setTimeout(() => setOpen(slug), OPEN_DELAY);
  };
  const scheduleClose = () => {
    cancel();
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  };
  const openNow = (slug: string) => {
    cancel();
    setOpen(slug);
  };
  const closeNow = () => {
    cancel();
    setOpen(null);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // closeNow is stable in effect: it only touches refs and a setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <nav
      ref={navRef}
      className="catalog-bar"
      aria-label={ariaLabel}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        // focus moved outside the strip entirely → nothing is "expanded"
        if (!navRef.current?.contains(e.relatedTarget as Node | null)) closeNow();
      }}
    >
      <ul className="catalog-bar-list">
        {categories.map((c) => {
          const isOpen = open === c.slug;
          const panelId = `catalog-panel-${c.slug}`;
          return (
            <li
              key={c.slug}
              className="catalog-bar-item"
              onMouseEnter={() => scheduleOpen(c.slug)}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={c.href}
                className="catalog-bar-link"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-current={current === c.slug ? "page" : undefined}
                onFocus={() => openNow(c.slug)}
                onClick={(e) => {
                  if (pointerless.current && !isOpen) {
                    e.preventDefault(); // first tap reveals; the second follows
                    openNow(c.slug);
                  }
                }}
              >
                {c.label}
              </Link>
              <div
                id={panelId}
                className="catalog-panel"
                data-open={isOpen || undefined}
                role="region"
                aria-label={c.full}
                onMouseEnter={cancel}
                onMouseLeave={scheduleClose}
              >
                <ul>
                  {c.types.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Link href={c.href} className="catalog-panel-all tx-link microlabel" tabIndex={isOpen ? 0 : -1}>
                  {viewAllLabel}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
