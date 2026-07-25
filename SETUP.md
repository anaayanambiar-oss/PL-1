# Lesson Player — Complete Setup Guide

## Files and where they go in GitHub

| File in this zip | Destination in repo |
|------------------|---------------------|
| `lib/lesson-types.ts` | `lib/lesson-types.ts` |
| `lib/lesson-content.ts` | `lib/lesson-content.ts` (replace if exists) |
| `app/lessons/[lessonId]/page.tsx` | `app/lessons/[lessonId]/page.tsx` |
| `app/lessons/[lessonId]/not-found.tsx` | `app/lessons/[lessonId]/not-found.tsx` |
| `app/api/lessons/complete/route.ts` | `app/api/lessons/complete/route.ts` |
| `components/lesson/LessonPlayer.tsx` | `components/lesson/LessonPlayer.tsx` |
| `components/lesson/LessonHeader.tsx` | `components/lesson/LessonHeader.tsx` |
| `components/lesson/OverviewSlideView.tsx` | `components/lesson/OverviewSlideView.tsx` |
| `components/lesson/ExplanationSlideView.tsx` | `components/lesson/ExplanationSlideView.tsx` |
| `components/lesson/VideoSlideView.tsx` | `components/lesson/VideoSlideView.tsx` |
| `components/lesson/MCQSlideView.tsx` | `components/lesson/MCQSlideView.tsx` |
| `components/lesson/CompletionSlideView.tsx` | `components/lesson/CompletionSlideView.tsx` |

## End-to-end test checklist

After uploading all files and Vercel rebuilds, test this exact journey:

### Step 1 — Reach the lesson
- Sign in → go to /dashboard
- Click "Start Lesson" on Lesson 1.1 (What is a Government?)
- URL should change to `/lessons/l1-1`

### Step 2 — Overview slide
- Should show the lesson goal and 4 bullet points
- Click "Let's Start →"

### Step 3 — Explanation slides (4 slides)
- Each shows an emoji, heading, and body text
- Click "Got it ✓" to advance through each
- Slide counter at the bottom should increment (1/7 → 2/7 → ...)

### Step 4 — Video slide
- TED-Ed iframe should embed and be playable
- Click "Continue →" to advance

### Step 5 — MCQ 1 (standard question)
- Select a wrong answer → click Submit → red "Not quite" feedback appears
- Click "Try next question →"
- (Or) select the correct answer → green "Correct!" feedback appears
- Click "Keep going →"

### Step 6 — MCQ 2 (role-play question)
- Orange "Role play:" banner should appear above the question
- Test correct and incorrect answers

### Step 7 — Completion slide
- Lottie parrot animation should play (from /public/animation.json)
- "+50 XP" card should appear
- "First Steps" badge card should appear
- Click "Back to Dashboard →"

### Step 8 — Verify database updated
- Dashboard should show updated XP (was 0, now 50)
- Lesson 1.1 should show "Done" / green state
- Lesson 1.2 "Start →" button should now be available
- In Neon SQL Editor: `SELECT total_xp, lessons_completed, badges FROM users WHERE clerk_id = 'your_id';`

## Adding Level 2 lessons later

When Anaaya has written the Level 2 scripts, add them to `lib/lesson-content.ts`:

```ts
export const LESSON_2_1: LessonContent = {
  id: "l2-1",
  // ... slides
};

export const LESSONS = {
  "l1-1": LESSON_1_1,
  "l1-2": LESSON_1_2,
  "l1-3": LESSON_1_3,
  "l1-4": LESSON_1_4,
  "l2-1": LESSON_2_1,  // add here
};
```

No other files need to change.
