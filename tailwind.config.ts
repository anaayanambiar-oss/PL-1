import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── PL 2.2 Brand Palette ─────────────────────────────
        // New semantic token names
        "brand-coral":  "#FF5A5F",   // Primary CTA — buttons, accents
        "brand-yellow": "#FFB400",   // Gamification — badges, XP, stars
        "brand-blue":   "#2A6FDB",   // Secondary accent — links, active states
        "brand-navy":   "#0F172A",   // Deep navy — headlines, primary text
        "brand-cream":  "#F8FAFC",   // Page background

        // ── Legacy aliases (kept for backwards compatibility) ─
        // Old token names mapped to new hex values so existing
        // Tailwind classes (text-brand-orange, bg-brand-blue-l etc.)
        // continue to work without touching every component file.
        "brand-orange":   "#FF5A5F",   // was #FF8200 → now coral
        "brand-orange-l": "#FFFBEB",   // light tint for coral (yellow tint)
        "brand-blue-l":   "#EFF6FF",   // light tint for blue

        // ── UI Semantic Tokens ────────────────────────────────
        "ui-bg":          "#F8FAFC",   // Page / section background
        "ui-card":        "#FFFFFF",   // Card background
        "ui-border":      "#E2E8F0",   // Default card/input border
        "ui-border-muted":"#CBD5E1",   // Slightly stronger border

        // ── Text Hierarchy ────────────────────────────────────
        ink:              "#0F172A",   // H1, H2, question text (Deep Navy)
        "ink-soft":       "#475569",   // Body text, explanations (Slate Gray)
        mid:              "#64748B",   // Muted captions, subtext
        soft:             "#94A3B8",   // Placeholder, disabled text

        // ── State Colours ─────────────────────────────────────
        "state-correct-bg":     "#ECFDF5",
        "state-correct-border": "#10B981",
        "state-correct-text":   "#047857",
        "state-wrong-bg":       "#FEF2F2",
        "state-wrong-border":   "#EF4444",
        "state-wrong-text":     "#B91C1C",
        "state-active-bg":      "#EFF6FF",
        "state-active-border":  "#2A6FDB",
        "state-disabled-bg":    "#E2E8F0",
        "state-disabled-text":  "#94A3B8",

        // ── Gamification ──────────────────────────────────────
        "xp-bar-from":  "#FFB400",   // XP bar gradient start (yellow)
        "xp-bar-to":    "#FF5A5F",   // XP bar gradient end (coral)
        "streak-icon":  "#FF5A5F",   // Streak flame
        "badge-star":   "#FFB400",   // Level badges and stars
        "done-check":   "#10B981",   // Completed checkmarks

        // ── Age Badge ────────────────────────────────────────
        "age-badge-bg":     "#FFFBEB",
        "age-badge-border": "#FFB400",
        "age-badge-text":   "#B45309",

        // ── Greys / Neutrals ─────────────────────────────────
        pale:    "#F1F5F9",   // Light grey backgrounds
        lgray:   "#F8FAFC",   // Softest grey (= brand-cream)
        cream:   "#F8FAFC",   // Page background (replaces old #FFFDF7)
        white:   "#FFFFFF",

        // ── Button Hover ─────────────────────────────────────
        "blue-hover": "#1D4ED8",   // Active button hover
      },

      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)",    "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      boxShadow: {
        "card":     "0 2px 16px rgba(15,23,42,0.06)",
        "card-lg":  "0 8px 40px rgba(15,23,42,0.10)",
        "coral":    "0 6px 24px rgba(255,90,95,0.32)",
        "blue":     "0 6px 24px rgba(42,111,219,0.25)",
        "yellow":   "0 6px 24px rgba(255,180,0,0.30)",
        // Legacy alias
        "orange":   "0 6px 24px rgba(255,90,95,0.32)",
      },

      animation: {
        "fade-up":     "fadeUp 0.5s ease both",
        "fade-in":     "fadeIn 0.4s ease both",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "slide-in":    "slideIn 0.4s ease both",
      },

      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        slideIn: {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
