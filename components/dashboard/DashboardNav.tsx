import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

interface Props { name: string; }

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Lessons",   href: "/lessons"   },
  { label: "Society",   href: "/society"   },
  { label: "Badges",    href: "/badges"    },
];

export default function DashboardNav({ name }: Props) {
  return (
    <header className="bg-white border-b border-black/[0.06] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange
                          flex items-center justify-center">
            <span className="font-display font-extrabold text-white text-base leading-none">P</span>
          </div>
          <span className="font-display font-extrabold text-base text-ink">
            Politica<span className="text-brand-blue">Learn</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft hover:text-brand-blue transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-mid hidden sm:block">Hi, {name}</span>
          <UserButton />
        </div>

      </div>
    </header>
  );
}
