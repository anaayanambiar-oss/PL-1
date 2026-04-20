"use client";

import dynamic from "next/dynamic";

// Load Lottie Player only in the browser — it uses document which doesn't exist on the server
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface Props {
  name:     string;
  onFinish: () => void;
  saving:   boolean;
}

export default function WelcomeStep({ name, onFinish, saving }: Props) {
  return (
    <div className="text-center py-4">

      {/* Lottie mascot animation — only renders in browser */}
      <div className="w-48 h-48 mx-auto mb-2">
        <Player
          autoplay
          loop
          src="/animation.json"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h2 className="font-display font-black text-3xl text-ink mb-3">
        You&apos;re all set, {name}!
      </h2>
      <p className="text-ink-soft text-base leading-relaxed mb-3 max-w-sm mx-auto">
        Your PoliticaLearn journey starts now. Complete lessons, earn badges,
        and build your very own society as you learn.
      </p>

      {/* Quick preview stats */}
      <div className="flex justify-center gap-8 py-5 mb-6 border-y border-black/[0.06]">
        <div className="flex flex-col items-center gap-1">
          <span className="font-display font-black text-2xl text-brand-orange">0</span>
          <span className="text-xs text-mid font-medium">XP Earned</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-display font-black text-2xl text-brand-orange">0</span>
          <span className="text-xs text-mid font-medium">Lessons Done</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-display font-black text-2xl text-brand-orange">0</span>
          <span className="text-xs text-mid font-medium">Day Streak</span>
        </div>
      </div>

      {/* Hint */}
      <p className="text-sm text-mid mb-6">
        🏛️ Your first building is waiting to be unlocked!
      </p>

      {/* CTA */}
      <button
        onClick={onFinish}
        disabled={saving}
        className="w-full py-4 rounded-full bg-brand-orange text-white font-bold text-base
                   shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {saving ? "Setting up your dashboard…" : "Go to my Dashboard →"}
      </button>

    </div>
  );
}


