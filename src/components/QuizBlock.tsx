"use client";

import { useState } from "react";
import { type Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";

export default function QuizBlock({
  quiz,
  onAnswer,
  answered,
  locale = "ru",
}: {
  quiz: { question: string; options: string[]; correctIndex: number };
  onAnswer: (index: number) => void;
  answered?: boolean;
  locale?: Locale;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const t = locale === "en" ? en : ru;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx);
  };

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container p-6 md:p-8">
      <h5 className="font-[family-name:var(--font-headline)] text-primary text-lg font-bold mb-4">
        {t.lesson.quizTitle}
      </h5>
      <p className="text-on-surface mb-6">{quiz.question}</p>
      <div className="space-y-3">
        {quiz.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === quiz.correctIndex;
          const showResult = answered && isSelected;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                showResult
                  ? isCorrect
                    ? "border-primary bg-primary-container/20 text-primary"
                    : "border-error bg-error-container/20 text-error"
                  : isSelected
                  ? "border-surface-tint bg-surface-tint/10 text-surface-tint"
                  : "border-outline-variant bg-surface-container-low text-on-surface hover:border-surface-tint"
              }`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && selected !== null && (
        <p className={`mt-4 text-sm font-bold ${selected === quiz.correctIndex ? "text-primary" : "text-error"}`}>
          {selected === quiz.correctIndex ? t.lesson.correctFeedback : t.lesson.incorrectFeedback}
        </p>
      )}
    </div>
  );
}
