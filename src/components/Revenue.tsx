"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Revenue() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("Revenue");

  const projections = [
    { monthKey: "month1", customers: 2, retainer: "158 \u20AC", setup: "1.198 \u20AC", total: "~1.356 \u20AC", progress: 23 },
    { monthKey: "month3", customers: 5, retainer: "545 \u20AC", setup: "1.598 \u20AC", total: "~2.143 \u20AC", progress: 36 },
    { monthKey: "month6", customers: 10, retainer: "1.490 \u20AC", setup: "1.998 \u20AC", total: "~3.488 \u20AC", progress: 58 },
    { monthKey: "month12", customers: 20, retainer: "2.980 \u20AC", setup: "2.998 \u20AC", total: "~5.978 \u20AC", progress: 100 },
  ] as const;

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5 text-sm text-green-400">
            <TrendingUp className="h-3.5 w-3.5" />
            {t("badge")}
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            {t("description")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projections.map((item, i) => (
            <motion.div
              key={item.monthKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <div className="mb-4 text-sm font-medium text-white/40">{t(item.monthKey)}</div>
              <div className="text-3xl font-bold text-white">{item.total}</div>
              <div className="mt-1 text-xs text-white/30">{t("totalRevenue")}</div>

              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">{t("customers")}</span>
                  <span className="font-semibold text-white">{item.customers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">{t("retainer")}</span>
                  <span className="font-medium text-brand-300">{item.retainer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">{t("oneTime")}</span>
                  <span className="font-medium text-accent-400">{item.setup}</span>
                </div>
              </div>

              <div className="mt-5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${item.progress}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
