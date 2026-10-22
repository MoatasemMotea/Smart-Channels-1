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

/* D-083: the list is closed — every client and project now has its
   official Arabic name or is an allow-listed Latin brand. To add a name
   later whose official Arabic is not yet known: give the record `en`
   only (no `ar`, no arPolicy) and add one line here, e.g.
     { kind: "client", id: "acme", en: "Acme", note: "official Arabic awaited" },
   The validator then requires the line, and the language test accepts
   and prints the Latin name until `ar` arrives. */
export const arabicPending: PendingName[] = [];
