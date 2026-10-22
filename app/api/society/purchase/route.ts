// app/api/society/purchase/route.ts
// Buys one Society Builder item (guideline v2.0, section 9.1). Replaces the
// old /api/onboarding/society/unlock route.
//
// Every check runs in the database, in one statement:
//   • enough balance (lifetime earned − spent)
//   • the item's tier gate is met
//   • the item's quantity limit isn't reached
// The society row is the lock: a concurrent purchase waits, then re-checks
// against the new coins_spent. The unique (clerk_id, item_id, copy_no) key
// stops duplicate copies — if two identical clicks race, the second statement
// fails as a whole and no coins are taken.
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getItem, getTier } from "@/lib/society-config";
import { awardBadges } from "@/lib/badges";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    const { itemId } = await request.json();
    const item = typeof itemId === "string" ? getItem(itemId) : undefined;
    if (!item) return NextResponse.json({ error: "Unknown item" }, { status: 400 });
    const requires = getTier(item.tier).requires;

    // city_name, coins_spent and the legacy columns get their defaults from
    // the migration (migrations/coins-badges-society-v2.sql, step 4).
    await sql`
      INSERT INTO society (clerk_id) VALUES (${userId}) ON CONFLICT (clerk_id) DO NOTHING
    `;

    let rows;
    try {
      rows = await sql`
        WITH paid AS (
          UPDATE society AS s
          SET coins_spent = COALESCE(s.coins_spent, 0) + ${item.cost}::integer,
              updated_at  = NOW()
          FROM users AS u
          WHERE s.clerk_id = ${userId}
            AND u.clerk_id = s.clerk_id
            AND (u.coins_earned - COALESCE(s.coins_spent, 0)) >= ${item.cost}::integer
            AND COALESCE(u.lessons_completed, '{}') @> ${requires}::text[]
            AND (${item.maxQuantity}::integer IS NULL OR
                 (SELECT COUNT(*)::integer FROM society_items
                  WHERE clerk_id = ${userId} AND item_id = ${item.id}) < ${item.maxQuantity}::integer)
          RETURNING u.coins_earned, s.coins_spent
        )
        INSERT INTO society_items (clerk_id, item_id, price_paid, copy_no)
        SELECT ${userId}, ${item.id}, ${item.cost}::integer,
               (SELECT COUNT(*)::integer FROM society_items
                WHERE clerk_id = ${userId} AND item_id = ${item.id}) + 1
        FROM paid
        RETURNING (SELECT coins_earned - coins_spent FROM paid) AS balance
      `;
    } catch (err) {
      // Unique violation: another purchase of this item raced this one and the
      // whole statement rolled back, so nothing was charged. (In practice the
      // society-row upsert above already makes a second click wait and re-check;
      // this is the backstop.)
      if ((err as { code?: string })?.code === "23505") {
        const error = item.maxQuantity === 1 ? "Already built" : "Please try again";
        return NextResponse.json({ error }, { status: 409 });
      }
      throw err;
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Not enough coins, locked, or already built" },
        { status: 402 }
      );
    }

    // A badge earned here can pay a bonus (e.g. a level badge a migrated
    // student never received), so include it in the balance shown.
    const newBadges = await awardBadges(userId);
    const bonus = newBadges.reduce((sum, b) => sum + b.bonus, 0);
    return NextResponse.json({
      success: true,
      balance: Number(rows[0].balance) + bonus,
      newBadges,
    });
  } catch (err) {
    console.error("[society/purchase]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
