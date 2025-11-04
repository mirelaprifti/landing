# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **Effect** - a TypeScript library for building production-grade software. Built with Astro (static site generation), React components, and deployed to Vercel.

**Key technologies:**
- Astro v5 (static output)
- React 19 (for interactive components)
- Tailwind CSS v4 (utility-first styling)
- motion (framer-motion successor for animations)
- Biome (formatting/linting)
- Bun (package manager - always prefer over pnpm/npm)
- TypeScript 5.9

## Common Commands

**Development:**
```bash
bun run dev          # Start dev server (usually port 4321)
bun run build        # Build for production
bun run preview      # Preview production build
bun run check        # Type checking (Astro + TSC)
```

**Code Quality:**
```bash
bun run format       # Format with Biome
bunx knip            # Find unused code/dependencies
```

**Environment:**
```bash
bun run pull-env     # Pull Vercel environment variables
```

## Architecture

### Astro + React Hybrid

This is an **Astro-first** site with React islands for interactivity:
- `.astro` files in `src/pages/` and `src/layouts/` handle routing and layouts
- React components in `src/components/` provide interactive features
- Main entry: `src/pages/index.astro` → `src/components/landing/LandingPage.tsx`

**React integration** (astro.config.mjs):
- React components in `src/components/`, `src/react/`, and `src/examples/` are hydrated
- Use `client:only="react"` for fully client-side components
- Use `client:load` or `client:visible` for selective hydration

### Directory Structure

```
src/
├── pages/              # Astro routes (index.astro)
├── layouts/            # Astro layouts (BaseLayout.astro)
├── components/
│   ├── landing/       # Landing page sections (Hero, Features, CTA, etc.)
│   ├── effect/        # Effect visualization components (animated diagrams)
│   ├── ui/            # Reusable UI components
│   ├── display/       # Display utilities
│   ├── feedback/      # Feedback components
│   └── renderers/     # Custom renderers
├── examples/          # ~25 Effect code examples (TypeScript demos)
├── constants/         # Colors, dimensions
└── animations.ts      # Animation utilities

public/
├── assets/           # Static images, SVGs
├── website/          # Landing page HTML prototypes (reference only)
└── design-guidelines/ # Design specs (reference)
```

### Component Patterns

**Landing Page Sections:**
All sections follow a consistent pattern in `src/components/landing/`:
- `LandingPage.tsx` - Main orchestrator that imports all sections
- `HeroSection.tsx` - Hero with CTA
- `FeaturesSection.tsx` - Features grid with ComplexityChart
- `ComplexityChart.tsx` - Animated SVG chart showing complexity comparison
- `VisualEffectShowcaseSection.tsx` - Interactive Effect examples
- `TestimonialsSection.tsx`, `CompaniesSection.tsx`, etc.

Each section is self-contained with its own styles and logic.

**Effect Visualization Components** (`src/components/effect/`):
- Complex animated components showing Effect execution flows
- Use `motion` for animations (not framer-motion)
- Follow task/node/overlay pattern for visual representation

### Styling

**Tailwind CSS v4:**
- Uses `@tailwindcss/vite` plugin (NOT PostCSS approach)
- Config in `astro.config.mjs` → `vite.plugins`
- Dark mode: zinc-950 background, zinc color palette
- Custom fonts: Inter (body), Roboto Mono (code)

**Color scheme:**
- Background: `bg-zinc-950` (nearly black)
- Text: `text-white`, `text-zinc-200`, `text-zinc-400`
- Accents: green (`#22c55e`) for "With Effect", red (`#ef4444`) for "Without Effect"
- Borders: `border-zinc-700`, `border-zinc-800`

### Motion Animations

**IMPORTANT:** Use `motion` (v12+), NOT `framer-motion`:
```tsx
import { motion } from "motion/react";
```

**For smooth SVG animations:**
- Use consistent path structures (same # of segments) for morphing
- Add `shapeRendering="geometricPrecision"` for crisp lines
- Use `strokeLinecap="round"` and `strokeLinejoin="round"` for smooth curves
- GPU acceleration: `transform: translateZ(0)` and `backfaceVisibility: hidden`

### Path Aliases

`@/` maps to `src/`:
```tsx
import { HeroSection } from "@/components/landing/HeroSection";
```

Configured in both `tsconfig.json` and `astro.config.mjs`.

## Important Configuration

### SSR External Packages

In `astro.config.mjs`, the following packages must be marked as `noExternal` for SSR:
```js
ssr: {
  noExternal: ["effect", "motion"]
}
```

This ensures they're bundled for server-side rendering.

### Vercel Deployment

- Static site generation (`output: "static"`)
- Uses `@astrojs/vercel` adapter
- Image optimization configured for external sources (Twitter, GitHub, Discord avatars)
- Redirect: `/events` → Effect Days page

## Development Notes

**Examples folder:**
The `src/examples/` directory contains ~25 Effect TypeScript examples used for educational/showcase purposes. These are typically imported into showcase sections.

**Public website folder:**
`public/website/landing-page.html` is a static HTML prototype/reference - NOT the live site. The actual site is rendered via Astro/React.

**Package manager:**
Always use **bun** (not pnpm/npm), even though package.json specifies pnpm as packageManager.

## Common Tasks

**Adding a new landing section:**
1. Create `src/components/landing/NewSection.tsx`
2. Import and add to `LandingPage.tsx`
3. Follow existing section patterns (responsive grid, zinc colors)

**Working with animations:**
1. Use `motion` library (import from `motion/react`)
2. For SVG animations, ensure path structures are consistent
3. Reference `ComplexityChart.tsx` for advanced SVG morphing patterns

**Type checking:**
Run `bun run check` before commits - checks both Astro and TypeScript files.
