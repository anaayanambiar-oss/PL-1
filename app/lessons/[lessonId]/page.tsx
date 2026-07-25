// app/lessons/[lessonId]/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { LESSONS } from "@/lib/lesson-content";
import LessonPlayer from "@/components/lesson/LessonPlayer";

interface Props {
  params: { lessonId: string };
}

export default async function LessonPage({ params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const lesson = LESSONS[params.lessonId];
  if (!lesson) notFound();

  return <LessonPlayer lesson={lesson} userId={userId} />;
}

export function generateStaticParams() {
  return Object.keys(LESSONS).map((id) => ({ lessonId: id }));
}

export function generateMetadata({ params }: Props) {
  const lesson = LESSONS[params.lessonId];
  return {
    title: lesson
      ? `${lesson.title} | PoliticaLearn`
      : "Lesson | PoliticaLearn",
  };
}
