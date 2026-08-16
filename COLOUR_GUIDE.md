# PoliticaLearn 2.2 — Colour Guide

## Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-coral` | `#FF5A5F` | Primary CTAs, hero headline accent, streak flame |
| `brand-yellow` | `#FFB400` | Badges, XP bar, stars, gamification elements |
| `brand-blue` | `#2A6FDB` | Secondary accent, links, active states, borders |
| `brand-navy` | `#0F172A` | Headlines (H1/H2), primary text, navbar bg |
| `brand-cream` | `#F8FAFC` | Page background, section fills |

## Legacy Aliases (backwards compatible)

| Old token | Now points to |
|-----------|---------------|
| `brand-orange` | `#FF5A5F` (coral) |
| `brand-orange-l` | `#FFFBEB` (yellow tint) |
| `brand-blue-l` | `#EFF6FF` (blue tint) |

Existing classes like `bg-brand-orange`, `text-brand-blue-l` still work.

## Text Hierarchy

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#0F172A` | H1, H2, question text |
| `ink-soft` | `#475569` | Body text, explanations |
| `mid` | `#64748B` | Muted captions, subtext |
| `soft` | `#94A3B8` | Placeholder, disabled text |

## Buttons

| State | Classes |
|-------|---------|
| Primary (Start for Free) | `bg-brand-coral text-white shadow-coral` |
| Secondary (See Curriculum) | `bg-white border-2 border-brand-blue text-brand-blue` |
| Active (Check Answer) | `bg-brand-blue text-white hover:bg-blue-hover` |
| Disabled | `bg-state-disabled-bg text-state-disabled-text` |

## Answer Option States (MCQ)

| State | Classes |
|-------|---------|
| Default | `bg-ui-card border-ui-border text-ink` |
| Selected | `bg-state-active-bg border-state-active-border text-ink` |
| Correct | `bg-state-correct-bg border-state-correct-border text-state-correct-text` |
| Incorrect | `bg-state-wrong-bg border-state-wrong-border text-state-wrong-text` |

## Gamification

| Element | Token/Class |
|---------|-------------|
| XP bar fill | `xp-gradient` utility class (yellow → coral gradient) |
| Streak flame | `text-streak-icon` = coral |
| Level badges / stars | `text-badge-star` = yellow |
| Completed checkmarks | `text-done-check bg-state-correct-bg` |

## Age Badge ("FOR INDIAN KIDS")

```
bg-age-badge-bg border border-age-badge-border text-age-badge-text
```

## Section Tags

- Blue sections: `bg-state-active-bg border border-state-active-border text-brand-blue`
- Yellow sections: `bg-age-badge-bg border border-age-badge-border text-age-badge-text`
- Coral sections: `bg-[#FFF1F2] border border-[#FECDD3] text-brand-coral`

## Shadows

| Token | Usage |
|-------|-------|
| `shadow-coral` | Primary CTA buttons |
| `shadow-blue` | Active/selected elements |
| `shadow-yellow` | Badge elements |
| `shadow-card` | Cards (light) |
| `shadow-card-lg` | Cards on hover (deep) |
