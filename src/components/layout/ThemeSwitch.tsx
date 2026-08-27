"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

const THEME_EVENT = "sc-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getSnapshot(): "dark" | "light" {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/** Dark/light toggle. Persists an explicit choice (Q-P2-4). */
export function ThemeSwitch() {
  const t = useTranslations("nav");
  // Server snapshot is the dark default; the client snapshot reads the DOM
  // (set pre-paint by ThemeAndTierScript) without a hydration mismatch.
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark" as const);

  const toggle = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sc-theme", next);
    } catch {
      /* storage unavailable — theme still applies for this page */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const label = theme === "dark" ? t("themeLight") : t("themeDark");
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded border border-line text-ink-muted transition-colors hover:text-ink focus-visible:text-ink"
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
