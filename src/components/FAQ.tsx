"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Brauche ich technisches Vorwissen?",
    answer:
      "Nein, überhaupt nicht. Wir kümmern uns um alles – von der Konfiguration bis zur Installation. Du bekommst einen fertigen Widget-Code, den du per Copy/Paste in deine Website einbaust. Das dauert unter 5 Minuten.",
  },
  {
    question: "Wie lange dauert die Einrichtung?",
    answer:
      "In der Regel 24–48 Stunden. Nach einem kurzen Briefing-Call konfigurieren wir deinen Bot und liefern ihn fertig aus. Die Integration in deine Website ist dann in wenigen Minuten erledigt.",
  },
  {
    question: "Ist das DSGVO-konform?",
    answer:
      "Ja, zu 100%. Alle Daten werden nach europäischen Datenschutzstandards verarbeitet. Wir setzen auf sichere Server und transparente Datenverarbeitung. Ein entsprechender Hinweis wird im Chat-Widget angezeigt.",
  },
  {
    question: "Kann ich den Bot an mein Unternehmen anpassen?",
    answer:
      "Absolut. Wir passen Ton, Sprache und Antworten individuell an dein Unternehmen an. Im Premium-Paket bekommt dein Bot sogar einen eigenen Namen, Avatar und eine individuelle Persona.",
  },
  {
    question: "Was passiert, wenn der Bot eine Frage nicht beantworten kann?",
    answer:
      "Der Bot erkennt, wenn er an seine Grenzen stößt, und leitet die Anfrage automatisch an dich weiter – per E-Mail oder direkt in dein CRM. So geht kein Lead verloren.",
  },
  {
    question: "Kann ich den Service jederzeit kündigen?",
    answer:
      "Ja. Unsere Verträge sind monatlich kündbar, ohne Mindestlaufzeit. Wir sind überzeugt, dass du bleibst, weil du zufrieden bist – nicht weil du musst.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brand-300"
      >
        <span className="text-base font-medium text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/30 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-brand-400" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/50">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-sm text-brand-300">
            FAQ
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Häufige <span className="text-gradient">Fragen</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Alles was du wissen musst, bevor du startest.
          </p>
        </motion.div>

        {/* FAQ List */}
        {isInView && (
          <div className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 backdrop-blur-sm sm:px-8">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
