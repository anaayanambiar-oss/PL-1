interface Props {
  value:    string;
  onChange: (v: string) => void;
  onNext:   () => void;
  onBack:   () => void;
}

const GRADES = [
  { label: "Grade 2", value: "grade-2" },
  { label: "Grade 3", value: "grade-3" },
  { label: "Grade 4", value: "grade-4" },
  { label: "Grade 5", value: "grade-5" },
  { label: "Grade 6", value: "grade-6" },
  { label: "Grade 7", value: "grade-7" },
  { label: "Grade 8", value: "grade-8" },
];

export default function ClassStep({ value, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <div className="text-5xl mb-4">📚</div>
      <h2 className="font-display font-bold text-2xl text-ink mb-1">
        Which grade are you in?
      </h2>
      <p className="text-mid text-sm mb-6">
        We&apos;ll use this to personalise your learning experience.
      </p>

      {/* Grade tiles */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {GRADES.map((g) => (
          <button
            key={g.value}
            type="button"
            onClick={() => onChange(g.value)}
            className={`py-3.5 rounded-2xl font-semibold text-base border-2
                        transition-all duration-150 hover:scale-[1.02]
                        ${value === g.value
                          ? "bg-brand-blue text-white border-brand-blue shadow-blue"
                          : "bg-pale text-ink border-black/10 hover:border-brand-blue"
                        }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Skip option for home-schooled / different system */}
      <button
        type="button"
        onClick={() => { onChange("other"); onNext(); }}
        className="w-full text-sm text-mid hover:text-brand-blue underline mb-4 transition-colors"
      >
        I&apos;m home-schooled or don&apos;t see my grade
      </button>

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
          Continue →
        </button>
      </div>
    </div>
  );
}


