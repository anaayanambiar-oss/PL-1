import type { Level } from "@/lib/types";
import { getLevelLabel } from "@/lib/utils";

interface Props {
  currentLevel:     number;
  currentLevelData: Level;
  lessonsCompleted: string[];
  totalXP:          number;
  xpForNextLevel:   number;
}

export default function LevelProgress({
  currentLevel,
  currentLevelData,
  lessonsCompleted,
  totalXP,
  xpForNextLevel,
}: Props) {
  const xpPercent = Math.min(100, Math.round((totalXP / xpForNextLevel) * 100));
  const levelLessons = currentLevelData.lessons;
  const completedInLevel = levelLessons.filter((l) =>
    lessonsCompleted.includes(l.id)
  ).length;

  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card p-6 h-full">

      {/* Level badge */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-mid mb-1">
            Your Level
          </p>
          <p className="font-display font-black text-2xl text-ink">
            Level {currentLevel}
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center
                        justify-center text-3xl">
          🏛️
        </div>
      </div>

      {/* Level name */}
      <p className="text-sm text-ink-soft mb-4 leading-snug">
        {getLevelLabel(currentLevel as 1 | 2 | 3)}
      </p>

      {/* Lessons in this level */}
      <div className="flex items-center justify-between text-xs text-mid font-medium mb-1.5">
        <span>Level progress</span>
        <span>{completedInLevel} / {levelLessons.length} lessons</span>
      </div>
      <div className="h-2.5 bg-brand-blue/10 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-brand-blue to-brand-orange
                     rounded-full transition-all duration-700"
          style={{ width: `${(completedInLevel / levelLessons.length) * 100}%` }}
        />
      </div>

      {/* XP to next level */}
      <div className="flex items-center justify-between text-xs text-mid font-medium mb-1.5">
        <span>XP to next level</span>
        <span>{totalXP} / {xpForNextLevel}</span>
      </div>
      <div className="h-2 bg-brand-orange/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-orange to-amber-400
                     rounded-full transition-all duration-700"
          style={{ width: `${xpPercent}%` }}
        />
      </div>

    </div>
  );
}
