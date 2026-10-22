import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import { getCoinBalance } from "@/lib/coins";
import SocietyShell from "@/components/society/SocietyShell";

export const metadata = { title: "My Society | PoliticaLearn" };

export default async function SocietyPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Fetch user progress
  const userRows = await sql`
    SELECT lessons_completed, name
    FROM users
    WHERE clerk_id = ${userId}
    LIMIT 1
  `;
  const user = userRows[0] ?? null;
  if (!user) redirect("/onboarding");

  const [societyRows, itemRows, coins] = await Promise.all([
    sql`SELECT city_name FROM society WHERE clerk_id = ${userId} LIMIT 1`,
    // One row per purchase, oldest first — the town view shows them in order.
    sql`SELECT item_id FROM society_items
        WHERE clerk_id = ${userId}
        ORDER BY purchased_at, copy_no`,
    getCoinBalance(userId),
  ]);

  return (
    <SocietyShell
      userName={user.name}
      cityName={societyRows[0]?.city_name ?? "My City"}
      ownedItems={itemRows.map((r) => r.item_id as string)}
      balance={coins.balance}
      lessonsCompleted={user.lessons_completed ?? []}
    />
  );
}
