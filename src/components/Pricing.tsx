"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Star, ArrowRight, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("Pricing");
  const locale = useLocale();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      key: "starter",
      setup: "399",
      monthly: "79",
      featureCount: 5,
      popular: false,
      color: "border-white/[0.06]",
      buttonStyle: "border border-white/10 text-white/70 hover:bg-white/5 hover:text-white",
    },
    {
      key: "pro",
      setup: "799",
      monthly: "149",
      featureCount: 6,
      popular: true,
      color: "border-brand-500/30",
      buttonStyle: "bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:brightness-110",
    },
    {
      key: "premium",
      setup: "1.499",
      monthly: "249",
      featureCount: 6,
      popular: false,
      color: "border-white/[0.06]",
      buttonStyle: "border border-white/10 text-white/70 hover:bg-white/5 hover:text-white",
    },
  ] as const;

  const handleCheckout = async (planKey: string) => {
    setLoadingPlan(planKey);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, locale }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        // Stripe not configured – fall back to contact section
        window.location.href = "#kontakt";
      }
    } catch {
      window.location.href = "#kontakt";
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="preise" className="relative py-24 lg:py-32" ref={ref}>
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

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`relative overflow-hidden rounded-2xl border ${plan.color} bg-white/[0.02] backdrop-blur-sm ${
                plan.popular ? "lg:scale-105 lg:-my-4" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute inset-x-0 top-0">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-1.5 rounded-b-xl bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                      <Star className="h-3 w-3" />
                      {t("popular")}
                    </div>
                  </div>
                </div>
              )}

              {plan.popular && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-500 to-accent-500" />
              )}

              <div className="p-8">
                <h3 className="text-lg font-semibold text-white">{t(`${plan.key}.name`)}</h3>
                <p className="mt-2 text-sm text-white/40">{t(`${plan.key}.description`)}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.setup} &euro;</span>
                  <span className="text-sm text-white/30">{t("oneTime")}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-brand-400">+ {plan.monthly} &euro;</span>
                  <span className="text-sm text-white/30">{t("perMonth")}</span>
                </div>

                <button
                  onClick={() => handleCheckout(plan.key)}
                  disabled={loadingPlan !== null}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all disabled:opacity-70 ${plan.buttonStyle}`}
                >
                  {loadingPlan === plan.key ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {t("cta")}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="mt-8 space-y-3">
                  {Array.from({ length: plan.featureCount }).map((_, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      <span className="text-sm text-white/50">{t(`${plan.key}.feature${j + 1}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-brand-500/10 bg-brand-500/5 px-6 py-4">
            <span className="text-2xl">{"\u{1F4A1}"}</span>
            <p className="text-sm text-white/50">
              <strong className="text-white">{t("tipLabel")}</strong> {t("tipText", { amount: t("tipAmount") })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
