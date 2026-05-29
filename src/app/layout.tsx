import type { Metadata } from "next";
import { Literata, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const literata = Literata({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Python Quest — Stage 1: Awakening",
  description: "Learn Python through an epic RPG adventure. Stage 1: Awakening",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${literata.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
