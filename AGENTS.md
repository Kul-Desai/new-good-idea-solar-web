# AGENTS.md — Good Idea Solar Website

Operational guide for AI coding agents working in this repo. Keep this file lean and operational; the *what to build* lives in `Good_Idea_Solar_Codex_SPEC.md` and the brand docs under `brand/`. Read the spec before starting.

## Project
Marketing website for Good Idea Solar — a farmer-first solar developer. Four pages: Home, About Us, Projects, Contact. Goal: a fast, accessible, trustworthy "online business card." Not a web app.

## Stack
- Next.js 15+ (App Router) · TypeScript (strict) · React Server Components by default
- Tailwind CSS v4 (CSS-first `@theme` tokens; v3 fallback acceptable)
- next/font (Poppins + Source Sans 3), next/image
- Resend (`resend`) for the contact form, called server-side only
- Mapbox via `react-map-gl` (optional, lazy-loaded, with a static fallback)
- Node 20+, npm, deploy target Vercel

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build (must pass before done): `npm run build`
- Lint (must pass before done): `npm run lint`
- Type check: `npx tsc --noEmit`
- Start prod: `npm start`

## Project structure
- `app/` — routes only (`page.tsx`, `layout.tsx`, `api/contact/route.ts`, `sitemap.ts`, `robots.ts`, `globals.css`)
- `components/` — `ui/`, `layout/`, `sections/`, `projects/`, `contact/`
- `content/` — `site.ts`, `projects.json`, `team.ts`, `faqs.ts` (site copy/data; no fabrication)
- `lib/` — `seo.ts`, `schema.ts`, `cn.ts`
- `public/` — `images/`, `icons/`, `logo/`, `badges/`
- `brand/` — brand guide, content guide, cheat sheet, project data (source of truth for copy)
Server Components by default; add `"use client"` only for the mobile nav, FAQ accordion, contact form, and map.

## Code style
- TypeScript strict; no `any`. Functional components. Named exports for components.
- Tailwind utilities in markup; **use theme tokens, never hardcoded hex** (`bg-brand-blue`, not `bg-[#143B90]`).
- Keep components small and reusable; colocate by feature.
- Run the project's formatter/linter; fix all warnings. Prettier + ESLint (`next/core-web-vitals`).
- Accessible by default: semantic HTML, one `<h1>` per page, labels on inputs, visible focus, `prefers-reduced-motion`.

## Git workflow
- Conventional commits (`feat:`, `fix:`, `chore:`, `style:`, `docs:`).
- Small, page-scoped commits; ensure `npm run build` passes before each commit.
- Do not commit secrets or `.env*` (only `.env.example`). Do not commit `node_modules` or `.next`.

## Boundaries (ask or leave a TODO; do not improvise)
- No phone number anywhere (brand decision).
- No fabricated copy, stats, testimonials, coordinates, or images — if missing, insert a clearly-marked `{/* TODO */}` and an initial-avatar/placeholder.
- Do not add a CMS, database, auth, analytics vendors (Vercel Analytics only), or heavy UI kits.
- Do not change brand colors, fonts, the hero headline, or the four-page IA without explicit instruction.
- Do not publish project revenue, landowner names, parcel addresses, or financial detail.
- Site must build and run even if `RESEND_API_KEY` / `NEXT_PUBLIC_MAPBOX_TOKEN` are absent (graceful fallbacks).

## Environment variables (see `.env.example`)
- `RESEND_API_KEY` — server-only, contact email
- `CONTACT_TO_EMAIL` — defaults to `info@goodideasolar.com`
- `NEXT_PUBLIC_MAPBOX_TOKEN` — optional, projects map

## Definition of done
`npm run build` and `npm run lint` clean · responsive at 360/768/1280 · keyboard-navigable · Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95 · metadata + JSON-LD + sitemap + robots + favicons in place · all four pages match the spec and use real brand copy.
