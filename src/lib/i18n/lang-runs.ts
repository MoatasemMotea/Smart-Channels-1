/**
 * LANGUAGE RUNS (D-081) — splits a display string into runs of the page
 * language and runs of the OTHER script, so every foreign run can carry
 * its own `lang` (WCAG 3.1.2 Language of Parts).
 *
 * On an Arabic page a foreign run is Latin (brands, technical acronyms,
 * identifiers): a sequence of Latin words/digits joined by single spaces
 * that contains at least one Latin letter — "Smart Channels", "PoE",
 * "Cat 6 / Cat 6A / Cat 7". On an English page it is Arabic.
 * Pure function — used by <LangText> and by the language smoke test.
 */
export type Run = { text: string; lang?: "en" | "ar" };

/* the first word must contain a letter ("5G" yes, a bare year no — "© 2026
   Smart Channels" keeps the year in the Arabic flow, as before) */
/* Latin words stay ONE run across single spaces and across " — " / " – "
   when Latin continues on the other side ("WTA Finals — Riyadh" is one
   name; "FIFA — جدة" stops at FIFA) */
const LATIN_RUN = /[0-9]*[A-Za-z][A-Za-z0-9&+.'’\-/:@_]*(?:(?: [—–] | )[A-Za-z0-9&+.'’\-/:@_]+)*/g;
/* sentence punctuation after a run belongs to the surrounding sentence */
const TRAILING = /[.,:;'’]+$/;
const ARABIC_RUN = /[؀-ۿ](?:[؀-ۿً-ٟ ،]*[؀-ۿً-ٟ])?/g;
const HAS_LATIN = /[A-Za-z]/;

export function splitForeign(text: string, locale: string): Run[] {
  const re = locale === "ar" ? LATIN_RUN : ARABIC_RUN;
  const lang = locale === "ar" ? "en" : "ar";
  const out: Run[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    let run = m[0];
    if (locale === "ar") {
      if (!HAS_LATIN.test(run)) continue; // digits alone stay in the Arabic flow
      run = run.replace(TRAILING, "");
    }
    const at = m.index ?? 0;
    if (at > last) out.push({ text: text.slice(last, at) });
    out.push({ text: run, lang });
    last = at + run.length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out.length ? out : [{ text }];
}
