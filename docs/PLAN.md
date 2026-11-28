# Architecture1 Next.js Rebuild — Plan

**Status:** Phase 1 complete (shell, routes, data, estimator, images) on a branch; awaiting the owner's write route and approval to continue.
**Prepared:** 28 November 2026. Supersedes the 27 November draft.

## Goal
Rebuild the bilingual architect portfolio as a Next.js App Router app while preserving every user-facing feature, and make it measurably lighter. The live site stays on GitHub Pages, so the app builds as a static export.

## Measured baseline (28 Nov, live site + local copy)
| Measure | Original | Phase 1 build |
| --- | ---: | ---: |
| Home JS (gzipped) | 439 KB | 194.5 KB |
| Home CSS (raw) | 113.3 KB | 36.3 KB |
| First-screen images | 776.8 KB | 118.9 KB |
| Total transfer at load | 1,609 KB | 1,101 KB |
| FCP / LCP (mobile, 1.6 Mbps, 4x CPU) | 4.8 s / 4.8 s | 1.78 s / 1.78 s |
| Long-task time | 1,102 ms | 184 ms |
| Project images on disk | 5.58 MB | 1.58 MB |
| Tour poster | 399 KB base64 inside a 545 KB script | 206 KB JPEG |

Lighthouse 12.8.2 mobile on the rebuilt home: Performance 79, Accessibility 96, Best practices 100, SEO 100, CLS 0, TBT 190 ms, LCP 4.9 s (Lighthouse's simulated model; the CDP-throttled measurement above is the more optimistic one).
axe (WCAG 2.1 A/AA) across 12 routes in ar and en: **0 serious or critical issues**.
Lighthouse on the original page could not be completed: the page hangs or crashes the headless renderer under three different configurations. The "before" figures above are direct transfer and timing measurements, not Lighthouse scores.

## The JS budget is an open deviation
A bare `create-next-app` page (Next 16.4.6, React 19.3, zero client components) ships **170.1 KB gzipped** of JavaScript across 6 chunks, measured in this workspace. The brief's budget of "Home <= 120 KB" predates this framework generation. The rebuilt home is 194.5 KB, i.e. ~24 KB above the floor rather than ~75 KB above the target. The brief's target is Home <= 120 KB gzipped. The build is 194.5 KB, so the target is **not met** and is recorded as an open deviation in OPEN-QUESTIONS.md with the floor measurement and the three options. An internal engineering call of ~200 KB per route has been made to keep working, but it is not the owner's approval and does not close the item.

## Phases
1. **Foundation + shell (done):** Next 16, TS strict, Tailwind v4 tokens, next-intl (en default per owner decision of 28 Nov 2026, ar RTL), Navbar/Footer/LocaleSwitcher, static export, per-route metadata, skip link.
2. **Data and logic (done):** `config/site.ts`, typed projects from the original data, estimator pricing + pure logic, quiz scoring, 12 unit tests (including the 3,310,000 / 20,688 default).
3. **Route parity (mostly done):** home, about, projects + case studies, reels, tour, lab (4 children), estimator. Remaining: intercepting `@modal` route for the lightbox, full parity sweep per route.
4. **Motion:** card hover, page transitions, scroll reveal — not started.
5. **Hardening:** image pipeline done for projects and poster; Lighthouse CI, CSP/headers, axe sweep still to do.
6. **Parity QA:** compare every PARITY.md item against the original, produce the final before/after report.

## Open risks
- Framework floor vs the 120 KB budget (above).
- The 3D tour remains a static bundle served from `public/tour`; porting it needs the original source.
- 54 gallery images still hot-link Behance/Kuula; they need downloading before launch or they will break if the CDN blocks hot-linking.
