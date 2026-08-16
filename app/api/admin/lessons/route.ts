// app/api/admin/lessons/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import sql from "@/lib/db";
import type { Slide } from "@/lib/lesson-types";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const { lessonId, title, xpReward, slides } = await request.json();

    if (!lessonId || !Array.isArray(slides)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Delete existing slides for this lesson, then re-insert
    await sql`DELETE FROM lesson_slides WHERE lesson_id = ${lessonId}`;

    for (const slide of slides as Slide[]) {
      await sql`
        INSERT INTO lesson_slides (
          lesson_id, slide_order, slide_type,
          heading, body, image_emoji, video_url, video_title,
          duration, source_credit,
          question, is_role_play, role_context, mcq_options, explanation,
          xp_earned, badge_id, badge_name, badge_icon,
          lesson_title, goal, bullet_points,
          is_published
        ) VALUES (
          ${lessonId},
          ${slide.order},
          ${slide.type},
          ${(slide as any).heading        ?? null},
          ${(slide as any).body           ?? null},
          ${(slide as any).imageEmoji     ?? null},
          ${(slide as any).videoUrl       ?? null},
          ${(slide as any).title          ?? null},
          ${(slide as any).duration       ?? null},
          ${(slide as any).sourceCredit   ?? null},
          ${(slide as any).question       ?? null},
          ${(slide as any).isRolePlay     ?? false},
          ${(slide as any).roleContext    ?? null},
          ${(slide as any).options
            ? JSON.stringify((slide as any).options)
            : null},
          ${(slide as any).explanation    ?? null},
          ${(slide as any).xpEarned       ?? null},
          ${(slide as any).badgeId        ?? null},
          ${(slide as any).badgeName      ?? null},
          ${(slide as any).badgeIcon      ?? null},
          ${(slide as any).lessonTitle    ?? null},
          ${(slide as any).goal           ?? null},
          ${(slide as any).bulletPoints
            ? JSON.stringify((slide as any).bulletPoints)
            : null},
          true
        )
      `;
    }

    return NextResponse.json({ success: true, slidessaved: slides.length });

  } catch (err) {
    console.error("[admin/lessons] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
