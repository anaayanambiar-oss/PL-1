import Link from "next/link";

interface Props {
  lessonsCompleted: string[];
  totalLessons:     number;
}

// Each civic element unlocks after a certain number of lessons
const CIVIC_ELEMENTS = [
  { id:"school",       icon:"🏫", name:"School",       unlockAt: 1,  cost: 100, color:"bg-blue-50   border-blue-200"   },
  { id:"hospital",     icon:"🏥", name:"Hospital",     unlockAt: 3,  cost: 150, color:"bg-rose-50   border-rose-200"   },
  { id:"municipality", icon:"🏢", name:"Municipality", unlockAt: 6,  cost: 250, color:"bg-orange-50 border-orange-200" },
  { id:"park",         icon:"🌳", name:"Park",         unlockAt: 9,  cost: 300, color:"bg-green-50  border-green-200"  },
  { id:"parliament",   icon:"🏛️", name:"Parliament",   unlockAt: 12, cost: 500, color:"bg-purple-50 border-purple-200" },
];

export default function SocietyBuilderWidget({
  lessonsCompleted,
  totalLessons,
}: Props) {
  const completedCount = lessonsCompleted.length;

  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card p-6 h-full
                    flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display font-bold text-lg text-ink">
          My Society
        </h3>
        <span className="text-2xl">🌆</span>
      </div>
      <p className="text-xs text-mid mb-5 leading-relaxed">
        Complete lessons to unlock buildings in your city.
      </p>

      {/* Civic elements grid */}
      <div className="flex flex-col gap-2.5 flex-1">
        {CIVIC_ELEMENTS.map((el) => {
          const unlocked = completedCount >= el.unlockAt;
          return (
            <div
              key={el.id}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border
                          transition-all duration-200
                          ${unlocked
                            ? `${el.color}`
                            : "bg-pale border-black/[0.06] opacity-50"
                          }`}
            >
              <span className={`text-xl ${!unlocked ? "grayscale" : ""}`}>
                {el.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold leading-none mb-0.5
                               ${unlocked ? "text-ink" : "text-soft"}`}>
                  {el.name}
                </p>
                <p className="text-xs text-mid">
                  {unlocked
                    ? "Unlocked ✓"
                    : `Unlock at ${el.unlockAt} lessons`}
                </p>
              </div>
              {unlocked && (
                <span className="w-5 h-5 rounded-full bg-green-500 flex items-center
                                 justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall progress */}
      <div className="mt-4 pt-4 border-t border-black/[0.06]">
        <div className="flex justify-between text-xs text-mid font-medium mb-1.5">
          <span>City progress</span>
          <span>{completedCount} / {totalLessons} lessons</span>
        </div>
        <div className="h-2 bg-brand-blue/10 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-brand-blue to-brand-orange
                       rounded-full transition-all duration-700"
            style={{ width: `${Math.round((completedCount / totalLessons) * 100)}%` }}
          />
        </div>

        {/* View Society CTA */}
        <Link
          href="/society"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full
                     border-2 border-brand-blue/20 text-brand-blue text-sm font-bold
                     hover:bg-brand-blue hover:text-white hover:border-brand-blue
                     transition-all duration-200"
        >
          🌆 View My Society
        </Link>
      </div>
    </div>
  );
}
