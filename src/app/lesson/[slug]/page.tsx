"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QuestSidebar from "@/components/QuestSidebar";
import DialogueBlock from "@/components/DialogueBlock";
import CodePlate from "@/components/CodePlate";
import GlitchTrap from "@/components/GlitchTrap";
import MissionCard from "@/components/MissionCard";
import QuizBlock from "@/components/QuizBlock";
import AbilityReward from "@/components/AbilityReward";
import { validateMission } from "@/lib/validateMission";
import { useLanguage } from "@/i18n/useLanguage";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";

interface Lesson {
  id: number;
  number: string;
  slug: string;
  title: string;
  topic: string;
  mainCharacter: string;
  dialogue: string;
  explanation: string;
  codeExample: string;
  glitchTrap: string;
  mission: string;
  missionValidationRule: string;
  quiz: string;
  rewardAbility: string;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { locale } = useLanguage();
  const t = locale === "en" ? en : ru;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessons, setLessons] = useState<{ slug: string; number: string; title: string }[]>([]);
  const [missionResult, setMissionResult] = useState<"idle" | "pass" | "fail">("idle");
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lessons?locale=${locale}`)
      .then((r) => r.json())
      .then((data) => {
        setLessons(
          data.map((l: Lesson) => ({ slug: l.slug, number: l.number, title: l.title }))
        );
      });
    fetch(`/api/lessons/${slug}?locale=${locale}`)
      .then((r) => r.json())
      .then((data) => {
        setLesson(data);
        setLoading(false);
      });
  }, [slug, locale]);

  const handleMission = (code: string) => {
    if (!lesson) return;
    const result = validateMission(code, lesson.missionValidationRule);
    setMissionResult(result.pass ? "pass" : "fail");
  };

  const handleQuiz = (index: number) => {
    if (!lesson) return;
    const q = JSON.parse(lesson.quiz);
    setQuizAnswered(true);
    setQuizCorrect(index === q.correctIndex);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-on-surface-variant animate-pulse">{t.common.loading}</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-error">Lesson not found.</p>
      </div>
    );
  }

  const dialogue = JSON.parse(lesson.dialogue || "[]");
  const trap = JSON.parse(lesson.glitchTrap || "{}") as {
    brokenCode: string;
    problem: string;
    fix: string;
  };
  const quiz = JSON.parse(lesson.quiz || "{}") as {
    question: string;
    options: string[];
    correctIndex: number;
  };

  const currentIndex = lessons.findIndex((l) => l.slug === slug);
  const prevSlug = currentIndex > 0 ? lessons[currentIndex - 1].slug : null;
  const nextSlug = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1].slug : null;

  return (
    <div className="flex max-w-[1280px] mx-auto min-h-[calc(100vh-64px)]">
      <QuestSidebar
        lessons={lessons.map((l) => ({ ...l, status: "available" }))}
        currentSlug={slug}
        locale={locale}
      />
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <section className="relative mb-12 rounded-3xl overflow-hidden min-h-[300px] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-surface-container-high" />
          <div className="relative z-10 p-8 md:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-surface-tint mb-3 block">
              {t.lesson.lesson} {lesson.number}
            </span>
            <h1 className="font-[family-name:var(--font-headline)] text-primary text-3xl md:text-4xl font-bold mb-4">
              {lesson.title}
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">{lesson.topic}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <DialogueBlock dialogue={dialogue} locale={locale} />
            <div className="rounded-xl border border-outline-variant bg-surface-container p-6 md:p-8">
              <h3 className="font-[family-name:var(--font-headline)] text-on-surface text-xl font-bold mb-4">
                {t.lesson.explanation}
              </h3>
              <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">
                {lesson.explanation}
              </p>
            </div>
            <CodePlate code={lesson.codeExample} locale={locale} />
            <MissionCard
              mission={lesson.mission}
              onSubmit={handleMission}
              result={missionResult}
              locale={locale}
            />
            <GlitchTrap trap={trap} locale={locale} />
          </div>
          <div className="space-y-6">
            <QuizBlock
              quiz={quiz}
              onAnswer={handleQuiz}
              answered={quizAnswered}
              locale={locale}
            />
            {(missionResult === "pass" || quizCorrect) && (
              <AbilityReward ability={lesson.rewardAbility} />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center p-6 stone-texture brass-border rounded-full mb-12">
          <button
            onClick={() => prevSlug && router.push(`/lesson/${prevSlug}`)}
            disabled={!prevSlug}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition disabled:opacity-30"
          >
            <span>←</span>
            <span className="text-xs font-bold uppercase tracking-wider">{t.lesson.prevLesson}</span>
          </button>
          <div className="flex gap-1.5">
            {lessons.map((l, i) => (
              <div
                key={l.slug}
                className={`w-2 h-2 rounded-full ${
                  i === currentIndex ? "bg-primary" : "bg-outline-variant"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => nextSlug && router.push(`/lesson/${nextSlug}`)}
            disabled={!nextSlug}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition disabled:opacity-30"
          >
            <span className="text-xs font-bold uppercase tracking-wider">{t.lesson.nextLesson}</span>
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
