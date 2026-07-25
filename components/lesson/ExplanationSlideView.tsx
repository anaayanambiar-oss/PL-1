// components/lesson/ExplanationSlideView.tsx
"use client";
import { useState } from "react";
import type { ExplanationSlide } from "@/lib/lesson-types";

interface Props {
  slide:  ExplanationSlide;
  onNext: () => void;
}

export default function ExplanationSlideView({ slide, onNext }: Props) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {slide.imageEmoji && (
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-blue/10
                        to-brand-orange/10 flex items-center justify-center
                        text-5xl mx-auto mb-6 flex-shrink-0">
          {slide.imageEmoji}
        </div>
      )}

      <h2 className="font-display font-bold text-2xl text-ink text-center mb-3 leading-tight">
        {slide.heading}
      </h2>

      <p className="text-base text-ink-soft leading-relaxed text-center mb-6">
        {slide.body}
      </p>

      {slide.videoUrl && (
        <div className="mb-6">
          <button
            onClick={() => setVideoOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                       bg-pale border border-black/[0.07] text-sm font-semibold text-ink-soft
                       hover:border-brand-blue hover:text-brand-blue transition-all"
          >
            <span className="flex items-center gap-2">
              <span>🎬</span>
              <span>Watch a short video on this</span>
            </span>
            <span className="text-xs">{videoOpen ? "▲" : "▼"}</span>
          </button>
          {videoOpen && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-black/[0.07]">
              <iframe
                src={slide.videoUrl}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full py-4 rounded-full bg-brand-orange text-white font-bold text-base
                   shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all mt-auto"
      >
        Got it ✓
      </button>
    </div>
  );
}
