// components/layout/Features.tsx
const features = [
  { emoji:"🎮", title:"Levels That Unlock", accent:"border-t-brand-blue",
    desc:"No wall of content on day one. Three levels, each one earned — so there’s always a next thing to reach for." },
  { emoji:"🔥", title:"Streaks Kids Actually Care About", accent:"border-t-brand-coral",
    desc:"One short lesson a day is enough to keep the flame lit. Miss a day, feel it. Come back, get it going again." },
  { emoji:"🎬", title:"Videos Under 4 Minutes", accent:"border-t-brand-yellow",
    desc:"Attention spans are real. Every video is short, sharp, and either from TED-Ed or shot specifically for Indian students." },
  { emoji:"📊", title:"A Dashboard That’s Actually Theirs", accent:"border-t-brand-blue",
    desc:"Every student gets their own progress screen — scores, streaks, and what to learn next, without digging." },
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
            The kind of app kids open on their own
          </h2>
          <p className="text-ink-soft text-base leading-relaxed max-w-md">
            PoliticaLearn steals the tricks from the games your kids play and points them at
            civics. Learning that doesn’t feel like “homework”.
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
