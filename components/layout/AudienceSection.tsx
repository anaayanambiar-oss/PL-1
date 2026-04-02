const audiences = [
  {
    emoji: "🧒",
    title: "Students (7–13)",
    bg: "bg-[#E8F0FC]",
    border: "border-[#0252C9]/20",
    titleColor: "text-[#0252C9]",
    desc: "Short, game-like lessons that make civics feel like an adventure. No boring textbooks — just real concepts in plain language with Indian examples.",
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Parents",
    bg: "bg-[#FFF0E0]",
    border: "border-[#FF8200]/25",
    titleColor: "text-[#FF8200]",
    desc: "A safe, free, ad-free platform where children learn something genuinely useful. Progress is visible on the student's dashboard.",
  },
  {
    emoji: "🏫",
    title: "Teachers",
    bg: "bg-rose-50",
    border: "border-rose-200",
    titleColor: "text-rose-600",
    desc: "A supplementary resource that fills the civic education gap left by standard curricula. Assign a level as a weekly activity.",
  },
];

export default function AudienceSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FC] text-[#0252C9] text-xs font-bold uppercase tracking-wider">
            ✦ Who It&apos;s For
          </span>
          <h2
            className="text-3xl lg:text-4xl font-black text-[#0F1023] max-w-lg leading-tight"
            style={{ fontFamily: "var(--font-baloo2)" }}
          >
            Built for everyone in the classroom and at home
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div
              key={a.title}
              className={[
                "rounded-3xl p-8 border transition-all duration-200 hover:-translate-y-1",
                a.bg,
                a.border,
              ].join(" ")}
            >
              <span className="text-5xl block mb-4">{a.emoji}</span>
              <h3
                className={`text-xl font-bold mb-3 ${a.titleColor}`}
                style={{ fontFamily: "var(--font-baloo2)" }}
              >
                {a.title}
              </h3>
              <p className="text-sm text-[#4B5063] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
