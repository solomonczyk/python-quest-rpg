"use client";

import { type Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";

export default function CodePlate({
  code,
  locale = "ru",
}: {
  code: string;
  locale?: Locale;
}) {
  const t = locale === "en" ? en : ru;
  return (
    <div className="rounded-xl overflow-hidden border border-outline-variant shadow-lg">
      <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
          {t.lesson.codeExample}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-error/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-secondary/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
        </div>
      </div>
      <div className="parchment p-5 md:p-6">
        <pre className="font-[family-name:var(--font-mono)] text-sm leading-relaxed whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
  );
}
