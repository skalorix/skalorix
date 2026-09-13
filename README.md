# SKALORIX — Ideas Into Impact

> **SKALORIX** is a modern marketing + technology company combining creativity, strategy, design, and technology to help businesses grow.

An interactive 3D editorial web platform built with React, Three.js / React Three Fiber, GSAP, and Lenis smooth scrolling.

---

## Brand Positioning & Philosophy

- **Tagline**: *"Ideas Into Impact."*
- **Aesthetic**: Editorial, architectural, cinematic, and memorable.
- **Palette**: Deep Forest (`#1B2E24`), Soft Ochre (`#D4B483`), Parchment (`#F8F4EA`), Stone (`#A69E93`), and Charcoal (`#2E2E2E`).
- **Identity**: Custom brand swirl icon replacing the "O" across all brand touchpoints, loading sequences, navigation, and favicons.

---

## Core Services

1. **Search Engine Optimization (SEO)** — Technical audits, keyword strategy, and search intelligence.
2. **Creative Services** — Brand identity, visual design, campaign creative, and motion graphics.
3. **Social Media Management (SMM)** — Content calendars, community growth, and platform strategy.
4. **Social Media Marketing** — Targeted paid social campaigns, audience acquisition, and conversion optimization.
5. **Website Development** — High-performance responsive websites, UI/UX design, and CMS integrations.
6. **Software Development** — Custom scalable web applications, mobile platforms, APIs, and business systems.

---

## Tech Stack

- **Framework**: React 19 + Vite
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Animations**: GSAP (`gsap`), `ScrollTrigger`
- **Scrolling**: Lenis Smooth Scrolling (`lenis`)
- **Typography**: Playfair Display (editorial serif) & Plus Jakarta Sans (clean geometric sans)
- **Styling**: Vanilla CSS Design System with CSS variables and glassmorphism

---

## Project Structure

```
src/
├── components/
│   ├── three/
│   │   ├── HeroSculpture.jsx     # 3D interactive hero sculpture with orbital rings
│   │   ├── OrbitalEcosystem.jsx  # Digital ecosystem 3D constellation
│   │   └── Particles.jsx         # Ambient particulate atmosphere
│   ├── sections/
│   │   ├── WhatWeDo.jsx          # Numbered core services overview
│   │   ├── WhySkalorix.jsx       # 4 core brand principles
│   │   ├── OurApproach.jsx       # 5-step process timeline
│   │   ├── DigitalExperience.jsx # 3D interactive ecosystem section
│   │   ├── ServicesDetail.jsx    # In-depth service breakdowns
│   │   ├── SelectedWork.jsx      # SNPIT Android App case study
│   │   ├── CTASection.jsx        # Interactive contact form & inquiry system
│   │   └── Footer.jsx            # Brand footer, contact, and legal links
│   ├── ui/
│   │   ├── SkalorixLogo.jsx      # SVG logo with custom brand swirl 'O'
│   │   ├── Button.jsx            # Interactive ochre & primary buttons
│   │   ├── GrainOverlay.jsx      # Editorial SVG film grain texture
│   │   ├── AnimatedText.jsx      # Reveal animations
│   │   └── SectionLabel.jsx      # Section divider tags
│   ├── CustomCursor.jsx          # Dynamic blend-mode cursor
│   ├── Navigation.jsx            # Responsive glassmorphic navigation
│   ├── LoadingScreen.jsx         # Letter-by-letter brand entrance
│   └── Hero.jsx                  # Hero section with stats and headline
├── contexts/
│   └── CursorContext.jsx         # Global cursor state
├── hooks/
│   ├── useLenis.js               # Smooth scrolling synchronization
│   ├── useMediaQuery.js          # Responsive viewport hooks
│   └── useScrollAnimation.js     # GSAP scroll observer hooks
├── styles/
│   ├── index.css                 # Design tokens, reset, global typography
│   └── components.css            # Component styles & contact form layout
└── utils/
    ├── constants.js              # Brand data, services, navigation, and colors
    └── animations.js             # GSAP easing & preset helpers
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/adityavani07/skalorix.git

# Navigate to project directory
cd skalorix

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Contact & Inquiries

- **Email**: [skalorix.work@gmail.com](mailto:skalorix.work@gmail.com)
- **Phone**: +91 94094 24528
- **Website**: [skalorix.com](https://skalorix.com)

---

© 2026 SKALORIX. All rights reserved.
