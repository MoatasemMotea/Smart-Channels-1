"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { getContact, getSolutionFamilies, localize } from "@/lib/content";
// aiProvider (typed, null until the owner selects a service — §50) will
// switch this panel to conversational mode; guided intake is the honest
// deterministic default meanwhile.
import type { AssistantMessage } from "@/lib/digital-employee/provider";

/**
 * SMART CHANNELS DIGITAL EMPLOYEE (§§15–22, §34 · D-050).
 *
 * A floating conversational experience above the WhatsApp action.
 * While `aiProvider` is null (§50 — no service chosen) it runs HONEST
 * GUIDED INTAKE: a deterministic scripted assistant that introduces
 * itself as digital (NEVER a human — §17), collects the enquiry
 * progressively (§22), asks for explicit consent (§32) and files a
 * REAL lead through POST /api/leads with the transcript and a
 * deterministic summary. Success renders only on the backend's 2xx
 * (§26). Human-handoff phrases surface the direct approved channels
 * (§19). The conversation persists for the browsing session (§34,
 * sessionStorage) and never traps scroll or focus.
 */

type Step =
  | "name"
  | "company"
  | "phone"
  | "email"
  | "service"
  | "message"
  | "consent"
  | "submitting"
  | "done"
  | "declined"
  | "failed";

interface DEData {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface DEPersisted {
  step: Step;
  data: DEData;
  transcript: AssistantMessage[];
  ref: string | null;
}

const EMPTY: DEData = { name: "", company: "", phone: "", email: "", service: "", message: "" };
const STORAGE_KEY = "sc-digital-employee";

/** explicit requests for a person, EN + AR (§19) */
const HANDOFF_RE =
  /\b(human|real person|a person|someone real|agent|representative|operator)\b|إنسان|بشري|شخص حقيقي|موظف حقيقي|ممثل|أريد شخص|اتحدث مع شخص|التحدث مع شخص/i;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function loadPersisted(): DEPersisted | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as DEPersisted;
    if (!p || !Array.isArray(p.transcript)) return null;
    return p;
  } catch {
    return null;
  }
}

function persist(p: DEPersisted) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable — the conversation simply won't survive nav */
  }
}

export function DigitalEmployee() {
  const locale = useLocale() as Locale;
  const t = useTranslations("assistant");
  const contact = getContact();
  const families = getSolutionFamilies();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [data, setData] = useState<DEData>(EMPTY);
  const [transcript, setTranscript] = useState<AssistantMessage[]>([]);
  const [leadRef, setLeadRef] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  // becomes true on the first launcher click, after the session
  // conversation (§34) is restored — persistence stays off until then
  // so a saved conversation is never clobbered by the initial state
  const [booted, setBooted] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // restore (or seed) lazily, inside the user's own click — the panel
  // only exists client-side after interaction, so there is no SSR
  // hydration mismatch and no setState-in-effect
  const toggleOpen = () => {
    if (!booted) {
      const saved = loadPersisted();
      if (saved && saved.transcript.length > 0) {
        setStep(saved.step === "submitting" ? "consent" : saved.step);
        setData({ ...EMPTY, ...saved.data });
        setTranscript(saved.transcript);
        setLeadRef(saved.ref);
      } else {
        setTranscript([{ role: "assistant", content: t("welcome") }]);
      }
      setBooted(true);
    }
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!booted) return;
    persist({ step, data, transcript, ref: leadRef });
  }, [booted, step, data, transcript, leadRef]);

  // Escape closes the panel — document-level, imperative (a11y lint:
  // the dialog section itself is non-interactive)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // keep the newest message visible
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [transcript, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, step]);

  const say = useCallback((content: string) => {
    setTranscript((tr) => [...tr, { role: "assistant", content }]);
  }, []);
  const hear = useCallback((content: string) => {
    setTranscript((tr) => [...tr, { role: "visitor", content }]);
  }, []);

  const contactParams = { phone: contact.phone, email: contact.email };

  const advance = (next: Step, question: string) => {
    setStep(next);
    say(question);
  };

  const handleText = (raw: string) => {
    const text = raw.trim().slice(0, 2000);
    if (!text) {
      say(t("errEmpty"));
      return;
    }
    hear(text);
    setDraft("");

    // §19: an explicit ask for a person always surfaces the channels
    if (HANDOFF_RE.test(text)) {
      say(t("handoff", contactParams));
      return; // the current question stands; the visitor answers next
    }

    switch (step) {
      case "name":
        setData((d) => ({ ...d, name: text }));
        advance("company", t("askCompany", { name: text }));
        break;
      case "company":
        setData((d) => ({ ...d, company: text }));
        advance("phone", t("askPhone"));
        break;
      case "phone":
        if (text.replace(/\D/g, "").length < 7) {
          say(t("errPhone"));
          return;
        }
        setData((d) => ({ ...d, phone: text }));
        advance("email", t("askEmail"));
        break;
      case "email":
        if (!EMAIL_RE.test(text)) {
          say(t("errEmail"));
          return;
        }
        setData((d) => ({ ...d, email: text }));
        advance("service", t("askService"));
        break;
      case "message":
        setData((d) => ({ ...d, message: text }));
        setStep("consent");
        say(t("askConsent"));
        break;
      default:
        break;
    }
  };

  const skip = () => {
    if (step === "company") {
      setData((d) => ({ ...d, company: "" }));
      advance("phone", t("askPhone"));
    } else if (step === "phone") {
      setData((d) => ({ ...d, phone: "" }));
      advance("email", t("askEmail"));
    }
  };

  const chooseService = (label: string) => {
    hear(label);
    setData((d) => ({ ...d, service: label }));
    advance("message", t("askMessage"));
  };

  const submit = async (finalData: DEData, conversation: AssistantMessage[]) => {
    setStep("submitting");
    say(t("submitting"));
    const summary = [
      `${t("summaryPrefix")}: ${finalData.service || t("generalService")}`,
      `${finalData.name}${finalData.company ? ` — ${finalData.company}` : ""}`,
    ].join(" · ");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "digital-employee",
          locale,
          name: finalData.name,
          company: finalData.company || undefined,
          phone: finalData.phone || undefined,
          email: finalData.email,
          service: finalData.service || undefined,
          message: finalData.message,
          consent: true,
          conversation,
          conversationSummary: summary,
        }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; leadId?: string }
        | null;
      if (res.ok && json?.ok) {
        setLeadRef(json.leadId ?? null);
        setStep("done");
        say(t("done", { name: finalData.name, ref: json.leadId ?? "—" }));
      } else {
        setStep("failed");
        say(t("failed", { email: contact.email }));
      }
    } catch {
      setStep("failed");
      say(t("failed", { email: contact.email }));
    }
  };

  const agree = () => {
    hear(t("consentAgree"));
    void submit(data, [...transcript, { role: "visitor", content: t("consentAgree") }]);
  };
  const decline = () => {
    hear(t("consentDecline"));
    setStep("declined");
    say(t("declined", contactParams));
  };
  const restart = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setData(EMPTY);
    setLeadRef(null);
    setDraft("");
    setTranscript([{ role: "assistant", content: t("welcome") }]);
    setStep("name");
  };

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const showTextInput =
    step === "name" ||
    step === "company" ||
    step === "phone" ||
    step === "email" ||
    step === "message";

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="floating-de"
        aria-label={t("open")}
        title={t("name")}
        aria-expanded={open}
        onClick={toggleOpen}
      >
        {/* assistant glyph — signal node with voice arcs (inline, no asset) */}
        <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" focusable="false">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="6" y="9" width="20" height="14" rx="4" />
            <path d="M13 27h6" />
            <circle cx="12.5" cy="16" r="1.4" fill="currentColor" stroke="none" />
            <circle cx="19.5" cy="16" r="1.4" fill="currentColor" stroke="none" />
            <path d="M16 5.5V9" />
            <circle cx="16" cy="4.5" r="1.3" fill="currentColor" stroke="none" />
          </g>
        </svg>
      </button>

      {open ? (
        <section className="de-panel" role="dialog" aria-label={t("name")}>
          <header className="de-header">
            <div>
              <p className="de-title font-display">{t("name")}</p>
              {/* §17: the identity disclosure is permanent, not a footnote */}
              <p className="de-honesty microlabel">{t("honesty")}</p>
            </div>
            <button type="button" className="de-close" aria-label={t("close")} onClick={close}>
              <span aria-hidden="true">✕</span>
            </button>
          </header>

          <div ref={logRef} className="de-log" aria-label={t("transcriptLabel")}>
            <div aria-live="polite">
              {transcript.map((m, i) => (
                <p key={i} className="de-msg" data-role={m.role}>
                  {m.content}
                </p>
              ))}
            </div>
          </div>

          <div className="de-actions">
            {step === "service" ? (
              <div className="de-choices">
                {families.map((f) => (
                  <button key={f.id} type="button" onClick={() => chooseService(localize(f.name, locale))}>
                    {localize(f.name, locale)}
                  </button>
                ))}
                <button type="button" onClick={() => chooseService(t("generalService"))}>
                  {t("generalService")}
                </button>
              </div>
            ) : null}

            {step === "consent" ? (
              <div className="de-consent">
                <p className="de-consent-text">{t("consentText")}</p>
                <div className="de-choices">
                  <button type="button" className="de-primary" onClick={agree}>
                    {t("consentAgree")}
                  </button>
                  <button type="button" onClick={decline}>
                    {t("consentDecline")}
                  </button>
                </div>
              </div>
            ) : null}

            {step === "failed" ? (
              <div className="de-choices">
                <button type="button" className="de-primary" onClick={() => void submit(data, transcript)}>
                  {t("retry")}
                </button>
                <button type="button" onClick={restart}>
                  {t("restart")}
                </button>
              </div>
            ) : null}

            {step === "done" || step === "declined" ? (
              <div className="de-choices">
                <button type="button" onClick={restart}>
                  {t("restart")}
                </button>
              </div>
            ) : null}

            {showTextInput ? (
              <form
                className="de-input-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleText(draft);
                }}
              >
                <label htmlFor="de-input" className="sr-only">
                  {t("inputLabel")}
                </label>
                <input
                  id="de-input"
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t("placeholder")}
                  autoComplete="off"
                  maxLength={2000}
                />
                {step === "company" || step === "phone" ? (
                  <button type="button" className="de-skip" onClick={skip}>
                    {t("skip")}
                  </button>
                ) : null}
                <button type="submit" className="de-primary">
                  {t("send")}
                </button>
              </form>
            ) : null}
          </div>

        </section>
      ) : null}
    </>
  );
}
