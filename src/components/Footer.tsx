"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Bot, Heart } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Footer() {
  const t = useTranslations("Footer");

  const links = {
    [t("serviceTitle")]: [
      { label: t("features"), href: "#features" },
      { label: t("pricing"), href: "#preise" },
      { label: t("roadmap"), href: "#roadmap" },
      { label: t("requestDemo"), href: "#kontakt" },
    ],
    [t("industriesTitle")]: [
      { label: t("realEstate"), href: "#zielgruppe" },
      { label: t("salons"), href: "#zielgruppe" },
      { label: t("restaurants"), href: "#zielgruppe" },
    ],
    [t("legalTitle")]: [
      { label: t("imprint"), href: "/impressum" },
      { label: t("privacy"), href: "/datenschutz" },
    ],
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#020010]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">Chat</span>
                <span className="text-gradient">Boost</span>
                <span className="text-white/60 ml-0.5 text-sm font-medium">AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/30">
              {t("description")}
            </p>
            <div className="mt-6">
              <NewsletterSignup variant="inline" />
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-white/60">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="text-sm text-white/30 transition-colors hover:text-white/60"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-sm text-white/30 transition-colors hover:text-white/60"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:flex-row">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="flex items-center gap-1 text-xs text-white/20">
            {t("madeWith")} <Heart className="h-3 w-3 text-red-400" /> {t("madeIn")}
          </p>
        </div>
      </div>
    </footer>
  );
}
