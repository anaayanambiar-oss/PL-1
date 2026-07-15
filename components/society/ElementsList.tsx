import { CIVIC_ELEMENTS, type CivicElement } from "@/lib/society-config";
import Link from "next/link";

interface Props {
  unlocked:       string[];
  completedCount: number;
  onUnlock:       (el: CivicElement) => void;
}

export default function ElementsList({ unlocked, completedCount, onUnlock }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card p-5
                    flex flex-col gap-3">

      <h3 className="font-display font-bold text-base text-ink mb-1">
        Civic Buildings
      </h3>

      {CIVIC_ELEMENTS.map((el) => {
        const isUnlocked = unlocked.includes(el.id);
        const canUnlock  = !isUnlocked && completedCount >= el.unlockAt;
        const isLocked   = !isUnlocked && !canUnlock;
        const remaining  = Math.max(0, el.unlockAt - completedCount);

        return (
          <div
            key={el.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2
                        transition-all duration-150
                        ${isUnlocked
                          ? `${el.lightColor} ${el.borderColor}`
                          : canUnlock
                          ? "bg-amber-50 border-amber-300"
                          : "bg-pale border-transparent"
                        }
                        ${isLocked ? "opacity-60" : ""}`}
          >
            {/* Icon */}
            <span className={`text-2xl flex-shrink-0 ${isLocked ? "grayscale" : ""}`}>
              {el.icon}
            </span>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm leading-none mb-0.5
                             ${isUnlocked ? el.textColor :
                               canUnlock  ? "text-amber-800" :
                               "text-mid"}`}>
                {el.name}
              </p>
              <p className="text-xs text-mid leading-snug">
                {isUnlocked
                  ? `+${el.population.toLocaleString()} residents`
                  : canUnlock
                  ? "Ready to unlock!"
                  : `${remaining} more lesson${remaining !== 1 ? "s" : ""} to go`}
              </p>
            </div>

            {/* Action */}
            {isUnlocked && (
              <span className="w-6 h-6 rounded-full bg-green-500 flex items-center
                               justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">✓</span>
              </span>
            )}
            {canUnlock && (
              <button
                onClick={() => onUnlock(el)}
                className="text-xs font-bold text-white bg-amber-500 hover:bg-amber-600
                           px-3 py-1.5 rounded-full flex-shrink-0 transition-colors"
              >
                Unlock
              </button>
            )}
            {isLocked && (
              <span className="text-xs text-soft font-medium flex-shrink-0">
                🔒 {el.unlockAt}
              </span>
            )}
          </div>
        );
      })}

      {/* CTA to lessons if nothing can be unlocked */}
      {CIVIC_ELEMENTS.every((el) => unlocked.includes(el.id) || completedCount < el.unlockAt) &&
       !CIVIC_ELEMENTS.some((el) => !unlocked.includes(el.id) && completedCount >= el.unlockAt) && (
        <div className="mt-2 pt-3 border-t border-black/[0.06] text-center">
          <p className="text-xs text-mid mb-2">
            Complete more lessons to unlock new buildings
          </p>
          <Link
            href="/lessons"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue
                       hover:underline"
          >
            📚 Go to Lessons →
          </Link>
        </div>
      )}
    </div>
  );
}
