// app/api/admin/settings/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import sql from "@/lib/db";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    // Update each key-value pair
    for (const [key, value] of Object.entries(body)) {
      if (typeof value !== "string") continue;
      await sql`
        INSERT INTO site_settings (key, value)
        VALUES (${key}, ${value})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/settings] error:", err);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
