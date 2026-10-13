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
- [ ] T1 Git repo, `.gitignore`, baseline commit with `AGENTS.md` (route: inline)
- [ ] T2 Vite + React + TS scaffold with pnpm, template stripped (route: delegated)
- [ ] T3 Layer folders, aliases (tsconfig + Vite), placeholder per layer (route: delegated)
- [ ] T4 oxlint + oxfmt config, boundary rules, scripts (route: delegated)
- [ ] T5 zod + Vitest + Testing Library, one domain test (route: delegated)
- [ ] T6 TanStack Router + Query minimal wiring, one placeholder route (route: delegated)
- [ ] T7 Capacitor config + sqlite plugin deps, PWA manifest (route: delegated)
- [ ] T8 Playwright (Chromium) config + one smoke test (route: delegated)

## Acceptance
- `pnpm install`, `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass.
- A deliberate import violation (e.g. `domain` importing `ui`) fails lint.
- `pnpm dev` serves the placeholder route.

## Progress
Not started.

## Verification evidence
None yet.

## Next step
T1.
