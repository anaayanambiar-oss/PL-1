// app/api/lessons/answer/route.ts
// Records a student's FIRST attempt at an MCQ and pays the first-try bonus
// (guideline v2.0, section 7.1). Correctness is checked here against the
// lesson content, never taken from the browser. Retries are not sent.
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { LESSONS } from "@/lib/lesson-content";
import { MCQ_FIRST_TRY_BONUS } from "@/lib/coin-config";
import type { MCQSlide } from "@/lib/lesson-types";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    const { lessonId, slideId, optionId } = await request.json();
    if (typeof lessonId !== "string" || typeof slideId !== "string" || typeof optionId !== "string") {
      return NextResponse.json({ error: "Invalid answer" }, { status: 400 });
    }

    const slide = LESSONS[lessonId]?.slides.find(
      (s) => s.id === slideId && s.type === "mcq"
    ) as MCQSlide | undefined;
    const option = slide?.options.find((o) => o.id === optionId);
    if (!slide || !option) return NextResponse.json({ error: "Invalid answer" }, { status: 400 });

    const correct = option.isCorrect;

    // One atomic statement: record the first attempt, pay the bonus, move the
    // streak. The unique (clerk_id, slide_id) key makes later attempts no-ops.
    // The EXISTS guard stops a first attempt being recorded (and its bonus
    // lost forever) for someone who has no users row yet.
    const rows = await sql`
      WITH ins AS (
        INSERT INTO mcq_results (clerk_id, lesson_id, slide_id, first_try_correct)
        SELECT ${userId}, ${lessonId}, ${slideId}, ${correct}::boolean
        WHERE EXISTS (SELECT 1 FROM users WHERE clerk_id = ${userId})
        ON CONFLICT (clerk_id, slide_id) DO NOTHING
        RETURNING first_try_correct
      )
      UPDATE users SET
        coins_earned = coins_earned + CASE
          WHEN EXISTS (SELECT 1 FROM ins) AND ${correct}::boolean
          THEN ${MCQ_FIRST_TRY_BONUS}::integer ELSE 0 END,
        mcq_streak = CASE
          WHEN NOT EXISTS (SELECT 1 FROM ins) THEN mcq_streak
          WHEN ${correct}::boolean THEN mcq_streak + 1
          ELSE 0 END,
        updated_at = NOW()
      WHERE clerk_id = ${userId}
      RETURNING EXISTS (SELECT 1 FROM ins) AS first_attempt, mcq_streak
    `;
    if (!rows[0]) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const firstAttempt = rows[0].first_attempt === true;
    return NextResponse.json({
      correct,
      firstAttempt,
      coinsAwarded: firstAttempt && correct ? MCQ_FIRST_TRY_BONUS : 0,
    });
  } catch (err) {
    console.error("[lessons/answer]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
