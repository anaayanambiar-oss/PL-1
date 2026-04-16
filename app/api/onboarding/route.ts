import { auth } from "@clerk/nextjs/server";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    // 2. Parse body
    const body = await request.json();
    const { name, age, grade, interest } = body;

    // 3. Validate
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }
    if (!age || typeof age !== "number" || age < 7 || age > 13) {
      return NextResponse.json({ error: "Age must be between 7 and 13" }, { status: 400 });
    }

    // 4. Upsert — initialise all columns on first insert
    await sql`
      INSERT INTO users (
        clerk_id,
        name,
        age,
        grade,
        interest,
        current_level,
        lessons_completed,
        total_xp,
        last_score,
        streak_days,
        last_active_date,
        badges,
        onboarding_done,
        created_at,
        updated_at
      )
      VALUES (
        ${userId},
        ${name.trim()},
        ${age},
        ${grade ?? "other"},
        ${interest ?? ""},
        1,
        '{}',
        0,
        NULL,
        0,
        CURRENT_DATE,
        '{}',
        true,
        NOW(),
        NOW()
      )
      ON CONFLICT (clerk_id)
      DO UPDATE SET
        name             = EXCLUDED.name,
        age              = EXCLUDED.age,
        grade            = EXCLUDED.grade,
        interest         = EXCLUDED.interest,
        onboarding_done  = true,
        updated_at       = NOW()
    `;

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[onboarding] API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}


