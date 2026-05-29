import { type Locale } from "@/i18n/config";
import { stage1En } from "./en";
import { stage1Ru } from "./ru";

export function getStage1Content(locale: Locale) {
  return locale === "en" ? stage1En : stage1Ru;
}

export function getLessonContent(locale: Locale, slug: string) {
  const content = getStage1Content(locale);
  return content.find((l) => l.slug === slug);
}
