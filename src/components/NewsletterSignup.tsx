"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  variant?: "inline" | "banner";
};

export default function NewsletterSignup({ variant = "inline" }: Props) {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const FORMSPREE_URL = formspreeId ? `https://formspree.io/f/${formspreeId}` : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set("email", email);
    formData.set("_type", "newsletter");
    formData.set("_subject", "New Newsletter Signup");

    try {
      const results = await Promise.allSettled([
        FORMSPREE_URL
          ? fetch(FORMSPREE_URL, { method: "POST", body: formData, headers: { Accept: "application/json" } })
          : Promise.resolve(null),
        fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }),
      ]);

      const formspreeOk = results[0].status === "fulfilled" && (results[0].value === null || results[0].value.ok);
      const dbOk = results[1].status === "fulfilled" && results[1].value.ok;

      if (formspreeOk || dbOk) {
        setSubmitted(true);
        setEmail("");
      } else {
        setError(t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "banner") {
    return (
      <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-accent-500/5 p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10">
            <Mail className="h-6 w-6 text-brand-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{t("bannerTitle")}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/40">
            {t("bannerDescription")}
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2 text-sm text-green-400"
            >
              <CheckCircle2 className="h-4 w-4" />
              {t("success")}
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t("placeholder")}
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand-500/40"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110 disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {t("subscribe")}
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
          {error && (
            <p className="mt-2 text-xs text-red-400">{error}</p>
          )}
        </div>
      </div>
    );
  }

  // Inline variant (for footer)
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-white/60">
        {t("inlineTitle")}
      </h4>
      {submitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-green-400"
        >
          <CheckCircle2 className="h-4 w-4" />
          {t("success")}
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t("placeholder")}
            className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand-500/40"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center rounded-lg bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-2 text-white transition-all hover:brightness-110 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      <p className="mt-2 text-xs text-white/20">{t("hint")}</p>
    </div>
  );
}
