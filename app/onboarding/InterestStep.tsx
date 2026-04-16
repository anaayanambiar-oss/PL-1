interface Props {
  value:    string;
  onChange: (v: string) => void;
  onNext:   () => void;
  onBack:   () => void;
}

const REASONS = [
  { emoji: "🏛️", label: "I want to understand how India works",  value: "understand-india" },
  { emoji: "🗳️", label: "I want to know what voting means",       value: "voting" },
  { emoji: "📰", label: "I want to understand the news",         value: "news" },
  { emoji: "🤝", label: "I want to be a good citizen",           value: "citizenship" },
  { emoji: "🏆", label: "I love learning new things",            value: "learning" },
  { emoji: "👨‍👩‍👧", label: "My parent suggested it",               value: "parent" },
];

export default function InterestStep({ value, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <div className="text-5xl mb-4">🌟</div>
      <h2 className="font-display font-bold text-2xl text-ink mb-1">
        Why do you want to learn?
      </h2>
      <p className="text-mid text-sm mb-6">
        Pick the one that feels most like you. No wrong answers!
      </p>

      {/* Reason tiles */}
      <div className="flex flex-col gap-2.5 mb-6">
        {REASONS.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => onChange(r.value)}
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border-2
                        text-left font-medium text-base transition-all duration-150
                        ${value === r.value
                          ? "bg-brand-blue/10 border-brand-blue text-ink"
                          : "bg-pale border-black/10 text-ink hover:border-brand-blue"
                        }`}
          >
            <span className="text-2xl flex-shrink-0">{r.emoji}</span>
            <span>{r.label}</span>
            {value === r.value && (
              <span className="ml-auto text-brand-blue font-bold text-lg">✓</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 rounded-full border-2 border-black/10 text-ink
                     font-semibold hover:border-brand-blue hover:text-brand-blue transition-all"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!value}
          className="flex-[2] py-3.5 rounded-full bg-brand-orange text-white font-bold
                     shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          Let&apos;s go! →
        </button>
      </div>
    </div>
  );
}


