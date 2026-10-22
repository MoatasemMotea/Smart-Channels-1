/**
 * ARABIC NAMES PENDING (D-081) — the owner's waiting list.
 *
 * One language per page: on the Arabic site every client and project is
 * shown by its OFFICIAL Arabic name. Where that name is not known it is
 * never invented — the record keeps its English name (no `ar`, no
 * arPolicy) and is listed here. The language smoke test accepts exactly
 * these names in Latin on Arabic pages and prints them on every run; the
 * validator fails if a record lacks Arabic without being listed here, or
 * is listed here while it already has Arabic.
 *
 * HOW TO CLOSE AN ENTRY: add `ar: "…"` to the record's `name` in
 * clients.ts / projects.ts and delete its line below.
 */
export interface PendingName {
  kind: "client" | "project";
  id: string;
  en: string;
  note: string;
}

export const arabicPending: PendingName[] = [
  { kind: "client", id: "wpe", en: "Water & Power Engineering", note: "no Arabic on the approved logo" },
  { kind: "client", id: "hwadi", en: "Hwadi", note: "no Arabic on the approved logo" },
  { kind: "client", id: "sala-entertainment", en: "Sala Entertainment", note: "not named in D-082 (neither allow-listed nor kept) — awaiting the owner" },
];
