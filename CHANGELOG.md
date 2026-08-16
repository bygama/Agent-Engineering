# Changelog

Versions of the standard (`AE/<major>.<minor>`). Template or check changes
bump the version; docs-only refreshes do not.

## AE/2.0 — 2026-08-16

The v2 baseline: the standard is installable and auditable.

- Canonical AGENTS.md (≤60 lines, `Standard:` stamp, tier one-liner) +
  ≤3-line pointer CLAUDE.md; per-app AGENTS.md + pointer for monorepos.
- `reference/`: principles, context, memory, harness, verification,
  task-tiers, design-md, skills.
- `templates/repo/`: entry files, docs seed, `work/` four-file lane
  templates, `feature_list` schema + example; community pack (no
  CODE_OF_CONDUCT).
- `skills/agent-init` (install + v1/legacy migration) and
  `skills/agent-audit` (judgment review + drift detection), 3 evals each.
- `scripts/agent-lint`: budgets, pointer/stamp, adapters, read orders,
  links, lanes, feature-list schema/regression, DESIGN.md drift, command
  drift. 12 lint fixtures + generator self-tests.
- P0 foundation: repo identity, founding spec, `docs/how-it-works/` chapters.
