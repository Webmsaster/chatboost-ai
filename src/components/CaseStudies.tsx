"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("CaseStudies");

  const cases = [
    {
      key: "case1",
      icon: "🏠",
      metricBefore: "~5",
      metricAfter: "22",
      metricLabel: t("case1.metricLabel"),
    },
    {
      key: "case2",
      icon: "💇",
      metricBefore: "45%",
      metricAfter: "8%",
      metricLabel: t("case2.metricLabel"),
    },
    {
      key: "case3",
      icon: "🍽️",
      metricBefore: "~120",
      metricAfter: "~45",
      metricLabel: t("case3.metricLabel"),
    },
  ] as const;

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
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
          {cases.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-brand-500/20"
            >
              <div className="mb-4 text-3xl">{item.icon}</div>

              <h3 className="mb-1 text-lg font-bold text-white">
                {t(`${item.key}.name`)}
              </h3>
              <p className="mb-4 text-xs text-white/30">
                {t(`${item.key}.industry`)}
              </p>
              <p className="mb-6 text-sm leading-relaxed text-white/50">
                {t(`${item.key}.description`)}
              </p>

              {/* Before / After metric */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-2 text-xs font-medium text-white/30 uppercase tracking-wider">
                  {item.metricLabel}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-xs text-white/30">{t("before")}</div>
                    <div className="text-lg font-bold text-white/50">
                      {item.metricBefore}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand-400" />
                  <div className="text-center">
                    <div className="text-xs text-green-400/70">{t("after")}</div>
                    <div className="text-lg font-bold text-green-400">
                      {item.metricAfter}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 text-xs font-medium text-green-400">
                {t(`${item.key}.result`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
