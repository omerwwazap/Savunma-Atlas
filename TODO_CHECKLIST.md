# ✅ Enhancement Plan - Actionable To-Do Checklist

**Last Updated:** October 19, 2025

---

## 🔥 PRIORITY 1: CRITICAL (Do Today)

### Dependency & Testing
- [ ] **Install jsdom dependency**
  ```bash
  npm install jsdom --save-dev
  ```
  - _Blocking tests from running_
  - _File: package.json_
  - _Estimated time: 2 min_

- [ ] **Run and verify tests**
  ```bash
  npm run test
  ```
  - _Verify utils.test.ts passes_
  - _Verify ThemeProvider.test.tsx passes_
  - _Check coverage reports_
  - _Estimated time: 5 min_

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

## ⏰ PRIORITY 2: IMPORTANT (This Week)


### Documentation
- [ ] **Update About page with inventory guide**
  - [ ] Add "How to Add Projects" section
  - [ ] Add "How to Update Projects" section
  - [ ] Explain project fields/schema
  - [ ] Provide template
  - _Location: src/pages/About.jsx_
  - _Estimated time: 1 hour_

- [ ] **Add contact form for contributions**
  - [ ] Create contribution form component
  - [ ] Add to About page
  - [ ] Set up email notification (optional)
  - _Estimated time: 1.5 hours_

### Company Profiles
- [ ] **Create company profile page template**
  - [ ] New file: `src/pages/Company.jsx`
  - [ ] Accept company ID from URL
  - [ ] Display all projects for company
  - [ ] Show company stats
  - _Estimated time: 1.5 hours_

- [ ] **Add company links in Projects page**
  - [ ] Make company names clickable
  - [ ] Navigate to company profile page
  - [ ] Update routes in App.jsx
  - _Estimated time: 1 hour_

- [ ] **Populate company profile data**
  - [ ] Extract unique companies
  - [ ] Create company data structure
  - [ ] Add company descriptions (if available)
  - _Estimated time: 1 hour_

---

## 📅 PRIORITY 3: NICE TO HAVE (Next Sprint)

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
  - [ ] Convert images to WebP/AVIF
  - [ ] Optimize image compression
  - [ ] Generate responsive variants
  - _Estimated time: 1.5 hours_

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

| Priority | Category | Items | Est. Hours |
|----------|----------|-------|-----------|
| P1 | Critical | 6 | 1-2 |
| P2 | Important | 8 | 8-10 |
| P3 | Nice | 9 | 12-16 |
| P4 | Future | 7 | 16-20 |
| Tech Debt | Debt | 8 | 5-10 |
| **TOTAL** | **All** | **38** | **42-58** |

---

## 🎯 Suggested Timeline

- **Week 1:** Complete Priority 1 (2 days)
- **Week 2-3:** Complete Priority 2 (8-10 hours)
- **Week 4-5:** Complete Priority 3 (12-16 hours)
- **Ongoing:** Address technical debt

---

## 📌 Notes

- Estimates are rough and may vary based on complexity
- Testing time included in estimates
- Document all changes in commit messages
- Create feature branches for each major feature
- Request code review before merging

---

## ✅ Completion Status

- **Completed Tasks:** 0
- **In Progress:** 0
- **Remaining:** 38
- **Overall Progress:** 0% (Ready to start)

_Update this file as you complete tasks!_
