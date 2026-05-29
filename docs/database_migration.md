# Database Migration Guide: SQLite → PostgreSQL / Supabase

## Overview

The Prisma schema is designed to work with SQLite for local development and PostgreSQL for production. Both use `Int @id @default(autoincrement())` for IDs, which Prisma handles correctly for each provider.

## Steps

### 1. Update `prisma/schema.prisma`

Change the datasource block:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

> No other schema changes are required. `Int @id @default(autoincrement())` is automatically mapped to PostgreSQL `SERIAL`.

### 2. Update environment variables

Replace the SQLite DATABASE_URL in `.env` with your PostgreSQL connection string:

```bash
# Supabase connection example
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

### 3. Run Prisma migrations

```bash
npx prisma migrate dev --name init_postgres
npx prisma db seed
```

### 4. Re-generate Prisma Client

```bash
npx prisma generate
```

### 5. Deploy

Ensure your production environment sets `DATABASE_URL` to the PostgreSQL / Supabase connection string.

## Notes

- All business logic uses Prisma Client, so no SQLite-specific code exists in the application layer.
- JSON fields are stored as strings in SQLite and native JSON in PostgreSQL. The application uses `JSON.parse` / `JSON.stringify` consistently for both.
