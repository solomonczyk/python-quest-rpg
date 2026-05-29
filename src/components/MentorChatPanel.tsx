"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function MentorChatPanel({
  initialMode = "Lexa",
}: {
  initialMode?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const bottomRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ messages: [...messages, userMsg], mode }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Связь потеряна. Попробуй позже." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-outline-variant bg-surface-container overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant flex items-center justify-between bg-surface-container-high">
        <span className="text-sm font-bold text-on-surface">AI Mentor</span>
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
            Напиши наставнику. Он не даст ответ сразу — подскажет шаг за шагом.
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
          <div className="text-xs text-on-surface-variant animate-pulse">Наставник думает...</div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="p-3 border-t border-outline-variant flex gap-2 bg-surface-container-high">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface outline-none focus:border-surface-tint"
          placeholder="Ask the mentor..."
        />
        <button
          onClick={send}
          disabled={loading}
          className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg text-sm font-bold hover:brightness-110 disabled:opacity-40 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
