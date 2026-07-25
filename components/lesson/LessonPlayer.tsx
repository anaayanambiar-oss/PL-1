// components/lesson/LessonPlayer.tsx
"use client";
import { useState, useEffect } from "react";
import type { LessonContent, Slide } from "@/lib/lesson-types";
import LessonHeader         from "./LessonHeader";
import OverviewSlideView    from "./OverviewSlideView";
import ExplanationSlideView from "./ExplanationSlideView";
import VideoSlideView       from "./VideoSlideView";
import MCQSlideView         from "./MCQSlideView";
import CompletionSlideView  from "./CompletionSlideView";

interface Props {
  lesson: LessonContent;
  userId: string;
}

function getContentSlides(slides: Slide[]) {
  return slides.filter((s) => s.type !== "overview" && s.type !== "completion");
}

export default function LessonPlayer({ lesson, userId }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [xpSoFar,    setXpSoFar]    = useState(0);
  const [completed,  setCompleted]  = useState(false);

  const slides        = lesson.slides;
  const currentSlide  = slides[slideIndex];
  const contentSlides = getContentSlides(slides);
  const contentIndex  = contentSlides.findIndex((s) => s.id === currentSlide?.id);

  function handleNext() {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((i) => i + 1);
    }
  }

  // Fire completion API when reaching the completion slide
  useEffect(() => {
    if (currentSlide?.type === "completion" && !completed) {
      setCompleted(true);
      setXpSoFar((x) => x + lesson.xpReward);
      fetch("/api/lessons/complete", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          xpEarned: lesson.xpReward,
          badgeId:  lesson.badgeId ?? null,
        }),
      }).catch(console.error);
    }
  }, [currentSlide, completed, lesson]);

  if (!currentSlide) return null;

  const showHeader =
    currentSlide.type !== "overview" && currentSlide.type !== "completion";

  return (
    <div className="min-h-screen bg-cream flex flex-col">

      {showHeader && (
        <LessonHeader
          currentSlide={contentIndex + 1}
          totalSlides={contentSlides.length}
          xpSoFar={xpSoFar}
        />
      )}

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-5 py-6">

        {/* Pre-lesson label on overview */}
        {currentSlide.type === "overview" && (
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
              Level 1 · Lesson {lesson.number}
            </p>
            <h1 className="font-display font-black text-2xl text-ink leading-tight">
              {lesson.title}
            </h1>
          </div>
        )}

        {/* Slide card */}
        <div className="bg-white rounded-3xl shadow-card-lg border border-black/[0.07]
                        p-6 flex flex-col flex-1">
          {currentSlide.type === "overview" && (
            <OverviewSlideView slide={currentSlide} onNext={handleNext} />
          )}
          {currentSlide.type === "explanation" && (
            <ExplanationSlideView slide={currentSlide} onNext={handleNext} />
          )}
          {currentSlide.type === "video" && (
            <VideoSlideView slide={currentSlide} onNext={handleNext} />
          )}
          {currentSlide.type === "mcq" && (
            <MCQSlideView slide={currentSlide} onNext={handleNext} />
          )}
          {currentSlide.type === "completion" && (
            <CompletionSlideView
              slide={currentSlide}
              lessonTitle={lesson.title}
            />
          )}
        </div>

        {/* Slide counter */}
        {showHeader && (
          <p className="text-center text-xs text-soft mt-3">
            {contentIndex + 1} / {contentSlides.length}
          </p>
        )}
      </div>
    </div>
  );
}
