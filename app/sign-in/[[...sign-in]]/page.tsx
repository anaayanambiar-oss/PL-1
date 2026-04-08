import { SignIn } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col">
      {/* Ambient blobs */}
      <div
        className="fixed -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,130,0,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(2,82,201,0.07) 0%, transparent 70%)" }}
      />

      {/* Top bar */}
      <header className="relative z-10 px-6 py-5">
        <a href="/">
          <Logo />
        </a>
      </header>

      {/* Centred sign-in card */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-16">
        {/* Heading above the Clerk widget */}
        <div className="flex flex-col items-center text-center mb-8 gap-2">
          <span className="text-3xl">👋</span>
          <h1
            className="text-2xl font-black text-[#0F1023]"
            style={{ fontFamily: "var(--font-baloo2)" }}
          >
            Welcome back
          </h1>
          <p className="text-sm text-[#4B5063]">
            Sign in to continue your civic learning journey.
          </p>
        </div>

        {/* Clerk SignIn widget — appearance customised to brand */}
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#0252C9",
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
              headerSubtitle: "text-[#4B5063]",
              socialButtonsBlockButton:
                "border border-black/[0.08] rounded-xl hover:border-[#0252C9]/30 hover:bg-[#E8F0FC] transition-colors",
              formButtonPrimary:
                "bg-[#0252C9] hover:bg-[#0343a3] rounded-xl font-semibold transition-colors",
              footerActionLink: "text-[#0252C9] hover:text-[#0343a3] font-semibold",
              formFieldInput:
                "border border-black/[0.08] rounded-xl focus:border-[#0252C9] focus:ring-1 focus:ring-[#0252C9]",
              dividerLine: "bg-black/[0.06]",
              dividerText: "text-[#4B5063] text-xs",
            },
          }}
        />
      </main>

      {/* Bottom footer note */}
      <footer className="relative z-10 py-4 text-center">
        <p className="text-xs text-[#4B5063]/50">
          © 2025 PoliticaLearn · Safe &amp; free for every child
        </p>
      </footer>
    </div>
  );
}
