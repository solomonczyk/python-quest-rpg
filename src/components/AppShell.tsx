import Link from "next/link";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-5 md:px-16 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-primary font-[family-name:var(--font-headline)] text-xl font-bold tracking-tight">
              Python Quest
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
            <Link href="/stage/1" className="hover:text-primary transition-colors">
              Stage 1
            </Link>
            <Link href="/chat" className="hover:text-primary transition-colors">
              Mentor
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
