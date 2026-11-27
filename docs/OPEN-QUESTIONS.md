# Open Questions — Architecture1 Rebuild

Resolve before changing copy, deleting assets, or publishing a replacement site.

1. **Lighthouse baseline:** Lighthouse/LHCI are not installed in the current environment, so the requested score is not recorded. Can the owner capture the current mobile report, or approve a waiver while preserving the raw bundle-size baseline in PLAN.md?
2. **Tour source:** Current `villa-tour/index.html` is a bundled single file. The supplied audit says original source is absent, but a later `villa-tour-site.zip` was supplied. Confirm that its included `src/` package is the canonical source for the current deployed tour and may be maintained in-repo.
3. **Dead/unreferenced files:** The supplied audit lists `assets/villa-tour-facade.js`, `villa-tour-3d.js`, and `assets/projects-data.json` as unreferenced/dead. Current `index.html` visibly references `assets/villa-tour-facade.js`, so it cannot be removed until runtime dependencies are traced. Confirm whether any other listed assets may be removed.
4. **Unused assets:** Confirm whether to retain `assets/showreel.mp4`, `assets/projects/baxster-store.jpg`, `assets/projects/dressing-room.jpg`, and `assets/projects/master-bedroom.jpg`.
5. **Project imagery rights/network:** The supplied audit estimates 54 Behance and two Kuula hot-linked images. Confirm rights to fetch and host these images locally; image downloads may fail from this environment.
6. **360 sources:** No equirectangular panorama sources are identified. Keep the existing panorama as an honestly labelled visual preview unless source panoramas are supplied.
7. **Business claims:** Confirm accuracy before retaining/publishing zero engineering violations, the 10-year structural warranty, 2027 prices/quotas, and overlapping experience dates.
8. **Estimator default:** Keep Elite + apartment + 160 m² + gypsum and armored-door add-ons (3,310,000 EGP; 20,688 EGP/m²), or choose a neutral default?
9. **Hosting:** Confirm Vercel or Netlify, custom domain, analytics provider, and the contact email to publish.
