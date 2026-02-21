"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  Brain,
  Calendar,
  Database,
  Code2,
  CreditCard,
  Layout,
} from "lucide-react";

const tools = [
  { icon: Bot, name: "Chatbase", category: "Chatbot-Builder", cost: "Free Tier" },
  { icon: Brain, name: "OpenAI GPT-4o", category: "KI-Backend", cost: "~$0.01/1k Tokens" },
  { icon: Calendar, name: "Calendly", category: "Terminbuchung", cost: "Free/Paid" },
  { icon: Database, name: "HubSpot Free", category: "CRM", cost: "Kostenlos" },
  { icon: Code2, name: "Widget-Code", category: "Website-Embed", cost: "—" },
  { icon: CreditCard, name: "Stripe", category: "Zahlungen", cost: "1.4% + 0.25€" },
  { icon: Layout, name: "Notion", category: "Projektmanagement", cost: "Free" },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-4 py-1.5 text-sm text-accent-400">
            Tech Stack
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Unsere <span className="text-gradient">Tools</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
            Bewährte Tools, die zuverlässig zusammenarbeiten.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:bg-white/[0.04] hover:border-brand-500/20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 transition-colors group-hover:from-brand-500/25 group-hover:to-accent-500/25">
                <tool.icon className="h-5 w-5 text-brand-300" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{tool.name}</div>
                <div className="text-xs text-white/30">{tool.category} · {tool.cost}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
