// app/admin/lessons/page.tsx
import { requireAdmin } from "@/lib/admin-auth";
import { CURRICULUM } from "@/lib/curriculum";
import { LESSONS } from "@/lib/lesson-content";
import Link from "next/link";

export default async function AdminLessonsPage() {
  await requireAdmin();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Lessons</h1>
          <p className="text-gray-400 text-sm">
            {Object.keys(LESSONS).length} lessons published across {CURRICULUM.length} levels
          </p>
        </div>
        <Link
          href="/admin/lessons/new"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500
                     text-white text-sm font-bold transition-colors"
        >
          + Add Lesson
        </Link>
      </div>

      {/* Lessons by level */}
      <div className="flex flex-col gap-6">
        {CURRICULUM.map((level) => (
          <div key={level.id}
            className="bg-gray-900 rounded-2xl border border-white/[0.06] overflow-hidden">

            {/* Level header */}
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center
                            justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider
                                 text-blue-400 mr-3">Level {level.number}</span>
                <span className="text-white font-bold">{level.title}</span>
              </div>
              <span className="text-xs text-gray-500">
                {level.lessons.filter(l => LESSONS[l.id]).length} / {level.lessons.length} built
              </span>
            </div>

            {/* Lesson rows */}
            <div className="divide-y divide-white/[0.04]">
              {level.lessons.map((lesson) => {
                const isBuilt = !!LESSONS[lesson.id];
                const slideCount = isBuilt ? LESSONS[lesson.id].slides.length : 0;

                return (
                  <div key={lesson.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02]
                               transition-colors">

                    {/* Status dot */}
                    <div className={`w-2 h-2 rounded-full flex-shrink-0
                                     ${isBuilt ? "bg-green-500" : "bg-gray-600"}`} />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white mb-0.5">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {lesson.id} · +{lesson.xpReward} XP
                        {lesson.badgeId ? " · Badge" : ""}
                        {isBuilt ? ` · ${slideCount} slides` : " · Not yet built"}
                      </p>
                    </div>

                    {/* Status badge */}
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                                       ${isBuilt
                                         ? "bg-green-500/15 text-green-400"
                                         : "bg-gray-700 text-gray-400"}`}>
                      {isBuilt ? "Published" : "Pending"}
                    </span>

                    {/* Actions */}
                    {isBuilt && (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/lessons/${lesson.id}`}
                          target="_blank"
                          className="text-xs text-gray-400 hover:text-white px-3 py-1.5
                                     rounded-lg hover:bg-white/10 transition-all"
                        >
                          Preview ↗
                        </Link>
                        <Link
                          href={`/admin/lessons/${lesson.id}`}
                          className="text-xs text-blue-400 hover:text-blue-300 px-3 py-1.5
                                     rounded-lg hover:bg-blue-500/10 transition-all"
                        >
                          Edit
                        </Link>
                      </div>
                    )}
                    {!isBuilt && (
                      <Link
                        href={`/admin/lessons/new?id=${lesson.id}`}
                        className="text-xs text-orange-400 hover:text-orange-300 px-3 py-1.5
                                   rounded-lg hover:bg-orange-500/10 transition-all"
                      >
                        Build →
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
