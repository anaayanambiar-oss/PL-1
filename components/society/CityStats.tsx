import { CIVIC_ELEMENTS, TOTAL_POPULATION } from "@/lib/society-config";

interface Props {
  unlocked:      string[];
  population:    number;
  totalElements: number;
  completedCount: number;
}

export default function CityStats({
  unlocked, population, totalElements, completedCount,
}: Props) {
  const pct = Math.round((unlocked.length / totalElements) * 100);

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Buildings",  value: `${unlocked.length}/${totalElements}`, icon: "🏗️",  color: "text-brand-blue" },
        { label: "Population", value: population.toLocaleString(),           icon: "👥",  color: "text-brand-orange" },
        { label: "Lessons Done", value: completedCount,                      icon: "📚",  color: "text-green-700" },
      ].map((s) => (
        <div key={s.label}
          className="bg-white rounded-2xl border border-black/[0.07] shadow-card
                     px-4 py-3 flex flex-col items-center text-center min-w-[90px]">
          <span className="text-xl mb-1">{s.icon}</span>
          <span className={`font-display font-black text-xl ${s.color} leading-none`}>
            {s.value}
          </span>
          <span className="text-[10px] text-mid font-medium mt-0.5">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
