# WLDF Library → Artwork pilot — review handoff

**Date:** 2026-10-16  
**Status:** Development branch, not merged or deployed  
**Source design:** [WLDF Make Design Pages / Layout Concepts](https://www.figma.com/design/M3VTanY7eVHuALLI8JMK7s/WLDF-Make-Design-Pages?node-id=2017-3)  
**Source code:** `shaungillen/wldfoundation` (React 18, Vite, Base44)

## Scope implemented

- Add a new isolated `/library` route while keeping `/Collection` and the generated `pages.config.js` unchanged.
- Render a responsive editorial Library aligned to the existing Figma hierarchy: introduction, resource filters, featured resource, resource grid, and artwork previews.
- Query existing Base44 `Article`, `Artwork`, and `Artist` entities. No mock records or fabricated result counts.
- Support resource type (explicit tags or current Article types), keyword, artist, and year filtering, with clear-filter action and appropriate loading/empty/error states.
- Reuse the existing `Modal` and `ArtworkModal` for artwork quick view; retain full artwork detail links.
- Fix `ArtworkModal` image selection and artist detail links.
- Fix `ArticleDetail` return navigation to Library when opened from this flow; preserve Stories return for other callers.
- Add focused unit tests for the pure resource/article adapter.

## Existing components reused

`Modal`, `ArtworkModal`, `ArtworkDetail`, `ArticleDetail`, `Layout`, Base44 SDK entities, React Query.

## Scope deliberately not implemented

- No content schema changes, imports, writing, permission changes, or records migration.
- No publication PDF reader, media player, exhibition filter, virtual tour, or generic Resource entity.
- No edits to Figma, live website, deployment configuration, or `main` branch.
- No new global navigation entry yet: `/library` is a direct review route.
- No acceptance claim against the empty `REVIEW BUILD — WLDF — 2026-10-06` page; its prior-reported content and current-empty status remain unresolved.

## Evidence and test status

- **VERIFIED:** Branch created from `main` commit `01f7f147933d9f5a3e9820cf612fc5d7a899cd00`; repo readback showed `main` unchanged after the initial implementation commits.
- **VERIFIED:** GitHub readback and branch comparison show additive changes, limited to Library and adjacent link/modal seams.
- **VERIFIED:** `tests/libraryFilters.test.mjs` passed 4/4 tests in an isolated local Node.js run. Locally tested file blob hashes match the GitHub blobs exactly (`libraryFilters.js`: `c810c88793cc831d83b77c1b1cfea19ef6e25695`; tests: `17256c6de440a0439a83a00e6c9ee532762d111b`).
- **NOT YET VERIFIED:** Full `npm run build`, app browser render, dynamic Base44 data, visual Figma comparison, end-to-end navigation and accessibility. No executable checkout with installed dependencies was available in the current runtime.

## Next review and acceptance gates

1. Checkout branch locally, run `npm ci`, `node --test tests/libraryFilters.test.mjs`, `npm run build`, and applicable lint checks.
2. Preview `/library` in a nonproduction environment with approved content access.
3. Validate search, category, artist, year, featured record, zero states, artwork quick view, image switching, artist link, full detail link, resource detail and return navigation.
4. Compare 1440 px desktop and 390 px mobile render against the existing Figma frames. Record discrepancies, especially shared header/footer and font differences.
5. Review content taxonomy and publication/audio/video models before extending the archive.
6. Explicitly approve any preview deployment, merge, or production promotion as a separate action.
