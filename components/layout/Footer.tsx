import Logo from "@/components/ui/Logo";

const footerLinks = {
  Platform: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Features", href: "#features" },
    { label: "Sign Up Free", href: "#" },
  ],
  About: [
    { label: "Our Mission", href: "/about/mission" },
    { label: "The Team", href: "/about/team" },
    { label: "For Schools", href: "/schools" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Use", href: "/legal/terms" },
    { label: "Child Safety", href: "/legal/child-safety" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F1023]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Logo variant="white" />
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              A civic education platform for Indian children aged 7–13. Learn. Lead. Change.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-3">
              <h4
                className="text-xs font-bold text-white uppercase tracking-widest mb-1"
                style={{ fontFamily: "var(--font-baloo2)" }}
              >
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © 2025 PoliticaLearn. Made with ❤️ for India&apos;s next generation.
          </p>
          <p className="text-xs text-white/30">
            Built by Anaaya · Mentored by Ascend Now
          </p>
        </div>
      </div>
    </footer>
  );
}
