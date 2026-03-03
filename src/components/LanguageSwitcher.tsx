"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "de" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  const otherLocale = locale === "de" ? "en" : "de";

  return (
    <button
      onClick={() => switchLocale(otherLocale)}
      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-all hover:bg-white/5 hover:text-white"
      aria-label={`Switch to ${otherLocale === "de" ? "German" : "English"}`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium uppercase">{otherLocale}</span>
    </button>
  );
}
