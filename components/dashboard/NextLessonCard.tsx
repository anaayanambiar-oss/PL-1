import Link from "next/link";
import type { Lesson } from "@/lib/types";

interface Props { lesson: Lesson | null; }

export default function NextLessonCard({ lesson }: Props) {
  if (!lesson) {
    return (
      <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card p-7
                      flex flex-col items-center justify-center text-center min-h-[160px]">
        <div className="text-4xl mb-3">🏆</div>
        <h3 className="font-display font-bold text-lg text-ink mb-1">
          All caught up!
        </h3>
        <p className="text-sm text-mid">
          You&apos;ve completed all available lessons. More are coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card p-7
                    relative overflow-hidden group">

      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b
                      from-brand-orange to-brand-blue rounded-l-3xl" />

      <div className="pl-2">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange
                           bg-brand-orange/10 px-2.5 py-1 rounded-full">
            Up Next
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-ink mb-1.5 leading-tight">
          {lesson.title}
        </h3>
        <p className="text-sm text-ink-soft leading-relaxed mb-5 max-w-md">
          {lesson.learningGoal}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 text-xs text-mid font-medium">
          <span className="flex items-center gap-1.5">
            <span>⭐</span> +{lesson.xpReward} XP
          </span>
          <span className="flex items-center gap-1.5">
            <span>⏱</span> ~5 min
          </span>
          {lesson.badgeId && (
            <span className="flex items-center gap-1.5">
              <span>🏅</span> Badge available
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/lessons/${lesson.id}`}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                     bg-brand-orange text-white font-bold text-sm shadow-orange
                     hover:-translate-y-0.5 hover:shadow-lg transition-all"
        >
          Start Lesson →
        </Link>
      </div>
    </div>
  );
}
