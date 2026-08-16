// components/layout/Features.tsx
const features = [
  { emoji:"🎮", title:"Gamified Levels",    accent:"border-t-brand-blue",
    desc:"Three progressive levels take students from basic concepts to active citizenship. Each level unlocks as the previous one is mastered." },
  { emoji:"🔥", title:"Daily Streaks",      accent:"border-t-brand-coral",
    desc:"A streak counter rewards consistent learning. One lesson per day keeps the streak alive and builds the habit of staying informed." },
  { emoji:"🎬", title:"Short Videos",       accent:"border-t-brand-yellow",
    desc:"Every lesson includes a curated 2–4 minute video — sourced from TED-Ed or recorded specifically for Indian students." },
  { emoji:"📊", title:"Personal Dashboard", accent:"border-t-brand-blue",
    desc:"Each student has a private dashboard showing what they have completed, their scores, and their recommended next step." },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                          bg-state-active-bg border border-state-active-border mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              ✦ Features
            </span>
          </div>
          <h2 className="font-display font-black text-[clamp(28px,4vw,48px)] leading-tight
                         tracking-tight text-brand-navy mb-4">
            Built to keep kids coming back
          </h2>
          <p className="text-ink-soft text-base leading-relaxed max-w-md">
            PoliticaLearn borrows the best engagement mechanics from games and language apps —
            and applies them to civics. Learning feels like play.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title}
              className={`bg-ui-card rounded-2xl p-6 border border-ui-border
                          border-t-4 ${f.accent}
                          hover:-translate-y-1 hover:shadow-card-lg
                          transition-all duration-200 cursor-default`}>
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h3 className="font-display font-bold text-base text-brand-navy mb-1.5">
                {f.title}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
