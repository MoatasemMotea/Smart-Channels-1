import type { LocalizedText } from "@/types/content";

/**
 * CONTACT / ENQUIRY FORM (P13 · D-047).
 *
 * HOW TO EDIT: the field list below is owner-editable data — reorder,
 * relabel, add or remove fields here; the form renders from it. The
 * `topic` select offers the approved solution families automatically
 * (data-driven) plus the general option.
 *
 * INTEGRATION STATE (D-010/O-009): `integration` is null — there is NO
 * production submission backend, and the UI says so explicitly. While
 * null, a valid submission composes the message for the visitor's OWN
 * email or WhatsApp app (approved channels, really sent by the visitor
 * — nothing is faked, nothing pretends to be delivered). Connecting a
 * real service later is a separately-authorized change: implement
 * `ContactFormIntegration` and set it here; the form switches to real
 * submission with no component redesign.
 */
export interface ContactFormField {
  id: "name" | "organization" | "email" | "phone" | "topic" | "message";
  required: boolean;
}

export interface ContactFormIntegration {
  name: string;
  submit(data: Record<string, string>): Promise<void>;
  /** Owner-approved consent/privacy text shown beside the submit action. */
  privacyNotice: LocalizedText;
}

export const contactFormFields: ContactFormField[] = [
  { id: "name", required: true },
  { id: "organization", required: false },
  { id: "email", required: true },
  { id: "phone", required: false },
  { id: "topic", required: false },
  { id: "message", required: true },
];

export const contactFormIntegration: ContactFormIntegration | null = null;
