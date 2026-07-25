// components/lesson/OverviewSlideView.tsx
import type { OverviewSlide } from "@/lib/lesson-types";

interface Props {
  slide:  OverviewSlide;
  onNext: () => void;
}

export default function OverviewSlideView({ slide, onNext }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-brand-blue/5 border border-brand-blue/15 rounded-2xl p-5 mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">
          This lesson
        </p>
        <p className="text-sm text-ink-soft leading-relaxed">{slide.goal}</p>
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-mid mb-3">
        What you&apos;ll cover
      </p>
      <div className="flex flex-col gap-2.5 mb-8">
        {slide.bulletPoints.map((point, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-white rounded-xl px-4 py-3
                       border border-black/[0.07] shadow-card"
          >
            <span className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange
                             font-bold text-xs flex items-center justify-center
                             flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm text-ink-soft leading-relaxed">{point}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-full bg-brand-blue text-white font-bold text-base
                   shadow-blue hover:-translate-y-0.5 hover:shadow-lg transition-all mt-auto"
      >
        Let&apos;s Start →
      </button>
    </div>
  );
}
