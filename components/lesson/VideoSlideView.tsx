// components/lesson/VideoSlideView.tsx
import type { VideoSlide } from "@/lib/lesson-types";

interface Props {
  slide:  VideoSlide;
  onNext: () => void;
}

export default function VideoSlideView({ slide, onNext }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🎬</span>
        <p className="text-xs font-bold uppercase tracking-wider text-mid">
          Watch · {slide.duration} · {slide.sourceCredit}
        </p>
      </div>

      <h2 className="font-display font-bold text-xl text-ink mb-4 leading-tight">
        {slide.title}
      </h2>

      <div className="rounded-2xl overflow-hidden border border-black/[0.07] mb-6 flex-shrink-0">
        <iframe
          src={slide.videoUrl}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
          title={slide.title}
        />
      </div>

      <p className="text-xs text-mid text-center mb-6">
        Watch the video above, then tap continue when you&apos;re ready.
      </p>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-full bg-brand-orange text-white font-bold text-base
                   shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all mt-auto"
      >
        Continue →
      </button>
    </div>
  );
}
