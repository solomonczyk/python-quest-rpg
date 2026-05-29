# Database Migration Guide

## Dual-Database Strategy

| Environment | Provider | Schema File | When to Use |
|-------------|----------|-------------|-------------|
| Local dev   | SQLite   | `prisma/schema.sqlite.prisma` | Daily development on your machine |
| Production  | PostgreSQL | `prisma/schema.prisma` | Vercel + Supabase deployment |

## How It Works

`prisma.config.ts` auto-detects the database URL:

- If `DATABASE_URL` starts with `file:` → uses `schema.sqlite.prisma`
- Otherwise → uses `schema.prisma` (PostgreSQL)

Both schemas share identical models. `Int @id @default(autoincrement())` maps correctly for each provider.

## Local Development (SQLite)

```bash
# .env
DATABASE_URL="file:./dev.db"

# Commands
npm run db:generate
npm run dev
npm run db:seed      # seed locally if needed
```

## Production Setup (Supabase PostgreSQL)

### 1. Create Supabase project
Get connection string from **Project Settings → Database → URI**.

### 2. Set environment variable
```bash
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Deploy migrations
```bash
npx prisma migrate deploy
```

### 5. Seed data (manual, one-time)
```bash
npm run db:seed
```

> **Important:** Seed does **not** run automatically on builds.

## Switching Back to Local

Change `DATABASE_URL` back to `file:./dev.db` and run:
```bash
npm run db:generate
npm run dev
```

## Notes

- All business logic uses Prisma Client. No SQLite-specific or PostgreSQL-specific code exists in the application layer.
- JSON fields are stored as strings in both databases. The application uses `JSON.parse` / `JSON.stringify` consistently.
