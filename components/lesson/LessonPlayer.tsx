// components/lesson/LessonPlayer.tsx
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { LessonContent, Slide } from "@/lib/lesson-types";
import LessonHeader         from "./LessonHeader";
import OverviewSlideView    from "./OverviewSlideView";
import ExplanationSlideView from "./ExplanationSlideView";
import VideoSlideView       from "./VideoSlideView";
import MCQSlideView         from "./MCQSlideView";
import CompletionSlideView, { type CompletionState } from "./CompletionSlideView";

interface Props {
  lesson:           LessonContent;
  answeredSlideIds: string[]; // first attempts already recorded (replays)
}

function getContentSlides(slides: Slide[]) {
  return slides.filter((s) => s.type !== "overview" && s.type !== "completion");
}

// POST JSON, retrying network failures and 5xx a couple of times. Returns
// the parsed body and status, or null if the request never got through.
async function postJSON(url: string, body: unknown, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status < 500 || attempt === tries) {
        return { status: res.status, data: await res.json().catch(() => null) };
      }
    } catch {
      if (attempt === tries) return null;
    }
    await new Promise((r) => setTimeout(r, 500 * attempt));
  }
  return null;
}

export default function LessonPlayer({ lesson, answeredSlideIds }: Props) {
  const [slideIndex,   setSlideIndex]   = useState(0);
  const [coinsSoFar,   setCoinsSoFar]   = useState(0); // MCQ coins earned this session
  const [completion,   setCompletion]   = useState<CompletionState>({ status: "idle" });

  // One answer request per slide, ever: a fast double-submit, or a remount,
  // reuses the first request instead of sending a second "first attempt".
  const answerRequests = useRef(new Map<string, Promise<number | null>>());

  const slides        = lesson.slides;
  const currentSlide  = slides[slideIndex];
  const contentSlides = getContentSlides(slides);
  const contentIndex  = contentSlides.findIndex((s) => s.id === currentSlide?.id);
  const levelNumber   = Number(lesson.levelId.replace("level-", "")) || 1;

  function handleNext() {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((i) => i + 1);
    }
  }

  const submitFirstAnswer = useCallback((slideId: string, optionId: string) => {
    const existing = answerRequests.current.get(slideId);
    if (existing) return existing;
    const request = postJSON("/api/lessons/answer", { lessonId: lesson.id, slideId, optionId })
      .then((res) => {
        if (!res || res.status !== 200) return null;
        const coins = Number(res.data?.coinsAwarded ?? 0);
        if (coins > 0) setCoinsSoFar((c) => c + coins);
        return coins;
      });
    answerRequests.current.set(slideId, request);
    return request;
  }, [lesson.id]);

  const completeLesson = useCallback(async () => {
    setCompletion({ status: "loading" });
    // Let in-flight answers land first: the server refuses to complete a
    // lesson until every MCQ has been answered.
    await Promise.allSettled(answerRequests.current.values());
    const res = await postJSON("/api/lessons/complete", { lessonId: lesson.id });
    if (res && res.status === 200 && res.data?.success) {
      setCompletion({ status: "done", result: res.data });
    } else {
      setCompletion({
        status: "error",
        message: res?.data?.error ?? "We couldn't save your progress. Check your connection.",
      });
    }
  }, [lesson.id]);

  // Fire the completion API once, when the completion slide is reached.
  useEffect(() => {
    if (currentSlide?.type === "completion" && completion.status === "idle") {
      completeLesson();
    }
  }, [currentSlide, completion.status, completeLesson]);

  if (!currentSlide) return null;

  const showHeader =
    currentSlide.type !== "overview" && currentSlide.type !== "completion";

  return (
    <div className="min-h-screen bg-cream flex flex-col">

      {showHeader && (
        <LessonHeader
          currentSlide={contentIndex + 1}
          totalSlides={contentSlides.length}
          coinsSoFar={coinsSoFar}
        />
      )}

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-5 py-6">

        {/* Pre-lesson label on overview */}
        {currentSlide.type === "overview" && (
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">
              Level {levelNumber} · Lesson {lesson.number}
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
            // key: fresh state per question (consecutive MCQs reuse the component)
            <MCQSlideView
              key={currentSlide.id}
              slide={currentSlide}
              onNext={handleNext}
              onFirstAnswer={(optionId) => submitFirstAnswer(currentSlide.id, optionId)}
              coinsAvailable={!answeredSlideIds.includes(currentSlide.id)}
            />
          )}
          {currentSlide.type === "completion" && (
            <CompletionSlideView
              lessonTitle={lesson.title}
              state={completion}
              onRetry={completeLesson}
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
