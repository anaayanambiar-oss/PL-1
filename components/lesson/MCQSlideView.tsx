// components/lesson/MCQSlideView.tsx
// MCQ with retries (guideline v2.0, section 7.2). Only the FIRST submit is
// reported (via onFirstAnswer) — that is the attempt that can earn coins.
// Retries are local: they clear the selection and dim wrong options.
"use client";
import { useState } from "react";
import type { MCQSlide } from "@/lib/lesson-types";
import { MCQ_FIRST_TRY_BONUS } from "@/lib/coin-config";
import CoinIcon from "@/components/ui/CoinIcon";

interface Props {
  slide:         MCQSlide;
  onNext:        () => void;
  // Resolves with the coins the server awarded for the first attempt
  // (0 if none), or null if the answer could not be saved.
  onFirstAnswer: (optionId: string) => Promise<number | null>;
  // False when this question's first attempt was recorded in an earlier
  // session (a replay): no coins are possible, so don't promise any.
  coinsAvailable?: boolean;
}

type AnswerState = "unanswered" | "correct" | "incorrect";

export default function MCQSlideView({ slide, onNext, onFirstAnswer, coinsAvailable = true }: Props) {
  const [selected,     setSelected]     = useState<string | null>(null);
  const [answerState,  setAnswerState]  = useState<AnswerState>("unanswered");
  const [ruledOut,     setRuledOut]     = useState<string[]>([]); // wrong options already tried
  const [firstWrong,   setFirstWrong]   = useState(false);
  const [coinsAwarded, setCoinsAwarded] = useState<number | null>(null);

  const submitted = answerState !== "unanswered";
  const isFirstAttempt = ruledOut.length === 0 && !firstWrong;

  function handleSelect(id: string) {
    if (submitted || ruledOut.includes(id)) return;
    setSelected(id);
  }

  function handleSubmit() {
    if (!selected) return;
    const correct = slide.options.find((o) => o.id === selected)?.isCorrect === true;

    if (isFirstAttempt) {
      // Show local feedback straight away; the coin line appears when the
      // server confirms. Retries never call the API.
      if (!correct) setFirstWrong(true);
      onFirstAnswer(selected).then((coins) => setCoinsAwarded(coins));
    }
    setAnswerState(correct ? "correct" : "incorrect");
  }

  function handleTryAgain() {
    if (selected) setRuledOut((prev) => [...prev, selected]);
    setSelected(null);
    setAnswerState("unanswered");
  }

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
          const isRuledOut = ruledOut.includes(opt.id);
          let style = "bg-white border-black/10 text-ink";
          if (submitted && opt.id === selected) {
            style = opt.isCorrect
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-rose-50 border-rose-400 text-rose-800";
          } else if (submitted || isRuledOut) {
            style = "bg-white border-black/10 text-ink/40";
          } else if (opt.id === selected) {
            style = "bg-brand-blue/10 border-brand-blue text-ink";
          }
          const disabled = submitted || isRuledOut;

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={disabled}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2
                          text-left font-medium text-sm transition-all duration-150
                          ${style}
                          ${!disabled && opt.id !== selected
                            ? "hover:border-brand-blue hover:bg-brand-blue/5"
                            : ""}
                          disabled:cursor-default`}
            >
              <span className={`text-xl flex-shrink-0 ${isRuledOut ? "grayscale" : ""}`}>{opt.icon}</span>
              <span className={`leading-snug flex-1 ${isRuledOut ? "line-through" : ""}`}>{opt.text}</span>
              {submitted && opt.id === selected && opt.isCorrect && (
                <span className="ml-auto text-green-600 font-bold text-base">✓</span>
              )}
              {submitted && opt.id === selected && !opt.isCorrect && (
                <span className="ml-auto text-rose-500 font-bold text-base">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
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

          {/* Coins: confirmed by the server, first attempts only */}
          {answerState === "correct" && coinsAwarded !== null && coinsAwarded > 0 && (
            <p className="flex items-center gap-1.5 mt-2.5 text-sm font-bold text-brand-orange">
              <CoinIcon size={18} /> +{coinsAwarded} coins for a first-try answer!
            </p>
          )}
          {answerState === "correct" && firstWrong && coinsAvailable && (
            <p className="mt-2.5 text-sm text-ink-soft">
              Coins are for first tries, but you are still learning — and you got there! 🌱
            </p>
          )}
        </div>
      )}

      {/* Gentle hint before the first try */}
      {!submitted && isFirstAttempt && coinsAvailable && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-mid mb-3">
          <CoinIcon size={14} /> Get it right first time for +{MCQ_FIRST_TRY_BONUS} coins
        </p>
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
      ) : answerState === "correct" ? (
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full bg-brand-orange text-white font-bold text-base
                     shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all mt-auto"
        >
          Keep going →
        </button>
      ) : (
        <button
          onClick={handleTryAgain}
          className="w-full py-4 rounded-full bg-brand-blue text-white font-bold text-base
                     hover:-translate-y-0.5 hover:shadow-lg transition-all mt-auto"
        >
          Try again ↺
        </button>
      )}
    </div>
  );
}
