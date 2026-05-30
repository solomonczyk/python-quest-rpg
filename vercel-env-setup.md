# Vercel Environment Variables Setup

Add these environment variables in Vercel Dashboard:
Go to: Project Settings → Environment Variables

## Required Variables

### Database (Supabase PostgreSQL)
```
DATABASE_URL=postgresql://postgres.wbshboebfwgbtnwdzulm:oXxtKnbcoS6F7xdq@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.wbshboebfwgbtnwdzulm:oXxtKnbcoS6F7xdq@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
```

### AI Mentor (DeepSeek)
```
DEEPSEEK_API_KEY=your-deepseek-api-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
```

### App Settings
```
NEXT_PUBLIC_DEFAULT_LOCALE=ru
```

## Build Command
Make sure your build command in Vercel includes Prisma generation:
```
prisma generate && next build
```

## Database Status
✅ Tables created: Player, Lesson, Progress, Attempt
✅ Initial data seeded: 4 lessons (1-1 to 1-4)
✅ Project: python-quest-rpg (wbshboebfwgbtnwdzulm)
