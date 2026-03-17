"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Props = {
  plan: string;
  amount: number;
};

export default function SuccessContent({ plan, amount }: Props) {
  const t = useTranslations("Checkout");

  const planName = plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : "";
  const formattedAmount = amount
    ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount / 100)
    : "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030014] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl border border-green-500/20 bg-green-500/5 p-10 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t("successTitle")}</h1>
        {planName && (
          <p className="mt-2 text-sm font-medium text-green-400">
            {planName} {formattedAmount ? `– ${formattedAmount}` : ""}
          </p>
        )}
        <p className="mt-3 text-sm text-white/40">{t("successDescription")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110"
        >
          {t("backHome")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
