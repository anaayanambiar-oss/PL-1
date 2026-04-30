"use client";


import Link from "next/link";
import type { Level } from "@/lib/types";
import DashboardNav from "@/components/dashboard/DashboardNav";


interface Props {
 curriculum:       Level[];
 lessonsCompleted: string[];
 currentLevel:     number;
 totalLessons:     number;
}


const LEVEL_COLORS = [
 { header: "from-brand-blue to-indigo-700",   tag: "text-brand-blue bg-brand-blue/10",    accent: "border-brand-blue"   },
 { header: "from-brand-orange to-amber-600",  tag: "text-brand-orange bg-brand-orange/10", accent: "border-brand-orange" },
 { header: "from-rose-600 to-pink-700",       tag: "text-rose-600 bg-rose-50",             accent: "border-rose-400"     },
];


export default function LessonsIndexShell({
 curriculum,
 lessonsCompleted,
 currentLevel,
 totalLessons,
}: Props) {
 const totalCompleted = lessonsCompleted.length;
 const overallPct = Math.round((totalCompleted / totalLessons) * 100);


 return (
   <div className="min-h-screen bg-cream pb-24 md:pb-0">
     <DashboardNav name="" />


     <main className="max-w-4xl mx-auto px-5 py-8">


       {/* Page header */}
       <div className="mb-8">
         <h1 className="font-display font-black text-3xl text-ink mb-1">
           All Lessons
         </h1>
         <p className="text-ink-soft text-sm">
           {totalCompleted} of {totalLessons} lessons completed
         </p>


         {/* Overall progress bar */}
         <div className="mt-3 h-2.5 bg-black/[0.06] rounded-full overflow-hidden">
           <div
             className="h-full bg-gradient-to-r from-brand-blue to-brand-orange
                        rounded-full transition-all duration-700"
             style={{ width: `${overallPct}%` }}
           />
         </div>
       </div>


       {/* Level cards */}
       <div className="flex flex-col gap-6">
         {curriculum.map((level, li) => {
           const colors = LEVEL_COLORS[li] ?? LEVEL_COLORS[0];
           const levelCompleted = level.lessons.filter((l) =>
             lessonsCompleted.includes(l.id)
           ).length;
           const levelPct = Math.round(
             (levelCompleted / level.lessons.length) * 100
           );
           const isCurrentLevel  = level.number === currentLevel;
           const isLockedLevel   = level.number > currentLevel;
           const isCompleteLevel = levelCompleted === level.lessons.length;


           return (
             <div
               key={level.id}
               className={`bg-white rounded-3xl border border-black/[0.07]
                           shadow-card overflow-hidden
                           ${isLockedLevel ? "opacity-60" : ""}`}
             >
               {/* Level header */}
               <div className={`bg-gradient-to-r ${colors.header} px-6 py-5`}>
                 <div className="flex items-start justify-between gap-4">
                   <div>
                     <div className="flex items-center gap-2 mb-1.5">
                       <span className={`text-xs font-bold uppercase tracking-wider
                                         px-2.5 py-1 rounded-full bg-white/20 text-white`}>
                         Level {level.number}
                       </span>
                       {isCurrentLevel && (
                         <span className="text-xs font-bold uppercase tracking-wider
                                          px-2.5 py-1 rounded-full bg-white/30 text-white">
                           Current
                         </span>
                       )}
                       {isCompleteLevel && (
                         <span className="text-xs font-bold uppercase tracking-wider
                                          px-2.5 py-1 rounded-full bg-white/30 text-white">
                           ✓ Complete
                         </span>
                       )}
                       {isLockedLevel && (
                         <span className="text-xs font-bold uppercase tracking-wider
                                          px-2.5 py-1 rounded-full bg-white/20 text-white">
                           🔒 Locked
                         </span>
                       )}
                     </div>
                     <h2 className="font-display font-bold text-xl text-white leading-tight">
                       {level.title}
                     </h2>
                     <p className="text-white/70 text-sm mt-1 leading-relaxed max-w-md">
                       {level.description}
                     </p>
                   </div>
                   {/* Level progress ring (simple text) */}
                   <div className="flex-shrink-0 text-center bg-white/15 rounded-2xl
                                   px-4 py-3 hidden sm:block">
                     <p className="font-display font-black text-2xl text-white leading-none">
                       {levelPct}%
                     </p>
                     <p className="text-white/70 text-xs mt-0.5">
                       {levelCompleted}/{level.lessons.length}
                     </p>
                   </div>
                 </div>


                 {/* Level progress bar */}
                 <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                   <div
                     className="h-full bg-white/80 rounded-full transition-all duration-700"
                     style={{ width: `${levelPct}%` }}
                   />
                 </div>
               </div>


               {/* Lessons list */}
               <div className="px-5 py-4 flex flex-col gap-2.5">
                 {level.lessons.map((lesson, i) => {
                   const isDone   = lessonsCompleted.includes(lesson.id);
                   const prevDone = i === 0 ||
                     lessonsCompleted.includes(level.lessons[i - 1].id);
                   const isNext   = !isDone && prevDone && !isLockedLevel;
                   const isLocked = isLockedLevel || (!isDone && !prevDone);


                   return (
                     <div
                       key={lesson.id}
                       className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl
                                   border-2 transition-all duration-150
                                   ${isDone
                                     ? "bg-green-50 border-green-200"
                                     : isNext
                                     ? `bg-white ${colors.accent} shadow-sm`
                                     : "bg-pale border-transparent"
                                   }`}
                     >
                       {/* Status icon */}
                       <div className={`w-10 h-10 rounded-xl flex items-center
                                        justify-center text-xl flex-shrink-0
                                        ${isDone   ? "bg-green-100" :
                                          isNext   ? "bg-brand-orange/10" :
                                                     "bg-black/5"}`}>
                         {isDone ? "✅" : isNext ? "▶️" : "🔒"}
                       </div>


                       {/* Info */}
                       <div className="flex-1 min-w-0">
                         <p className={`font-semibold text-sm leading-snug
                                        ${isDone   ? "text-green-800" :
                                          isNext   ? "text-ink"      :
                                                     "text-mid"}`}>
                           {lesson.title}
                         </p>
                         <p className="text-xs text-mid mt-0.5">
                           +{lesson.xpReward} XP
                           {lesson.badgeId ? " · Badge" : ""}
                           {" · ~5 min"}
                         </p>
                       </div>


                       {/* CTA */}
                       {isDone && (
                         <Link
                           href={`/lessons/${lesson.id}`}
                           className="text-xs font-bold text-green-700 bg-green-100
                                      px-3 py-1.5 rounded-full hover:bg-green-200
                                      transition-colors flex-shrink-0"
                         >
                           Redo
                         </Link>
                       )}
                       {isNext && (
                         <Link
                           href={`/lessons/${lesson.id}`}
                           className="text-xs font-bold text-white bg-brand-orange
                                      px-4 py-2 rounded-full shadow-orange flex-shrink-0
                                      hover:-translate-y-0.5 transition-all"
                         >
                           Start →
                         </Link>
                       )}
                       {isLocked && (
                         <span className="text-xs text-soft font-medium flex-shrink-0">
                           Locked
                         </span>
                       )}
                     </div>
                   );
                 })}
               </div>
             </div>
           );
         })}
       </div>
     </main>
   </div>
 );
}





