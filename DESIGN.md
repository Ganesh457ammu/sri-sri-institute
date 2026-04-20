# Design Brief — Sri Sri Institute

**Purpose**: Premium educational coaching platform for government competitive exams. Establish trust, aspiration, and academic excellence through refined visual design.

**Tone**: Refined, aspirational, trustworthy — sophisticated yet accessible. Human-centered, not clinical.

**Differentiation**: Glassmorphic cards with semi-transparent frosted glass effects, warm gold accents that energize without overwhelming, 3D animated hero setting immediate premium tone, smooth scroll animations creating fluidity and polish.

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary (Deep Blue) | `0.45 0.12 262` | Trust, institutional, headings, primary text |
| Accent (Gold) | `0.68 0.19 82` | CTAs, highlights, energetic moments |
| Background (White) | `0.99 0 0` | Light clean surfaces, main content area |
| Card (Glass) | `0.98 0.01 265` | Semi-transparent overlays, glassmorphic surfaces |
| Secondary (Light Blue) | `0.92 0.02 265` | Subtle backgrounds, secondary sections |
| Muted | `0.92 0.02 265` | Disabled states, tertiary content |

**Dark Mode**: Deep blue backgrounds (0.15 L), white text (0.96 L), bright gold accents (0.72 L) for premium feel.

## Typography

| Layer | Font | Scale | Usage |
|-------|------|-------|-------|
| Display | Space Grotesk (700) | 48–64px | Hero headlines, section titles |
| Body | Plus Jakarta Sans (400, 500, 600) | 16–18px | Paragraphs, UI labels |
| Mono | Geist Mono (400) | 14px | Code blocks, technical details |

## Structural Zones

| Zone | Treatment | Details |
|------|-----------|---------|
| Header/Navbar | `bg-primary` with `text-primary-foreground`, sticky, subtle bottom border | Graduation cap logo, nav links, "Enquire Now" CTA in gold |
| Hero | 3D animated background (Three.js), `bg-background`, large heading + dual CTAs | Primary CTA (blue), Secondary CTA (gold outline) |
| Content Sections | Alternating `bg-background` and `bg-muted/30` with 12px rounded corners | Glassmorphic cards within sections, smooth transitions |
| Cards | `.glass` utility: `bg-card/80 backdrop-blur-md border border-white/20` | Warm shadow, smooth hover elevation |
| Footer | `bg-primary` matching header, `text-primary-foreground` | Mirror navbar structure, contact info, social icons |

## Component Patterns

- **Buttons**: `btn-primary` (blue, white text) and `btn-accent` (gold, dark text) with `transition-smooth` hover states
- **Cards**: Glassmorphic with `.glass` + `.glass-hover` utilities, subtle elevation on hover
- **Inputs**: `bg-input` with `border-border`, focus ring with gold accent
- **Stats Bars**: Centered layout, primary color text, secondary background sections
- **Testimonials**: Cards with student photo placeholder, quote, name, rank/achievement

## Motion & Animation

| Animation | Timing | Purpose |
|-----------|--------|---------|
| fade-in | 0.4s ease-out | Section entrance on scroll |
| slide-up | 0.5s ease-out | Card/content entrance from below |
| float | 3s ease-in-out infinite | Subtle hover state on cards, 3D hero elements |
| pulse-glow | 2s ease-in-out infinite | Gold accents, CTA button subtle pulse |
| smooth-scroll | 0.3s cubic-bezier | All interactive transitions, page scrolls |

## Spacing & Rhythm

- Grid: 24px base unit, mobile-first responsive (`sm:`, `md:`, `lg:` breakpoints)
- Section padding: 48–64px vertical, 24–32px horizontal (mobile: 24–32px)
- Card gap: 16–24px
- Text line-height: 1.6 (body), 1.2 (headings)

## Constraints

- No gradients on text unless using `.text-glow` (accent-only)
- No neon or harsh glows; shadow depths match `.glass` and `.elevated`
- Gold accent used sparingly: CTAs, highlights, hover states only
- Dark mode never uses inverted lightness alone; tune all surfaces individually for premium feel
- Mobile-first approach; test at 375px, 768px, 1400px breakpoints

## Signature Detail

Glassmorphic cards with semi-transparent frosted glass effect (`bg-card/80 backdrop-blur-md`) combined with warm gold CTAs create a premium, modern aesthetic while maintaining accessibility and trust through deep blue primary color.
