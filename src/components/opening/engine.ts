/**
 * Smart Channels opening engine (P4 · D-017/D-018).
 *
 * One continuous Canvas-2D particle system drives the whole cinematic:
 * drift → brand assembly (raster crossfade handled by the host component)
 * → dispersion → Saudi geography → Riyadh/HQ + evidence network →
 * release into the hero field → ambient hero mode. Particles are never
 * destroyed/recreated between beats — they steer toward new target sets,
 * so velocity and trajectory carry across states (owner quality bar).
 *
 * Deterministic (seeded); text is NEVER drawn on canvas (Arabic shaping +
 * accessibility — labels are DOM, positioned via onLabel callback).
 * Motion values derive from the motion-token families (engineered /
 * cinematic easing curves below mirror src/lib/motion/tokens.ts).
 */
import { LOGO_POINTS, MAP_POINTS, MAP_ASPECT, type OpeningPoint } from "@/generated/opening-data";
import { project } from "@/lib/map/geo";
import type { MapLocation } from "@/content/locations";

export type EngineTier = "full" | "lite";
export type EngineMode = "sequence" | "ambient";

export interface EngineCallbacks {
  /** Phase events: "assemble" | "logo-in" | "logo-out" | "map" | "riyadh" | "reveal" | "done" */
  onEvent?: (name: string) => void;
  /** Screen-space anchor for the Riyadh DOM label (or null to hide). */
  onLabel?: (pos: { x: number; y: number } | null) => void;
}

export interface EngineOptions {
  tier: EngineTier;
  rtl: boolean;
  mode: EngineMode;
  callbacks?: EngineCallbacks;
}

/* Timeline (ms) — D-017 target ≈4.6s desktop, ≈4.0s LITE (G-9). */
const TIMELINE_FULL = {
  driftEnd: 820,
  assembleEnd: 1650,
  logoIn: 1380,
  holdEnd: 2200,
  logoOut: 2420,
  mapEnd: 3250, // geography settled + Riyadh ignition
  networkEnd: 4050, // evidence network at national scale
  reveal: 4150,
  end: 4850,
};
const TIMELINE_LITE = {
  driftEnd: 700,
  assembleEnd: 1420,
  logoIn: 1180,
  holdEnd: 1900,
  logoOut: 2100,
  mapEnd: 2820,
  networkEnd: 3480,
  reveal: 3560,
  end: 4150,
};

const easeCinematic = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3.2);
const easeEngineered = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  color: 0 | 1 | 2; // neutral | magenta | purple
  depth: 0 | 1 | 2; // far | mid | near
  size: number;
  swirl: number; // per-particle curvature during travel
  tw: number; // twinkle phase
  cool: number; // 0..1 — magenta particles cool toward neutral in map phase
}

interface EvidenceNode {
  id: string;
  x: number; // normalized map coords
  y: number;
  hq: boolean;
  order: number;
}

export interface PerfStats {
  frames: number;
  avgMs: number;
  p95Ms: number;
  downgraded: boolean;
}

export class OpeningEngine {
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private raf = 0;
  private start = 0;
  private last = 0;
  private t = 0;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private tier: EngineTier;
  private readonly rtl: boolean;
  private mode: EngineMode;
  private cb: EngineCallbacks;
  private tl: typeof TIMELINE_FULL;
  private fired = new Set<string>();
  private destroyed = false;
  private skipped = false;
  private nodes: EvidenceNode[] = [];
  private links: Array<[EvidenceNode, EvidenceNode]> = [];
  private frameTimes: number[] = [];
  private downgraded = false;
  private ambientClock = 0;
  private visible = true;
  private heroTargets: Array<{ x: number; y: number }> = [];
  private mapRect = { x: 0, y: 0, w: 0, h: 0 };
  private rnd = mulberry32(452026);

  constructor(
    private canvas: HTMLCanvasElement,
    private locations: MapLocation[],
    opts: EngineOptions,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2d context unavailable");
    this.ctx = ctx;
    this.tier = opts.tier;
    this.rtl = opts.rtl;
    this.mode = opts.mode;
    this.cb = opts.callbacks ?? {};
    this.tl = opts.tier === "lite" ? TIMELINE_LITE : TIMELINE_FULL;
    this.resize();
    this.buildGeo();
    this.buildParticles();
    if (this.mode === "ambient") this.seedAmbient();
  }

  /* ---------------- public API ---------------- */

  run(): void {
    this.start = performance.now();
    this.last = this.start;
    const loop = (now: number) => {
      if (this.destroyed) return;
      const dt = Math.min(48, now - this.last);
      this.last = now;
      if (this.visible) {
        const frameStart = performance.now();
        this.step(now, dt / 1000);
        this.frameTimes.push(performance.now() - frameStart);
        this.monitor();
      }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  /** Jump straight to the finished hero state (skip / auto-skip). */
  skip(): void {
    if (this.skipped || this.mode === "ambient") return;
    this.skipped = true;
    this.mode = "ambient";
    this.seedAmbient(true);
    this.fire("reveal");
    this.fire("done");
    this.cb.onLabel?.(null);
  }

  setVisible(v: boolean): void {
    this.visible = v;
  }

  resize(): void {
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.layoutRects();
  }

  destroy(): void {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
  }

  stats(): PerfStats {
    const s = [...this.frameTimes].sort((a, b) => a - b);
    const avg = s.length ? s.reduce((a, b) => a + b, 0) / s.length : 0;
    const p95 = s.length ? s[Math.floor(s.length * 0.95)]! : 0;
    return { frames: s.length, avgMs: avg, p95Ms: p95, downgraded: this.downgraded };
  }

  /* ---------------- setup ---------------- */

  private layoutRects(): void {
    // Map occupies center stage with breathing room; aspect-corrected.
    const availW = this.width * (this.width < 768 ? 0.9 : 0.74);
    const availH = this.height * 0.72;
    let w = availW;
    let h = w / MAP_ASPECT;
    if (h > availH) {
      h = availH;
      w = h * MAP_ASPECT;
    }
    this.mapRect = {
      x: (this.width - w) / 2,
      y: this.height * 0.12,
      w,
      h,
    };
  }

  private buildGeo(): void {
    const opening = this.locations.filter((l) => l.appearsInOpening);
    this.nodes = opening.map((l, i) => {
      const p = project(l.latitude, l.longitude);
      return { id: l.id, x: p.x, y: p.y, hq: l.kind === "hq", order: i };
    });
    // Peer evidence links (never HQ-spoked — P2-A05).
    const byId = new Map(this.nodes.map((n) => [n.id, n]));
    const pairs: Array<[string, string]> = [
      ["jeddah", "makkah"],
      ["jeddah", "alula"],
      ["alula", "neom"],
      ["abha", "jeddah"],
    ];
    this.links = pairs
      .map(([a, b]) => [byId.get(a), byId.get(b)] as const)
      .filter((p): p is [EvidenceNode, EvidenceNode] => Boolean(p[0] && p[1]));
  }

  private buildParticles(): void {
    const budget = this.tier === "lite" ? 0.45 : 1;
    const pick = (pts: OpeningPoint[]) => pts.filter(() => this.rnd() < budget);
    const source = pick(LOGO_POINTS);
    this.particles = source.map((p) => {
      const depth = p[3];
      return {
        x: this.rnd() * this.width,
        y: this.rnd() * this.height,
        vx: (this.rnd() - 0.5) * 30,
        vy: (this.rnd() - 0.5) * 30,
        tx: 0,
        ty: 0,
        color: p[2],
        depth,
        size: [0.9, 1.35, 1.9][depth]! * (0.8 + this.rnd() * 0.5),
        swirl: (this.rnd() - 0.5) * 2.4,
        tw: this.rnd() * Math.PI * 2,
        cool: 0,
      };
    });
    this.assignLogoTargets(source);
    // Hero-field distribution reused at release + ambient.
    this.heroTargets = this.particles.map(() => ({
      x: this.rnd() * this.width,
      y: this.rnd() * this.height,
    }));
  }

  private assignLogoTargets(source: OpeningPoint[]): void {
    // Logo cloud centered where the raster asset will crossfade in.
    const scale = Math.min(this.width * 0.34, this.height * 0.52, 460);
    const w = scale;
    const h = scale * (660 / 610);
    const cx = this.width / 2 - w / 2;
    const cy = this.height * 0.42 - h / 2;
    this.particles.forEach((pt, i) => {
      const s = source[i]!;
      pt.tx = cx + s[0] * w;
      pt.ty = cy + s[1] * h;
    });
  }

  private assignMapTargets(): void {
    const budget = this.tier === "lite" ? 0.45 : 1;
    const pts = MAP_POINTS.filter(() => this.rnd() < budget);
    const { x, y, w, h } = this.mapRect;
    this.particles.forEach((pt, i) => {
      // spread indices across the whole set so contour + interior are both
      // covered even when particles < points (critical on LITE)
      const s = pts[Math.floor((i * pts.length) / this.particles.length) % pts.length]!;
      pt.tx = x + s[0] * w;
      pt.ty = y + s[1] * h;
      // Adopt the map point's depth so contour points render on the near
      // layer: this is what makes the silhouette read immediately (B-3).
      pt.depth = s[3];
      pt.size = [0.95, 1.25, 1.95][s[3]]! * (0.85 + (i % 7) * 0.045);
      // Geography is neutral by design; former magenta particles cool so
      // the accent becomes selective again (visual diversity rule).
      if (pt.color === 1) pt.cool = 1;
    });
  }

  private assignHeroTargets(): void {
    this.particles.forEach((pt, i) => {
      pt.tx = this.heroTargets[i]!.x;
      pt.ty = this.heroTargets[i]!.y;
    });
  }

  private seedAmbient(fromSkip = false): void {
    this.assignHeroTargets();
    if (fromSkip) {
      // Land instantly but keep residual motion so the field feels alive.
      this.particles.forEach((pt) => {
        pt.x = pt.tx + (this.rnd() - 0.5) * 24;
        pt.y = pt.ty + (this.rnd() - 0.5) * 24;
        pt.cool = pt.color === 1 ? 1 : pt.cool;
      });
    }
  }

  /* ---------------- simulation ---------------- */

  private fire(name: string): void {
    if (this.fired.has(name)) return;
    this.fired.add(name);
    this.cb.onEvent?.(name);
  }

  private monitor(): void {
    // FULL → LITE runtime downgrade (J-12): sustained slow frames.
    if (this.downgraded || this.tier === "lite") return;
    const n = this.frameTimes.length;
    if (n > 40 && n % 20 === 0) {
      const recent = this.frameTimes.slice(-30);
      const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
      if (avg > 24) {
        this.downgraded = true;
        this.tier = "lite";
        // Drop the far layer to cut work while keeping composition.
        this.particles = this.particles.filter((p) => p.depth !== 0);
      }
    }
  }

  private step(now: number, dt: number): void {
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    if (this.mode === "ambient") {
      this.ambientClock += dt;
      this.stepParticles(dt, 2.2, 0.86, true);
      this.drawParticles(1, 0.6);
      this.drawAmbientSignal();
      return;
    }

    this.t = now - this.start;
    const { tl } = this;

    /* phase transitions (single continuous system — targets change, particles persist) */
    if (this.t >= tl.driftEnd) this.fire("assemble");
    if (this.t >= tl.logoIn && this.t < tl.logoOut) this.fire("logo-in");
    if (this.t >= tl.logoOut) {
      if (!this.fired.has("map")) {
        this.fire("logo-out");
        this.assignMapTargets();
        this.fire("map");
      }
    }
    if (this.t >= tl.mapEnd) this.fire("riyadh");
    if (this.t >= tl.networkEnd && !this.fired.has("release")) {
      this.fired.add("release");
      this.assignHeroTargets();
    }
    if (this.t >= tl.reveal) this.fire("reveal");
    if (this.t >= tl.end) {
      this.fire("done");
      this.mode = "ambient";
      this.cb.onLabel?.(null);
      return;
    }

    /* camera (restrained: scale + drift; C-4/E-6) */
    const cam = this.camera();
    ctx.translate(this.width / 2, this.height / 2);
    ctx.scale(cam.s, cam.s);
    ctx.translate(-this.width / 2 + cam.tx, -this.height / 2 + cam.ty);

    /* physics: stiffness by phase — drifting is loose, assembly is firmer */
    const assembling = this.t < tl.holdEnd;
    // stiffer while the geography must resolve so the silhouette is
    // readable well before the network beat (B-3 amendment)
    // Near-critical damping (damp ≈ 2/√k) so each target set RESOLVES
    // quickly and legibly instead of drifting in overdamped approach.
    const settlingMap = this.t >= tl.logoOut && this.t < tl.networkEnd;
    const k = this.t < tl.driftEnd ? 0.8 : assembling ? 5.5 : settlingMap ? 9.5 : 3.4;
    const damp = this.t < tl.driftEnd ? 0.45 : 2 / Math.sqrt(k);
    this.stepParticles(dt, k, damp, false);

    /* map substrate + network overlays */
    const mapIn = clamp01((this.t - tl.logoOut) / (tl.mapEnd - tl.logoOut));
    const mapOut = this.fired.has("release")
      ? 1 - clamp01((this.t - tl.networkEnd) / (tl.end - tl.networkEnd))
      : 1;
    if (mapIn > 0 && mapOut > 0.02) this.drawGeoLayer(mapIn * mapOut);

    const dissolve = clamp01((this.t - tl.networkEnd) / (tl.end - tl.networkEnd));
    // calmer shimmer while the geography must be read
    const geoPhase = this.t >= tl.logoOut && this.t < tl.networkEnd;
    const geoLift = geoPhase ? 1.35 : 1;
    this.drawParticles((1 - dissolve * 0.25) * geoLift, geoPhase ? 0.35 : 1, geoPhase);

    /* Riyadh label anchor (DOM) */
    if (this.fired.has("riyadh") && dissolve < 0.55) {
      const hq = this.nodes.find((n) => n.hq);
      if (hq) {
        const sx = this.mapRect.x + hq.x * this.mapRect.w;
        const sy = this.mapRect.y + hq.y * this.mapRect.h;
        const p = this.toScreen(sx, sy, cam);
        this.cb.onLabel?.(p);
      }
    } else if (dissolve >= 0.55) {
      this.cb.onLabel?.(null);
    }
  }

  private camera(): { s: number; tx: number; ty: number } {
    const { tl } = this;
    const dir = this.rtl ? -1 : 1;
    // gentle push during network beat, reframe during release (E-6)
    const push = easeCinematic(clamp01((this.t - tl.mapEnd) / (tl.networkEnd - tl.mapEnd)));
    const release = easeCinematic(clamp01((this.t - tl.networkEnd) / (tl.end - tl.networkEnd)));
    const s = 1 + 0.06 * push - 0.06 * release * 1.0;
    const tx = dir * (10 * push - 10 * release);
    const ty = -6 * push + 6 * release;
    return { s, tx, ty };
  }

  private toScreen(x: number, y: number, cam: { s: number; tx: number; ty: number }) {
    return {
      x: (x - this.width / 2 + cam.tx) * cam.s + this.width / 2,
      y: (y - this.height / 2 + cam.ty) * cam.s + this.height / 2,
    };
  }

  private stepParticles(dt: number, k: number, damp: number, ambient: boolean): void {
    const drift = ambient ? 6 : 0;
    for (const p of this.particles) {
      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      const dist = Math.hypot(dx, dy);
      // curved travel: perpendicular swirl proportional to remaining distance
      // curvature is strongest mid-flight and vanishes on approach, so
      // arrivals are precise while travel stays organic
      const swirlAmp = ambient ? 0 : Math.min(1, dist / 420) * Math.min(1, dist / 90) * p.swirl * 0.7;
      const ax = dx * k + -dy * swirlAmp * 0.9 - p.vx * (k * damp);
      const ay = dy * k + dx * swirlAmp * 0.9 - p.vy * (k * damp);
      p.vx += ax * dt;
      p.vy += ay * dt;
      p.x += p.vx * dt + Math.sin(p.tw + this.ambientClock) * drift * dt;
      p.y += p.vy * dt + Math.cos(p.tw * 1.3 + this.ambientClock) * drift * dt;
      if (p.cool > 0 && p.cool < 1.6) p.cool += dt * 2.4;
    }
  }

  private particleColor(p: Particle, alpha: number): string {
    if (p.color === 2) return `rgba(141,52,146,${alpha})`;
    if (p.color === 1) {
      const c = Math.min(1, p.cool);
      // magenta → neutral cooling keeps the accent selective
      const r = Math.round(255 - (255 - 201) * c);
      const g = Math.round(24 + (201 - 24) * c);
      const b = Math.round(156 + (206 - 156) * c);
      return `rgba(${r},${g},${b},${alpha})`;
    }
    return `rgba(226,226,229,${alpha})`;
  }

  private drawParticles(globalAlpha: number, twinkleAmp: number, crisp = false): void {
    const ctx = this.ctx;
    const time = (this.t || this.ambientClock * 1000) / 1000;
    for (let layer = 0 as 0 | 1 | 2; layer <= 2; layer++) {
      const layerAlpha = [0.42, 0.66, 1][layer]!;
      for (const p of this.particles) {
        if (p.depth !== layer) continue;
        const tw = 0.75 + 0.25 * Math.sin(p.tw + time * 1.7) * twinkleAmp;
        const a = Math.min(1, layerAlpha * globalAlpha * tw);
        ctx.fillStyle = this.particleColor(p, a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (layer === 2 && p.size > 1.6 && !crisp) {
          // soft halo on near-layer particles — depth without shadowBlur cost
          ctx.fillStyle = this.particleColor(p, a * 0.16);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  /** Evidence nodes, links, Riyadh ring, Gulf trajectories (canvas; text stays DOM). */
  private drawGeoLayer(alpha: number): void {
    const ctx = this.ctx;
    const { x, y, w, h } = this.mapRect;
    const { tl } = this;
    const netP = clamp01((this.t - tl.mapEnd) / (tl.networkEnd - tl.mapEnd));

    // evidence connections draw progressively (peer links, stroke-drawn)
    if (netP > 0) {
      this.links.forEach(([a, b], i) => {
        const lp = clamp01(netP * 2.2 - i * 0.28);
        if (lp <= 0) return;
        const ax = x + a.x * w;
        const ay = y + a.y * h;
        const bx = x + b.x * w;
        const by = y + b.y * h;
        const mx = ax + (bx - ax) * easeCinematic(lp);
        const my = ay + (by - ay) * easeCinematic(lp);
        const grad = ctx.createLinearGradient(ax, ay, mx, my);
        grad.addColorStop(0, `rgba(255,24,156,${0.34 * alpha})`);
        grad.addColorStop(1, `rgba(255,24,156,${0.1 * alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(mx, my);
        ctx.stroke();
        if (lp >= 1 && i === 1) {
          // one travelling pulse (the accent is earned — one at a time)
          const t2 = (this.t % 1400) / 1400;
          const px = ax + (bx - ax) * t2;
          const py = ay + (by - ay) * t2;
          ctx.fillStyle = `rgba(255,24,156,${0.85 * alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    // evidence nodes ignite in priority order
    this.nodes.forEach((n, i) => {
      if (n.hq) return;
      const np = clamp01(netP * 2.6 - i * 0.18);
      if (np <= 0) return;
      const nx = x + n.x * w;
      const ny = y + n.y * h;
      const a = alpha * easeEngineered(np);
      ctx.fillStyle = `rgba(233,233,236,${0.9 * a})`;
      ctx.beginPath();
      ctx.arc(nx, ny, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(233,233,236,${0.14 * a})`;
      ctx.beginPath();
      ctx.arc(nx, ny, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // Riyadh HQ — precision ring + single ignition pulse (C-4; no spokes)
    const hq = this.nodes.find((n) => n.hq);
    if (hq && this.fired.has("riyadh")) {
      const hx = x + hq.x * w;
      const hy = y + hq.y * h;
      const ig = clamp01((this.t - tl.mapEnd) / 500);
      const a = alpha;
      ctx.strokeStyle = `rgba(255,24,156,${0.9 * a * easeEngineered(ig)})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(hx, hy, 10, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * easeCinematic(ig));
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,24,156,${0.28 * a})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 17, 0, Math.PI * 2);
      ctx.stroke();
      const pulse = 1 + 0.5 * Math.abs(Math.sin((this.t - tl.mapEnd) / 640));
      ctx.fillStyle = `rgba(255,24,156,${0.95 * a})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 3.4 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    // abstract Gulf/regional reach: two outward trajectories, no nodes (§5)
    if (netP > 0.55) {
      const a = alpha * (netP - 0.55) * 1.6;
      const startX = x + w * 0.93;
      const startY = y + h * 0.34;
      for (let i = 0; i < 2; i++) {
        const grad = ctx.createLinearGradient(startX, startY, this.width + 40, startY - 60 - i * 90);
        grad.addColorStop(0, `rgba(226,226,229,${0.22 * a})`);
        grad.addColorStop(1, "rgba(226,226,229,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY + i * 26);
        ctx.quadraticCurveTo(
          startX + this.width * 0.14,
          startY - 30 - i * 40,
          this.width + 40,
          startY - 70 - i * 100,
        );
        ctx.stroke();
      }
    }
  }

  /** Post-opening hero life: one slow signal route redrawn periodically. */
  private drawAmbientSignal(): void {
    const ctx = this.ctx;
    const period = 9;
    const local = this.ambientClock % period;
    if (local > 3.4) return;
    const p = easeCinematic(clamp01(local / 3));
    const seedIdx = Math.floor(this.ambientClock / period);
    const rnd = mulberry32(90 + seedIdx);
    const anchors: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < 4; i++) {
      anchors.push({
        x: this.width * (0.12 + rnd() * 0.76),
        y: this.height * (0.15 + rnd() * 0.7),
      });
    }
    anchors.sort((a, b) => (this.rtl ? b.x - a.x : a.x - b.x));
    const fade = local > 2.6 ? 1 - (local - 2.6) / 0.8 : 1;
    ctx.strokeStyle = `rgba(255,24,156,${0.34 * fade})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(anchors[0]!.x, anchors[0]!.y);
    const total = anchors.length - 1;
    const seg = Math.min(total, p * total);
    for (let i = 1; i <= Math.floor(seg); i++) ctx.lineTo(anchors[i]!.x, anchors[i]!.y);
    const fpart = seg - Math.floor(seg);
    if (Math.floor(seg) < total) {
      const a = anchors[Math.floor(seg)]!;
      const b = anchors[Math.floor(seg) + 1]!;
      ctx.lineTo(a.x + (b.x - a.x) * fpart, a.y + (b.y - a.y) * fpart);
    }
    ctx.stroke();
  }
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}
