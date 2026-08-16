// app/admin/lessons/new/page.tsx
import { requireAdmin } from "@/lib/admin-auth";
import { CURRICULUM } from "@/lib/curriculum";
import LessonEditor from "@/components/admin/LessonEditor";

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function AdminNewLessonPage({ searchParams }: Props) {
  await requireAdmin();
  const { id } = await searchParams;

  // Find curriculum metadata if an ID was pre-filled via ?id=l2-1 etc.
  const curriculumLesson = id
    ? CURRICULUM.flatMap((lvl) => lvl.lessons).find((l) => l.id === id)
    : null;

  // Blank lesson template
  const blankLesson = {
    id:        id ?? "",
    levelId:   curriculumLesson?.levelId ?? "",
    number:    curriculumLesson?.number ?? 1,
    title:     curriculumLesson?.title ?? "",
    xpReward:  curriculumLesson?.xpReward ?? 50,
    badgeId:   curriculumLesson?.badgeId,
    slides:    [],
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          Admin → Lessons → New
        </p>
        <h1 className="text-2xl font-bold text-white">
          {curriculumLesson ? `Build: ${curriculumLesson.title}` : "New Lesson"}
        </h1>
        {curriculumLesson && (
          <p className="text-gray-400 text-sm mt-1">
            {id} · +{curriculumLesson.xpReward} XP
            {curriculumLesson.badgeId ? " · Badge included" : ""}
          </p>
        )}
      </div>

      <LessonEditor lesson={blankLesson as any} mode="new" />
    </div>
  );
}
