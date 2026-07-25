// app/api/lessons/complete/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const { lessonId, xpEarned, badgeId } = await request.json();

    if (!lessonId || typeof lessonId !== "string") {
      return NextResponse.json({ error: "Invalid lessonId" }, { status: 400 });
    }

    // Add to lessons_completed (only if not already there),
    // increment XP, add badge, update last_active_date
    await sql`
      UPDATE users
      SET
        lessons_completed = CASE
          WHEN NOT (${lessonId} = ANY(lessons_completed))
          THEN array_append(lessons_completed, ${lessonId})
          ELSE lessons_completed
        END,
        total_xp = total_xp + CASE
          WHEN NOT (${lessonId} = ANY(lessons_completed))
          THEN ${xpEarned}::integer
          ELSE 0
        END,
        last_score       = 100,
        last_active_date = CURRENT_DATE,
        badges = CASE
          WHEN ${badgeId}::text IS NOT NULL
            AND NOT (${badgeId}::text = ANY(badges))
          THEN array_append(badges, ${badgeId}::text)
          ELSE badges
        END,
        updated_at = NOW()
      WHERE clerk_id = ${userId}
    `;

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[lessons/complete] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
