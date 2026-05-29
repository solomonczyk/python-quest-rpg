"use client";

import Link from "next/link";

interface LessonItem {
  slug: string;
  number: string;
  title: string;
  status?: "locked" | "available" | "completed";
}

export default function QuestSidebar({
  lessons,
  currentSlug,
}: {
  lessons: LessonItem[];
  currentSlug?: string;
}) {
  return (
    <aside className="hidden lg:flex flex-col w-[280px] h-[calc(100vh-64px)] sticky top-16 border-r border-outline-variant bg-surface-container-lowest py-6">
      <div className="px-6 mb-6">
        <h2 className="text-primary font-[family-name:var(--font-headline)] text-lg font-bold">
          Stage 1: Awakening
        </h2>
        <p className="text-xs text-on-surface-variant mt-1 uppercase tracking-widest">
          The Aether-Steam Workshop
        </p>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {lessons.map((lesson) => {
          const isActive = lesson.slug === currentSlug;
          const isLocked = lesson.status === "locked";
          return (
            <Link
              key={lesson.slug}
              href={isLocked ? "#" : `/lesson/${lesson.slug}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary-container text-on-primary-container"
                  : isLocked
                  ? "text-on-surface-variant/40 cursor-not-allowed"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="text-xs w-6 text-center">
                {lesson.status === "completed" ? "✓" : lesson.number}
              </span>
              <span className="truncate">{lesson.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
