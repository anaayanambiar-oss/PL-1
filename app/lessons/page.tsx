import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import { CURRICULUM, TOTAL_LESSONS, getCurrentLevel } from "@/lib/curriculum";
import { getCoinBalance } from "@/lib/coins";
import LessonsIndexShell from "@/components/lessons/LessonsIndexShell";


export const metadata = { title: "Lessons | PoliticaLearn" };


export default async function LessonsPage() {
 const { userId } = await auth();
 if (!userId) redirect("/sign-in");


 const rows = await sql`
   SELECT lessons_completed, streak_days
   FROM users
   WHERE clerk_id = ${userId}
   LIMIT 1
 `;
 const profile = rows[0] ?? null;
 if (!profile) redirect("/onboarding");


 const completed: string[] = profile.lessons_completed ?? [];
 const { balance } = await getCoinBalance(userId);


 return (
   <LessonsIndexShell
     curriculum={CURRICULUM}
     lessonsCompleted={completed}
     // Derived from completed lessons; users.current_level is never updated,
     // which left Levels 2 and 3 locked for everyone.
     currentLevel={getCurrentLevel(completed).number}
     coinBalance={balance}
     totalLessons={TOTAL_LESSONS}
   />
 );
}





