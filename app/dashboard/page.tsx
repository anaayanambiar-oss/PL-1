import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import { CURRICULUM, TOTAL_LESSONS } from "@/lib/curriculum";
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
     current_level,
     lessons_completed,
     total_xp,
     last_score,
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


 // Determine the next lesson to show
 const completed: string[] = profile.lessons_completed ?? [];
 const allLessons = CURRICULUM.flatMap((lvl) => lvl.lessons);
 const nextLesson = allLessons.find((l) => !completed.includes(l.id)) ?? null;
 const currentLevel = CURRICULUM.find(
   (lvl) => lvl.number === (profile.current_level ?? 1)
 ) ?? CURRICULUM[0];


 // XP to reach next level threshold (simple formula: level × 200)
 const xpForNextLevel = (profile.current_level ?? 1) * 200;


 return (
   <DashboardShell
     profile={{
       name:            profile.name,
       age:             profile.age,
       currentLevel:    profile.current_level ?? 1,
       lessonsCompleted: completed,
       totalXP:         profile.total_xp ?? 0,
       streakDays:      profile.streak_days ?? 0,
       badges:          profile.badges ?? [],
       lastActiveDate:  profile.last_active_date ?? null,
     }}
     nextLesson={nextLesson}
     currentLevel={currentLevel}
     totalLessons={TOTAL_LESSONS}
     xpForNextLevel={xpForNextLevel}
     clerkFirstName={clerkUser?.firstName ?? null}
   />
 );
}




