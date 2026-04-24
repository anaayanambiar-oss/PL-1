export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k XP`;
  return `${xp} XP`;
}

export function getLevelLabel(level: 1 | 2 | 3): string {
  const labels: Record<1 | 2 | 3, string> = {
    1: "Foundations of Government",
    2: "You and Your Government",
    3: "Being an Active Citizen",
  };
  return labels[level];
}

export function getStreakMessage(days: number): string {
  if (days === 0)  return "Start your streak today!";
  if (days === 1)  return "Day 1 — great start!";
  if (days < 7)   return `${days} days — keep going!`;
  if (days === 7)  return "🔥 One week streak!";
  if (days < 30)  return `🔥 ${days}-day streak!`;
  return `🏆 ${days}-day streak — incredible!`;
}

export function getLessonProgress(
  completedIds: string[],
  totalLessons: number
): number {
  if (totalLessons === 0) return 0;
  return Math.round((completedIds.length / totalLessons) * 100);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function isLessonComplete(lessonId: string, completedIds: string[]): boolean {
  return completedIds.includes(lessonId);
}

export function getAgeGroup(age: number): "junior" | "senior" {
  return age <= 10 ? "junior" : "senior";
}


