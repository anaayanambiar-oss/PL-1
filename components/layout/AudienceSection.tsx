// Saturated brand fills. Each card's text colour is dictated by contrast against
// its own fill (see COLOUR_GUIDE.md): white clears AA on brand-blue only, while
// brand-yellow and brand-coral need brand-navy. Don't swap these independently.
const audiences = [
  {
    title: "Students (7–13)",
    bg: "bg-brand-blue",
    border: "border-[#245FBE]",
    titleColor: "text-white",
    bodyColor: "text-white",
    desc: "Bite-sized lessons that feel like leveling up in a game, not another textbook chapter. Real Indian examples, zero jargon.",
  },
  {
    title: "Parents",
    bg: "bg-brand-yellow",
    border: "border-[#E09E00]",
    titleColor: "text-brand-navy",
    bodyColor: "text-brand-navy",
    desc: "A safe, ad-free space where your kid learns something that actually matters. Check their dashboard anytime — no guessing what they’re up to.",
  },
  {
    title: "Teachers",
    bg: "bg-brand-coral",
    border: "border-[#F0454A]",
    titleColor: "text-brand-navy",
    bodyColor: "text-brand-navy",
    desc: "The civics gap standard curricula leave behind, solved. Assign a level as homework or a weekly activity, no lesson planning required.",
  },
];

export default function AudienceSection() {
  return (
    // id="who" is the target of the navbar's "Who it's for" link.
    <section id="who" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-state-active-bg border border-state-active-border text-brand-blue text-xs font-bold uppercase tracking-wider">
            ✦ Who It&apos;s For
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-navy max-w-xl leading-tight">
            Made for the whole civics-curious household
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div
              key={a.title}
              className={[
                "rounded-3xl p-8 border transition-all duration-200",
                "hover:-translate-y-1 hover:shadow-card-lg",
                a.bg,
                a.border,
              ].join(" ")}
            >
              <h3 className={`font-display text-xl font-bold mb-3 ${a.titleColor}`}>
                {a.title}
              </h3>
              <p className={`text-sm leading-relaxed ${a.bodyColor}`}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
