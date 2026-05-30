# Vercel Environment Variables - Updated

## Problem
Authentication failed against database server.
Supabase requires IPv4 for external connections, but free tier uses IPv6.

## Solution 1: Use Supabase Pooler (transaction mode, port 6543)
```
DATABASE_URL=postgresql://postgres.wbshboebfwgbtnwdzulm:oXxtKnbcoS6F7xdq@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

## Solution 2: Enable IPv4 in Supabase (paid add-on)
Go to Supabase Dashboard → Project Settings → Add-ons → IPv4

## Solution 3: Use Connection Pooler without pgbouncer parameter
```
DATABASE_URL=postgresql://postgres.wbshboebfwgbtnwdzulm:oXxtKnbcoS6F7xdq@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres.wbshboebfwgbtnwdzulm:oXxtKnbcoS6F7xdq@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
```

## Steps to fix:
1. Go to Vercel Dashboard → python-quest-rpg → Settings → Environment Variables
2. Update DATABASE_URL to use pooler without ?pgbouncer=true
3. Redeploy
