export default function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ChatBoost AI",
    description:
      "Done-for-You AI-Chatbot-Service für lokale Unternehmen. Installation, Konfiguration & Wartung – alles aus einer Hand.",
    url: "https://chatboost-ai.de",
    email: "info@chatboost-ai.de",
    telephone: "+4917647511466",
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    priceRange: "€€",
    serviceType: "KI-Chatbot Service",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Brauche ich technisches Vorwissen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nein, überhaupt nicht. Wir kümmern uns um alles – von der Konfiguration bis zur Installation. Du bekommst einen fertigen Widget-Code, den du per Copy/Paste in deine Website einbaust.",
        },
      },
      {
        "@type": "Question",
        name: "Wie lange dauert die Einrichtung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In der Regel 24–48 Stunden. Nach einem kurzen Briefing-Call konfigurieren wir deinen Bot und liefern ihn fertig aus.",
        },
      },
      {
        "@type": "Question",
        name: "Ist das DSGVO-konform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, zu 100%. Alle Daten werden nach europäischen Datenschutzstandards verarbeitet.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich den Bot an mein Unternehmen anpassen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolut. Wir passen Ton, Sprache und Antworten individuell an dein Unternehmen an.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich den Service jederzeit kündigen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja. Unsere Verträge sind monatlich kündbar, ohne Mindestlaufzeit.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
