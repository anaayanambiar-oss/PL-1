# Admin Panel — Setup Guide

## Step 1 — Run the SQL schema in Neon

Open Neon Dashboard → SQL Editor, paste and run `ADMIN_SCHEMA.sql`.

This:
- Adds `is_admin` column to the `users` table
- Creates `lesson_slides` table (for future dynamic content)
- Creates `site_settings` table with default values

## Step 2 — Make yourself an admin

In Neon SQL Editor, first find your Clerk user ID:
```sql
SELECT clerk_id, name FROM users;
```

Then set yourself as admin:
```sql
UPDATE users SET is_admin = TRUE WHERE clerk_id = 'user_YOUR_CLERK_ID_HERE';
```

## Step 3 — Add files to GitHub

| File | Destination |
|------|-------------|
| `app/admin/layout.tsx` | `app/admin/layout.tsx` |
| `app/admin/page.tsx` | `app/admin/page.tsx` |
| `app/admin/lessons/page.tsx` | `app/admin/lessons/page.tsx` |
| `app/admin/students/page.tsx` | `app/admin/students/page.tsx` |
| `app/admin/settings/page.tsx` | `app/admin/settings/page.tsx` |
| `app/api/admin/settings/route.ts` | `app/api/admin/settings/route.ts` |
| `app/api/admin/users/route.ts` | `app/api/admin/users/route.ts` |
| `components/admin/AdminSidebar.tsx` | `components/admin/AdminSidebar.tsx` |
| `components/admin/AdminSettingsForm.tsx` | `components/admin/AdminSettingsForm.tsx` |
| `lib/admin-auth.ts` | `lib/admin-auth.ts` |

## Step 4 — Add to middleware

Open `middleware.ts` and add `/admin` to the protected routes:

```ts
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
  "/lessons(.*)",
  "/admin(.*)",    // ← add this line
]);
```

## Step 5 — Test

Visit `your-url.vercel.app/admin`

- If you set `is_admin = TRUE` for your account → you see the admin panel
- If you visit as a non-admin student → redirected to /dashboard
- If not signed in → redirected to /sign-in

## What each page does

| Page | URL | Description |
|------|-----|-------------|
| Overview | `/admin` | Stats: total students, active users, completions |
| Lessons | `/admin/lessons` | List all lessons by level with Published/Pending status |
| Students | `/admin/students` | Table of all students sorted by XP with progress bars |
| Settings | `/admin/settings` | Toggle maintenance mode, announcements, allow sign-ups |
