# GoTogether — Landing Page Project Brief

> Digital Software Development Company · Next.js · Tailwind · GSAP · i18n

---

## 1. Overview

**Company:** GoTogether  
**Type:** Digital software development agency  
**Goal:** A creative, animated, multilingual landing page that showcases services, portfolio, and team — built with Next.js, Tailwind CSS, GSAP ScrollTrigger, and next-intl.

---

## 2. Design System

### 2.1 Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `--midnight` | `#0A0F1E` | Page background |
| `--cobalt` | `#1A56FF` | Primary brand accent |
| `--electric` | `#4DFFB4` | CTA highlight / glow |
| `--slate` | `#1E2740` | Card & section backgrounds |
| `--ash` | `#8892A4` | Muted / secondary text |
| `--snow` | `#F0F4FF` | Primary body text |

### 2.2 Typography

| Role | Font | Usage |
|------|------|-------|
| Display | **Space Grotesk** | Hero headline, section titles |
| Body | **Inter** | Paragraphs, descriptions |
| Mono | **JetBrains Mono** | Labels, tech tags, code snippets |

All fonts loaded via `next/font/google`.

### 2.3 Signature Element

A **particle mesh hero** — a canvas of connected dots that reacts subtly to mouse movement. The main headline clips through it, making the hero feel alive and distinctly digital. Built with GSAP + plain Canvas API.

---

## 3. Tech Stack

```
Next.js 14          App Router, SSG, image optimization
Tailwind CSS 3      Utility-first styling, custom design tokens
GSAP + ScrollTrigger  Scroll-driven reveal animations
next-intl           i18n routing (en / uz / ru)
Framer Motion       Micro-interactions (hover, tap)
TypeScript          Full type safety
```

---

## 4. i18n (Internationalization)

### Default locale: `en`  
### Supported locales: `en`, `uz`, `ru`

### File structure

```
/messages
  en.json
  uz.json
  ru.json
```

### Key structure example

```json
{
  "nav": {
    "services": "Services",
    "work": "Our Work",
    "team": "Team",
    "contact": "Contact"
  },
  "hero": {
    "tagline": "We build digital products",
    "subtitle": "From idea to launch — web, mobile, and AI.",
    "cta_primary": "See Our Work",
    "cta_secondary": "Get in Touch"
  },
  "services": { ... },
  "showcases": { ... },
  "team": { ... },
  "stats": { ... },
  "contact": { ... }
}
```

Locale is detected via middleware and reflected in the URL: `/en/`, `/uz/`, `/ru/`.

---

## 5. Project File Structure

```
gotogether/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          ← locale-aware root layout
│   │   └── page.tsx            ← assembles all sections
│   └── globals.css             ← CSS variables, base styles
│
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            ← particle mesh, headline, CTAs
│   │   ├── Services.tsx        ← 6 service cards, GSAP stagger
│   │   ├── Showcases.tsx       ← portfolio grid with hover
│   │   ├── Team.tsx            ← member cards (photo, links)
│   │   ├── Stats.tsx           ← animated counters
│   │   ├── Testimonials.tsx    ← quote cards
│   │   └── Contact.tsx         ← form + social links
│   │
│   ├── ui/
│   │   ├── NavBar.tsx          ← sticky nav + lang switcher
│   │   ├── LangSwitcher.tsx    ← EN / UZ / RU toggle
│   │   ├── ServiceCard.tsx     ← reusable card component
│   │   ├── ProjectCard.tsx     ← portfolio card
│   │   ├── TeamCard.tsx        ← team member card
│   │   └── Footer.tsx          ← links, socials, copyright
│   │
│   └── animations/
│       ├── ParticleMesh.tsx    ← canvas particle system
│       ├── ScrollReveal.tsx    ← GSAP ScrollTrigger wrapper
│       └── CountUp.tsx         ← animated number counter
│
├── messages/
│   ├── en.json
│   ├── uz.json
│   └── ru.json
│
├── lib/
│   ├── gsap.ts                 ← GSAP registration + defaults
│   └── team.ts                 ← team member data
│
├── public/
│   ├── team/                   ← member photos
│   └── projects/               ← project screenshots
│
├── i18n.ts                     ← next-intl config
├── middleware.ts               ← locale redirect middleware
└── tailwind.config.ts          ← custom tokens, fonts, animations
```

---

## 6. Page Sections

### 6.1 Hero
- Full-viewport section
- Particle mesh canvas background (canvas + requestAnimationFrame)
- Large display headline with split-text GSAP entrance
- Two CTA buttons: primary (solid cobalt) + secondary (ghost)
- Language switcher top-right
- Subtle scroll indicator at bottom

### 6.2 Services
Six service cards with icon, title, and short description. Cards stagger in on scroll via GSAP ScrollTrigger.

| # | Service |
|---|---------|
| 1 | Web Development (Next.js, React) |
| 2 | Mobile Apps (Flutter, iOS, Android) |
| 3 | Backend & APIs (Node.js, PostgreSQL) |
| 4 | UI/UX Design (Figma, prototyping) |
| 5 | AI Integration (LLM, automation) |
| 6 | DevOps & Cloud (Docker, CI/CD) |

### 6.3 Showcases / Portfolio
Grid of project cards. Each card shows:
- Project screenshot / cover image
- Project name & one-line description
- Tech stack tags (monospace chips)
- Links: live site + GitHub repo
- Hover: card lifts with a cobalt border glow

### 6.4 Team
Cards for each team member:
- Photo (rounded, with electric-green ring on hover)
- Name + Role
- GitHub icon link
- LinkedIn / Instagram / Telegram icons
- Short bio (1 sentence)

### 6.5 Stats (animated counters)
```
50+   Projects Delivered
12+   Happy Clients
3     Countries
4     Years of Experience
```
Numbers count up when section enters the viewport (GSAP ScrollTrigger + CountUp).

### 6.6 Testimonials
Horizontal scroll of quote cards. Client name, company, avatar, and quote text.

### 6.7 Contact
- Simple contact form: Name, Email, Message, Send button
- Social links row: GitHub, LinkedIn, Telegram, Instagram
- Email address displayed

### 6.8 Footer
- GoTogether logo + tagline
- Quick nav links
- Language switcher
- Copyright line

---

## 7. Animation Plan (GSAP)

| Section | Animation |
|---------|-----------|
| Hero | Split-text stagger entrance (y: 60 → 0, opacity 0 → 1) |
| NavBar | Slide down on load, background blur on scroll |
| Services | Cards stagger from bottom, 0.15s interval |
| Showcases | Cards fade + scale in (0.9 → 1), staggered |
| Team | Horizontal slide-in from alternating sides |
| Stats | CountUp triggered when section is 50% in view |
| Testimonials | Horizontal marquee-style on desktop |
| Contact | Form fields drop in one by one |

All animations respect `prefers-reduced-motion` — they fall back to instant show.

---

## 8. Data You Need to Provide

Before we start building, fill in the following:

### 8.1 Team Members

```
Name:
Role:
Photo URL (or upload):
GitHub:
LinkedIn:
Telegram / Instagram:
Short bio (1 sentence):
```

### 8.2 Portfolio Projects (3–6)

```
Project name:
One-line description:
Tech stack (comma separated):
Live URL:
GitHub URL:
Cover image URL (or upload):
```

### 8.3 Testimonials (optional, 2–3)

```
Client name:
Client company:
Quote:
Avatar URL:
```

### 8.4 Contact Info

```
Email:
GitHub org URL:
LinkedIn company URL:
Telegram:
Instagram:
```

---

## 9. Build Order (Step by Step)

We'll build this file by file. Suggested order:

1. `tailwind.config.ts` + `globals.css` — design tokens
2. `i18n.ts` + `middleware.ts` — locale routing
3. `messages/en.json` + `uz.json` + `ru.json` — all copy
4. `app/[locale]/layout.tsx` — root layout with fonts
5. `components/ui/NavBar.tsx` + `LangSwitcher.tsx`
6. `components/animations/ParticleMesh.tsx`
7. `components/sections/Hero.tsx`
8. `lib/gsap.ts` + `components/animations/ScrollReveal.tsx`
9. `components/sections/Services.tsx`
10. `components/sections/Showcases.tsx`
11. `components/sections/Team.tsx`
12. `components/sections/Stats.tsx`
13. `components/sections/Testimonials.tsx`
14. `components/sections/Contact.tsx`
15. `components/ui/Footer.tsx`
16. `app/[locale]/page.tsx` — final assembly

---

## 10. Dependencies to Install

```bash
npm install gsap @gsap/react
npm install next-intl
npm install framer-motion
npm install @types/node @types/react @types/react-dom
```

For fonts, add to `layout.tsx`:

```ts
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
```

---

## 11. Next Step

Reply with your team members, projects, and contact info using the format in **Section 8**, and we'll start generating code file by file.
