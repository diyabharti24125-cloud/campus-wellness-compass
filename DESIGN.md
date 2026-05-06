# Campus Wellness Compass — Design Brief

**Purpose**: Medical wellness companion for campus students. Trustworthy, calm, accessible first-aid guidance, health tracking, local resources.

**Tone**: Professional & Reassuring. Clean hospital wayfinding aesthetic, modern clinic confidence, educational health credibility.

**Color Palette**:
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | 0.52 0.10 220 | Medical teal — calming, trustworthy |
| Secondary | 0.38 0.08 220 | Dark teal — headers, footer, depth |
| Accent | 0.60 0.15 25 | Coral-orange — CTAs, highlights (sparing) |
| Destructive | 0.55 0.22 25 | Emergency red — SOS buttons, urgency |
| Success | 0.68 0.13 140 | Healing green — wellness achievements |
| Neutral | 0.98 / 0.92 / 0.52 | White, muted gray, mid-gray text |

**Typography**:
| Use | Font | Weight | Size |
|-----|------|--------|------|
| Display/Headers | DM Sans | 600–700 | 32–48px |
| Body/UI | General Sans | 400–500 | 14–16px |
| Numbers/Code | Geist Mono | 500 | 14–24px |

**Elevation & Depth**:
- **Header/Nav**: Teal secondary bg, white text, sticky, subtle shadow
- **Hero**: White card on muted background, teal accent left edge
- **Content Cards**: White bg, subtle 2px border, scale-hover, shadow-card
- **Footer**: Dark teal secondary, white text, border-t

**Structural Zones**:
1. **Navigation**: sticky top, 56px height, secondary teal, white text, hamburger menu ≤768px
2. **Hero Section**: large title + subtitle + CTA button (primary teal, rounded 12px)
3. **Symptom Guide**: 2×2 grid (≤640px: 1 col), 4 condition cards, clickable modals
4. **Health Calculator**: form input + bold result display, success green highlight
5. **Wellness Quiz**: Yes/No buttons, result card with emoji + messaging
6. **Emergency SOS**: 3 contact cards with destructive-red Call buttons, map placeholder
7. **Footer**: dark teal, centered text, credits + disclaimer, border-t

**Spacing & Rhythm**: 16px base grid. Cards: 20px padding. Sections: 60px vertical gap. Mobile: 16px gutters, 40px section gaps.

**Component Patterns**:
- **Buttons**: 12px radius, 16px padding (h), transition-smooth on all hover/active states
- **Cards**: 8px radius, 2px border-border, shadow-card, card-hover utility
- **Modals**: fade-in animation, semi-transparent overlay, card centered with padding
- **Forms**: rounded input fields, success validation green, error red

**Motion**:
- **Entrance**: fade-in 0.3s, slide-down 0.3s (modals, cards)
- **Interaction**: scale-[1.02] on hover (cards), transition-smooth all states
- **Transitions**: cubic-bezier(0.4, 0, 0.2, 1) — smooth, professional, not playful

**Constraints**:
- Mobile-first responsive ≥320px (xs), lg breakpoint 1024px
- Light mode primary. Dark mode supportive (not required for MVP but prepared).
- OKLCH only — no hex, no rgb(), no hsl()
- Medical credibility > decoration; shadows subtle, animations restrained

**Signature Detail**: Teal 2px accent left-edge on hero card and modal headers. Subtle, distinctive, ties color system together visually.

**Differentiation**: Medical apps often oversaturate or look clinical. This design uses color restraint (teal + white + one accent), intentional layering (each zone distinct surface treatment), and professional sans-serif (DM Sans = medical authority, General Sans = readable body).

---

**Verified Commands**:
- Frontend: `pnpm install --prefer-offline` | `pnpm typecheck` | `pnpm fix` | `pnpm build`
- Backend: `mops install` | `mops check --fix` | `mops build`
- Integration: `pnpm bindgen` (root directory)
