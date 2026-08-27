/* Smart Channels 2026 — Network Field renderer (P2 design artifact).
   Draws the ownable node/line/signal system onto a <canvas>. Deterministic
   (seeded) so every board render is reproducible. Not application code —
   the production implementation is decided at P3/P4. */

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Render a network field.
 * opts: seed, density (nodes per 100k px^2), linkDist, accent ('#FF189C'),
 *       signal (draw one magenta route), depth (0..1 depth-of-field),
 *       atmos (purple atmospheric glow 0..1), vignette (0..1)
 */
function renderField(canvas, opts = {}) {
  const o = Object.assign({
    seed: 7, density: 1.1, linkDist: 150, accent: '#FF189C',
    signal: true, depth: 1, atmos: 0.5, vignette: 0.55,
    lineAlpha: 0.10, nodeAlpha: 0.75, bg: null
  }, opts);
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const rnd = mulberry32(o.seed);

  if (o.bg) { ctx.fillStyle = o.bg; ctx.fillRect(0, 0, w, h); }

  // atmospheric purple depth (never a surface fill — low-alpha glow only)
  if (o.atmos > 0) {
    const gx = w * (0.3 + rnd() * 0.4), gy = h * (0.25 + rnd() * 0.4);
    const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.65);
    g.addColorStop(0, `rgba(141,52,146,${0.10 * o.atmos})`);
    g.addColorStop(1, 'rgba(141,52,146,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }

  // nodes with depth (z decides size/alpha/blur-tier)
  const count = Math.round((w * h / 100000) * o.density * 10);
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const z = rnd(); // 0 far … 1 near
    nodes.push({ x: rnd() * w, y: rnd() * h, z, r: 0.8 + z * 2.4 });
  }

  // links between near neighbours (same depth band → reads as topology)
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      if (Math.abs(a.z - b.z) > 0.25) continue;
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d < o.linkDist) {
        const al = (1 - d / o.linkDist) * o.lineAlpha * (0.35 + a.z * 0.65);
        ctx.strokeStyle = `rgba(255,255,255,${al.toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }

  // nodes
  for (const n of nodes) {
    const al = o.nodeAlpha * (0.25 + n.z * 0.75);
    ctx.fillStyle = `rgba(201,201,206,${al.toFixed(3)})`;
    ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (o.depth ? 1 : 0.8), 0, Math.PI * 2); ctx.fill();
  }

  // one travelling magenta signal route (the accent is earned — one at a time)
  if (o.signal) {
    const zone = o.signalZone || [0, 1]; // fraction of width the route may occupy
    const near = nodes.filter(n => n.z > 0.55 && n.x >= w * zone[0] && n.x <= w * zone[1])
      .sort((a, b) => a.x - b.x);
    if (near.length > 5) {
      const step = Math.floor(near.length / 5);
      const route = [near[0], near[step], near[step * 2], near[step * 3], near[near.length - 1]];
      ctx.strokeStyle = 'rgba(255,24,156,0.55)';
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(route[0].x, route[0].y);
      for (const p of route.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.stroke();
      // signal head
      const headIdx = 2 + Math.floor(rnd() * 2);
      const hp = route[Math.min(headIdx, route.length - 1)];
      const hg = ctx.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 26);
      hg.addColorStop(0, 'rgba(255,24,156,0.85)');
      hg.addColorStop(0.25, 'rgba(255,24,156,0.30)');
      hg.addColorStop(1, 'rgba(255,24,156,0)');
      ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(hp.x, hp.y, 26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FF189C'; ctx.beginPath(); ctx.arc(hp.x, hp.y, 3, 0, Math.PI * 2); ctx.fill();
    }
  }

  // vignette keeps type legible over the field
  if (o.vignette > 0) {
    const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
    v.addColorStop(0, 'rgba(6,6,7,0)');
    v.addColorStop(1, `rgba(6,6,7,${o.vignette})`);
    ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
  }
  return nodes;
}

/* Scattered brand particles (opening frames): dots echoing the logo's own
   particle language — magenta + purple mix. */
function renderParticles(canvas, opts = {}) {
  const o = Object.assign({ seed: 11, count: 90, spread: 1, cx: 0.5, cy: 0.5, gather: 0 }, opts);
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
  const rnd = mulberry32(o.seed);
  for (let i = 0; i < o.count; i++) {
    let x = rnd() * w, y = rnd() * h;
    const tx = o.cx * w + (rnd() - 0.5) * w * 0.22;
    const ty = o.cy * h + (rnd() - 0.5) * h * 0.30;
    x = x + (tx - x) * o.gather; y = y + (ty - y) * o.gather;
    const r = 1 + rnd() * 3.4;
    const magenta = rnd() > 0.42;
    const al = 0.25 + rnd() * 0.65;
    ctx.fillStyle = magenta ? `rgba(255,24,156,${al})` : `rgba(141,52,146,${al})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
}
