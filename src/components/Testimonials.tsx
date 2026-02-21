"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sandra M.",
    role: "Inhaberin, Haarsalon Bella",
    text: "Seit wir den Chatbot haben, klingelt das Telefon kaum noch – aber die Terminbücher sind voller als je zuvor. Die Kunden lieben es, rund um die Uhr buchen zu können.",
    stars: 5,
    result: "87% weniger No-Shows",
  },
  {
    name: "Thomas K.",
    role: "Immobilienmakler, RE/MAX Region",
    text: "Der Bot qualifiziert meine Leads automatisch und bucht Besichtigungstermine, während ich schlafe. Ich hätte nie gedacht, dass Automatisierung so einfach sein kann.",
    stars: 5,
    result: "3x mehr qualifizierte Leads",
  },
  {
    name: "Marco R.",
    role: "Geschäftsführer, Ristorante Da Marco",
    text: "Endlich muss mein Team nicht mehr ständig ans Telefon. Der Chatbot nimmt Reservierungen an und beantwortet Fragen zur Speisekarte – fehlerfrei und freundlich.",
    stars: 5,
    result: "60% weniger Anrufe",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-sm text-brand-300">
            Kundenstimmen
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Was unsere Kunden <span className="text-gradient">sagen</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Echte Ergebnisse von lokalen Unternehmen, die mit ChatBoost AI
            gewachsen sind.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-brand-500/20"
            >
              {/* Quote icon */}
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                <Quote className="h-5 w-5 text-brand-400" />
              </div>

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Result badge */}
              <div className="mb-5 inline-flex items-center rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 text-xs font-medium text-green-400">
                {item.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-sm font-bold text-brand-300">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {item.name}
                  </div>
                  <div className="text-xs text-white/40">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { value: "50+", label: "Zufriedene Kunden" },
            { value: "4.9/5", label: "Durchschnittsbewertung" },
            { value: "98%", label: "Weiterempfehlungsrate" },
          ].map((stat) => (
            <div key={stat.label} className="px-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
