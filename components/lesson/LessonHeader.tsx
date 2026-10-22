// components/lesson/LessonHeader.tsx
import Link from "next/link";
import CoinIcon from "@/components/ui/CoinIcon";

interface Props {
  currentSlide: number;
  totalSlides:  number;
  coinsSoFar:   number; // coins earned in this lesson so far (first-try MCQs)
}

export default function LessonHeader({ currentSlide, totalSlides, coinsSoFar }: Props) {
  const progress = totalSlides > 0
    ? Math.round((currentSlide / totalSlides) * 100)
    : 0;

  return (
    <header className="w-full flex items-center gap-4 px-4 py-3 bg-white
                       border-b border-black/[0.06] flex-shrink-0">
      <Link
        href="/dashboard"
        className="w-8 h-8 rounded-full flex items-center justify-center
                   text-mid hover:bg-pale hover:text-ink transition-all flex-shrink-0
                   text-sm font-bold"
        aria-label="Exit lesson"
      >
        ✕
      </Link>

      <div className="flex-1">
        <div className="h-3 bg-brand-blue/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-blue to-brand-orange
                       rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0" aria-label={`${coinsSoFar} coins earned this lesson`}>
        <CoinIcon size={20} />
        <span className="font-display font-bold text-sm text-ink">{coinsSoFar}</span>
      </div>
    </header>
  );
}
