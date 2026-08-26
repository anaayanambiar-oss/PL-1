"use client";
import Link from "next/link";
import { useState } from "react";
import StartButton from "@/components/ui/StartButton";

const navLinks = [
  { label: "How it works",  href: "#how" },
  { label: "Curriculum",    href: "#curriculum" },
  { label: "Features",      href: "#features" },
  { label: "Who it's for",  href: "#who" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/90
                       backdrop-blur-md border-b border-brand-navy/[0.07]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-coral
                          flex items-center justify-center">
            <span className="font-display font-extrabold text-white text-lg leading-none">P</span>
          </div>
          <span className="font-display font-extrabold text-lg text-brand-navy">
            Politica<span className="text-brand-blue">Learn</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
               className="text-sm font-medium text-ink-soft
                          hover:text-brand-blue transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <StartButton
            signedInLabel="My Dashboard →"
            className="px-5 py-2.5 rounded-full bg-brand-coral text-white text-sm
                       font-bold shadow-coral hover:-translate-y-0.5 hover:shadow-lg
                       transition-all duration-200">
            Start for Free →
          </StartButton>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg hover:bg-pale transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu">
          <div className="w-5 h-0.5 bg-brand-navy mb-1" />
          <div className="w-5 h-0.5 bg-brand-navy mb-1" />
          <div className="w-5 h-0.5 bg-brand-navy" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu"
             className="md:hidden bg-brand-cream border-t border-brand-navy/[0.07] px-6 pb-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
               className="block py-3 text-sm font-medium text-ink-soft
                          border-b border-brand-navy/[0.05]"
               onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <StartButton
            signedInLabel="My Dashboard →"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block text-center px-5 py-3 rounded-full
                       bg-brand-coral text-white text-sm font-bold">
            Start for Free →
          </StartButton>
        </div>
      )}
    </header>
  );
}
