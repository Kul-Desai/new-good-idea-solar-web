# Image Art Direction — Good Idea Solar

How imagery works on this site: where the real photos go, how to generate on-brand placeholder imagery for the four projects, and the one rule that keeps it all honest.

## The honesty rule (non-negotiable)

Good Idea Solar's whole value is trust with farmers. So:
- **Real photos** in `/public/images` are authentic general/mood imagery (farms, livestock, crops). They may appear anywhere they fit, but are **never** captioned or used as a specific named project.
- **Project images are AI-generated, representative placeholders** until real site photos arrive. They must be **disclosed** as representative — a small caption ("Representative image — site photography coming soon") and/or alt text that doesn't claim to be the actual site — and carry a `{/* TODO: swap for real site photo */}` in code.
- Never generate fake logos, fake signage, fake people presented as named team members, or fake awards.

## One unified photographic style (so real + generated blend)

Everything — real photos and generated images — should read as one cohesive set: **warm, rural, documentary, authentic.** Think a skilled editorial/agricultural photographer, not stock and not a 3D render.

- **Light:** golden hour or soft overcast; warm, natural, directional. No hard midday glare, no studio light.
- **Palette in-camera:** greens of healthy farmland, warm earth tones, big natural sky. Lets the brand blue/green sit comfortably alongside.
- **Mood:** calm, hopeful, grounded, lived-in. Real working farms in the US Mid-Atlantic / Tennessee.
- **Subjects:** family-scale farms, livestock and crops, and **agrivoltaics** — solar panels integrated *with* active farming (sheep grazing under/around arrays, crops between rows), never replacing it. Panels look modern, clean, realistically proportioned and installed.
- **Composition:** generous negative space (room for headlines/overlays), natural depth, slight imperfection. Documentary, not posed-corporate.
- **Avoid:** futuristic/sci-fi panels, glossy CGI sheen, neon, lens flare overload, fisheye, oversaturation, drone-render look, generic city/office, identifiable real brand logos, warped/melting panels, text or watermarks baked into the image.

## Technical specs

- **Format/size:** JPG, sRGB. Heroes/full-bleed ~2400×1350 (16:9). Project cards ~1600×1200 (4:3). Keep full resolution; `next/image` optimizes at serve time.
- **Naming & location:** project images → `/public/images/projects/{slug}-1.jpg`, `{slug}-2.jpg` (slugs: `henderson-county`, `libertytown-sheep-farm`, `longridge-road`, `sandy-spring-csa`). Generated hero/mood → `/public/images/generated/`.
- **Count to start:** one strong card/hero image per project is enough for v1; add 1–2 gallery images per project if time allows. Generate the homepage hero too (see below) if no real photo is strong enough.
- **Consistency:** reuse the same style block (below) across every prompt so the set feels shot by one photographer on one trip.

## Shared style block (prepend to every generation prompt)

> Documentary agricultural photography, US Mid-Atlantic family farm, golden-hour natural light, warm and authentic, realistic modern solar panels integrated with active farming (agrivoltaics), lush natural greens and warm earth tones, big natural sky, shallow-to-medium depth of field, generous negative space, photojournalistic and lived-in, shot on a full-frame camera with a 35mm lens. No text, no logos, no watermarks, no futuristic or CGI look, no oversaturation.

## Per-project generation prompts (representative — not the real sites)

Each uses the shared style block + the project's real character. These illustrate the *type* of farm and agrivoltaic use; they are not depictions of the actual parcels.

1. **Henderson County Sheriff's Office (Lexington, TN · 800 kW · pasture · public-sector partnership)**
   "…open Tennessee pasture under a warm sky, a modest, tidy ground-mounted solar array along the edge of a grazing field, rolling green hills behind, a sense of a well-kept community/public property, calm and orderly."

2. **Libertytown Sheep Farm (Berlin, MD · 3.96 MW · sheep grazing · livestock agrivoltaics)**
   "…a flock of sheep grazing peacefully beneath and between rows of solar panels on flat Maryland coastal-plain farmland, panels acting as shade structures, healthy pasture, early-morning golden light, the picture of solar and livestock coexisting."

3. **Longridge Road (Parsonsburg, MD · 4.17 MW · row crops, corn/soybeans → future hay · farm-community)**
   "…broad Maryland row-crop field (corn and soybeans) with solar panels set along and within the working farmland, wide flat horizon, warm late-afternoon light, productive and abundant, community farmland feel."

4. **Sandy Spring CSA (Ashton, MD · 2.0 MW · table crops · food production / agricultural innovation)**
   "…a vibrant community-supported-agriculture market garden with rows of mixed table crops (peppers, leafy greens) beside an elevated/dual-use solar array, hand-scale farming, baskets of fresh produce, hopeful and colorful, soft morning light."

## Homepage hero (generate if no real photo is strong enough)

> [shared style block] Two farmers standing together in a green field at golden hour, looking out over their land with modern solar panels integrated along the field edge, warm and hopeful, lots of sky and negative space on one side for a headline. Wide 16:9.

This mirrors the "two-farmers-in-field" warmth from the reference designs, in our own setting.

## Placement guidance for the REAL photos (integrate, don't paste)

Goal: each real photo looks deliberately art-directed, not dropped in. Favor full-bleed bands with a soft dark or brand-blue overlay for text legibility, duotone/“mist” treatments for supporting sections, and consistent aspect-ratio crops.

- **`JSG_Sheep1.jpeg` / `JSG_Sheep2.jpeg` / `Sheep3.jpg`** → Home "how we help / livestock" band, About story, or Partner Your Land benefits (sheep + solar coexistence).
- **`JSG_Crops1.jpeg` / `JSG_Crops2.jpeg`** → Home "Our Solution" / productive-farmland section; About.
- **`Rutgers_Peppers.jpeg` / `Rutgers_Soy.jpeg`** → crop/food-production supporting columns on Home/About; Contact page side image.
- **`BG.png`** → subtle background texture/section divider only (it's a graphic, not a photo).
- Apply one consistent treatment system (overlay opacity, radius, crop ratios) so real and generated imagery share a look.

## How to generate the images (two paths)

Codex doesn't "paint" images itself; it generates them by calling an image model. Either:
1. **Scripted (recommended if you have an OpenAI API key):** Codex writes a small Node/Python script that calls an image API (e.g., `gpt-image-1`) using the prompts above and writes files to `/public/images/projects/`. Requires `OPENAI_API_KEY` in the environment; keep it server/local only, never commit it.
2. **Manual:** generate from the prompts above in any image tool, then drop the files into the correct `/public/images/...` paths with the naming convention. Codex wires them in.

Whichever path, keep the shared style block constant for a cohesive set, and treat every generated image as a representative placeholder to be swapped for real site photography.
