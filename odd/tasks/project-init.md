# project-init

## Objective
Initialize the money-tracker project with the agreed minimal stack, ready for feature work. No product features.

## Why
Stack and architecture were agreed in conversation (2026-10-11/12). The repo is empty (not even a git repo) apart from `research/` and `AGENTS.md`.

## Scope
- Single package (no monorepo), pnpm, Node 24.
- React + Vite + TypeScript PWA.
- TanStack Router + TanStack Query wired minimally.
- Hexagonal layers in `src/`: `domain`, `application`, `infrastructure`, `ui`, with aliases and lint boundaries (see `AGENTS.md`).
- zod (domain schemas), Vitest + Testing Library, Playwright (Chromium only).
- oxlint + oxfmt.
- Capacitor config + `@capacitor-community/sqlite` installed.

## Out of scope
- Any product feature (forms, screens beyond a placeholder, SQLite adapter logic).
- `cap add android` (waits for a confirmed `appId`), CI workflows, Turborepo.
- Tracking or committing `research/` (user content, left untouched).

## Constraints
- Money is integer minor units, never floats (from `research/08-backlog.md`, V1-8). Do not model it yet; do not contradict it.
- No real financial data in the repo.
- Conventional Commits, Spanish, imperative, one line; no AI attribution lines.
- One work-unit commit per task, on branch `feat/project-init`.
- Authored-lines heuristic: about 400 per task (lockfile and generated files excluded).

## Configuration
- TDD: off (no explicit user choice). Functional checks per task instead.
- Test runner: Vitest (installed in T5).
- RDD: not enabled by the user; ordinary repository policy.
- Delivery strategy: `ask-on-risk`. Forecast well under 400 authored lines per slice.

## Tasks
- [x] T1 Git repo, `.gitignore`, baseline commit with `AGENTS.md` (route: inline) — 15d1975
- [x] T2 Vite + React + TS scaffold with pnpm, template stripped (route: delegated) — 5fb70fc
- [x] T3 Layer folders, aliases (tsconfig + Vite), placeholder per layer (route: delegated) — a1043ec
- [x] T4 oxlint + oxfmt config, boundary rules, scripts (route: delegated) — 9d3c330
- [x] T5 zod + Vitest + Testing Library, one domain test (route: delegated) — ab784e0
- [x] T6 TanStack Router + Query minimal wiring, one placeholder route (route: delegated) — 6d9f903
- [x] T7 Capacitor config + sqlite plugin deps, PWA manifest (route: delegated) — b92f253
- [x] T8 Playwright (Chromium) config + one smoke test (route: delegated) — ea3d989

## Acceptance
- `pnpm install`, `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass.
- A deliberate import violation (e.g. `domain` importing `ui`) fails lint.
- `pnpm dev` serves the placeholder route.

## Progress
T1-T8 done on `feat/project-init`, one commit each (hashes next to each task). T2-T8 route: delegated (single writer), trigger: writer rule (2+ non-trivial files per task).

Decisions made by the writer (to confirm):
- Vite 8 native `resolve.tsconfigPaths: true` for aliases (no extra dependency); Vitest reuses it.
- Vitest config lives in `vite.config.ts` (`defineConfig` from `vitest/config`), environment `jsdom`, include `src/**/*.test.{ts,tsx}` so Playwright specs in `e2e/` are never picked up.
- Added `@testing-library/dom` (required peer of `@testing-library/react`) and `jsdom`.
- Code-based routing in TanStack Router (no router Vite plugin, no generated route tree).
- Boundaries: oxlint `no-restricted-imports` per-folder overrides (allowlist for domain/application, denylist for infrastructure/ui; `../**` banned to force aliases), `no-restricted-globals` (window, document, navigator, storage, indexedDB, fetch) in domain/application. `vitest` allowed in domain/application for tests.
- oxfmt: `semi: false`, `singleQuote: true` (template style); ignores `research`, `odd`, `AGENTS.md`, lockfile.
- No dependency build scripts were blocked by pnpm 11; nothing added to `onlyBuiltDependencies`.
- Placeholder appId `com.example.moneytracker` in `capacitor.config.ts` (to confirm before `cap add android`). Manifest has no icons.
- Offline (user-approved follow-up): `vite-plugin-pwa` 2.0.0 + `workbox-build` (peer) added as devDependencies; `registerType: 'autoUpdate'`, `manifest: false` (keeps the hand-written `public/manifest.webmanifest`). `pnpm build` generates `sw.js`, `registerSW.js` and precaches index.html, the JS bundle, `registerSW.js` and the manifest. Not verified in a real browser (offline reload, installability). Installability still needs 192/512 px icons.
- Playwright webServer: `pnpm build && pnpm preview --port 4173`.
- Follow-up (user-approved): `ui` moved from denylist to allowlist in `.oxlintrc.json` so infrastructure packages (e.g. `@capacitor-community/sqlite`) cannot be imported from `ui`. Verified: `ui` importing `@capacitor-community/sqlite` fails lint (exit 1); `react` and `zod` in `ui` pass.

Known gap: Chromium could not be downloaded in this environment (network timeouts to storage.googleapis.com), so `pnpm test:e2e` has not passed here. Run `pnpm exec playwright install chromium` in a networked shell.

## Verification evidence
- `pnpm install --frozen-lockfile` (clean node_modules): ok
- `pnpm lint`: 0 errors, 0 warnings
- `pnpm format:check`: all matched files use the correct format
- `pnpm typecheck`: exit 0
- `pnpm test`: 2 files, 3 tests passed
- `pnpm build`: built, dist contains index.html, assets, manifest.webmanifest
- Boundary proof: `src/domain/violation.ts` importing `@ui/App` -> `pnpm lint` exit 1 (`no-restricted-imports`); after removal exit 0. Also verified failing: domain->react, domain->@capacitor/core, domain->../ui relative, application->@infrastructure/@ui, infrastructure->@ui/../ui, ui->@infrastructure/../infrastructure, domain using `window`.
- `pnpm test:e2e`: FAILED to launch browser (Chromium not installed; download failed). Web server (build + preview) did start. Not verified.

## Next step
Install Chromium where network allows and run `pnpm test:e2e`; confirm appId and the offline/PWA decision; then open the PR (slice under ~400 authored lines is not guaranteed, check before pushing).
