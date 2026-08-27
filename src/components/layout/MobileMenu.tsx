"use client";

import { useId, useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/types/content";
import { navigation } from "@/content/navigation";
import { Link } from "@/i18n/navigation";

/**
 * P3 minimal accessible mobile menu (Amendment 5): a plain disclosure
 * list proving navigation and RTL on small screens. The intentionally
 * designed full-screen mobile menu experience is a P4 deliverable and
 * replaces the panel below without changing this component's contract.
 */
export function MobileMenu({ label, closeLabel }: { label: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as Locale;
  const panelId = useId();
  const items = [...navigation].sort((a, b) => a.order - b.order);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : label}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded border border-line text-ink"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>
      {open ? (
        <nav
          id={panelId}
          aria-label="Main"
          className="absolute inset-x-0 top-20 border-b border-line bg-bg p-6"
        >
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={
                    item.highlight === "cta"
                      ? "mt-3 inline-block rounded bg-accent px-5 py-3 font-semibold text-accent-ink"
                      : "block rounded px-2 py-3 text-lg font-medium text-ink"
                  }
                >
                  {item.label[locale === "ar" && item.label.ar ? "ar" : "en"]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
