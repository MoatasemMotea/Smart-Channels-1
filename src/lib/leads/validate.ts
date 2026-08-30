import type { LeadConversationMessage, LeadInput, LeadSource } from "@/types/lead";

/**
 * Lead intake validation + sanitization (§33 · D-050).
 *
 * Conversation input and form input are UNTRUSTED. Everything is
 * length-bounded, control-characters are stripped, and only whitelisted
 * enum values pass. Returns either a clean LeadInput or a field-keyed
 * error map (stable ids the client maps to localized messages).
 */

const MAX = {
  name: 120,
  company: 160,
  phone: 40,
  email: 254,
  service: 160,
  message: 4000,
  summary: 2000,
  conversationMessages: 200,
  conversationContent: 4000,
} as const;

const SOURCES: LeadSource[] = ["contact-form", "digital-employee"];
const LOCALES = ["en", "ar"] as const;

/** strips C0/C1 controls (keeps \\n and \\t in long text), bounds length */
function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  const re = multiline
    ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g
    : /[\u0000-\u001f\u007f-\u009f]/g;
  return value.replace(re, " ").trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** digits, spaces, +, -, parentheses; 7–20 significant digits */
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;

export type LeadValidation =
  | { ok: true; input: LeadInput }
  | { ok: false; errors: Record<string, string> };

export function validateLeadPayload(body: unknown): LeadValidation {
  const errors: Record<string, string> = {};
  const b = (body ?? {}) as Record<string, unknown>;

  const source = SOURCES.includes(b.source as LeadSource)
    ? (b.source as LeadSource)
    : null;
  if (!source) errors.source = "invalid";

  const locale = LOCALES.includes(b.locale as (typeof LOCALES)[number])
    ? (b.locale as "en" | "ar")
    : "en";

  const name = clean(b.name, MAX.name);
  if (!name) errors.name = "required";

  const email = clean(b.email, MAX.email);
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "invalid";

  const phone = clean(b.phone, MAX.phone);
  if (phone && !PHONE_RE.test(phone)) errors.phone = "invalid";
  if (phone && phone.replace(/\D/g, "").length < 7) errors.phone = "invalid";

  const message = clean(b.message, MAX.message, true);
  if (!message) errors.message = "required";

  if (b.consent !== true) errors.consent = "required";

  const company = clean(b.company, MAX.company);
  const service = clean(b.service, MAX.service);

  let conversation: LeadConversationMessage[] | undefined;
  if (Array.isArray(b.conversation)) {
    conversation = b.conversation
      .slice(0, MAX.conversationMessages)
      .map((m): LeadConversationMessage | null => {
        const mm = (m ?? {}) as Record<string, unknown>;
        const role = mm.role === "assistant" ? "assistant" : mm.role === "visitor" ? "visitor" : null;
        const content = clean(mm.content, MAX.conversationContent, true);
        if (!role || !content) return null;
        return { role, content, at: new Date().toISOString() };
      })
      .filter((m): m is LeadConversationMessage => m !== null);
  }

  const conversationSummary = clean(b.conversationSummary, MAX.summary, true) || undefined;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    input: {
      source: source as LeadSource,
      locale,
      name,
      company: company || undefined,
      phone: phone || undefined,
      email,
      service: service || undefined,
      message,
      consent: true,
      conversation,
      conversationSummary,
    },
  };
}
