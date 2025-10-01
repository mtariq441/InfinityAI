# Infinity AI Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern AI/SaaS platforms like Linear, Anthropic, and Vercel. The design should convey innovation, trust, and sophistication while remaining approachable and user-friendly.

## Core Design Principles
- **Modern Tech Aesthetic**: Clean, minimal with strategic visual impact
- **Trust & Professionalism**: Establish credibility through polished design
- **Innovation Forward**: Reflect cutting-edge AI technology through contemporary visuals
- **Conversion-Focused**: Clear hierarchy guiding users to key actions

## Color Palette

**Primary Colors**:
- Brand Primary: 186 90% 55% (vibrant turquoise/cyan - represents AI, innovation, clarity)
- Brand Dark: 186 85% 35% (deeper turquoise for accents)

**Neutral Foundation**:
- Background (Light): 0 0% 100%
- Background (Dark): 222 47% 11%
- Surface (Light): 210 20% 98%
- Surface (Dark): 217 33% 17%
- Text Primary (Light): 222 47% 11%
- Text Primary (Dark): 210 40% 98%
- Text Secondary (Light): 215 16% 47%
- Text Secondary (Dark): 215 20% 65%

**Accent Colors**:
- Success: 142 76% 45% (for positive states, checkmarks)
- Warning: 38 92% 50% (minimal use, alerts only)

**Gradient Accents** (use sparingly for hero and key CTAs):
- Primary Gradient: from 186 90% 55% to 220 85% 65% (turquoise to blue-purple)
- Subtle Gradient: from 186 30% 95% to 220 30% 95% (light backgrounds)

## Typography

**Font Families** (via Google Fonts):
- Headlines: 'Inter', sans-serif (weights: 700, 800)
- Body & UI: 'Inter', sans-serif (weights: 400, 500, 600)
- Code/Technical: 'JetBrains Mono', monospace (weight: 400)

**Type Scale**:
- Hero Headline: text-6xl lg:text-7xl font-bold (tracking-tight)
- Page Headline: text-4xl lg:text-5xl font-bold
- Section Headline: text-3xl lg:text-4xl font-bold
- Card Title: text-xl lg:text-2xl font-semibold
- Body Large: text-lg
- Body: text-base
- Small: text-sm

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 8, 12, 16, 20, 24, 32
- Component padding: p-6, p-8
- Section spacing: py-16 lg:py-24, py-20 lg:py-32
- Card gaps: gap-6, gap-8
- Micro spacing: space-y-4, space-x-2

**Container Strategy**:
- Max width: max-w-7xl mx-auto px-6 lg:px-8
- Content max: max-w-3xl (for text-heavy sections)
- Full bleed: w-full (for hero backgrounds)

**Grid Patterns**:
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8
- Pricing: grid-cols-1 md:grid-cols-3 gap-8
- Blog: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Testimonials: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

## Component Library

**Navigation**:
- Fixed header with backdrop blur effect (backdrop-blur-md bg-white/80)
- Logo left, nav center, CTA right
- Mobile: hamburger menu with slide-out panel
- Height: h-16 lg:h-20

**Buttons**:
- Primary CTA: bg-[186_90%_55%] with subtle hover lift and glow
- Secondary: variant="outline" with border-[186_90%_55%]
- Ghost: variant="ghost" for tertiary actions
- Sizes: default for main CTAs, lg for hero buttons
- On images: backdrop-blur-md bg-white/10 border-white/20

**Cards**:
- Feature cards: rounded-2xl p-6 lg:p-8 border with subtle shadow
- Pricing cards: rounded-3xl with highlighted "popular" tier
- Testimonial cards: rounded-xl p-6 with profile image top-left
- Blog cards: rounded-xl overflow-hidden with image + content

**Icons**:
- Use Lucide React icons throughout
- Feature icons: size-12 lg:size-16 with turquoise background circle
- Step numbers: large outlined numbers with gradient text

**Forms**:
- Input fields: rounded-lg border-2 focus:border-[186_90%_55%]
- Contact form: single column, generous spacing
- Dashboard search: prominent with icon, rounded-full option

## Page-Specific Designs

**Home Page**:
- Hero: Full viewport height (min-h-screen), split layout with left content + right 3D illustration/mockup
- Hero background: subtle gradient mesh or animated gradient
- Features: 4-column grid with icon + title + description cards
- How It Works: horizontal 3-step flow with connecting lines/arrows
- Social Proof: logo cloud (grayscale, hover to color) + 3-column testimonials
- Final CTA: centered section with gradient background, bold headline

**Features Page**:
- Hero banner: centered text with gradient background
- Feature sections: alternating left/right layout with icon, title, description, and benefit bullets
- Each section includes visual representation (icon or illustration placeholder)
- End with upgrade CTA card

**Pricing Page**:
- Hero: centered headline + toggle (Monthly/Yearly) with savings badge
- 3-column pricing table with middle tier elevated and highlighted
- Feature comparison checkmarks using Lucide icons
- FAQ accordion below pricing table
- Bottom CTA section

**Dashboard**:
- Sidebar: fixed left (w-64), dark background, icon + text navigation
- Main area: chat interface with message bubbles, input at bottom
- Secondary panels: saved items grid, task cards with checkboxes
- Clean, spacious layout emphasizing the chat experience

## Images

**Hero Section**: Large 3D illustration or laptop mockup showing the AI interface in action. Style should be modern, slightly abstract, with turquoise accent colors. Positioned on right side of hero split layout.

**Feature Icons**: Not full images, but large icon representations (Lucide icons) within colored circles.

**Social Proof**: Client/integration logos (Shopify, Webflow, Google Ads) in grayscale with hover color effect.

**Testimonials**: Small circular profile photos (size-12) for each testimonial card.

**Blog Cards**: Featured images for each article (16:9 aspect ratio), representing content topics.

**Team Section**: Professional headshots in circular frames (size-24 lg:size-32) with subtle border.

## Interactions & Animations

**Minimal, Purposeful Motion**:
- Button hover: subtle scale (hover:scale-105) and glow effect
- Card hover: slight elevation change (shadow increase)
- Page transitions: fade in on load (opacity animation)
- Scroll reveals: subtle fade-up for sections (use sparingly)
- No complex scroll-triggered animations or parallax effects

**Loading States**:
- Skeleton screens for dashboard content
- Spinner for form submissions
- Progress indicators for multi-step processes

## Accessibility

- Maintain WCAG AA contrast ratios for all text
- Focus indicators: visible ring with turquoise color
- Dark mode: fully implemented with consistent component styling
- Semantic HTML structure throughout
- Alt text for all images and decorative elements marked appropriately