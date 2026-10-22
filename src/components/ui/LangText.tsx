import { Fragment, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { splitForeign } from "@/lib/i18n/lang-runs";

/**
 * <LangText> (D-081) — the ONE way a content or message string reaches
 * the page: every run in the other script is wrapped in
 * <span lang="en"> (Arabic page) or <span lang="ar"> (English page), so a
 * screen reader switches voice for "Smart Channels", "PoE", a partner
 * brand or the counterpart-language echo (WCAG 3.1.2). Each run also
 * carries its own `dir`, which isolates it in the bidi algorithm: a Latin
 * run keeps its internal order inside an Arabic line ("add+" no longer
 * renders as "+add"). No styling. Works in server and client components
 * (sync hook).
 */
export function LangText({ text }: { text: ReactNode }) {
  const locale = useLocale();
  if (typeof text !== "string") return <>{text}</>; // already-composed nodes pass through
  const runs = splitForeign(text, locale);
  if (runs.length === 1 && !runs[0]!.lang) return <>{text}</>;
  return (
    <>
      {runs.map((r, i) =>
        r.lang ? (
          <span key={i} lang={r.lang} dir={r.lang === "ar" ? "rtl" : "ltr"}>
            {r.text}
          </span>
        ) : (
          <Fragment key={i}>{r.text}</Fragment>
        ),
      )}
    </>
  );
}
