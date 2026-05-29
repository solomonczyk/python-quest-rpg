"use client";

export default function AbilityReward({ ability }: { ability: string }) {
  return (
    <div className="rounded-xl bg-surface-container-high border border-surface-tint/30 p-6 flex items-center gap-4 aether-glow">
      <div className="w-12 h-12 rounded-full bg-surface-tint/10 flex items-center justify-center shrink-0">
        <span className="text-surface-tint text-2xl">⚡</span>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-surface-tint mb-1">
          Ability Unlocked
        </p>
        <p className="text-primary font-[family-name:var(--font-headline)] text-lg font-bold">
          {ability}
        </p>
      </div>
    </div>
  );
}
