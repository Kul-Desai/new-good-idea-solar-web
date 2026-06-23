# Good Idea Solar — Website

Marketing website for Good Idea Solar (a farmer-first solar developer). Fresh build.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · deploy target Vercel.

## What's here
- `Good_Idea_Solar_Codex_SPEC.md` — the full build spec (read this first).
- `AGENTS.md` — operational guide for AI coding agents (Codex).
- `brand/` — brand guide, cheat sheet, and website content guide.
- `app/`, `public/`, config files — clean Next.js scaffold to build on.

Large source/brand binaries (pitch decks, logos in .ai/.eps, hi-res photos) are **not**
in this repo by design. They live locally in the `Good Idea Solar - Brand Assets` folder
(one level up). Drop only small, web-ready images into `public/` as the build needs them.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before deploy
npm run lint
```

## Initialize git and connect to a new GitHub repo
Run these in the VS Code terminal **on your Mac** (not in a sandbox). First create an
**empty** repo on github.com (no README, no .gitignore, no license).

```bash
# one-time cleanup: remove the leftover folder from setup
rm -rf .git_DELETE_ME

# fresh git history
git init -b main
git add -A
git commit -m "chore: fresh scaffold — Next.js + spec, brand docs, AGENTS"

# connect and push
git remote add origin https://github.com/Kul-Desai/new-good-idea-solar-web.git
git push -u origin main
```
Then import the repo in Vercel to deploy.
