# PoliticaLearn — landing page changes

14 changed files, paths preserved. Copy them over the matching paths in the
project root and the change is applied — there's no build step or config to
run. Everything here typechecks (`tsc --noEmit`) and `next build` passes.

Built against Next.js 16.2.2, Tailwind v4.2.2, React 19.2.4.

---

## Apply `app/globals.css` first

This is the one that matters differently from the rest.

Tailwind v4 no longer auto-discovers `tailwind.config.ts`, and the file still
used the v3 `@tailwind base/components/utilities` directives. Core utilities
compiled — which is why the page looked alive rather than obviously broken —
but **every project theme class silently resolved to nothing**:
`bg-brand-coral`, `shadow-coral`, `animate-fade-up`, `font-display`,
`text-ink-soft`, all of it.

The generated stylesheet went from 36 KB to 99 KB once the config loaded.

Take any other file in this pack without this one and the brand classes inside
it are still dead. `tailwind.config.ts` itself is unchanged.

---

## What changed, file by file

### Build configuration

**`app/globals.css`** — `@import "tailwindcss"` plus an explicit `@config`
pointing at `tailwind.config.ts`. Added `scroll-padding-top` so anchor targets
clear the fixed navbar, and a `prefers-reduced-motion` block (the infinite
bounce animations only started running once the config loaded).

### Landing page sections

**`app/page.tsx`** — Page background moved off the stale `#FFFDF7` onto the
`brand-cream` token that every section below already used. The two values
differed enough to show a seam.

**`components/layout/Navbar.tsx`** — The "About" item pointed at `#about`, an id
that exists nowhere on the page; now "Who it's for" → `#who`. Added
`aria-expanded` / `aria-controls` to the hamburger, and the mobile CTA closes
the menu when tapped.

**`components/layout/StatBanner.tsx`** — New stat copy. The number styling
called `var(--font-baloo2)`, a variable nothing defines — `layout.tsx`
registers the face as `--font-display`. Fill and figures moved onto
`brand-navy` / `brand-coral`.

**`components/layout/HowItWorks.tsx`** — New headline and four rewritten steps,
labelled `STEP 01`–`STEP 04`. The intro paragraph is unchanged and still
name-checks Duolingo — see "Still open" below.

**`components/layout/Features.tsx`** — New headline, intro, and all four feature
cards rewritten.

**`components/layout/Curriculum.tsx`** — New headline, intro, three level titles
and descriptions, twelve lesson names. Added `shrink-0` to the lesson icons so
longer titles don't squash them.

**`components/layout/AudienceSection.tsx`** — New headline and copy. Cards carry
full brand fills, emoji removed.

  Text colour is contrast-derived per card and should NOT be unified. Measured
  against WCAG AA (4.5:1 for 14px body text):

  | fill                    | white  | navy   |
  |-------------------------|--------|--------|
  | `brand-blue`  `#2A6FDB` | 4.78 ✅ | 3.74 ❌ |
  | `brand-yellow` `#FFB400`| 1.78 ❌ | 10.01 ✅|
  | `brand-coral` `#FF5A5F` | 3.05 ❌ | 5.85 ✅ |

  No single text colour works on all three. White on yellow is 1.78:1 —
  effectively invisible. There's a comment on the array saying so.

**`components/layout/CtaSection.tsx`** — Added `id="signup"`. The navbar and hero
"Start for Free" buttons both pointed here and hit nothing. "Explore the
Curriculum" had no handler at all; both are real links now. Dropped
`"use client"` along with the `window.location` onClick.

**`components/layout/Footer.tsx`** — `#how-it-works` → `#how` (the real id).
"Sign Up Free" pointed at `#`, now `/sign-up`. Navy token and the font fix.

### Shared components

**`components/ui/Button.tsx`** — `href` and `asChild` were declared in the props
interface and then ignored, so callers had to push `window.location` from an
onClick. Now renders a real `<Link>` when given `href` — keyboard focusable,
middle-clickable, crawlable. Variants moved onto the COLOUR_GUIDE palette.

**`components/ui/Logo.tsx`** — Gradient mark used the superseded `#0252C9` →
`#FF8200` pair; now `brand-blue` → `brand-coral`. Same font-variable fix.

### Auth pages

**`app/sign-in/[[...sign-in]]/page.tsx`**, **`app/sign-up/[[...sign-up]]/page.tsx`**
— Not landing page, but carrying the identical undefined `--font-baloo2`
variable, plus an off-palette body colour.

---

## Running it

No Clerk keys needed. Clerk 7 has a keyless dev mode: with no
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` set it spins up a temporary instance and the
app boots. A *malformed* key is worse than none — `clerkMiddleware` then
redirects every request to a nonexistent Clerk domain and you get a JSON error
instead of the page. `.env.local` only needs a placeholder `DATABASE_URL`, which
the admin API routes read at build time.

```bash
npm install
npm run dev
# http://localhost:3000
```

---

## Still open

Found during this pass, deliberately not changed — each needs a product decision
rather than a code fix.

1. **Dead duplicate file.** `components/layout/LandingSections.tsx` exports its
   own AudienceSection, CtaSection and Footer, but nothing imports it. It has
   different copy and different section ids (`#about`, `#signup`) — which is
   exactly what made the broken anchors hard to trace. Safe to delete.

2. **Seven footer links 404.** `/about/mission`, `/about/team`, `/schools`,
   `/contact`, `/legal/privacy`, `/legal/terms`, `/legal/child-safety` have no
   routes under `app/`. On a product for children, the Legal group in particular
   needs real pages.

3. **How It Works intro is stale.** Still reads "PoliticaLearn uses the same
   psychology as Duolingo…", which now overlaps the new Features intro and names
   a competitor. Needs a rewrite or a cut.

4. **Routes are unauthenticated.** `proxy.ts` protects `/dashboard(.*)` only.
   `/lessons`, `/society`, `/onboarding` and `/admin` are all reachable
   signed-out.
