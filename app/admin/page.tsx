// app/admin/page.tsx
import { requireAdmin } from "@/lib/admin-auth";
import sql from "@/lib/db";
import { LESSONS } from "@/lib/lesson-content";
import Link from "next/link";

export default async function AdminHomePage() {
  await requireAdmin();

  // Fetch key stats
  const [totalUsersRow, activeUsersRow, completionsRow] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM users WHERE is_admin = FALSE`,
    sql`SELECT COUNT(*) as count FROM users
        WHERE is_admin = FALSE
        AND last_active_date >= CURRENT_DATE - INTERVAL '7 days'`,
    sql`SELECT SUM(array_length(lessons_completed, 1)) as count
        FROM users WHERE is_admin = FALSE`,
  ]);

  const totalStudents  = Number(totalUsersRow[0]?.count  ?? 0);
  const activeStudents = Number(activeUsersRow[0]?.count ?? 0);
  const totalCompletions = Number(completionsRow[0]?.count ?? 0);
  const totalLessons   = Object.keys(LESSONS).length;

  const stats = [
    { label: "Total Students",      value: totalStudents,    icon: "👥", color: "text-blue-400",   bg: "bg-blue-500/10"   },
    { label: "Active (7 days)",     value: activeStudents,   icon: "🔥", color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Lesson Completions",  value: totalCompletions, icon: "✅", color: "text-green-400",  bg: "bg-green-500/10"  },
    { label: "Published Lessons",   value: totalLessons,     icon: "📚", color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  const quickLinks = [
    { href: "/admin/lessons",  label: "Manage Lessons",  icon: "📚", desc: "Add, edit, or remove lesson content" },
    { href: "/admin/students", label: "View Students",   icon: "👥", desc: "Browse student progress and activity" },
    { href: "/admin/settings", label: "Site Settings",   icon: "⚙️", desc: "Manage announcements and platform flags" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
        <p className="text-gray-400 text-sm">PoliticaLearn — internal management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label}
            className={`${s.bg} rounded-2xl p-5 border border-white/5`}>
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className={`font-bold text-3xl ${s.color} mb-1`}>{s.value}</div>
            <div className="text-gray-400 text-xs font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="bg-gray-900 rounded-2xl p-6 border border-white/[0.06]
                       hover:border-white/20 hover:bg-gray-800 transition-all group"
          >
            <div className="text-3xl mb-3">{l.icon}</div>
            <p className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
              {l.label}
            </p>
            <p className="text-gray-500 text-sm">{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
