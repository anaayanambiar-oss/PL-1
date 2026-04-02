const features = [
  {
    accent: "border-t-[#0252C9]",
    emoji: "🎮",
    title: "Gamified Levels",
    desc: "Three progressive levels take students from basic concepts to active citizenship. Each level unlocks as the previous one is mastered.",
    hoverBorder: "hover:border-t-[#0252C9]",
  },
  {
    accent: "border-t-[#FF8200]",
    emoji: "🔥",
    title: "Daily Streaks",
    desc: "A streak counter rewards consistent learning. One lesson per day keeps the streak alive and builds the habit.",
    hoverBorder: "hover:border-t-[#FF8200]",
  },
  {
    accent: "border-t-[#FF8200]",
    emoji: "🎬",
    title: "Short Videos",
    desc: "Every lesson includes a curated 2–4 minute video — sourced from TED-Ed or recorded for Indian students.",
    hoverBorder: "hover:border-t-[#FF8200]",
  },
  {
    accent: "border-t-[#0252C9]",
    emoji: "📊",
    title: "Personal Dashboard",
    desc: "Each student has a private dashboard showing progress, scores, and their recommended next step.",
    hoverBorder: "hover:border-t-[#0252C9]",
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left — copy */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#E8F0FC] text-[#0252C9] text-xs font-bold uppercase tracking-wider">
            ✦ Features
          </span>
          <h2
            className="text-3xl lg:text-4xl font-black text-[#0F1023] leading-tight"
            style={{ fontFamily: "var(--font-baloo2)" }}
          >
            Built to keep kids coming back
          </h2>
          <p className="text-base text-[#4B5063] leading-relaxed max-w-sm">
            PoliticaLearn borrows the best engagement mechanics from games and language apps — and
            applies them to civics. Learning feels like play.
          </p>
        </div>

        {/* Right — 2×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className={[
                "bg-white rounded-2xl border border-black/[0.08] border-t-4 p-6",
                "transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(15,16,35,0.14)]",
                f.accent,
              ].join(" ")}
            >
              <span className="text-3xl leading-none block mb-3">{f.emoji}</span>
              <h3
                className="text-base font-bold text-[#0F1023] mb-1.5"
                style={{ fontFamily: "var(--font-baloo2)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-[#4B5063] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
