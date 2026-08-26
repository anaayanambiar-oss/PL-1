// components/layout/Curriculum.tsx
const levels = [
  {
    num:"Level 1", title:"First, the Basics",
    desc:"Understanding how the country actually runs",
    lessons:[
      { icon:"🏛️", title:"What Is a Government?" },
      { icon:"📜", title:"Why Do We Even Need Rules?" },
      { icon:"🗺️", title:"How India’s Government Actually Works" },
      { icon:"⚖️", title:"The Constitution, Explained Simply" },
    ],
    headerGrad: "from-[#EFF6FF] to-[#DBEAFE]",
    numColor:   "text-brand-blue",
    titleColor: "text-brand-blue",
  },
  {
    num:"Level 2", title:"Then, Where You Fit In",
    desc:"Your rights, your role, your neighbourhood",
    lessons:[
      { icon:"🤝", title:"Rights Every Indian Kid Should Know" },
      { icon:"📋", title:"What “Being a Good Citizen” Really Means" },
      { icon:"🗳️", title:"How an Election Actually Works" },
      { icon:"🏘️", title:"Panchayats and Local Government" },
    ],
    headerGrad: "from-[#FFFBEB] to-[#FEF3C7]",
    numColor:   "text-[#B45309]",
    titleColor: "text-[#92400E]",
  },
  {
    num:"Level 3", title:"Finally, Taking Action",
    desc:"From knowing to doing",
    lessons:[
      { icon:"📰", title:"Media, News, and Democracy" },
      { icon:"🔍", title:"Spotting Fake News Before It Spots You" },
      { icon:"✊", title:"How Ordinary Citizens Create Real Change" },
      { icon:"🗳️", title:"Your First Vote, Explained Early" },
    ],
    headerGrad: "from-[#FFF1F2] to-[#FFE4E6]",
    numColor:   "text-brand-coral",
    titleColor: "text-brand-coral",
  },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="bg-state-active-bg/40 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                          bg-age-badge-bg border border-age-badge-border mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-age-badge-text">
              ✦ Curriculum
            </span>
          </div>
          <h2 className="font-display font-black text-[clamp(28px,4vw,48px)] leading-tight
                         tracking-tight text-brand-navy mb-3 max-w-2xl mx-auto">
            Three levels. One destination: a citizen who actually gets it.
          </h2>
          <p className="text-ink-soft text-base leading-relaxed max-w-xl mx-auto">
            Each level builds on the last — from “what even is government” to “here’s how I
            make my voice count.”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((lvl) => (
            <div key={lvl.num}
              className="bg-ui-card rounded-3xl overflow-hidden border border-ui-border
                         hover:-translate-y-2 hover:shadow-card-lg transition-all duration-300">
              <div className={`bg-gradient-to-br ${lvl.headerGrad} px-7 py-6`}>
                <p className={`font-display font-extrabold text-xs uppercase
                               tracking-widest ${lvl.numColor} mb-2`}>
                  {lvl.num}
                </p>
                <h3 className={`font-display font-bold text-2xl leading-tight
                                ${lvl.titleColor} mb-2`}>
                  {lvl.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">{lvl.desc}</p>
              </div>
              <div className="px-7 py-5 flex flex-col gap-2.5">
                {lvl.lessons.map((lesson) => (
                  <div key={lesson.title}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                               bg-pale border border-ui-border">
                    <span className="text-base shrink-0">{lesson.icon}</span>
                    <span className="text-sm font-medium text-ink-soft">{lesson.title}</span>
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
