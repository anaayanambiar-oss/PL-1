import { SignUp } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col">
      {/* Ambient blobs */}
      <div
        className="fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(2,82,201,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,130,0,0.07) 0%, transparent 70%)" }}
      />

      {/* Top bar */}
      <header className="relative z-10 px-6 py-5">
        <a href="/">
          <Logo />
        </a>
      </header>

      {/* Centred sign-up card */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-16">
        {/* Heading above the Clerk widget */}
        <div className="flex flex-col items-center text-center mb-8 gap-2">
          <span className="text-3xl">🎓</span>
          <h1 className="font-display text-2xl font-black text-brand-navy">
            Start learning today
          </h1>
          <p className="text-sm text-ink-soft">
            Free for every child. No credit card. No catch.
          </p>
          {/* Trust badges */}
          <div className="flex items-center gap-3 mt-1">
            {["🔒 Safe & ad-free", "🇮🇳 Made for India", "✅ 100% Free"].map((badge) => (
              <span
                key={badge}
                className="text-[10px] font-semibold bg-[#E8F0FC] text-[#0252C9] px-2.5 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Clerk SignUp widget — appearance customised to brand */}
        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#FF8200",
              colorText: "#0F1023",
              colorTextSecondary: "#4B5063",
              colorBackground: "#FFFFFF",
              colorInputBackground: "#FFFDF7",
              colorInputText: "#0F1023",
              borderRadius: "14px",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "14px",
            },
            elements: {
              card: "shadow-[0_4px_40px_rgba(15,16,35,0.10)] border border-black/[0.06] rounded-3xl",
              headerTitle: "font-black text-[#0F1023]",
              headerSubtitle: "text-ink-soft",
              socialButtonsBlockButton:
                "border border-black/[0.08] rounded-xl hover:border-[#FF8200]/30 hover:bg-[#FFF0E0] transition-colors",
              formButtonPrimary:
                "bg-[#FF8200] hover:bg-[#e07200] rounded-xl font-semibold transition-colors",
              footerActionLink: "text-[#0252C9] hover:text-[#0343a3] font-semibold",
              formFieldInput:
                "border border-black/[0.08] rounded-xl focus:border-[#FF8200] focus:ring-1 focus:ring-[#FF8200]",
              dividerLine: "bg-black/[0.06]",
              dividerText: "text-ink-soft text-xs",
            },
          }}
        />
      </main>

      {/* Bottom footer note */}
      <footer className="relative z-10 py-4 text-center">
        <p className="text-xs text-ink-soft/50">
          © 2025 PoliticaLearn · Safe &amp; free for every child
        </p>
      </footer>
    </div>
  );
}


