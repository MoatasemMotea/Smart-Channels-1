/**
 * LOCATION MAP — the approved address, on the page (D-054 §19).
 *
 * The map is part of the contact composition, not something the visitor
 * has to ask for: the "View map" gate is gone and the embed renders
 * directly. It stays lazy, so the frame is only fetched as the contact
 * chapter comes into view.
 *
 * Behind the frame sits a designed ground carrying the approved address
 * — so a visitor whose network cannot reach Google (or who blocks the
 * embed) still sees the location rather than an empty rectangle. The
 * embed paints over it the moment it loads.
 *
 * Unchanged: the embed is a plain query on the approved address text —
 * no API key, no credentials, no fabricated coordinates (D-011) — and
 * the address itself is always rendered beside this component as the
 * accessible, no-JS truth.
 */
import { getTranslations } from "next-intl/server";

export async function LocationMap({ address }: { address: string }) {
  const t = await getTranslations("lead");
  return (
    <div className="location-map">
      <p className="location-map-ground" aria-hidden="true">
        <span className="location-map-pin">◎</span>
        <span>{address}</span>
      </p>
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
