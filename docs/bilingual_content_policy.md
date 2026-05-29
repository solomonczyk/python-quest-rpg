# Bilingual Content Policy

## Supported Languages

- **Russian (ru)** — primary, default fallback
- **English (en)** — secondary

## Content Ownership

- All lesson content is manually authored for each language.
- No machine translation is used for UI labels or lesson text without review.
- Key Python terminology (e.g., `print()`, `input()`, `if`, `else`) is preserved in code examples across both languages.

## Translation Rules

1. **Code examples** — identical in both languages. Only code comments (if any) may be translated.
2. **Character names** — preserved as-is (Lexa, Silas, Dash, Lyra, Glitch) in both languages.
3. **Ability/reward names** — translated to match the language's tone and style.
4. **Quiz options** — fully translated.
5. **Mission descriptions** — fully translated while preserving code syntax references.

## Consistency Checks

- Dictionary keys must match 1:1 between `ru.ts` and `en.ts`.
- Content slugs must match 1:1 between `stage1/ru.ts` and `stage1/en.ts`.
- Automated tests enforce both rules.

## Future Languages

To add a language:
1. Create dictionary and content files.
2. Add locale to `src/i18n/config.ts`.
3. Wire into `src/content/stage1/index.ts`.
4. Update tests.
5. No database changes needed.
