import type { Lesson } from "@/lib/types";
import { getStreakMessage } from "@/lib/utils";

interface Props {
  name:       string;
  streakDays: number;
  nextLesson: Lesson | null;
}

function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function GreetingHeader({ name, streakDays, nextLesson }: Props) {
  const greeting = getTimeGreeting();
  const streakMsg = getStreakMessage(streakDays);
  const isNewUser = streakDays === 0;

  return (
    <div className="bg-gradient-to-br from-brand-blue to-indigo-700 rounded-3xl p-7
                    text-white relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full
                      bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-32 h-32 rounded-full
                      bg-white/5 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10">
        {/* Greeting */}
        <p className="text-white/70 text-sm font-medium mb-1">{greeting}</p>
        <h1 className="font-display font-black text-3xl leading-tight mb-3">
          {name}! 👋
        </h1>

        {/* Streak pill */}
        <div className="inline-flex items-center gap-2 bg-white/15 rounded-full
                        px-3.5 py-1.5 mb-4">
          <span className="text-base">🔥</span>
          <span className="text-sm font-bold">{streakMsg}</span>
        </div>

        {/* Contextual nudge */}
        <p className="text-white/80 text-sm leading-relaxed max-w-md">
          {isNewUser
            ? "You're just getting started — your civic journey begins with your first lesson below!"
            : nextLesson
            ? `Ready to continue? Your next lesson is "${nextLesson.title}".`
            : "Amazing! You've completed all available lessons. More coming soon!"}
        </p>
      </div>
    </div>
  );
}
