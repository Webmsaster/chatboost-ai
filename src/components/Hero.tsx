"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageSquare, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Hero() {
  const t = useTranslations("Hero");

  const chatMessages = [
    { role: "bot", text: t("chatMsg1") },
    { role: "user", text: t("chatMsg2") },
    { role: "bot", text: t("chatMsg3") },
    { role: "user", text: t("chatMsg4") },
    { role: "bot", text: t("chatMsg5") },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-grid-pattern">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-600/20 blur-[120px] animate-float" />
        <div className="absolute top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-accent-500/15 blur-[100px] animate-float-delayed" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-brand-400/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-20 lg:flex-row lg:items-center lg:pt-40 lg:pb-32">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-white">{t("titleLine1")}</span>
              <br />
              <span className="text-gradient">{t("titleLine2")}</span>
              <br />
              <span className="text-white/80">{t("titleLine3")}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/50 lg:mx-0">
              {t("description")}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#kontakt"
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#preise"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 text-base font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                {t("ctaSecondary")}
              </a>
            </div>

            <div className="mt-14 flex items-center justify-center gap-8 lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={24} suffix="/7" />
                </div>
                <div className="text-xs text-white/40">{t("statAvailability")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={3} suffix="x" />
                </div>
                <div className="text-xs text-white/40">{t("statLeads")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {"<"}<AnimatedCounter value={5} suffix=" Min" />
                </div>
                <div className="text-xs text-white/40">{t("statResponseTime")}</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex-1 lg:mt-0 lg:pl-12"
        >
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-500/20 to-accent-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c1d]/80 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">ChatBoost AI</div>
                  <div className="flex items-center gap-1.5 text-xs text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Online
                  </div>
                </div>
                <div className="ml-auto">
                  <Zap className="h-4 w-4 text-brand-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3 p-5">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.4, duration: 0.4 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-md bg-gradient-to-r from-brand-500 to-brand-600 text-white"
                          : "rounded-bl-md bg-white/[0.06] text-white/80"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="absolute -right-6 -top-6 h-12 w-12 rounded-xl border border-brand-500/20 bg-brand-500/10 backdrop-blur-sm" />
            <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-lg border border-accent-500/20 bg-accent-500/10 backdrop-blur-sm" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent" />
    </section>
  );
}
