import type { LocalizedText } from "@/types/content";

/**
 * SMART AI — provider adapter boundary (P11 · D-046 · D-009).
 *
 * The experience ships INTEGRATION-READY but deliberately DISCONNECTED:
 * no provider, no backend, no simulated intelligence. Connecting a real
 * engine later is an isolated, separately-authorized change:
 *
 *   1. implement `SmartAiProvider` against the chosen service
 *      (O-010: provider, privacy architecture and lead routing are
 *      owner decisions);
 *   2. supply the REQUIRED `privacyNotice` (shown before anything is
 *      ever sent — consent architecture, D-009);
 *   3. set `smartAiIntegration` below to the implementation.
 *
 * While `smartAiIntegration` is null the UI renders the explicit
 * prototype state — it must NEVER pretend to think, stream, or answer.
 */
export interface SmartAiMessage {
  role: "user" | "assistant";
  text: string;
}

export interface SmartAiProvider {
  /** Human-readable provider label for the connected state. */
  name: string;
  /** REQUIRED consent/privacy notice rendered before first send. */
  privacyNotice: LocalizedText;
  /** Sends the conversation and resolves the assistant's reply. */
  send(messages: SmartAiMessage[]): Promise<SmartAiMessage>;
}

/** null = the honest prototype state (D-009). */
export const smartAiIntegration: SmartAiProvider | null = null;
