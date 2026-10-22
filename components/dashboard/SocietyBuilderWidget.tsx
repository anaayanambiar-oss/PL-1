import Link from "next/link";
import { SOCIETY_ITEMS, nextAffordableItem, isTierUnlocked } from "@/lib/society-config";
import CoinIcon from "@/components/ui/CoinIcon";
import AssetImage from "@/components/ui/AssetImage";

interface Props {
  lessonsCompleted: string[];
  coinBalance:      number;
  ownedCounts:      Record<string, number>; // item_id → copies owned
}

export default function SocietyBuilderWidget({ lessonsCompleted, coinBalance, ownedCounts }: Props) {
  const builtCount = Object.values(ownedCounts).reduce((a, n) => a + n, 0);
  const next = nextAffordableItem(ownedCounts, coinBalance, lessonsCompleted);

  // If nothing is affordable, show the cheapest unlocked item still to build,
  // so the student knows what they are saving for.
  const savingFor = next ? null : [...SOCIETY_ITEMS]
    .sort((a, b) => a.cost - b.cost)
    .find((i) => isTierUnlocked(i.tier, lessonsCompleted) &&
                 (i.maxQuantity === null || (ownedCounts[i.id] ?? 0) < i.maxQuantity)) ?? null;
  const highlight = next ?? savingFor;

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
        Earn coins in lessons, then spend them building your city.
      </p>

      {/* Balance */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-orange/8
                      border border-brand-orange/20 mb-3">
        <CoinIcon size={32} />
        <div>
          <p className="font-display font-black text-xl text-brand-orange leading-none">
            {coinBalance}
          </p>
          <p className="text-xs text-mid font-medium">coins to spend</p>
        </div>
        <div className="ml-auto text-right">
          <p className="font-display font-black text-xl text-ink leading-none">{builtCount}</p>
          <p className="text-xs text-mid font-medium">built</p>
        </div>
      </div>

      {/* Next item */}
      <div className="flex-1">
        {highlight ? (
          <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-black/[0.06] bg-pale">
            <AssetImage src={highlight.image} fallback={highlight.icon} alt={highlight.name} size={36} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-mid font-medium">
                {next ? "You can build" : "Saving for"}
              </p>
              <p className="text-sm font-semibold text-ink leading-snug truncate">{highlight.name}</p>
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-ink flex-shrink-0">
              <CoinIcon size={16} /> {highlight.cost}
            </span>
          </div>
        ) : (
          <p className="text-sm text-mid px-1">
            {builtCount > 0
              ? "You've built everything unlocked so far. Finish more lessons to unlock new tiers!"
              : "Finish lessons to unlock more to build."}
          </p>
        )}
      </div>

      {/* View Society CTA */}
      <Link
        href="/society"
        className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full
                   border-2 border-brand-blue/20 text-brand-blue text-sm font-bold
                   hover:bg-brand-blue hover:text-white hover:border-brand-blue
                   transition-all duration-200"
      >
        🌆 {next ? "Build in My Society" : "View My Society"}
      </Link>
    </div>
  );
}
