import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { CIVIC_ELEMENTS } from "@/lib/society-config";

// POST /api/society/unlock — unlock a civic element
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    const { elementId } = await request.json();
    if (!elementId) return NextResponse.json({ error: "Missing elementId" }, { status: 400 });

    const element = CIVIC_ELEMENTS.find((e) => e.id === elementId);
    if (!element) return NextResponse.json({ error: "Unknown element" }, { status: 400 });

    // Check the user has completed enough lessons
    const userRows = await sql`
      SELECT lessons_completed FROM users WHERE clerk_id = ${userId} LIMIT 1
    `;
    const user = userRows[0];
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const completedCount = (user.lessons_completed ?? []).length;
    if (completedCount < element.unlockAt) {
      return NextResponse.json(
        { error: `Complete ${element.unlockAt} lessons to unlock ${element.name}` },
        { status: 403 }
      );
    }

    // Upsert society row and add element to unlocked array
    await sql`
      INSERT INTO society (clerk_id, unlocked, population, coins_spent)
      VALUES (
        ${userId},
        ARRAY[${elementId}::text],
        ${element.population},
        0
      )
      ON CONFLICT (clerk_id) DO UPDATE SET
        unlocked    = CASE
          WHEN NOT (${elementId}::text = ANY(society.unlocked))
          THEN array_append(society.unlocked, ${elementId}::text)
          ELSE society.unlocked
        END,
        population  = CASE
          WHEN NOT (${elementId}::text = ANY(society.unlocked))
          THEN society.population + ${element.population}
          ELSE society.population
        END,
        updated_at  = NOW()
    `;

    return NextResponse.json({ success: true, element: element.name });

  } catch (err) {
    console.error("[society/unlock] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/society/unlock — rename the city
export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    const { cityName } = await request.json();
    if (!cityName || typeof cityName !== "string" || cityName.trim().length < 1) {
      return NextResponse.json({ error: "Invalid city name" }, { status: 400 });
    }

    await sql`
      UPDATE society SET city_name = ${cityName.trim()}, updated_at = NOW()
      WHERE clerk_id = ${userId}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[society/rename] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
