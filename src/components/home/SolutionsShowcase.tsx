"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale, SolutionFamily, SolutionMedia } from "@/types/content";
import { getSolutionFamilies, localize } from "@/lib/content";
import { Link } from "@/i18n/navigation";

/**
 * SOLUTIONS — cinematic media showcase (D-050 Solutions integration).
 *
 * One system, not seven cards: a structured Solution index drives a
 * large cinematic media stage carrying the owner-approved film for the
 * active family (locked MAPPING.md associations, data-driven from
 * solutions.ts — no hard-coded paths here).
 *
 * Interaction: the index is directly interactive (click/tap/keyboard;
 * active state = rail + weight + aria-current, never color alone).
 * Activation is MANUAL ONLY — scroll influences only a subtle depth
 * shift on the stage (FULL tier), never the active Solution and never
 * native scrolling (§5: no scroll-jacking).
 *
 * Playback lifecycle (§7): poster-first; ONLY the active layer ever
 * mounts a <video>, and only once the section is near the viewport
 * (IntersectionObserver, rootMargin 30%). Offscreen or hidden-tab →
 * pause; returning → clean resume. The outgoing layer survives just
 * long enough for the transition, then unmounts (releasing its
 * decoder). No eager seven-video loading — switches land on the poster
 * instantly while the faststart MP4 streams in.
 *
 * Transitions: one motion language — directional mask wipe for
 * landscape media, a rising masked frame over a same-media depth
 * atmosphere for portrait (§10), plus a shared light sweep. LITE =
 * plain crossfade; STATIC = posters only, instant swap, zero video
 * elements.
 */
function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";

const TRANSITION_MS = 750;
const ACTIVE_KEY = "sc-solutions-active"; // §14: survives locale/theme remounts

function MediaLayer({
  media,
  alt,
  state,
  dir,
  showVideo,
  index,
  videoRef,
}: {
  media: SolutionMedia;
  alt: string;
  state: "current" | "prev";
  dir: 1 | -1;
  showVideo: boolean;
  index: number;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}) {
  const portrait = media.orientation === "portrait";
  const visual = showVideo ? (
    <video
      ref={videoRef}
      src={media.video}
      poster={media.poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- owner-approved poster, art-directed cover
    <img src={media.poster} alt={alt} loading="lazy" decoding="async" />
  );

  return (
    <div
      className="ss-layer"
      data-state={state}
      data-dir={dir === 1 ? "fwd" : "back"}
      data-orientation={media.orientation}
    >
      {portrait ? (
        <>
          {/* §10: depth atmosphere derived from the SAME media (poster,
              blurred) — never invented surroundings */}
          <div className="ss-depth" style={{ backgroundImage: `url(${media.poster})` }} aria-hidden="true" />
          <div className="ss-portrait-frame">{visual}</div>
        </>
      ) : (
        <div
          className="ss-cover"
          style={
            {
              "--ss-focus": media.focus?.desktop ?? "50% 50%",
              "--ss-focus-m": media.focus?.mobile ?? media.focus?.desktop ?? "50% 50%",
            } as React.CSSProperties
          }
        >
          {visual}
        </div>
      )}
      <div className="ss-grade" aria-hidden="true" />
      <span className="ss-ghost" aria-hidden="true" dir="ltr">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function SolutionsShowcase() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const tier = useSyncExternalStore(subscribeTier, getTier, () => "static");
  const families = getSolutionFamilies();

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [eligible, setEligible] = useState(false); // near viewport → video may load

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevTimer = useRef(0);
  const restored = useRef(false);

  const activate = (i: number) => {
    if (i === active || i < 0 || i >= families.length) return;
    setDir(i > active ? 1 : -1);
    setPrev(active);
    setActive(i);
    try {
      sessionStorage.setItem(ACTIVE_KEY, String(i));
    } catch {
      /* continuity only */
    }
    window.clearTimeout(prevTimer.current);
    prevTimer.current = window.setTimeout(() => setPrev(null), TRANSITION_MS);
  };

  // §7: media becomes eligible near the viewport; §14: the previously
  // active Solution is restored here (event callback, first approach)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (!restored.current) {
              restored.current = true;
              try {
                const saved = Number(sessionStorage.getItem(ACTIVE_KEY));
                if (Number.isInteger(saved) && saved > 0 && saved < families.length) {
                  setActive(saved);
                }
              } catch {
                /* start at 01 */
              }
            }
            setEligible(true);
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        }
      },
      { rootMargin: "30% 0px 30% 0px", threshold: 0.01 },
    );
    io.observe(root);
    const onVis = () => {
      if (document.visibilityState === "hidden") videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.clearTimeout(prevTimer.current);
    };
  }, [families.length]);

  // FULL only: subtle scroll depth on the stage — reversible, passive,
  // never authoritative over scrolling (§5)
  useEffect(() => {
    if (tier !== "full") return;
    const stage = stageRef.current;
    if (!stage) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))); // 0..1 through viewport
        stage.style.setProperty("--ss-shift", `${((p - 0.5) * -28).toFixed(1)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [tier]);

  const current = families[active]!;
  const media = current.media?.published ? current.media : null;
  const prevFamily = prev !== null ? families[prev] : null;
  const prevMedia = prevFamily?.media?.published ? prevFamily.media : null;
  const showVideo = tier !== "static" && eligible;

  const details = (f: SolutionFamily) => (
    <div className="ss-details">
      <p className="text-base font-medium leading-7">{localize(f.tagline, locale)}</p>
      <ul className="mt-4 space-y-1.5">
        {f.subSolutions.slice(0, 3).map((sub) => (
          <li key={sub.id} className="flex items-baseline gap-3 text-sm text-ink-muted">
            <span aria-hidden="true" className="solutions-tick" />
            {localize(sub.name, locale)}
          </li>
        ))}
      </ul>
      <Link
        href={`/solutions/${f.slug}`}
        className="tx-link mt-5 inline-block text-sm font-semibold text-accent"
      >
        {t("common.explore")} →
      </Link>
    </div>
  );

  return (
    <div ref={rootRef} className="solutions-showcase" data-tier={tier}>
      {/* the Solution index — always directly interactive (§6) */}
      <ol className="ss-index" aria-label={t("sections.solutions")}>
        {families.map((f, i) => (
          <li key={f.id} className="ss-item" data-current={i === active || undefined}>
            <button
              type="button"
              onClick={() => activate(i)}
              aria-current={i === active ? "true" : undefined}
              className="ss-item-btn tx-link"
            >
              <span aria-hidden="true" className="ss-item-no microlabel" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="ss-item-rail" />
              <span className="ss-item-name font-display font-semibold">
                {localize(f.name, locale)}
              </span>
            </button>
            {/* desktop: the active entry expands in place */}
            <div className="ss-item-expand" aria-hidden={i !== active}>
              {i === active ? details(f) : null}
            </div>
          </li>
        ))}
      </ol>

      {/* the cinematic media stage */}
      <div
        ref={stageRef}
        className="ss-stage"
        data-orientation={media?.orientation ?? "landscape"}
        role="img"
        aria-label={media ? localize(media.alt, locale) : localize(current.name, locale)}
      >
        {prevMedia && prev !== null ? (
          <MediaLayer
            key={`prev-${prev}`}
            media={prevMedia}
            alt=""
            state="prev"
            dir={dir}
            showVideo={false}
            index={prev}
          />
        ) : null}
        {media ? (
          <MediaLayer
            key={`cur-${active}`}
            media={media}
            alt={localize(media.alt, locale)}
            state="current"
            dir={dir}
            showVideo={showVideo}
            index={active}
            videoRef={videoRef}
          />
        ) : null}
        <span className="ss-sweep" key={`sweep-${active}`} aria-hidden="true" />
      </div>

      {/* small screens: details live under the stage */}
      <div className="ss-details-mobile">{details(current)}</div>
    </div>
  );
}
