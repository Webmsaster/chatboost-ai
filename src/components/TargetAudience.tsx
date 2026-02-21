"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Scissors, UtensilsCrossed, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: Home,
    title: "Immobilienmakler",
    emoji: "🏠",
    problem: "Leads gehen verloren, kein 24/7-Service",
    solution: "Bot qualifiziert Leads automatisch und bucht Besichtigungstermine",
    color: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/20",
    borderColor: "border-violet-500/20",
    stats: "+340% mehr qualifizierte Leads",
  },
  {
    icon: Scissors,
    title: "Salons & Friseure",
    emoji: "💇",
    problem: "Telefon klingelt ständig, Termine werden vergessen",
    solution: "Bot nimmt Terminbuchungen an und sendet automatische Reminder",
    color: "from-pink-500 to-rose-600",
    shadowColor: "shadow-pink-500/20",
    borderColor: "border-pink-500/20",
    stats: "87% weniger No-Shows",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafés",
    emoji: "🍕",
    problem: "Reservierungen, Tischfragen, Speisekarte – immer die gleichen Fragen",
    solution: "Bot beantwortet FAQs und nimmt Reservierungen rund um die Uhr entgegen",
    color: "from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/20",
    borderColor: "border-amber-500/20",
    stats: "60% weniger Telefonanrufe",
  },
];

export default function TargetAudience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="zielgruppe" className="relative py-24 lg:py-32" ref={ref}>
      {/* Section bg accent */}
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
            Zielgruppe
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Für wen ist das <span className="text-gradient">perfekt?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Lokale Unternehmen, die Kunden gewinnen und ihre Erreichbarkeit auf 24/7 erweitern wollen.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`group relative overflow-hidden rounded-2xl border ${item.borderColor} bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-opacity-40`}
            >
              {/* Gradient top accent */}
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${item.color} opacity-40`} />

              {/* Icon */}
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} ${item.shadowColor} shadow-lg`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-white">
                {item.emoji} {item.title}
              </h3>

              {/* Problem */}
              <div className="mb-4 rounded-xl bg-red-500/5 border border-red-500/10 p-3">
                <div className="text-xs font-medium uppercase tracking-wider text-red-400/70 mb-1">Problem</div>
                <p className="text-sm text-white/50">{item.problem}</p>
              </div>

              {/* Solution */}
              <div className="mb-6 rounded-xl bg-green-500/5 border border-green-500/10 p-3">
                <div className="text-xs font-medium uppercase tracking-wider text-green-400/70 mb-1">Lösung</div>
                <p className="text-sm text-white/60">{item.solution}</p>
              </div>

              {/* Stat */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gradient">{item.stats}</span>
                <ArrowRight className="h-4 w-4 text-white/20 transition-all group-hover:text-white/60 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
