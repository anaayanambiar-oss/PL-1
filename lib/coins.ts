// lib/coins.ts
// The one place a balance is read (guideline v2.0, section 13).
// Balance is always derived — earned minus spent — and never stored.
import sql from "@/lib/db";

export interface CoinBalance {
  earned:  number;
  spent:   number;
  balance: number;
}

export async function getCoinBalance(userId: string): Promise<CoinBalance> {
  const rows = await sql`
    SELECT u.coins_earned, COALESCE(s.coins_spent, 0) AS coins_spent
    FROM users u
    LEFT JOIN society s ON s.clerk_id = u.clerk_id
    WHERE u.clerk_id = ${userId}
    LIMIT 1
  `;
  // Number(): the driver returns bigint/numeric columns as strings.
  const earned = Number(rows[0]?.coins_earned ?? 0);
  const spent  = Number(rows[0]?.coins_spent ?? 0);
  return { earned, spent, balance: earned - spent };
}
