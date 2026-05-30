# Deployment Checklist: Vercel + Supabase

Use this checklist before and after deploying `python-quest-rpg`.

---

## Pre-Deployment

- [ ] GitHub repository is public or connected to Vercel account
- [ ] `.env` is in `.gitignore` (never commit secrets)
- [ ] `.env.example` is up to date with all required variables
- [ ] `DATABASE_URL` is set in Vercel Environment Variables (Production)
- [ ] `DEEPSEEK_API_KEY` is set in Vercel (optional; fallback works without it)
- [ ] `DEEPSEEK_BASE_URL` is set in Vercel
- [ ] `DEEPSEEK_MODEL` is set in Vercel
- [ ] `NEXT_PUBLIC_DEFAULT_LOCALE` is set in Vercel

## Database

- [x] Supabase project created (python-quest-rpg)
- [x] PostgreSQL tables created (Player, Lesson, Progress, Attempt)
- [x] Initial data seeded (lessons 1-1 to 1-4)
- [ ] `DATABASE_URL` set in Vercel Environment Variables
- [ ] `DIRECT_URL` set in Vercel Environment Variables
- [ ] Local SQLite workflow still works (`DATABASE_URL="file:./dev.db"`)

## Build & Verification

- [ ] `npm install` succeeds
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes
- [ ] `npm run build` succeeds locally
- [ ] `npx prisma generate` succeeds

## Post-Deploy Smoke Tests

- [ ] `https://<your-app>.vercel.app/` loads
- [ ] `/stage/1` loads with lesson list
- [ ] `/lesson/print` loads with content
- [ ] `/stage/1/final` loads
- [ ] `/chat` responds (fallback mode if no AI key)
- [ ] RU/EN locale switch works
- [ ] Progress persists after page reload
- [ ] Local PC can be turned off (production runs on Vercel)

## Security

- [ ] No API keys in repository
- [ ] No `F:\` or absolute local paths in code
- [ ] No `shell=True` or unsafe Python execution
- [ ] Frontend does not receive private API keys

## Final

- [ ] `git status` is clean
- [ ] Commit pushed to `origin/main`
- [ ] Proof JSON updated with commit hash
