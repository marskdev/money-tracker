# AGENTS.md

## Architecture: layer boundaries

Hexagonal architecture in a single package. Layers live in `src/` and dependencies point inward only.

```
src/
├── domain/          # entities, rules, zod schemas
├── application/     # use cases and ports
├── infrastructure/  # adapters (SQLite, IndexedDB)
└── ui/              # React, TanStack Router/Query
```

Allowed imports:

| Layer            | May import from                          |
| ---------------- | ---------------------------------------- |
| `domain`         | `zod` only                               |
| `application`    | `domain`                                 |
| `infrastructure` | `application`, `domain`                  |
| `ui`             | `application`, `domain`                  |

Rules:

- `domain` and `application` must not import React, Capacitor, browser APIs, or anything from `infrastructure` or `ui`.
- `infrastructure` and `ui` must not import from each other. Wiring happens at the composition root.
- Import across layers through aliases (`@domain/*`, `@application/*`, `@infrastructure/*`, `@ui/*`), never long relative paths.
- Enforce these rules with lint (oxlint). A boundary violation is a bug, not a style issue.

Why: the layers are expected to become separate packages when a second app or backend reuses `domain`/`application`. Respecting the boundaries now keeps that migration mechanical.

## Workflow

After a PR merges, switch to `main`, pull, and delete the local branch of that PR.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`marskdev/money-tracker`, via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
