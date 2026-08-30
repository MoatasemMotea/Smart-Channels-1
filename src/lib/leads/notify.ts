import type { Lead } from "@/types/lead";

// Server-only guard (dependency-free): importing this module in a
// client bundle is a build-breaking mistake — fail loudly at runtime.
if (typeof window !== "undefined") {
  throw new Error("leads/notify is server-only and must never reach the client bundle");
}

/**
 * LEAD-CREATED NOTIFICATION BOUNDARY (§23 · D-050).
 *
 * Event-driven: the intake API emits exactly one LeadCreated event per
 * stored lead; notifiers subscribe here. A notifier failure NEVER
 * fails the intake (the lead is already durably stored) — it is
 * logged server-side.
 *
 * ARCHITECTED-NEEDS-PROVIDER: email/Slack/webhook delivery requires an
 * owner-approved service and credentials (§50 — never silently chosen,
 * never committed). To connect one: implement LeadNotifier and add it
 * to NOTIFIERS. The console notifier below is server-log observability,
 * not a delivery claim.
 */
export interface LeadNotifier {
  name: string;
  onLeadCreated(lead: Lead): Promise<void>;
}

const consoleNotifier: LeadNotifier = {
  name: "server-log",
  async onLeadCreated(lead) {
    console.info(
      `[lead-created] ${lead.leadId} source=${lead.source} locale=${lead.locale} service=${lead.service ?? "-"}`,
    );
  },
};

const NOTIFIERS: LeadNotifier[] = [consoleNotifier];

export async function emitLeadCreated(lead: Lead): Promise<void> {
  for (const n of NOTIFIERS) {
    try {
      await n.onLeadCreated(lead);
    } catch (err) {
      console.error(`[lead-notify] ${n.name} failed for ${lead.leadId}:`, err);
    }
  }
}
