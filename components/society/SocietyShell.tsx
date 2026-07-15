"use client";

import { useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import CityMap       from "./CityMap";
import CityStats     from "./CityStats";
import ElementsList  from "./ElementsList";
import CityNameEditor from "./CityNameEditor";
import UnlockModal   from "./UnlockModal";
import { CIVIC_ELEMENTS, type CivicElement } from "@/lib/society-config";

interface Props {
  userId:           string;
  userName:         string;
  cityName:         string;
  unlocked:         string[];
  population:       number;
  coinsSpent:       number;
  lessonsCompleted: string[];
  totalXP:          number;
}

export default function SocietyShell(props: Props) {
  const [unlocked,    setUnlocked]    = useState<string[]>(props.unlocked);
  const [population,  setPopulation]  = useState(props.population);
  const [cityName,    setCityName]    = useState(props.cityName);
  const [modalEl,     setModalEl]     = useState<CivicElement | null>(null);
  const [unlocking,   setUnlocking]   = useState(false);
  const [justUnlocked, setJustUnlocked] = useState<CivicElement | null>(null);

  const completedCount = props.lessonsCompleted.length;

  async function handleUnlock(element: CivicElement) {
    if (unlocking) return;
    setUnlocking(true);
    try {
      const res = await fetch("/api/society/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ elementId: element.id }),
      });
      if (!res.ok) throw new Error("Failed to unlock");
      setUnlocked((prev) => [...prev, element.id]);
      setPopulation((prev) => prev + element.population);
      setModalEl(null);
      setJustUnlocked(element);
      setTimeout(() => setJustUnlocked(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setUnlocking(false);
    }
  }

  async function handleRename(newName: string) {
    await fetch("/api/society/unlock", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityName: newName }),
    });
    setCityName(newName);
  }

  return (
    <div className="min-h-screen bg-cream pb-24 md:pb-0">
      <DashboardNav name={props.userName} />

      <main className="max-w-6xl mx-auto px-5 py-8">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-mid mb-1">
              Your Civic World
            </p>
            <CityNameEditor cityName={cityName} onRename={handleRename} />
          </div>
          <CityStats
            unlocked={unlocked}
            population={population}
            totalElements={CIVIC_ELEMENTS.length}
            completedCount={completedCount}
          />
        </div>

        {/* Just-unlocked celebration banner */}
        {justUnlocked && (
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl mb-6
                           bg-gradient-to-r from-brand-orange/15 to-brand-blue/10
                           border border-brand-orange/30 animate-fade-up`}>
            <span className="text-3xl">{justUnlocked.icon}</span>
            <div>
              <p className="font-bold text-base text-ink">
                {justUnlocked.name} unlocked!
              </p>
              <p className="text-sm text-ink-soft">{justUnlocked.fact}</p>
            </div>
            <span className="ml-auto text-xs font-bold text-brand-orange bg-brand-orange/10
                             px-2.5 py-1 rounded-full">
              +{justUnlocked.population.toLocaleString()} residents
            </span>
          </div>
        )}

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* City map — bigger on desktop */}
          <div className="lg:col-span-3">
            <CityMap
              unlocked={unlocked}
              completedCount={completedCount}
              onElementClick={(el) => {
                if (!unlocked.includes(el.id) && completedCount >= el.unlockAt) {
                  setModalEl(el);
                }
              }}
            />
          </div>

          {/* Elements list */}
          <div className="lg:col-span-2">
            <ElementsList
              unlocked={unlocked}
              completedCount={completedCount}
              onUnlock={(el) => setModalEl(el)}
            />
          </div>
        </div>
      </main>

      {/* Unlock confirmation modal */}
      {modalEl && (
        <UnlockModal
          element={modalEl}
          unlocking={unlocking}
          onConfirm={() => handleUnlock(modalEl)}
          onClose={() => setModalEl(null)}
        />
      )}
    </div>
  );
}
