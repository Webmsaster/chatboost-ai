"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Bot, ArrowLeft, Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/data/blog-posts";
import { renderContent } from "@/lib/render-content";
import SocialShareButtons from "@/components/SocialShareButtons";
import NewsletterSignup from "@/components/NewsletterSignup";

type Props = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export default function BlogArticleContent({ post, relatedPosts }: Props) {
  const t = useTranslations("BlogPage");
  const locale = useLocale();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const articleUrl = `${siteUrl}/${locale}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-[#030014]">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-accent-500 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

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
            href="/blog"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white/60 transition-all hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("allArticles")}
          </Link>
        </div>
      </motion.nav>

      <main className="relative pt-32 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/[0.03] via-transparent to-transparent" />

        <div className="relative mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-xs font-medium text-accent-400">
              {post.category}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-white/40">{post.description}</p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-white/30">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>

              <SocialShareButtons url={articleUrl} title={post.title} />
            </div>

            <div className="mt-8 h-px bg-gradient-to-r from-brand-500/20 via-accent-500/20 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 space-y-6"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-accent-500/5 p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-white">
              {t("ctaTitle")}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/40">
              {t("ctaDescription")}
            </p>
            <Link
              href="/#kontakt"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110"
            >
              {t("ctaButton")}
            </Link>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-12"
          >
            <NewsletterSignup variant="banner" />
          </motion.div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16"
            >
              <h3 className="mb-6 text-xl font-bold text-white">
                {t("relatedArticles")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.04] hover:border-brand-500/20"
                  >
                    <span className="mb-2 inline-flex w-fit items-center rounded-full border border-accent-500/20 bg-accent-500/5 px-2.5 py-0.5 text-[10px] font-medium text-accent-400">
                      {related.category}
                    </span>
                    <h4 className="mb-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-brand-200">
                      {related.title}
                    </h4>
                    <span className="mt-auto flex items-center gap-1.5 text-xs text-white/30">
                      <Clock className="h-3 w-3" />
                      {related.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToArticles")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
