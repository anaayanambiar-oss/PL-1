import { BADGES } from "@/lib/constants";

interface Props { earnedBadgeIds: string[]; }

export default function BadgesSection({ earnedBadgeIds }: Props) {
  const earned = BADGES.filter((b) => earnedBadgeIds.includes(b.id));
  const locked = BADGES.filter((b) => !earnedBadgeIds.includes(b.id));

  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg text-ink">Badges</h3>
        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10
                         px-2.5 py-1 rounded-full">
          {earned.length} / {BADGES.length} earned
        </span>
      </div>

      {/* Earned badges */}
      {earned.length > 0 && (
        <>
          <p className="text-xs font-bold uppercase tracking-wider text-mid mb-3">
            Earned
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {earned.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-4 rounded-2xl
                           bg-brand-orange/8 border border-brand-orange/20"
              >
                <span className="text-3xl mb-2">{badge.icon}</span>
                <p className="font-bold text-xs text-ink leading-snug mb-1">
                  {badge.name}
                </p>
                <p className="text-xs text-mid leading-snug">{badge.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Locked badges */}
      {locked.length > 0 && (
        <>
          <p className="text-xs font-bold uppercase tracking-wider text-mid mb-3">
            {earned.length > 0 ? "Still to earn" : "Badges to earn"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {locked.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-4 rounded-2xl
                           bg-pale border border-black/[0.06] opacity-60"
              >
                <span className="text-3xl mb-2 grayscale">{badge.icon}</span>
                <p className="font-bold text-xs text-mid leading-snug mb-1">
                  {badge.name}
                </p>
                <p className="text-xs text-soft leading-snug">{badge.trigger}</p>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
