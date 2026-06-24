# Foundational Planning Prompt — Good Idea Solar Website

You are a senior front-end engineer and design-systems lead. Before writing any code, produce a complete build plan for a new marketing website. Do **not** scaffold or generate components in this step. Your only output is a structured plan I will review and approve.

Read `AGENTS.md` and `Good_Idea_Solar_Codex_SPEC.md` in the repo root first and treat them as the source of truth, along with the three brand docs under `brand/`. If anything below conflicts with those files, flag the conflict rather than silently choosing.

## Project context

Good Idea Solar is a farmer-first solar development company. Core message: **"Solar for the Farm, Not the Farm for Solar."** We partner with family farms to create long-term income through solar development while keeping farmland productive and strengthening rural communities. Founder Justin Aydelotte inherited a family farm that was losing money; putting a small portion into solar kept it profitable and in the family, and became a mission to help other farmers do the same.

Every visitor must leave understanding five things: (1) who we are, (2) why we exist, (3) how we help farms, (4) why we differ from traditional developers, (5) how to get in touch. If those five are clear, the site succeeds.

## Tech stack (fixed)

Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel. Use `next/image` for all imagery, `next/font` for self-hosted Google Fonts, and a component-driven structure. Architect for a future headless CMS (e.g., Sanity) without later restructuring: keep Projects and editable copy in typed data modules now, not hardcoded in JSX.

## Information architecture

Primary nav (keep to four items): **Home, About Us, Projects, Contact.** Plan each page's section order.

In addition, build one dedicated conversion landing page — **Partner Your Land** (`/partner-your-land`) — reached via a standout primary CTA button in the header ("Get a Free Property Analysis"), **not** a fifth nav link. This is the single focused conversion funnel.

- **Home:** photographic hero (headline + dual CTA: View Our Projects / Contact Us); positioning intro; "By The Numbers" stat band (208 Acres partner farmland, 44 Acres solar, 4 Projects, 10.93 MW pipeline); how-we-help section following the message hierarchy (Productive Farmland → Long-Term Income → Community Benefit → Renewable Energy); a process section; featured projects; trust-signal strip; closing CTA band.
- **About Us:** founder story, mission, core values (Service, Trust, Partnership), team, FAQ.
- **Projects:** index of project cards linking to individual project pages with this exact structure — Project Hero, Snapshot, About the Project, Farm Impact, Community Impact, Development Timeline, Photo Gallery, Contact CTA.
- **Contact:** simple form (name, email, property location, approximate acreage, message), `info@goodideasolar.com`, address (142½ Monticello Ave, Annapolis, MD 21401), LinkedIn. **No phone number published on the site.**
- **Partner Your Land (`/partner-your-land`):** the conversion landing page — hero (emotional, farmer-outcome-led) → benefit cards → "Our Process" how-it-works → **"Is your farm a good fit?" self-qualification checklist** (static; not a calculator) → trust strip (SDVOSB, TenneSEIA, Bethesda Green) → FAQ accordion → **multi-step "Get a Free Property Analysis" lead form** (progress bar; Step 1 name/email/optional phone, Step 2 location/acreage/land use, Step 3 message/consent; zod validation; honeypot/Turnstile; Resend email; graceful no-key fallback). Phone is collected **optionally** for follow-up and never displayed back.

## Design system (build this FIRST, before any page)

Define tokens once in `tailwind.config` / `globals.css`. Every component references tokens — never raw hex, never ad-hoc spacing.

- **Colors:** Blue `#143B90`, Green `#007562`, Yellow `#FFF200`, Black `#000000`, Charcoal `#1D1F1F`, Light Gray `#E7E6E6`, White `#FFFFFF`. Usage ratio ~60% white / 25% blue / 10% green / 5% yellow. Body text is Charcoal; logo/wordmark pure black. **Buttons:** blue fill, white text. Yellow is fill/accent only — **never yellow text on white** (fails contrast).
- **Typography:** headings Poppins (700/600/500), body Source Sans Pro (400/600), loaded via `next/font`. Define a full type scale (display, h1–h4, body, small) with deliberate line-heights and letter-spacing. **No serif** — editorial contrast comes from Poppins size/weight, a small uppercase eyebrow, and restrained body.
- **Spacing:** 8px base scale. Define section vertical rhythm (generous whitespace) and a single max-width content container.
- **Radius & shadow:** one border-radius scale and one soft shadow token used everywhere.
- **Standard components (plan props for each):** Button (primary blue / secondary outline-pill), Card (rounded, soft border), StatCard, SectionHeader (eyebrow pill + heading + subcopy), Nav, Footer, CtaBand, ProjectCard, ProcessStep, TrustStrip, IconFeature, FaqAccordion, LandFitChecklist, PropertyAnalysisForm (multi-step).

## Aesthetic direction

Warm, rural, authentic, competent — **never** corporate, techy, futuristic, or buzzword-heavy. Photography leads (real farms, people; no generic stock, no futuristic renders).

**Imagery strategy (see `Image_Art_Direction.md`):** the real photos in `/public/images` are general/mood imagery — use them on Home/About/Contact/Partner Your Land, integrated so they never look pasted, but **never** label them as a specific project. The four projects use **AI-generated, clearly-representative placeholder images** (generated to one unified photographic style so they blend with the real photos) until real site photos arrive. Plan for a `/public/images/projects/` set and an optional generated hero; account for how/when these get generated.

We studied four peer sites for **architecture, layout, and conversion patterns only — never their copy, images, icons, or assets.** Translate every pattern into our palette and voice:

- **Pivot Energy land landing page** — the template for `/partner-your-land`: emotional, land-owner-centric hero; icon benefit cards; repeated single-action CTAs all anchoring to one form; a numbered "Is your land a good fit?" qualifier; a multi-step "Free Property Analysis" form with a progress bar.
- **Lightstar** — audience-segmented framing (Landowners / Community / Municipalities), a stat band, a small "where we operate" map (we're active in MD & TN), and an association-membership logo strip. Avoid their long walls of corporate "our journey" prose.
- **Hyperion Systems** — our closest peer ("Farmer First Solar"); validates the positioning. Borrow the "Why Farmers Like It / Why Communities Like It" content split and real founder-in-the-field photography/video. (They publish a phone number; we do not.)
- **BlueWave** — clean, polished cards and an FAQ accordion answering the exact farmer questions ("Is my property a good fit?", "Can I keep farming?", "no cost to evaluate"). Adopt that FAQ pattern and its calm grid.

**Guardrails (stay on-brand):** substitute Light Gray `#E7E6E6` for the warm "cream" these peers use; large accent blocks use Green `#007562` with Yellow `#FFF200` only as a small accent (never large yellow fills or yellow text); no serif fonts; generous whitespace, one radius scale, one soft shadow, rounded panels. Yellow appears only as a small accent.

## Content & voice

Plain, confident, service-oriented. "We partner with farmers." Lead with the farmer outcome, not dollar figures; keep detailed financials off the public site. No em dashes, no buzzwords, no stacked courtesies. Surface these trust signals: Family-Farm Founded; Service-Disabled Veteran-Owned Small Business; Member of TenneSEIA; Member of Bethesda Green; active in Maryland & Tennessee.

## Technical requirements

Plan for: semantic HTML and WCAG 2.2 AA accessibility (contrast, visible focus states, alt text, keyboard-operable nav/forms, multi-step form focus management); SEO (per-page metadata, Open Graph, sitemap, robots, JSON-LD Organization schema); mobile-first responsive layouts; form handling with validation and spam protection (Resend + zod + honeypot/Turnstile; graceful fallback if `RESEND_API_KEY` is absent); an analytics hook (Vercel Analytics only); and Core Web Vitals (optimized images, controlled font loading, minimal client JS). Use the horizontal primary logo in header/footer and the meatball/secondary logo for favicon and mobile nav.

## Deliverables for this planning step

1. Proposed file/folder structure (app routes including `/partner-your-land` and the form handler, components, data, lib, public assets).
2. Full component inventory — one-line purpose and key props each, including `PropertyAnalysisForm`, `LandFitChecklist`, `FaqAccordion`, `CtaBand`, `IconFeature`.
3. The exact design-token definitions for `tailwind.config` / `globals.css`.
4. Section-by-section wireframe outline for every page **including Partner Your Land and the multi-step form flow** (text description, no code).
5. Recommended build order (tokens → primitives → layout → core pages → Partner Your Land → content wiring → polish).
6. Open questions, assumptions, and anything that conflicts with `AGENTS.md` / `Good_Idea_Solar_Codex_SPEC.md`.

Present the plan as structured markdown and wait for my approval before generating any code.
