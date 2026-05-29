"use client";

import { useState } from "react";

export default function MissionCard({
  mission,
  onSubmit,
  result,
}: {
  mission: string;
  onSubmit: (code: string) => void;
  result?: "idle" | "pass" | "fail";
}) {
  const [code, setCode] = useState("");

  return (
    <div className="rounded-xl border-l-4 border-l-secondary bg-surface-container p-6 md:p-8 relative overflow-hidden">
      <h5 className="font-[family-name:var(--font-headline)] text-secondary text-xl font-bold mb-3">
        Dash&apos;s Mission
      </h5>
      <p className="text-on-surface-variant text-base mb-6 whitespace-pre-line">{mission}</p>
      <div className="bg-surface-container-high border border-outline-variant rounded-xl p-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
          Your Code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-[family-name:var(--font-mono)] text-sm text-primary focus:border-surface-tint focus:ring-1 focus:ring-surface-tint outline-none resize-y min-h-[120px]"
          placeholder="Type your Python code here..."
          spellCheck={false}
        />
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => onSubmit(code)}
            className="btn-brass px-6 py-2.5 rounded-lg text-on-secondary font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
          >
            Cast Spell
          </button>
          {result === "pass" && (
            <span className="text-primary font-bold text-sm">✓ Mission Complete</span>
          )}
          {result === "fail" && (
            <span className="text-error font-bold text-sm">✗ Try Again</span>
          )}
        </div>
      </div>
    </div>
  );
}
