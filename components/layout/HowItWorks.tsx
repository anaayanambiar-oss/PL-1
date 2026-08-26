// components/layout/HowItWorks.tsx
const steps = [
  { icon:"🔍", title:"Explore",
    desc:"No sign-up needed. Browse a few lessons, see what PoliticaLearn feels like, decide if it clicks." },
  { icon:"🎒", title:"Join in Under a Minute",
    desc:"One tap with Google. Tell us a name and age — that’s the whole form." },
  { icon:"📚", title:"Learn Like It’s a Game",
    desc:"Every lesson: a quick video, a real Indian example, and questions that make you think, not memorize." },
  { icon:"🌟", title:"Level Up",
    desc:"Badges, XP, and a streak that doesn’t want to be broken. Progress you can actually see." },
];

export default function HowItWorks() {
  return (
    <section id="how"
      className="mx-4 md:mx-10 my-4 bg-brand-navy rounded-4xl
                 px-6 md:px-20 py-20">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                      bg-white/10 border border-white/15 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-white/70">
          ✦ How It Works
        </span>
      </div>
      <h2 className="font-display font-black text-[clamp(28px,4vw,48px)] text-white
                     leading-tight tracking-tight mb-3 max-w-2xl">
        From “what’s a government?” to “I get it now”
      </h2>
      <p className="text-white/60 text-base leading-relaxed mb-14 max-w-xl">
        PoliticaLearn uses the same psychology as Duolingo — short lessons, instant rewards,
        and daily streaks — applied to the most important subject a child can learn.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={s.title} className="relative">
            <div className="text-3xl mb-4">{s.icon}</div>
            <div className="font-display font-extrabold text-brand-yellow text-sm
                            uppercase tracking-wider mb-2">
              Step {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-2">{s.title}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
