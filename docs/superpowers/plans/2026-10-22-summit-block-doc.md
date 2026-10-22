# Summit Block Project & Documentation Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the Summit Block Chrome extension into the portfolio website project showcase and build an exhaustive, high-performance documentation portal at `/summit-block/doc`.

**Architecture:** Add a new React route in `src/App.jsx` pointing to `src/pages/SummitBlockDoc.jsx`. Build the docs portal using sticky sidebar scrollspy navigation, quick search, interactive copy buttons, architecture data-flow diagrams, activation guide tabs, and privacy/permissions tables. Update `src/mock.jsx` and `src/components/ProjectCard.jsx` to feature Summit Block as Project #1 with dual action buttons.

**Tech Stack:** React 18, React Router v7, Tailwind CSS, Framer Motion, Phosphor Icons / Lucide React, Vite.

**Spec:** `docs/superpowers/specs/2026-10-22-summit-block-doc-design.md`

## Global Constraints
- Must match the portfolio's bespoke dark vanguard aesthetics (`#09090B`, `font-sans`, `font-mono`, subtle ambient glows, glassmorphic cards).
- Must include all technical details from `assets/Summit-Block` (Quick start, architecture, filter rules, developer scripts, privacy policy, Chrome Web Store listing).
- Must maintain SPA routing compatibility on Vercel without 404s.
- Zero broken links; build must pass cleanly via `vite build`.

## Review Focus
1. Direct URL navigation to `/summit-block/doc` renders without blank screens or 404 errors.
2. Clicking "Read Docs" on the portfolio homepage navigates directly to `/summit-block/doc`.
3. Quick copy buttons on terminal commands and code blocks provide visual feedback ("Copied!").
4. Responsive layout on mobile screens: table of contents converts cleanly into a mobile drawer/dropdown.
5. Project card image and hover reveal mechanics function smoothly without layout shifts.

---

### Task 1: Asset Pipeline & Media Setup
**Files:**
- Create: `public/assets/projects/summit-block.png`
- Create: `public/assets/summit-block/icon-128.png`, `public/assets/summit-block/icon-512.png`

**Interfaces:**
- Produces: Web-accessible asset URLs for project cards and documentation hero.

- [ ] **Step 1:** Ensure public asset folders `public/assets/projects/` and `public/assets/summit-block/` exist.
- [ ] **Step 2:** Copy high-res icons and create a dark glassmorphic banner for Summit Block.
- [ ] **Step 3:** Verify images exist and are accessible.

---

### Task 2: Portfolio Mock Data & ProjectCard Dual-Button Update
**Files:**
- Modify: `src/mock.jsx`
- Modify: `src/components/ProjectCard.jsx`

**Interfaces:**
- Consumes: `project.docLink`, `project.badge`
- Produces: Enhanced ProjectCard rendering with "Read Docs" router link and "View Source" external link.

- [ ] **Step 1:** In `src/mock.jsx`, add Summit Block as Project #1 with id: 1, title: `"Summit Block — Privacy Ad & Tracker Blocker"`, category: `"Browser Extension"`, badge: `"NEW"`, `docLink: "/summit-block/doc"`, and `link: "https://github.com/AmareDev2k/summit-block"`. Re-index remaining projects (2 to 6).
- [ ] **Step 2:** In `src/components/ProjectCard.jsx`, import `Link` from `react-router-dom`. When `project.docLink` is present, render the "Read Docs" action button alongside "View Source", and render the "NEW" badge indicator.
- [ ] **Step 3:** Verify cards render properly without errors.

---

### Task 3: Comprehensive Documentation Portal Page Component
**Files:**
- Create: `src/pages/SummitBlockDoc.jsx`

**Interfaces:**
- Consumes: Phosphor icons, React hooks, Framer Motion.
- Produces: Fully interactive documentation portal component for `/summit-block/doc`.

- [ ] **Step 1:** Create `src/pages/SummitBlockDoc.jsx` with responsive layout (top sticky breadcrumbs/header, sticky sidebar with active section highlighting, search filter).
- [ ] **Step 2:** Add all documentation sections:
  1. Hero with badge counters, Manifest V3 badges, and GitHub links.
  2. Core Features grid (Native Speed, Zero Telemetry, Cosmetic Filter, Element Picker, Per-site toggle).
  3. Browser Activation Guide with tabs (Chrome, Brave, Edge) and step-by-step instructions.
  4. Architecture & System Flow (SVG sequence diagram, rule engine explanation).
  5. Filter Syntax & Rules (code snippets with copy buttons, cosmetic selectors).
  6. Developer Tooling (`build-rules.py`, `validate.py`, `package.sh`).
  7. Full Zero-Telemetry Privacy Policy & Permissions Table.
  8. Chrome Web Store Kit & FAQ.
  9. Support & Donation links (Buy Me a Coffee, Patreon).
- [ ] **Step 3:** Implement interactive features: 1-click copy with toast/indicator, browser tabs, section smooth scrolling.

---

### Task 4: Route Wiring & Build Verification
**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Connects route `/summit-block/doc` to `<SummitBlockDoc />`.

- [ ] **Step 1:** In `src/App.jsx`, import `SummitBlockDoc` from `./pages/SummitBlockDoc` and add `<Route path="/summit-block/doc" element={<SummitBlockDoc />} />`.
- [ ] **Step 2:** Run `npm run build` or `npx vite build` to ensure the entire application compiles cleanly without syntax or bundling errors.
- [ ] **Step 3:** Verify route loading in browser or via test.
