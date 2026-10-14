"use client";

import { useState, type FormEvent } from "react";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string };

export default function ContactForm({ lang }: { lang: Lang }) {
  const f = getDict(lang).form;
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form).entries()), lang };
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || f.error);
      setStatus({ kind: "ok" });
      form.reset();
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : f.error });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field field--full">
        <label>{f.subject}</label>
        <div className="radio-row">
          {f.requestTypes.map((r, i) => (
            <label key={r}>
              <input type="radio" name="requestType" value={r} defaultChecked={i === 0} />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">
            {f.name} <span className="req">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="company">{f.company}</label>
          <input id="company" name="company" autoComplete="organization" maxLength={160} />
        </div>
        <div className="field">
          <label htmlFor="email">
            {f.email} <span className="req">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" maxLength={160} />
        </div>
        <div className="field">
          <label htmlFor="phone">{f.phone}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
        <div className="field">
          <label htmlFor="country">
            {f.country} <span className="req">*</span>
          </label>
          <input id="country" name="country" required maxLength={80} placeholder={f.countryPh} />
        </div>
        <div className="field">
          <label htmlFor="projectType">{f.projectType}</label>
          <select id="projectType" name="projectType" defaultValue="">
            <option value="" disabled>
              {f.select}
            </option>
            {f.projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="budget">{f.budget}</label>
          <select id="budget" name="budget" defaultValue="">
            <option value="" disabled>
              {f.select}
            </option>
            {f.budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="startDate">{f.start}</label>
          <input id="startDate" name="startDate" placeholder={f.startPh} maxLength={60} />
        </div>
        <div className="field field--full">
          <label htmlFor="message">
            {f.message} <span className="req">*</span>
          </label>
          <textarea id="message" name="message" required minLength={20} maxLength={5000} placeholder={f.messagePh} />
        </div>
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="website">{f.website}</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>{f.consent}</span>
      </label>

      {status.kind === "ok" && (
        <div className="form-status form-status--ok" role="status">
          {f.ok}
        </div>
      )}
      {status.kind === "error" && (
        <div className="form-status form-status--error" role="alert">
          {status.message}
        </div>
      )}

      <div>
        <button type="submit" className="btn btn--dark" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? f.sending : f.send} <ArrowRight />
        </button>
      </div>
    </form>
  );
}
