// lib/admin-auth.ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sql from "@/lib/db";

/**
 * Call at the top of every admin page/route.
 * Redirects to /dashboard if not signed in or not an admin.
 * Returns the userId if admin access is confirmed.
 */
export async function requireAdmin(): Promise<string> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const rows = await sql`
    SELECT is_admin FROM users WHERE clerk_id = ${userId} LIMIT 1
  `;

  const user = rows[0];
  if (!user || !user.is_admin) redirect("/dashboard");

  return userId;
}

/**
 * Returns true if the current user is an admin.
 * Safe to call in server components — does not redirect.
 */
export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;

  const rows = await sql`
    SELECT is_admin FROM users WHERE clerk_id = ${userId} LIMIT 1
  `;
  return rows[0]?.is_admin === true;
}
