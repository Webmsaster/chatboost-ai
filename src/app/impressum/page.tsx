import type { Metadata } from "next";
import Link from "next/link";
import { Bot, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von ChatBoost AI – Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
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
            Impressum
          </h1>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
        </header>

        {/* Content */}
        <div className="space-y-10 text-white/70 leading-relaxed">
          {/* Angaben gemäß § 5 TMG */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="glass rounded-2xl p-6 space-y-1">
              <p className="text-white/90 font-medium">ChatBoost AI</p>
              <p>[Dein Name / Firmenname]</p>
              <p>[Straße Hausnummer]</p>
              <p>[PLZ Ort]</p>
            </div>
          </section>

          {/* Vertreten durch */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Vertreten durch
            </h2>
            <div className="glass rounded-2xl p-6">
              <p>[Dein Name]</p>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Kontakt
            </h2>
            <div className="glass rounded-2xl p-6 space-y-1">
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:hello@chatboost-ai.de"
                  className="text-brand-300 hover:text-brand-200 transition-colors"
                >
                  hello@chatboost-ai.de
                </a>
              </p>
              <p>Telefon: [Deine Telefonnummer]</p>
            </div>
          </section>

          {/* Umsatzsteuer-ID */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <div className="glass rounded-2xl p-6">
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
              </p>
              <p className="mt-1">[Deine USt-IdNr. z.B. DE123456789]</p>
            </div>
          </section>

          {/* Haftung für Inhalte */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
              möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend
              entfernen.
            </p>
          </section>

          {/* Haftung für Links */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir
              für diese fremden Inhalte auch keine Gewähr übernehmen. Für
              die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich. Die
              verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
              waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-3">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten
              ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
              nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          {/* Urheberrecht */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke
              auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
              der schriftlichen Zustimmung des jeweiligen Autors bzw.
              Erstellers. Downloads und Kopien dieser Seite sind nur für
              den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-3">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber
              erstellt wurden, werden die Urheberrechte Dritter beachtet.
              Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
              Sollten Sie trotzdem auf eine Urheberrechtsverletzung
              aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
              Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
              Inhalte umgehend entfernen.
            </p>
          </section>

          {/* Streitschlichtung */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-brand-200 transition-colors underline underline-offset-2"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              .
            </p>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
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
