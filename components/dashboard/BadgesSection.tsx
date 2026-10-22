import { BADGES } from "@/lib/constants";
import { BADGE_BONUS } from "@/lib/coin-config";
import AssetImage from "@/components/ui/AssetImage";

interface Props { earnedBadgeIds: string[]; }

// All 12 badges (guideline v2.0, section 10.3): earned in colour, locked in
// grey with the milestone as the hint.
export default function BadgesSection({ earnedBadgeIds }: Props) {
  const earnedCount = BADGES.filter((b) => earnedBadgeIds.includes(b.id)).length;

  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg text-ink">Badges</h3>
        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10
                         px-2.5 py-1 rounded-full">
          {earnedCount} / {BADGES.length} earned
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {BADGES.map((badge) => {
          const earned = earnedBadgeIds.includes(badge.id);
          const bonus = BADGE_BONUS[badge.id];
          return (
            <div
              key={badge.id}
              className={`flex flex-col items-center text-center p-4 rounded-2xl border
                          ${earned
                            ? "bg-brand-orange/8 border-brand-orange/20"
                            : "bg-pale border-black/[0.06]"}`}
            >
              <AssetImage
                src={badge.image}
                fallback={badge.icon}
                alt={badge.name}
                size={48}
                muted={!earned}
                className="mb-2"
              />
              <p className={`font-bold text-xs leading-snug mb-1 ${earned ? "text-ink" : "text-mid"}`}>
                {badge.name}
              </p>
              <p className={`text-xs leading-snug ${earned ? "text-mid" : "text-soft"}`}>
                {earned ? badge.description : badge.trigger}
              </p>
              {!earned && bonus && (
                <p className="text-[11px] font-semibold text-brand-orange/80 mt-1">+{bonus} coins</p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
