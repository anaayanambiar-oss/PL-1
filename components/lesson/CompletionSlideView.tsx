// components/lesson/CompletionSlideView.tsx
// Lesson completion (guideline v2.0, section 12): a coins step, then one
// screen per new badge, then the exit buttons. Everything shown comes from
// the /api/lessons/complete response — the completion slide's static
// xpEarned/badge fields are no longer used.
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getBadge } from "@/lib/constants";
import AssetImage from "@/components/ui/AssetImage";
import CoinIcon from "@/components/ui/CoinIcon";

// Load Lottie only in the browser — it uses document.
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player),
  { ssr: false }
);

const COIN_BAG_ANIMATION = "/animations/coin-bag.json";
const FALLBACK_ANIMATION = "/animation.json"; // until the coin bag is uploaded

export interface CompletionResult {
  alreadyCompleted: boolean;
  coinsAwarded:     number;   // base coins for the lesson
  mcqCoins:         number;   // first-try bonuses earned in this lesson
  newBadges:        { id: string; bonus: number }[];
  balance:          number;
}

export type CompletionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; result: CompletionResult }
  | { status: "error"; message: string };

interface Props {
  lessonTitle: string;
  state:       CompletionState;
  onRetry:     () => void;
}

export default function CompletionSlideView({ lessonTitle, state, onRetry }: Props) {
  // 0 = coins step, 1..n = badge screens.
  const [step, setStep] = useState(0);
  const [animation, setAnimation] = useState(COIN_BAG_ANIMATION);

  if (state.status === "idle" || state.status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-16 gap-3">
        <CoinIcon size={40} className="animate-bounce-soft" />
        <p className="text-sm text-mid font-medium">Saving your progress…</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full py-12 gap-4">
        <span className="text-4xl">😕</span>
        <p role="alert" className="text-sm font-semibold text-red-600 max-w-xs">{state.message}</p>
        <button
          onClick={onRetry}
          className="px-7 py-3.5 rounded-full bg-brand-orange text-white font-bold text-sm
                     shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all"
        >
          Try again
        </button>
      </div>
    );
  }

  const { result } = state;
  const badgeSteps = result.newBadges;
  const isLastStep = step >= badgeSteps.length;
  const totalCoins = result.coinsAwarded + result.mcqCoins;

  return (
    <div className="flex flex-col items-center text-center h-full py-4">

      {step === 0 ? (
        <>
          {/* Step 1: coins */}
          <div className="w-40 h-40 mb-2">
            <Player
              autoplay
              loop={false}
              src={animation}
              onEvent={(e) => { if (e === "error") setAnimation(FALLBACK_ANIMATION); }}
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

          <div className="flex items-center gap-3 bg-brand-orange/10 border
                          border-brand-orange/25 rounded-2xl px-6 py-4 mb-4
                          w-full max-w-xs justify-center">
            <CoinIcon size={36} />
            <div className="text-left">
              {result.alreadyCompleted ? (
                <p className="text-sm font-semibold text-ink leading-snug">
                  You have already earned the coins for this lesson.
                </p>
              ) : (
                <>
                  <p className="font-display font-black text-2xl text-brand-orange leading-none">
                    +{totalCoins} coins
                  </p>
                  {result.mcqCoins > 0 && (
                    <p className="text-xs text-mid font-medium mt-0.5">
                      {result.coinsAwarded} for the lesson + {result.mcqCoins} first-try bonus
                    </p>
                  )}
                </>
              )}
              <p className="text-xs text-mid font-medium mt-0.5">
                Balance: {result.balance} coins
              </p>
            </div>
          </div>
        </>
      ) : (
        (() => {
          // Step 2: one screen per new badge
          const nb = badgeSteps[step - 1];
          const badge = getBadge(nb.id);
          return (
            <div className="flex flex-col items-center animate-fade-up">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-4">
                New badge!
              </p>
              <AssetImage
                src={badge?.image}
                fallback={badge?.icon ?? "🏅"}
                alt={badge?.name ?? nb.id}
                size={128}
                className="mb-4"
              />
              <h2 className="font-display font-black text-2xl text-ink mb-1.5 leading-tight">
                {badge?.name ?? nb.id}
              </h2>
              <p className="text-ink-soft text-sm mb-5 max-w-xs">{badge?.description}</p>
              {nb.bonus > 0 && (
                <p className="flex items-center gap-1.5 font-bold text-brand-orange mb-4">
                  <CoinIcon size={22} /> +{nb.bonus} bonus coins
                </p>
              )}
            </div>
          );
        })()
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-xs mt-auto">
        {!isLastStep ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="w-full py-4 rounded-full bg-brand-orange text-white font-bold
                       text-base shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            {step === 0
              ? (badgeSteps.length === 1 ? "See your new badge →" : `See your ${badgeSteps.length} new badges →`)
              : "Next badge →"}
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
