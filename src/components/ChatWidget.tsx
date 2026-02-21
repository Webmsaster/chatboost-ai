"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type Message = { role: "bot" | "user"; text: string };

const demoMessages: Message[] = [
  { role: "bot", text: "Hallo! 👋 Ich bin der ChatBoost AI Demo-Bot. Wie kann ich dir helfen?" },
];

const quickReplies = [
  "Was kostet das?",
  "Wie funktioniert das?",
  "Demo anfordern",
];

const exactResponses: Record<string, string> = {
  "Was kostet das?": "Unsere Pakete starten ab 399€ einmalig + 79€/Monat. Das Pro-Paket mit Terminbuchung und WhatsApp kostet 799€ + 149€/Monat. Soll ich dir mehr Details zeigen?",
  "Wie funktioniert das?": "Ganz einfach: 1) Du sagst uns, was dein Bot können soll. 2) Wir konfigurieren alles für dich. 3) Du bekommst einen Widget-Code für deine Website. Fertig! Alles in unter 48h.",
  "Demo anfordern": "Super! Scroll einfach nach unten zum Kontaktformular oder schreib uns direkt an info@chatboost-ai.de. Wir bauen dir kostenlos einen Demo-Bot!",
};

const keywordResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ["preis", "kosten", "teuer", "günstig", "paket", "tarif", "euro", "€"],
    response: "Wir bieten drei Pakete an: Starter (399€ + 79€/Monat), Pro (799€ + 149€/Monat) und Premium (1.499€ + 249€/Monat). Das Pro-Paket ist am beliebtesten! Scroll nach unten zu 'Preise' für alle Details.",
  },
  {
    keywords: ["termin", "buchen", "gespräch", "call", "beratung"],
    response: "Gerne! Du kannst dir direkt einen kostenlosen 15-Min-Call buchen. Scroll einfach runter zum Bereich 'Termin buchen' – da findest du unseren Kalender.",
  },
  {
    keywords: ["whatsapp", "messenger", "instagram"],
    response: "Ja, unser Pro- und Premium-Paket beinhaltet WhatsApp-Integration! Dein Chatbot ist dann nicht nur auf deiner Website, sondern auch auf WhatsApp erreichbar.",
  },
  {
    keywords: ["dsgvo", "datenschutz", "daten", "sicher"],
    response: "Datenschutz ist uns sehr wichtig. Alle unsere Chatbots sind DSGVO-konform. Die Daten werden sicher verarbeitet und wir halten uns strikt an europäische Datenschutzstandards.",
  },
  {
    keywords: ["immobilie", "makler", "wohnung", "haus"],
    response: "Für Immobilienmakler sind unsere Bots besonders effektiv: automatische Lead-Qualifizierung, Besichtigungstermine buchen und 24/7 Erreichbarkeit. Bis zu 340% mehr qualifizierte Leads!",
  },
  {
    keywords: ["restaurant", "gastro", "reservier", "tisch"],
    response: "Für Restaurants perfekt: automatische Reservierungen, Speisekarten-Infos, Allergene-Auskunft und Öffnungszeiten – alles rund um die Uhr. Bis zu 60% weniger Telefonanrufe!",
  },
  {
    keywords: ["salon", "friseur", "frisör", "haar", "beauty"],
    response: "Salons & Friseure lieben unsere Bots: Termine werden automatisch gebucht, Erinnerungen verschickt und No-Shows um bis zu 87% reduziert!",
  },
  {
    keywords: ["wie lange", "dauer", "schnell", "zeit"],
    response: "Von der Beauftragung bis zum fertigen Bot dauert es in der Regel 24–48 Stunden. Die Integration in deine Website ist dann in unter 5 Minuten erledigt!",
  },
  {
    keywords: ["hallo", "hi", "hey", "moin", "servus", "guten tag"],
    response: "Hallo! Schön, dass du da bist! Wie kann ich dir helfen? Du kannst mich alles rund um unsere KI-Chatbot-Services fragen.",
  },
  {
    keywords: ["danke", "super", "toll", "cool", "perfekt"],
    response: "Gerne! Wenn du noch Fragen hast, bin ich hier. Oder scroll einfach runter zum Kontaktformular, um direkt mit unserem Team zu sprechen.",
  },
];

function findResponse(input: string): string {
  if (exactResponses[input]) return exactResponses[input];

  const lower = input.toLowerCase();
  for (const entry of keywordResponses) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }

  return "Gute Frage! Damit ich dir die beste Antwort geben kann, kontaktiere uns gerne direkt über das Formular unten oder buche einen kostenlosen Beratungscall. Wir melden uns innerhalb von 24 Stunden!";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(demoMessages);
  const [input, setInput] = useState("");

  const addMessage = (text: string) => {
    const userMsg = { role: "user" as const, text };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botResponse = findResponse(text);
      setMessages((prev) => [...prev, { role: "bot" as const, text: botResponse }]);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input.trim());
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c1d]/95 shadow-2xl shadow-brand-900/30 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/5 bg-gradient-to-r from-brand-600/20 to-accent-500/10 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">ChatBoost AI</div>
                <div className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Live Demo
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md bg-gradient-to-r from-brand-500 to-brand-600 text-white"
                        : "rounded-bl-md bg-white/[0.06] text-white/80"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 border-t border-white/5 px-4 py-3">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => addMessage(reply)}
                    className="rounded-full border border-brand-500/20 bg-brand-500/5 px-3 py-1.5 text-xs text-brand-300 transition-colors hover:bg-brand-500/10"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/5 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Nachricht schreiben..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none"
                />
                <button
                  onClick={handleSend}
                  className="rounded-lg p-1.5 text-brand-400 transition-colors hover:bg-brand-500/10"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-accent-500 shadow-2xl shadow-brand-500/30 transition-shadow hover:shadow-brand-500/50"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-brand-500/20" />
        )}
      </motion.button>
    </div>
  );
}
