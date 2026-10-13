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
