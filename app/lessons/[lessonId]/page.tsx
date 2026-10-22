import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import sql from "@/lib/db";
import { LESSONS } from "@/lib/lesson-content";
import LessonPlayer from "@/components/lesson/LessonPlayer";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { lessonId } = await params;
  const lesson = LESSONS[lessonId];
  if (!lesson) notFound();

  // Questions whose first attempt is already recorded (a replay): no coins
  // are possible for them, so the MCQ view won't promise any.
  const answered = await sql`
    SELECT slide_id FROM mcq_results
    WHERE clerk_id = ${userId} AND lesson_id = ${lessonId}
  `;

  return (
    <LessonPlayer
      lesson={lesson}
      answeredSlideIds={answered.map((r) => r.slide_id as string)}
    />
  );
}

export async function generateStaticParams() {
  return Object.keys(LESSONS).map((id) => ({ lessonId: id }));
}

export async function generateMetadata({ params }: Props) {
  const { lessonId } = await params;
  const lesson = LESSONS[lessonId];
  return {
    title: lesson
      ? `${lesson.title} | PoliticaLearn`
      : "Lesson | PoliticaLearn",
  };
}

