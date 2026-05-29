---
name: Sierra-design
description: Use this skill to generate well-branded interfaces and assets for Sierra Estates PropTech OS. Contains complete design guidelines, color tokens, typography system, spacing scale, component patterns, and interactive UI kits for prototyping or production.
user-invocable: true
---

# Sierra Estates Design System Skill

This design system enables you to create pixel-perfect, on-brand interfaces for Sierra Estates — a high-end PropTech platform for New Cairo's luxury real estate market (Rent & Resale).

## Quick Start

1. **Read the README.md** in the root folder for full context: brand philosophy, content guidelines, visual foundations, and usage instructions
2. **Import colors_and_type.css** into your HTML/project to get all design tokens and semantic CSS variables
3. **Reference the preview cards** in the Design System tab to see:
   - Color palette (navy, sky blue, ivory, status colors)
   - Typography scale (Playfair Display, Inter, Cairo)
   - Spacing & elevation tokens
   - Component patterns (buttons, cards, badges, forms)
4. **Study the UI kits** to see full-page prototypes:
   - Web App: 50/50 split-screen (feed + geospatial map)
   - Admin Dashboard: 10-stage CRM pipeline + analytics

## Core Design Tokens

### Colors
```css
--navy: #0A1628;           /* Primary background */
--sky: #2B5A9E;            /* Accent/interactive */
--ivory: #F4F0E8;          /* Text on dark */
--status-success: #1E8B7A; /* Teal for confirmations */
--status-error: #DC2626;   /* Red for destructive */
```

### Typography
```css
--font-display: 'Playfair Display', serif;  /* Headlines */
--font-ui: 'Inter', sans-serif;             /* UI/data */
--font-arabic: 'Cairo', sans-serif;         /* Arabic content */
```

### Spacing (8px base unit)
```css
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

## Building Interfaces

### Use CSS Custom Properties
Always reference tokens instead of hard-coding values:
```html
<button style="background: var(--sky); color: var(--navy); padding: var(--spacing-md);">
  View Details
</button>
```

### Follow the Type Scale
```html
<h1 class="h1">Page Title (2.2rem)</h1>
<p class="body">Body text (1rem, 1.6 line-height)</p>
<small class="caption">Meta text (0.75rem)</small>
```

### Component Patterns
- **Buttons:** Sky blue background, navy text, 8px radius, hover lightens color
- **Cards:** Navy Deep bg, subtle border, 12px radius, hover increases elevation
- **Inputs:** 4% white overlay bg, 1px border, focus → sky blue border
- **Badges:** Semitransparent status color bg, full-saturation text, pill-shaped (12px radius)
- **SBR Codes:** Monospace font, sky light color, uppercase, semantic meaning (e.g., MIV-3F-1.6K)

### Layout
- **50/50 split-screen:** Use CSS Grid `grid-template-columns: 1fr 1fr` for feed + map layouts
- **12-column grid:** For responsive card grids and layouts
- **Spacing:** Use `gap:` on flex/grid containers, never margin on siblings

## Key Features to Implement

### Currency Logic
If price < 10,000, format as USD ($); if ≥ 10,000, format as EGP. Add this to any property display:
```js
const formatPrice = (price) => {
  if (price < 10000) return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} EGP`;
};
```

### SBR Code Format
Property identifiers follow: `[Compound]-[Rooms][F/U]-[Price]`
- Example: `MIV-3F-1.6K` = Mivida, 3 Bedrooms, Furnished, $1,600/month
- Display in monospace font, uppercase, with sky light color

### Pagination
Limit to **4 items per page** to prevent memory overload from 25,000+ property records.

### Interactive Map
Use geospatial pins with hover/active states. Show property price tags on map points. Sync selection between feed cards and map pins (when card is hovered, highlight its map pin).

## Content Guidelines

- **Tone:** Professional, refined, confident ("Quiet Luxury")
- **Case:** Title Case for headlines (Playfair Display), Sentence case for UI labels
- **No emoji in UI** – sparingly in conversational AI replies only
- **Icons:** Use Lucide React (or substitute with Heroicons/Feather)
- **Avoid:** Jargon, aggressive marketing, filler content

Example copy:
- ❌ "Click here to explore our amazing luxury properties"
- ✅ "Explore curated listings in New Cairo"

## Responsive Design

- **Mobile-first:** Start with single-column, then expand to 50/50 split at lg breakpoint (1024px+)
- **Type scale adjusts** at smaller breakpoints (display sizes reduce on mobile)
- **Touch-friendly:** Buttons ≥ 44px, tap targets well-spaced
- **Map hides on mobile** – show feed full-width instead

## Animation & Transitions

- **Duration:** 200ms default (fast, no bounce)
- **Easing:** `cubic-bezier(0.25, 1, 0.5, 1)` (smooth out)
- **Hover:** Color shift, subtle shadow increase, no scale
- **Active:** Scale down slightly (0.98), deeper shadow

## When to Ask for Updates

If you need to:
- Add new component types (e.g., sliders, dropdowns, modals)
- Adjust spacing or type scale for a specific use case
- Create new semantic colors beyond the core palette
- Build a unique layout pattern not in the UI kits

...ask the user before building. This design system is intentionally restrained to maintain brand consistency.

## File Reference

- **README.md** – Full documentation and usage guide
- **colors_and_type.css** – All tokens, semantic styles, utility classes
- **preview/colors.html** – Color palette card
- **preview/typography.html** – Type scale specimen
- **preview/spacing.html** – Spacing, radii, shadows, grid
- **preview/components.html** – Button, card, badge, form patterns
- **ui_kits/web-app/index.html** – Full 50/50 split-screen prototype
- **ui_kits/admin/index.html** – CRM pipeline + analytics dashboard

---

**Version:** 1.0 | **Status:** Production-Ready | **Updated:** May 2026
