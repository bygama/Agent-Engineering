# Kitchen-sink manifest — planted violations

Every violation this fixture carries, with its expected detector. The P5
acceptance: an ae-audit run must surface every row (and invent
nothing). Mechanical rows are additionally pinned by
`tests/run-lint-tests.mjs`.

## Mechanical (agent-lint)

| # | Plant | Check | Severity |
|---|---|---|---|
| 1 | `CODEX.md` per-tool adapter | adapter | high |
| 2 | AGENTS.md over 60 lines (rule-list bloat) | budget | medium |
| 3 | CLAUDE.md is 7 lines, no `@AGENTS.md` | pointer-shape | high |
| 4 | "Always read docs/architecture-notes.md before…" | read-order | high |
| 5 | Non-canonical `## Rules` section | structure | low |
| 6 | README links `docs/missing-guide.md` (absent) | broken-link | medium |
| 7 | `docs/` without README.md index | docs-index | low |
| 8 | `docs/specs/notes.md` breaks SPEC-*.md naming | naming | low |
| 9 | `skills/deploy-helper/SKILL.md` has no frontmatter | skill-frontmatter | medium |
| 10 | `work/stale-migration/` missing PLAN.md | lane-incomplete | medium |
| 11 | `work/stale-migration/` missing PROGRESS.md | lane-incomplete | medium |
| 12 | `work/Fix_Login/` slug not kebab-case | lane-slug | low |
| 13 | `PROGRESS.md` at repo root | lane-location | medium |
| 14 | feature list F02 `state: "done"` invalid | feature-schema | high |
| 15 | feature list F03 `passing` with null evidence | feature-schema | high |
| 16 | `npm run build` in Commands, no such script | cmd-drift | medium |

Not planted: `feature-regression` (requires a working tree that diverges
from HEAD — cannot exist in a committed fixture); `budget-cap`,
`stamp-missing`, `stamp-shape`, `skill-size` (deliberately absent — the
test forbids them to prove the lint stays quiet where it should).

## Judgment (ae-audit only — the lint cannot see these)

| # | Plant | Expected judgment |
|---|---|---|
| J1 | Stamp `AE/2.0` while current is newer | version drift → recommend ae-init migration, one atomic step |
| J2 | Gotcha "Write clean, readable code." | common sense restated → delete |
| J3 | Hard constraint "Prefer functional style over classes." | taste, not safety → demote or delete |
| J4 | `## Rules` list of 20 generic rules | distill: disposition each as gotcha / hard constraint / delete |
| J5 | `docs/old-onboarding.md` referenced from nowhere | dead doc → flag |
| J6 | `skills/deploy-helper/` has no evals | skill without evals → flag (standard requires ≥3) |
| J7 | `work/stale-migration/` lane for a migration README says shipped 2025-11 | stale lane → close it |
| J8 | `npm run migrate # not verified` claimed in Commands | correctly marked not-verified — must NOT be flagged as drift (honesty marker respected) |

J8 is a trap for the auditor: flagging it would be inventing a finding.

Discovered during the P5 acceptance run (true finding, not planted, kept
deliberately): the feature-list verification commands reference tests that
don't exist in the fixture — "verification realism" (medium). An audit
finding it is being honest, not inventive.
