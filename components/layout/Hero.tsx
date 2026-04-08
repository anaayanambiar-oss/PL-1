"use client";

import Button from "@/components/ui/Button";

function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Phone shell — floats gently */}
      <div
        className="relative w-[270px] h-[540px] bg-[#0F1023] rounded-[40px] shadow-[0_32px_80px_rgba(15,16,35,0.35)] p-3"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0F1023] rounded-full z-10" />

        {/* Screen */}
        <div className="w-full h-full bg-[#FFFDF7] rounded-[28px] overflow-hidden flex flex-col">
          {/* App header bar */}
          <div className="bg-[#0252C9] px-4 pt-8 pb-3 flex items-center justify-between">
            <span
              className="text-white font-extrabold text-sm"
              style={{ fontFamily: "var(--font-baloo2)" }}
            >
              PoliticaLearn
            </span>
            <span className="flex items-center gap-1 bg-white/15 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              🔥 7
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 px-3 py-3 overflow-hidden flex flex-col gap-3">
            {/* Greeting */}
            <p className="text-xs font-semibold text-[#0F1023] leading-snug">
              Hi Arjun! Ready to learn? 🌟
            </p>

            {/* Level 1 progress */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-[#4B5063] uppercase tracking-wide">
                  Level 1
                </span>
                <span className="text-[10px] text-[#4B5063]">45%</span>
              </div>
              <div className="h-2 w-full bg-[#E8F0FC] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "45%",
                    background: "linear-gradient(90deg, #FF8200, #0252C9)",
                  }}
                />
              </div>
            </div>

            {/* Lesson cards */}
            <div className="flex flex-col gap-1.5">
              {[
                { icon: "✅", label: "Done", title: "What is Govt?", color: "bg-green-50 border-green-200" },
                { icon: "📜", label: "Now", title: "India's Constitution", color: "bg-[#E8F0FC] border-[#0252C9]/20" },
                { icon: "🔒", label: "Locked", title: "Your Rights", color: "bg-gray-50 border-gray-200" },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`flex items-center gap-2 p-2 rounded-xl border ${card.color}`}
                >
                  <span className="text-base leading-none">{card.icon}</span>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wide text-[#4B5063]">
                      {card.label}
                    </span>
                    <p className="text-[11px] font-semibold text-[#0F1023] leading-tight">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* MCQ sample */}
            <div className="bg-white rounded-xl border border-black/[0.08] p-2.5">
              <p className="text-[10px] font-semibold text-[#0F1023] mb-2 leading-snug">
                Who wrote India&apos;s Constitution?
              </p>
              <div className="flex flex-col gap-1">
                {[
                  { text: "Jawaharlal Nehru", correct: false },
                  { text: "B.R. Ambedkar", correct: true },
                  { text: "Mahatma Gandhi", correct: false },
                ].map((opt) => (
                  <div
                    key={opt.text}
                    className={[
                      "text-[10px] font-medium px-2 py-1 rounded-lg border",
                      opt.correct
                        ? "bg-[#E8F0FC] border-[#0252C9]/30 text-[#0252C9]"
                        : "bg-gray-50 border-gray-200 text-[#4B5063]",
                    ].join(" ")}
                  >
                    {opt.correct && "✓ "}{opt.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <div
        className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-[0_8px_32px_rgba(15,16,35,0.14)] border border-black/[0.06] px-3 py-2.5 max-w-[160px]"
        style={{ animation: "float 4s ease-in-out 0.5s infinite" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🏆</span>
          <div>
            <p className="text-xs font-bold text-[#0F1023] leading-tight">Level 1 Complete!</p>
            <p className="text-[11px] text-[#FF8200] font-semibold">+200 XP earned</p>
          </div>
        </div>
      </div>

      {/* Floating badge — bottom left */}
      <div
        className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-[0_8px_32px_rgba(15,16,35,0.14)] border border-black/[0.06] px-3 py-2.5 max-w-[160px]"
        style={{ animation: "float 4s ease-in-out 1.5s infinite" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <div>
            <p className="text-xs font-bold text-[#0F1023] leading-tight">7-day streak</p>
            <p className="text-[11px] text-[#4B5063]">Keep it going!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,130,0,0.10) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(2,82,201,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Badge pill */}
            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-[#FF8200]/40 bg-[#FFF0E0] text-[11px] font-bold uppercase tracking-wider text-[#FF8200]"
              style={{ animation: "fade-up 0.5s ease both", animationDelay: "0ms" }}
            >
              🇮🇳 For Indian Kids · Ages 7–13
            </div>

            {/* Headline */}
            <div
              className="flex flex-col"
              style={{ animation: "fade-up 0.5s ease both", animationDelay: "100ms" }}
            >
              <h1
                className="text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-baloo2)" }}
              >
                <span className="block text-[#0F1023]">Learn.</span>
                <span className="block text-[#0252C9]">Lead.</span>
                <span className="relative block text-[#FF8200]">
                  {/* Highlight bar */}
                  <span
                    className="absolute inset-y-1 inset-x-0 rounded-lg pointer-events-none"
                    style={{ background: "rgba(255,130,0,0.10)" }}
                  />
                  <span className="relative">Change.</span>
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p
              className="text-base lg:text-lg text-[#4B5063] leading-relaxed max-w-[460px]"
              style={{ animation: "fade-up 0.5s ease both", animationDelay: "200ms" }}
            >
              The first civics platform built for Indian children. Learn how your government works,
              why your vote matters — and how you can shape the world around you.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap gap-3"
              style={{ animation: "fade-up 0.5s ease both", animationDelay: "300ms" }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => { window.location.href = "/sign-up"; }}
              >
                🎓 Start for Free
              </Button>
              <Button variant="outline" size="lg">
                ▶ See the Curriculum
              </Button>
            </div>

            {/* Stats row */}
            <div
              className="flex items-center gap-8 pt-2"
              style={{ animation: "fade-up 0.5s ease both", animationDelay: "400ms" }}
            >
              {[
                { num: "3", label: "Learning Levels" },
                { num: "15+", label: "Lessons" },
                { num: "100%", label: "Free to Access" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl font-black text-[#0F1023]"
                    style={{ fontFamily: "var(--font-baloo2)" }}
                  >
                    {stat.num}
                  </span>
                  <span className="text-xs text-[#4B5063] font-medium">{stat.label}</span>
                  {i < 2 && <div className="hidden" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — phone mockup (hidden on mobile) */}
          <div className="hidden md:flex justify-center items-center relative">
            {/* Dot grid background — right side only */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(2,82,201,0.12) 1.5px, transparent 1.5px)",
                backgroundSize: "28px 28px",
              }}
            />
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
