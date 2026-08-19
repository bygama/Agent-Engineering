# skill-authoring — progress

## Done

- S1 evals-first: 5 evals, each checklist line traced to an observed
  failure (the two RED baselines are recorded in DECISIONS.md).
- S2 `skills/skill-authoring/SKILL.md` — the method only, law cited.
- S3 `references/testing-with-subagents.md` — probe formats, ToC, one
  level deep.
- S4 `reference/skills.md` supersession table (writing-skills →
  skill-authoring, ADR-005; plus the two forward `bygama/skills` rows).
- S5 eleven skills across README, architecture.md, standard-lifecycle.md
  and the AGENTS.md Map line (stamp untouched).
- S6 REFACTOR: both baseline scenarios re-run with the skill present on
  fresh scenarios with `evals/` fenced; three holes found and closed
  (answer-key access, uncollected probes, "a request is not evidence").
  Fresh-context whole-lane review run and dispositioned — 17 findings,
  5 blockers, all fixed (DECISIONS.md).

## In progress

- Nothing. Lane is verified; handoff is the last action.

## Tried and failed

- F04's first stored verification command was a JS syntax error: a
  `\n` inside the JSON string decoded to a literal newline, so the
  command could never exit 0 — while the row claimed `passing` on it.
  Caught by the fresh-context review, not by me. Replaced with a
  newline-literal-free form and every stored command is now executed
  as stored before any row moves.

## Next

- Parent's review wave, then the parent rebases and merges. Not merged
  by this lane.
- Follow-up owned by the parent: using-ae's map row for
  `skill-authoring` (+ the 80-line budget trim it needs).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

### PASS — 2026-08-19, L-tier DoD, commit 2d069cc + review fixes

- Static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS` (exit 0)
- `node tests/run-lint-tests.mjs` → `all 16 cases passed` (exit 0)
- `node tests/run-gen-tests.mjs` → `all gen cases passed` (exit 0)
- `node tests/run-eval-checks.mjs` → `all eval checks passed`, incl.
  `ok skill-authoring: 5 evals well-formed` (exit 0)
- feature_list.json: F01-F06 all `passing`; every stored `verification`
  command re-executed AS STORED, all six exit 0.
- Behavioral: 2 RED baselines + 5 re-tests with the skill present, on
  scenarios that are not their own eval queries, `evals/` fenced.
  eval-01 6/6, eval-02 6/6, eval-04 5/5 clean; eval-03 mixed → hole
  found and closed. Evidence in DECISIONS.md.
- Fresh-context whole-lane review: 17 findings, 5 blockers, all
  dispositioned in DECISIONS.md; gates re-run green after the fixes.
- Fence verified by diff: `skills/using-ae/**`, CHANGELOG.md, `global/`,
  `templates/`, `examples/` untouched; AGENTS.md stamp still AE/1.4.0.

<!-- First read of every session. If it isn't here, it didn't happen. -->
