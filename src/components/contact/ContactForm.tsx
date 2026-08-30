"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { getContact, getSolutionFamilies, localize } from "@/lib/content";
import { contactFormFields, contactFormIntegration } from "@/content/contact-form";

/**
 * CONTACT FORM (P13 · D-047) — bilingual enquiry form in an EXPLICIT
 * non-production integration state (D-010/O-009).
 *
 * No backend exists and nothing pretends one does: the status line says
 * so, and a valid submission composes the visitor's message in their
 * OWN email or WhatsApp app (approved channels — the visitor sends it
 * themselves). Client-side validation is accessible (per-field errors,
 * aria-describedby, focus moves to the first invalid field). Fields are
 * owner-editable data (contact-form.ts); the topic select offers the
 * approved solution families. When a real integration is configured
 * later, this component switches to genuine submission — no redesign.
 */
export function ContactForm() {
  const locale = useLocale() as Locale;
  const t = useTranslations("form");
  const contact = getContact();
  const families = getSolutionFamilies();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): Record<string, string> | null => {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    for (const f of contactFormFields) {
      const value = String(data.get(f.id) ?? "").trim();
      if (f.required && !value) errs[f.id] = t("errRequired");
      else if (f.id === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        errs[f.id] = t("errEmail");
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return null;
    }
    return Object.fromEntries(
      contactFormFields.map((f) => [f.id, String(data.get(f.id) ?? "").trim()]),
    );
  };

  const composeBody = (data: Record<string, string>) =>
    contactFormFields
      .filter((f) => data[f.id])
      .map((f) => `${t(f.id)}: ${data[f.id]}`)
      .join("\n");

  const sendEmail = () => {
    const data = validate();
    if (!data) return;
    const subject = `${t("subjectPrefix")} — ${data.name}`;
    location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeBody(data))}`;
  };

  const sendWhatsapp = () => {
    const data = validate();
    if (!data) return;
    const digits = contact.whatsapp?.replace(/[^\d]/g, "") ?? "";
    window.open(
      `https://wa.me/${digits}?text=${encodeURIComponent(`${t("subjectPrefix")}\n${composeBody(data)}`)}`,
      "_blank",
      "noopener",
    );
  };

  const err = (id: string) =>
    errors[id] ? (
      <p id={`err-${id}`} className="form-error" role="alert">
        {errors[id]}
      </p>
    ) : null;
  const aria = (id: string) =>
    errors[id] ? { "aria-invalid": true as const, "aria-describedby": `err-${id}` } : {};

  const optional = (required: boolean) =>
    required ? null : <span className="form-optional microlabel">({t("optional")})</span>;

  const field = (f: (typeof contactFormFields)[number]) => {
    const label = (
      <label htmlFor={`cf-${f.id}`} className="form-label">
        {t(f.id)} {optional(f.required)}
      </label>
    );
    if (f.id === "message")
      return (
        <div key={f.id} className="form-row form-row-full">
          {label}
          <textarea id={`cf-${f.id}`} name={f.id} rows={5} className="form-input" {...aria(f.id)} />
          {err(f.id)}
        </div>
      );
    if (f.id === "topic")
      return (
        <div key={f.id} className="form-row">
          {label}
          <select id={`cf-${f.id}`} name={f.id} className="form-input" {...aria(f.id)}>
            <option value="">{t("topicGeneral")}</option>
            {families.map((fam) => (
              <option key={fam.id} value={localize(fam.name, locale)}>
                {localize(fam.name, locale)}
              </option>
            ))}
          </select>
          {err(f.id)}
        </div>
      );
    const type = f.id === "email" ? "email" : f.id === "phone" ? "tel" : "text";
    return (
      <div key={f.id} className="form-row">
        {label}
        <input
          id={`cf-${f.id}`}
          name={f.id}
          type={type}
          dir={f.id === "phone" ? "ltr" : undefined}
          className="form-input"
          autoComplete={f.id === "email" ? "email" : f.id === "phone" ? "tel" : f.id === "name" ? "name" : "organization"}
          {...aria(f.id)}
        />
        {err(f.id)}
      </div>
    );
  };

  return (
    <form
      ref={formRef}
      className="contact-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        // no backend (integration null): the primary action is email compose
        if (!contactFormIntegration) sendEmail();
      }}
    >
      <p className="smartai-status microlabel" role="status">
        <span aria-hidden="true" className="smartai-status-dot" />
        {t("status")}
      </p>
      <div className="form-grid">{contactFormFields.map(field)}</div>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink"
        >
          {t("sendEmail")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={sendWhatsapp}
          className="rounded border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {t("sendWhatsapp")}
        </button>
      </div>
    </form>
  );
}
