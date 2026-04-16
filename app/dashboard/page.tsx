import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sql from "@/lib/db";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerkUser = await currentUser();

  // Fetch profile from Neon
  const rows = await sql`
    SELECT name, age, current_level, total_xp, streak_days, onboarding_done
    FROM users
    WHERE clerk_id = ${userId}
    LIMIT 1
  `;
  const profile = rows[0] ?? null;

  // If no profile or onboarding not done → send back to onboarding
  if (!profile || !profile.onboarding_done) {
    redirect("/onboarding");
  }

  return (
    <main className="min-h-screen bg-cream">

      {/* Top bar */}
      <header className="bg-white border-b border-black/[0.06] px-6 py-4 flex items-center
                         justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange
                          flex items-center justify-center">
            <span className="font-display font-extrabold text-white text-base leading-none">P</span>
          </div>
          <span className="font-display font-extrabold text-base text-ink">
            Politica<span className="text-brand-blue">Learn</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-mid">
          <span>👤</span>
          <span>{clerkUser?.firstName}</span>
        </div>
      </header>

      {/* Dashboard body */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        <h1 className="font-display font-black text-3xl text-ink mb-2">
          Welcome back, {profile.name}! 👋
        </h1>
        <p className="text-ink-soft mb-10">Ready to continue your civic journey?</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total XP",      value: profile.total_xp,     icon: "⭐" },
            { label: "Day Streak",    value: profile.streak_days,   icon: "🔥" },
            { label: "Current Level", value: profile.current_level, icon: "🏛️" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-black/[0.07] p-6 text-center
                         shadow-card"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-display font-black text-3xl text-ink mb-1">{s.value}</div>
              <div className="text-xs text-mid font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Coming soon placeholder */}
        <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-3xl p-10
                        text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="font-display font-bold text-xl text-ink mb-2">
            Lessons coming soon!
          </h2>
          <p className="text-mid text-sm max-w-md mx-auto">
            The full dashboard with lessons, the Society Builder, and your progress
            tracker is being built. Check back soon!
          </p>
        </div>

      </div>
    </main>
  );
}


