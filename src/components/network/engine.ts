/**
 * National network engine (P4 Revision 2 §§3–9).
 *
 * The homepage Saudi/Gulf cinematic scene: the Kingdom emerges from
 * darkness as a point cloud, Riyadh activates as the brand's origin, the
 * Smart Channels signal travels outward city by city, the constellation
 * matures, and the composition breathes toward the Gulf horizon.
 *
 * SEMANTICS (owner ruling §5): this scene tells the BRAND/REACH story —
 * Riyadh may initiate the outward signal here. It is architecturally
 * separate from project-evidence semantics: destination nodes are
 * source-backed locations, carry no project labels, and nothing claims
 * operational routing through HQ.
 *
 * Deterministic (seeded), Canvas 2D, pausable, and finite: after the
 * story completes the loop STOPS — the final frame stays, nothing keeps
 * rendering (§19). Text is never drawn on canvas; the Riyadh label is DOM
 * positioned via callback.
 */
import { MAP_POINTS, MAP_ASPECT } from "@/generated/opening-data";
import { project } from "@/lib/map/geo";
import type { MapLocation } from "@/content/locations";

export type NetTier = "full" | "lite";

export interface NetRegion {
  id: string;
  /** normalized map coords of the regional destination */
  nx: number;
  ny: number;
  /** normalized departure anchor on the Saudi outline */
  ax: number;
  ay: number;
}

export interface NetCallbacks {
  /** Screen-space anchor for the Riyadh DOM label (or null to hide). */
  onLabel?: (pos: { x: number; y: number } | null) => void;
  /** Regional-reach label anchors (P4 Rev3 §10), keyed by region id. */
  onRegion?: (id: string, pos: { x: number; y: number } | null) => void;
  /** The regional-reach legend becomes visible. */
  onRegional?: () => void;
  /** Track-Record counter progress 0..1, eased upstream of the caller. */
  onCount?: (p: number) => void;
  /** The story finished; the loop has stopped on the final frame. */
  onDone?: () => void;
}

const easeCinematic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3.2);
const easeEngineered = (t: number) => {
  const x = clamp01(t);
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

interface NetParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  depth: 0 | 1 | 2;
  size: number;
  tw: number;
  born: number; // ms at which this particle joins the emergence
  purple: boolean;
}

interface NetNode {
  id: string;
  x: number; // canvas px (set in layout)
  y: number;
  nx: number; // normalized map coords
  ny: number;
  hq: boolean;
}

/* Timeline (ms). FULL ≈ 7s of story; LITE compresses to ≈ 5.9s. */
const NET_FULL = {
  emergeEnd: 1600,
  riyadh: 1600,
  routesStart: 2300,
  routeStagger: 380,
  routeTravel: 760,
  countStart: 2500,
  countEnd: 6300,
  gulf: 5300,
  end: 7000,
};
const NET_LITE = {
  emergeEnd: 1350,
  riyadh: 1350,
  routesStart: 1950,
  routeStagger: 430, // strictly sequential feel on small screens (§17)
  routeTravel: 640,
  countStart: 2150,
  countEnd: 5300,
  gulf: 4450,
  end: 5900,
};

export class NetworkEngine {
  private ctx: CanvasRenderingContext2D;
  private particles: NetParticle[] = [];
  private nodes: NetNode[] = [];
  private hq: NetNode | null = null;
  private raf = 0;
  private t = 0; // accumulated story time (pause-safe)
  private lastNow = 0;
  private running = false;
  private done = false;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private tl: typeof NET_FULL;
  private tier: NetTier;
  private cb: NetCallbacks;
  private mapRect = { x: 0, y: 0, w: 0, h: 0 };
  private regions: NetRegion[] = [];
  private regionalFired = false;
  private rnd = mulberry32(72026);

  constructor(
    private canvas: HTMLCanvasElement,
    locations: MapLocation[],
    opts: { tier: NetTier; regions?: NetRegion[]; callbacks?: NetCallbacks },
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2d context unavailable");
    this.ctx = ctx;
    this.tier = opts.tier;
    this.tl = opts.tier === "lite" ? NET_LITE : NET_FULL;
    this.cb = opts.callbacks ?? {};
    // Every node is a source-backed location record (validated); priority
    // orders the outward journey. Riyadh is the origin (§5).
    const sorted = [...locations].sort((a, b) => a.priority - b.priority);
    this.nodes = sorted.map((l) => {
      const p = project(l.latitude, l.longitude);
      return { id: l.id, x: 0, y: 0, nx: p.x, ny: p.y, hq: l.kind === "hq" };
    });
    this.hq = this.nodes.find((n) => n.hq) ?? null;
    this.regions = opts.regions ?? [];
    this.resize();
    this.buildParticles();
  }

  /* ---------------- lifecycle ---------------- */

  /** Begin (or resume) the story. Safe to call repeatedly. */
  start(): void {
    if (this.done || this.running) return;
    this.running = true;
    this.lastNow = performance.now();
    const loop = (now: number) => {
      if (!this.running) return;
      const dt = Math.min(48, now - this.lastNow);
      this.lastNow = now;
      this.t += dt;
      this.step(dt / 1000);
      if (this.t >= this.tl.end) {
        this.finish();
        return;
      }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  /** Pause (offscreen / hidden tab): stops ALL rendering work (§19). */
  pause(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy(): void {
    this.pause();
    this.done = true;
  }

  isDone(): boolean {
    return this.done;
  }

  resize(): void {
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    const availW = this.width * (this.width < 768 ? 0.92 : 0.7);
    const availH = this.height * 0.86;
    let w = availW;
    let h = w / MAP_ASPECT;
    if (h > availH) {
      h = availH;
      w = h * MAP_ASPECT;
    }
    this.mapRect = { x: (this.width - w) / 2, y: (this.height - h) / 2, w, h };
    for (const n of this.nodes) {
      n.x = this.mapRect.x + n.nx * this.mapRect.w;
      n.y = this.mapRect.y + n.ny * this.mapRect.h;
    }
    this.particles.forEach((p, i) => this.assignTarget(p, i));
    if (this.done) this.drawFrame(true); // keep the settled final frame crisp
  }

  private finish(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.done = true;
    this.t = this.tl.end;
    this.drawFrame(true); // settled final composition stays on the canvas
    this.cb.onCount?.(1);
    this.cb.onDone?.();
  }

  /* ---------------- setup ---------------- */

  private particleSeeds: Array<{ idx: number; scatter: [number, number] }> = [];

  private buildParticles(): void {
    const budget = this.tier === "lite" ? 0.45 : 0.9;
    const picked: number[] = [];
    for (let i = 0; i < MAP_POINTS.length; i++) {
      const depth = MAP_POINTS[i]![3];
      // the boundary stays a restrained luminous fragment line, not a rope:
      // only ~55% of contour points join, and they render smaller below
      const keep = depth === 2 ? budget * 0.55 : budget;
      if (this.rnd() < keep) picked.push(i);
    }
    this.particles = picked.map((idx) => {
      const s = MAP_POINTS[idx]!;
      const depth = s[3];
      return {
        x: 0,
        y: 0,
        vx: (this.rnd() - 0.5) * 12,
        vy: (this.rnd() - 0.5) * 12,
        tx: 0,
        ty: 0,
        depth,
        size: [0.95, 1.25, 1.45][depth]! * (0.85 + this.rnd() * 0.4),
        tw: this.rnd() * Math.PI * 2,
        born: this.rnd() * (this.tl.emergeEnd * 0.55),
        purple: depth === 0 && this.rnd() < 0.16,
      };
    });
    this.particleSeeds = picked.map((idx) => ({
      idx,
      scatter: [(this.rnd() - 0.5) * 260, (this.rnd() - 0.5) * 200],
    }));
    this.particles.forEach((p, i) => {
      this.assignTarget(p, i);
      p.x = p.tx + this.particleSeeds[i]!.scatter[0];
      p.y = p.ty + this.particleSeeds[i]!.scatter[1];
    });
    this.buildDust();
  }

  /** Atmospheric depth dust (§11): a sparse far field behind the map. */
  private dust: Array<{ x: number; y: number; s: number; ph: number }> = [];

  private buildDust(): void {
    const n = this.tier === "lite" ? 16 : 30;
    const rnd = mulberry32(31026);
    this.dust = Array.from({ length: n }, () => ({
      x: rnd(),
      y: rnd(),
      s: 0.6 + rnd() * 0.9,
      ph: rnd() * Math.PI * 2,
    }));
  }

  private assignTarget(p: NetParticle, i: number): void {
    const seed = this.particleSeeds[i];
    if (!seed) return;
    const s = MAP_POINTS[seed.idx]!;
    p.tx = this.mapRect.x + s[0] * this.mapRect.w;
    p.ty = this.mapRect.y + s[1] * this.mapRect.h;
  }

  /* ---------------- frame ---------------- */

  private step(dt: number): void {
    // physics: organic emergence, then near-critical settle
    const k = this.t < this.tl.emergeEnd ? 6.5 : 9;
    const damp = 2 / Math.sqrt(k);
    for (const p of this.particles) {
      if (this.t < p.born) continue;
      const ax = (p.tx - p.x) * k - p.vx * (k * damp);
      const ay = (p.ty - p.y) * k - p.vy * (k * damp);
      p.vx += ax * dt;
      p.vy += ay * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    void dt;
    this.drawFrame(false);
  }

  /** Renders the scene at current story time; final=true draws the settled
   *  end state (used for the frozen frame + resize redraws). */
  private drawFrame(final: boolean): void {
    const ctx = this.ctx;
    const { tl } = this;
    const t = this.t;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    // restrained camera: slow push across the routes beat (§6)
    const push = easeCinematic(clamp01((t - tl.routesStart) / (tl.end - tl.routesStart)));
    const s = 1 + 0.04 * push;
    ctx.translate(this.width / 2, this.height / 2);
    ctx.scale(s, s);
    ctx.translate(-this.width / 2, -this.height / 2 - 4 * push);

    const emerge = easeEngineered(clamp01(t / tl.emergeEnd));

    /* supporting depth (§11): sparse atmospheric dust drifting behind the
       map + one soft scan sweep during emergence. MAP = PRIMARY. */
    for (const d of this.dust) {
      const dx = (d.x + Math.sin(d.ph + t / 9000) * 0.012) * this.width;
      const dy = (d.y + Math.cos(d.ph * 1.3 + t / 11000) * 0.01) * this.height;
      const a = 0.1 * emerge * (0.6 + 0.4 * Math.sin(d.ph + t / 1600));
      ctx.fillStyle = `rgba(180,180,190,${Math.max(0, a)})`;
      ctx.beginPath();
      ctx.arc(dx, dy, d.s, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!final && t < tl.emergeEnd + 500) {
      const sp = clamp01(t / (tl.emergeEnd + 500));
      const sx = this.width * (-0.2 + 1.4 * easeCinematic(sp));
      const grad = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0);
      grad.addColorStop(0, "rgba(226,226,229,0)");
      grad.addColorStop(0.5, "rgba(226,226,229,0.035)");
      grad.addColorStop(1, "rgba(226,226,229,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(sx - 120, 0, 240, this.height);
    }

    /* the Kingdom: layered point cloud, contour on the near layer */
    const time = t / 1000;
    for (let layer = 0 as 0 | 1 | 2; layer <= 2; layer++) {
      const layerAlpha = [0.4, 0.62, 0.88][layer]!;
      for (const p of this.particles) {
        if (p.depth !== layer) continue;
        const bornP = final ? 1 : easeEngineered(clamp01((t - p.born) / 700));
        if (bornP <= 0) continue;
        const tw = final ? 0.9 : 0.78 + 0.22 * Math.sin(p.tw + time * 1.6);
        const a = Math.min(1, layerAlpha * emerge * bornP * tw);
        ctx.fillStyle = p.purple ? `rgba(141,52,146,${a})` : `rgba(226,226,229,${a})`;
        ctx.beginPath();
        ctx.arc(final ? p.tx : p.x, final ? p.ty : p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* routed national signal (§6): Riyadh → destination, one by one */
    const hq = this.hq;
    if (hq) {
      const dests = this.nodes.filter((n) => !n.hq);
      dests.forEach((n, i) => {
        const t0 = tl.routesStart + i * tl.routeStagger;
        const travel = clamp01((t - t0) / tl.routeTravel);
        if (travel <= 0) return;
        const tp = easeCinematic(travel);
        // curved, physically coherent path — perpendicular bow scaled by
        // route length, alternating sides so the constellation breathes
        const mx = (hq.x + n.x) / 2;
        const my = (hq.y + n.y) / 2;
        const dx = n.x - hq.x;
        const dy = n.y - hq.y;
        const len = Math.hypot(dx, dy) || 1;
        const side = i % 2 === 0 ? 1 : -1;
        const bow = Math.min(34, len * 0.16) * side;
        const cx = mx + (-dy / len) * bow;
        const cy = my + (dx / len) * bow;
        const settled = travel >= 1;
        // the drawn portion of the quadratic curve
        ctx.strokeStyle = settled
          ? "rgba(255,24,156,0.22)"
          : `rgba(255,24,156,${0.5 - 0.24 * tp})`;
        ctx.lineWidth = settled ? 1 : 1.25;
        ctx.beginPath();
        ctx.moveTo(hq.x, hq.y);
        // subdivide for partial draw
        const STEPS = 24;
        const upto = Math.max(1, Math.round(STEPS * tp));
        for (let q = 1; q <= upto; q++) {
          const u = (q / STEPS) * tp;
          const ix = (1 - u) * (1 - u) * hq.x + 2 * (1 - u) * u * cx + u * u * n.x;
          const iy = (1 - u) * (1 - u) * hq.y + 2 * (1 - u) * u * cy + u * u * n.y;
          ctx.lineTo(ix, iy);
        }
        ctx.stroke();
        if (!settled) {
          // travelling signal head
          const u = tp;
          const hx = (1 - u) * (1 - u) * hq.x + 2 * (1 - u) * u * cx + u * u * n.x;
          const hy = (1 - u) * (1 - u) * hq.y + 2 * (1 - u) * u * cy + u * u * n.y;
          ctx.fillStyle = "rgba(255,24,156,0.95)";
          ctx.beginPath();
          ctx.arc(hx, hy, 2.3, 0, Math.PI * 2);
          ctx.fill();
          if (this.tier === "full") {
            ctx.fillStyle = "rgba(255,24,156,0.18)";
            ctx.beginPath();
            ctx.arc(hx, hy, 6.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        // destination activates on arrival (bloom → settled node)
        const nodeP = clamp01((t - (t0 + tl.routeTravel)) / 340);
        if (nodeP > 0) {
          const na = easeEngineered(nodeP);
          ctx.fillStyle = `rgba(233,233,236,${0.92 * na})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(233,233,236,${0.15 * na * (final ? 1 : 1 + 0.4 * (1 - nodeP))})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8 + 5 * (1 - nodeP), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      /* Riyadh — cinematic origin (§5): ring sweep + bloom, no spokes drawn
         before the routed departures begin */
      const ig = clamp01((t - tl.riyadh) / 700);
      if (ig > 0) {
        const sweep = easeCinematic(ig);
        ctx.strokeStyle = `rgba(255,24,156,${0.9 * easeEngineered(ig)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(hq.x, hq.y, 11, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * sweep);
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,24,156,0.26)";
        ctx.beginPath();
        ctx.arc(hq.x, hq.y, 18, 0, Math.PI * 2);
        ctx.stroke();
        const pulse = final ? 1 : 1 + 0.45 * Math.abs(Math.sin((t - tl.riyadh) / 620));
        ctx.fillStyle = "rgba(255,24,156,0.95)";
        ctx.beginPath();
        ctx.arc(hq.x, hq.y, 3.4 * pulse, 0, Math.PI * 2);
        ctx.fill();
        if (this.tier === "full") {
          ctx.fillStyle = "rgba(255,24,156,0.1)";
          ctx.beginPath();
          ctx.arc(hq.x, hq.y, 30, 0, Math.PI * 2);
          ctx.fill();
        }
        this.cb.onLabel?.(this.toScreen(hq.x, hq.y, s, push));
      } else {
        this.cb.onLabel?.(null);
      }
    }

    /* Gulf regional reach (Rev3 §10): after the national network, three
       restrained routes leave the Kingdom toward real regional geography
       (Bahrain / Qatar / UAE). Reach markers are HOLLOW rings — visually
       distinct from filled project-evidence nodes — and their labels are
       DOM text under a "Regional reach" legend. Nothing claims projects. */
    this.regions.forEach((r, i) => {
      const t0 = tl.gulf + i * 350;
      const travel = clamp01((t - t0) / 700);
      if (travel <= 0) {
        this.cb.onRegion?.(r.id, null);
        return;
      }
      if (!this.regionalFired) {
        this.regionalFired = true;
        this.cb.onRegional?.();
      }
      const tp = easeCinematic(travel);
      const ax = this.mapRect.x + r.ax * this.mapRect.w;
      const ay = this.mapRect.y + r.ay * this.mapRect.h;
      const nx = this.mapRect.x + r.nx * this.mapRect.w;
      const ny = this.mapRect.y + r.ny * this.mapRect.h;
      const dx = nx - ax;
      const dy = ny - ay;
      const len = Math.hypot(dx, dy) || 1;
      const bow = Math.min(22, len * 0.2) * (i % 2 === 0 ? 1 : -1);
      const cx = (ax + nx) / 2 + (-dy / len) * bow;
      const cy = (ay + ny) / 2 + (dx / len) * bow;
      const settled = travel >= 1;
      ctx.strokeStyle = settled ? "rgba(255,24,156,0.18)" : `rgba(255,24,156,${0.4 - 0.2 * tp})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]); // reach, not evidence: dashed voice
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      const STEPS = 18;
      const upto = Math.max(1, Math.round(STEPS * tp));
      for (let q = 1; q <= upto; q++) {
        const u = (q / STEPS) * tp;
        const ix = (1 - u) * (1 - u) * ax + 2 * (1 - u) * u * cx + u * u * nx;
        const iy = (1 - u) * (1 - u) * ay + 2 * (1 - u) * u * cy + u * u * ny;
        ctx.lineTo(ix, iy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      const ringP = clamp01((t - (t0 + 700)) / 320);
      if (ringP > 0) {
        const a = easeEngineered(ringP);
        ctx.strokeStyle = `rgba(226,226,229,${0.65 * a})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(nx, ny, 4.4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,24,156,${0.3 * a})`;
        ctx.beginPath();
        ctx.arc(nx, ny, 8.5, 0, Math.PI * 2);
        ctx.stroke();
        this.cb.onRegion?.(r.id, this.toScreen(nx, ny, s, push));
      } else {
        this.cb.onRegion?.(r.id, null);
      }
    });

    /* counters (§9): coordinated with the network choreography */
    if (this.cb.onCount && !this.done) {
      const cp = easeCinematic(clamp01((t - tl.countStart) / (tl.countEnd - tl.countStart)));
      if (cp > 0) this.cb.onCount(cp);
    }
  }

  private toScreen(x: number, y: number, s: number, push: number) {
    return {
      x: (x - this.width / 2) * s + this.width / 2,
      y: (y - this.height / 2 - 4 * push) * s + this.height / 2,
    };
  }
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}
