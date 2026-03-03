"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Scissors, UtensilsCrossed, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TargetAudience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("TargetAudience");

  const audiences = [
    {
      icon: Home,
      title: t("realEstate.title"),
      emoji: "\u{1F3E0}",
      problem: t("realEstate.problem"),
      solution: t("realEstate.solution"),
      color: "from-violet-500 to-purple-600",
      shadowColor: "shadow-violet-500/20",
      borderColor: "border-violet-500/20",
      stats: t("realEstate.stats"),
    },
    {
      icon: Scissors,
      title: t("salon.title"),
      emoji: "\u{1F487}",
      problem: t("salon.problem"),
      solution: t("salon.solution"),
      color: "from-pink-500 to-rose-600",
      shadowColor: "shadow-pink-500/20",
      borderColor: "border-pink-500/20",
      stats: t("salon.stats"),
    },
    {
      icon: UtensilsCrossed,
      title: t("restaurant.title"),
      emoji: "\u{1F355}",
      problem: t("restaurant.problem"),
      solution: t("restaurant.solution"),
      color: "from-amber-500 to-orange-600",
      shadowColor: "shadow-amber-500/20",
      borderColor: "border-amber-500/20",
      stats: t("restaurant.stats"),
    },
  ];

  return (
    <section id="zielgruppe" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/5 to-transparent" />

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
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`group relative overflow-hidden rounded-2xl border ${item.borderColor} bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-opacity-40`}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${item.color} opacity-40`} />
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} ${item.shadowColor} shadow-lg`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                {item.emoji} {item.title}
              </h3>
              <div className="mb-4 rounded-xl bg-red-500/5 border border-red-500/10 p-3">
                <div className="text-xs font-medium uppercase tracking-wider text-red-400/70 mb-1">{t("problemLabel")}</div>
                <p className="text-sm text-white/50">{item.problem}</p>
              </div>
              <div className="mb-6 rounded-xl bg-green-500/5 border border-green-500/10 p-3">
                <div className="text-xs font-medium uppercase tracking-wider text-green-400/70 mb-1">{t("solutionLabel")}</div>
                <p className="text-sm text-white/60">{item.solution}</p>
              </div>
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
