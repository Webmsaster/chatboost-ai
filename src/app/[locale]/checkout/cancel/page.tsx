"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CheckoutCancel() {
  const t = useTranslations("Checkout");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030014] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.05]">
          <XCircle className="h-8 w-8 text-white/40" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t("cancelTitle")}</h1>
        <p className="mt-3 text-sm text-white/40">{t("cancelDescription")}</p>
        <Link
          href="/#preise"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3 text-sm font-semibold text-white/70 transition-all hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToPricing")}
        </Link>
      </motion.div>
    </div>
  );
}
