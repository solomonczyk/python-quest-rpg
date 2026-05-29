"use client";

export default function GlitchTrap({
  trap,
}: {
  trap: { brokenCode: string; problem: string; fix: string };
}) {
  return (
    <div className="rounded-xl border-t-4 border-t-error bg-surface-container p-6 relative overflow-hidden">
      <div className="absolute -top-3 -right-3 w-10 h-10 bg-error rounded-lg flex items-center justify-center rotate-12 shadow-lg">
        <span className="text-background text-lg">!</span>
      </div>
      <h4 className="font-[family-name:var(--font-headline)] text-error text-xl font-bold mb-3">
        Glitch&apos;s Trap!
      </h4>
      <p className="text-on-surface-variant text-sm mb-4">{trap.problem}</p>
      <div className="bg-surface-container-lowest border border-error/30 p-4 rounded-lg font-[family-name:var(--font-mono)] text-xs text-error mb-4 overflow-x-auto">
        {trap.brokenCode}
      </div>
      <div className="bg-surface-container-high border border-outline-variant p-4 rounded-lg">
        <p className="text-xs text-on-surface-variant mb-1 font-bold uppercase tracking-wider">
          Fix
        </p>
        <pre className="font-[family-name:var(--font-mono)] text-xs text-primary whitespace-pre-wrap">
          {trap.fix}
        </pre>
      </div>
    </div>
  );
}
