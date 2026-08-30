import type { LocalizedText } from "@/types/content";

/**
 * SMART CHANNELS DIGITAL EMPLOYEE — AI provider boundary
 * (§§15–22, §50 · D-050; supersedes the P11 Smart AI adapter).
 *
 * The Digital Employee is INTENDED to run on a real multilingual AI
 * service. That service is an OWNER DECISION (§50): nothing is chosen
 * silently, no keys exist, nothing is committed. Until a provider is
 * connected (`aiProvider` = null), the experience runs its honest
 * GUIDED INTAKE mode — a deterministic, clearly-scripted assistant
 * that collects the enquiry and files a real lead. It never simulates
 * intelligence and NEVER claims to be human (§17).
 *
 * CONNECTING A PROVIDER LATER (isolated, separately-authorized):
 *  1. implement `AIProvider` below — the `send()` call MUST go through
 *     a same-origin server route (e.g. /api/assistant) that holds the
 *     credentials server-side; API keys never reach the client (§50),
 *     and the model gets NO direct access to the lead store (§33) —
 *     the server route mediates every capability;
 *  2. supply the REQUIRED `privacyNotice` (shown before the first
 *     free-form message is sent anywhere);
 *  3. set `aiProvider` to the implementation. The panel switches to
 *     conversational mode; guided intake remains the fallback.
 *
 * Conversation input is UNTRUSTED (§33): whatever a model or visitor
 * writes is data — it never executes privileged actions, never sets
 * lead status, and never widens access.
 */
export interface AssistantMessage {
  role: "visitor" | "assistant";
  content: string;
}

export interface AIProviderContext {
  locale: "en" | "ar";
  messages: AssistantMessage[];
}

export interface AIProvider {
  id: string;
  displayName: string;
  /** REQUIRED consent/privacy notice rendered before first send. */
  privacyNotice: LocalizedText;
  /** Resolves the assistant's reply via a server-side route. */
  send(ctx: AIProviderContext): Promise<{ reply: string }>;
}

/** null = honest guided-intake mode (no provider chosen — §50). */
export const aiProvider: AIProvider | null = null;
