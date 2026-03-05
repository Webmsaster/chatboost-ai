"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

type Message = { role: "bot" | "user"; text: string };

export default function ChatWidget() {
  const t = useTranslations("ChatWidget");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("greeting") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const [useAI, setUseAI] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [t("quickReply1"), t("quickReply2"), t("quickReply3")];

  const exactResponses: Record<string, string> = useMemo(() => ({
    [t("quickReply1")]: t("responseCost"),
    [t("quickReply2")]: t("responseHow"),
    [t("quickReply3")]: t("responseDemo"),
  }), [t]);

  const keywordResponses: { keywords: string[]; response: string }[] = useMemo(() => [
    {
      keywords: ["preis", "kosten", "teuer", "günstig", "paket", "tarif", "euro", "€", "price", "cost", "cheap", "package"],
      response: t("responsePrice"),
    },
    {
      keywords: ["termin", "buchen", "gespräch", "call", "beratung", "appointment", "book", "consultation"],
      response: t("responseAppointment"),
    },
    {
      keywords: ["whatsapp", "messenger", "instagram"],
      response: t("responseWhatsApp"),
    },
    {
      keywords: ["dsgvo", "datenschutz", "daten", "sicher", "gdpr", "privacy", "data", "secure"],
      response: t("responseGDPR"),
    },
    {
      keywords: ["immobilie", "makler", "wohnung", "haus", "real estate", "property", "agent"],
      response: t("responseRealEstate"),
    },
    {
      keywords: ["restaurant", "gastro", "reservier", "tisch", "table", "reservation"],
      response: t("responseRestaurant"),
    },
    {
      keywords: ["salon", "friseur", "frisör", "haar", "beauty", "barber", "hair"],
      response: t("responseSalon"),
    },
    {
      keywords: ["wie lange", "dauer", "schnell", "zeit", "how long", "duration", "fast", "time"],
      response: t("responseDuration"),
    },
    {
      keywords: ["hallo", "hi", "hey", "moin", "servus", "guten tag", "hello", "good morning"],
      response: t("responseGreeting"),
    },
    {
      keywords: ["danke", "super", "toll", "cool", "perfekt", "thanks", "great", "awesome", "perfect"],
      response: t("responseThanks"),
    },
  ], [t]);

  const findKeywordResponse = useCallback(
    (userInput: string): string => {
      if (exactResponses[userInput]) return exactResponses[userInput];

      const lower = userInput.toLowerCase();
      for (const entry of keywordResponses) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
          return entry.response;
        }
      }

      return t("responseFallback");
    },
    [exactResponses, keywordResponses, t]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getAIResponse = async (
    allMessages: Message[]
  ): Promise<string | null> => {
    try {
      const apiMessages = allMessages.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, sessionId }),
      });

      if (res.status === 429) {
        // Rate limited – fall back to keywords
        setUseAI(false);
        return null;
      }

      if (!res.ok) return null;

      const data = await res.json();
      return data.reply || null;
    } catch {
      return null;
    }
  };

  const addMessage = async (text: string) => {
    const userMsg: Message = { role: "user", text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsTyping(true);

    if (useAI) {
      const aiReply = await getAIResponse(newMessages);
      if (aiReply) {
        setMessages((prev) => [...prev, { role: "bot", text: aiReply }]);
        setIsTyping(false);
        return;
      }
      // AI failed, fall back to keywords
    }

    // Keyword fallback
    setTimeout(() => {
      const botResponse = findKeywordResponse(text);
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    addMessage(input.trim());
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c1d]/95 shadow-2xl shadow-brand-900/30 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/5 bg-gradient-to-r from-brand-600/20 to-accent-500/10 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">ChatBoost AI</div>
                <div className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  {useAI ? "AI-Powered Demo" : "Live Demo"}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md bg-gradient-to-r from-brand-500 to-brand-600 text-white"
                        : "rounded-bl-md bg-white/[0.06] text-white/80"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-400" />
                    <span className="text-xs text-white/40">{t("typing")}</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && !isTyping && (
              <div className="flex flex-wrap gap-2 border-t border-white/5 px-4 py-3">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => addMessage(reply)}
                    className="rounded-full border border-brand-500/20 bg-brand-500/5 px-3 py-1.5 text-xs text-brand-300 transition-colors hover:bg-brand-500/10"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t border-white/5 px-4 py-1.5">
              <p className="text-center text-[10px] text-white/20">
                {t("demoHint")}
              </p>
            </div>

            <div className="border-t border-white/5 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("inputPlaceholder")}
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping}
                  className="rounded-lg p-1.5 text-brand-400 transition-colors hover:bg-brand-500/10 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-accent-500 shadow-2xl shadow-brand-500/30 transition-shadow hover:shadow-brand-500/50"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-brand-500/20" />
        )}
      </motion.button>
    </div>
  );
}
