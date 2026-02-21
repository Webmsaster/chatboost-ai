"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Calendar,
  BarChart3,
  MessageCircle,
  Shield,
  Zap,
  Languages,
  UserCheck,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Website-Integration",
    description: "Widget-Code per Copy/Paste in jede Website einbetten – in unter 5 Minuten live.",
  },
  {
    icon: Calendar,
    title: "Terminbuchung",
    description: "Nahtlose Integration mit Calendly oder Cal.com für automatische Terminvergabe.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Monatliches Reporting mit Leads, Conversions und Chat-Statistiken.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integration",
    description: "Dein Chatbot auch auf WhatsApp – dort wo deine Kunden schon sind.",
  },
  {
    icon: Shield,
    title: "DSGVO-konform",
    description: "Datenschutz nach europäischen Standards. Daten bleiben sicher.",
  },
  {
    icon: Zap,
    title: "GPT-4o Powered",
    description: "Neueste KI-Technologie für natürliche, menschenähnliche Konversationen.",
  },
  {
    icon: Languages,
    title: "Mehrsprachig",
    description: "Chatbot spricht Deutsch & Englisch – perfekt für internationale Kunden.",
  },
  {
    icon: UserCheck,
    title: "Lead-Scoring",
    description: "Automatische Qualifizierung: Erkenne sofort deine besten Leads.",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-4 py-1.5 text-sm text-accent-400">
            Features
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Alles was du <span className="text-gradient">brauchst</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Von der Installation bis zum Reporting – wir kümmern uns um alles.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-brand-500/20"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 transition-colors group-hover:from-brand-500/30 group-hover:to-accent-500/30">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
