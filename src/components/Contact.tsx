"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("Contact");

  const FORMSPREE_URL = "https://formspree.io/f/mwvnzbdl";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    if (email) formData.set("_replyto", email.toString());

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        if (data?.errors) {
          setError(data.errors.map((err: { message: string }) => err.message).join(", "));
        } else {
          setError(t("formErrorGeneric"));
        }
      }
    } catch {
      setError(t("formErrorNetwork"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="kontakt" className="relative py-24 lg:py-32" ref={ref}>
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
            {t("title")} <span className="text-gradient">{t("titleHighlight")}</span> {t("titleSuffix")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            {t("description")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 lg:col-span-2"
          >
            <div>
              <h3 className="text-xl font-bold text-white">{t("talkTitle")}</h3>
              <p className="mt-2 text-sm text-white/40">{t("talkDescription")}</p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: t("emailLabel"), value: "info@chatboost-ai.de" },
                { icon: Phone, label: t("phoneLabel"), value: "+49 176 4751 1466" },
                { icon: MapPin, label: t("locationLabel"), value: t("locationValue") },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                    <item.icon className="h-5 w-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30">{item.label}</div>
                    <div className="text-sm font-medium text-white/70">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {[t("badge1"), t("badge2"), t("badge3")].map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-green-500/10 bg-green-500/5 px-3 py-1.5 text-xs text-green-400"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t("formSuccessTitle")}</h3>
                  <p className="mt-2 text-sm text-white/40">{t("formSuccessDescription")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} method="POST" className="space-y-5">
                  <input type="hidden" name="_subject" value={t("formSubject")} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-white/50">{t("formName")}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={t("formNamePlaceholder")}
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-white/50">{t("formEmail")}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={t("formEmailPlaceholder")}
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/50">{t("formIndustry")}</label>
                    <select
                      name="branche"
                      required
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/70 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
                    >
                      <option value="" className="bg-[#0c0c1d]">{t("formIndustryPlaceholder")}</option>
                      <option value="immobilien" className="bg-[#0c0c1d]">{t("formIndustryRealEstate")}</option>
                      <option value="salon" className="bg-[#0c0c1d]">{t("formIndustrySalon")}</option>
                      <option value="restaurant" className="bg-[#0c0c1d]">{t("formIndustryRestaurant")}</option>
                      <option value="andere" className="bg-[#0c0c1d]">{t("formIndustryOther")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/50">{t("formWebsite")}</label>
                    <input
                      type="url"
                      name="website"
                      placeholder={t("formWebsitePlaceholder")}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/50">{t("formMessage")}</label>
                    <textarea
                      name="nachricht"
                      rows={4}
                      placeholder={t("formMessagePlaceholder")}
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                    >
                      <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        {t("formSubmitting")}
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        {t("formSubmit")}
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
