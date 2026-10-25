import { NextResponse, type NextRequest } from "next/server";
import type { Lead } from "@/types/lead";
import { validateLeadPayload } from "@/lib/leads/validate";
import { LeadStoreUnavailableError, getLeadStore, newLeadId } from "@/lib/leads/store";
import { emitLeadCreated } from "@/lib/leads/notify";
import { LEADS_RULE, limit } from "@/lib/leads/rate-limit";
import { clientIp, declaredTooLarge, mediaType, readTextCapped, sameOriginRequest } from "@/lib/http/request-guard";

/**
 * PUBLIC LEAD INTAKE — POST /api/leads (§§24–26, §33 · D-050).
 *
 * Serves BOTH channels (Let's Talk form + Digital Employee). The
 * client shows success ONLY on this route's 2xx — a stored lead is the
 * only success there is (never fake success, §26).
 *
 * Protections (§33 · D-088): same-origin only (Origin header), JSON
 * only (415 otherwise), 64KB body cap enforced before and during reading,
 * shared per-IP rate limit with progressive lockout, full server-side
 * validation/sanitization, honeypot trap, consent required. Without a
 * configured store on Vercel the answer is 503 "storage-unconfigured" —
 * never a fake success. Conversation input is stored as data — it is never
 * executed, never interpreted as instructions, and the AI layer has no
 * access to this store (§33).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64 * 1024;

export async function POST(req: NextRequest) {
  if (!sameOriginRequest(req)) {
    return NextResponse.json({ ok: false, error: "forbidden-origin" }, { status: 403 });
  }
  if (mediaType(req) !== "application/json") {
    return NextResponse.json({ ok: false, error: "unsupported-media-type" }, { status: 415 });
  }
  if (declaredTooLarge(req, MAX_BODY_BYTES)) {
    return NextResponse.json({ ok: false, error: "too-large" }, { status: 413 });
  }
  const gate = await limit(`leads:${clientIp(req)}`, LEADS_RULE);
  if (!gate.ok) {
    return NextResponse.json(
      { ok: false, error: "rate-limited" },
      { status: 429, headers: { "Retry-After": String(gate.retryAfter) } },
    );
  }

  const raw = await readTextCapped(req, MAX_BODY_BYTES);
  if (raw === null) {
    return NextResponse.json({ ok: false, error: "too-large" }, { status: 413 });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  // honeypot: real visitors never see or fill this field; a filled value
  // is a bot — swallow silently (a trap, not a visitor-facing claim)
  if ((body as Record<string, unknown>)?.website) {
    return NextResponse.json({ ok: true });
  }

  const result = validateLeadPayload(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const now = new Date().toISOString();
  const input = result.input;
  const lead: Lead = {
    leadId: newLeadId(),
    source: input.source,
    locale: input.locale,
    name: input.name,
    company: input.company ?? null,
    phone: input.phone ?? null,
    email: input.email,
    service: input.service ?? null,
    message: input.message,
    status: "NEW", // §23: status is human-owned from here on
    conversation: input.conversation ?? null,
    conversationSummary: input.conversationSummary ?? null,
    notes: [],
    audit: [{ at: now, actor: "system", action: "created" }],
    createdAt: now,
    updatedAt: now,
    consent: true,
    consentTimestamp: now,
  };

  try {
    await getLeadStore().create(lead);
  } catch (err) {
    if (err instanceof LeadStoreUnavailableError) {
      console.error("[leads] storage is not configured (Upstash Redis variables missing)");
      return NextResponse.json({ ok: false, error: "storage-unconfigured" }, { status: 503 });
    }
    console.error("[leads] store failure:", err);
    // storage failed = intake failed; the client must NOT show success
    return NextResponse.json({ ok: false, error: "storage" }, { status: 503 });
  }

  await emitLeadCreated(lead);
  return NextResponse.json({ ok: true, leadId: lead.leadId }, { status: 201 });
}
