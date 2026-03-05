import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Bot, ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "de" ? "Datenschutzerklärung" : "Privacy Policy",
    description:
      locale === "de"
        ? "Datenschutzerklärung von ChatBoost AI – Informationen zum Umgang mit personenbezogenen Daten gemäß DSGVO."
        : "Privacy Policy of ChatBoost AI – Information on handling personal data in accordance with GDPR.",
  };
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const backLabel = locale === "de" ? "Zurück" : "Back";

  return (
    <main className="min-h-screen bg-[#030014] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-brand-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 py-12">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/25 transition-shadow group-hover:shadow-brand-500/40">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">Chat</span>
                <span className="text-gradient">Boost</span>
                <span className="text-white/60 ml-0.5 text-sm font-medium">AI</span>
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white/60 transition-all hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {locale === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
          </h1>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
          <p className="mt-4 text-white/40 text-sm">
            {locale === "de" ? "Stand: Februar 2026" : "Last updated: February 2026"}
          </p>
        </header>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              1. {locale === "de" ? "Verantwortlicher" : "Data Controller"}
            </h2>
            <div className="glass rounded-2xl p-6 space-y-1">
              <p className="text-white/90 font-medium">ChatBoost AI</p>
              <p>Florian Pöll</p>
              <p>Kummern 9</p>
              <p>6363 Westendorf</p>
              <p>{locale === "de" ? "Österreich" : "Austria"}</p>
              <p className="mt-2">
                E-Mail:{" "}
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} className="text-brand-300 hover:text-brand-200 transition-colors">
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <p className="mt-4">
              {locale === "de"
                ? "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet."
                : "The data controller is the natural or legal person who alone or jointly with others determines the purposes and means of processing personal data (e.g., names, email addresses, etc.)."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              2. {locale === "de" ? "Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung" : "Collection and Storage of Personal Data and Purpose of Use"}
            </h2>
            <h3 className="mb-3 text-lg font-medium text-white/90">
              a) {locale === "de" ? "Beim Besuch der Website" : "When visiting the website"}
            </h3>
            <p>
              {locale === "de"
                ? "Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert."
                : "When you visit our website, your browser automatically sends information to our website's server. This information is temporarily stored in a log file."}
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1 text-white/60">
              <li>{locale === "de" ? "IP-Adresse des anfragenden Rechners" : "IP address of the requesting device"}</li>
              <li>{locale === "de" ? "Datum und Uhrzeit des Zugriffs" : "Date and time of access"}</li>
              <li>{locale === "de" ? "Name und URL der abgerufenen Datei" : "Name and URL of the accessed file"}</li>
              <li>{locale === "de" ? "Website, von der aus der Zugriff erfolgt (Referrer-URL)" : "Website from which access was made (referrer URL)"}</li>
              <li>{locale === "de" ? "Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers" : "Browser used, operating system, and access provider name"}</li>
            </ul>
            <p className="mt-3">
              {locale === "de"
                ? "Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO."
                : "The legal basis for data processing is Art. 6(1)(f) GDPR."}
            </p>

            <h3 className="mb-3 mt-6 text-lg font-medium text-white/90">
              b) {locale === "de" ? "Bei Nutzung unseres Kontaktformulars" : "When using our contact form"}
            </h3>
            <p>
              {locale === "de"
                ? "Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website bereitgestelltes Formular Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können."
                : "For any questions, we offer you the option to contact us via a form on the website. A valid email address is required so we know who the request is from and can respond."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              3. Cookies
            </h2>
            <p>
              {locale === "de"
                ? "Unsere Website verwendet grundsätzlich keine Cookies für Tracking- oder Werbezwecke. Wir setzen lediglich technisch notwendige Cookies ein, die für den Betrieb der Website erforderlich sind."
                : "Our website does not use cookies for tracking or advertising purposes. We only use technically necessary cookies required for the operation of the website."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              4. {locale === "de" ? "Analyse-Tools" : "Analytics Tools"}
            </h2>
            <h3 className="mb-3 text-lg font-medium text-white/90">Plausible Analytics</h3>
            <p>
              {locale === "de"
                ? "Wir nutzen Plausible Analytics, einen datenschutzfreundlichen Webanalysedienst. Plausible verwendet keine Cookies und erhebt keine personenbezogenen Daten."
                : "We use Plausible Analytics, a privacy-friendly web analytics service. Plausible does not use cookies and does not collect personal data."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              5. {locale === "de" ? "KI-Chatbot" : "AI Chatbot"}
            </h2>
            <p>
              {locale === "de"
                ? "Auf unserer Website und auf den Websites unserer Kunden setzen wir KI-basierte Chatbots ein. Diese werden über die Infrastruktur von Chatbase und/oder OpenAI betrieben."
                : "On our website and our clients' websites, we use AI-based chatbots. These are operated via Chatbase and/or OpenAI infrastructure."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              6. {locale === "de" ? "Ihre Rechte" : "Your Rights"}
            </h2>
            <p>
              {locale === "de"
                ? "Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:"
                : "You have the following rights regarding your personal data:"}
            </p>
            <div className="glass rounded-2xl p-6 mt-4">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 15</span>
                  <span>{locale === "de" ? "Recht auf Auskunft" : "Right of access"}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 16</span>
                  <span>{locale === "de" ? "Recht auf Berichtigung" : "Right to rectification"}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 17</span>
                  <span>{locale === "de" ? "Recht auf Löschung" : "Right to erasure"}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 18</span>
                  <span>{locale === "de" ? "Recht auf Einschränkung der Verarbeitung" : "Right to restriction of processing"}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 20</span>
                  <span>{locale === "de" ? "Recht auf Datenübertragbarkeit" : "Right to data portability"}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 21</span>
                  <span>{locale === "de" ? "Widerspruchsrecht" : "Right to object"}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-8">
          <p className="text-xs text-white/20 text-center">
            &copy; {new Date().getFullYear()} ChatBoost AI. {locale === "de" ? "Alle Rechte vorbehalten." : "All rights reserved."}
          </p>
        </div>
      </div>
    </main>
  );
}
