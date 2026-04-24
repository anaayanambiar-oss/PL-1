export interface User {
  id: string; name: string; age: number;
  classGrade: string; email: string; createdAt: string;
}

export interface UserProgress {
  userId: string; currentLevel: 1 | 2 | 3;
  currentLessonId: string; lessonsCompleted: string[];
  totalXP: number; lastScore: number;
  streakDays: number; lastActiveDate: string;
  badges: string[];
}

export type LevelNumber = 1 | 2 | 3;

export interface Level {
  id: string; number: LevelNumber;
  title: string; description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string; levelId: string; number: number;
  title: string; learningGoal: string;
  slides: unknown[];
  xpReward: number; badgeId?: string;
}

export interface Badge {
  id: string; name: string;
  description: string; icon: string; trigger: string;
}

export interface ApiResponse<T> {
  data: T | null; error: string | null; success: boolean;
}


