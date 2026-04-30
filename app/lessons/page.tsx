import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import { CURRICULUM, TOTAL_LESSONS } from "@/lib/curriculum";
import LessonsIndexShell from "@/components/lessons/LessonsIndexShell";


export const metadata = { title: "Lessons | PoliticaLearn" };


export default async function LessonsPage() {
 const { userId } = await auth();
 if (!userId) redirect("/sign-in");


 const rows = await sql`
   SELECT current_level, lessons_completed, total_xp, streak_days
   FROM users
   WHERE clerk_id = ${userId}
   LIMIT 1
 `;
 const profile = rows[0] ?? null;
 if (!profile) redirect("/onboarding");


 const completed: string[] = profile.lessons_completed ?? [];


 return (
   <LessonsIndexShell
     curriculum={CURRICULUM}
     lessonsCompleted={completed}
     currentLevel={profile.current_level ?? 1}
     totalLessons={TOTAL_LESSONS}
   />
 );
}





