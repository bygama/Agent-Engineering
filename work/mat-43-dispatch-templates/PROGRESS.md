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

- 2026-08-18 — T3: SKILL.md pointer lines + the work-lifecycle.md
  sentence. `skills/work-run/SKILL.md` — Dispatch clause points at
  `references/implementer.md`, Review clause at
  `references/step-reviewer.md`, Fix-loop clause at
  `references/re-reviewer.md` (all one clause each, body still 130
  lines). `skills/work-verify/SKILL.md` step 4 (fresh-context review)
  points at `references/lane-reviewer.md`. `docs/how-it-works/work-lifecycle.md`
  — one sentence added to the work-run inner-loop paragraph: the
  dispatch and review prompts ship as fill-in templates with the
  skills (`references/`), so controllers never improvise them. `grep`
  finds both required pointer strings; `node scripts/agent-lint.mjs .
  --ignore tests,templates,global,examples` exits 0 (0 findings); `node
  tests/run-eval-checks.mjs` exits 0.

## In progress

## Tried and failed

## Next

- T4: four gates + work-verify (fresh whole-diff review) + handoff +
  PR; release per owner's packaging call.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

### 2026-08-18 — M DoD — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → exit 0 (0 high, 0 medium, 0 low)
- L2 behavioral: `run-lint-tests` (13) · `run-gen-tests` · `run-eval-checks` (11 skills; work-run 4, work-verify 6) → all exit 0
- L3 end-to-end: T3 acceptance greps exit 0; consumer simulation — reviewer filled all four templates against the SKILL.md contracts, placeholder sets match exactly; its own dispatch was a live positive test of lane-reviewer.md
- Fresh-context review: PASS — no findings; no-bump ruling verified (CHANGELOG/stamp/migration untouched, AGENTS.md still AE/1.3.0)
- Adversarial review: n/a — M tier, not requested
- work-run record: T1 13ce4c3 · T2 5b16180 · T3 6c46ecb — three steps, three clean reviews, fix loop never fired, 2 controller rulings (re-reviewer calibration; no-bump packaging)
