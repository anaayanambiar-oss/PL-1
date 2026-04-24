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

export const XP_REWARDS = {
  lessonComplete: 50,
  levelComplete:  200,
  perfectScore:   50,
  streakBonus: {
    3:  10,
    7:  25,
    14: 50,
    30: 100,
  } as Record<number, number>,
};

export const BADGES: Badge[] = [
  {
    id:          "first-lesson",
    name:        "First Steps",
    description: "Completed your very first lesson on PoliticaLearn.",
    icon:        "👶",
    trigger:     "Complete Lesson 1.1",
  },
  {
    id:          "level-1-complete",
    name:        "Foundations Unlocked",
    description: "Completed all lessons in Level 1 — Foundations of Government.",
    icon:        "🏛️",
    trigger:     "Complete Level 1",
  },
  {
    id:          "level-2-complete",
    name:        "Your Rights & Duties",
    description: "Completed all lessons in Level 2 — You and Your Government.",
    icon:        "📋",
    trigger:     "Complete Level 2",
  },
  {
    id:          "level-3-complete",
    name:        "Active Citizen",
    description: "Completed all lessons in Level 3 — Being an Active Citizen.",
    icon:        "✊",
    trigger:     "Complete Level 3",
  },
  {
    id:          "streak-7",
    name:        "Week Warrior",
    description: "Logged in and completed at least one lesson for 7 days in a row.",
    icon:        "🔥",
    trigger:     "Maintain a 7-day streak",
  },
  {
    id:          "streak-30",
    name:        "Dedication",
    description: "30 consecutive days of learning. You are unstoppable.",
    icon:        "🏆",
    trigger:     "Maintain a 30-day streak",
  },
  {
    id:          "perfect-score",
    name:        "Sharp Mind",
    description: "Scored 100% on an MCQ set without any wrong answers.",
    icon:        "🎯",
    trigger:     "Perfect score on any MCQ set",
  },
  {
    id:          "all-complete",
    name:        "Democracy Champion",
    description: "Completed every lesson across all three levels.",
    icon:        "🌟",
    trigger:     "Complete all 12 lessons",
  },
];

export const MASCOT_MESSAGES = {
  correct:       ["Well done! 🦜", "That's right!", "Excellent!", "You've got it! 🎉"],
  incorrect:     ["Almost! Try again 🦜", "Not quite — give it another go!", "You can do it!"],
  levelComplete: ["Level complete! Brilliant work! 🎊", "You're unstoppable! 🏆"],
  streakStart:   ["Great! Your streak has started! 🔥", "Day 1 — let's keep going!"],
  streakContinue: (days: number) => `${days}-day streak! Amazing! 🔥`,
};


