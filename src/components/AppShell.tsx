"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/useLanguage";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useLanguage();
  const t = locale === "en" ? en : ru;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-5 md:px-16 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-primary font-[family-name:var(--font-headline)] text-xl font-bold tracking-tight">
              Python Quest
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
              <Link href="/stage/1" className="hover:text-primary transition-colors">
                {t.nav.stage1}
              </Link>
              <Link href="/chat" className="hover:text-primary transition-colors">
                {t.nav.mentor}
              </Link>
            </nav>
            <LanguageSwitcher locale={locale} onChange={setLocale} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
