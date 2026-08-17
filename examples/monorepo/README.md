# Example: monorepo

A pnpm/turborepo workspace. What to notice:

- **Root [AGENTS.md](AGENTS.md)** stays repo-wide: workspace commands,
  cross-cutting gotchas, the import rule that protects the architecture.
  The **Map block earns its place** here — per-app context genuinely
  isn't obvious from the root.
- **Per-app [apps/web/AGENTS.md](apps/web/AGENTS.md)** is ≤30 lines and
  only says what is true *inside that app* (RSC discipline, thin route
  handlers). Each app carries its own 1-line pointer `CLAUDE.md`.
- The external-dependents answer landed as a root gotcha ("free to break
  internal interfaces") — it governs how boldly agents may refactor.
- `apps/api` is omitted here for brevity; in a real install every app
  with its own conventions gets the same pair.
