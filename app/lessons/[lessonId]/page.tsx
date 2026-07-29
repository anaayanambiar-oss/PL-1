import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
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

  return <LessonPlayer lesson={lesson} userId={userId} />;
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

