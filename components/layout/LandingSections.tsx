// components/layout/AudienceSection.tsx
const audiences = [
  {
    emoji:"🧒", title:"Students (7–13)",
    desc:"Short, game-like lessons that make civics feel like an adventure. No boring textbooks — just real concepts in plain language with Indian examples.",
    bg:"bg-state-active-bg", border:"border-state-active-border", titleCol:"text-brand-blue",
  },
  {
    emoji:"👨‍👩‍👧", title:"Parents",
    desc:"A safe, free, ad-free platform where children learn something genuinely useful. Progress is visible on the student's dashboard.",
    bg:"bg-age-badge-bg", border:"border-age-badge-border", titleCol:"text-[#B45309]",
  },
  {
    emoji:"🏫", title:"Teachers",
    desc:"A supplementary resource that fills the civic education gap. Assign a level as a weekly activity — or simply recommend it.",
    bg:"bg-[#FFF1F2]", border:"border-[#FECDD3]", titleCol:"text-brand-coral",
  },
];

export function AudienceSection() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                      bg-state-active-bg border border-state-active-border mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
          ✦ Who It&apos;s For
        </span>
      </div>
      <h2 className="font-display font-black text-[clamp(28px,4vw,48px)] leading-tight
                     tracking-tight text-brand-navy mb-12 max-w-md">
        Made for every Indian child
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {audiences.map((a) => (
          <div key={a.title}
            className={`rounded-3xl p-8 border ${a.bg} ${a.border}
                        hover:-translate-y-1 transition-all duration-200`}>
            <div className="text-5xl mb-5">{a.emoji}</div>
            <h3 className={`font-display font-bold text-xl mb-3 ${a.titleCol}`}>
              {a.title}
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CtaSection ──────────────────────────────────────────────
export function CtaSection() {
  return (
    <section id="signup" className="py-28 px-6 relative overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-96 h-96
                        rounded-full bg-brand-coral/6 blur-[100px]" />
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-96 h-96
                        rounded-full bg-brand-blue/6 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                        bg-state-active-bg border border-state-active-border mb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            ✦ Get Started
          </span>
        </div>
        <h2 className="font-display font-black text-[clamp(32px,5vw,60px)] leading-tight
                       tracking-tight text-brand-navy mb-5">
          Every child deserves to<br />understand their world.
        </h2>
        <p className="text-ink-soft text-lg leading-relaxed mb-10 max-w-md mx-auto">
          PoliticaLearn is free for every student, everywhere.
          No subscription. No ads. Just learning.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="#"
             className="px-10 py-4 rounded-full bg-brand-coral text-white font-bold
                        text-base shadow-coral hover:-translate-y-1 hover:shadow-lg
                        transition-all duration-200 flex items-center gap-2">
            🎓 Start Learning — It&apos;s Free
          </a>
          <a href="#curriculum"
             className="px-8 py-4 rounded-full bg-white border-2 border-brand-blue
                        text-brand-blue font-semibold text-base
                        hover:bg-brand-blue hover:text-white
                        transition-all duration-200 flex items-center gap-2 shadow-card">
            📚 Explore the Curriculum
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────
const footerLinks = {
  Platform: ["How it works", "Curriculum", "Features", "Sign Up Free"],
  About:    ["Our Mission", "The Team", "For Schools", "Contact"],
  Legal:    ["Privacy Policy", "Terms of Use", "Child Safety"],
};

export function Footer() {
  return (
    <footer className="bg-brand-navy px-6 md:px-20 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12
                        border-b border-white/10 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue
                              to-brand-coral flex items-center justify-center">
                <span className="font-display font-extrabold text-white text-lg leading-none">P</span>
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                Politica<span className="text-brand-yellow">Learn</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-[220px]">
              A civic education platform for Indian children aged 7–13. Learn. Lead. Change.
            </p>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#"
                       className="text-sm text-white/55 hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center
                        justify-between gap-3 text-xs text-white/30">
          <span>© 2025 PoliticaLearn. Made with ❤️ for India&apos;s next generation.</span>
          <span>Built by Anaaya · Mentored by Ascend Now</span>
        </div>
      </div>
    </footer>
  );
}
