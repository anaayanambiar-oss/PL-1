// lib/society-config.ts
// Society Builder catalog: 17 items in 5 tiers (guideline v2.0, section 6.2).
// Replaces the old 5-building CIVIC_ELEMENTS list.
import { levelLessonIds, LESSON_REFS } from "@/lib/coin-config";

export type TierNumber = 1 | 2 | 3 | 4 | 5;

export interface SocietyItem {
  id:          string;
  name:        string;
  tier:        TierNumber;
  cost:        number;
  maxQuantity: number | null; // 1 = collectible once, null = unlimited
  icon:        string;        // emoji shown until artwork is uploaded
  image?:      string;        // /public path; falls back to icon if missing
  lockedImage?: string;       // optional dedicated "locked" artwork
}

export interface Tier {
  tier:       TierNumber;
  name:       string;
  requires:   string[]; // lesson ids that must ALL be completed
  unlockText: string;
}

export const TIERS: Tier[] = [
  { tier: 1, name: "Basics",              requires: [],                            unlockText: "Available from the start" },
  { tier: 2, name: "Community",           requires: levelLessonIds(1),             unlockText: "Unlocks after Level 1" },
  { tier: 3, name: "Civic Institutions",  requires: [LESSON_REFS.localGovernment], unlockText: "Unlocks after Lesson 9 (Local Government in Action)" },
  { tier: 4, name: "National Government", requires: levelLessonIds(2),             unlockText: "Unlocks after Level 2" },
  { tier: 5, name: "Landmarks",           requires: levelLessonIds(3),             unlockText: "Unlocks after Level 3" },
];

// Prices are proposals inside Anaaya's ranges. Confirm each one.
// Artwork: upload to /public/society/{item-id}.png and add `image` below.
export const SOCIETY_ITEMS: SocietyItem[] = [
  // Tier 1: 8 to 15 coins each
  { id: "streetlight", name: "Streetlight", tier: 1, cost: 8,  maxQuantity: 1, icon: "💡" },
  { id: "dustbin",     name: "Dustbin",     tier: 1, cost: 10, maxQuantity: 1, icon: "🗑️" },
  { id: "road",        name: "Road",        tier: 1, cost: 15, maxQuantity: 1, icon: "🛣️" },
  // Tier 2: 20 to 35 coins each
  { id: "park",        name: "Park",        tier: 2, cost: 20, maxQuantity: 1, icon: "🌳" },
  { id: "water-tower", name: "Water Tower", tier: 2, cost: 25, maxQuantity: 1, icon: "🗼" },
  { id: "police-post", name: "Police Post", tier: 2, cost: 30, maxQuantity: 1, icon: "🚓" },
  { id: "school",      name: "School",      tier: 2, cost: 35, maxQuantity: 1, icon: "🏫" },
  // Tier 3: 40 to 60 coins each
  { id: "local-market",     name: "Local Market",                 tier: 3, cost: 40, maxQuantity: 1, icon: "🛒" },
  { id: "panchayat-office", name: "Panchayat / Municipal Office", tier: 3, cost: 50, maxQuantity: 1, icon: "🏢",
    image: "/society/panchayat-office.webp", lockedImage: "/society/panchayat-office-locked.webp" },
  { id: "hospital",         name: "Hospital",                     tier: 3, cost: 60, maxQuantity: 1, icon: "🏥",
    image: "/society/hospital.webp", lockedImage: "/society/hospital-locked.webp" },
  // Tier 4: 70 to 100 coins each
  { id: "voting-booth-monument", name: "Voting Booth Monument", tier: 4, cost: 70,  maxQuantity: 1, icon: "🗳️" },
  { id: "courthouse",            name: "Courthouse",            tier: 4, cost: 80,  maxQuantity: 1, icon: "⚖️" },
  { id: "presidents-house",      name: "President's House",     tier: 4, cost: 90,  maxQuantity: 1, icon: "🏰" },
  { id: "parliament-house",      name: "Parliament House",      tier: 4, cost: 100, maxQuantity: 1, icon: "🏛️" },
  // Tier 5: 130 to 180 coins each
  { id: "national-flag-plaza",   name: "National Flag Plaza",   tier: 5, cost: 130, maxQuantity: 1, icon: "🇮🇳" },
  { id: "media-tower",           name: "Media Tower",           tier: 5, cost: 150, maxQuantity: 1, icon: "📡" },
  { id: "constitution-monument", name: "Constitution Monument", tier: 5, cost: 180, maxQuantity: 1, icon: "📜" },
];

export function getItem(itemId: string): SocietyItem | undefined {
  return SOCIETY_ITEMS.find((i) => i.id === itemId);
}

export function getTier(tier: TierNumber): Tier {
  return TIERS.find((t) => t.tier === tier)!;
}

// Shared by the page (to show locked states) and the purchase route's SQL gate.
export function isTierUnlocked(tier: TierNumber, lessonsCompleted: string[]): boolean {
  return getTier(tier).requires.every((id) => lessonsCompleted.includes(id));
}

// Why an item can't be built right now, or null if it can. UI only — the
// purchase route re-checks every condition in the database.
export function buildBlocker(
  item: SocietyItem,
  owned: number,
  balance: number,
  lessonsCompleted: string[],
): "locked" | "owned" | "too-expensive" | null {
  if (!isTierUnlocked(item.tier, lessonsCompleted)) return "locked";
  if (item.maxQuantity !== null && owned >= item.maxQuantity) return "owned";
  if (balance < item.cost) return "too-expensive";
  return null;
}

// The cheapest item the student could build right now, for the dashboard.
export function nextAffordableItem(
  ownedCounts: Record<string, number>,
  balance: number,
  lessonsCompleted: string[],
): SocietyItem | null {
  return [...SOCIETY_ITEMS]
    .sort((a, b) => a.cost - b.cost)
    .find((i) => buildBlocker(i, ownedCounts[i.id] ?? 0, balance, lessonsCompleted) === null)
    ?? null;
}
