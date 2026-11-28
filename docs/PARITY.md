# Architecture1 Feature Parity Checklist

This checklist is the acceptance record for the rebuild. Boxes remain unchecked until verified in the finished app.

## Localization and shared layout
- [x] English is the default locale (owner decision, 28 Nov 2026, overrides the brief's Arabic default); Arabic uses RTL and stays one click away; `/` always opens English and no language choice is stored (owner decision, 28 Nov 2026).
- [ ] English uses LTR; locale-prefixed routes, locale cookie, canonical and hreflang metadata work.
- [ ] Shared sticky navbar, mobile drawer, active-route state, hover/focus prefetch, contact CTA, language switch.
- [ ] Scroll progress, reduced-motion-aware reveal behavior, footer, social links and back-to-top.
- [ ] Every visible string, including labels, helper text, options, HUD text, aria-labels and WhatsApp content, is localized.

## Home and About
- [ ] Hero status, name, subtitle, description, three specialties, accreditation chips and portrait with floating badges.
- [ ] Hero CTAs for quiz, projects and WhatsApp.
- [ ] Stats: 50+ projects, zero violations, four engineers, 6+ compounds.
- [ ] Home includes short experience, education and contact sections plus image-led cards for Projects, Tour, Lab, Estimator and Reels.
- [ ] About has all three experience roles, seven skills/tools, three training items, six domains, education and full contact cards.

## Projects and case studies
- [x] 16 projects and all five filters: all, architectural, interior, retail and industrial. (e2e: 16 articles, filter round trip)
- [x] Industrial filter stays available and shows a localized empty state. (e2e)
- [ ] Cards preserve category, client, tools, gallery count and Behance CTA.
- [ ] Case-study route preserves localized title/description, full gallery and metadata.
- [x] Every project is a prerendered, directly addressable page (`/ar/projects/store/`). The intercepting modal route the brief asks for cannot exist under `output: 'export'` — recorded as OPEN-QUESTIONS 11, awaiting the owner.
- [x] Gallery viewer: large frame, thumbnails, previous/next image, previous/next project links, full-screen view with focus trap and Escape, arrow keys (RTL-aware), title, description, client and tools. Thumbnails are real links, so the page still works without JavaScript.

## Reels
- [ ] Six TikTok videos retain captions, profile CTA and individual video links.
- [ ] Poster/play facade; player iframe mounts only after tap.
- [ ] At most one TikTok player runs at a time.

## 3D villa tour
- [ ] Orbit, walk and plan modes; room bar; minimap; touch joystick.
- [ ] Day/evening toggle, auto-tour, fullscreen and language toggle.
- [ ] Tour language follows the active locale.
- [ ] Static poster appears first; tour iframe mounts on explicit start and unmounts on route leave.
- [ ] Tour is labelled accurately and remains a separately loaded static build.

## Lab
- [ ] Quiz: three questions, three choices each, exact scoring/tie-break, localized result title/description/materials/three swatches, progress, accessible keyboard flow, WhatsApp CTA and retake.
- [ ] Lighting: morning 09:00, sunset 17:30, night 21:00; localized time, temperature, altitude, shadows and “illustrative preview” label.
- [ ] Panorama: two rooms, pointer-based mouse/touch drag, measured seamless wrap, reset. Auto-rotate toggle exists but its label was `tour.drag_hint` in both states (fixed to a real label) and the reset button read "Retake Quiz" (fixed); the drag hint now sits under the viewer. Reduced-motion handling for the rotation itself still to check.
- [ ] Materials: three presets with image, localized name, specification tags, swatches, badge and preloaded crossfade.

## Estimator
- [ ] Four unit types, area 50–600 m² in steps of 5, default 160 m².
- [ ] Seven tiers with localized copy, rates, gifts and four feature lines.
- [ ] Add-ons and exact formula match the approved spec.
- [ ] Default state is Elite/apartment/160 m² with gypsum and door selected unless owner changes it.
- [x] Default total is exactly 3,310,000 EGP and 20,688 EGP/m². (e2e asserts 3,310,000 and 20,688)
- [ ] Materials/labor/supervision breakdown, timeline, milestones, warranty and gift box.
- [ ] AR/EN WhatsApp message and print-only-summary stylesheet; commercial disclaimers stay visible.

## Quality and delivery
- [ ] Every route has localized metadata, loading state and error state.
- [ ] Keyboard access, visible focus, AA contrast, skip link, landmarks and reduced motion.
- [ ] SEO: sitemap, robots, OpenGraph, Person and ProfessionalService JSON-LD. Shipped and live: sitemap, robots, JSON-LD (PR #7). Not done: OpenGraph image.
- [ ] Images use responsive AVIF/WebP, correct sizes, hero-only priority and fallback.
- [ ] Security headers/CSP allow only verified origins.
- [ ] Before/after Lighthouse and per-route bundle sizes are recorded; no unmeasured speed claims.
- [x] Typecheck, lint, unit tests, i18n parity, build, E2E route/interaction tests and axe checks pass. (npm scripts, local; not wired into CI, workflow scope not granted)
- [ ] Deployment target, domain and analytics are owner-approved.

## Phase 1 status notes
- [x] English default (owner decision), Arabic with RTL, locale switch and cookie persistence
- [x] Shared navbar, mobile drawer, footer, back-to-top, skip link
- [x] 16 projects with five filters (industrial shows a localized empty state)
- [x] Case-study route per project
- [ ] Intercepting `@modal` lightbox route: impossible under static export. Batch 2 ships a lazy client quick view with `?project=slug` URL state, deep link and the prerendered page as fallback (e2e covered).
- [x] Reels with click-to-load facades, one player at a time
- [x] Tour poster + start gate; bundle served from `public/tour`
- [ ] Lab: quiz scored and exercised in EN and AR (28 Nov); lighting, materials and panorama drag were found static or broken on 28 Nov and repaired, re-exercised in both locales. Earlier "[x]" here was not backed by an exercised control.
- [x] Estimator with tested default 3,310,000 / 20,688, WhatsApp CTA, print
- [x] About: experience, skills, training, domains, education, contact
- [ ] Scroll reveal and page transitions (Phase 4)
- [x] Axe sweep: e2e runs axe on 11 routes in EN and AR, no serious issues (28 Nov)
- [ ] CSP headers (GitHub Pages: meta CSP only) and Lighthouse CI wiring

## Motion (phase 4, in progress)

- Scroll reveal: `src/components/ui/reveal.tsx` — IntersectionObserver, transform/opacity only, server HTML stays visible without JS, disabled under `prefers-reduced-motion` (globals.css).
- Reading progress: `src/components/ui/scroll-progress.tsx` + `.scroll-progress` in globals.css — 2 px olive hairline, CSS scroll-driven animation (`animation-timeline: scroll(root block)`), no JavaScript, grows from the inline start in both directions, hidden under reduced motion and absent in browsers without support.
- Still to do: hover choreography on the home cards, page transitions (blocked: View Transitions need a client-side router transition, and the static export has no server; documented rather than faked).

## Verification log (28 Nov 2026, phase 1)

Checked directly against the built export, not by reading code alone:

- Links: all 59 exported pages crawled, 2,773 internal `href`/`src` targets resolved against the export, 0 broken.
- Metadata: every content page in both locales has a title and a description. Only the 404, `_not-found` and the redirect stubs (`/`, `/tour/`, `/ar/lab/`, `/en/lab/`) have none, by design.
- i18n: 277 keys in each locale, identical key sets, no empty values, no hardcoded Arabic string literals in any `.tsx`.
- Accessibility: axe (WCAG 2.0/2.1 A+AA) reports 0 serious or critical violations on 12 routes, including the project page with the gallery open in its default state.
- Interaction, verified in headless Chrome on `/ar/projects/store/` and `/en/projects/store/`: arrow keys advance the gallery (ArrowLeft advances in Arabic), the full-screen view opens and closes with Escape, the previous/next project links resolve to real slugs.
- Motion: reading-progress bar at scale 0 at page top and 0.65 at half scroll; it grows from the right in Arabic and the left in English (pixel-sampled).
- Copy bugs found by inspection and fixed: the panorama auto-rotate button was labelled with the drag hint in both states, its reset button read "Retake Quiz", and four lab pages plus About had no meta description.

Still open on this checklist: item 8 (the 3D tour needs its original source), and a full copy-by-copy comparison of every route against the prompt, which has not been done route by route yet.

## Navbar (checked 28 Nov)

- Lab opens a menu with its four tools (Quiz, Lighting, Panorama, Materials), on hover and on keyboard focus, in both locales; the Lab link itself still navigates, so touch users are never stuck. Plain CSS in globals.css (`.nav-menu`), no JavaScript.
- Nav labels no longer wrap onto two lines at 1280-1440 px (`whitespace-nowrap`).
- Still missing against the prompt: `loading.tsx` and `error.tsx` per route. Under `output: 'export'` there is no server render to suspend on, so a loading state would never appear; that is a documented deviation, not an oversight. An error boundary per route is still worth adding.

## Estimator print (28 Nov)

- Print stylesheet added: site header, footer, nav, inputs and buttons are hidden, the summary prints alone on white (`.print-hide`, `.print-summary` in globals.css). Not yet checked in a real print preview.

## Copy parity against the original (28 Nov, scripted)

The 238 translation keys in the original `script.js` (ar and en) were extracted and compared with the rebuilt message files. 238 of 238 keys exist in both locales. Three values differ on purpose: `est.m2` (original held an add-on phrase instead of the unit, see OPEN-QUESTIONS 8), `nav.lab` (emoji icon removed, label kept) and `ba.hint` (leading emoji removed). Nothing else was reworded.

## Panorama and print (28 Nov, verified in headless Chrome)

- Panorama loop width is measured from the rendered image with ResizeObserver (1600 px at 1280 viewport); rotation runs only while the viewer is on screen (IntersectionObserver) and never under `prefers-reduced-motion`, where the toggle is disabled. Verified: normal motion moves 29 px in 0.8 s; with reduced motion the offset stays 0. Off-screen pausing not independently verified (the page is too short to scroll the viewer fully out of view).
- Estimator print emulation: header, footer, nav, inputs and buttons compute to display:none; the summary prints alone, 1 A4 page, correct figures (3,310,000 EGP; 20,688 EGP/m²; 15-18 weeks).
- `error.tsx` added at `[locale]` level (retry button, ar/en copy). `loading.tsx` is intentionally absent: a static export has no server render to suspend on.

## How the LCP / performance numbers are measured

- Lighthouse cannot score the original page in this environment (PAGE_HUNG, renderer crash, timeout). The before/after comparison therefore uses the same Chrome DevTools Protocol trace for both sites: mobile emulation (390x844, DPR 2), CPU and network throttled, FCP/LCP/CLS from PerformanceObserver, transfer sizes from Resource Timing. Script: the `measure2.mjs` pattern (puppeteer-core, google-chrome headless).
- Result: original FCP/LCP 4.80 s; rebuilt 1.78 s. Lighthouse's own simulated model scores the rebuilt home LCP higher (5.0 s) than the direct trace, because it simulates a slower CPU and network than the trace applies. The 2.0 s target is met by the trace and not by the Lighthouse model; both are recorded, neither is hidden. Re-measure on a real device or deployed URL to settle it (OPEN-QUESTIONS 10).
- JS per route: gzip of every unique `<script src>` listed in the exported HTML (`jsbudget2.mjs` pattern).
