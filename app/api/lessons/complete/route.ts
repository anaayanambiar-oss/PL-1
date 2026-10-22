// app/api/lessons/complete/route.ts
// Pays a lesson's base coins on its first completion (guideline v2.0,
// section 8). The amount comes from lib/coin-config.ts — the old route
// trusted xpEarned and badgeId from the browser.
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { LESSONS } from "@/lib/lesson-content";
import { getLessonBaseCoins, MCQ_FIRST_TRY_BONUS } from "@/lib/coin-config";
import { awardBadges } from "@/lib/badges";
import { getCoinBalance } from "@/lib/coins";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    const { lessonId } = await request.json();
    const lesson = typeof lessonId === "string" ? LESSONS[lessonId] : undefined;
    const base = lesson ? getLessonBaseCoins(lessonId) : null;
    if (!lesson || base === null) {
      return NextResponse.json({ error: "Unknown lesson" }, { status: 400 });
    }

    // Every MCQ in the lesson must have been answered at least once.
    const mcqIds = lesson.slides.filter((s) => s.type === "mcq").map((s) => s.id);
    const answered = await sql`
      SELECT slide_id, first_try_correct FROM mcq_results
      WHERE clerk_id = ${userId} AND lesson_id = ${lessonId}
    `;
    const answeredSet = new Set(answered.map((r) => r.slide_id as string));
    if (!mcqIds.every((id) => answeredSet.has(id))) {
      return NextResponse.json({ error: "Finish all questions first" }, { status: 400 });
    }

    // Conditional on the lesson not being completed yet, so the RETURNING row
    // says whether THIS request completed it. Two racing requests serialise on
    // the row lock; the second re-checks the WHERE, matches nothing, and is
    // correctly told the coins were already paid.
    const completedNow = await sql`
      UPDATE users SET
        coins_earned      = coins_earned + ${base}::integer,
        lessons_completed = array_append(COALESCE(lessons_completed, '{}'), ${lessonId}::text),
        last_active_date  = CURRENT_DATE,
        updated_at        = NOW()
      WHERE clerk_id = ${userId}
        AND NOT (${lessonId}::text = ANY(COALESCE(lessons_completed, '{}')))
      RETURNING 1
    `;
    const alreadyCompleted = completedNow.length === 0;

    if (alreadyCompleted) {
      // Replay (or no profile): still counts as activity, but pays nothing.
      const touched = await sql`
        UPDATE users SET last_active_date = CURRENT_DATE, updated_at = NOW()
        WHERE clerk_id = ${userId}
        RETURNING 1
      `;
      if (touched.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newBadges = await awardBadges(userId);
    const { balance } = await getCoinBalance(userId);

    // First-try bonuses already paid for this lesson's MCQs, for the
    // completion screen's "+N coins" total. 0 on a replay.
    const mcqCoins = alreadyCompleted ? 0 :
      answered.filter((r) => r.first_try_correct === true && mcqIds.includes(r.slide_id)).length
        * MCQ_FIRST_TRY_BONUS;

    return NextResponse.json({
      success: true,
      alreadyCompleted,
      coinsAwarded: alreadyCompleted ? 0 : base,
      mcqCoins,
      newBadges, // [{ id, bonus }]
      balance,
    });
  } catch (err) {
    console.error("[lessons/complete]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
