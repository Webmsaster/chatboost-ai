"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("ComparisonTable");

  const features = [
    "availability",
    "leadQualification",
    "appointmentBooking",
    "multiLanguage",
    "scalability",
    "setupTime",
    "monthlyCost",
  ] as const;

  type CellValue = "check" | "x" | "minus" | string;

  const columns: { key: string; values: Record<(typeof features)[number], CellValue> }[] = [
    {
      key: "noBot",
      values: {
        availability: "x",
        leadQualification: "x",
        appointmentBooking: "x",
        multiLanguage: "x",
        scalability: "x",
        setupTime: t("noBot.setupTime"),
        monthlyCost: t("noBot.monthlyCost"),
      },
    },
    {
      key: "diy",
      values: {
        availability: "check",
        leadQualification: "minus",
        appointmentBooking: "minus",
        multiLanguage: "minus",
        scalability: "minus",
        setupTime: t("diy.setupTime"),
        monthlyCost: t("diy.monthlyCost"),
      },
    },
    {
      key: "chatboost",
      values: {
        availability: "check",
        leadQualification: "check",
        appointmentBooking: "check",
        multiLanguage: "check",
        scalability: "check",
        setupTime: t("chatboost.setupTime"),
        monthlyCost: t("chatboost.monthlyCost"),
      },
    },
  ];

  function renderCell(value: CellValue) {
    if (value === "check")
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
          <Check className="h-4 w-4 text-green-400" />
        </div>
      );
    if (value === "x")
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10">
          <X className="h-4 w-4 text-red-400" />
        </div>
      );
    if (value === "minus")
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500/10">
          <Minus className="h-4 w-4 text-yellow-400" />
        </div>
      );
    return <span className="text-sm text-white/60">{value}</span>;
  }

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6">
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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left text-sm font-medium text-white/30" />
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`p-4 text-center text-sm font-semibold ${
                      col.key === "chatboost"
                        ? "rounded-t-xl bg-brand-500/10 text-brand-300"
                        : "text-white/60"
                    }`}
                  >
                    {t(`${col.key}.name`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, i) => (
                <tr
                  key={feat}
                  className={i % 2 === 0 ? "bg-white/[0.01]" : ""}
                >
                  <td className="p-4 text-sm text-white/50">
                    {t(`feature.${feat}`)}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`p-4 text-center ${
                        col.key === "chatboost" ? "bg-brand-500/5" : ""
                      }`}
                    >
                      <div className="flex justify-center">
                        {renderCell(col.values[feat])}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
