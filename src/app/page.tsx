import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="mx-auto max-w-[1280px] px-5 md:px-16 py-12 w-full">
        <section className="mb-16 relative">
          <div className="stone-texture brass-border rounded-xl p-8 md:p-12 overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed-dim mb-4 block">
                Chapter One: The Awakening
              </span>
              <h1 className="font-[family-name:var(--font-headline)] text-primary text-4xl md:text-5xl font-bold mb-6 leading-tight">
                The Aether-Steam Workshop
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Welcome to Python Quest. Here, code is liquid magic called{" "}
                <span className="text-primary-fixed-dim font-bold">Aether</span>. As a new
                initiate, you must learn to command the fundamental logic that powers the
                gears and glowing conduits. The Ancient Codex awaits your input.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 glass-panel rounded-lg flex items-center gap-2">
                  <span className="text-primary-fixed-dim text-sm">⌘</span>
                  <span className="font-[family-name:var(--font-mono)] text-sm text-primary">
                    Status: Connected
                  </span>
                </div>
                <div className="px-4 py-2 glass-panel rounded-lg flex items-center gap-2">
                  <span className="text-primary-fixed-dim text-sm">⚡</span>
                  <span className="font-[family-name:var(--font-mono)] text-sm text-primary">
                    Aether Levels: Optimal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-[family-name:var(--font-headline)] text-on-surface text-2xl font-bold border-l-4 border-primary pl-6">
              The Assembly of Adepts
            </h2>
            <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-outline">
              5 MASTERS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Lexa", role: "THE GUIDE", color: "border-secondary text-secondary", desc: "The brilliant engineer who translates complex theory into decisive action within the workshop." },
              { name: "Silas", role: "THE LOGICIAN", color: "border-outline text-on-surface", desc: "The ancient guardian of the vault, ensuring every command follows the immutable laws of precision." },
              { name: "Dash", role: "THE TRAILBLAZER", color: "border-tertiary-fixed-dim text-tertiary-fixed-dim", desc: "The energetic scout who finds daring missions in the deepest, most dangerous corners of the tower." },
              { name: "Lyra", role: "THE ARCHITECT", color: "border-primary-fixed-dim text-primary-fixed-dim", desc: "The ethereal spirit who maintains the invisible, shimmering structures of the digital realm." },
              { name: "Glitch", role: "THE CHAOS", color: "border-error text-error", desc: "A mischievous gremlin who tests our collective resolve by occasionally breaking the gears of logic." },
            ].map((c) => (
              <div key={c.name} className="group relative">
                <div className="stone-texture brass-border rounded-xl p-6 h-full transition-all duration-300 group-hover:aether-glow flex flex-col items-center text-center">
                  <div className={`w-24 h-24 mb-6 rounded-full border-4 ${c.color} overflow-hidden relative shadow-lg flex items-center justify-center text-3xl font-bold`}>
                    {c.name[0]}
                  </div>
                  <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold mb-2">{c.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-outline-variant mb-4">{c.role}</p>
                  <p className="text-on-surface-variant text-sm">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col items-center justify-center py-12">
          <Link
            href="/stage/1"
            className="btn-brass px-12 py-5 rounded-xl flex items-center gap-4 group"
          >
            <span className="font-[family-name:var(--font-headline)] text-on-secondary-fixed text-xl font-bold">
              Enter the Workshop
            </span>
            <span className="text-on-secondary-fixed group-hover:translate-x-2 transition-transform text-xl">
              →
            </span>
          </Link>
        </footer>
      </main>
    </div>
  );
}
