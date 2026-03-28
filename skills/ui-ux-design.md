---
name: ui-ux-design
description: Triggers when building UI components, pages, dashboards, web applications, or any frontend work. Provides design intelligence including style recommendations, color palettes, font pairings, component patterns, anti-patterns, and accessibility guidelines. Activate when creating HTML/CSS/JS interfaces, React/Vue/Svelte components, or discussing visual design decisions.
---

# UI/UX Design Intelligence

When triggered, walk through each section and provide concrete recommendations tailored to the project context.

## 1. Style Recommendation

Select from 67 established UI styles based on the product type and audience:

- **Web apps / dashboards**: minimalism, glassmorphism, neomorphism, flat design, material design
- **Creative / portfolio**: brutalism, maximalism, art deco, retro-futurism, vaporwave
- **Enterprise / B2B**: corporate clean, data-dense, utilitarian, IBM Carbon-style
- **Consumer / mobile**: rounded friendly, skeleton UI, card-based, bottom-nav patterns
- **Gaming / immersive**: cyberpunk neon, dark mode primary, HUD-style, particle backgrounds

**Decision criteria**: Who is the user? What emotion should the UI evoke? What is the information density?

## 2. Color Palette

Select from 161 industry-aligned palettes. Always provide:

- Primary, secondary, accent colors (hex values)
- Background and surface colors for light and dark modes
- Semantic colors: success (green), warning (amber), error (red), info (blue)
- Contrast ratios for all text-on-background combinations (minimum 4.5:1 for AA)

## 3. Font Pairing

Select from 57 Google Fonts pairings. Provide:

- Heading font + body font combination
- Font weights to load (minimize for performance)
- Fallback stack for each font
- Line height and letter spacing recommendations

**Common strong pairings**: Inter + Source Serif Pro, Space Grotesk + IBM Plex Serif, DM Sans + DM Serif Display

## 4. Component Patterns

Based on product type, recommend:

- Navigation pattern (sidebar, top bar, bottom tabs, command palette)
- Layout grid (12-column, auto-fit, masonry)
- Card / list item structure
- Form patterns (inline validation, floating labels, step wizards)
- Loading states (skeleton, spinner, progressive)
- Empty states and error boundaries

## 5. Anti-Patterns to Avoid

Flag these if detected:

- Low contrast text (below WCAG AA 4.5:1)
- Inconsistent spacing (use 4px or 8px base unit)
- Too many fonts or weights (max 2 families, 3 weights)
- Missing focus indicators on interactive elements
- Color as the only indicator of state
- Fixed pixel widths without responsive breakpoints
- Modal overuse where inline expansion works

## 6. Accessibility Checklist (WCAG AA Minimum)

- [ ] All text meets 4.5:1 contrast ratio (3:1 for large text)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus order follows visual reading order
- [ ] Images have meaningful alt text
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] No content relies solely on color to convey meaning
- [ ] Touch targets are at least 44x44px
- [ ] Animations respect prefers-reduced-motion
- [ ] Page has proper heading hierarchy (h1 > h2 > h3)

## Output Format

Present recommendations as a design brief: style choice with rationale, palette with hex codes, font pairing with CDN links, 3-5 component patterns, and the accessibility checklist with any flagged issues.
