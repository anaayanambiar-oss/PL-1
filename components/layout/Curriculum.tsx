const levels = [
  {
    num: "Level 1",
    title: "Foundations of Government",
    emoji: "🏛️",
    gradient: "from-[#E8F0FC] to-blue-100",
    accentColor: "text-[#0252C9]",
    lessons: [
      { icon: "📖", text: "What is a Government?" },
      { icon: "📜", text: "Why Do We Have Rules?" },
      { icon: "🇮🇳", text: "How India's Government Works" },
      { icon: "⚖️", text: "The Constitution Explained" },
    ],
  },
  {
    num: "Level 2",
    title: "You and Your Government",
    emoji: "🤝",
    gradient: "from-[#FFF0E0] to-orange-100",
    accentColor: "text-[#FF8200]",
    lessons: [
      { icon: "🛡️", text: "Your Fundamental Rights" },
      { icon: "🌱", text: "Duties of a Citizen" },
      { icon: "🗳️", text: "How Elections Work" },
      { icon: "🏘️", text: "Local Government & Panchayat" },
    ],
  },
  {
    num: "Level 3",
    title: "Being an Active Citizen",
    emoji: "✊",
    gradient: "from-pink-50 to-rose-100",
    accentColor: "text-rose-600",
    lessons: [
      { icon: "📰", text: "Media and Democracy" },
      { icon: "🔍", text: "How to Spot Fake News" },
      { icon: "💡", text: "How Citizens Make Change" },
      { icon: "🗳️", text: "Your First Vote" },
    ],
  },
];

export default function Curriculum() {
  return (
    <section className="bg-blue-50/50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E0] text-[#FF8200] text-xs font-bold uppercase tracking-wider">
            ✦ Curriculum
          </span>
          <h2
            className="text-3xl lg:text-4xl font-black text-[#0F1023] max-w-xl leading-tight"
            style={{ fontFamily: "var(--font-baloo2)" }}
          >
            Three levels. One goal: active citizenship.
          </h2>
          <p className="text-base text-[#4B5063] max-w-xl leading-relaxed">
            Each level builds on the last, moving from understanding basic concepts to putting civic
            knowledge into real-world practice.
          </p>
        </div>

        {/* Level cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div
              key={level.num}
              className="bg-white rounded-3xl overflow-hidden border border-black/[0.06] transition-all duration-200 hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(15,16,35,0.14)] group"
            >
              {/* Card header */}
              <div className={`bg-gradient-to-br ${level.gradient} px-7 py-7`}>
                <span className="text-4xl block mb-2">{level.emoji}</span>
                <span
                  className={`text-xs font-extrabold uppercase tracking-widest ${level.accentColor}`}
                  style={{ fontFamily: "var(--font-baloo2)" }}
                >
                  {level.num}
                </span>
                <h3
                  className="text-lg font-bold text-[#0F1023] mt-0.5 leading-snug"
                  style={{ fontFamily: "var(--font-baloo2)" }}
                >
                  {level.title}
                </h3>
              </div>

              {/* Lessons list */}
              <div className="px-5 py-5 flex flex-col gap-2">
                <p className="text-[11px] font-bold text-[#4B5063] uppercase tracking-wider mb-1">
                  Lessons
                </p>
                {level.lessons.map((lesson) => (
                  <div
                    key={lesson.text}
                    className="flex items-center gap-2 bg-[#FFFDF7] border border-black/[0.06] rounded-xl px-3 py-2"
                  >
                    <span className="text-sm leading-none">{lesson.icon}</span>
                    <span className="text-xs font-medium text-[#0F1023]">{lesson.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
