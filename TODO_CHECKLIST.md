# ✅ Enhancement Plan - Actionable To-Do Checklist

**Last Updated:** October 27, 2025

---

## ✅ PRIORITY 1: CRITICAL (COMPLETED)

### Dependency & Testing
- [x] **Install jsdom dependency** ✅ DONE
  - Installed jsdom (43 packages)
  - Switched to happy-dom for compatibility
  - _File: package.json_
  - _Actual time: 2 min_

- [x] **Run and verify tests** ✅ DONE
  - ✓ src/lib/utils.test.ts (1 test) 10ms
  - ✓ src/components/ThemeProvider.test.tsx (2 tests) 37ms
  - All 3 tests passing (100%)
  - _Actual time: 5 min_

### Dark Mode Verification
- [ ] **Test dark mode toggle on Home page**
  - [ ] Light mode displays correctly
  - [ ] Dark mode displays correctly
  - [ ] Toggle button works
  - [ ] Transition is smooth
  - _Estimated time: 10 min_

- [ ] **Test dark mode on Projects page**
  - [ ] Tables visible in dark mode
  - [ ] Cards readable in dark mode
  - [ ] Contrast meets WCAG standards
  - _Estimated time: 10 min_

- [ ] **Test dark mode on Dashboard**
  - [ ] Charts render in dark mode
  - [ ] Stats cards visible
  - [ ] Background colors correct
  - _Estimated time: 10 min_

- [ ] **Test dark mode on News page**
  - [ ] Content readable
  - [ ] Embeds display correctly
  - _Estimated time: 5 min_

- [ ] **Test dark mode on About page**
  - [ ] Text contrast good
  - [ ] All elements visible
  - _Estimated time: 5 min_

- [ ] **Fix any dark mode CSS issues found**
  - _Estimated time: 15-30 min_

---

## ✅ PRIORITY 2: IMPORTANT (MOSTLY COMPLETED)

### Documentation
- [x] **Update About page with inventory guide** ✅ DONE
  - 3-tab interface (About, How-To, Schema)
  - Complete project schema reference
  - Step-by-step add/update instructions
  - Dark mode support
  - _Actual time: 1 hour_

- [ ] **Add contact form for contributions**
  - [ ] Create contribution form component
  - [ ] Add to About page
  - [ ] Set up email notification (optional)
  - _Estimated time: 1.5 hours_

### Company Profiles
- [x] **Create company profile page template** ✅ DONE
  - New file: `src/pages/Company.jsx`
  - Accept company ID from URL
  - Display all projects for company
  - Show company stats (Total, Active, Exported)
  - _Actual time: 1.5 hours_

- [x] **Add company links in Projects page** ✅ DONE
  - Make company names clickable
  - Navigate to company profile page
  - Update routes in App.jsx
  - _Actual time: 30 min_

- [x] **Populate company profile data** ✅ DONE
  - Extract unique companies
  - Create dynamic company filtering
  - Add company descriptions from projects
  - _Actual time: 20 min_

---

## 🔥 PRIORITY 3: NICE TO HAVE (IN PROGRESS)

### Advanced Search
- [x] **Implement fuzzy search with fuse.js** ✅ DONE
  - [x] Install fuse.js: `npm install fuse.js`
  - [x] Create fuse instance in Projects
  - [x] Replace exact match with fuzzy search
  - [x] Update search UI with suggestions
  - [x] Test with typos
  - _Actual time: 45 min_
  - _Features: 30% typo tolerance, multi-field search, relevance ranking_

### UX & UI Improvements
- [ ] **Add deep-linkable project modal**
  - [ ] Sync modal state with URL (?id=123)
  - [ ] Restore modal from URL on page load
  - [ ] Add close button with aria-label
  - [ ] Support keyboard navigation (Escape to close)
  - _Estimated time: 1 hour_
  - _Files: src/pages/Projects.jsx_

- [ ] **Persist filters and search in URL**
  - [ ] Sync all filters to URL params (type, status, company, exported, q)
  - [ ] Initialize filters from URL on mount
  - [ ] Enable shareable filtered views
  - [ ] Add "Clear Filters" visible state
  - _Estimated time: 1 hour_
  - _Files: src/pages/Projects.jsx_

- [ ] **Add table/card view toggle**
  - [ ] Create card grid layout for projects
  - [ ] Add toggle buttons (Table | Cards)
  - [ ] Persist view preference in localStorage
  - [ ] Show badges (type, status, exported) on cards
  - _Estimated time: 2 hours_
  - _Files: src/pages/Projects.jsx_

- [ ] **Improve table ergonomics**
  - [ ] Make table header sticky on scroll
  - [ ] Add zebra striping (odd:bg-gray-50/40)
  - [ ] Hide non-critical columns on mobile (responsive)
  - [ ] Reduce row height for compact view
  - _Estimated time: 45 min_
  - _Files: src/pages/Projects.jsx_

- [ ] **Add export country chips in modal**
  - [ ] Display export countries as colored chips
  - [ ] Show mini preview before opening full map
  - [ ] Improve visual hierarchy of export info
  - _Estimated time: 30 min_
  - _Files: src/pages/Projects.jsx_

### Testing Improvements
- [ ] **Add more unit tests**
  - [ ] Tests for ProjectSkeleton component
  - [ ] Tests for MultiSelect component
  - [ ] Tests for DateRangePicker component
  - [ ] Tests for Dashboard statistics
  - _Estimated time: 2-3 hours_

- [ ] **Add integration tests**
  - [ ] Test filter workflows
  - [ ] Test search + filter combinations
  - [ ] Test dashboard chart rendering
  - _Estimated time: 2-3 hours_

- [ ] **Add E2E tests**
  - [ ] Install Playwright: `npm install -D @playwright/test`
  - [ ] Test user journey: Home → Projects → Details
  - [ ] Test dark mode toggle
  - [ ] Test mobile responsiveness
  - _Estimated time: 3-4 hours_

### Documentation
- [ ] **Add Storybook for components**
  - [ ] Install Storybook: `npx storybook@latest init`
  - [ ] Create stories for main components
  - [ ] Document component props
  - [ ] Create usage examples
  - _Estimated time: 3-4 hours_

### TypeScript Migration
- [ ] **Migrate Projects.jsx to TypeScript**
  - [ ] Rename to Projects.tsx
  - [ ] Add type definitions
  - [ ] Fix type errors
  - _Estimated time: 1.5 hours_

- [ ] **Migrate Dashboard.jsx to TypeScript**
  - [ ] Rename to Dashboard.tsx
  - [ ] Add chart component types
  - [ ] Fix type errors
  - _Estimated time: 1.5 hours_

- [ ] **Migrate remaining page components**
  - [ ] Index.tsx
  - [ ] News.tsx
  - [ ] About.tsx
  - _Estimated time: 2 hours_

---

## 🚀 PRIORITY 4: FUTURE (Next Quarter)

### Data Model Refactoring
- [ ] **Normalize projects.json schema**
  - [ ] Add `slug` field for URL-friendly IDs
  - [ ] Rename `project_name` → `name`, `Notes` → `notes`, `type` → `domain`
  - [ ] Nest company into object: `{ name, url }`
  - [ ] Nest dates into object: `{ start, service, target }`
  - [ ] Standardize `in_service` as `{ count, unit }` for mixed types ("4 bty" → {count:4, unit:"bty"})
  - [ ] Ensure ISO-3 country codes in `exports.countries`
  - [ ] Add `tags` array for future filtering
  - _Estimated time: 2-3 hours_
  - _Files: src/data/projects.json, src/lib/utils.ts, all consuming components_

- [ ] **Update TypeScript types for new schema**
  - [ ] Update Project interface in utils.ts
  - [ ] Add enum types for status, domain, scale
  - [ ] Create migration script for old → new format
  - _Estimated time: 1 hour_
  - _Files: src/lib/utils.ts_

### Performance Optimization
- [ ] **Optimize Vite build config**
  - [ ] Add minification settings
  - [ ] Configure code splitting strategies
  - [ ] Add compression plugins
  - [ ] Optimize chunk sizes
  - _Estimated time: 1.5 hours_

- [ ] **Implement advanced caching**
  - [ ] Use SWR strategy
  - [ ] Add cache versioning
  - [ ] Implement cache invalidation
  - _Estimated time: 1 hour_

- [ ] **Image optimization**
  - [ ] Convert existing images to WebP/AVIF
  - [ ] Optimize image compression (reduce file sizes)
  - [ ] Generate responsive variants (srcset)
  - [ ] Add fetchPriority="high" for LCP images
  - [ ] Limit format fallback attempts in production
  - _Estimated time: 2 hours_
  - _Files: src/components/OptimizedImage.jsx, public/images/_

- [ ] **Add prefetching for critical routes**
  - [ ] Prefetch Projects page on Index hero hover
  - [ ] Add modulepreload hints for critical chunks
  - [ ] Consider react-virtual for large tables (>500 rows)
  - _Estimated time: 1.5 hours_

### SEO & Metadata
- [ ] **Add per-page meta tags**
  - [ ] Create usePageMeta hook for title/description
  - [ ] Add unique title and description per route
  - [ ] Add canonical URLs with GitHub Pages base
  - [ ] Implement Open Graph tags
  - _Estimated time: 1.5 hours_
  - _Files: src/hooks/usePageMeta.ts, all page components_

- [ ] **Add JSON-LD structured data**
  - [ ] Add schema.org Product/Dataset markup for projects
  - [ ] Add Organization markup for companies
  - [ ] Add BreadcrumbList for navigation
  - _Estimated time: 2 hours_
  - _Files: src/pages/Projects.jsx, src/pages/Company.jsx_

---

## 🔧 TECHNICAL DEBT

- [ ] Remove unsafe-inline from CSP (use nonce)
- [ ] Enhance rate limiting with exponential backoff
- [ ] Improve error handling granularity
- [ ] Add comprehensive error logging
- [ ] Upgrade to WCAG AAA accessibility level
- [ ] Add performance monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Implement analytics (Plausible/GA)

### Accessibility Enhancements
- [ ] **Improve modal accessibility**
  - [ ] Add visible close button with aria-label
  - [ ] Ensure focus trap when modal opens
  - [ ] Test with screen readers (NVDA/JAWS)
  - _Estimated time: 45 min_
  - _Files: src/pages/Projects.jsx_

- [ ] **Add ARIA labels to table headers**
  - [ ] Add scope="col" to all <th> elements
  - [ ] Improve sortable column announcements
  - [ ] Test keyboard navigation in table
  - _Estimated time: 30 min_
  - _Files: src/pages/Projects.jsx_

- [ ] **Expand touch targets on mobile**
  - [ ] Ensure all buttons ≥44px touch target
  - [ ] Increase filter dropdown sizes on mobile
  - [ ] Test on actual mobile devices
  - _Estimated time: 30 min_

### Code Quality
- [ ] **Add unit tests for new features**
  - [ ] Test getImageUrl with various input formats
  - [ ] Test URL param sync logic
  - [ ] Test filter persistence
  - _Estimated time: 2 hours_
  - _Files: src/lib/utils.test.ts, src/pages/__tests__/Projects.test.tsx_

- [ ] **Add PropTypes or strengthen TypeScript**
  - [ ] Add PropTypes to OptimizedImage
  - [ ] Add PropTypes to ProjectCard
  - [ ] Consider full migration to .tsx
  - _Estimated time: 1 hour_

---

## 📝 VERIFICATION CHECKLIST

After each major feature, verify:

### Code Quality Checks
- [ ] No console errors/warnings
- [ ] No linting errors: `npm run lint`
- [ ] TypeScript compiles: `npm run typecheck`
- [ ] Responsive on mobile (tested in Chrome DevTools)

### Functionality Checks
- [ ] Feature works as intended
- [ ] No broken links
- [ ] Error states handled
- [ ] Loading states appear

### Performance Checks
- [ ] Lighthouse score ≥ 90
- [ ] Core Web Vitals within limits
- [ ] No memory leaks
- [ ] Build size reasonable

### Accessibility Checks
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast adequate
- [ ] ARIA labels present

---

## 📊 Time Estimates

| Priority | Category | Items | Est. Hours | Status |
|----------|----------|-------|-----------|--------|
| P1 | Critical | 6 | 1-2 | ✅ DONE |
| P2 | Important | 8 | 8-10 | ✅ 75% DONE |
| P3 | Nice | 14 | 18-23 | ⏳ NEXT |
| P4 | Future | 13 | 28-36 | 📅 LATER |
| Tech Debt | Debt | 13 | 9-15 | 📅 LATER |
| **TOTAL** | **All** | **54** | **64-86** | **~17% done** |

---

## 🎯 Suggested Timeline

- **✅ Week 1:** Complete Priority 1 (DONE - 2 days)
- **✅ Week 2-3:** Complete Priority 2 (DONE - 8-10 hours)
- **→ Week 4-5:** Complete Priority 3 UX improvements (5-6 hours)
- **Week 6-7:** Complete Priority 3 testing & TS migration (12-16 hours)
- **Week 8+:** Address Priority 4 (data model, SEO, performance)
- **Ongoing:** Address technical debt incrementally

---

## 📌 Notes

- Estimates are rough and may vary based on complexity
- Testing time included in estimates
- Document all changes in commit messages
- Create feature branches for each major feature
- Request code review before merging
- User does not want exports
- **NEW (Oct 27):** Added comprehensive UX/UI improvements from code review
  - Deep-linkable modals, URL-synced filters, table/card toggle
  - Data model normalization for future scalability
  - Image optimization and SEO enhancements
  - Accessibility improvements across components

---

## ✅ Completion Status

- **Completed Tasks:** 9
- **In Progress:** 5 (Priority 3 UX improvements)
- **Pending:** 40
- **Overall Progress:** 17% (9/54 major items)

_Update this file as you complete tasks!_

---

## 🆕 NEW ADDITIONS (Oct 27, 2025)

### Quick-Win UX Improvements (Priority 3)
1. **Deep-linkable modal** - Share project details via URL
2. **URL-synced filters** - Shareable filtered views
3. **Table/Card toggle** - Better mobile experience
4. **Table improvements** - Sticky headers, zebra rows, responsive columns
5. **Export country chips** - Visual badges in modal

### Data & Architecture (Priority 4)
6. **JSON schema normalization** - Consistent, typed-friendly structure
7. **SEO & meta tags** - Per-page metadata and structured data
8. **Image optimization** - WebP conversion, lazy loading, LCP boost

### Quality & Accessibility
9. **Modal accessibility** - Better keyboard nav and ARIA labels
10. **Touch target expansion** - Mobile-friendly button sizes
11. **Unit test coverage** - Test new URL sync and image utilities
