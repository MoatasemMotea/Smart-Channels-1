import { notFound } from "next/navigation";

/* Request-time rendering: a statically-optimized catch-all would be
   cached as a plain 404 after its first hit and fall back to the bare
   framework default — force-dynamic keeps every unmatched URL flowing
   through the branded locale not-found boundary. */
export const dynamic = "force-dynamic";

/**
 * Locale-scoped catch-all (issue-audit M1 · D-049): any URL that matches
 * no real route flows through notFound() into the branded, localized
 * not-found boundary — inside the full site chrome — instead of the
 * framework's bare default page (next-intl canonical pattern).
 */
export default function CatchAllNotFound(): never {
  notFound();
}
