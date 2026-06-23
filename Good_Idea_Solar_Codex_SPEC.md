# Good Idea Solar — Website Build Spec (for Codex)

> **How to use this file.** This is the primary build prompt for an AI coding agent (Codex). Drop this file, the companion `AGENTS.md`, and the three brand documents into the repo, then point Codex at this spec. It follows the **Goal → Constraints → Success Criteria → Out of Scope → Pointers → First Task** pattern (GitHub spec-kit / Addy Osmani spec-driven development). Sections in `code` and quotes are precise — implement them as written. The "Foundation & Sources" appendix lists the research this spec is built on.

---

## Goal

Build the **first production version of the Good Idea Solar marketing website**: a polished, fast, accessible, mobile-first 4-page site whose job is to make a visiting farmer, partner, or community stakeholder believe Good Idea Solar is a credible, farmer-first solar developer worth contacting.

The four pages are **Home, About Us, Projects, Contact**. The site is an "online business card" / credibility check — not a lead-generation funnel and not a web app. Optimize for trust, clarity, and load speed over cleverness.

Build it as a statically-rendered Next.js (App Router) site styled with Tailwind, content driven by local markdown/JSON, a working contact form via Resend, and deploy-ready for Vercel.

The authoritative brand content lives in three files in this repo — **read them first and treat them as the source of truth for all copy, colors, fonts, and page structure**:
- `brand/Good_Idea_Solar_Brand_Guide.md` — full brand strategy, visual identity, voice.
- `brand/Good_Idea_Solar_Website_Content_Guide.md` — page-by-page sections and launch-ready copy.
- `brand/Good_Idea_Solar_Brand_Cheat_Sheet.md` — the one-page quick reference.
- `brand/Good_Idea_Solar_Project_Data.xlsx` — the four projects' data (also provided as `content/projects.json`, see Pointers).

If any instruction here conflicts with the brand documents, the brand documents win for **content**; this spec wins for **technical implementation**.

---

## Constraints

**Stack (do not substitute):**
- **Next.js 15+ (App Router)** with **TypeScript** (strict mode).
- **Tailwind CSS v4** (CSS-first `@theme` tokens). If v4 is unavailable in the environment, fall back to Tailwind v3 with an equivalent `tailwind.config.ts` theme — but prefer v4.
- **React Server Components by default.** Add `"use client"` only where interactivity requires it (contact form, mobile nav toggle, map).
- **next/font** for self-hosted Google Fonts (Poppins + Source Sans 3) with `display: swap`.
- **next/image** for every raster image.
- **Resend** (`resend` SDK) for the contact form email, called from a Next.js Route Handler / Server Action.
- **Mapbox** via `react-map-gl` for the optional projects map (lazy-loaded, client component). If no Mapbox token is configured, render a static fallback (project list + a static map image or styled placeholder) — the site must build and function without the token.
- Package manager: **npm**. Node 20+.

**Do NOT use:**
- No CMS, no database, no auth, no e-commerce.
- No UI kit that imposes its own visual language (no MUI, no Chakra, no Bootstrap). Tailwind + small handmade components only. `shadcn/ui` primitives are acceptable if they stay visually on-brand, but are not required.
- No animation-heavy libraries beyond a light, optional use of `framer-motion` for subtle fade/slide-in on scroll. Animations must respect `prefers-reduced-motion`.
- No analytics vendor beyond Vercel Analytics (optional) — do not add Google Tag Manager spaghetti.
- No phone number anywhere on the site (brand decision).
- No invented facts, testimonials, statistics, or imagery. Use only content from the brand docs and images provided in `/public/images`. If a piece of content is missing, insert a clearly-marked `{/* TODO: ... */}` placeholder rather than fabricating.

**Brand/design constraints (enforce globally):**
- **Colors** (define as Tailwind theme tokens, never hardcode hex in components):
  - `brand-blue #143B90` (primary: nav, headings accents, buttons, links)
  - `brand-green #007562` (secondary: icons, hovers, section accents)
  - `brand-yellow #FFF200` (accent only — fills/highlights; **never** as text or thin icons on white)
  - `ink #000000` (logo/wordmark, max-contrast detail)
  - `charcoal #1D1F1F` (body text)
  - `mist #E7E6E6` (alternate section backgrounds)
  - `white #FFFFFF` (primary background)
- **Color usage ratio** roughly 60% white / 25% blue / 10% green / 5% yellow.
- **Buttons:** blue `#143B90` fill, white text, Poppins Medium; hover → green `#007562`. Secondary button = outline (blue border, blue text). Maintain ≥ 4.5:1 text contrast.
- **Type:** Headings **Poppins** (H1 700, H2 600, H3 500). Body **Source Sans 3 / Source Sans Pro** (400 / 600). Type scale: H1 48–64px desktop (36–42 mobile), H2 32–40, H3 24–28, body 18–20, buttons 16–18. Max line length 70–80ch; constrain prose containers (≈`max-w-2xl`/`max-w-3xl`); page container ≈`max-w-6xl` (~1200px) centered.
- **Layout & whitespace:** generous spacing; mobile-first; use a consistent spacing scale (Tailwind defaults are fine). One clear primary CTA per section.
- **Voice:** plain, neighborly, farmer-first. Lead with the farm, then income, then community, then renewable energy. Never corporate buzzwords. (See brand voice rules.)

**Quality bars (must hold before "done"):**
- `npm run build` succeeds with **zero TypeScript errors** and **zero ESLint errors**.
- **WCAG 2.2 AA**: semantic landmarks, one `<h1>` per page, logical heading order, visible focus states, skip-to-content link, alt text on all meaningful images, labels on all form fields, keyboard-operable nav and form, color contrast ≥ 4.5:1 for text.
- **Core Web Vitals targets** (Lighthouse mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. LCP < 2.5s (hero image uses `priority`), CLS < 0.1 (explicit image dimensions, font `swap` with sized fallback), INP kept low (minimal client JS).
- Fully responsive at 360px, 768px, 1280px with no horizontal scroll.

---

## Success Criteria

Each page is "done" when it renders the sections below, uses real brand copy, is responsive, and passes the quality bars. Build pages in this order.

### 1. Global shell & design system
- `app/layout.tsx` sets `<html lang="en">`, loads fonts via `next/font`, renders a shared **Header** and **Footer**, and a **skip-to-content** link as the first focusable element.
- **Header:** horizontal logo (links home) + nav (Home · About Us · Projects · Contact) + a "Contact Us" button. Sticky, condenses on scroll. Mobile: meatball icon + accessible hamburger menu (keyboard + `aria-expanded`).
- **Footer:** logo + tagline "Farmer-first solar development."; email `info@goodideasolar.com`; LinkedIn; address `142 ½ Monticello Ave, Annapolis, MD 21401`; trust badges (SDVOSB, TenneSEIA, Bethesda Green); copyright. **No phone.**
- Tailwind theme tokens (colors, fonts, container) defined once and used everywhere. A small set of reusable components: `Button`, `Container`, `Section`, `Card`, `StatBlock`, `ProjectCard`, `TrustBadgeRow`.

### 2. `Home` (`/`)
Renders, in order: **Hero** (headline "Solar for the Farm, Not the Farm for Solar"; subheadline from brand docs; primary CTA "View Our Projects"; secondary "Contact Us"; real hero image with `priority`) → **Trust bar** ("Built by Farmers for Farmers" + 4 checks) → **By The Numbers** (208 Acres Partner Farmland · 44 Acres Dedicated to Solar · 4 Projects In Development · 10.93 MW Pipeline) → **Our Story** preview (+ link to About) → **The Problem** → **Our Solution** → **Why Good Idea Solar** (4 cards) → **Featured Projects** (3 cards: Libertytown Sheep Farm, Henderson County Sheriff's Office, Sandy Spring CSA + "View All Projects →") → **Meet the Team** preview → **Contact CTA** band. Copy comes verbatim from the Website Content Guide.

### 3. `About Us` (`/about`)
Renders: **Mission/intro** (the approved About copy, verbatim) → **Story timeline** (2013→today) → **Our Values** (Service, Trust, Partnership) → **How It Works** (6 steps) → **Why We're Different** → **Meet the Team** (name + title + headshot grid; headshots may be placeholders with initials until provided) → **FAQ** (accessible accordion, 6 Qs from the guide) → CTA "Talk With Our Team".

### 4. `Projects` (`/projects`)
- Intro + optional **map** (Mapbox showing the 4 project locations, or static fallback).
- A grid of **4 project cards** generated from `content/projects.json`.
- Each project has a **detail view** (either `/projects/[slug]` routes or accessible expandable cards) with: Project Hero (name, location, status) → Snapshot (capacity, partner farmland, solar footprint, status) → About (description) → Farm Impact (partner farmland / solar footprint / remaining ag land / agricultural use) → Community Impact → Photo gallery (use mapped images from Pointers) → CTA "Discuss Your Property". Prefer `/projects/[slug]` static routes generated from the JSON (better SEO).
- Do **not** display: revenue, landowner names, parcel addresses, interconnection/financial detail.

### 5. `Contact` (`/contact`)
- Headline "Let's Start the Conversation" + supportive body.
- Form fields: **Name, Email, Property Location, Approximate Acreage, Message** (no phone). Client + server validation; required-field handling; accessible labels and error messages; honeypot field for spam.
- Submits to a Route Handler / Server Action that emails `info@goodideasolar.com` via Resend. Shows success and error states without a full page reload. Button label "Send Message".
- Degrade gracefully: if `RESEND_API_KEY` is missing, the build still succeeds and the form shows a friendly "email us directly at info@goodideasolar.com" message instead of throwing.

### 6. SEO, metadata, and ops
- Per-page `metadata` (unique `<title>` ~50–60 chars and `description` ~150–160 chars) using the Next.js Metadata API; sensible Open Graph + Twitter tags with a default share image.
- **JSON-LD `LocalBusiness`/`Organization`** structured data in the root layout (name, url, logo, email, address, sameAs: LinkedIn).
- `app/sitemap.ts`, `app/robots.ts`, and a favicon set from the meatball icon (`/public/icons/`).
- `README.md` with setup/run/deploy instructions and the required env vars. `.env.example` listing `RESEND_API_KEY`, `CONTACT_TO_EMAIL=info@goodideasolar.com`, `NEXT_PUBLIC_MAPBOX_TOKEN`.

**Verification step (required before declaring done):** run `npm run build` and `npm run lint`; fix all errors. Run a Lighthouse pass (or `@lhci/cli` if available) on Home, About, Projects, Contact and confirm the score targets. Manually keyboard-tab through every page and the form. Summarize results in the final message.

---

## Out of Scope

- Blog / news / resources / case studies (v2).
- CMS, admin panel, user accounts, investor portal.
- E-commerce, quoting calculators, or savings estimators.
- Multi-language / i18n.
- Heavy 3D, video backgrounds, or scroll-jacking.
- Backend services beyond the single contact-email handler.
- Phone number, live chat, testimonials (none exist yet), fabricated metrics.

---

## Pointers

### Recommended project structure
```
app/
  layout.tsx            # html, fonts, header/footer, skip link, JSON-LD
  page.tsx              # Home
  about/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx   # generateStaticParams from projects.json
  contact/page.tsx
  api/contact/route.ts  # Resend handler (or a Server Action in contact/)
  sitemap.ts
  robots.ts
  globals.css           # @theme tokens (Tailwind v4)
components/
  ui/Button.tsx  Container.tsx  Section.tsx  Card.tsx  Accordion.tsx
  layout/Header.tsx  Footer.tsx  MobileNav.tsx  SkipLink.tsx
  sections/Hero.tsx  TrustBar.tsx  Stats.tsx  Story.tsx  Problem.tsx
            Solution.tsx  WhyUs.tsx  FeaturedProjects.tsx  TeamPreview.tsx  ContactCTA.tsx
  projects/ProjectCard.tsx  ProjectDetail.tsx  ProjectsMap.tsx
  contact/ContactForm.tsx
content/
  site.ts          # nav, footer, contact info, social links
  projects.json    # the 4 projects (schema below)
  team.ts          # roster: name, title, headshot
  faqs.ts
lib/
  seo.ts  schema.ts  cn.ts
public/
  images/   icons/   logo/   badges/
```

### Theme tokens (Tailwind v4 `@theme` in `globals.css`)
```css
@theme {
  --color-brand-blue: #143B90;
  --color-brand-green: #007562;
  --color-brand-yellow: #FFF200;
  --color-ink: #000000;
  --color-charcoal: #1D1F1F;
  --color-mist: #E7E6E6;
  --font-heading: "Poppins", sans-serif;
  --font-body: "Source Sans 3", sans-serif;
}
```
Body text uses `--color-charcoal` on white; headings may use `--color-ink` or `--color-brand-blue`. Buttons: `bg-brand-blue text-white hover:bg-brand-green`.

### `content/projects.json` schema (one object per project)
```json
{
  "slug": "libertytown-sheep-farm",
  "name": "Libertytown Sheep Farm",
  "code": "SBY1",
  "city": "Berlin",
  "state": "Maryland",
  "status": "In Development",
  "capacityKw": 3960,
  "capacityLabel": "3.96 MW",
  "partnerAcres": 81,
  "solarAcres": 20,
  "agUse": "Sheep grazing",
  "demonstrates": "Livestock agrivoltaics",
  "description": "The Libertytown Sheep Farm project supports the expansion of a local sheep farming operation onto a second property. The solar installation is being designed to allow continued grazing, with the panels serving as shade structures for livestock while creating a long-term source of farm income.",
  "images": ["/images/JSG_Sheep1.jpeg", "/images/JSG_Sheep2.jpeg", "/images/Sheep3.jpg"],
  "coords": { "lat": null, "lng": null }
}
```
Populate all four from the brand docs / spreadsheet:
1. **Henderson County Sheriff's Office** — Lexington, TN · 800 kW · 5 partner / 3 solar acres · Pasture · *community & public-sector partnership* · images: `Rutgers_Soy.jpeg` (placeholder until site photos arrive).
2. **Libertytown Sheep Farm** — Berlin, MD · 3.96 MW · 81 / 20 · Sheep · *livestock agrivoltaics* · images: `JSG_Sheep1.jpeg`, `JSG_Sheep2.jpeg`, `Sheep3.jpg`.
3. **Longridge Road** — Parsonsburg, MD · 4.17 MW · 102 / 14 · Agricultural land (corn/soybeans; designed for future hay) · *farm-community collaboration* · images: `JSG_Crops1.jpeg`, `Rutgers_Soy.jpeg`.
4. **Sandy Spring CSA** — Ashton, MD · 2.0 MW · 20 / 7 · Table crops · *agricultural innovation & food production* · images: `Rutgers_Peppers.jpeg`, `JSG_Crops2.jpeg`.

(`coords` may be left null; if null, the map shows a state-level marker or the static fallback. Do not guess exact coordinates.)

### Image assets available now (place in `/public/images`)
`JSG_Sheep1.jpeg`, `JSG_Sheep2.jpeg`, `Sheep3.jpg`, `JSG_Crops1.jpeg`, `JSG_Crops2.jpeg`, `Rutgers_Peppers.jpeg`, `Rutgers_Soy.jpeg`, `BG.png`. Logo: `final-01` (horizontal) + `Meatball` (icon) in `/public/logo`. Badges: SDVOSB + TenneSEIA in `/public/badges` (Bethesda Green = `{/* TODO badge */}`). Team headshots are **not yet available** — render initial-avatar placeholders. Convert large JPEGs to optimized formats via `next/image` (AVIF/WebP) automatically; give every image explicit `width`/`height` (or `fill` + sized container) to protect CLS.

### Contact handler (Resend)
- Server-only. Read `RESEND_API_KEY` and `CONTACT_TO_EMAIL` from env. Validate input (e.g., `zod`), reject if honeypot filled. Compose a plain, readable email (React Email optional). Return `{ ok: true }` / `{ ok: false, error }`. Never expose the API key to the client.

### Hero & performance specifics
- Hero image: `next/image` with `priority` and a correct `sizes`; it is the LCP element. Preload fonts; `display: swap`; pick a fallback metrics-matched font to minimize CLS.
- Lazy-load below-the-fold imagery and the Mapbox component (`next/dynamic`, `ssr:false`).
- Keep client JS minimal: only the mobile nav, the FAQ accordion, the contact form, and the map are client components.

### Accessibility specifics
- First focusable element is "Skip to main content" → `#main`.
- Nav is a `<nav aria-label="Primary">`; mobile toggle uses `aria-expanded`/`aria-controls`.
- FAQ accordion uses button + `aria-expanded` + region; fully keyboard operable.
- Form: every input has a `<label>`; errors announced via `aria-describedby`/`role="alert"`; focus moves to the first error.
- Respect `prefers-reduced-motion` for all animation.

### Copy & voice reminders
- Lead with the farm. Plain English. Preferred words: partner, farm, family, community, legacy, long-term, local, harvest. Avoid: asset, stakeholder, platform, synergy, disruption.
- Headline is fixed: **"Solar for the Farm, Not the Farm for Solar."** Short tagline elsewhere: "Built by Farmers for Farmers." Use stat figures sparingly; never fabricate.

---

## First Task

1. Scaffold the Next.js + TypeScript + Tailwind project and commit the empty shell that builds (`npm run build` passes).
2. Implement the **design system**: theme tokens, fonts, `Button`/`Container`/`Section`/`Card`, and the global **Header + Footer + skip link**.
3. Build the **Home** page end-to-end with real copy and the hero optimized for LCP.
4. Then **About**, then **Projects** (with `content/projects.json` + detail routes), then **Contact** (with the Resend handler and graceful no-key fallback).
5. Add **SEO/metadata, JSON-LD, sitemap, robots, favicons**, then run the **verification step** (build, lint, Lighthouse, keyboard pass) and report results.

Work page by page; after each page, run the build and a quick a11y check before moving on. Keep components small and reusable. If something required isn't in the brand docs, leave a clearly-marked TODO instead of inventing it.

---

## Appendix — Foundation & Sources

This spec synthesizes current best practices from 30+ public sources. Grouped for the team's reference.

**Prompting & spec-driven development for AI agents**
- OpenAI — Codex Prompting: https://developers.openai.com/codex/prompting
- OpenAI — Codex Best Practices: https://developers.openai.com/codex/learn/best-practices
- OpenAI — Custom instructions with AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- agents.md (official format): https://agents.md/
- GitHub — How to write a great agents.md (2,500+ repos): https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/
- GitHub — spec-kit: https://github.com/github/spec-kit
- GitHub Blog — Spec-driven development with Markdown: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-using-markdown-as-a-programming-language-when-building-with-ai/
- Addy Osmani — How to write a good spec for AI agents: https://addyosmani.com/blog/good-spec/
- Ischca — awesome-agents-md: https://github.com/Ischca/awesome-agents-md

**Stack (Next.js · Tailwind · Vercel · Resend · Mapbox)**
- Next.js — Learn: https://nextjs.org/learn
- Next.js — Project Structure: https://nextjs.org/docs/app/getting-started/project-structure
- Tailwind — Install with Next.js: https://tailwindcss.com/docs/guides/nextjs
- Next.js blog with MDX + Tailwind on Vercel: https://mattermost.com/blog/create-a-next-js-blog-on-vercel-using-mdx-and-tailwindcss/
- Resend — Send with Next.js: https://resend.com/docs/send-with-nextjs
- Contact form with Resend (App Router): https://jahir.dev/blog/create-contact-form-nextjs
- Mapbox with Next.js: https://dev.to/niharikak101/integrating-mapbox-with-next-js-the-cheaper-alternative-to-google-maps-g39
- ixartz — Next.js Landing Page Starter: https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template
- Vercel — Next.js templates: https://vercel.com/templates/next.js

**Design, UX & conversion**
- Modern web design principles: https://buildwithsimon.com/blog/web-design/modern-web-design-principles
- Visual hierarchy (Interaction Design Foundation): https://ixdf.org/literature/topics/visual-hierarchy
- Hero section best practices (Prismic): https://prismic.io/blog/website-hero-section
- High-converting landing pages (Unbounce): https://unbounce.com/landing-page-examples/high-converting-landing-pages/
- Above-the-fold optimization: https://www.stackmatix.com/blog/above-the-fold-optimization

**Accessibility (WCAG 2.2 AA)**
- WebAIM — WCAG 2 Checklist: https://webaim.org/standards/wcag/checklist
- W3C — WCAG 2.2: https://www.w3.org/TR/WCAG22/

**Performance (Core Web Vitals)**
- Core Web Vitals explained: https://www.corewebvitals.io/core-web-vitals
- How to improve Core Web Vitals: https://owdt.com/insight/how-to-improve-core-web-vitals/

**Architecture & design system**
- Next.js App Router structure that scales: https://makerkit.dev/blog/tutorials/nextjs-app-router-project-structure
- Tailwind design tokens (v4): https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026/
- Tailwind best practices & design-system patterns: https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns

**SEO**
- Local SEO best practices: https://yostrato.com/seo/seo-best-practices/
- Structured data / schema markup: https://www.gwcontent.com/blogs/news/structured-data-for-seo
- Meta descriptions (Search Engine Land): https://searchengineland.com/seo-meta-descriptions-everything-to-know-447910

**Solar / industry inspiration**
- Best solar website design examples (Hook Agency): https://hookagency.com/blog/solar-website-design-examples/
- 20 best solar website designs (CyberOptik): https://www.cyberoptik.net/blog/best-solar-website-designs/
