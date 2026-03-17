import { Resend } from "resend";

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendOrderConfirmation({
  email,
  plan,
  amount,
}: {
  email: string;
  plan: string;
  amount: number;
}) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set, skipping order confirmation email");
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@chatboost-ai.de";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "ChatBoost AI";
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
  const formattedAmount = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount / 100);

  await resend.emails.send({
    from: `${siteName} <${fromEmail}>`,
    to: email,
    subject: `Bestellbestätigung – ${siteName} ${planName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #1a1a2e; font-size: 24px;">Vielen Dank für deine Bestellung!</h1>
        <p style="color: #444; font-size: 16px; line-height: 1.6;">
          Wir haben deine Zahlung über <strong>${formattedAmount}</strong> für das
          <strong>${planName}-Paket</strong> erhalten.
        </p>
        <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <h2 style="color: #1a1a2e; font-size: 18px; margin-top: 0;">Wie geht es weiter?</h2>
          <ol style="color: #444; font-size: 15px; line-height: 1.8;">
            <li>Wir melden uns innerhalb von 24 Stunden bei dir</li>
            <li>Kurzes Briefing-Gespräch (15 Min.)</li>
            <li>Dein Chatbot wird konfiguriert und getestet</li>
            <li>Installation auf deiner Website</li>
          </ol>
        </div>
        <p style="color: #444; font-size: 16px; line-height: 1.6;">
          Bei Fragen erreichst du uns jederzeit unter
          <a href="mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@chatboost-ai.de"}" style="color: #6366f1;">
            ${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@chatboost-ai.de"}
          </a>
        </p>
        <p style="color: #888; font-size: 13px; margin-top: 40px;">
          – Dein ${siteName} Team
        </p>
      </div>
    `,
  });
}

export async function sendNewContactNotification({
  name,
  email,
  industry,
  message,
}: {
  name: string;
  email: string;
  industry?: string;
  message?: string;
}) {
  const resend = getResend();
  if (!resend) return;

  const notifyEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL;
  if (!notifyEmail) return;

  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@chatboost-ai.de";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "ChatBoost AI";

  await resend.emails.send({
    from: `${siteName} <${fromEmail}>`,
    to: notifyEmail,
    replyTo: email,
    subject: `Neue Anfrage von ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Neue Kontaktanfrage</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
          ${industry ? `<tr><td style="padding: 8px; font-weight: bold;">Branche:</td><td style="padding: 8px;">${industry}</td></tr>` : ""}
          ${message ? `<tr><td style="padding: 8px; font-weight: bold;">Nachricht:</td><td style="padding: 8px;">${message}</td></tr>` : ""}
        </table>
      </div>
    `,
  });
}
