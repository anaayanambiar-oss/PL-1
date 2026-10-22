import { type Badge } from "@/lib/types";

export const APP_CONFIG = {
  name:        "PoliticaLearn",
  tagline:     "Learn. Lead. Change.",
  description: "Civic education for Indian children ages 7–13.",
  targetAges:  { min: 7, max: 13 },
  url:         "https://politicallearn.app",
};

export const BRAND = {
  orange: "#FF8200",
  blue:   "#0252C9",
  ink:    "#0D1B1E",
};

// The 12 badges (guideline v2.0, section 10.1). Rules live in lib/badges.ts;
// coin bonuses live in BADGE_BONUS in lib/coin-config.ts.
// Images: upload to /public/badges/{id}.png — the emoji shows until then.
const badge = (id: string, name: string, icon: string, description: string, trigger: string): Badge =>
  ({ id, name, icon, description, trigger, image: `/badges/${id}.png` });

export const BADGES: Badge[] = [
  badge("first-steps",         "First Steps",         "👣", "Completed your very first lesson.",                     "Complete Lesson 1"),
  badge("foundation-builder",  "Foundation Builder",  "🧱", "Completed every lesson in Level 1.",                    "Complete Level 1"),
  badge("institution-insider", "Institution Insider", "🏛️", "Completed every lesson in Level 2.",                    "Complete Level 2"),
  badge("citizen-champion",    "Citizen Champion",    "🏆", "Completed every lesson in Level 3. Course complete!",   "Complete Level 3"),
  badge("quiz-whiz",           "Quiz Whiz",           "⚡", "Answered 5 questions in a row right on the first try.", "Get 5 first-try answers right in a row"),
  badge("perfect-scholar",     "Perfect Scholar",     "🎯", "Got every question in a level right on the first try.", "Ace every question in a level on the first try"),
  badge("voting-champion",     "Voting Champion",     "🗳️", "Completed the Elections and Voting lesson.",            "Complete the Elections and Voting lesson"),
  badge("constitution-keeper", "Constitution Keeper", "📜", "Aced the Constitution of India lesson on first tries.", "Ace the Constitution lesson on the first try"),
  badge("coin-collector",      "Coin Collector",      "💰", "Earned 100 coins in total.",                            "Earn 100 coins"),
  badge("society-architect",   "Society Architect",   "🏗️", "Built 10 things in your society.",                      "Build 10 things in your society"),
  badge("master-builder",      "Master Builder",      "👷", "Built something from every tier.",                      "Build one thing from every tier"),
  badge("complete-citizen",    "Complete Citizen",    "🌟", "Finished every lesson and earned every other badge.",   "Finish every lesson and earn all other badges"),
];

export function getBadge(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

export const MASCOT_MESSAGES = {
  correct:       ["Well done! 🦜", "That's right!", "Excellent!", "You've got it! 🎉"],
  incorrect:     ["Almost! Try again 🦜", "Not quite — give it another go!", "You can do it!"],
  levelComplete: ["Level complete! Brilliant work! 🎊", "You're unstoppable! 🏆"],
  streakStart:   ["Great! Your streak has started! 🔥", "Day 1 — let's keep going!"],
  streakContinue: (days: number) => `${days}-day streak! Amazing! 🔥`,
};


