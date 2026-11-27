# Architecture1 Next.js Rebuild — Plan

**Status:** Phase 0 draft, awaiting owner approval before scaffolding  
**Prepared:** 2026-11-27  
**Scope:** Planning and parity audit only. No application scaffolding or feature changes are authorized until Phase 1 is approved.

## Goal

Rebuild the existing bilingual architect portfolio as a structured Next.js App Router application while preserving every user-facing feature and copy item in [PARITY.md](./PARITY.md). Improve route-level loading, accessibility, RTL support, maintainability, and measured performance. Keep the existing GitHub Pages site intact until a replacement build is approved and a deployment target is confirmed.

## Current repository baseline

Measured from the current `main` tree at commit `f9f306e308baae66d46d42e07e11670958c9256b`:

| Measure | Baseline |
| --- | ---: |
| Repository files | 36 blobs |
| Total tracked file bytes | 8,455,608 bytes (8.06 MiB) |
| `index.html` | 90,162 bytes |
| `script.js` | 98,761 bytes |
| `style.css` | 115,698 bytes |
| Main HTML/CSS/JS source total | 304,621 bytes |
| `villa-tour/index.html` | 897,425 bytes |
| `assets/villa-tour-facade.js` | 545,181 bytes |
| `assets/showreel.mp4` | 744,178 bytes |

Project data was read from the current script: 16 projects (4 architectural, 10 interior, 2 retail); the industrial filter has no matching item.

**Lighthouse baseline:** not recorded. Lighthouse/LHCI are not installed in the available environment and the browser automation surface is unavailable in this turn. These raw source sizes are not gzip bundle sizes and are not a substitute for Lighthouse. Before accepting Phase 0, run Lighthouse CI against the current published home page and the estimator, projects, lab, and tour routes; preserve the JSON reports and exact mobile throttling/configuration. Do not claim performance gains until the rebuilt routes are measured against those reports.

## Findings and constraints

- The repo is still a static HTML/CSS/JS site; there is no existing Next.js app or local working checkout in the current workspace.
- The current tour HTML has changed since the supplied audit: it is 897,425 bytes, not 594 KB.
- The current homepage references `assets/villa-tour-facade.js`; it must not be removed as “dead” without tracing its effect and obtaining owner approval.
- The main page has six lazy TikTok player iframes; projects already render cover images with native lazy loading.
- The 3D tour is in a separate iframe. Keep it out of the initial app bundle and preserve its features.
- The estimator’s displayed and computed default totals must be reconciled before migration; preserve the exact default formula and record any owner decision.
- Image assets and user-facing business claims require the questions in [OPEN-QUESTIONS.md](./OPEN-QUESTIONS.md) before they are deleted, changed, or published as verified claims.

## Proposed architecture

Follow the requested locale-prefixed App Router structure: `/[locale]`, `about`, `projects`, `projects/[slug]` with an intercepting modal route, `reels`, `tour`, `lab` with quiz/lighting/panorama/materials children, and `estimator`. Default locale is Arabic; English uses LTR. Each route owns its data and lazy-loads heavy client features. Keep shared contact details and WhatsApp URL construction in `config/site.ts`, and all estimator rates in one typed pricing module.

The tour is Phase A only: serve the supplied single-file bundle as a static asset, show a poster first, and mount its iframe only after an explicit start action. Do not port its internals to React Three Fiber without the original tour source and owner approval.

## Phases and gates

1. **Phase 1 — Foundation:** latest stable Next.js, strict TypeScript, Tailwind v4, next-intl, source-owned shadcn/Radix primitives, locale shell, tokens, navigation, fonts, CI and repo instructions. Gate: build passes; Arabic shell renders RTL and English shell LTR.
2. **Phase 2 — Shared data and logic:** typed project/content data, centralized contact/pricing, estimator and quiz pure logic, i18n parity tooling. Gate: required estimator default equals 3,310,000 EGP and 20,688 EGP/m²; quiz tie-break and locale checks pass.
3. **Phase 3 — Route parity:** implement routes and feature checklists in [PARITY.md](./PARITY.md), one route at a time. Gate: each route meets its parity items, metadata and loading/error states.
4. **Phase 4 — Motion:** cards, transitions, and scroll reveal. Gate: transform/opacity-only motion, reduced-motion support, no layout shift.
5. **Phase 5 — Hardening:** image pipeline, bundle analysis, accessibility/SEO, Lighthouse CI budgets and security headers. Gate: measured target thresholds from the brief pass or exceptions are approved.
6. **Phase 6 — Parity QA:** AR/EN route coverage, keyboard and screen-reader behavior, final before/after Lighthouse and bundle report. Gate: all parity boxes checked; deployment reviewed and approved.

## Performance measurement protocol

- Capture current Lighthouse JSON for Home, About, Projects, Estimator, Lab, Reels, and Tour before Phase 1. Use the same Chrome/Lighthouse version, mobile emulation, throttling and run count after the rebuild.
- Capture per-route initial JavaScript and CSS bundle bytes plus gzip sizes. Exclude the tour payload from ordinary routes, but record its payload separately before and after.
- Track LCP, CLS, INP, Lighthouse Performance, Accessibility and SEO. Do not state a speed-up without comparable numbers.
- Keep reports and commands in `docs/performance/` once implementation is approved; no such scaffolding has been created in Phase 0.

## Required approval

Review this plan and the feature checklist. Approve Phase 1 only after the missing Lighthouse baseline is captured or explicitly waived, and after the open business/content questions are answered. No Next.js scaffolding, dependency installation, feature removal, or deployment is part of Phase 0.
