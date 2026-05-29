"use client";

export default function ProgressTracker({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="rounded-xl bg-surface-container p-6 flex flex-col items-center text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
        Aether Saturation
      </p>
      <div className="w-14 h-32 bg-surface-container-low border border-outline-variant rounded-full p-1.5 flex items-end overflow-hidden relative">
        <div
          className="w-full bg-surface-tint rounded-full transition-all duration-1000 shadow-[0_0_15px_#00dbe7]"
          style={{ height: `${pct}%` }}
        />
      </div>
      <p className="text-surface-tint font-[family-name:var(--font-headline)] text-xl font-bold mt-4">
        {pct}%
      </p>
      <p className="text-xs text-on-surface-variant mt-1">
        {current}/{total} Lessons
      </p>
    </div>
  );
}
