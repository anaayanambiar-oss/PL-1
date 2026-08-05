// components/admin/AdminSidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin",          icon: "📊", label: "Overview"  },
  { href: "/admin/lessons",  icon: "📚", label: "Lessons"   },
  { href: "/admin/students", icon: "👥", label: "Students"  },
  { href: "/admin/settings", icon: "⚙️", label: "Settings"  },
  { href: "/dashboard",      icon: "←",  label: "Back to App" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-gray-950 border-r border-white/[0.06]
                      flex flex-col flex-shrink-0">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-0.5">
          PoliticaLearn
        </p>
        <p className="text-white font-bold text-sm">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {NAV.map((item) => {
          const isActive = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href) && item.href !== "/dashboard";
          const isBack = item.href === "/dashboard";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                          font-medium transition-all
                          ${isBack
                            ? "text-gray-600 hover:text-gray-400 mt-auto"
                            : isActive
                            ? "bg-blue-600/20 text-blue-400"
                            : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                          }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <p className="text-xs text-gray-600">Internal use only</p>
      </div>
    </aside>
  );
}
