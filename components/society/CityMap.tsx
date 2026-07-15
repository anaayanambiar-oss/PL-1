import { CIVIC_ELEMENTS, type CivicElement } from "@/lib/society-config";

interface Props {
  unlocked:       string[];
  completedCount: number;
  onElementClick: (el: CivicElement) => void;
}

export default function CityMap({ unlocked, completedCount, onElementClick }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card overflow-hidden">

      {/* Map header */}
      <div className="bg-gradient-to-r from-brand-blue to-indigo-700 px-6 py-4 flex
                      items-center justify-between">
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-0.5">
            City View
          </p>
          <p className="text-white font-display font-bold text-lg leading-tight">
            {unlocked.length} of {CIVIC_ELEMENTS.length} buildings placed
          </p>
        </div>
        <span className="text-4xl">🌆</span>
      </div>

      {/* City grid */}
      <div className="p-6">

        {/* Sky / clouds decoration */}
        <div className="flex items-center justify-around mb-4 opacity-30 select-none">
          <span className="text-2xl">☁️</span>
          <span className="text-3xl">☁️</span>
          <span className="text-2xl">☁️</span>
          <span className="text-2xl">☁️</span>
        </div>

        {/* Buildings row */}
        <div className="grid grid-cols-5 gap-3 mb-3">
          {CIVIC_ELEMENTS.map((el) => {
            const isUnlocked  = unlocked.includes(el.id);
            const canUnlock   = !isUnlocked && completedCount >= el.unlockAt;
            const isLocked    = !isUnlocked && !canUnlock;

            return (
              <button
                key={el.id}
                onClick={() => isUnlocked || canUnlock ? onElementClick(el) : undefined}
                disabled={isLocked}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2
                            transition-all duration-200 group
                            ${isUnlocked
                              ? `${el.lightColor} ${el.borderColor} hover:scale-105 cursor-default`
                              : canUnlock
                              ? "bg-amber-50 border-amber-300 hover:scale-105 cursor-pointer hover:shadow-md"
                              : "bg-pale border-transparent opacity-40 cursor-not-allowed"
                            }`}
              >
                {/* Building icon */}
                <div className={`text-3xl transition-all duration-200
                                  ${isLocked ? "grayscale" : ""}
                                  ${canUnlock ? "animate-bounce-soft" : ""}`}>
                  {isUnlocked ? el.icon : isLocked ? "🔒" : el.icon}
                </div>

                {/* Label */}
                <span className={`text-[10px] font-bold text-center leading-tight
                                   ${isUnlocked ? el.textColor :
                                     canUnlock ? "text-amber-700" :
                                     "text-soft"}`}>
                  {el.name}
                </span>

                {/* Unlock badge */}
                {canUnlock && (
                  <span className="text-[9px] font-bold bg-amber-500 text-white
                                   px-1.5 py-0.5 rounded-full">
                    Tap!
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Ground strip */}
        <div className="h-3 bg-gradient-to-r from-green-300 via-green-400 to-green-300
                        rounded-full" />

        {/* Road */}
        <div className="mt-1 h-2 bg-gray-300 rounded-full flex items-center justify-around px-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-0.5 w-3 bg-white rounded-full" />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 pb-4 flex items-center gap-4 text-xs text-mid flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-brand-blue/20 border border-brand-blue/40" />
          Unlocked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300" />
          Ready to unlock
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-pale border border-black/10" />
          Locked
        </span>
      </div>
    </div>
  );
}
