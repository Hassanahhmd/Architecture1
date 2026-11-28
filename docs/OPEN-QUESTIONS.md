# Open Questions — Architecture1 Rebuild

1. **Tour source.** The brief says the original tour source is absent; the 27 Nov notes say a `villa-tour-site.zip` was supplied. Without the source only the static-bundle phase of the tour work is possible.
2. **JS budget — CLOSED, owner-approved (28 Nov 2026).** The brief asked for Home <= 120 KB gzipped. A bare `create-next-app` page on this stack (Next 16.4.6, React 19.3, zero client components) ships 170.1 KB gzipped across 6 chunks, so the 120 KB target is unreachable without leaving the stack. The owner approved a budget of about 200 KB per route. Measured: home 195.8 KB, /projects 201.8 KB, project detail 209.1 KB (gallery viewer). The two routes slightly above 200 KB are accepted under "about 200 KB".

3. **Hosting.** Static export keeps GitHub Pages working. Vercel or Netlify would allow image optimisation and previews. Domain, analytics and the contact email to publish are still undecided.
4. **Business claims.** "Zero code violations", the 10-year structural warranty, 2027 pricing and the overlapping experience dates need confirming before launch.
5. **Unused assets.** `showreel.mp4`, `baxster-store.jpg`, `dressing-room.jpg`, `master-bedroom.jpg`: keep or remove?
6. **Gallery image rights.** May the 52 Behance and 2 Kuula images be downloaded and self-hosted? Equirectangular sources for a real 360 view?
7. **Estimator default.** Keep Elite + apartment + 160 m² + gypsum + door (3,310,000 EGP; 20,688 EGP/m²) or use a neutral default?
8. **Copy bug found in the original data.** The dictionary key `est.m2` held an add-on phrase ("بعد تأسيس MEP") instead of "m²", so the estimator printed that phrase wherever the unit appeared. Rebuilt as م²/m² — confirm.
9. **Nav labels.** Two nav labels were shortened (the quiz entry was a full sentence) and the emoji used as an icon was removed, per the brief's own design section. Confirm the wording.
10. **Lighthouse baseline.** The original page cannot be scored by Lighthouse in this environment (it hangs or crashes the run). Accept the transfer/timing baseline above, or capture a Lighthouse report on a real device?

11. **Project lightbox cannot be an intercepting route — OPEN DEVIATION, awaiting the owner.** The brief asks for the project detail to open as a modal over the grid (an intercepting route). Next.js refuses that under `output: 'export'`: the build stops with "Intercepting routes are not supported with static export", which is required for GitHub Pages. Verified on 28 Nov 2026 by adding `[locale]/@modal/(.)projects/[slug]` and building.
   What ships instead: each card links to its prerendered project page (`/ar/projects/store/`), so every project has a real, shareable URL and the back button works. The in-grid dialog was removed with it, which took `/projects` from **214.0 KB to 201.1 KB gzipped** (10 chunks).
   Options: a) accept page navigation (current build); b) restore the client-side dialog and lose the addressable URL; c) move off static export to a Node host (Vercel/Netlify), where the intercepting route works as written.

## Owner decisions

- **Default language: English (28 Nov 2026).** The owner said the site must always open in the English version. This overrides the brief's Arabic default. `/` sends a first-time visitor to `/en/`; a visitor who picked Arabic through the switcher is sent to `/ar/` next time via the NEXT_LOCALE cookie. If he wants English every time regardless of the stored choice, remove the cookie check in `public/index.html`.
- **JS budget: about 200 KB per route (28 Nov 2026).** See item 2.
