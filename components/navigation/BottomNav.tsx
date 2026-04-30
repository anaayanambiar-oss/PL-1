"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";


const NAV_ITEMS = [
 { href: "/dashboard", icon: "🏠", label: "Home"    },
 { href: "/lessons",   icon: "📚", label: "Lessons" },
 { href: "/society",   icon: "🌆", label: "Society" },
 { href: "/badges",    icon: "🏅", label: "Badges"  },
];


const HIDDEN_ON = ["/", "/sign-in", "/sign-up", "/onboarding"];


export default function BottomNav() {
 const pathname = usePathname();


 const shouldHide = HIDDEN_ON.some(
   (r) => pathname === r || pathname.startsWith(r + "/")
 );
 if (shouldHide) return null;


 return (
   // Only visible on mobile (md and above → hidden)
   <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden
                   bg-white border-t border-black/[0.08]
                   safe-area-pb">  {/* respects iPhone home bar */}
     <div className="flex items-center justify-around h-16 px-2">
       {NAV_ITEMS.map((item) => {
         const isActive = pathname === item.href ||
           (item.href !== "/dashboard" && pathname.startsWith(item.href));


         return (
           <Link
             key={item.href}
             href={item.href}
             className="flex flex-col items-center justify-center gap-0.5
                        flex-1 h-full min-w-0 relative"
           >
             {/* Active indicator dot */}
             {isActive && (
               <span className="absolute top-2 w-1 h-1 rounded-full bg-brand-orange" />
             )}


             {/* Icon */}
             <span className={`text-2xl transition-transform duration-150
                               ${isActive ? "scale-110" : "scale-100"}`}>
               {item.icon}
             </span>


             {/* Label */}
             <span className={`text-[10px] font-bold tracking-wide transition-colors
                               ${isActive ? "text-brand-orange" : "text-soft"}`}>
               {item.label}
             </span>
           </Link>
         );
       })}
     </div>
   </nav>
 );
}



