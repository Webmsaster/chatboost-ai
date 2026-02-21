"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarCheck, Mail, Phone, ArrowRight, Loader2 } from "lucide-react";
import Script from "next/script";

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="termin" className="relative py-24 lg:py-32" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />

      {/* Calendly Scripts */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.css"
        strategy="lazyOnload"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-sm text-brand-300">
            <CalendarCheck className="h-4 w-4" />
            Termin buchen
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Lass uns{" "}
            <span className="text-gradient">sprechen</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Buche dir ein unverbindliches Erstgespräch und erfahre, wie ein
            KI-Chatbot dein Unternehmen voranbringt – in nur 15 Minuten.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Left: Contact alternative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm">
              <h3 className="mb-2 text-xl font-semibold text-white">
                Oder schreib uns direkt
              </h3>
              <p className="mb-6 text-sm text-white/40">
                Du möchtest lieber direkt Kontakt aufnehmen? Kein Problem –
                wir sind für dich da.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:info@chatboost-ai.de"
                  className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-brand-500/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 transition-colors group-hover:from-brand-500/30 group-hover:to-accent-500/30">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">E-Mail</p>
                    <p className="text-sm text-white/40">info@chatboost-ai.de</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-brand-400" />
                </a>

                <a
                  href="tel:+4917647511466"
                  className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-brand-500/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 transition-colors group-hover:from-brand-500/30 group-hover:to-accent-500/30">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Telefon</p>
                    <p className="text-sm text-white/40">+49 176 4751 1466</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-brand-400" />
                </a>
              </div>

              <div className="mt-6 rounded-xl border border-accent-500/10 bg-accent-500/5 p-4">
                <p className="text-sm text-accent-400">
                  Antwortzeit: In der Regel innerhalb von 24 Stunden.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Center + Right: Calendly Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
              {/* Loading skeleton */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/30">
                <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
                <p className="text-sm">Kalender wird geladen...</p>
              </div>
              <div
                className="calendly-inline-widget relative z-10"
                data-url="https://calendly.com/chatboost-ai/demo"
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
