import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ambient blobs */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,130,0,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(2,82,201,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6 relative">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FC] text-[#0252C9] text-xs font-bold uppercase tracking-wider">
          ✦ Get Started
        </span>
        <h2
          className="text-4xl lg:text-5xl font-black text-[#0F1023] leading-tight max-w-[700px]"
          style={{ fontFamily: "var(--font-baloo2)" }}
        >
          Every child deserves to understand their world.
        </h2>
        <p className="text-base lg:text-lg text-[#4B5063] max-w-xl leading-relaxed">
          PoliticaLearn is free for every student, everywhere. No subscription. No ads. Just
          learning.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Button variant="primary" size="lg">
            🎓 Start Learning — It&apos;s Free
          </Button>
          <Button variant="outline" size="lg">
            📚 Explore the Curriculum
          </Button>
        </div>
      </div>
    </section>
  );
}
