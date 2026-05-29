"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/useLanguage";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";

export default function Home() {
  const { locale } = useLanguage();
  const t = locale === "en" ? en : ru;

  const characters = [
    { name: "Lexa", role: t.landing.lexia, color: "border-secondary text-secondary", desc: t.landing.lexiaDesc },
    { name: "Silas", role: t.landing.silas, color: "border-outline text-on-surface", desc: t.landing.silasDesc },
    { name: "Dash", role: t.landing.dash, color: "border-tertiary-fixed-dim text-tertiary-fixed-dim", desc: t.landing.dashDesc },
    { name: "Lyra", role: t.landing.lyra, color: "border-primary-fixed-dim text-primary-fixed-dim", desc: t.landing.lyraDesc },
    { name: "Glitch", role: t.landing.glitch, color: "border-error text-error", desc: t.landing.glitchDesc },
  ];

  return (
    <div className="flex flex-col flex-1">
      <main className="mx-auto max-w-[1280px] px-5 md:px-16 py-12 w-full">
        <section className="mb-16 relative">
          <div className="stone-texture brass-border rounded-xl p-8 md:p-12 overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed-dim mb-4 block">
                {t.landing.chapter}
              </span>
              <h1 className="font-[family-name:var(--font-headline)] text-primary text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t.landing.title}
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                {t.landing.description}
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 glass-panel rounded-lg flex items-center gap-2">
                  <span className="text-primary-fixed-dim text-sm">⌘</span>
                  <span className="font-[family-name:var(--font-mono)] text-sm text-primary">
                    {t.common.status}: {t.common.connected}
                  </span>
                </div>
                <div className="px-4 py-2 glass-panel rounded-lg flex items-center gap-2">
                  <span className="text-primary-fixed-dim text-sm">⚡</span>
                  <span className="font-[family-name:var(--font-mono)] text-sm text-primary">
                    {t.common.aetherLevels}: {t.common.optimal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-[family-name:var(--font-headline)] text-on-surface text-2xl font-bold border-l-4 border-primary pl-6">
              {t.landing.adepts}
            </h2>
            <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-outline">
              {t.landing.adeptsCount}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {characters.map((c) => (
              <div key={c.name} className="group relative">
                <div className="stone-texture brass-border rounded-xl p-6 h-full transition-all duration-300 group-hover:aether-glow flex flex-col items-center text-center">
                  <div className={`w-24 h-24 mb-6 rounded-full border-4 ${c.color} overflow-hidden relative shadow-lg flex items-center justify-center text-3xl font-bold`}>
                    {c.name[0]}
                  </div>
                  <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold mb-2">{c.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-outline-variant mb-4">{c.role}</p>
                  <p className="text-on-surface-variant text-sm">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col items-center justify-center py-12">
          <Link
            href="/stage/1"
            className="btn-brass px-12 py-5 rounded-xl flex items-center gap-4 group"
          >
            <span className="font-[family-name:var(--font-headline)] text-on-secondary-fixed text-xl font-bold">
              {t.landing.enterWorkshop}
            </span>
            <span className="text-on-secondary-fixed group-hover:translate-x-2 transition-transform text-xl">
              →
            </span>
          </Link>
        </footer>
      </main>
    </div>
  );
}
