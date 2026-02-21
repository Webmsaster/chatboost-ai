import type { Metadata } from "next";
import Link from "next/link";
import { Bot, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von ChatBoost AI – Informationen zum Umgang mit personenbezogenen Daten gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#030014] relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Gradient orb */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-brand-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
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
              Zurück
            </Link>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Datenschutzerklärung
          </h1>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
          <p className="mt-4 text-white/40 text-sm">
            Stand: [Datum einfügen, z.B. Februar 2026]
          </p>
        </header>

        {/* Content */}
        <div className="space-y-10 text-white/70 leading-relaxed">
          {/* 1. Verantwortlicher */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              1. Verantwortlicher
            </h2>
            <div className="glass rounded-2xl p-6 space-y-1">
              <p className="text-white/90 font-medium">ChatBoost AI</p>
              <p>[Dein Name / Firmenname]</p>
              <p>[Straße Hausnummer]</p>
              <p>[PLZ Ort]</p>
              <p className="mt-2">
                E-Mail:{" "}
                <a
                  href="mailto:hello@chatboost-ai.de"
                  className="text-brand-300 hover:text-brand-200 transition-colors"
                >
                  hello@chatboost-ai.de
                </a>
              </p>
            </div>
            <p className="mt-4">
              Verantwortliche Stelle ist die natürliche oder juristische
              Person, die allein oder gemeinsam mit anderen über die Zwecke
              und Mittel der Verarbeitung von personenbezogenen Daten (z.B.
              Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>
          </section>

          {/* 2. Erhebung und Speicherung */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              2. Erhebung und Speicherung personenbezogener Daten sowie Art
              und Zweck von deren Verwendung
            </h2>

            <h3 className="mb-3 text-lg font-medium text-white/90">
              a) Beim Besuch der Website
            </h3>
            <p>
              Beim Aufrufen unserer Website werden durch den auf Ihrem
              Endgerät zum Einsatz kommenden Browser automatisch
              Informationen an den Server unserer Website gesendet. Diese
              Informationen werden temporär in einem sog. Logfile
              gespeichert. Folgende Informationen werden dabei ohne Ihr
              Zutun erfasst und bis zur automatisierten Löschung
              gespeichert:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1 text-white/60">
              <li>IP-Adresse des anfragenden Rechners</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
              <li>
                Verwendeter Browser und ggf. das Betriebssystem Ihres
                Rechners sowie der Name Ihres Access-Providers
              </li>
            </ul>
            <p className="mt-3">
              Die genannten Daten werden durch uns zu folgenden Zwecken
              verarbeitet:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1 text-white/60">
              <li>
                Gewährleistung eines reibungslosen Verbindungsaufbaus der
                Website
              </li>
              <li>
                Gewährleistung einer komfortablen Nutzung unserer Website
              </li>
              <li>Auswertung der Systemsicherheit und -stabilität</li>
              <li>Zu weiteren administrativen Zwecken</li>
            </ul>
            <p className="mt-3">
              Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs.
              1 S. 1 lit. f DSGVO. Unser berechtigtes Interesse folgt aus
              den oben aufgelisteten Zwecken zur Datenerhebung.
            </p>

            <h3 className="mb-3 mt-6 text-lg font-medium text-white/90">
              b) Bei Nutzung unseres Kontaktformulars
            </h3>
            <p>
              Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit,
              mit uns über ein auf der Website bereitgestelltes Formular
              Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen
              E-Mail-Adresse erforderlich, damit wir wissen, von wem die
              Anfrage stammt und um diese beantworten zu können. Weitere
              Angaben können freiwillig getätigt werden.
            </p>
            <p className="mt-3">
              Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns
              erfolgt nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage
              Ihrer freiwillig erteilten Einwilligung. Die für die
              Benutzung des Kontaktformulars von uns erhobenen
              personenbezogenen Daten werden nach Erledigung der von Ihnen
              gestellten Anfrage automatisch gelöscht.
            </p>
          </section>

          {/* 3. Cookies */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              3. Cookies
            </h2>
            <p>
              Unsere Website verwendet grundsätzlich keine Cookies für
              Tracking- oder Werbezwecke. Wir setzen lediglich technisch
              notwendige Cookies ein, die für den Betrieb der Website
              erforderlich sind. Diese Cookies werden nach Ende Ihrer
              Browser-Sitzung automatisch gelöscht (sog. Session-Cookies).
            </p>
            <p className="mt-3">
              Die Rechtsgrundlage für die Verwendung technisch notwendiger
              Cookies ist Art. 6 Abs. 1 S. 1 lit. f DSGVO.
            </p>
          </section>

          {/* 4. Analyse-Tools */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              4. Analyse-Tools
            </h2>

            <h3 className="mb-3 text-lg font-medium text-white/90">
              Plausible Analytics
            </h3>
            <p>
              Wir nutzen Plausible Analytics, einen datenschutzfreundlichen
              Webanalysedienst. Plausible verwendet{" "}
              <span className="text-white/90 font-medium">keine Cookies</span>{" "}
              und erhebt keine personenbezogenen Daten. Es werden
              ausschließlich anonymisierte, aggregierte Daten erfasst, die
              keinen Rückschluss auf einzelne Besucher ermöglichen.
            </p>
            <p className="mt-3">
              Plausible ist vollständig DSGVO-konform und wird in der EU
              gehostet. Weitere Informationen finden Sie unter{" "}
              <a
                href="https://plausible.io/data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-brand-200 transition-colors underline underline-offset-2"
              >
                plausible.io/data-policy
              </a>
              .
            </p>
            <p className="mt-3">
              Die Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DSGVO.
              Unser berechtigtes Interesse liegt in der Analyse und
              Optimierung unserer Website.
            </p>
          </section>

          {/* 5. Chatbot */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              5. KI-Chatbot
            </h2>

            <h3 className="mb-3 text-lg font-medium text-white/90">
              Chatbot-Service (Chatbase / OpenAI)
            </h3>
            <p>
              Auf unserer Website und auf den Websites unserer Kunden setzen
              wir KI-basierte Chatbots ein. Diese werden über die
              Infrastruktur von Chatbase und/oder OpenAI betrieben.
            </p>

            <div className="glass rounded-2xl p-6 mt-4 space-y-3">
              <h4 className="text-white/90 font-medium">
                Welche Daten werden verarbeitet?
              </h4>
              <ul className="ml-6 list-disc space-y-1 text-white/60">
                <li>
                  Chat-Nachrichten, die Sie in das Chatfenster eingeben
                </li>
                <li>
                  Technische Daten (IP-Adresse, Browser-Typ, Zeitstempel)
                </li>
                <li>
                  Gegebenenfalls personenbezogene Daten, die Sie freiwillig
                  im Chat mitteilen (z.B. Name, E-Mail, Telefonnummer)
                </li>
              </ul>
            </div>

            <p className="mt-4">
              Die Chatverläufe werden zur Beantwortung Ihrer Anfrage und
              zur Verbesserung des Service verarbeitet. Die
              Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 S.
              1 lit. a DSGVO (Einwilligung) bzw. Art. 6 Abs. 1 S. 1 lit. f
              DSGVO (berechtigtes Interesse).
            </p>
            <p className="mt-3">
              Bitte beachten Sie, dass bei der Nutzung des Chatbots Daten
              an Server von OpenAI (USA) und/oder Chatbase übermittelt
              werden können. Die Übermittlung erfolgt auf Grundlage von
              Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
              Weitere Informationen finden Sie in den Datenschutzrichtlinien
              von{" "}
              <a
                href="https://openai.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-brand-200 transition-colors underline underline-offset-2"
              >
                OpenAI
              </a>{" "}
              und{" "}
              <a
                href="https://www.chatbase.co/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-brand-200 transition-colors underline underline-offset-2"
              >
                Chatbase
              </a>
              .
            </p>
          </section>

          {/* 6. Rechte der betroffenen Person */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              6. Ihre Rechte
            </h2>
            <p>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
              betreffenden personenbezogenen Daten:
            </p>

            <div className="glass rounded-2xl p-6 mt-4">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 15</span>
                  <span>Recht auf Auskunft</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 16</span>
                  <span>Recht auf Berichtigung</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 17</span>
                  <span>Recht auf Löschung (&bdquo;Recht auf Vergessenwerden&ldquo;)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 18</span>
                  <span>Recht auf Einschränkung der Verarbeitung</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 20</span>
                  <span>Recht auf Datenübertragbarkeit</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 21</span>
                  <span>Widerspruchsrecht</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 7 Abs. 3</span>
                  <span>Recht auf Widerruf der Einwilligung</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-semibold shrink-0">Art. 77</span>
                  <span>Recht auf Beschwerde bei einer Aufsichtsbehörde</span>
                </li>
              </ul>
            </div>

            <p className="mt-4">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben
              genannte verantwortliche Stelle.
            </p>
          </section>

          {/* 7. Widerspruch gegen Werbemails */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              7. Widerspruch gegen Werbemails
            </h2>
            <p>
              Der Nutzung von im Rahmen der Impressumspflicht
              veröffentlichten Kontaktdaten zur Übersendung von nicht
              ausdrücklich angeforderter Werbung und
              Informationsmaterialien wird hiermit widersprochen. Die
              Betreiber der Seiten behalten sich ausdrücklich rechtliche
              Schritte im Falle der unverlangten Zusendung von
              Werbeinformationen, etwa durch Spam-E-Mails, vor.
            </p>
          </section>

          {/* 8. SSL-Verschlüsselung */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              8. SSL- bzw. TLS-Verschlüsselung
            </h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen,
              die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
              Sie daran, dass die Adresszeile des Browsers von
              &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und
              an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p className="mt-3">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können
              die Daten, die Sie an uns übermitteln, nicht von Dritten
              mitgelesen werden.
            </p>
          </section>

          {/* 9. Aktualität */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              9. Aktualität und Änderung dieser Datenschutzerklärung
            </h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den
              Stand [Datum einfügen].
            </p>
            <p className="mt-3">
              Durch die Weiterentwicklung unserer Website und Angebote
              darüber oder aufgrund geänderter gesetzlicher
              beziehungsweise behördlicher Vorgaben kann es notwendig
              werden, diese Datenschutzerklärung zu ändern. Die jeweils
              aktuelle Datenschutzerklärung kann jederzeit auf der Website
              unter{" "}
              <Link
                href="/datenschutz"
                className="text-brand-300 hover:text-brand-200 transition-colors underline underline-offset-2"
              >
                chatboost-ai.de/datenschutz
              </Link>{" "}
              von Ihnen abgerufen und ausgedruckt werden.
            </p>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-16 border-t border-white/[0.06] pt-8">
          <p className="text-xs text-white/20 text-center">
            &copy; {new Date().getFullYear()} ChatBoost AI. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </main>
  );
}
