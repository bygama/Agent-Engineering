# dispatch templates — progress

## Done

- 2026-08-18 — T1: eval edits per SPEC "Evals first". Extended
  `skills/work-run/evals/eval-01.md` (implementer dispatch composed
  from `skills/work-run/references/implementer.md`'s four
  placeholders; per-step review dispatch composed from
  `skills/work-run/references/step-reviewer.md`'s three inputs) and
  `skills/work-run/evals/eval-02.md` (scoped re-review dispatch
  composed from `skills/work-run/references/re-reviewer.md`); extended
  `skills/work-verify/evals/eval-03.md` (fresh-context reviewer
  dispatch composed from `skills/work-verify/references/lane-reviewer.md`'s
  three inputs — lane path, diff range, DoD). `node
  tests/run-eval-checks.mjs` exits 0.

- 2026-08-18 — T2: the four templates per SPEC "Constraints". Created
  `skills/work-run/references/implementer.md` (lane path + step number +
  step's PLAN line + 4-state report contract + no-subagents rule),
  `skills/work-run/references/step-reviewer.md` (three inputs — diff
  file, PLAN step, SPEC path — both verdicts, Critical/Important/Minor
  with file:line, read-only + no-subagents), `skills/work-run/references/re-reviewer.md`
  (scoped to the fix diff, ADDRESSED/NOT ADDRESSED per finding, new
  breakage only), and `skills/work-verify/references/lane-reviewer.md`
  (lane path + diff range + DoD, act-and-quote, PASS/FAIL). Stole
  calibration, strengths-first, file:line, mandatory verdict, read-only
  review, no-subagents, and don't-review-unread-code from superpowers'
  four source templates, adapted to the lane shape (no
  workspace/ledger/plan-file concepts). `node scripts/agent-lint.mjs .
  --ignore tests,templates,global,examples` exits 0 (0 findings); `node
  tests/run-eval-checks.mjs` exits 0.

## In progress

## Tried and failed

## Next

- T3: SKILL.md pointer lines + the work-lifecycle.md sentence.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
