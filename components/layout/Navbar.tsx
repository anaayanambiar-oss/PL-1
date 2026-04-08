"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

const navLinks = [
  {
    label: "About",
    dropdown: [
      { label: "Our Mission", href: "/about/mission" },
      { label: "The Team", href: "/about/team" },
    ],
  },
  {
    label: "Explore",
    dropdown: [
      { label: "Politics Course", href: "/explore/politics" },
    ],
  },
  {
    label: "Feed",
    href: "/feed",
    dropdown: [],
    comingSoon: true,
  },
];

function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl shadow-[0_8px_32px_rgba(15,16,35,0.14)] border border-black/[0.06] py-1.5 z-50">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block px-4 py-2.5 text-sm font-medium text-[#0F1023] hover:text-[#0252C9] hover:bg-[#E8F0FC] transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#FFFDF7]/90 backdrop-blur-md shadow-[0_2px_12px_rgba(15,16,35,0.08)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Logo />
          </a>

          {/* Desktop nav links — centred */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown.length > 0 && handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={link.href ?? "#"}
                  className={[
                    "flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                    "text-[#4B5063] hover:text-[#0F1023] hover:bg-black/5",
                  ].join(" ")}
                >
                  {link.label}
                  {link.comingSoon && (
                    <span className="ml-1 text-[10px] font-semibold bg-[#FF8200]/10 text-[#FF8200] px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                  {link.dropdown.length > 0 && (
                    <svg
                      className="w-3.5 h-3.5 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
                {link.dropdown.length > 0 && activeDropdown === link.label && (
                  <DropdownMenu items={link.dropdown} />
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!isSignedIn ? (
              <>
                <a
                  href="/sign-in"
                  className="text-sm font-semibold text-[#4B5063] hover:text-[#0F1023] transition-colors px-2"
                >
                  Sign in
                </a>
                <Button variant="primary" size="sm" onClick={() => { window.location.href = "/sign-up"; }}>
                  Start for Free →
                </Button>
              </>
            ) : (
              <>
                <a
                  href="/dashboard"
                  className="text-sm font-semibold text-[#4B5063] hover:text-[#0F1023] transition-colors px-2"
                >
                  Dashboard
                </a>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-[#0F1023] hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-black/[0.06]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href ?? "#"}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-[#4B5063] hover:text-[#0F1023] hover:bg-black/5 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    {link.comingSoon && (
                      <span className="text-[10px] font-semibold bg-[#FF8200]/10 text-[#FF8200] px-1.5 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                  </a>
                  {link.dropdown.length > 0 && (
                    <div className="ml-4 flex flex-col gap-0.5">
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="px-3 py-2 text-sm text-[#4B5063] hover:text-[#0252C9] rounded-lg hover:bg-[#E8F0FC] transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 px-3 flex flex-col gap-2">
                {!isSignedIn ? (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => { window.location.href = "/sign-up"; }}
                    >
                      Start for Free →
                    </Button>
                    <a
                      href="/sign-in"
                      className="block text-center text-sm font-semibold text-[#4B5063] hover:text-[#0252C9] py-2 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Already have an account? Sign in
                    </a>
                  </>
                ) : (
                  <a
                    href="/dashboard"
                    className="block text-center bg-[#E8F0FC] text-[#0252C9] font-semibold text-sm px-4 py-3 rounded-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Go to Dashboard
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
