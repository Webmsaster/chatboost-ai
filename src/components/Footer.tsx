"use client";

import Link from "next/link";
import { Bot, Heart } from "lucide-react";

const links = {
  Service: [
    { label: "Features", href: "#features" },
    { label: "Preise", href: "#preise" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Demo anfordern", href: "#kontakt" },
  ],
  Branchen: [
    { label: "Immobilienmakler", href: "#zielgruppe" },
    { label: "Salons & Friseure", href: "#zielgruppe" },
    { label: "Restaurants & Cafés", href: "#zielgruppe" },
  ],
  Legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#020010]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
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
              Done-for-You KI-Chatbot-Service für lokale Unternehmen. Installation, Konfiguration & Wartung – alles aus einer Hand.
            </p>
          </div>

          {/* Links */}
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

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:flex-row">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} ChatBoost AI. Alle Rechte vorbehalten.
          </p>
          <p className="flex items-center gap-1 text-xs text-white/20">
            Made with <Heart className="h-3 w-3 text-red-400" /> in der DACH-Region
          </p>
        </div>
      </div>
    </footer>
  );
}
