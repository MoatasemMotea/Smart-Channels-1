"use client";

import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LangText } from "@/components/ui/LangText";
import type { MapCityListItem, MapCityView } from "@/lib/content";
import { MAP_ASPECT } from "@/generated/opening-data";
import { mapAspect } from "@/lib/map/geo";
import { canvasPoint, staticPoint } from "./layout";

/**
 * CITY BUTTONS + PROJECT CARDS on the network map (D-081) — a popover,
 * not a tooltip.
 *
 * Each city (or group of cities closer than a touch target) is a real
 * <button> named "Makkah — 1 project", with a ≥ 44 × 44 px hit area over
 * its small drawn dot, a visible focus ring, and `aria-expanded` /
 * `aria-controls` tying it to its card. The card follows the button in
 * the DOM, so Tab walks from the city into its "View project" link.
 *
 * WCAG 1.4.13: a card opened by hover stays while the pointer moves onto
 * it, never disappears on a timer, and Esc closes it and returns focus to
 * its city. A click (or Enter) pins it; a tap outside closes it; on touch
 * the first tap shows it. The card is placed above its city (below when
 * there is no room) and clamped inside the viewport at the edges.
 *
 * Below 768 px the buttons give way to the visible text list rendered by
 * NetworkScene (owner decision (ج)); above it that list is the visually
 * hidden text alternative.
 */
const HIT = 44; // minimum target, px
const GAP = 10; // card ↔ city
const EDGE = 8; // card ↔ viewport edge

type Placement = { left: number; top: number; below: boolean };

export function MapCities({ buttons, tier }: { buttons: MapCityView[]; tier: string }) {
  const t = useTranslations("network");
  const layerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const [place, setPlace] = useState<Placement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastPointer = useRef<string>("mouse");
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // the layer covers the stage exactly; positions follow its size
  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      if (e) setSize({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pointOf = useCallback(
    (nx: number, ny: number) => {
      if (!size) return { x: 0, y: 0 };
      return tier === "static"
        ? staticPoint(nx, ny, size.w, size.h, mapAspect())
        : canvasPoint(nx, ny, size.w, size.h, MAP_ASPECT);
    },
    [size, tier],
  );

  const boxes = buttons.map((b) => {
    const pts = b.points.map((p) => pointOf(p.nx, p.ny));
    const minX = Math.min(...pts.map((p) => p.x));
    const maxX = Math.max(...pts.map((p) => p.x));
    const minY = Math.min(...pts.map((p) => p.y));
    const maxY = Math.max(...pts.map((p) => p.y));
    const w = Math.max(HIT, maxX - minX + 20);
    const h = Math.max(HIT, maxY - minY + 20);
    const left = (minX + maxX) / 2 - w / 2;
    const top = (minY + maxY) / 2 - h / 2;
    return { id: b.id, left, top, w, h, dots: pts.map((p) => ({ x: p.x - left, y: p.y - top })) };
  });

  const close = useCallback((refocus: boolean) => {
    setOpen((cur) => {
      if (refocus && cur) btnRefs.current[cur]?.focus();
      return null;
    });
    setPinned(false);
    setPlace(null);
  }, []);
  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    if (pinned) return;
    cancelClose();
    // a short grace to cross the gap between the city and its card — the
    // card itself never times out while the pointer is on either
    closeTimer.current = window.setTimeout(() => close(false), 220);
  };

  // place the open card: above its city, below if no room; clamped to the viewport
  useLayoutEffect(() => {
    if (!open || !layerRef.current) return;
    const card = cardRefs.current[open];
    const box = boxes.find((b) => b.id === open);
    if (!card || !box) return;
    const layer = layerRef.current.getBoundingClientRect();
    const cw = card.offsetWidth;
    const ch = card.offsetHeight;
    const cx = box.left + box.w / 2;
    let top = box.top - GAP - ch;
    let below = false;
    if (layer.top + top < EDGE) {
      top = box.top + box.h + GAP;
      below = true;
    }
    let left = cx - cw / 2;
    const minLeft = EDGE - layer.left;
    const maxLeft = window.innerWidth - EDGE - cw - layer.left;
    left = Math.min(Math.max(left, minLeft), maxLeft);
    setPlace({ left, top, below });
    // `boxes` derives from size/tier, which are deps below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, size, tier]);

  // Esc closes and returns focus; a press outside closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (btnRefs.current[open]?.contains(target) || cardRefs.current[open]?.contains(target)) return;
      close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <div ref={layerRef} className="map-cities" data-tier={tier} role="group" aria-label={t("citiesLabel")}>
      {size
        ? buttons.map((b, i) => {
            const box = boxes[i]!;
            const isOpen = open === b.id;
            const name = `${b.label} — ${t("cityProjects", { count: b.projectCount })}`;
            const more = b.projectCount - 1;
            const cardStyle: CSSProperties | undefined =
              isOpen && place ? { left: place.left, top: place.top } : { left: box.left, top: box.top, visibility: "hidden" };
            return (
              <Fragment key={b.id}>
                <button
                  ref={(el) => {
                    btnRefs.current[b.id] = el;
                  }}
                  type="button"
                  className="map-city"
                  data-city={b.id}
                  aria-label={name}
                  aria-expanded={isOpen}
                  aria-controls={`map-card-${b.id}`}
                  style={{ left: box.left, top: box.top, width: box.w, height: box.h }}
                  onPointerDown={(e) => {
                    lastPointer.current = e.pointerType;
                  }}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    cancelClose();
                    if (open !== b.id) {
                      setPinned(false);
                      setPlace(null);
                      setOpen(b.id);
                    }
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") scheduleClose();
                  }}
                  onClick={(e) => {
                    cancelClose();
                    const keyboard = e.detail === 0;
                    if (keyboard || lastPointer.current !== "mouse") {
                      // Enter/Space and touch toggle
                      if (isOpen) close(false);
                      else {
                        setPlace(null);
                        setOpen(b.id);
                        setPinned(true);
                      }
                    } else {
                      // a mouse click on a hover-opened card pins it
                      setOpen(b.id);
                      setPinned(true);
                    }
                  }}
                >
                  {box.dots.map((d, k) => (
                    <span key={k} className="map-city-dot" aria-hidden="true" style={{ left: d.x, top: d.y }} />
                  ))}
                </button>
                <div
                  ref={(el) => {
                    cardRefs.current[b.id] = el;
                  }}
                  id={`map-card-${b.id}`}
                  className="map-card"
                  data-below={place?.below || undefined}
                  hidden={!isOpen}
                  style={cardStyle}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") cancelClose();
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") scheduleClose();
                  }}
                >
                  {b.first.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- appears only when a project photograph exists
                    <img className="map-card-image" src={b.first.image.src} alt={b.first.image.alt} loading="lazy" />
                  ) : null}
                  <p className="map-card-city microlabel">{b.label}</p>
                  <p className="map-card-name">
                    <LangText text={b.first.name} />
                  </p>
                  {b.first.sector ? <p className="map-card-sector">{b.first.sector}</p> : null}
                  {more > 0 ? <p className="map-card-more">{t("moreProjects", { count: more })}</p> : null}
                  {b.first.href ? (
                    <Link className="map-card-link tx-link" href={b.first.href}>
                      {t("viewProject")}
                    </Link>
                  ) : null}
                </div>
              </Fragment>
            );
          })
        : null}
    </div>
  );
}

/** The text alternative: every city and its projects — visually hidden on
 *  the desktop map (the buttons carry it there), the visible list below
 *  768 px where the buttons give way (owner decision (ج)). */
export function MapCityList({ list, heading }: { list: MapCityListItem[]; heading: string }) {
  return (
    <div className="map-city-list">
      <h3 className="map-city-list-title microlabel">{heading}</h3>
      <ul>
        {list.map((c) => (
          <li key={c.id}>
            <span className="map-city-list-name">{c.name}</span>
            <ul>
              {c.projects.map((p) => (
                <li key={p.name}>
                  {p.href ? (
                    <Link className="tx-link" href={p.href}>
                      <LangText text={p.name} />
                    </Link>
                  ) : (
                    <LangText text={p.name} />
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
