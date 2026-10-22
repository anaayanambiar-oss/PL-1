// components/society/SocietyCatalog.tsx
// The catalog grouped by tier (guideline v2.0, section 9.2). Each tier shows
// its unlock text and locked state; each item shows its price, how many are
// owned, and a Build button disabled when locked, owned or unaffordable.
// The purchase route re-checks all of this — the UI only guides.
"use client";

import { SOCIETY_ITEMS, TIERS, buildBlocker, isTierUnlocked, type SocietyItem } from "@/lib/society-config";
import AssetImage from "@/components/ui/AssetImage";
import CoinIcon from "@/components/ui/CoinIcon";

interface Props {
  ownedCounts:      Record<string, number>;
  balance:          number;
  lessonsCompleted: string[];
  buying:           string | null; // item id with a request in flight
  onBuild:          (item: SocietyItem) => void;
}

const BUTTON_LABEL = {
  "locked":        "🔒 Locked",
  "owned":         "✓ Built",
  "too-expensive": "Need more coins",
} as const;

export default function SocietyCatalog({ ownedCounts, balance, lessonsCompleted, buying, onBuild }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {TIERS.map((tier) => {
        const unlocked = isTierUnlocked(tier.tier, lessonsCompleted);
        const items = SOCIETY_ITEMS.filter((i) => i.tier === tier.tier);
        return (
          <section
            key={tier.tier}
            aria-labelledby={`tier-${tier.tier}`}
            className={`rounded-3xl border border-black/[0.07] shadow-card p-5
                        ${unlocked ? "bg-white" : "bg-pale/60"}`}
          >
            <header className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-mid">Tier {tier.tier}</p>
                <h3 id={`tier-${tier.tier}`} className="font-display font-bold text-lg text-ink leading-tight">
                  {tier.name}
                </h3>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0
                               ${unlocked ? "bg-green-50 text-green-700" : "bg-black/[0.05] text-mid"}`}>
                {unlocked ? "Unlocked" : `🔒 ${tier.unlockText}`}
              </span>
            </header>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {items.map((item) => {
                const owned = ownedCounts[item.id] ?? 0;
                const blocker = buildBlocker(item, owned, balance, lessonsCompleted);
                const isBuying = buying === item.id;
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-2xl border border-black/[0.06] bg-white"
                  >
                    <AssetImage
                      src={!unlocked && item.lockedImage ? item.lockedImage : item.image}
                      fallback={item.icon}
                      alt={item.name}
                      size={44}
                      muted={!unlocked && !item.lockedImage}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold leading-snug ${unlocked ? "text-ink" : "text-mid"}`}>
                        {item.name}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-mid mt-0.5">
                        <CoinIcon size={14} /> {item.cost}
                        {owned > 0 && (
                          <span className="ml-1.5 text-green-700 font-semibold">
                            · {item.maxQuantity === 1 ? "Built" : `Owned ×${owned}`}
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => onBuild(item)}
                      // Disabled while ANY request is in flight: stops double
                      // clicks before the database has to defend itself.
                      disabled={blocker !== null || buying !== null}
                      className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-bold transition-all
                                  ${blocker === null
                                    ? "bg-brand-orange text-white shadow-orange hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                                    : blocker === "owned"
                                      ? "bg-green-50 text-green-700"
                                      : "bg-black/[0.05] text-mid"}
                                  disabled:cursor-not-allowed`}
                    >
                      {isBuying ? "Building…" : blocker ? BUTTON_LABEL[blocker] : "Build"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
