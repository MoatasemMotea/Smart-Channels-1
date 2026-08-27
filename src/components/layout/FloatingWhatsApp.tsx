import { getTranslations } from "next-intl/server";
import { getContact } from "@/lib/content";

/**
 * Floating WhatsApp action (P4 Rev3 §12).
 *
 * Data-driven: the number lives in src/content/contact.ts (owner-approved,
 * D-011) — the component derives the wa.me destination by stripping
 * non-digits. Accessible name in both locales; ≥48px target; safe-area
 * aware; hidden while the cinematic opening runs (CSS) so it never
 * competes with the brand moment. No prewritten message (not approved).
 */
export async function FloatingWhatsApp() {
  const t = await getTranslations("contact");
  const { whatsapp } = getContact();
  if (!whatsapp) return null;
  const digits = whatsapp.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappLabel")}
      title={t("whatsappLabel")}
      className="floating-whatsapp"
    >
      {/* WhatsApp glyph (recognizable mark, drawn inline — no external asset) */}
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.04 4.02c-6.6 0-11.96 5.36-11.96 11.95 0 2.11.55 4.16 1.6 5.97L4 28l6.22-1.63a11.9 11.9 0 0 0 5.8 1.48h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.2-1.24-6.2-3.5-8.45a11.86 11.86 0 0 0-8.44-3.43Zm0 21.82h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.69.97.98-3.6-.23-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.48 4.46-9.93 9.94-9.93a9.87 9.87 0 0 1 9.93 9.94c0 5.48-4.52 9.86-10 9.86Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
        />
      </svg>
    </a>
  );
}
