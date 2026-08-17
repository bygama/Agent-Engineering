# Contributing to Agent-Engineering

This repo is the source of truth for the agent-engineering standard — and
its own first consumer. Every rule below is one the repo enforces on
itself; nothing here may violate the standard it defines.

## Workflow

- `main` is PR-only; merges are **rebase merges**; pull with
  `git pull --rebase`.
- Branch from `main`: `feat/<topic>` or `fix/<topic>` (tracker-linked
  work uses Linear's branch format and carries the issue key).
- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`.
  Atomic — one "why" per commit.

## Before opening a PR

Run the four gates — all must exit 0. CI runs the same four on every PR
(`.github/workflows/gates.yml`) and `main` requires the check green, so
a red gate physically blocks the merge:

```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
node tests/run-lint-tests.mjs
node tests/run-gen-tests.mjs
node tests/run-eval-checks.mjs
```

House rules the PR template will ask you about:

- **Evals before content** — touching a skill means its evals change
  FIRST, in their own commit.
- **Same-change rule** — a change that alters structure or behavior
  updates the affected `docs/how-it-works/` chapter in the same PR.
- **Version bumps** — template or check changes bump `AE/<major>.<minor>`
  (`CHANGELOG.md` entry + migration note + restamp surfaces, see the
  CHANGELOG header). Docs-only changes bump nothing.

## Reporting problems with the standard

Found a check false-positive, template bug, or migration gap while using
the standard in your own repo? Open an issue with the **Upstream report**
template. Issues are not worked from GitHub — they get triaged into the
maintainer's tracker (you'll see a "tracked as MAT-xx" comment) and fixes
come back through the normal release flow.

## Merging

PRs are reviewed before merge; keep them small and focused. The PR body
carries `Closes <KEY>` when the work is tracker-linked.
