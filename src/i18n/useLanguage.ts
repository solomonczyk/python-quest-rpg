"use client";

import { useState, useEffect, useCallback } from "react";
import { type Locale, DEFAULT_LOCALE } from "./config";

const STORAGE_KEY = "python-quest-locale";

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  return stored && (stored === "ru" || stored === "en") ? stored : DEFAULT_LOCALE;
}

export function useLanguage() {
  const [locale, setLocaleState] = useState<Locale>(() => getStoredLocale());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  }, []);

  return { locale, setLocale, mounted };
}
