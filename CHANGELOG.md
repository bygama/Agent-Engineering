# Changelog

Versions of the standard (`AE/<major>.<minor>`). Template or check changes
bump the version; docs-only refreshes do not.

## AE/2.3 — 2026-08-16

Hardening: the checks got checked.

- Check change (the bump): `agent-lint` cmd-drift now honors the
  `# not verified` honesty marker — commands the standard itself says to
  mark that way are no longer false-positived. Found by the new
  kitchen-sink fixture on its first run.
- `tests/fixtures/kitchen-sink/`: composite broken repo (16 mechanical +
  8 judgment plants) with a planted-violations MANIFEST; lint suite pins
  its mechanical subset (13 cases).
- `tests/run-eval-checks.mjs`: the ≥3-evals-per-skill contract is now
  executable (structure: Query + Expected behavior + checklists).
- Failure-derived evals from P2-P4 real failures (tracked loop state
  self-blocks; ambiguous anchors; close destroying uncommitted evidence)
  + the skill lines they pin.

## AE/2.2 — 2026-08-16

The loop layer: standing automation as a file artifact.

- `templates/repo/loops/` (the bump): `LOOP.md.template` — five elements
  (stopping rule, verified gate, numeric budget + 2-strikes failure
  budget, state file, trigger with named no-Orca fallback) — plus the
  `issue-triage.example.md` worked example. New optional artifact; nothing
  to migrate in existing repos.
- `skills/loop-setup` (loop filter, five elements, run protocol,
  report-only writes by default), 4 evals written first.
- `reference/loops.md`, `reference/orca.md` (mapping table with verified
  CLI syntax + fallbacks), `reference/tracker.md` (two planes, gate rule,
  connector ladder).

## AE/2.1 — 2026-08-16

Daily-use discipline: evidence-gated completion and clean-state handoffs.

- `skills/work-verify` (tier DoD by command — three layers, fresh-context
  review at M+, refuses "done" without evidence) and `skills/work-handoff`
  (close|pause exits, debris sweep, lane closure, Linear status/comment via
  `orca linear` with MCP/operator fallback), 4 evals each.
- Template change (the bump): `PROGRESS.md` gains a `## Verification`
  section — PASS evidence written by work-verify, gate consumed by
  work-handoff. Migration: append the section to open lanes, restamp.
- Skill prose de-hardcoded from version literals: "current" now always
  means the newest entry in this changelog.

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
