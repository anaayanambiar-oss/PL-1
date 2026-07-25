// components/lesson/CompletionSlideView.tsx
"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { CompletionSlide } from "@/lib/lesson-types";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player),
  { ssr: false }
);

interface Props {
  slide:       CompletionSlide;
  lessonTitle: string;
}

export default function CompletionSlideView({ slide, lessonTitle }: Props) {
  return (
    <div className="flex flex-col items-center text-center h-full py-4">

      {/* Mascot */}
      <div className="w-40 h-40 mb-2">
        <Player
          autoplay
          loop={false}
          src="/animation.json"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h2 className="font-display font-black text-3xl text-ink mb-2 leading-tight">
        Lesson Complete! 🎉
      </h2>
      <p className="text-ink-soft text-sm mb-6 max-w-xs">
        You finished{" "}
        <span className="font-semibold text-ink">{lessonTitle}</span>.
        Great work — your civic knowledge is growing!
      </p>

      {/* XP */}
      <div className="flex items-center gap-3 bg-brand-orange/10 border
                      border-brand-orange/25 rounded-2xl px-6 py-4 mb-4
                      w-full max-w-xs justify-center">
        <span className="text-3xl">⭐</span>
        <div className="text-left">
          <p className="font-display font-black text-2xl text-brand-orange leading-none">
            +{slide.xpEarned} XP
          </p>
          <p className="text-xs text-mid font-medium">added to your total</p>
        </div>
      </div>

      {/* Badge */}
      {slide.badgeId && (
        <div className="flex items-center gap-3 bg-brand-blue/8 border
                        border-brand-blue/20 rounded-2xl px-6 py-4 mb-8
                        w-full max-w-xs justify-center">
          <span className="text-3xl">{slide.badgeIcon}</span>
          <div className="text-left">
            <p className="font-bold text-base text-ink leading-none mb-0.5">
              Badge unlocked!
            </p>
            <p className="text-sm text-brand-blue font-semibold">{slide.badgeName}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-xs mt-auto">
        <Link
          href="/dashboard"
          className="w-full py-4 rounded-full bg-brand-orange text-white font-bold
                     text-base text-center shadow-orange hover:-translate-y-0.5
                     hover:shadow-lg transition-all"
        >
          Back to Dashboard →
        </Link>
        <Link
          href="/lessons"
          className="w-full py-3.5 rounded-full border-2 border-black/10 text-ink
                     font-semibold text-base text-center hover:border-brand-blue
                     hover:text-brand-blue transition-all"
        >
          See all lessons
        </Link>
      </div>
    </div>
  );
}
