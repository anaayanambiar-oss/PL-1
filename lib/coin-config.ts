// lib/coin-config.ts
// Every coin number lives here (guideline v2.0, sections 3 and 6.1).
// The server reads these to decide awards; the browser only displays them.
import { CURRICULUM } from "@/lib/curriculum";

export const CURRENCY = { singular: "coin", plural: "coins" } as const;

// Base coins on first completion of each lesson (from Anaaya's table).
// l1-5 and l2-5 are in the agreed 14-lesson list but have no content yet;
// their entries are harmless until those lessons exist.
export const LESSON_BASE_COINS: Record<string, number> = {
  "l1-1": 10, "l1-2": 12, "l1-3": 12, "l1-4": 11, "l1-5": 11,
  "l2-1": 11, "l2-2": 13, "l2-3": 12, "l2-4": 10, "l2-5": 11,
  "l3-1": 10, "l3-2": 12, "l3-3": 10, "l3-4": 10,
};

// +5 per MCQ answered correctly on the first attempt only.
export const MCQ_FIRST_TRY_BONUS = 5;

// Coin bonus when a badge is first earned. Anaaya's example: +15 for level
// badges. Confirm before launch. Omit a badge for no bonus.
export const BADGE_BONUS: Record<string, number> = {
  "foundation-builder":  15,
  "institution-insider": 15,
  "citizen-champion":    15,
};

// Lessons that specific badge and tier rules point at, by topic (guideline
// section 3 numbering). NOTE: in today's curriculum l1-4 is "The Constitution
// Explained" and l2-1 is "Your Fundamental Rights", so these only match their
// topics once the 14-lesson curriculum (guideline 2.1) is in place. If the
// agreed ids differ, change them here only.
export const LESSON_REFS = {
  voting:          "l1-4", // Elections and Voting       → Voting Champion
  constitution:    "l2-1", // The Constitution of India  → Constitution Keeper
  localGovernment: "l2-4", // Local Government in Action → Tier 3 gate
} as const;

export function getLessonBaseCoins(lessonId: string): number | null {
  return LESSON_BASE_COINS[lessonId] ?? null;
}

// All lesson ids in a level, derived from the curriculum.
export function levelLessonIds(levelNumber: number): string[] {
  return CURRICULUM.find((l) => l.number === levelNumber)?.lessons.map((x) => x.id) ?? [];
}
