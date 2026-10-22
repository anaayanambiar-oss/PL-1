// app/api/society/rename/route.ts
// Renames the student's city. Moved from the old unlock route's PATCH handler.
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sql from "@/lib/db";

const MAX_CITY_NAME = 40;

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    const { cityName } = await request.json();
    const name = typeof cityName === "string" ? cityName.trim() : "";
    if (name.length < 1 || name.length > MAX_CITY_NAME) {
      return NextResponse.json({ error: "Invalid city name" }, { status: 400 });
    }

    // Upsert: the society row may not exist yet if nothing has been built.
    await sql`
      INSERT INTO society (clerk_id, city_name) VALUES (${userId}, ${name})
      ON CONFLICT (clerk_id) DO UPDATE SET city_name = EXCLUDED.city_name, updated_at = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[society/rename]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
