"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-sm text-brand-300">
            Blog
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Aktuelle <span className="text-gradient">Insights</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Tipps und Strategien rund um KI-Chatbots für dein Unternehmen.
          </p>
        </motion.div>

        {/* Blog Preview Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04] hover:border-brand-500/20"
              >
                {/* Gradient stripe top */}
                <div className="h-1 w-full bg-gradient-to-r from-brand-500 to-accent-500" />

                <div className="flex flex-1 flex-col p-5">
                  {/* Category badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full border border-accent-500/20 bg-accent-500/5 px-2.5 py-0.5 text-xs font-medium text-accent-400">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-brand-200">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-white/40">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-4 border-t border-white/[0.06] pt-3 text-xs text-white/30">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-6 py-3 text-sm font-medium text-brand-300 transition-all hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-200"
          >
            Alle Artikel lesen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
