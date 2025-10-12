## Quick context for AI coding agents

- Repo type: Vite + React SPA (no backend in this repo). Main entry: `src/main.jsx` and `src/App.jsx`.
- UI: Tailwind + shadcn-style primitives under `src/components/ui/*`. Common exports: `Table`, `Dialog`, `Card`, `Input`, `Button`.
- Data source: Supabase table named `atlasprojects`. Local CSVs that seed data live at the repo root (`Atlas.csv`, `atlasprojects_rows.csv`).
- Path alias: `@/*` maps to `./src/*` (see `jsconfig.json`). Prefer `@/` imports when adding files.

## Architecture & important files

- `src/supabaseClient.js` — creates and configures Supabase client. Requires environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. It also implements a simple rate limiter (`rateLimit()`) and throws when env vars are missing.
- `src/SupabaseContext.jsx` — wraps the app and exposes `useSupabase()` hook. Use this hook instead of creating new clients.
- `src/App.jsx` — sets up `QueryClient` from `@tanstack/react-query` with project-wide defaults (staleTime 5m, cacheTime 30m, refetchOnWindowFocus:false, retry:1). Wrap features with `QueryClientProvider`, `SupabaseProvider`, and `I18nextProvider`.
- `src/i18n.js` — app uses `react-i18next`. Translation keys are nested (e.g. `projects.title`). When adding UI text, add translations here (en and tr present).
- `src/pages/Projects.jsx` — shows canonical patterns: call `rateLimit()` before heavy Supabase queries, sanitize user/display data with `DOMPurify`, use `useSupabase()` for DB queries, and UI primitives from `src/components/ui/`.

## Conventions and patterns agents must follow

- Imports: use path alias `@/` for `src` imports. Example: `import { Table } from "@/components/ui/table"`.
- Supabase access: rely on `useSupabase()` from `src/SupabaseContext.jsx`. Do not re-create clients. Respect the `rateLimit()` helper in `src/supabaseClient.js` for code that could loop or batch many requests.
- Data sanitization: user/remote text is sanitized with `DOMPurify` in `src/pages/Projects.jsx`. Reuse the same pattern to avoid XSS issues.
- React Query: prefer using the existing `QueryClient` defaults. New queries should set sensible `staleTime`/`cacheTime` if they differ.
- UI primitives: follow the local `ui` components (they are thin wrappers around Radix/Tailwind). Look at `src/components/ui/table.jsx`, `dialog.jsx`, etc., for component props and CSS patterns.

## Developer workflows (commands)

Install and run dev server:
```powershell
npm install
npm run dev
```

Build / preview / lint:
```powershell
npm run build
npm run preview
npm run lint
```

Notes: `src/supabaseClient.js` will throw at runtime if `VITE_SUPABASE_*` env vars are missing. For local build/test work, either set those env vars (e.g. `.env` with Vite prefixes) or guard access in experimental branches.

## Integration points & external deps

- Supabase: `@supabase/supabase-js` configured in `src/supabaseClient.js`. Table name used in code: `atlasprojects`.
- React Query: used in `src/App.jsx` for caching and query management.
- i18n: `react-i18next` with translations in `src/i18n.js`.
- Mapping/data viz: `react-simple-maps`, `visionscarto-world-atlas` and `ExportCountryMap` component are used for export-country visualizations (`src/components/ExportCountryMap.jsx`).
- Ads: `src/main.jsx` contains an inline `<script>` tag for Google Ads. This is a non-standard placement (JSX file) — moving it to `index.html` is safer, but be aware it's currently present.

## Examples to copy from

- Rate-limit + fetch pattern (from `src/pages/Projects.jsx`): call `rateLimit()` then `await supabase.from('atlasprojects').select('*')`, sanitize results, and store them in state.
- QueryClient config (from `src/App.jsx`) — reuse for server-synced queries to avoid unnecessary refetches.
- Translation keys (from `src/i18n.js`) — add new keys under `projects` or `index` following the nested structure.

## What NOT to change without checking

- `src/supabaseClient.js`: changing env handling or headers may break runtime auth and policies.
- `jsconfig.json` path alias: changing `@/` mapping requires updating many imports.
- `src/components/ui/*`: these are shared primitives — modify only if you intend to update all consumers.

## If you need more context

- Inspect `Atlas.csv` / `atlasprojects_rows.csv` to understand the source CSV shape used to populate Supabase table `atlasprojects`.
- For routing and pages, check `src/App.jsx` and `src/pages/*`.

If anything in this file is unclear or you want the agent to emphasize additional patterns (tests, CI, deployment), tell me which area to expand and I will iterate.
