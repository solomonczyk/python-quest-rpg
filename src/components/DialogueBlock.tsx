"use client";

import { useState } from "react";
import { type Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";

interface DialogueEntry {
  character: string;
  text: string;
}

const characterColors: Record<string, string> = {
  Lexa: "border-secondary text-secondary",
  Silas: "border-outline text-on-surface",
  Dash: "border-tertiary-fixed-dim text-tertiary-fixed-dim",
  Lyra: "border-primary-fixed-dim text-primary-fixed-dim",
  Glitch: "border-error text-error",
};

export default function DialogueBlock({
  dialogue,
  locale = "ru",
}: {
  dialogue: DialogueEntry[];
  locale?: Locale;
}) {
  const [index, setIndex] = useState(0);
  const current = dialogue[index];
  const t = locale === "en" ? en : ru;

  if (!current) return null;

  return (
    <div className="stone-texture brass-border rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold uppercase shrink-0 ${
            characterColors[current.character] || "border-outline text-on-surface-variant"
          }`}
        >
          {current.character[0]}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold mb-1 text-on-surface-variant">{current.character}</p>
          <p className="text-on-surface leading-relaxed">{current.text}</p>
        </div>
      </div>
      {dialogue.length > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          {index > 0 && (
            <button
              onClick={() => setIndex((i) => i - 1)}
              className="px-3 py-1 text-xs rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition"
            >
              {t.lesson.dialogueBack}
            </button>
          )}
          {index < dialogue.length - 1 && (
            <button
              onClick={() => setIndex((i) => i + 1)}
              className="px-3 py-1 text-xs rounded-lg bg-secondary-container text-on-secondary-container hover:brightness-110 transition"
            >
              {t.lesson.dialogueNext}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
