import { type FormEvent } from "react";

interface Props {
  value: number | null;
  onChange: (v: string) => void;
  onNext:   () => void;
}

export default function NameStep({ value, onChange, onNext }: Props) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim().length < 2) return;
    onNext();
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Emoji + heading */}
      <div className="text-5xl mb-4">👋</div>
      <h2 className="font-display font-bold text-2xl text-ink mb-1">
        Welcome! What&apos;s your name?
      </h2>
      <p className="text-mid text-sm mb-6">
        This is how you&apos;ll appear on your dashboard.
      </p>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your first name"
        maxLength={40}
        autoFocus
        className="w-full px-4 py-3.5 rounded-2xl border-2 border-black/10 bg-pale
                   text-ink text-base font-medium placeholder:text-soft
                   focus:outline-none focus:border-brand-blue transition-colors mb-6"
      />

      <button
        type="submit"
        disabled={value.trim().length < 2}
        className="w-full py-3.5 rounded-full bg-brand-orange text-white font-bold text-base
                   shadow-orange hover:-translate-y-0.5 hover:shadow-lg transition-all
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        Continue →
      </button>
    </form>
  );
}


