import { formatXP } from "@/lib/utils";

interface Props {
  totalXP:          number;
  streakDays:       number;
  currentLevel:     number;
  lessonsCompleted: number;
  totalLessons:     number;
}

export default function StatsRow({
  totalXP,
  streakDays,
  currentLevel,
  lessonsCompleted,
  totalLessons,
}: Props) {
  const stats = [
    {
      icon:    "⭐",
      label:   "Total XP",
      value:   formatXP(totalXP),
      bg:      "bg-brand-orange/8",
      color:   "text-brand-orange",
    },
    {
      icon:    "🔥",
      label:   "Day Streak",
      value:   `${streakDays} ${streakDays === 1 ? "day" : "days"}`,
      bg:      "bg-rose-50",
      color:   "text-rose-600",
    },
    {
      icon:    "🏛️",
      label:   "Current Level",
      value:   `Level ${currentLevel}`,
      bg:      "bg-brand-blue/8",
      color:   "text-brand-blue",
    },
    {
      icon:    "📚",
      label:   "Lessons Done",
      value:   `${lessonsCompleted} / ${totalLessons}`,
      bg:      "bg-green-50",
      color:   "text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`${s.bg} rounded-2xl p-4 flex flex-col justify-between
                      border border-black/[0.05]`}
        >
          <span className="text-2xl mb-2">{s.icon}</span>
          <div>
            <p className={`font-display font-black text-xl leading-none mb-1 ${s.color}`}>
              {s.value}
            </p>
            <p className="text-xs text-mid font-medium">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
