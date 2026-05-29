import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProgressTracker from "@/components/ProgressTracker";

export default async function StageDashboard() {
  const lessons = await prisma.lesson.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-16 py-12">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed-dim mb-2 block">
          Stage 1
        </span>
        <h1 className="font-[family-name:var(--font-headline)] text-primary text-3xl md:text-4xl font-bold">
          The Awakening
        </h1>
        <p className="text-on-surface-variant mt-3 max-w-2xl">
          Master the foundational runes of Python: voice, memory, logic, and control.
          Complete all lessons to unlock the Core Spark.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const isFinal = lesson.number === "1-10";
            return (
              <Link
                key={lesson.slug}
                href={`/lesson/${lesson.slug}`}
                className={`rounded-xl border p-5 transition-all hover:scale-[1.02] ${
                  isFinal
                    ? "border-surface-tint bg-surface-container-high hover:aether-glow"
                    : "border-outline-variant bg-surface-container hover:border-secondary"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    {lesson.number}
                  </span>
                  {isFinal && (
                    <span className="text-xs bg-surface-tint/10 text-surface-tint px-2 py-0.5 rounded uppercase font-bold">
                      Final Quest
                    </span>
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-headline)] text-on-surface text-lg font-bold mb-1">
                  {lesson.title}
                </h3>
                <p className="text-xs text-on-surface-variant mb-3">{lesson.topic}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isFinal ? "bg-surface-tint" : "bg-secondary"
                    }`}
                  />
                  <span className="text-on-surface-variant">{lesson.mainCharacter}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="md:col-span-3">
          <ProgressTracker current={0} total={lessons.length - 1} />
        </div>
      </div>
    </div>
  );
}
