/**
 * One CSV cell (§31 · D-088 · SEC-4): quoted, inner quotes doubled, and a
 * value that a spreadsheet would execute as a formula — one starting with
 * = + - @, a tab or a carriage return — is prefixed with an apostrophe so
 * it is shown as text. Lead fields are visitor-supplied, so this is the
 * CSV-injection guard.
 */
const FORMULA_START = /^[=+\-@\t\r]/;

export function csvCell(v: unknown): string {
  let s = v == null ? "" : String(v);
  if (FORMULA_START.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}
