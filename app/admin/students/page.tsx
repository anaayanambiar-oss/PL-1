// app/admin/students/page.tsx
import { requireAdmin } from "@/lib/admin-auth";
import sql from "@/lib/db";
import { TOTAL_LESSONS } from "@/lib/curriculum";

export default async function AdminStudentsPage() {
  await requireAdmin();

  const students = await sql`
    SELECT
      name,
      age,
      grade,
      current_level,
      total_xp,
      streak_days,
      last_active_date,
      array_length(lessons_completed, 1) as lessons_done,
      array_length(badges, 1) as badge_count,
      onboarding_done,
      created_at
    FROM users
    WHERE is_admin = FALSE
    ORDER BY total_xp DESC, created_at DESC
  `;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Students</h1>
        <p className="text-gray-400 text-sm">
          {students.length} registered · sorted by XP
        </p>
      </div>

      {students.length === 0 ? (
        <div className="bg-gray-900 rounded-2xl border border-white/[0.06] p-12
                        text-center">
          <div className="text-5xl mb-4">👥</div>
          <p className="text-white font-bold mb-1">No students yet</p>
          <p className="text-gray-500 text-sm">
            Students will appear here once they sign up and complete onboarding.
          </p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-2xl border border-white/[0.06] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-7 gap-4 px-6 py-3 border-b border-white/[0.06]
                          text-xs font-bold uppercase tracking-wider text-gray-500">
            <span className="col-span-2">Student</span>
            <span>Level</span>
            <span>XP</span>
            <span>Lessons</span>
            <span>Streak</span>
            <span>Last Active</span>
          </div>

          {/* Student rows */}
          <div className="divide-y divide-white/[0.04]">
            {students.map((s, i) => {
              const lessonsDone = s.lessons_done ?? 0;
              const pct = Math.round((lessonsDone / TOTAL_LESSONS) * 100);
              const lastActive = s.last_active_date
                ? new Date(s.last_active_date).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short",
                  })
                : "Never";

              return (
                <div key={i}
                  className="grid grid-cols-7 gap-4 px-6 py-4 items-center
                             hover:bg-white/[0.02] transition-colors">

                  {/* Name + age */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center
                                    justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                      {(s.name ?? "?")[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {s.name ?? "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Age {s.age ?? "?"} · {s.grade ?? "—"}
                      </p>
                    </div>
                  </div>

                  {/* Level */}
                  <span className="text-sm text-gray-300">
                    Level {s.current_level ?? 1}
                  </span>

                  {/* XP */}
                  <span className="text-sm font-bold text-orange-400">
                    {s.total_xp ?? 0}
                  </span>

                  {/* Lessons with mini bar */}
                  <div>
                    <p className="text-sm text-gray-300 mb-1">
                      {lessonsDone}/{TOTAL_LESSONS}
                    </p>
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden w-16">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Streak */}
                  <span className="text-sm text-gray-300">
                    {s.streak_days ?? 0}🔥
                  </span>

                  {/* Last active */}
                  <span className="text-xs text-gray-500">{lastActive}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
