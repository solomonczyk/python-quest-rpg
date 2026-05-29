"use client";

import { type Locale } from "@/i18n/config";

export default function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (l: Locale) => void;
}) {
  return (
    <div className="flex items-center gap-1 bg-surface-container-high rounded-lg p-0.5 border border-outline-variant">
      {(["ru", "en"] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all ${
            locale === l
              ? "bg-primary-container text-on-primary-container shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
