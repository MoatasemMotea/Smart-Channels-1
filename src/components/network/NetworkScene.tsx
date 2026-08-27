"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { locations } from "@/content/locations";
import { gulfRegions } from "@/content/regions";
import { stats } from "@/content/stats";
import { SAUDI_OUTLINE, GEO_BOUNDS, project } from "@/lib/map/geo";
import { NetworkEngine, type NetRegion, type NetTier } from "./engine";

/**
 * Homepage chapter 04 — TRACK RECORD × NATIONAL NETWORK (Revision 2 §§3–9).
 *
 * One designed cinematic moment, not a map widget: the Kingdom emerges
 * from the same particle universe as the Opening/Hero, Riyadh activates
 * as the brand origin, the signal travels city to city, the constellation
 * matures toward the Gulf horizon — and the approved Track Record counters
 * rise in step with the choreography (D-002).
 *
 * Progressive enhancement: the server render carries the full semantic
 * content (counters at final values) plus a designed static SVG map — the
 * STATIC-tier and no-JS experience (§18). FULL/LITE swap the SVG for the
 * canvas story pre-paint via the tier attribute. The story plays once,
 * pauses offscreen, and stops rendering entirely when finished (§19).
 *
 * The Saudi geometry is never mirrored in RTL (§11) — the SVG carries an
 * explicit dir="ltr" isolation and the canvas draws in screen space.
 */
/** Regional-reach geometry (Rev3 §10): destination = projected lat/lon;
 *  departure anchor = nearest Saudi outline vertex, so reach routes grow
 *  out of the geography. Enabled records only (owner-editable data). */
const REGIONS: NetRegion[] = gulfRegions
  .filter((r) => r.enabled)
  .map((r) => {
    const d = project(r.latitude, r.longitude);
    let best = SAUDI_OUTLINE[0]!;
    let bestDist = Infinity;
    for (const v of SAUDI_OUTLINE) {
      const p = project(v[1], v[0]);
      const dist = Math.hypot(p.x - d.x, p.y - d.y);
      if (dist < bestDist) {
        bestDist = dist;
        best = v;
      }
    }
    const a = project(best[1], best[0]);
    return { id: r.id, nx: d.x, ny: d.y, ax: a.x, ay: a.y };
  });

/** Reads the pre-paint motion tier without setState-in-effect. */
function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";

export function NetworkScene() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  // Server snapshot is "static": SSR/no-JS markup carries the designed SVG
  // frame and NO canvas; FULL/LITE mount the canvas after the tier resolves.
  const tier = useSyncExternalStore(subscribeTier, getTier, () => "static");
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const regionRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const legendRef = useRef<HTMLParagraphElement>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const engineRef = useRef<NetworkEngine | null>(null);

  useEffect(() => {
    if (tier === "static") return; // designed static frame stays (§18)
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const engineTier: NetTier = tier === "lite" ? "lite" : "full";

    // counters start from zero only when the story will actually run
    valueRefs.current.forEach((el) => {
      if (el) el.textContent = "0";
    });

    const engine = new NetworkEngine(canvas, locations, {
      tier: engineTier,
      regions: REGIONS,
      callbacks: {
        onRegion: (id, pos) => {
          const el = regionRefs.current[id];
          if (!el) return;
          if (!pos) {
            el.style.opacity = "0";
            return;
          }
          el.style.opacity = "1";
          el.style.transform = `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px)`;
        },
        onRegional: () => {
          if (legendRef.current) legendRef.current.style.opacity = "1";
        },
        onLabel: (pos) => {
          const el = labelRef.current;
          if (!el) return;
          if (!pos) {
            el.style.opacity = "0";
            return;
          }
          el.style.opacity = "1";
          el.style.transform = `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px)`;
        },
        onCount: (p) => {
          valueRefs.current.forEach((el, i) => {
            const s = stats[i];
            if (el && s) el.textContent = String(Math.round(s.value * p));
          });
        },
        onDone: () => {
          io.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
        },
      },
    });
    engineRef.current = engine;

    let inView = false;
    const sync = () => {
      if (engine.isDone()) return;
      if (inView && document.visibilityState === "visible") engine.start();
      else engine.pause();
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView = e.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(section);
    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);
    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      engine.destroy();
    };
    // first client render matches the "static" server snapshot (no canvas);
    // the effect re-runs once the real tier resolves and the canvas exists
  }, [tier]);

  /* ---- designed static frame (server-rendered; STATIC/no-JS, §18) ---- */
  const W = 1000;
  const H = Math.round(
    (W * (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat)) /
      ((GEO_BOUNDS.maxLon - GEO_BOUNDS.minLon) *
        Math.cos((((GEO_BOUNDS.minLat + GEO_BOUNDS.maxLat) / 2) * Math.PI) / 180)),
  );
  const outlinePts = SAUDI_OUTLINE.map(([lon, lat]) => {
    const p = project(lat, lon);
    return `${(p.x * W).toFixed(1)},${(p.y * H).toFixed(1)}`;
  }).join(" ");
  const nodePts = locations.map((l) => {
    const p = project(l.latitude, l.longitude);
    return { id: l.id, x: p.x * W, y: p.y * H, hq: l.kind === "hq" };
  });
  const hqNode = nodePts.find((n) => n.hq);
  const regionPts = REGIONS.map((r) => ({
    id: r.id,
    x: r.nx * W,
    y: r.ny * H,
    ax: r.ax * W,
    ay: r.ay * H,
  }));

  return (
    <section
      ref={sectionRef}
      className="network-scene border-b border-line"
      aria-label={t("sections.trackRecord")}
      data-scene="track-record"
      data-env="dark"
    >
      <div className="relative mx-auto max-w-360 px-6 py-20 lg:px-12">
        <p className="microlabel">{t("sections.trackRecord")}</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold md:text-4xl">
          {t("network.title")}
        </h2>

        <div className="network-stage" aria-hidden="true">
          {/* cinematic story (FULL/LITE); STATIC mounts no canvas at all */}
          {tier === "static" ? null : (
            <>
              <canvas ref={canvasRef} className="network-canvas" />
              <p ref={labelRef} className="network-hq-label" dir={locale === "ar" ? "rtl" : "ltr"}>
                <span className="network-hq-city">{t("network.city")}</span>
                <span className="network-hq-role">{t("network.role")}</span>
              </p>
              {/* Regional-reach labels (§10): muted, hollow-marker voice —
                  storytelling reach, never project evidence. */}
              {gulfRegions
                .filter((r) => r.enabled)
                .map((r) => (
                  <span
                    key={r.id}
                    ref={(el) => {
                      regionRefs.current[r.id] = el;
                    }}
                    className="network-region-label"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  >
                    {locale === "ar" && r.name.ar ? r.name.ar : r.name.en}
                  </span>
                ))}
              <p ref={legendRef} className="network-regional-legend microlabel">
                {t("network.regional")}
              </p>
            </>
          )}

          {/* designed final frame (STATIC tier / no JS). The geography keeps
              its true orientation — never mirrored (§11). */}
          <div className="network-static" dir="ltr">
            <svg viewBox={`0 0 ${W} ${H}`} role="presentation" focusable="false">
              <polygon
                points={outlinePts}
                fill="rgba(226,226,229,0.05)"
                stroke="rgba(226,226,229,0.55)"
                strokeWidth="1.4"
                strokeDasharray="5 7"
                strokeLinejoin="round"
              />
              {hqNode
                ? nodePts
                    .filter((n) => !n.hq)
                    .map((n) => (
                      <line
                        key={`r-${n.id}`}
                        x1={hqNode.x}
                        y1={hqNode.y}
                        x2={n.x}
                        y2={n.y}
                        stroke="rgba(255,24,156,0.24)"
                        strokeWidth="1"
                      />
                    ))
                : null}
              {regionPts.map((r) => (
                <g key={`reach-${r.id}`}>
                  <line
                    x1={r.ax}
                    y1={r.ay}
                    x2={r.x}
                    y2={r.y}
                    stroke="rgba(255,24,156,0.2)"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                  />
                  <circle cx={r.x} cy={r.y} r="4.2" fill="none" stroke="rgba(226,226,229,0.6)" strokeWidth="1.2" />
                </g>
              ))}
              {nodePts.map((n) =>
                n.hq ? (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r="4.5" fill="var(--accent)" />
                    <circle cx={n.x} cy={n.y} r="13" fill="none" stroke="rgba(255,24,156,0.5)" strokeWidth="1.6" />
                    <circle cx={n.x} cy={n.y} r="22" fill="none" stroke="rgba(255,24,156,0.2)" strokeWidth="1" />
                  </g>
                ) : (
                  <circle key={n.id} cx={n.x} cy={n.y} r="3.4" fill="rgba(233,233,236,0.95)" />
                ),
              )}
            </svg>
            <p className="network-static-caption" dir={locale === "ar" ? "rtl" : "ltr"}>
              <span className="network-hq-city">{t("network.city")}</span>
              <span aria-hidden="true"> — </span>
              <span className="network-hq-role">{t("network.role")}</span>
              <span className="network-static-caption-sep" aria-hidden="true"> · </span>
              <span className="text-ink-muted">
                {t("network.regional")}:{" "}
                {gulfRegions
                  .filter((r) => r.enabled)
                  .map((r) => (locale === "ar" && r.name.ar ? r.name.ar : r.name.en))
                  .join(" · ")}
              </span>
            </p>
          </div>
        </div>

        {/* Track Record — approved figures (D-002); server-rendered final
            values are the no-JS/STATIC truth, the engine counts them up in
            step with the network choreography. Suffixes never animate. */}
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.id} className="border-t border-line pt-4">
              <dd className="font-display text-5xl font-bold tabular-nums" dir="ltr">
                <span
                  ref={(el) => {
                    valueRefs.current[i] = el;
                  }}
                >
                  {s.value}
                </span>
                {s.suffix ? <span className="text-accent">{s.suffix}</span> : null}
              </dd>
              <dt className="mt-2 text-sm text-ink-muted">
                {locale === "ar" && s.label.ar ? s.label.ar : s.label.en}
              </dt>
            </div>
          ))}
        </dl>
        <p className="microlabel mt-6">{t("network.asOf")}</p>
      </div>
    </section>
  );
}
