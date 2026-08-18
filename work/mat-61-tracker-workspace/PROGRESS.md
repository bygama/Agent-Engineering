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

- Step 2 DONE — `reference/tracker.md` gains "Which workspace — the repo
  declares, tools obey", placed after "Connector: Orca CLI" and directly
  before "Without Orca" so the two "no write, emit the operation instead"
  contracts sit adjacent and the cited pattern is one paragraph away. The
  section carries: the origin failure in one sentence (per-workspace tool
  bindings), the canonical line in a fenced block
  (`Tracker: Linear — workspace <workspace> · team <KEY> · project
  <project>`) with placement (always-loaded, directly under the `Standard:
  AE/<version>` stamp, above the summary), `<workspace>` defined as the
  URL slug, the `· project <project>` segment omitted when the repo has
  none, ae-init as the writer (asked once, never inferred from the live
  session), and an explicit "cite this section, never restate it" so
  steps 3/5/6 have one source of truth. Then the respect rule: before ANY
  tracker write (status move, comment, attachment, issue create) compare
  live binding vs declaration; mismatch → NO write, state it (declared /
  resolved / tracker NOT updated) + emit the exact command + payload for
  the operator, named as the same pattern as the no-Orca contract; no
  declaration line → rule inert, pre-declaration repos unchanged.
  Live-binding facts verified on-machine before writing (dated in the
  text): `orca linear issue MAT-61 --json` → `meta.resolved.workspaceName`
  = "Mateo Garcia" / `workspaceId`; `orca linear list --filter assigned
  --limit 1 --json` → a `workspace` object per row; the resolved URL is
  `https://linear.app/bygama/issue/MAT-61/…`. That surfaced a precision
  worth encoding: `workspaceName` is the DISPLAY name ("Mateo Garcia") and
  does not equal the slug (`bygama`) the declaration names — so the rule
  says compare slugs, otherwise a correct binding reads as a mismatch.
  Acceptance: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
  exit 0. Also ran the other three gates green (lint self-tests, gen
  self-tests, eval-structure suite — all exit 0). Files changed:
  `reference/tracker.md` only. Consistent with step 1's eval-05, which
  grades exactly this format, placement and the "never guess from the live
  binding" regression. No concerns.

- Step 1 review: ✅ spec-compliant, Approved (fresh reviewer, sonnet).
  Two Minor findings deferred to work-verify triage: (a) eval-05's
  format bullet partially restates the canonical structure it cites from
  `reference/tracker.md` — could trim to the citation alone; (b) eval-05's
  fixture never states explicitly that the owner's answer IS the ground
  truth values (inferable from Expected behavior).

## In progress

- work-run dispatch of PLAN steps 2-6.

## Tried and failed

## Next

- Execute PLAN steps in order; four gates; work-verify; PR; handoff.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
