# Vercel + Supabase Deployment Guide

## Goal

Deploy `python-quest-rpg` to Vercel using **Supabase PostgreSQL** as the production database, while keeping **SQLite** working for local development.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**.
3. Choose an organization, name the project (e.g., `python-quest`), and set a region close to your users.
4. Save the database password securely.

## 2. Get the PostgreSQL Connection String

1. In your Supabase project dashboard, go to **Project Settings → Database**.
2. Under **Connection string**, select **URI**.
3. Copy the connection string. It looks like:
   ```
   postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
   ```
4. Replace `[password]` with your actual database password.

> **Security:** Never commit this string to the repository.

## 3. Add Environment Variables to Vercel

1. In the Vercel dashboard, open your project.
2. Go to **Settings → Environment Variables**.
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres:...` | Production |
| `DEEPSEEK_API_KEY` | `your-api-key` (optional) | Production |
| `DEEPSEEK_BASE_URL` | `https://api.deepseek.com` | Production |
| `DEEPSEEK_MODEL` | `deepseek-v4-flash` | Production |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `ru` | Production |

4. Click **Save**.

> The AI Mentor works in **fallback mode** without `DEEPSEEK_API_KEY`, returning friendly offline messages.

## 4. Connect GitHub Repo to Vercel

1. In Vercel, click **Add New Project**.
2. Import your `python-quest-rpg` GitHub repository.
3. Framework preset: **Next.js**.
4. Ensure the environment variables from Step 3 are set before the first build.
5. Click **Deploy**.

## 5. Run Production Migrations

After the first deploy, open the Vercel project and run migrations via the console or locally:

```bash
# Set production DATABASE_URL locally or use Vercel CLI
npx prisma migrate deploy
```

Or via Vercel CLI:

```bash
vercel env pull .env.production.local
npx prisma migrate deploy
```

## 6. Seed Stage 1 (Manual, One-Time)

Seed data is required for lessons to appear.

```bash
# Ensure DATABASE_URL points to production
npm run db:seed
```

> **Important:** Seed runs **manually only**. It does **not** execute automatically on builds.

## 7. Verify the Deployment

Check these endpoints and pages:

| Check | Expected Result |
|-------|---------------|
| `/` | Homepage loads |
| `/stage/1` | Stage 1 overview loads |
| `/lesson/print` | Lesson page loads |
| `/stage/1/final` | Final quest loads |
| `/chat` | Chat UI loads; AI replies in fallback mode if no key |
| `/ru` → `/en` | Locale switch works |
| Progress after reload | Persists (Supabase DB) |

## 8. Keep Local SQLite Development Working

Local development uses SQLite automatically when `DATABASE_URL` starts with `file:`.

```bash
# .env (local)
DATABASE_URL="file:./dev.db"
```

Prisma config auto-detects the `file:` prefix and uses `prisma/schema.sqlite.prisma`.

### Local workflow preserved:

```bash
npm install
npm run db:generate
npm run dev
```

### If you need to re-seed locally:

```bash
npm run db:seed
```

## 9. If Supabase Free Project Pauses

Supabase free-tier projects pause after 7 days of inactivity.

- **Resume:** Open the Supabase dashboard and click **Restore**.
- **Prevent:** Use a pinger (e.g., UptimeRobot) to hit your Vercel site periodically.
- **Upgrade:** Move to **Supabase Pro** for no-pause guarantees.

## 10. Why Obsidian/Pinecone Are Not Used as Runtime DB

- **Obsidian** is a note-taking tool. It has no ACID transactions, no query API, and no concurrency control for a web backend.
- **Pinecone** is a vector database for semantic search. It is not a general-purpose relational database and cannot store player progress, lessons, or transactional game state.
- **Supabase PostgreSQL** provides ACID compliance, relational integrity, and a managed service ideal for this project.

## 11. When to Move to Supabase Pro

Consider Pro when:

- Free-tier pauses become disruptive.
- You need branching, backups, or higher connection limits.
- Traffic exceeds free-tier limits.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `prisma generate` fails | Ensure `DATABASE_URL` is set |
| Build fails on Vercel | Check that `DATABASE_URL` is in Vercel env vars |
| `migrate deploy` fails | Ensure migrations exist; run `npx prisma migrate dev --name init` against a PostgreSQL DB first |
| AI mentor always offline | Add `DEEPSEEK_API_KEY` to Vercel env vars |
| Local dev broken | Verify `.env` has `DATABASE_URL="file:./dev.db"` |
