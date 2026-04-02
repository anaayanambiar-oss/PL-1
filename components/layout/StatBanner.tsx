export default function StatBanner() {
  const stats = [
    {
      num: "40%",
      label:
        "of young adults cannot answer basic civics questions — the gap starts early",
    },
    {
      num: "7–13",
      label:
        "the age window when civic identity is formed and when it matters most to teach it",
    },
    {
      num: "₹0",
      label:
        "cost to any student — PoliticaLearn is free for every child, regardless of background",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-8">
      <div className="bg-[#0F1023] rounded-[32px] max-w-7xl mx-auto overflow-hidden">
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
              <span
                className="text-5xl lg:text-6xl font-black text-[#FF8200] leading-none"
                style={{ fontFamily: "var(--font-baloo2)" }}
              >
                {stat.num}
              </span>
              <p className="text-sm text-white/75 leading-relaxed max-w-[220px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
