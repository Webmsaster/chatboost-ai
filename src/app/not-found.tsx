import Link from "next/link";
import { Bot, ArrowLeft, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#030014] px-6">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[300px] w-[300px] rounded-full bg-accent-500/10 blur-[100px]" />
      </div>

      <div className="relative text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 border border-white/[0.06]">
          <MessageCircle className="h-10 w-10 text-brand-400" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-bold text-gradient sm:text-8xl">404</h1>

        <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
          Seite nicht gefunden
        </h2>

        <p className="mx-auto mt-3 max-w-md text-white/40">
          Die gesuchte Seite existiert leider nicht. Vielleicht wurde sie
          verschoben oder der Link ist fehlerhaft.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Startseite
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            Blog lesen
          </Link>
        </div>

        {/* Logo */}
        <div className="mt-16 flex items-center justify-center gap-2.5 opacity-40">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">
            ChatBoost AI
          </span>
        </div>
      </div>
    </div>
  );
}
