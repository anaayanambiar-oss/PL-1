// lib/lesson-types.ts

export type SlideType =
  | "overview"
  | "explanation"
  | "video"
  | "mcq"
  | "completion";

export interface BaseSlide {
  id:    string;
  type:  SlideType;
  order: number;
}

export interface OverviewSlide extends BaseSlide {
  type:         "overview";
  lessonTitle:  string;
  goal:         string;
  bulletPoints: string[];
}

export interface ExplanationSlide extends BaseSlide {
  type:        "explanation";
  heading:     string;
  body:        string;
  imageEmoji?: string;
  imageAlt?:   string;
  videoUrl?:   string;   // optional collapsed video on this slide
}

export interface VideoSlide extends BaseSlide {
  type:         "video";
  title:        string;
  videoUrl:     string;
  duration:     string;
  sourceCredit: string;
}

export interface MCQOption {
  id:        string;
  text:      string;
  icon:      string;
  isCorrect: boolean;
}

export interface MCQSlide extends BaseSlide {
  type:         "mcq";
  question:     string;
  isRolePlay:   boolean;
  roleContext?: string;
  imageEmoji?:  string;
  options:      MCQOption[];
  explanation:  string;
}

export interface CompletionSlide extends BaseSlide {
  type:       "completion";
  xpEarned:   number;
  badgeId?:   string;
  badgeName?: string;
  badgeIcon?: string;
}

export type Slide =
  | OverviewSlide
  | ExplanationSlide
  | VideoSlide
  | MCQSlide
  | CompletionSlide;

export interface LessonContent {
  id:          string;
  levelId:     string;
  number:      number;
  title:       string;
  xpReward:    number;
  badgeId?:    string;
  badgeName?:  string;
  badgeIcon?:  string;
  slides:      Slide[];
}
