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
    title: locale === "de" ? "Impressum" : "Legal Notice",
    description:
      locale === "de"
        ? "Impressum von ChatBoost AI – Angaben gemäß § 5 ECG."
        : "Legal Notice of ChatBoost AI – Information according to § 5 ECG.",
  };
}

export default async function ImpressumPage({ params }: Props) {
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
            {locale === "de" ? "Impressum" : "Legal Notice"}
          </h1>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
        </header>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {locale === "de" ? "Angaben gemäß § 5 ECG" : "Information according to § 5 ECG"}
            </h2>
            <div className="glass rounded-2xl p-6 space-y-1">
              <p className="text-white/90 font-medium">ChatBoost AI</p>
              <p>Florian Pöll</p>
              <p>Kummern 9</p>
              <p>6363 Westendorf</p>
              <p>{locale === "de" ? "Österreich" : "Austria"}</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {locale === "de" ? "Kontakt" : "Contact"}
            </h2>
            <div className="glass rounded-2xl p-6 space-y-1">
              <p>
                E-Mail:{" "}
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} className="text-brand-300 hover:text-brand-200 transition-colors">
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
              </p>
              <p>{locale === "de" ? "Telefon" : "Phone"}: {process.env.NEXT_PUBLIC_CONTACT_PHONE}</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {locale === "de" ? "Haftung für Inhalte" : "Liability for Content"}
            </h2>
            <p>
              {locale === "de"
                ? "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 16 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich."
                : "The contents of our pages were created with the greatest care. However, we cannot guarantee the accuracy, completeness, and timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general laws under § 16 ECG."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {locale === "de" ? "Haftung für Links" : "Liability for Links"}
            </h2>
            <p>
              {locale === "de"
                ? "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen."
                : "Our website contains links to external third-party websites over whose content we have no control. Therefore, we cannot assume any liability for this external content."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {locale === "de" ? "Urheberrecht" : "Copyright"}
            </h2>
            <p>
              {locale === "de"
                ? "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers."
                : "The content and works on these pages created by the site operators are subject to copyright law. Reproduction, editing, distribution, and any kind of use beyond the limits of copyright law require the written consent of the respective author or creator."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {locale === "de" ? "Streitschlichtung" : "Dispute Resolution"}
            </h2>
            <p>
              {locale === "de"
                ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: "
                : "The European Commission provides a platform for online dispute resolution (ODR): "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-brand-200 transition-colors underline underline-offset-2"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
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
