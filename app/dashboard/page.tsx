import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import { CURRICULUM, TOTAL_LESSONS, getCurrentLevel } from "@/lib/curriculum";
import { getCoinBalance } from "@/lib/coins";
import DashboardShell from "@/components/dashboard/DashboardShell";


export default async function DashboardPage() {
 const { userId } = await auth();
 if (!userId) redirect("/sign-in");


 const clerkUser = await currentUser();


 // Fetch full profile from Neon
 const rows = await sql`
   SELECT
     name,
     age,
     lessons_completed,
     streak_days,
     last_active_date,
     badges,
     onboarding_done
   FROM users
   WHERE clerk_id = ${userId}
   LIMIT 1
 `;
 const profile = rows[0] ?? null;


 // No profile or onboarding incomplete → back to onboarding
 if (!profile || !profile.onboarding_done) {
   redirect("/onboarding");
 }


 const [coins, itemRows] = await Promise.all([
   getCoinBalance(userId),
   sql`SELECT item_id, COUNT(*)::integer AS qty
       FROM society_items WHERE clerk_id = ${userId} GROUP BY item_id`,
 ]);
 const ownedCounts: Record<string, number> = Object.fromEntries(
   itemRows.map((r) => [r.item_id as string, Number(r.qty)])
 );


 // Determine the next lesson to show
 const completed: string[] = profile.lessons_completed ?? [];
 const allLessons = CURRICULUM.flatMap((lvl) => lvl.lessons);
 const nextLesson = allLessons.find((l) => !completed.includes(l.id)) ?? null;
 // Derived from completed lessons; users.current_level is never updated.
 const currentLevel = getCurrentLevel(completed);


 return (
   <DashboardShell
     profile={{
       name:             profile.name,
       age:              profile.age,
       currentLevel:     currentLevel.number,
       lessonsCompleted: completed,
       coinBalance:      coins.balance,
       streakDays:       profile.streak_days ?? 0,
       badges:           profile.badges ?? [],
       lastActiveDate:   profile.last_active_date ?? null,
     }}
     nextLesson={nextLesson}
     currentLevel={currentLevel}
     totalLessons={TOTAL_LESSONS}
     ownedCounts={ownedCounts}
     clerkFirstName={clerkUser?.firstName ?? null}
   />
 );
}
