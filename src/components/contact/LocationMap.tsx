"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * CLICK-TO-LOAD GOOGLE MAP (§27 · D-050).
 *
 * Privacy- and performance-honest: NOTHING loads from Google until the
 * visitor explicitly asks for the map. The embed is a plain query on
 * the approved address text (no API key, no credentials, no fabricated
 * coordinates — D-011). The accessible fallback is the address itself,
 * always rendered beside this component.
 */
export function LocationMap({ address }: { address: string }) {
  const t = useTranslations("lead");
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="location-map">
        <iframe
          title={t("mapTitle")}
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="location-map location-map-idle">
      <button type="button" className="location-map-load" onClick={() => setLoaded(true)}>
        <span aria-hidden="true" className="location-map-pin">
          ◎
        </span>
        {t("mapLoad")}
      </button>
      <p className="microlabel mt-3">{t("mapHint")}</p>
    </div>
  );
}
