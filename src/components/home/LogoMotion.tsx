"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Cinematic logo motion systems (P5 §§2–3).
 *
 * Two distinct identities over one WAAPI rail engine:
 * - AllianceStream — the engineered technology stream: two counter-flowing
 *   depth rows at slow premium velocity, a periodic signal sweep, and a
 *   localized hover response (the row eases to near-stillness while the
 *   focused mark lifts with a restrained glow).
 * - ClientConstellation — the trusted institutional constellation: three
 *   calmer multi-row trajectories with depth variation, soft edge masks,
 *   per-chip drift, and a gentle pointer parallax. Prestige, not spectacle.
 *
 * Seamless loops: each track holds two copies of its sequence and
 * translates exactly one copy-width (re-measured on resize/image load) —
 * no visible jump. Logos are never distorted, recolored or mirrored; RTL
 * reverses FLOW direction only. Rails pause offscreen and when the tab is
 * hidden; LITE slows and simplifies; STATIC (and SSR/no-JS) renders the
 * premium static grid compositions instead.
 */
export interface RailLogo {
  id: string;
  name: string;
  src: string;
}

function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";
const useTier = () => useSyncExternalStore(subscribeTier, getTier, () => "static");

/** One seamless rail row. speed = px/s; negative flows the other way. */
function Rail({
  logos,
  speed,
  chipClass,
  rtl,
}: {
  logos: RailLogo[];
  speed: number;
  chipClass: string;
  rtl: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const rateRef = useRef(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.firstElementChild as HTMLElement | null;
    if (!half) return;

    let disposed = false;
    const build = () => {
      if (disposed) return;
      const w = half.getBoundingClientRect().width;
      if (w < 10) return;
      const progress =
        animRef.current && animRef.current.effect
          ? ((animRef.current.currentTime as number) ?? 0) %
            (animRef.current.effect.getTiming().duration as number)
          : 0;
      animRef.current?.cancel();
      // the track is always laid out LTR (dir="ltr"); RTL reverses the
      // FLOW direction only (§2) — logos themselves never mirror. A
      // negative speed flows a row against its siblings (layered depth).
      const flowLeft = speed > 0 ? !rtl : rtl;
      const frames = flowLeft
        ? [{ transform: "translateX(0px)" }, { transform: `translateX(${-w}px)` }]
        : [{ transform: `translateX(${-w}px)` }, { transform: "translateX(0px)" }];
      const anim = track.animate(frames, {
        duration: (w / Math.abs(speed)) * 1000,
        iterations: Infinity,
      });
      anim.currentTime = progress;
      anim.playbackRate = rateRef.current;
      animRef.current = anim;
    };
    build();

    const ro = new ResizeObserver(build);
    ro.observe(half);
    // rebuild once late-loading logos change the measured width
    const imgs = [...half.querySelectorAll("img")];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", build, { once: true });
    });

    // smooth acceleration/deceleration on hover/focus (§2)
    let raf = 0;
    const ease = (target: number) => {
      cancelAnimationFrame(raf);
      const step = () => {
        const cur = rateRef.current;
        const next = cur + (target - cur) * 0.12;
        rateRef.current = Math.abs(next - target) < 0.01 ? target : next;
        animRef.current?.updatePlaybackRate(rateRef.current);
        if (rateRef.current !== target) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const slow = () => ease(0.15);
    const resume = () => ease(1);
    track.addEventListener("pointerenter", slow);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", slow);
    track.addEventListener("focusout", resume);

    // §17: pause offscreen and when the tab hides
    let inView = true;
    const sync = () => {
      if (inView && document.visibilityState === "visible") animRef.current?.play();
      else animRef.current?.pause();
    };
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) inView = e.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    io.observe(track);
    document.addEventListener("visibilitychange", sync);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      animRef.current?.cancel();
    };
  }, [speed, rtl, logos.length]);

  const seq = (key: string) => (
    <div key={key} className="rail-half" aria-hidden={key === "b" || undefined}>
      {logos.map((l) => (
        <div key={`${key}-${l.id}`} className={chipClass}>
          {/* proportions preserved; never recolored or mirrored */}
          {/* eslint-disable-next-line @next/next/no-img-element -- approved marks, CSS contain sizing */}
          <img src={l.src} alt={key === "a" ? l.name : ""} loading="lazy" />
        </div>
      ))}
    </div>
  );

  return (
    <div ref={trackRef} className="rail-track" dir="ltr">
      {seq("a")}
      {seq("b")}
    </div>
  );
}

/* ------------------------- Technology Alliances ------------------------- */

export function AllianceStream({ logos, rtl }: { logos: RailLogo[]; rtl: boolean }) {
  const tier = useTier();
  if (tier === "static") return <StaticGrid logos={logos} kind="alliance" />;
  const lite = tier === "lite";
  const mid = Math.ceil(logos.length / 2);
  return (
    <div className="alliance-stream" dir="ltr" data-lite={lite || undefined}>
      <Rail logos={logos.slice(0, mid)} speed={lite ? 16 : 26} chipClass="stream-chip" rtl={rtl} />
      <Rail
        logos={logos.slice(mid)}
        speed={lite ? -13 : -20}
        chipClass="stream-chip stream-chip-far"
        rtl={rtl}
      />
      {!lite ? <div className="stream-sweep" aria-hidden="true" /> : null}
    </div>
  );
}

/* ----------------------------- Our Clients ------------------------------ */

export function ClientConstellation({ logos, rtl }: { logos: RailLogo[]; rtl: boolean }) {
  const tier = useTier();
  const hostRef = useRef<HTMLDivElement>(null);

  // gentle pointer parallax — rows drift a few px against the pointer
  useEffect(() => {
    if (tier === "static") return;
    const host = hostRef.current;
    if (!host) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        host.style.setProperty("--px", x.toFixed(3));
      });
    };
    const onLeave = () => host.style.setProperty("--px", "0");
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [tier]);

  if (tier === "static") return <StaticGrid logos={logos} kind="client" />;
  const lite = tier === "lite";
  const third = Math.ceil(logos.length / 3);
  const rows = [logos.slice(0, third), logos.slice(third, third * 2), logos.slice(third * 2)];
  return (
    <div ref={hostRef} className="client-constellation" dir="ltr" data-lite={lite || undefined}>
      {rows.map((row, i) => (
        <div key={i} className={`constellation-row constellation-row-${i}`}>
          <Rail
            logos={row}
            speed={(i % 2 === 0 ? 1 : -1) * (lite ? 7 : [11, 8, 13][i]!)}
            chipClass="constellation-chip"
            rtl={rtl}
          />
        </div>
      ))}
    </div>
  );
}

/* --------------------- STATIC / no-JS compositions ---------------------- */

function StaticGrid({ logos, kind }: { logos: RailLogo[]; kind: "alliance" | "client" }) {
  if (kind === "alliance") {
    return (
      <ul className="alliances-grid">
        {logos.map((l) => (
          <li key={l.id} className="alliance-cell">
            {/* eslint-disable-next-line @next/next/no-img-element -- approved marks */}
            <img src={l.src} alt={l.name} loading="lazy" className="alliance-logo" />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="clients-wall">
      {logos.map((l) => (
        <li key={l.id} className="client-chip">
          {/* eslint-disable-next-line @next/next/no-img-element -- approved marks */}
          <img src={l.src} alt={l.name} loading="lazy" className="client-logo" />
        </li>
      ))}
    </ul>
  );
}
