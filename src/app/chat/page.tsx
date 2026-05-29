"use client";

import MentorChatPanel from "@/components/MentorChatPanel";
import { useLanguage } from "@/i18n/useLanguage";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";

export default function ChatPage() {
  const { locale } = useLanguage();
  const t = locale === "en" ? en : ru;

  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-16 py-12">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-headline)] text-primary text-3xl font-bold mb-2">
          {t.chat.title}
        </h1>
        <p className="text-on-surface-variant">
          {t.chat.description}
        </p>
      </div>
      <div className="max-w-3xl">
        <MentorChatPanel locale={locale} />
      </div>
    </div>
  );
}
