import Link from "next/link";
import type { Level } from "@/lib/types";

interface Props {
  currentLevel:     Level;
  lessonsCompleted: string[];
}

export default function LessonsGrid({ currentLevel, lessonsCompleted }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-mid mb-0.5">
            Level {currentLevel.number}
          </p>
          <h3 className="font-display font-bold text-lg text-ink">
            {currentLevel.title}
          </h3>
        </div>
        <span className="text-xs font-bold text-brand-blue bg-brand-blue/10
                         px-2.5 py-1 rounded-full">
          {lessonsCompleted.filter((id) =>
            currentLevel.lessons.some((l) => l.id === id)
          ).length} / {currentLevel.lessons.length} done
        </span>
      </div>

      {/* Lesson list */}
      <div className="flex flex-col gap-2.5">
        {currentLevel.lessons.map((lesson, i) => {
          const isDone   = lessonsCompleted.includes(lesson.id);
          const prevDone = i === 0 || lessonsCompleted.includes(currentLevel.lessons[i - 1].id);
          const isNext   = !isDone && prevDone;
          const isLocked = !isDone && !prevDone;

          return (
            <div
              key={lesson.id}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2
                          transition-all duration-150
                          ${isDone
                            ? "bg-green-50 border-green-200"
                            : isNext
                            ? "bg-brand-orange/5 border-brand-orange cursor-pointer hover:bg-brand-orange/10"
                            : "bg-pale border-transparent opacity-60"
                          }`}
            >
              {/* Status icon */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                               text-lg flex-shrink-0
                               ${isDone   ? "bg-green-100" :
                                 isNext   ? "bg-brand-orange/15" :
                                            "bg-black/5"}`}>
                {isDone ? "✅" : isNext ? "▶️" : "🔒"}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm leading-snug truncate
                               ${isDone ? "text-green-800" :
                                 isNext ? "text-ink"      :
                                          "text-mid"}`}>
                  {lesson.title}
                </p>
                <p className="text-xs text-mid mt-0.5">
                  +{lesson.xpReward} XP
                  {lesson.badgeId ? " · Badge" : ""}
                </p>
              </div>

              {/* Action */}
              {isDone && (
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="text-xs font-bold text-green-700 bg-green-100
                             px-2.5 py-1 rounded-full hover:bg-green-200 transition-colors
                             flex-shrink-0"
                >
                  Redo
                </Link>
              )}
              {isNext && (
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="text-xs font-bold text-white bg-brand-orange
                             px-3 py-1.5 rounded-full shadow-orange flex-shrink-0
                             hover:-translate-y-0.5 transition-all"
                >
                  Start →
                </Link>
              )}
              {isLocked && (
                <span className="text-xs text-soft font-medium flex-shrink-0">
                  Locked
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
