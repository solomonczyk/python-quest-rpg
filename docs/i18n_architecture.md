# i18n Architecture for Python Quest

## Overview

Python Quest MVP Stage 1 supports bilingual content: **Russian (ru)** and **English (en)**.
Russian is the default fallback language.

## Language Detection & Persistence

- **Source of truth:** `localStorage` key `python-quest-locale`
- **Default:** `ru`
- **Switcher:** UI toggle in `AppShell` header (RU / EN buttons)
- **Hydration-safe:** `useLanguage` hook guards against SSR/localStorage mismatch with a `mounted` flag

## File Structure

```
src/i18n/
  config.ts              # Locale type, DEFAULT_LOCALE, LOCALES array
  useLanguage.ts          # React hook: reads/writes localStorage, returns locale + setter
  dictionaries/
    ru.ts                 # Russian UI strings
    en.ts                 # English UI strings

src/content/stage1/
  ru.ts                   # Russian lesson content (10 lessons)
  en.ts                   # English lesson content (10 lessons)
  index.ts                # getStage1Content(locale), getLessonContent(locale, slug)
```

## Content Strategy

### UI Text (Dictionaries)
All static UI labels (buttons, navigation, status messages, chat placeholders) live in `src/i18n/dictionaries/{ru,en}.ts`.
Components import the dictionary and select based on `locale`.

### Lesson Content (Content Files)
Lesson-specific data (titles, dialogue, explanations, missions, quizzes, glitch traps, rewards) lives in `src/content/stage1/{ru,en}.ts`.
The API (`/api/lessons`, `/api/lessons/[slug]`) merges DB metadata with localized content based on `?locale=` query parameter.

### Why Not Store Everything in the DB?
- The DB stores base lesson metadata (slug, sortOrder, validation rules, IDs).
- Bilingual text is stored in TypeScript files for:
  1. Easier editing and version control
  2. No schema migration needed to add languages
  3. Fast static imports (no extra DB query for text)

## API Localization

### `/api/lessons?locale={ru|en}`
Returns the list of lessons with localized title, topic, and mainCharacter.

### `/api/lessons/[slug]?locale={ru|en}`
Returns a single lesson with all text fields localized (dialogue, explanation, code example, glitch trap, mission, quiz, reward).

### `/api/mentor/chat`
Accepts `locale` in the request body. System prompt and fallback messages switch between Russian and English.

## Component Integration

1. **AppShell** — reads `locale` from `useLanguage`, renders localized nav labels + `LanguageSwitcher`
2. **Pages** (`/`, `/stage/1`, `/lesson/[slug]`, `/chat`) — use `useLanguage` or `searchParams` to get locale, pass `locale` prop to child components
3. **Components** (`QuestSidebar`, `MissionCard`, `QuizBlock`, `GlitchTrap`, `DialogueBlock`, `MentorChatPanel`, `ProgressTracker`, `CodePlate`) — accept optional `locale` prop (defaults to `"ru"`), import dictionary and render localized strings

## Progress Independence

- Progress is tracked by `playerId + lessonId` (numeric IDs and slugs).
- Changing the language does **not** create new progress records.
- The `locale` query parameter only affects display, never data persistence.

## Adding a New Language

1. Add locale to `src/i18n/config.ts`
2. Create `src/i18n/dictionaries/{new}.ts`
3. Create `src/content/stage1/{new}.ts`
4. Update `src/content/stage1/index.ts` to import and serve the new language
5. No DB or schema changes required
