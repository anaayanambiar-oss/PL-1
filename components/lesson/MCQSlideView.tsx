// components/lesson/MCQSlideView.tsx
"use client";
import { useState } from "react";
import type { MCQSlide } from "@/lib/lesson-types";

interface Props {
  slide:  MCQSlide;
  onNext: () => void;
}

type AnswerState = "unanswered" | "correct" | "incorrect";

export default function MCQSlideView({ slide, onNext }: Props) {
  const [selected,    setSelected]    = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");

  function handleSelect(id: string) {
    if (answerState !== "unanswered") return;
    setSelected(id);
  }

  function handleSubmit() {
    if (!selected) return;
    const option = slide.options.find((o) => o.id === selected);
    setAnswerState(option?.isCorrect ? "correct" : "incorrect");
  }

  function handleNext() {
    setSelected(null);
    setAnswerState("unanswered");
    onNext();
  }

  const submitted = answerState !== "unanswered";

  return (
    <div className="flex flex-col h-full">

      {/* Role-play context */}
      {slide.isRolePlay && slide.roleContext && (
        <div className="flex items-start gap-2.5 bg-brand-orange/8 border
                        border-brand-orange/20 rounded-2xl px-4 py-3 mb-4">
          <span className="text-base flex-shrink-0 mt-0.5">🎭</span>
          <p className="text-sm text-ink-soft leading-relaxed">
            <span className="font-bold text-brand-orange">Role play: </span>
            {slide.roleContext}
          </p>
        </div>
      )}

      {/* Question image */}
      {slide.imageEmoji && (
        <div className="w-16 h-16 rounded-2xl bg-brand-blue/8 flex items-center
                        justify-center text-4xl mb-4 flex-shrink-0">
          {slide.imageEmoji}
        </div>
      )}

      {/* Question */}
      <h2 className="font-display font-bold text-xl text-ink mb-5 leading-snug">
        {slide.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-2.5 mb-5">
        {slide.options.map((opt) => {
          let style = "bg-white border-black/10 text-ink";
          if (submitted) {
            if (opt.isCorrect)                   style = "bg-green-50 border-green-500 text-green-800";
            else if (opt.id === selected)         style = "bg-rose-50 border-rose-400 text-rose-800";
            else                                  style = "bg-white border-black/10 text-ink/40";
          } else if (opt.id === selected) {
            style = "bg-brand-blue/10 border-brand-blue text-ink";
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={submitted}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2
                          text-left font-medium text-sm transition-all duration-150
                          ${style}
                          ${!submitted && opt.id !== selected
                            ? "hover:border-brand-blue hover:bg-brand-blue/5"
                            : ""}
                          disabled:cursor-default`}
            >
              <span className="text-xl flex-shrink-0">{opt.icon}</span>
              <span className="leading-snug flex-1">{opt.text}</span>
              {submitted && opt.isCorrect && (
                <span className="ml-auto text-green-600 font-bold text-base">✓</span>
              )}
              {submitted && opt.id === selected && !opt.isCorrect && (
                <span className="ml-auto text-rose-500 font-bold text-base">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {submitted && (
        <div className={`rounded-2xl px-4 py-3.5 mb-5 border
                         ${answerState === "correct"
                           ? "bg-green-50 border-green-200"
                           : "bg-rose-50 border-rose-200"}`}>
          <p className={`text-sm font-bold mb-1
                         ${answerState === "correct" ? "text-green-700" : "text-rose-700"}`}>
            {answerState === "correct" ? "✓ Correct!" : "Not quite — here's why:"}
          </p>
          <p className="text-sm text-ink-soft leading-relaxed">{slide.explanation}</p>
        </div>
      )}

      {/* CTA */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full py-4 rounded-full bg-brand-orange text-white font-bold text-base
                     shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all mt-auto
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-full bg-brand-orange text-white font-bold text-base
                     shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all mt-auto"
        >
          {answerState === "correct" ? "Keep going →" : "Try next question →"}
        </button>
      )}
    </div>
  );
}
