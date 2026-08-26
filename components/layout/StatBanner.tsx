export default function StatBanner() {
  const stats = [
    {
      num: "40%",
      label:
        "of Indian teens can’t name their own MP — civics is the one subject school forgets to teach",
    },
    {
      num: "7–13",
      label:
        "the exact age when kids start asking “why do we even have rules?” Why not answer them?",
    },
    {
      num: "₹0",
      label:
        "forever free. Every Indian kid deserves to understand the country they’ll one day vote in",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-8">
      <div className="bg-brand-navy rounded-[32px] max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.num}
              className={[
                "px-8 py-10 flex flex-col gap-2",
                i < stats.length - 1
                  ? "sm:border-r border-b sm:border-b-0 border-white/10"
                  : "",
              ].join(" ")}
            >
              <span className="font-display text-5xl lg:text-6xl font-black text-brand-coral leading-none">
                {stat.num}
              </span>
              <p className="text-sm text-white/75 leading-relaxed max-w-[240px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
