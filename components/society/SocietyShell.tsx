"use client";

import { useState } from "react";
import DashboardNav   from "@/components/dashboard/DashboardNav";
import CityNameEditor from "./CityNameEditor";
import TownView       from "./TownView";
import SocietyCatalog from "./SocietyCatalog";
import CoinIcon       from "@/components/ui/CoinIcon";
import AssetImage     from "@/components/ui/AssetImage";
import { getBadge }   from "@/lib/constants";
import type { SocietyItem } from "@/lib/society-config";

interface Props {
  userName:         string;
  cityName:         string;
  ownedItems:       string[]; // item ids, one per purchase, oldest first
  balance:          number;
  lessonsCompleted: string[];
}

interface NewBadge { id: string; bonus: number; }

function countItems(ids: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const id of ids) counts[id] = (counts[id] ?? 0) + 1;
  return counts;
}

export default function SocietyShell(props: Props) {
  const [ownedItems, setOwnedItems] = useState<string[]>(props.ownedItems);
  const [balance,    setBalance]    = useState(props.balance);
  const [cityName,   setCityName]   = useState(props.cityName);
  const [buying,     setBuying]     = useState<string | null>(null);
  const [error,      setError]      = useState<string | null>(null);
  const [justBuilt,  setJustBuilt]  = useState<SocietyItem | null>(null);
  const [badgeToast, setBadgeToast] = useState<NewBadge[]>([]);

  async function handleBuild(item: SocietyItem) {
    if (buying) return;
    setBuying(item.id);
    setError(null);
    try {
      const res = await fetch("/api/society/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setError(data?.error ?? "Couldn't build that. Please try again.");
        return;
      }
      // The server is the source of truth for the balance.
      setBalance(Number(data.balance));
      setOwnedItems((prev) => [...prev, item.id]);
      setJustBuilt(item);
      setTimeout(() => setJustBuilt(null), 3500);
      if (Array.isArray(data.newBadges) && data.newBadges.length > 0) {
        setBadgeToast(data.newBadges);
        setTimeout(() => setBadgeToast([]), 6000);
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBuying(null);
    }
  }

  async function handleRename(newName: string) {
    try {
      const res = await fetch("/api/society/rename", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityName: newName }),
      });
      if (res.ok) {
        setCityName(newName);
      } else {
        setError("Couldn't rename your city. Please try again.");
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  return (
    <div className="min-h-screen bg-cream pb-24 md:pb-0">
      <DashboardNav name={props.userName} />

      <main className="max-w-6xl mx-auto px-5 py-8">

        {/* Page header: city name + balance */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-mid mb-1">
              Your Civic World
            </p>
            <CityNameEditor cityName={cityName} onRename={handleRename} />
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white
                          border border-brand-orange/25 shadow-card"
               aria-live="polite">
            <CoinIcon size={32} />
            <div>
              <p className="font-display font-black text-2xl text-brand-orange leading-none">{balance}</p>
              <p className="text-xs text-mid font-medium">coins to spend</p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {error && (
          <div role="alert" className="flex items-center gap-3 px-5 py-3 rounded-2xl mb-5
                                       bg-rose-50 border border-rose-200 text-sm text-rose-700 font-semibold">
            {error}
            <button onClick={() => setError(null)} className="ml-auto text-rose-500" aria-label="Dismiss">✕</button>
          </div>
        )}
        {justBuilt && (
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl mb-5
                          bg-gradient-to-r from-brand-orange/15 to-brand-blue/10
                          border border-brand-orange/30 animate-fade-up">
            <AssetImage src={justBuilt.image} fallback={justBuilt.icon} alt={justBuilt.name} size={36} />
            <p className="font-bold text-base text-ink">{justBuilt.name} built!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 lg:sticky lg:top-6 self-start w-full">
            <TownView ownedItems={ownedItems} />
          </div>
          <div className="lg:col-span-3">
            <SocietyCatalog
              ownedCounts={countItems(ownedItems)}
              balance={balance}
              lessonsCompleted={props.lessonsCompleted}
              buying={buying}
              onBuild={handleBuild}
            />
          </div>
        </div>
      </main>

      {/* Badge toast: Society Architect / Master Builder are earned here */}
      {badgeToast.length > 0 && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2
                        w-[calc(100%-2rem)] max-w-sm" role="status">
          {badgeToast.map((nb) => {
            const badge = getBadge(nb.id);
            return (
              <div key={nb.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white
                                          shadow-card-lg border border-brand-blue/20 animate-fade-up">
                <AssetImage src={badge?.image} fallback={badge?.icon ?? "🏅"} alt={badge?.name ?? nb.id} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-blue">New badge!</p>
                  <p className="font-bold text-sm text-ink">{badge?.name ?? nb.id}</p>
                </div>
                {nb.bonus > 0 && (
                  <span className="flex items-center gap-1 text-sm font-bold text-brand-orange">
                    <CoinIcon size={16} /> +{nb.bonus}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
