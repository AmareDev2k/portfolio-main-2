# Summit Block Project Showcase & Documentation Portal Design

**Date:** 2026-10-22  
**Status:** Approved  
**Author:** Aravinda Amarasingha & Antigravity  

---

## 1. Executive Summary
Integrate the new project **Summit Block** (an open-source, privacy-first Manifest V3 ad & tracker blocker for Chrome) into the developer portfolio at `https://www.aravindaamarasingha.me/` and create an exhaustive, production-grade documentation portal at `/summit-block/doc`.

---

## 2. Requirements & Goals
1. **Showcase on Portfolio**:
   - Feature Summit Block as Project #1 in the portfolio projects grid (`src/mock.jsx`).
   - Highlight with a "NEW" badge and category "Browser Extension".
   - Include direct actions on the card: **"Read Docs"** (`/summit-block/doc`) and **"View Source"** (`https://github.com/AmareDev2k/summit-block`).
   - Project preview image with frosted-glass hover reveal.
2. **Dedicated Documentation Portal (`/summit-block/doc`)**:
   - Route `/summit-block/doc` in `src/App.jsx`.
   - Modern Developer Docs layout with sticky sidebar table-of-contents, active scrollspy tracking, and quick search.
   - Comprehensive content covering all details from `assets/Summit-Block`:
     - **Hero & Core Metrics**: Manifest V3, Chrome 114+, MIT License, Zero telemetry.
     - **Core Feature Highlights**: Native `declarativeNetRequest` engine, cosmetic cleanup, element picker, per-site pause, live stats badge.
     - **Browser Activation & Quick Start**: Tabbed guide for Chrome, Brave, and Edge with exact 4-step unpack/load directions, troubleshooting table, and verification checklist.
     - **Architecture & System Blueprint**: Service worker, rule sync, stats engine, cosmetic script, picker, options, interactive data flow diagram, rule hierarchy, security decisions.
     - **Filter Syntax & Customization Guide**: Network rules syntax, cosmetic selectors, user filters, and developer build commands (`build-rules.py`, `validate.py`, `package.sh`).
     - **Zero-Telemetry Privacy Policy & Legal Disclosures**: Complete privacy breakdown, permissions justification table (`declarativeNetRequest`, `webRequest`, `storage`, `scripting`, `contextMenus`, `<all_urls>`), Chrome Web Store policy compliance.
     - **Store Listing Kit**: Single-purpose statement, metadata, promo dimensions.
     - **FAQ & Project Roadmap**.
     - **Support & Sponsor Links**: Buy Me a Coffee and Patreon.
3. **Design System & Performance**:
   - Match existing portfolio vanguard aesthetic (`#09090B`, `geist-sans`, `geist-mono`, Phosphor / Lucide icons, glassmorphism, responsive navigation).
   - Fast client-side routing with React Router v7.

---

## 3. Architecture & File Changes
- **`src/App.jsx`**: Add route `<Route path="/summit-block/doc" element={<SummitBlockDoc />} />`.
- **`src/pages/SummitBlockDoc.jsx`**: New comprehensive documentation page component.
- **`src/mock.jsx`**: Add Summit Block as Project #1 with `docLink`, `link`, `technologies`, `badge`, `image`.
- **`src/components/ProjectCard.jsx`**: Support dual buttons (`docLink` + `link`), "NEW" badge, and smooth navigation.
- **`public/assets/projects/` & `public/assets/summit-block/`**: Store asset icons and banners for fast rendering.

---

## 4. Testing & Verification
- Verify build succeeds via `npm run build` or `vite build`.
- Verify routing to `/summit-block/doc` renders without errors.
- Verify sticky sidebar scrollspy and interactive copy buttons work.
- Verify project card on `/` navigates to `/summit-block/doc` and links to GitHub repo.
