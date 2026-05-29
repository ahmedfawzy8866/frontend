# Sierra Estates Design System

**Brand:** Sierra Estates  
**Product:** High-end PropTech OS for New Cairo (Rent & Resale)  
**Aesthetic:** Quiet Luxury, Apple-style minimalism  
**Year:** 2026

---

## Overview

Sierra Estates is an exclusive property intelligence platform designed for New Cairo's luxury real estate market. This design system establishes the visual language, component patterns, and interaction principles that define the brand across web, mobile, and admin interfaces.

### Key Constraints & Philosophy

- **Core Palette:** Deep Navy (#0A1628), Sky Blue (#2B5A9E), Ivory (#F4F0E8), with teal/rust status colors
- **Typography:** Playfair Display (Headlines), Inter (Data/UI), Cairo (Arabic)
- **Currency Logic:** Prices < 10,000 = USD; ≥ 10,000 = EGP (automatic)
- **SBR Coding:** All properties follow [Compound]-[Rooms][F/U]-[Price] format (e.g., MIV-3F-1.6K)
- **Layout:** 50/50 split-screen (dynamic feed + interactive map), 4-item pagination
- **AI Persona:** "Sierra" – luxury concierge in Levant dialect (public), deterministic analytics (admin)

---

## File Structure

```
sierra-estates-design-system/
├── README.md                          (This file)
├── SKILL.md                           (Claude Code handoff)
├── colors_and_type.css                (Design tokens & semantic CSS)
├── preview/
│   ├── colors.html                    (Color palette card)
│   ├── typography.html                (Type scale specimen)
│   ├── spacing.html                   (Spacing, radii, shadows, grid)
│   └── components.html                (Buttons, cards, badges, forms)
└── ui_kits/
    ├── web-app/
    │   └── index.html                 (Client-facing 50/50 interface)
    └── admin/
        └── index.html                 (10-stage CRM & analytics dashboard)
```

---

## Design System Tab

When you open the **Design System** tab in the preview pane, you'll see all registered cards:

| Card | Purpose | File |
|------|---------|------|
| **Color Palette** | Navy, sky blue, ivory, semantic colors, opacity scales | `preview/colors.html` |
| **Typography** | Display, headings, body, labels, monospace, Arabic | `preview/typography.html` |
| **Spacing & Elevation** | 8px unit scale, border radius, shadows, 12-col grid | `preview/spacing.html` |
| **Components & States** | Buttons, cards, badges, forms, SBR codes | `preview/components.html` |
| **Web App UI Kit** | Interactive 50/50 split-screen prototype | `ui_kits/web-app/index.html` |
| **Admin Dashboard** | CRM pipeline, analytics, data router | `ui_kits/admin/index.html` |

---

## Color Palette

### Primary Colors
- **Navy (Primary):** `#0A1628` – Deep background, text on light
- **Navy Deep:** `#142850` – Elevated surfaces, hover states
- **Sky Blue (Accent):** `#2B5A9E` – Interactive elements, links, focus
- **Sky Light:** `#4A7BC4` – Hover states, hover backgrounds
- **Ivory (Text):** `#F4F0E8` – Primary text on dark

### Status Colors
- **Teal (Success):** `#1E8B7A` – Positive actions, confirmations
- **Blue (Info):** `#3B82F6` – Information, secondary CTA
- **Rust (Warning):** `#C97D3D` – Cautions, alerts
- **Red (Error):** `#DC2626` – Destructive actions, errors

### Semantic Tokens
All available as CSS custom properties in `colors_and_type.css`:
```css
--navy: #0A1628;
--sky: #2B5A9E;
--ivory: #F4F0E8;
--status-success: #1E8B7A;
--status-error: #DC2626;
/* ... and more */
```

---

## Typography

### Font Stack
- **Display Headlines:** Playfair Display (serif) – English titles, hero text
- **UI & Data:** Inter (sans) – buttons, labels, numbers, interface text
- **Arabic Content:** Cairo (sans) – all Arabic UI and content

### Type Scale
- **Display XL:** 3.5rem / 120% (hero headlines)
- **Display L:** 2.8rem / 120% (section titles)
- **H1:** 2.2rem / 130% (page titles)
- **H2:** 1.8rem / 130% (subsections)
- **H3:** 1.4rem / 140% (card titles)
- **Body:** 1rem / 160% (paragraph text)
- **Label:** 0.875rem / 150% (UI labels, input)
- **Caption:** 0.75rem / 150% (meta, hints)
- **Mono:** 0.875rem / 160% (SBR codes, prices, data)

---

## Spacing System

**Base Unit:** 8px (all padding, margin, gaps use multiples of 8)

### Common Tokens
- `--spacing-xs: 4px`
- `--spacing-sm: 8px`
- `--spacing-md: 16px`
- `--spacing-lg: 24px`
- `--spacing-xl: 32px`
- `--spacing-2xl: 48px`

### Border Radius
- **Subtle:** 4px (inputs, small elements)
- **Standard:** 8px (cards, buttons)
- **Large:** 12px (larger cards, modals)
- **Pill:** 9999px (badges, tags)

### Shadows
- **Subtle:** `0 1px 2px rgba(0,0,0,0.08)` (hover state)
- **Elevation 1:** `0 4px 12px rgba(0,0,0,0.12)` (cards)
- **Elevation 2:** `0 8px 24px rgba(0,0,0,0.16)` (modals, dropdowns)
- **Elevation 3:** `0 12px 32px rgba(0,0,0,0.20)` (floating panels)

---

## Content Fundamentals

### Tone & Voice
- **Professional yet accessible** – expertise without jargon
- **Confident, refined** – "Quiet Luxury" in copy
- **Direct & clear** – short sentences, active voice
- **Levantine warmth** – Arabic UI uses Lebanese dialect, personal touch

### Casing & Formatting
- **Headlines:** Title Case (Playfair Display)
- **UI Labels:** Sentence case (e.g., "View property details")
- **SBR Codes:** UPPERCASE (e.g., MIV-3F-1.6K)
- **Currency:** Format with locale (EGP 1,500,000 or $1,800)

### Emoji & Icons
- **Emoji:** Sparingly; never in primary UI, only in conversational AI replies
- **Icons:** Lucide React from CDN (clean, 20-24px default size)
- **No custom SVGs** – maintain visual consistency via library

### Example Copy
- ❌ "Click here to browse our extensive inventory of luxury residences"
- ✅ "Explore curated listings in New Cairo"
- ❌ "Innovative AI-powered property matching engine"
- ✅ "Intelligence-led advisory"

---

## Visual Foundations

### Backgrounds & Surfaces
- **Primary BG:** Navy (#0A1628)
- **Surface 1:** Navy Deep (#142850) – cards, elevated
- **Surface 2:** `rgba(255,255,255,0.04)` – subtle lift on dark
- **Hover:** `rgba(255,255,255,0.08)` – interactive lift
- **No imagery:** Full-bleed property photos only; no decorative patterns or gradients

### Glassmorphism & Backdrop Blur
- **Lightweight blur:** `backdrop-filter: blur(8px)` – modals, floating panels
- **Light backgrounds:** Semitransparent white/navy with 0.6-0.8 opacity
- **Border:** Subtle `rgba(43,90,158,0.15)` divider to define edges

### Borders & Dividers
- **Standard:** 1px `rgba(255,255,255,0.05)` on dark
- **Accent:** 1px `rgba(43,90,158,0.15)` (sky blue tint)
- **Interactive:** 2px `#2B5A9E` on focus/hover

### Animations & Transitions
- **Default duration:** 200-300ms (easing: `cubic-bezier(0.25,1,0.5,1)`)
- **Entrance:** Fade + subtle scale (0.98 → 1)
- **Hover:** Color shift, opacity increase, very light scale (1 → 1.02)
- **No bounce, no slide-in** – keep it refined and understated

### Hover States
- **Buttons:** Background color shift + slight shadow increase
- **Cards:** Border color to sky blue, shadow elevation +1
- **Links:** Color to sky light, no underline
- **Images:** Subtle zoom (1 → 1.05) over 400ms

### Press/Active States
- **Buttons:** Scale down slightly (1 → 0.98), deeper shadow
- **Cards:** Border to navy, background shift
- **Consistent feedback** – no visual lag

### Corner Radii
- **Tight corners:** 4px (inputs, small buttons)
- **Standard:** 8px (cards, large buttons, modals)
- **Generous:** 12px (hero sections, full-width components)
- **Pill buttons:** 24px+ (for badges, small CTA)

### Transparency & Blur
- **Text:** Opacity scale: 100%, 80%, 60%, 40% (primary → muted)
- **Surfaces:** 4%, 8%, 12% white overlay on dark for separation
- **Icons:** Inherit text opacity; use `fill` for semantic colors

---

## Component Patterns

### Buttons
- **Primary CTA:** Navy background, ivory text, rounded 8px
- **Secondary:** Transparent with sky blue border, sky blue text
- **Disabled:** Navy with 40% opacity
- **Loading:** Spinner animation, disabled state
- **Sizes:** Small (32px), Medium (40px), Large (48px)

### Cards
- **Resting:** Navy Deep bg, subtle border, no shadow
- **Hover:** Sky blue border, elevation shadow
- **Image cards:** Dark gradient overlay on image (top-to-bottom)
- **Spacing:** 16px padding, 24px gap between cards

### Input Fields
- **Background:** `rgba(255,255,255,0.04)`
- **Border:** 1px `rgba(255,255,255,0.05)`, focus → sky blue
- **Text:** Ivory on dark, placeholder at 40% opacity
- **Radius:** 8px
- **Padding:** 12px 16px (medium)

### Badges & Tags
- **Background:** Semitransparent status color (20% opacity)
- **Text:** Full-saturation status color
- **Radius:** 12px (pill)
- **Padding:** 4px 12px
- **Font:** Label size, medium weight

### Property Cards (SBR Display)
- **Code placement:** Top-left corner, pill badge
- **Price:** Display size, prominent
- **Specs:** Row layout (beds | baths | sqft)
- **Image:** 240px height, dark overlay
- **CTA button:** Bottom, full-width, secondary style

### Form Layouts
- **Vertical stacking** (mobile-first)
- **Labels above inputs** (12px, uppercase, secondary color)
- **Help text:** Below input, caption size, muted
- **Error state:** Red left border + error message
- **Success state:** Green checkmark, teal text

---

## Using This Design System

### For Designers
1. Read this README end-to-end
2. Open the **Design System tab** to preview all cards
3. Use the color palette, type scale, and spacing tokens as reference
4. Study the UI kit prototypes for component patterns in context
5. Copy the design system into Figma for mockups

### For Developers
1. Copy `colors_and_type.css` into your project
2. Import Google Fonts (Playfair Display, Inter, Cairo)
3. Reference CSS custom properties for colors/spacing
4. Build components using the patterns shown in preview cards
5. Maintain the 50/50 split-screen layout for web app
6. Use Lucide React for icons (or substitute with similar library)

### For Product Managers
- Review the brand voice & tone in **Content Fundamentals**
- Understand SBR Code format for property identifiers
- Use color + status badge system for feature mockups
- Reference the 4-item pagination limit in product specs

---

## Key References

**Source Repositories:**
- GitHub: [ahmedfawzy8866/i-sierra-2027](https://github.com/ahmedfawzy8866/i-sierra-2027) – Original codebase & design context

**Design System Skill:**
- See `SKILL.md` for Claude Code integration

---

## Caveats & Next Steps

**What's Complete:**
- ✅ Color palette (navy + sky blue + status colors)
- ✅ Typography system (3 font families, full scale)
- ✅ Spacing & elevation tokens
- ✅ Component patterns (buttons, cards, badges, forms)
- ✅ Web app UI kit (50/50 split-screen prototype)
- ✅ Admin dashboard UI kit (CRM + analytics)
- ✅ All preview cards registered

**What's Not Included:**
- Admin dashboard deep dive (admin UI kit is scaffold)
- Mobile-specific breakpoints (grid is responsive; extend as needed)
- Animation library (CSS transitions sufficient; use Framer Motion for advanced)
- Figma link (GitHub repo is source of truth)

**To Iterate & Perfect:**
1. **Import the GitHub codebase** to verify component implementations match
2. **Test responsive breakpoints** – extend spacing & type scale for mobile
3. **Build interactive states** – add focus/active/disabled to all components
4. **Create Figma library** – mirror this design system for design collaboration
5. **Document accessibility** – ARIA labels, keyboard navigation, color contrast

---

**Created:** 2026  
**Version:** 1.0  
**Status:** Production-Ready
