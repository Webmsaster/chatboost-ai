export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "immobilienmakler-ki-chatbot",
    title: "Warum jeder Immobilienmakler einen KI-Chatbot braucht",
    description:
      "Leads gehen verloren, weil niemand um 22 Uhr ans Telefon geht. So änderst du das.",
    category: "Immobilien",
    date: "15. Feb 2026",
    readTime: "5 Min.",
    content: [
      "Du kennst das: Ein potenzieller Käufer entdeckt abends um 22 Uhr dein Exposé auf ImmoScout. Er hat Fragen – zur Lage, zum Preis, zur Besichtigung. Er klickt auf deine Website... und findet ein Kontaktformular. Vielleicht füllt er es aus. Wahrscheinlich nicht. Der Lead ist weg.",
      "Genau hier setzt ein KI-Chatbot an. Er ist rund um die Uhr verfügbar, beantwortet die häufigsten Fragen sofort und kann direkt einen Besichtigungstermin buchen – automatisch, ohne dass du einen Finger rühren musst.",
      "Die Zahlen sprechen für sich: Immobilienmakler, die KI-Chatbots einsetzen, berichten von bis zu 340% mehr qualifizierten Leads. Der Grund ist simpel – der Bot fängt Interessenten genau dann ab, wenn ihr Interesse am höchsten ist.",
      "Ein typischer Ablauf sieht so aus: Der Besucher kommt auf deine Website, der Chatbot begrüßt ihn freundlich und fragt, wonach er sucht. Er beantwortet Fragen zu verfügbaren Objekten, Preisen und Lagen. Wenn der Interessent ernsthaft ist, bucht der Bot direkt einen Besichtigungstermin in deinem Kalender.",
      "Das Beste: Du musst dafür kein Tech-Experte sein. Services wie ChatBoost AI übernehmen die komplette Einrichtung, Konfiguration und Wartung. Du bekommst einen fertigen Bot, der dein Unternehmen versteht und deine Kunden professionell betreut.",
      "Fazit: In einer Branche, in der Schnelligkeit über den Deal entscheidet, ist ein KI-Chatbot kein Luxus mehr – er ist ein Wettbewerbsvorteil. Wer zuerst antwortet, gewinnt den Kunden.",
    ],
  },
  {
    slug: "chatbot-vs-kontaktformular",
    title: "Chatbot vs. Kontaktformular: Was konvertiert besser?",
    description:
      "Wir haben beide Ansätze getestet. Die Ergebnisse sprechen für sich.",
    category: "Conversion",
    date: "12. Feb 2026",
    readTime: "4 Min.",
    content: [
      "Kontaktformulare sind seit Jahrzehnten der Standard auf Business-Websites. Aber seien wir ehrlich: Wann hast du selbst zuletzt ein Kontaktformular ausgefüllt und dich dabei gut gefühlt? Genau.",
      "Wir haben bei mehreren Kunden einen A/B-Test durchgeführt: Dieselbe Website, einmal mit klassischem Kontaktformular, einmal mit KI-Chatbot. Das Ergebnis nach 30 Tagen war eindeutig.",
      "Die Conversion-Rate mit Chatbot lag im Durchschnitt 2,7x höher als mit dem klassischen Formular. Warum? Der Chatbot senkt die Hemmschwelle. Statt Name, E-Mail, Telefon und Nachricht auszufüllen, tippt der Besucher einfach seine Frage ein – wie bei WhatsApp.",
      "Noch wichtiger: Die Qualität der Leads war besser. Der Chatbot stellt gezielte Rückfragen und filtert so automatisch unqualifizierte Anfragen heraus. Das spart dir Zeit, weil du nur noch mit ernsthaften Interessenten sprichst.",
      "Das heißt nicht, dass du dein Kontaktformular komplett abschaffen solltest. Die beste Strategie ist ein Hybrid-Ansatz: Der Chatbot als primärer Touchpoint, mit dem Formular als Fallback für Besucher, die lieber schreiben.",
      "Unser Tipp: Teste es selbst. Die meisten Chatbot-Anbieter bieten kostenlose Demos an. Schon nach wenigen Wochen wirst du den Unterschied in deinen Lead-Zahlen sehen.",
    ],
  },
  {
    slug: "restaurants-ki-chatbots-zeit-sparen",
    title: "5 Wege wie Restaurants mit KI-Chatbots Zeit sparen",
    description:
      "Von der Reservierung bis zur Speisekarte – so automatisierst du den Alltag.",
    category: "Gastronomie",
    date: "8. Feb 2026",
    readTime: "6 Min.",
    content: [
      "In der Gastronomie zählt jede Minute. Zwischen Mittagsservice und Abendgeschäft bleibt kaum Zeit, um Anrufe entgegenzunehmen, Reservierungen zu verwalten und immer wieder dieselben Fragen zu beantworten. Ein KI-Chatbot kann hier massiv entlasten.",
      "1. Automatische Reservierungen: Der häufigste Grund, warum Gäste anrufen? Tischreservierungen. Ein Chatbot nimmt diese rund um die Uhr entgegen – auch nachts und am Wochenende. Der Gast wählt Datum, Uhrzeit und Personenzahl, und die Buchung landet direkt in deinem System.",
      "2. Speisekarte & Allergene: \"Habt ihr glutenfreie Optionen?\" – \"Ist das Tiramisu laktosefrei?\" Diese Fragen bekommt jedes Restaurant täglich. Der Chatbot kennt deine Speisekarte und beantwortet Allergen-Fragen sofort und zuverlässig.",
      "3. Öffnungszeiten & Anfahrt: Klingt trivial, ist aber einer der häufigsten Gründe für Anrufe. Der Bot beantwortet das in Sekunden – inklusive Google-Maps-Link zur Anfahrt.",
      "4. Event-Anfragen & Gruppenreservierungen: Für Geburtstage, Firmenfeiern oder größere Gruppen sammelt der Chatbot alle relevanten Infos (Datum, Personenzahl, besondere Wünsche) und leitet sie gebündelt an dich weiter.",
      "5. Feedback & Bewertungen: Nach dem Besuch kann der Bot automatisch nach Feedback fragen und zufriedene Gäste bitten, eine Google-Bewertung zu hinterlassen. Das stärkt dein Online-Ranking mit minimalem Aufwand.",
      "Das Ergebnis: Restaurants, die KI-Chatbots einsetzen, berichten von bis zu 60% weniger Telefonanrufen. Das bedeutet mehr Zeit für das, was wirklich zählt – deine Gäste vor Ort.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
