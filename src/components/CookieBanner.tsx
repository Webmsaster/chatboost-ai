"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Cookie, X } from "lucide-react";
import { useTranslations } from "next-intl";

const CONSENT_KEY = "chatboost-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("CookieBanner");

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("cookie-consent-change"));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    window.dispatchEvent(new Event("cookie-consent-change"));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.08] bg-[#0c0c1d]/95 p-5 shadow-2xl shadow-brand-900/20 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10">
                  <Cookie className="h-4 w-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-white/60">
                    {t("text")}{" "}
                    <Link
                      href="/datenschutz"
                      className="text-brand-400 underline underline-offset-2 transition-colors hover:text-brand-300"
                    >
                      {t("learnMore")}
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={decline}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white/70"
                >
                  {t("decline")}
                </button>
                <button
                  onClick={accept}
                  className="rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:shadow-brand-500/30 hover:brightness-110"
                >
                  {t("accept")}
                </button>
              </div>

              <button
                onClick={decline}
                className="absolute right-3 top-3 rounded-lg p-1 text-white/20 transition-colors hover:bg-white/5 hover:text-white/40 sm:static"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
