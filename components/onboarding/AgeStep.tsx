interface Props {
  value:    number | null;
  onChange: (v: number) => void;
  onNext:   () => void;
  onBack:   () => void;
}

const AGES = [7, 8, 9, 10, 11, 12, 13];

export default function AgeStep({ value, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <div className="text-5xl mb-4">🎂</div>
      <h2 className="font-display font-bold text-2xl text-ink mb-1">
        How old are you?
      </h2>
      <p className="text-mid text-sm mb-6">
        This helps us recommend the right lessons for you.
      </p>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {AGES.map((age) => (
          <button
            key={age}
            type="button"
            onClick={() => onChange(age)}
            className={`py-4 rounded-2xl font-display font-bold text-xl border-2
                        transition-all duration-150 hover:scale-105
                        ${value === age
                          ? "bg-brand-blue text-white border-brand-blue shadow-blue"
                          : "bg-pale text-ink border-black/10 hover:border-brand-blue"
                        }`}
          >
            {age}
          </button>
        ))}
        <div />
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
          disabled={value === null}
          className="flex-[2] py-3.5 rounded-full bg-brand-orange text-white font-bold
                     shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}


