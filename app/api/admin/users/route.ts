// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import sql from "@/lib/db";

// PATCH — grant or revoke admin
export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const { clerkId, isAdmin } = await request.json();

    if (!clerkId || typeof isAdmin !== "boolean") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await sql`
      UPDATE users SET is_admin = ${isAdmin}, updated_at = NOW()
      WHERE clerk_id = ${clerkId}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/users] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
