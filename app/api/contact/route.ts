import { NextResponse } from "next/server";

/**
 * Réception des demandes de contact / devis.
 * - Si RESEND_API_KEY est défini (variables d'environnement Vercel), la demande est envoyée par e-mail via Resend.
 * - Sinon, la demande est validée et enregistrée dans les logs de la fonction (onglet « Logs » sur Vercel).
 */

type Payload = Record<string, unknown>;

const messages = {
  fr: {
    invalid: "Requête invalide.",
    required: "Merci de remplir les champs obligatoires.",
    email: "L'adresse e-mail semble invalide.",
    short: "Merci de décrire votre projet en quelques lignes (20 caractères minimum).",
    consent: "Merci d'accepter l'utilisation de vos informations.",
    failed: "L'envoi a échoué. Merci de nous écrire directement par e-mail.",
  },
  en: {
    invalid: "Invalid request.",
    required: "Please fill in the required fields.",
    email: "The email address seems invalid.",
    short: "Please describe your project in a few lines (at least 20 characters).",
    consent: "Please agree to the use of your information.",
    failed: "Sending failed. Please email us directly.",
  },
};

const str = (v: unknown, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: messages.en.invalid }, { status: 400 });
  }
  const m = body.lang === "fr" ? messages.fr : messages.en;

  // Pot de miel anti-robots : on répond « OK » sans rien traiter.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const data = {
    requestType: str(body.requestType, 80) || "Demande de devis",
    name: str(body.name, 120),
    company: str(body.company, 160),
    email: str(body.email, 160),
    phone: str(body.phone, 40),
    country: str(body.country, 80),
    projectType: str(body.projectType, 80),
    budget: str(body.budget, 40),
    startDate: str(body.startDate, 60),
    message: str(body.message, 5000),
    consent: body.consent === "on" || body.consent === true,
    lang: body.lang === "fr" ? "fr" : "en",
  };

  if (!data.name || !data.email || !data.country || !data.message) {
    return NextResponse.json({ error: m.required }, { status: 422 });
  }
  if (!isEmail(data.email)) {
    return NextResponse.json({ error: m.email }, { status: 422 });
  }
  if (data.message.length < 20) {
    return NextResponse.json({ error: m.short }, { status: 422 });
  }
  if (!data.consent) {
    return NextResponse.json({ error: m.consent }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.log("[contact] Nouvelle demande (e-mail non configuré) :", JSON.stringify(data));
    return NextResponse.json({ ok: true });
  }

  const rows: [string, string][] = [
    ["Objet", data.requestType],
    ["Nom", data.name],
    ["Société", data.company],
    ["E-mail", data.email],
    ["Téléphone", data.phone],
    ["Pays du projet", data.country],
    ["Type de projet", data.projectType],
    ["Budget", data.budget],
    ["Démarrage", data.startDate],
    ["Langue du site", data.lang.toUpperCase()],
  ];

  const html = `
    <h2 style="font-family:Arial,sans-serif">${esc(data.requestType)} — ${esc(data.name)}</h2>
    <table style="font-family:Arial,sans-serif;border-collapse:collapse">
      ${rows
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`)
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;white-space:pre-wrap;margin-top:20px">${esc(data.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "AQDOULUM <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `[Site web] ${data.requestType} — ${data.company || data.name} (${data.country})`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Erreur Resend :", res.status, await res.text());
      return NextResponse.json({ error: m.failed }, { status: 502 });
    }
  } catch (e) {
    console.error("[contact] Erreur réseau :", e);
    return NextResponse.json({ error: m.failed }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
