"use client";

import { useState, useRef, useEffect } from "react";
import { type Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function MentorChatPanel({
  initialMode = "Lexa",
  locale = "ru",
}: {
  initialMode?: string;
  locale?: Locale;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const bottomRef = useRef<HTMLDivElement>(null);
  const t = locale === "en" ? en : ru;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], mode, locale }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: locale === "en" ? "Connection lost. Try again later." : "Связь потеряна. Попробуй позже." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-outline-variant bg-surface-container overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant flex items-center justify-between bg-surface-container-high">
        <span className="text-sm font-bold text-on-surface">{t.chat.title}</span>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-xs bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-on-surface-variant outline-none focus:border-surface-tint"
        >
          <option value="Lexa">Lexa</option>
          <option value="Silas">Silas</option>
          <option value="Dash">Dash</option>
          <option value="Glitch">Glitch</option>
          <option value="Lyra">Lyra</option>
        </select>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[240px]">
        {messages.length === 0 && (
          <p className="text-xs text-on-surface-variant text-center italic">
            {t.chat.emptyHint}
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm leading-relaxed p-3 rounded-lg ${
              m.role === "user"
                ? "bg-surface-tint/10 text-surface-tint self-end ml-8"
                : "bg-surface-container-low text-on-surface mr-8"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-on-surface-variant animate-pulse">{t.chat.thinking}</div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="p-3 border-t border-outline-variant flex gap-2 bg-surface-container-high">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface outline-none focus:border-surface-tint"
          placeholder={t.chat.placeholder}
        />
        <button
          onClick={send}
          disabled={loading}
          className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg text-sm font-bold hover:brightness-110 disabled:opacity-40 transition"
        >
          {t.common.send}
        </button>
      </div>
    </div>
  );
}
