"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("Testimonials");

  const testimonials = [
    { key: "testimonial1", stars: 5 },
    { key: "testimonial2", stars: 5 },
    { key: "testimonial3", stars: 4 },
  ] as const;

  return (
    <section id="testimonials" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-sm text-brand-300">
            {t("badge")}
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            {t("description")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-brand-500/20"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                <Quote className="h-5 w-5 text-brand-400" />
              </div>

              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.stars }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="mb-6 text-sm leading-relaxed text-white/60">
                &ldquo;{t(`${item.key}.text`)}&rdquo;
              </p>

              <div className="mb-5 inline-flex items-center rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 text-xs font-medium text-green-400">
                {t(`${item.key}.result`)}
              </div>

              <div className="flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-sm font-bold text-brand-300">
                  {t(`${item.key}.name`).charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t(`${item.key}.name`)}</div>
                  <div className="text-xs text-white/40">{t(`${item.key}.role`)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { value: "15+", label: t("stat1Label") },
            { value: "4.8/5", label: t("stat2Label") },
            { value: "95%", label: t("stat3Label") },
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
