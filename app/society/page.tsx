import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import SocietyShell from "@/components/society/SocietyShell";

export const metadata = { title: "My Society | PoliticaLearn" };

export default async function SocietyPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Fetch user progress
  const userRows = await sql`
    SELECT lessons_completed, total_xp, name
    FROM users
    WHERE clerk_id = ${userId}
    LIMIT 1
  `;
  const user = userRows[0] ?? null;
  if (!user) redirect("/onboarding");

  const lessonsCompleted: string[] = user.lessons_completed ?? [];

  // Fetch or initialise society row
  let societyRows = await sql`
    SELECT city_name, unlocked, population, coins_spent
    FROM society
    WHERE clerk_id = ${userId}
    LIMIT 1
  `;

  // Auto-create society row on first visit
  if (societyRows.length === 0) {
    await sql`
      INSERT INTO society (clerk_id, city_name, unlocked, population, coins_spent)
      VALUES (${userId}, 'My City', '{}', 0, 0)
      ON CONFLICT (clerk_id) DO NOTHING
    `;
    societyRows = await sql`
      SELECT city_name, unlocked, population, coins_spent
      FROM society WHERE clerk_id = ${userId} LIMIT 1
    `;
  }

  const society = societyRows[0];

  return (
    <SocietyShell
      userId={userId}
      userName={user.name}
      cityName={society.city_name}
      unlocked={society.unlocked ?? []}
      population={society.population ?? 0}
      coinsSpent={society.coins_spent ?? 0}
      lessonsCompleted={lessonsCompleted}
      totalXP={user.total_xp ?? 0}
    />
  );
}
