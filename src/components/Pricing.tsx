"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    setup: "399",
    monthly: "79",
    description: "Perfekt zum Einstieg. Dein erster KI-Chatbot live auf deiner Website.",
    features: [
      "Chatbot-Installation auf der Website",
      "5 angepasste FAQ-Antworten",
      "Kontaktformular-Integration",
      "E-Mail-Benachrichtigung bei Leads",
      "1x monatlicher Review-Call (30 Min.)",
    ],
    popular: false,
    color: "border-white/[0.06]",
    buttonStyle: "border border-white/10 text-white/70 hover:bg-white/5 hover:text-white",
  },
  {
    name: "Pro",
    setup: "799",
    monthly: "149",
    description: "Für Unternehmen, die wachsen wollen. Volle Automatisierung.",
    features: [
      "Alles aus Starter",
      "Terminbuchungs-Integration (Calendly / Cal.com)",
      "CRM-Anbindung (z.B. HubSpot)",
      "WhatsApp-Integration",
      "Bis zu 20 angepasste Flows",
      "Monatliches Reporting-Dashboard",
    ],
    popular: true,
    color: "border-brand-500/30",
    buttonStyle: "bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:brightness-110",
  },
  {
    name: "Premium",
    setup: "1.499",
    monthly: "249",
    description: "Die Komplett-Lösung. Dein digitaler Top-Mitarbeiter.",
    features: [
      "Alles aus Pro",
      "Individuelle KI-Persona (Name, Ton, Avatar)",
      "Mehrsprachiger Bot (DE/EN)",
      "Lead-Scoring & auto. Qualifizierung",
      "Priority Support (24h Response)",
      "Quartals-Strategie-Call",
    ],
    popular: false,
    color: "border-white/[0.06]",
    buttonStyle: "border border-white/10 text-white/70 hover:bg-white/5 hover:text-white",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="preise" className="relative py-24 lg:py-32" ref={ref}>
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
            Preise
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Transparent & <span className="text-gradient">fair</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Einmalige Einrichtung + monatlicher Retainer. Keine versteckten Kosten.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`relative overflow-hidden rounded-2xl border ${plan.color} bg-white/[0.02] backdrop-blur-sm ${
                plan.popular ? "lg:scale-105 lg:-my-4" : ""
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute inset-x-0 top-0">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-1.5 rounded-b-xl bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                      <Star className="h-3 w-3" />
                      Beliebtestes Paket
                    </div>
                  </div>
                </div>
              )}

              {/* Gradient top line for popular */}
              {plan.popular && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-500 to-accent-500" />
              )}

              <div className="p-8">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-white/40">{plan.description}</p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.setup} €</span>
                  <span className="text-sm text-white/30">einmalig</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-brand-400">+ {plan.monthly} €</span>
                  <span className="text-sm text-white/30">/Monat</span>
                </div>

                {/* CTA */}
                <a
                  href="#kontakt"
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all ${plan.buttonStyle}`}
                >
                  Jetzt starten
                  <ArrowRight className="h-4 w-4" />
                </a>

                {/* Features */}
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      <span className="text-sm text-white/50">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-brand-500/10 bg-brand-500/5 px-6 py-4">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-white/50">
              <strong className="text-white">Tipp:</strong> 10 Pro-Kunden = <strong className="text-brand-300">1.490 €/Monat</strong> passives Einkommen – nur durch Retainer!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
