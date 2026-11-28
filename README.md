# Architecture1 — Next.js portfolio

The bilingual (AR default / EN) portfolio of Eng. Hassan Ahmed, rebuilt as a Next.js App Router
application with a static export, so the existing GitHub Pages site can keep serving it.

## Scripts
- `npm run dev` — local development
- `npm run build` — static export into `out/`
- `npm run typecheck` / `npm run lint` / `npm test`
- `npm run images` — rebuild the tour poster and recompress project images

## Routes
`/ar`, `/ar/about`, `/ar/projects`, `/ar/projects/[slug]`, `/ar/reels`, `/ar/tour`,
`/ar/lab/{quiz,lighting,panorama,materials}`, `/ar/estimator` — each mirrored under `/en`.
`public/index.html` sends `/` to the visitor's last locale (Arabic by default).

## Deploying to GitHub Pages
`npm run build` writes `out/`. Publish that folder (for example with an `actions/deploy-pages`
workflow) and keep `.nojekyll` in it so `_next/` is served. Nothing is published automatically.

## Where things live
- `src/config/site.ts` — phone, email, socials, WhatsApp builder (the only place they exist)
- `src/features/estimator/pricing.ts` — every price (the only place they exist)
- `src/features/projects/data.ts` — the 16 projects and their galleries
- `src/i18n/messages/{ar,en}.json` — all visible copy
- `docs/` — plan, parity checklist, open questions

## Deployment (GitHub Pages)

The live site is served from `https://hassanahhmd.github.io/Architecture1/`, so the build needs a base path.

- `.github/workflows/deploy.yml` builds the static export (`BASE_PATH` comes from `actions/configure-pages`) and publishes `./out` with `upload-pages-artifact` and `deploy-pages` on every push to `main`.
- One-time setting, done by the owner: **Settings > Pages > Build and deployment > Source = "GitHub Actions"**.
- Safe order: merge the PR first (the old root `index.html` stays in `main`, so the current site keeps serving while Source is still "Deploy from a branch"), then switch Source to "GitHub Actions" and run the "Deploy to GitHub Pages" workflow once (Actions tab > Run workflow).
- If the build, lint, tests or deploy fail, the deploy job does not run and the last published site stays up.
- Local work and tests use no base path (`npm run build`). To test the Pages build: `BASE_PATH=/Architecture1 npm run build`.
