# Architecture1 Feature Parity Checklist

This checklist is the acceptance record for the rebuild. Boxes remain unchecked until verified in the finished app.

## Localization and shared layout
- [ ] Arabic is the default locale, uses RTL, and persists the language choice.
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
- [ ] 16 projects and all five filters: all, architectural, interior, retail and industrial.
- [ ] Industrial filter stays available and shows a localized empty state.
- [ ] Cards preserve category, client, tools, gallery count and Behance CTA.
- [ ] Case-study route preserves localized title/description, full gallery and metadata.
- [ ] Intercepting lightbox route supports direct URL visits and shareable URLs.
- [ ] Lightbox has focus trap/return, thumbnails, previous/next project, Escape, arrow keys (RTL-aware), title, description, client and tools.

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
- [ ] Panorama: two rooms, pointer-based mouse/touch drag, measured seamless wrap, accurate auto-rotate state, reset, visible-only animation and reduced-motion handling.
- [ ] Materials: three presets with image, localized name, specification tags, swatches, badge and preloaded crossfade.

## Estimator
- [ ] Four unit types, area 50–600 m² in steps of 5, default 160 m².
- [ ] Seven tiers with localized copy, rates, gifts and four feature lines.
- [ ] Add-ons and exact formula match the approved spec.
- [ ] Default state is Elite/apartment/160 m² with gypsum and door selected unless owner changes it.
- [ ] Default total is exactly 3,310,000 EGP and 20,688 EGP/m².
- [ ] Materials/labor/supervision breakdown, timeline, milestones, warranty and gift box.
- [ ] AR/EN WhatsApp message and print-only-summary stylesheet; commercial disclaimers stay visible.

## Quality and delivery
- [ ] Every route has localized metadata, loading state and error state.
- [ ] Keyboard access, visible focus, AA contrast, skip link, landmarks and reduced motion.
- [ ] SEO: sitemap, robots, OpenGraph, Person and ProfessionalService JSON-LD.
- [ ] Images use responsive AVIF/WebP, correct sizes, hero-only priority and fallback.
- [ ] Security headers/CSP allow only verified origins.
- [ ] Before/after Lighthouse and per-route bundle sizes are recorded; no unmeasured speed claims.
- [ ] Typecheck, lint, unit tests, i18n parity, build, E2E route/interaction tests and axe checks pass.
- [ ] Deployment target, domain and analytics are owner-approved.
