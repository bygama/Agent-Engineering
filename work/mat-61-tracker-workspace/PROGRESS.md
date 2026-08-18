---
issue: MAT-61
---
# Repo declares its tracker workspace — progress

## Done

- SPEC.md written from the parent's shaped design and approved (blocking
  ask, ruling recorded in DECISIONS.md).
- PLAN.md shaped: 6 steps, evals before content, split commits.
- Step 1 DONE — evals for the tracker declaration, written before any skill
  content. New `skills/ae-init/evals/eval-05.md`: fresh install in a
  tracker-connected Orca/Linear workspace where the session's LIVE binding
  resolves to the WRONG workspace (`acme`) while the repo tracks in
  `bygama` / team `MAT` / project `Agent-Engineering`. It grades the
  question asked exactly once and only because a tracker is in play, the
  live binding never used as the answer (the named regression), "none"
  accepted with no line and nothing else changed, the declaration line
  landing directly under the `Standard: AE/<version>` stamp above the
  summary in the canonical format, the `· project <project>` segment
  omitted when the repo has none, the line written in English, one line
  and nothing more, the existing prompt-template reminder still firing,
  and the rest of the fresh-install contract unchanged. Second run in the
  same fixture covers the "none" branch. `skills/ae-init/evals/eval-01.md`
  gains one checklist line guarding the negative case (no tracker in play
  → no tracker question, no `Tracker:` line), placed with the interview
  items. Format follows the house 3-section shape (eval-04 precedent, plus
  eval-05-of-work-handoff's origin-failure preamble).
  Acceptance: `node tests/run-eval-checks.mjs` → `ok   ae-init: 5 evals
  well-formed` … `all eval checks passed`, exit 0. Also ran the self-lint
  (`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0) since evals are inside the
  linted tree. Files changed: `skills/ae-init/evals/eval-05.md` (new),
  `skills/ae-init/evals/eval-01.md`. No concerns: the eval names the
  canonical format literally once (the fixture's concrete values) and
  otherwise cites `reference/tracker.md`, so step 2 stays the single source
  of truth for the format.

## In progress

- work-run dispatch of PLAN steps 1-6.

## Tried and failed

## Next

- Execute PLAN steps in order; four gates; work-verify; PR; handoff.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
