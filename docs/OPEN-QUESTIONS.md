# Open Questions — Architecture1 Rebuild

Reconciled 28 Nov 2026 against the owner's decisions. Items marked CLOSED need no answer.

1. **Tour source — CLOSED.** The tour is bundled and the owner confirmed on his phone that it renders and moves. Original note: **Tour source.** The brief says the original tour source is absent; the 27 Nov notes say a `villa-tour-site.zip` was supplied. Without the source only the static-bundle phase of the tour work is possible.
2. **JS budget — CLOSED, owner-approved (28 Nov 2026).** The brief asked for Home <= 120 KB gzipped. A bare `create-next-app` page on this stack (Next 16.4.6, React 19.3, zero client components) ships 170.1 KB gzipped across 6 chunks, so the 120 KB target is unreachable without leaving the stack. The owner approved a budget of about 200 KB per route. Measured: home 195.8 KB, /projects 201.8 KB, project detail 209.1 KB (gallery viewer). The two routes slightly above 200 KB are accepted under "about 200 KB".

3. **Hosting.** Static export keeps GitHub Pages working. Vercel or Netlify would allow image optimisation and previews. Domain, analytics and the contact email to publish are still undecided.
4. **Business claims.** "Zero code violations", the 10-year structural warranty, 2027 pricing and the overlapping experience dates need confirming before launch.
5. **Unused assets.** `showreel.mp4`, `baxster-store.jpg`, `dressing-room.jpg`, `master-bedroom.jpg`: keep or remove?
6. **Gallery image rights.** May the 52 Behance and 2 Kuula images be downloaded and self-hosted? Equirectangular sources for a real 360 view?
7. **Estimator default — CLOSED.** The approved spec fixes the default (Elite, apartment, 160 m², gypsum, door = 3,310,000 EGP), and the e2e test asserts it. Original question: **Estimator default.** Keep Elite + apartment + 160 m² + gypsum + door (3,310,000 EGP; 20,688 EGP/m²) or use a neutral default?
8. **Copy bug found in the original data.** The dictionary key `est.m2` held an add-on phrase ("بعد تأسيس MEP") instead of "m²", so the estimator printed that phrase wherever the unit appeared. Rebuilt as م²/m² — confirm.
9. **Nav labels.** Two nav labels were shortened (the quiz entry was a full sentence) and the emoji used as an icon was removed, per the brief's own design section. Confirm the wording.
10. **Lighthouse baseline — superseded.** Live lab Lighthouse runs on the deployed site are the baseline now (lab only; field INP is not measured). Original: **Lighthouse baseline.** The original page cannot be scored by Lighthouse in this environment (it hangs or crashes the run). Accept the transfer/timing baseline above, or capture a Lighthouse report on a real device?

11. **Project lightbox: intercepting route impossible; client quick view shipped (batch 2).** A lazy client dialog opens from the card image with `?project=slug` URL state; the Details link, modifier-click, and a no-JS visitor all use the prerendered page. /projects first-load is 203.9 KB gzip (the dialog is a separate on-demand chunk); detail pages 209.6 KB. Original deviation: The brief asks for the project detail to open as a modal over the grid (an intercepting route). Next.js refuses that under `output: 'export'`: the build stops with "Intercepting routes are not supported with static export", which is required for GitHub Pages. Verified on 28 Nov 2026 by adding `[locale]/@modal/(.)projects/[slug]` and building.
   What ships instead: each card links to its prerendered project page (`/ar/projects/store/`), so every project has a real, shareable URL and the back button works. The in-grid dialog was removed with it, which took `/projects` from **214.0 KB to 201.1 KB gzipped** (10 chunks).
   Options: a) accept page navigation (current build); b) restore the client-side dialog and lose the addressable URL; c) move off static export to a Node host (Vercel/Netlify), where the intercepting route works as written.

## Owner decisions

- **Default language: English, always (28 Nov 2026).** The owner said the site opens in English automatically, and Arabic only when he presses the Arabic button. `/` always redirects to `/en/`, regardless of browser language, a stored cookie or an earlier Arabic visit (`public/index.html` reads no cookie). The switcher links to `/ar/` and stores nothing. Explicit `/ar/...` URLs still work. e2e covers a fresh visit, an Arabic-browser visit and a stale Arabic cookie.
- **JS budget: about 200 KB per route (28 Nov 2026).** See item 2.

- **Namespace messages and tooling (batch 2/3).** Messages live in `src/i18n/messages/<locale>/<namespace>.json`. React Compiler was tried and rejected: it raised project detail to 212.3 KB and /projects to 205.7 KB. react-scan is dev-only (`NEXT_PUBLIC_SCAN=1`) and adds 0 KB to production. Motion (the library) was not added: the budget has no headroom and the CSS reveal covers the need. Cross-document view transitions do not apply to Next client navigation.

- **Performance isolation (28 Nov 2026).** Local Lighthouse (gzip static server, default mobile, same machine) gives /en/ LCP 0.9 s and 0.98 to 0.99 for builds 8da91d5, f1da283 and 90eb31c alike, so the code changes did not move LCP. Live runs from the sandbox varied from 1.1 s (earlier) to 2.3 to 2.7 s (later) with the LCP element being the hero paragraph and TTFB about 30 ms, which points at the network path, not the build. Unresolved; re-measure live from another network.

## Claims reconciliation (28 Nov)

Checked against tag `original-site-2026-11-28` (`script.js`, `index.html`). Carried over unchanged from the original, none newly written: "Zero Code Violations across 30+ projects", "Zero code violations across 30 supervised builds" (English stats), "10-Year Structural" warranty, "2027 Package Rates · Confirm by Quote", "Cape Breton Univ (Canada)", "50+" projects, "6+" compounds. The original Arabic stats line says "30+" where the English says "30 supervised builds"; both are carried as in the original. Confirming them with the owner stays optional.

## Header navigation (28 Nov)

Header links used `prefetch`. On the static export that made some clicks (for example /en/about to /en/estimator) request an HTML page as a data payload and stall with no navigation. Removing `prefetch` fixed it in all tested paths, with no visual change. Covered by an e2e test.
