"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { locations } from "@/content/locations";
import { OpeningEngine, type EngineTier } from "./engine";

/**
 * Client host for the cinematic opening + persistent hero field (D-017).
 *
 * Mount rules (decided pre-paint by the bootstrap in ThemeAndTierScript):
 * - html[data-opening="pending"]  → run the full sequence, first visit.
 * - html[data-opening="skipped"|"done"|absent] → ambient hero field only.
 * - STATIC tier → this component is never mounted (Hero renders the
 *   designed static backdrop).
 *
 * Skip contract (J-12/A-1): any meaningful input jumps to the finished
 * hero instantly; the sequence never traps scroll or navigation.
 */
/** Reads the pre-paint motion tier from the DOM without setState-in-effect. */
function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";

export function OpeningExperience() {
  const locale = useLocale();
  // STATIC tier renders NOTHING at all (I-11): no canvas, no decor — the
  // server-rendered hero with its designed static backdrop is the whole
  // experience. Server snapshot is "static" so SSR output matches.
  const tier = useSyncExternalStore(subscribeTier, getTier, () => "static");
  const t = useTranslations("opening");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const engineRef = useRef<OpeningEngine | null>(null);

  useEffect(() => {
    // First client render matches the "static" server snapshot (null), so
    // this effect must re-run once the real tier resolves and the canvas
    // exists — hence the [tier] dependency below.
    if (tier === "static") return; // never animate for STATIC (I-11)
    const html = document.documentElement;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engineTier: EngineTier = tier === "lite" ? "lite" : "full";
    const state = html.getAttribute("data-opening");
    const runSequence = state === "pending";

    const setState = (s: string) => html.setAttribute("data-opening", s);

    const engine = new OpeningEngine(canvas, locations, {
      tier: engineTier,
      rtl: locale === "ar",
      mode: runSequence ? "sequence" : "ambient",
      callbacks: {
        onEvent: (name) => {
          if (name === "logo-in" && logoRef.current) logoRef.current.style.opacity = "1";
          if (name === "logo-out") {
            if (logoRef.current) logoRef.current.style.opacity = "0";
            if (captionRef.current) captionRef.current.style.opacity = "0";
          }
          if (name === "riyadh" && labelRef.current) labelRef.current.style.opacity = "1";
          if (name === "reveal") setState("revealing");
          if (name === "done") {
            setState("done");
            unlockScroll();
          }
        },
        onLabel: (pos) => {
          const el = labelRef.current;
          if (!el) return;
          if (!pos) {
            el.style.opacity = "0";
            return;
          }
          el.style.transform = `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px)`;
        },
      },
    });
    engineRef.current = engine;

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.body.style.overflow = "";
    };

    const skip = () => {
      engine.skip();
      setState("done");
      unlockScroll();
      removeSkipListeners();
    };
    const skipEvents: Array<[string, EventListener]> = [
      ["pointerdown", skip],
      ["wheel", skip],
      ["touchstart", skip],
      ["keydown", skip],
    ];
    const removeSkipListeners = () =>
      skipEvents.forEach(([e, fn]) => window.removeEventListener(e, fn));

    if (runSequence) {
      try {
        sessionStorage.setItem("sc-opening", "done"); // once per session
      } catch {
        /* private mode — sequence may replay, acceptable */
      }
      setState("running");
      lockScroll();
      skipEvents.forEach(([e, fn]) => window.addEventListener(e, fn, { passive: true }));
      if (document.visibilityState === "hidden") skip();
    }

    // §19: one major active canvas at a time — the hero field steps only
    // while the tab is visible AND the hero itself is on screen (the
    // network scene owns the stage further down the page).
    let docVisible = document.visibilityState === "visible";
    let heroInView = true;
    const applyVisible = () => engine.setVisible(docVisible && heroInView);
    const onVisibility = () => {
      docVisible = document.visibilityState === "visible";
      applyVisible();
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) heroInView = e.isIntersecting;
        applyVisible();
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);
    const onResize = () => engine.resize();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    engine.run();

    // expose perf stats for QA sampling (report requirement)
    (window as unknown as { __scOpening?: unknown }).__scOpening = {
      stats: () => engine.stats(),
    };

    return () => {
      engine.destroy();
      removeSkipListeners();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      unlockScroll();
    };
    // locale changes remount the page tree; engine lifetime matches
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier]);

  if (tier === "static") return null;

  return (
    <div className="opening-host" aria-hidden="true">
      <canvas ref={canvasRef} className="opening-canvas" />
      {/* readable identity = the untouched authoritative asset (D-018) */}
      {/* eslint-disable-next-line @next/next/no-img-element -- opacity is engine-driven; next/image adds nothing for a decorative overlay */}
      <img ref={logoRef} src="/brand/logo-dark.png" alt="" className="opening-logo" />
      <p ref={captionRef} className="opening-caption microlabel">
        {t("caption")}
      </p>
      <p ref={labelRef} className="opening-hq-label microlabel" dir={locale === "ar" ? "rtl" : "ltr"}>
        {t("hqLabel")}
      </p>
    </div>
  );
}
