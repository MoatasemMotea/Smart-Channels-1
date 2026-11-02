import { LangText } from "@/components/ui/LangText";
import type { MapCityListItem } from "@/lib/content";

/**
 * D-093: the network map is a pure animated panel — no city buttons, no
 * popover cards, no pointer/keyboard interaction on map nodes. This is
 * the text alternative: every city with its projects, visually hidden
 * next to the desktop map (the drawing is aria-hidden) and the visible
 * list once the map gives way below 768px (owner decision (ج), D-081).
 */
export function MapCityList({ list, heading }: { list: MapCityListItem[]; heading: string }) {
  return (
    <div className="map-city-list">
      <h3 className="map-city-list-title microlabel">{heading}</h3>
      <ul>
        {list.map((c) => (
          <li key={c.id}>
            <span className="map-city-list-name">{c.name}</span>
            <ul>
              {/* D-092: names only — project detail pages no longer exist */}
              {c.projects.map((p) => (
                <li key={p.name}>
                  <LangText text={p.name} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
