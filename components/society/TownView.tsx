// components/society/TownView.tsx
// The town: one tile per purchase, in the order they were built (guideline
// v2.0, section 9.2). Free placement on a map is a later phase.
import { getItem } from "@/lib/society-config";
import AssetImage from "@/components/ui/AssetImage";

interface Props {
  ownedItems: string[]; // item ids, one per purchase, oldest first
}

export default function TownView({ ownedItems }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-black/[0.07] shadow-card overflow-hidden">

      <div className="bg-gradient-to-r from-brand-blue to-indigo-700 px-6 py-4 flex
                      items-center justify-between">
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-0.5">
            Your Town
          </p>
          <p className="text-white font-display font-bold text-lg leading-tight">
            {ownedItems.length === 0
              ? "Nothing built yet"
              : `${ownedItems.length} ${ownedItems.length === 1 ? "thing" : "things"} built`}
          </p>
        </div>
        <span className="text-4xl">🌆</span>
      </div>

      <div className="p-6 bg-gradient-to-b from-sky-50 to-green-50/60 min-h-[180px]">
        {ownedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-8 gap-2">
            <span className="text-4xl opacity-40">🏗️</span>
            <p className="text-sm text-mid max-w-xs">
              Your town is an empty field. Pick something from the catalog to build your first piece!
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {ownedItems.map((id, i) => {
              const item = getItem(id);
              if (!item) return null; // an item since removed from the catalog
              return (
                <li
                  key={`${id}-${i}`}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-white/80
                             border border-black/[0.05] shadow-sm animate-fade-up"
                >
                  <AssetImage src={item.image} fallback={item.icon} alt={item.name} size={48} />
                  <span className="text-[11px] font-semibold text-ink text-center leading-tight">
                    {item.name}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
