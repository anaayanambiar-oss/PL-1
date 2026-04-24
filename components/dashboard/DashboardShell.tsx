"use client";

import type { Level, Lesson } from "@/lib/types";
import DashboardNav        from "./DashboardNav";
import GreetingHeader      from "./GreetingHeader";
import StatsRow            from "./StatsRow";
import NextLessonCard      from "./NextLessonCard";
import LevelProgress       from "./LevelProgress";
import LessonsGrid         from "./LessonsGrid";
import SocietyBuilderWidget from "./SocietyBuilderWidget";
import BadgesSection       from "./BadgesSection";

export interface DashboardProfile {
  name:             string;
  age:              number;
  currentLevel:     number;
  lessonsCompleted: string[];
  totalXP:          number;
  streakDays:       number;
  badges:           string[];
  lastActiveDate:   string | null;
}

interface Props {
  profile:         DashboardProfile;
  nextLesson:      Lesson | null;
  currentLevel:    Level;
  totalLessons:    number;
  xpForNextLevel:  number;
  clerkFirstName:  string | null;
}

export default function DashboardShell({
  profile,
  nextLesson,
  currentLevel,
  totalLessons,
  xpForNextLevel,
  clerkFirstName,
}: Props) {
  const displayName = profile.name || clerkFirstName || "there";

  return (
    <div className="min-h-screen bg-cream">
      <DashboardNav name={displayName} />

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ── Row 1: Greeting + Stats ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <GreetingHeader
              name={displayName}
              streakDays={profile.streakDays}
              nextLesson={nextLesson}
            />
          </div>
          <div>
            <StatsRow
              totalXP={profile.totalXP}
              streakDays={profile.streakDays}
              currentLevel={profile.currentLevel}
              lessonsCompleted={profile.lessonsCompleted.length}
              totalLessons={totalLessons}
            />
          </div>
        </div>

        {/* ── Row 2: Next Lesson + Level Progress ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <NextLessonCard lesson={nextLesson} />
          </div>
          <div className="lg:col-span-2">
            <LevelProgress
              currentLevel={profile.currentLevel}
              currentLevelData={currentLevel}
              lessonsCompleted={profile.lessonsCompleted}
              totalXP={profile.totalXP}
              xpForNextLevel={xpForNextLevel}
            />
          </div>
        </div>

        {/* ── Row 3: Lessons Grid + Society Builder ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <LessonsGrid
              currentLevel={currentLevel}
              lessonsCompleted={profile.lessonsCompleted}
            />
          </div>
          <div>
            <SocietyBuilderWidget
              lessonsCompleted={profile.lessonsCompleted}
              totalLessons={totalLessons}
            />
          </div>
        </div>

        {/* ── Row 4: Badges ────────────────────────────────── */}
        <BadgesSection earnedBadgeIds={profile.badges} />

      </main>
    </div>
  );
}
