// app/admin/lessons/[lessonId]/page.tsx
import { requireAdmin } from "@/lib/admin-auth";
import { notFound } from "next/navigation";
import { LESSONS } from "@/lib/lesson-content";
import { CURRICULUM } from "@/lib/curriculum";
import LessonEditor from "@/components/admin/LessonEditor";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export default async function AdminEditLessonPage({ params }: Props) {
  await requireAdmin();
  const { lessonId } = await params;

  const lesson = LESSONS[lessonId];
  if (!lesson) notFound();

  // Find the curriculum entry for this lesson (for metadata)
  const curriculumLesson = CURRICULUM
    .flatMap((lvl) => lvl.lessons)
    .find((l) => l.id === lessonId);

  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          Admin → Lessons → Edit
        </p>
        <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
        <p className="text-gray-400 text-sm mt-1">
          {lesson.id} · Level {curriculumLesson?.levelId?.replace("level-", "") ?? "?"} ·
          {lesson.slides.length} slides · +{lesson.xpReward} XP
        </p>
      </div>

      <LessonEditor lesson={lesson} mode="edit" />
    </div>
  );
}
