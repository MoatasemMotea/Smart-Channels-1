/**
 * LEAD DOMAIN (final pre-media directive §§23–31 · D-050).
 *
 * One shared Lead model for BOTH intake channels — the homepage Let's
 * Talk form and the Digital Employee conversation. The admin console,
 * export and statistics all read this shape.
 *
 * Status workflow is HUMAN-owned: NEW → CONTACTED → QUALIFIED →
 * PROPOSAL → WON/LOST. The AI/assistant NEVER sets or advances status
 * (§23) — only authenticated admin actions do, and every change lands
 * in the audit trail.
 */

export type LeadSource = "contact-form" | "digital-employee";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** One turn of a Digital Employee conversation, stored with the lead. */
export interface LeadConversationMessage {
  role: "visitor" | "assistant";
  content: string;
  /** ISO-8601 */
  at: string;
}

export interface LeadNote {
  at: string;
  author: string;
  text: string;
}

export interface LeadAuditEntry {
  at: string;
  /** "system" for creation; the authenticated admin identity otherwise. */
  actor: string;
  action: "created" | "status-changed" | "note-added";
  from?: LeadStatus;
  to?: LeadStatus;
  note?: string;
}

export interface Lead {
  leadId: string;
  source: LeadSource;
  locale: "en" | "ar";
  name: string;
  company: string | null;
  phone: string | null;
  email: string;
  /** Approved solution-family wording chosen by the visitor (or null). */
  service: string | null;
  message: string;
  status: LeadStatus;
  /** Digital Employee transcript (null for plain form submissions). */
  conversation: LeadConversationMessage[] | null;
  /** Deterministic summary of the conversation/enquiry (never invented). */
  conversationSummary: string | null;
  notes: LeadNote[];
  audit: LeadAuditEntry[];
  createdAt: string;
  updatedAt: string;
  /** Stored only as true — a lead cannot exist without consent (§32). */
  consent: true;
  consentTimestamp: string;
}

/** What the public intake API accepts (validated + sanitized server-side). */
export interface LeadInput {
  source: LeadSource;
  locale: "en" | "ar";
  name: string;
  company?: string;
  phone?: string;
  email: string;
  service?: string;
  message: string;
  consent: boolean;
  conversation?: LeadConversationMessage[];
  conversationSummary?: string;
}
