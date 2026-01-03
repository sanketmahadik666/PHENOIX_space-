# Design Personas & System Proposals

This document outlines 3 distinct design directions for the "Elegant" platform's Data Visualization, Dark Mode, and Accessibility patterns.

## 1. The "Precision" Archetype (Clean & Functional)

_Philosophy: "Data should be seen, not decorated. Clarity is the ultimate sophistication."_

### Data Visualization

```css
/* Color sequence: Cool, distinct, distinct luminosity */
--chart-1: #0f172a; /* Slate 900 */
--chart-2: #334155; /* Slate 700 */
--chart-3: #64748b; /* Slate 500 */
--chart-4: #94a3b8; /* Slate 400 */
--chart-5: #cbd5e1; /* Slate 300 */

--grid-color: #e2e8f0;
--axis-color: #64748b;
--tick-size: 12px;
```

- **Grid lines**: Subtle, horizontal only (dotted).
- **Labels**: Direct labeling (next to lines) preferred over legends.
- **Interactions**: Crosshair cursor with precise tooltip showing exact values.

### Dark Mode Adaptation

- **Background**: `#020617` (True Slate Dark) - High contrast.
- **Surface**: `#0f172a` with 1px border `#1e293b`. No shadows.
- **Colors**: Inverted saturation. Primary blue becomes lighter (`#60a5fa`).

### Accessibility

- **Focus**: Distinct visible outline (2px solid blue).
- **Motion**: Zero motion for data viz by default, only opacity fades.
- **Reader**: Strict `<caption>` and `summary` usage for all charts.

---

## 2. The "Impact" Archetype (Bold & Expressive)

_Philosophy: "Training is energy. The interface should feel alive and motivating."_

### Data Visualization

```css
/* Color sequence: Vibrant, high saturation */
--chart-1: #2563eb; /* Blue 600 */
--chart-2: #f97316; /* Orange 500 */
--chart-3: #8b5cf6; /* Violet 500 */
--chart-4: #10b981; /* Emerald 500 */
--chart-5: #ec4899; /* Pink 500 */

--grid-color: transparent; /* No grid */
--axis-color: #000000;
--tick-size: 0px;
```

- **Style**: Thick stroke widths (4px+), rounded line caps.
- **Legends**: Large, pill-shaped toggles at the top.
- **Interactions**: Elements scale up `scale(1.1)` on hover.

### Dark Mode Adaptation

- **Background**: `#1a1a2e` (Deep Navy).
- **Surface**: `#16213e` (lighter navy).
- **Accents**: Neon variants of primary colors.

### Accessibility

- **Typogaphy**: Larger base size (16px), heavy weights for headers.
- **Contrast**: AAA contrast ratios maintained even for decorative elements.

---

## 3. The "Ethereal" Archetype (Modern & Innovative)

_Philosophy: "Seamless flow. The UI should feel like a premium, fluid workspace."_
_(Matches current 'Elegant' Login/Landing aesthetic)_

### Data Visualization

```css
/* Color sequence: Soft gradients */
--chart-1: #2dd4bf; /* Teal 400 */
--chart-2: #818cf8; /* Indigo 400 */
--chart-3: #fb7185; /* Rose 400 */
--chart-4: #fbbf24; /* Amber 400 */
--chart-5: #38bdf8; /* Sky 400 */

--grid-color: rgba(255, 255, 255, 0.1);
--axis-color: rgba(148, 163, 184, 0.5);
--tick-size: 8px;
```

- **Style**: Area charts with vertical gradients (fade to transparent).
- **Grid**: Dashed, very low opacity.
- **Animation**: Smooth entry using `framer-motion` layout animations.

### Dark Mode Adaptation

- **Background**: `#000000` (Pure Black for OLED) or Deep Gray `#121212`.
- **Surface**: Glassmorphism (`bg-white/5` + `backdrop-blur-md`).
- **Shadows**: Colored glows (`box-shadow: 0 0 20px rgba(...)`).

### Accessibility

- **Motion**: Respects `prefers-reduced-motion` by disabling blurs and glides.
- **Glass**: Falls back to solid opaque colors in High Contrast mode.

---

## Selection Guidance

| Need...                    | Choose...                                             |
| :------------------------- | :---------------------------------------------------- |
| **Trust, Density & Speed** | **1. Precision** (Admin heavy workflows)              |
| **Engagement & Marketing** | **2. Impact** (Student/Sales facing)                  |
| **Premium Feel & "Wow"**   | **3. Ethereal** (Aligns with current "Elegant" brand) |
