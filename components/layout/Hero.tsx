import StartButton from "@/components/ui/StartButton";

const stats = [
  { num: "3",    label: "Learning Levels" },
  { num: "15+",  label: "Lessons" },
  { num: "100%", label: "Free to Access" },
];

export default function Hero() {
  return (
    <section className="min-h-screen pt-16 grid md:grid-cols-2 items-center
                        relative overflow-hidden bg-brand-cream">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full
                        bg-brand-coral/8 blur-[100px]" />
        <div className="absolute -bottom-12 right-0 w-[400px] h-[400px] rounded-full
                        bg-brand-blue/8 blur-[80px]" />
      </div>

      {/* Dot pattern */}
      <div className="absolute right-0 top-16 w-1/2 h-full opacity-40
                      pointer-events-none hidden md:block"
           style={{
             backgroundImage: "radial-gradient(circle, rgba(42,111,219,0.12) 1.5px, transparent 1.5px)",
             backgroundSize: "28px 28px",
           }} />

      {/* ── Left content ── */}
      <div className="relative z-10 px-6 md:px-20 py-20 md:py-28 flex flex-col gap-6">

        {/* Age badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                        bg-age-badge-bg border border-age-badge-border w-fit
                        animate-fade-up">
          <span>🇮🇳</span>
          <span className="text-xs font-bold uppercase tracking-wider text-age-badge-text">
            For Indian Kids · Ages 7–13
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold
                       text-[clamp(40px,5.5vw,72px)] leading-[1.05]
                       tracking-tight animate-fade-up animation-delay-100">
          <span className="text-brand-navy">Learn.</span><br />
          <span className="text-brand-blue">Lead.</span><br />
          <span className="relative inline-block text-brand-coral">
            Change.
            {/* Yellow tint highlight box behind "Change." */}
            <span className="absolute inset-0 -z-10 rounded-md bg-[#FFFBEB] scale-x-105 scale-y-90" />
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-[17px] leading-relaxed text-ink-soft max-w-[460px]
                      animate-fade-up animation-delay-200">
          The first civics platform built for Indian children. Learn how your
          government works, why your vote matters — and how{" "}
          <em>you</em> can shape the world around you.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap animate-fade-up animation-delay-300">
          <StartButton
            signedInLabel="🎓 Go to My Dashboard"
            className="px-8 py-4 rounded-full bg-brand-coral text-white font-bold
                       text-base shadow-coral hover:-translate-y-1 hover:shadow-lg
                       transition-all duration-200 flex items-center gap-2">
            🎓 Start for Free
          </StartButton>
          <a href="#curriculum"
             className="px-7 py-4 rounded-full border-2 border-brand-blue text-brand-blue
                        font-semibold text-base bg-white
                        hover:bg-brand-blue hover:text-white
                        transition-all duration-200 flex items-center gap-2">
            ▶ See the Curriculum
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-8 pt-2 animate-fade-up animation-delay-400">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-display font-black text-3xl text-brand-navy tracking-tight">
                {s.num}
              </span>
              <span className="text-xs font-medium text-mid mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Phone mockup ── */}
      <div className="relative z-10 hidden md:flex items-center justify-center py-20 px-10">

        {/* Floating badges */}
        <div className="absolute top-[15%] right-4 bg-white rounded-2xl shadow-card-lg
                        px-3.5 py-2.5 flex items-center gap-2.5
                        border border-ui-border animate-bounce-soft">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-sm font-bold text-brand-navy leading-tight">Level 1 Complete!</p>
            <p className="text-xs text-mid">+200 XP earned</p>
          </div>
        </div>

        <div className="absolute bottom-[22%] left-4 bg-white rounded-2xl shadow-card-lg
                        px-3.5 py-2.5 flex items-center gap-2.5
                        border border-ui-border animate-bounce-soft animation-delay-300">
          <span className="text-2xl text-streak-icon">🔥</span>
          <div>
            <p className="text-sm font-bold text-brand-navy leading-tight">7-day streak</p>
            <p className="text-xs text-mid">Keep it going!</p>
          </div>
        </div>

        {/* Phone shell */}
        <div className="w-[280px] bg-brand-navy rounded-[40px] p-3.5
                        shadow-[0_32px_80px_rgba(15,23,42,0.35)]
                        animate-bounce-soft animation-delay-100">
          <div className="bg-brand-cream rounded-[28px] overflow-hidden">

            {/* App header */}
            <div className="bg-brand-blue px-4 pt-10 pb-3
                            flex items-center justify-between">
              <span className="font-display font-extrabold text-white text-sm">
                PoliticaLearn
              </span>
              <div className="flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full">
                <span className="text-xs">🔥</span>
                <span className="text-xs font-bold text-white">7</span>
              </div>
            </div>

            {/* App body */}
            <div className="px-3.5 py-3">
              <p className="font-display font-bold text-sm text-brand-navy mb-2.5">
                Hi Arjun! Ready to learn? 🌟
              </p>

              {/* XP bar */}
              <p className="text-[10px] font-semibold text-mid uppercase tracking-wider mb-1">
                Level 1 Progress
              </p>
              <div className="h-2.5 bg-ui-border rounded-full overflow-hidden mb-3.5">
                <div className="h-full w-[45%] rounded-full xp-gradient" />
              </div>

              {/* Lesson cards */}
              {[
                { icon:"✅", title:"What is a Government?", sub:"Lesson 1 · 3 min",
                  badge:"Done",   badgeCls:"text-done-check bg-state-correct-bg",  active:false },
                { icon:"📜", title:"Why Do We Have Rules?", sub:"Lesson 2 · 4 min",
                  badge:"Now",    badgeCls:"text-brand-coral bg-brand-orange-l",   active:true  },
                { icon:"🔒", title:"How India's Govt Works", sub:"Lesson 3 · 5 min",
                  badge:"Locked", badgeCls:"text-soft bg-pale",                    active:false },
              ].map((l) => (
                <div key={l.title}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl mb-2
                              border bg-white
                              ${l.active ? "border-brand-coral" : "border-ui-border"}`}>
                  <div className="w-9 h-9 rounded-lg bg-pale flex items-center
                                  justify-center text-lg flex-shrink-0">
                    {l.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-brand-navy truncate">{l.title}</p>
                    <p className="text-[10px] text-mid">{l.sub}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${l.badgeCls}`}>
                    {l.badge}
                  </span>
                </div>
              ))}

              {/* MCQ preview */}
              <div className="mt-2.5 bg-white rounded-xl p-2.5 border border-ui-border">
                <p className="text-[10px] font-bold text-brand-navy mb-1.5">
                  What does a government mainly do?
                </p>
                <div className="text-[10px] px-2 py-1.5 rounded-lg bg-state-active-bg
                                border border-state-active-border
                                text-brand-blue font-bold">
                  A) Makes and enforces rules ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
