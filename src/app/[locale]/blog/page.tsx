"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Bot, ArrowLeft, Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/data/blog-posts";

export default function BlogPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("BlogPage");
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const { getBlogPosts } = await import("@/data/blog-posts");
      const data = await getBlogPosts(locale as "de" | "en");
      setPosts(data);
    }
    loadPosts();
  }, [locale]);

  return (
    <div className="min-h-screen bg-[#030014]">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass py-3 shadow-lg shadow-brand-900/20"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/25 transition-shadow group-hover:shadow-brand-500/40">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">Chat</span>
              <span className="text-gradient">Boost</span>
              <span className="text-white/60 ml-0.5 text-sm font-medium">
                AI
              </span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white/60 transition-all hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </div>
      </motion.nav>

      <main className="relative pt-32 pb-24" ref={ref}>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/[0.03] via-transparent to-transparent" />

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
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t("title")}{" "}
              <span className="text-gradient">{t("titleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
              {t("description")}
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04] hover:border-brand-500/20 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-brand-500 to-accent-500" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4">
                      <span className="inline-flex items-center rounded-full border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-xs font-medium text-accent-400">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="mb-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-brand-200">
                      {post.title}
                    </h2>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-white/40">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/[0.06] pt-4 text-xs text-white/30">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-sm text-white/30">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              {t("comingSoon")}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
