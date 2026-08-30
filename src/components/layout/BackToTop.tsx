"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * BACK-TO-TOP (§36 · D-050): third member of the floating action
 * stack, revealed only after meaningful scroll (the hero never shows
 * it). Scrolls smoothly home; instant under reduced motion via the
 * motion-tier CSS (scroll-behavior) and the "auto" fallback.
 */
export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 1.2);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className="floating-top"
      data-visible={visible || undefined}
      aria-label={t("backToTop")}
      title={t("backToTop")}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reduce =
          document.documentElement.getAttribute("data-motion-tier") === "static" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path
          d="M12 19V6M6 12l6-6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
