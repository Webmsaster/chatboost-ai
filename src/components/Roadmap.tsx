"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Rocket, TrendingUp } from "lucide-react";

const phases = [
  {
    icon: CheckCircle2,
    month: "Monat 1",
    title: "Fundament",
    emoji: "✅",
    color: "from-emerald-500 to-green-600",
    borderColor: "border-emerald-500/20",
    items: [
      "Tech Stack einrichten (Chatbase, Calendly, Stripe)",
      "3 Demo-Bots erstellen (Makler, Salon, Restaurant)",
      "Landing Page erstellen",
      "Erste 10 Kaltakquise-Nachrichten senden",
      "1–2 kostenlose Test-Kunden gewinnen",
    ],
  },
  {
    icon: Rocket,
    month: "Monat 2",
    title: "Erste Umsätze",
    emoji: "🚀",
    color: "from-brand-500 to-purple-600",
    borderColor: "border-brand-500/20",
    items: [
      "Erstes bezahltes Paket abschließen",
      "Prozess dokumentieren (SOP für Bot-Setup)",
      "Testimonial/Case Study einholen",
      "Instagram/LinkedIn Content starten",
    ],
  },
  {
    icon: TrendingUp,
    month: "Monat 3",
    title: "Skalierung",
    emoji: "📈",
    color: "from-accent-500 to-cyan-600",
    borderColor: "border-accent-500/20",
    items: [
      "5+ bezahlte Kunden",
      "Erste Google Ads Kampagne (50–100 € Budget)",
      "Retainer-Modell fest etablieren",
      "Preise anpassen / Upsell anbieten",
    ],
  },
];

export default function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="roadmap" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-sm text-brand-300">
            90-Tage Plan
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Deine <span className="text-gradient">Launch-Roadmap</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            In 90 Tagen von Null auf profitables Chatbot-Business.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-gradient-to-b from-brand-500/40 via-accent-500/40 to-transparent lg:block" />

          <div className="space-y-8 lg:space-y-12">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.month}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                className="relative flex gap-8"
              >
                {/* Timeline dot */}
                <div className="hidden lg:block">
                  <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${phase.color} shadow-lg`}>
                    <phase.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 overflow-hidden rounded-2xl border ${phase.borderColor} bg-white/[0.02] p-8 backdrop-blur-sm`}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${phase.color} lg:hidden`}>
                      <phase.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-white/30">{phase.month}</div>
                      <h3 className="text-xl font-bold text-white">
                        {phase.emoji} {phase.title}
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {phase.items.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-400/60" />
                        <span className="text-sm text-white/50">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
