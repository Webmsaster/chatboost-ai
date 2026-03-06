export default function StructuredData({ locale = "de" }: { locale?: string }) {
  const isEn = locale === "en";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ChatBoost AI",
    description: isEn
      ? "Done-for-You AI chatbot service for local businesses. Installation, configuration & maintenance – all from one source."
      : "Done-for-You AI-Chatbot-Service für lokale Unternehmen. Installation, Konfiguration & Wartung – alles aus einer Hand.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://chatboost-ai.de"}/${locale}`,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    telephone: (process.env.NEXT_PUBLIC_CONTACT_PHONE || "").replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kummern 9",
      addressLocality: "Westendorf",
      postalCode: "6363",
      addressCountry: "AT",
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
    ],
    priceRange: "€€",
    serviceType: isEn ? "AI Chatbot Service" : "KI-Chatbot Service",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: isEn
      ? [
          {
            "@type": "Question",
            name: "Do I need technical knowledge?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, not at all. We take care of everything – from configuration to installation. You get a ready-made widget code that you embed into your website via copy/paste.",
            },
          },
          {
            "@type": "Question",
            name: "How long does the setup take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Usually 24–48 hours. After a short briefing call, we configure your bot and deliver it ready to go.",
            },
          },
          {
            "@type": "Question",
            name: "Is it GDPR compliant?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100%. All data is processed according to European data protection standards.",
            },
          },
          {
            "@type": "Question",
            name: "Can I customize the bot for my business?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. We customize tone, language and responses individually for your business.",
            },
          },
          {
            "@type": "Question",
            name: "Can I cancel the service at any time?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Our contracts are cancellable monthly, with no minimum term.",
            },
          },
        ]
      : [
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
