/**
 * SCROLL ENGINE (D-079) — the site's one scroll-linked motion driver.
 *
 * Every value it produces is a pure function of the scroll position:
 * scrolling down advances a reveal or a scene transition, scrolling back
 * up returns it exactly. Nothing "happens once and ends".
 *
 * ONE loop: a passive `scroll` listener schedules a single
 * requestAnimationFrame; the frame reads `scrollY` and writes CSS custom
 * properties and state attributes only — no React state per frame, no
 * layout reads per frame. Document positions are measured once per layout
 * change (resize, body ResizeObserver, registration, opening release) and
 * cached, so the per-frame work is arithmetic.
 *
 * WHAT IT DRIVES
 * - reveal items (MotionSection, SectionSeam): `--t` ∈ [0,1], eased
 *   in-out cubic over the section's entry with a delay; `data-rs`
 *   ("0" | "p" | "1") lets CSS drop every transform once t = 1 so the
 *   computed transform is literally `none`; `.is-visible` is kept as a
 *   class with hysteresis (added above 0.6, removed below 0.3) so the
 *   one-shot rules keyed on it reverse without flicker at the edge.
 * - scene stacks (homepage, FULL tier, ≥ 768 px): a sticky scene and the
 *   section that rises over it. `--enter` on the riser, `--cover` on the
 *   stuck scene, `data-cover-active` while cover > 0 (so the transform is
 *   `none` at rest — the hero's fixed opening stage is never re-parented)
 *   and `data-covered` while cover ≥ 0.5 (header environment, nav probe,
 *   autoplay and the hero field treat such a scene as not visible).
 * - the side scene index (homepage, desktop): `data-on` on the active dot.
 * - focus: keyboard focus that lands inside a scene the riser currently
 *   covers scrolls back to where that scene is uncovered (cover = 0), so a
 *   focused control is never hidden behind the next chapter (WCAG 2.4.11).
 *
 * GATES: the STATIC tier never registers anything (callers check), and
 * nothing is written while the homepage opening owns the viewport
 * (html[data-opening] pending | running | revealing).
 */

type RevealItem = {
  el: HTMLElement;
  kind: "reveal" | "seam";
  top: number;
  t: number;
  rs: string;
  vis: boolean;
};
type StackItem = {
  root: HTMLElement;
  stick: HTMLElement;
  cover: HTMLElement;
  coverTop: number;
  stickH: number;
  on: boolean;
  c: number;
  e: number;
  active: boolean;
  covered: boolean;
  full: boolean;
};
type IndexItem = { dots: HTMLElement[]; scenes: HTMLElement[]; tops: number[]; active: number };

const reveals = new Set<RevealItem>();
const stacks = new Set<StackItem>();
const indexes = new Set<IndexItem>();

let listening = false;
let dirty = true;
let queued = false;
let flushQueued = false;
let vh = 0;
let maxScroll = 0;
let ro: ResizeObserver | null = null;
let mo: MutationObserver | null = null;

/* reveal window, as fractions of the viewport height: t starts when the
   section's top is 92 % down the viewport and completes at 45 % */
const REVEAL_FROM = 0.92;
const REVEAL_TO = 0.45;
const VIS_ON = 0.6;
const VIS_OFF = 0.3;
export const COVERED_AT = 0.5;
export const COVER_EVENT = "sc:covered";

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const r4 = (v: number) => Math.round(v * 10000) / 10000;

function released() {
  const s = document.documentElement.getAttribute("data-opening");
  return s === null || s === "done" || s === "skipped";
}

function stackAllowed() {
  return (
    document.documentElement.getAttribute("data-motion-tier") === "full" &&
    window.matchMedia("(min-width: 768px)").matches
  );
}

/** layout position in the document — offsetTop ignores transforms */
function docTop(el: HTMLElement) {
  let y = 0;
  let n: HTMLElement | null = el;
  while (n) {
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return y;
}

/**
 * The STATIC document top of an element: sticky scenes are measured as
 * if they were not stuck (html.sc-measure turns their stickiness off for
 * the duration of the read — the flow is unchanged, so nothing moves).
 */
export function staticTopOf(el: HTMLElement) {
  const html = document.documentElement;
  html.classList.add("sc-measure");
  const y = docTop(el);
  html.classList.remove("sc-measure");
  return y;
}

function measure() {
  const html = document.documentElement;
  html.classList.add("sc-measure");
  for (const r of reveals) r.top = docTop(r.el);
  for (const s of stacks) {
    s.coverTop = docTop(s.cover);
    s.stickH = s.stick.offsetHeight;
  }
  for (const i of indexes) i.tops = i.scenes.map(docTop);
  html.classList.remove("sc-measure");
  vh = window.innerHeight;
  maxScroll = Math.max(0, html.scrollHeight - vh);
  const allowed = stackAllowed();
  for (const s of stacks) {
    s.on = allowed;
    s.root.toggleAttribute("data-stack-on", allowed);
    /* a scene taller than the viewport sticks when its BOTTOM edge reaches
       the bottom of the screen — it is read in full before it is covered */
    s.stick.style.setProperty("--stick-top", `${Math.min(0, vh - s.stickH)}px`);
  }
  dirty = false;
}

/** eased entry progress of a reveal item at scroll position y */
export function revealProgress(top: number, y: number, viewport: number, max: number) {
  let s0 = top - REVEAL_FROM * viewport;
  let s1 = top - REVEAL_TO * viewport;
  /* a section near the end of the document may never reach the 45 % line:
     finish its reveal at the last reachable scroll position instead */
  if (s1 > max) {
    s1 = max;
    s0 = Math.min(s0, s1 - 0.25 * viewport);
  }
  if (s1 <= s0) return y >= s1 ? 1 : 0;
  const raw = clamp01((y - s0) / (s1 - s0));
  return raw >= 1 ? 1 : raw <= 0 ? 0 : r4(easeInOutCubic(raw));
}

function writeReveal(r: RevealItem, y: number) {
  const t = revealProgress(r.top, y, vh, maxScroll);
  const el = r.el;
  if (t !== r.t) {
    el.style.setProperty("--t", String(t));
    r.t = t;
  }
  const rs = t <= 0 ? "0" : t >= 1 ? "1" : "p";
  if (rs !== r.rs) {
    el.setAttribute("data-rs", rs);
    r.rs = rs;
  }
  if (r.kind === "reveal" && !el.classList.contains("reveal")) el.classList.add("reveal");
  if (!r.vis && t > VIS_ON) {
    el.classList.add("is-visible");
    r.vis = true;
  } else if (r.vis && t < VIS_OFF) {
    el.classList.remove("is-visible");
    r.vis = false;
  }
}

function clearStack(s: StackItem) {
  s.stick.style.removeProperty("--cover");
  s.cover.style.removeProperty("--enter");
  s.stick.removeAttribute("data-cover-active");
  s.stick.removeAttribute("data-cover-full");
  s.full = false;
  if (s.covered) window.dispatchEvent(new Event(COVER_EVENT));
  s.stick.removeAttribute("data-covered");
  s.c = -1;
  s.e = -1;
  s.active = false;
  s.covered = false;
}

function writeStack(s: StackItem, y: number) {
  if (!s.on) {
    if (s.c !== -1 || s.active || s.covered) clearStack(s);
    return;
  }
  const rel = s.coverTop - y; // the riser's top edge, in viewport pixels
  const enter = r4(clamp01(1 - rel / vh));
  const cover = enter >= 1 ? 1 : enter <= 0 ? 0 : r4(easeInOutCubic(enter));
  if (enter !== s.e) {
    s.cover.style.setProperty("--enter", String(enter));
    s.e = enter;
  }
  if (cover !== s.c) {
    s.stick.style.setProperty("--cover", String(cover));
    s.c = cover;
  }
  const active = cover > 0;
  if (active !== s.active) {
    s.stick.toggleAttribute("data-cover-active", active);
    s.active = active;
  }
  /* fully covered (the riser's top has reached the viewport top): the
     scene is entirely hidden — `data-cover-full` stops it painting */
  const full = cover >= 1;
  if (full !== s.full) {
    s.stick.toggleAttribute("data-cover-full", full);
    s.full = full;
  }
  const covered = cover >= COVERED_AT;
  if (covered !== s.covered) {
    s.stick.toggleAttribute("data-covered", covered);
    s.covered = covered;
    window.dispatchEvent(new Event(COVER_EVENT));
  }
}

function writeIndex(i: IndexItem, y: number) {
  const probe = y + vh * 0.5;
  let active = 0;
  i.tops.forEach((top, k) => {
    if (top <= probe) active = k;
  });
  if (active !== i.active) {
    i.dots.forEach((d, k) => d.toggleAttribute("data-on", k === active));
    i.active = active;
  }
}

function frame() {
  queued = false;
  if (!released()) return;
  if (dirty) measure();
  const y = Math.min(Math.max(window.scrollY, 0), maxScroll);
  for (const r of reveals) writeReveal(r, y);
  for (const s of stacks) writeStack(s, y);
  for (const i of indexes) writeIndex(i, y);
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(frame);
}
function invalidate() {
  dirty = true;
  schedule();
}
/** registration flushes in a microtask: many sections mounting in one
   commit cost one measurement, and the first values land before paint */
function flushSoon() {
  dirty = true;
  if (flushQueued) return;
  flushQueued = true;
  queueMicrotask(() => {
    flushQueued = false;
    frame();
  });
}

/* focus inside a covered scene → bring the scene back (cover 0) */
function onFocusIn(e: FocusEvent) {
  const target = e.target;
  if (!(target instanceof Node)) return;
  for (const s of stacks) {
    if (!s.on || !s.stick.contains(target)) continue;
    // after the browser's own focus scroll, which may itself have pushed the riser in
    requestAnimationFrame(() => {
      const y = s.coverTop - vh; // the riser's top on the viewport bottom
      if (window.scrollY > y) window.scrollTo({ top: y, behavior: "instant" });
    });
  }
}

function listen() {
  if (listening) return;
  listening = true;
  document.addEventListener("focusin", onFocusIn);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", invalidate, { passive: true });
  ro = new ResizeObserver(invalidate);
  ro.observe(document.body);
  /* the opening releases the viewport → first real frame */
  mo = new MutationObserver(invalidate);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-opening"] });
}
function unlistenIfIdle() {
  if (reveals.size || stacks.size || indexes.size || !listening) return;
  listening = false;
  document.removeEventListener("focusin", onFocusIn);
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", invalidate);
  ro?.disconnect();
  mo?.disconnect();
  ro = null;
  mo = null;
}

export function registerReveal(el: HTMLElement, kind: "reveal" | "seam" = "reveal") {
  const item: RevealItem = { el, kind, top: 0, t: -1, rs: "", vis: false };
  reveals.add(item);
  listen();
  flushSoon();
  return () => {
    reveals.delete(item);
    el.style.removeProperty("--t");
    el.removeAttribute("data-rs");
    el.classList.remove("is-visible");
    if (kind === "reveal") el.classList.remove("reveal");
    unlistenIfIdle();
  };
}

export function registerStack(root: HTMLElement, stick: HTMLElement, cover: HTMLElement) {
  const item: StackItem = {
    root,
    stick,
    cover,
    coverTop: 0,
    stickH: 0,
    on: false,
    c: -1,
    e: -1,
    active: false,
    covered: false,
    full: false,
  };
  stacks.add(item);
  listen();
  flushSoon();
  return () => {
    stacks.delete(item);
    clearStack(item);
    root.removeAttribute("data-stack-on");
    stick.style.removeProperty("--stick-top");
    unlistenIfIdle();
  };
}

export function registerIndex(dots: HTMLElement[], scenes: HTMLElement[]) {
  const item: IndexItem = { dots, scenes, tops: [], active: -1 };
  indexes.add(item);
  listen();
  flushSoon();
  return () => {
    indexes.delete(item);
    dots.forEach((d) => d.removeAttribute("data-on"));
    unlistenIfIdle();
  };
}

/** true while the element (or a stuck scene containing it) is covered */
export function isCovered(el: Element) {
  return el.closest("[data-covered]") !== null;
}
