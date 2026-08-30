"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { getContact, getSolutionFamilies, localize } from "@/lib/content";

/**
 * LET'S TALK — the real lead form (§§24–26 · D-050).
 *
 * Submits to POST /api/leads (the local lead system — no third-party
 * service). Success renders ONLY on a confirmed 2xx from the backend
 * (§26 — never fake success); failure states are honest and offer the
 * direct approved channels instead. Accessible validation: per-field
 * errors, aria-describedby, focus lands on the first invalid field.
 * A hidden honeypot field ("website") filters bots server-side.
 */
type Phase = "idle" | "sending" | "success" | "error";

const FIELDS = ["name", "company", "phone", "email", "service", "message"] as const;
type FieldId = (typeof FIELDS)[number];
const REQUIRED: Record<FieldId, boolean> = {
  name: true,
  company: false,
  phone: false,
  email: true,
  service: false,
  message: true,
};

export function LeadForm() {
  const locale = useLocale() as Locale;
  const t = useTranslations("lead");
  const contact = getContact();
  const families = getSolutionFamilies();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [leadId, setLeadId] = useState<string | null>(null);

  const validate = (): Record<string, string> | null => {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    for (const f of FIELDS) {
      const value = String(data.get(f) ?? "").trim();
      if (REQUIRED[f] && !value) errs[f] = t("errRequired");
      else if (f === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
        errs[f] = t("errEmail");
      else if (f === "phone" && value && value.replace(/\D/g, "").length < 7)
        errs[f] = t("errPhone");
    }
    if (!data.get("consent")) errs.consent = t("errConsent");
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return null;
    }
    return Object.fromEntries(FIELDS.map((f) => [f, String(data.get(f) ?? "").trim()]));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "sending") return;
    const data = validate();
    if (!data) return;
    setPhase("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "contact-form",
          locale,
          ...data,
          consent: true,
          // honeypot travels along; real visitors leave it empty
          website: String(new FormData(formRef.current!).get("website") ?? ""),
        }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; leadId?: string; errors?: Record<string, string> }
        | null;
      if (res.ok && json?.ok) {
        setLeadId(json.leadId ?? null);
        setPhase("success"); // genuine: the backend confirmed storage
      } else {
        if (json?.errors) {
          const mapped: Record<string, string> = {};
          for (const [k, v] of Object.entries(json.errors)) {
            mapped[k] =
              k === "email" && v === "invalid"
                ? t("errEmail")
                : k === "phone"
                  ? t("errPhone")
                  : k === "consent"
                    ? t("errConsent")
                    : t("errRequired");
          }
          setErrors(mapped);
        }
        setPhase("error");
      }
    } catch {
      setPhase("error");
    }
  };

  const err = (id: string) =>
    errors[id] ? (
      <p id={`lf-err-${id}`} className="form-error" role="alert">
        {errors[id]}
      </p>
    ) : null;
  const aria = (id: string) =>
    errors[id] ? { "aria-invalid": true as const, "aria-describedby": `lf-err-${id}` } : {};

  if (phase === "success") {
    return (
      <div className="lead-success" role="status">
        <p className="font-display text-2xl font-bold">{t("successTitle")}</p>
        <p className="mt-3 text-base leading-8 text-ink-muted">{t("successBody")}</p>
        {leadId ? (
          <p className="microlabel mt-5">
            {t("successRef")}: <bdi dir="ltr">{leadId}</bdi>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form ref={formRef} className="contact-form" noValidate onSubmit={submit}>
      {phase === "error" ? (
        <div className="lead-fail" role="alert">
          <p className="font-semibold">{t("failTitle")}</p>
          <p className="mt-1 text-sm leading-7 text-ink-muted">
            {t("failBody")}{" "}
            <a className="tx-link font-semibold text-accent" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        </div>
      ) : null}

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="lf-name" className="form-label">
            {t("name")}
          </label>
          <input id="lf-name" name="name" type="text" autoComplete="name" className="form-input" {...aria("name")} />
          {err("name")}
        </div>
        <div className="form-row">
          <label htmlFor="lf-company" className="form-label">
            {t("company")} <span className="form-optional microlabel">({t("optional")})</span>
          </label>
          <input id="lf-company" name="company" type="text" autoComplete="organization" className="form-input" {...aria("company")} />
          {err("company")}
        </div>
        <div className="form-row">
          <label htmlFor="lf-phone" className="form-label">
            {t("phone")} <span className="form-optional microlabel">({t("optional")})</span>
          </label>
          <input id="lf-phone" name="phone" type="tel" dir="ltr" autoComplete="tel" className="form-input" {...aria("phone")} />
          {err("phone")}
        </div>
        <div className="form-row">
          <label htmlFor="lf-email" className="form-label">
            {t("email")}
          </label>
          <input id="lf-email" name="email" type="email" autoComplete="email" className="form-input" {...aria("email")} />
          {err("email")}
        </div>
        <div className="form-row">
          <label htmlFor="lf-service" className="form-label">
            {t("service")} <span className="form-optional microlabel">({t("optional")})</span>
          </label>
          <select id="lf-service" name="service" className="form-input" {...aria("service")}>
            <option value="">{t("serviceGeneral")}</option>
            {families.map((fam) => (
              <option key={fam.id} value={localize(fam.name, locale)}>
                {localize(fam.name, locale)}
              </option>
            ))}
          </select>
          {err("service")}
        </div>
        <div className="form-row form-row-full">
          <label htmlFor="lf-message" className="form-label">
            {t("message")}
          </label>
          <textarea id="lf-message" name="message" rows={5} className="form-input" {...aria("message")} />
          {err("message")}
        </div>
      </div>

      {/* honeypot — visually hidden from people, present for bots */}
      <div className="lead-hp" aria-hidden="true">
        <label htmlFor="lf-website">Website</label>
        <input id="lf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        <label className="lead-consent">
          <input type="checkbox" name="consent" {...aria("consent")} />
          <span className="text-sm leading-7 text-ink-muted">{t("consent")}</span>
        </label>
        {err("consent")}
      </div>

      <div className="mt-7">
        <button
          type="submit"
          disabled={phase === "sending"}
          className="rounded bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink disabled:opacity-60"
        >
          {phase === "sending" ? t("sending") : t("send")}
          &nbsp;&nbsp;<span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
