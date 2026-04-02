const steps = [
  {
    emoji: "🔍",
    number: "01",
    title: "Discover",
    desc: "A parent or student finds PoliticaLearn. No sign-up required to explore the content.",
  },
  {
    emoji: "🎒",
    number: "02",
    title: "Sign Up Free",
    desc: "One-click sign-up via Google account. A short onboarding asks the student's name and age.",
  },
  {
    emoji: "📚",
    number: "03",
    title: "Learn by Doing",
    desc: "Each lesson combines explanation slides, a short video, a real Indian example, and interactive MCQs.",
  },
  {
    emoji: "🌟",
    number: "04",
    title: "Earn & Level Up",
    desc: "Complete lessons to earn badges and XP. A dashboard tracks every milestone.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-8">
      <div className="bg-[#0F1023] rounded-[32px] max-w-7xl mx-auto overflow-hidden px-8 py-12">
        {/* Section header */}
        <div className="mb-10">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8200]/15 text-[#FF8200] text-xs font-bold uppercase tracking-wider mb-3"
          >
            ✦ How It Works
          </span>
          <h2
            className="text-3xl lg:text-4xl font-black text-white"
            style={{ fontFamily: "var(--font-baloo2)" }}
          >
            From discovery to citizenship
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col gap-3">
              {/* Connector line — desktop only, not after last item */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                  }}
                />
              )}

              <span className="text-4xl leading-none">{step.emoji}</span>
              <span
                className="text-xs font-extrabold text-[#FF8200] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-baloo2)" }}
              >
                Step {step.number}
              </span>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-baloo2)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
