# work-run released runners — progress

## Done

- 2026-08-18 — Step 1 DONE (a070e32) — `skills/work-run/evals/eval-01.md`
  now expects the released-runners discipline. Fixture gained the two
  conditions the expectations need to be judgeable: step 3's review comes
  back FAIL and takes one fix round, and this runtime's runners linger
  after reporting instead of ending on their own. Four checklist lines
  added, ahead of the WIP=1 line: (1) a runner is released the moment its
  report or verdict is RECORDED — no finished runner idles waiting for
  the next step; (2) the reviewer is released once its verdict is
  recorded and each re-review seat once its re-verdict is, neither held
  open for a later step; (3) step 3's implementer is NOT released while
  its review is pending — it stays resumable for the fix loop and is
  released only once the step's verdict is recorded as Approved (or its
  fix round closes); (4) release is runtime-neutral — no-op where a
  subagent ends naturally at its report, explicit stop/release on a
  lingering runtime, never left implicit. No runtime-specific tool named.
  - Acceptance: `node tests/run-eval-checks.mjs` → exit 0, last lines
    `ok   work-run: 4 evals well-formed` / `all eval checks passed`.
  - Files changed: `skills/work-run/evals/eval-01.md` (only). The commit
    carries the eval alone, per the evals-first split-commit constraint;
    the lane files are untracked and left for the handoff to commit.
  - Concern: none blocking. Note for step 2 — the eval says "released
    only once the step's verdict is recorded as Approved (or its fix
    round closes)", while SKILL.md's step loop currently speaks of
    reviewer verdicts without the word "Approved"; step 2 should pick one
    vocabulary and use it in both files.

- 2026-08-18 — Step 1 review (fresh reviewer, capable tier): spec ✅
  Compliant, quality **Approved**. Two Minor findings deferred for
  work-verify's triage (minors never enter the fix loop):
  1. eval-01 bullet 1 states the release trigger as "report or verdict
     RECORDED" while bullet 3 carves out the implementer-awaiting-review
     case — suggested tightening: state the trigger as finished-ness
     ("released the moment it is finished — nothing further expected of
     it") and let the per-seat bullets define finished. Step 2 should
     write SKILL.md against the finished-ness framing, not copy the
     tension.
  2. eval-01's runtime-neutral bullet: the natural-end/no-op branch has
     no fixture behind it in this eval (fixture pins a lingering
     runtime) — acceptable as a wording expectation; optional split
     into another eval.
  Step 1's implementer seat: verdict Approved recorded → seat released
  (in-session subagent ended naturally — release was a no-op).

- 2026-08-18 — Step 2 DONE (52dee9c) — `skills/work-run/SKILL.md` now
  encodes the released-runners discipline eval-01 expects. Two edits:
  (1) the workflow checklist's step-2 line becomes `dispatch → report →
  review → fix loop → record → release`; (2) a new `*Release.*`
  sub-paragraph in `**2. The step loop.**`, placed after the fix-loop
  paragraph (release timing depends on fix-round closure) and before
  `*Rulings, not stalls.*`. It states the third action (record → release
  the finished runner → dispatch next), frames the trigger as
  finished-ness ("nothing further is expected of it") per the step-1
  reviewer's Minor 1 rather than copying the report-or-verdict tension,
  then defines finished per seat: reviewer on recorded verdict,
  re-review seat on recorded re-verdict, implementer NOT while its
  review is pending — resumable for the fix loop, released only on an
  Approved verdict or its fix round closing. Closes with the
  runtime-neutral contrast (no-op on natural-end subagents, explicit
  stop/release where runners linger, never implicit). No
  runtime-specific tool named. "Approved" is the house vocabulary
  already used by `skills/work-run/references/step-reviewer.md`
  (`Approved | Needs fixes`), so step 1's vocabulary concern is settled
  in both files.
  - Acceptance: `node scripts/agent-lint.mjs . --ignore
    tests,templates,global,examples` → exit 0, `0 high, 0 medium, 0 low
    — PASS`; `node tests/run-eval-checks.mjs` → exit 0, `ok   work-run:
    4 evals well-formed` / `all eval checks passed`. Also ran the other
    two SPEC gates: `node tests/run-lint-tests.mjs` → exit 0, `node
    tests/run-gen-tests.mjs` → exit 0. All four green.
  - Files changed: `skills/work-run/SKILL.md` (only) — the content
    commit is separate from and after step 1's eval commit (a070e32),
    per the evals-first split-commit constraint. Lane files untracked,
    left for the handoff. SKILL.md is 142 lines (fresh-context review
    corrected the original 143 claim), well under the lint's <500 cap.
  - Concern: none blocking. Checked the AGENTS.md docs hard constraint
    against the SPEC's scope fence: `docs/how-it-works/work-lifecycle.md`
    (line 139) explicitly delegates fix-loop-level detail to "the skill's
    own doc", and no chapter enumerates the step-loop actions, so no
    how-it-works chapter is stale — the fence holds, no docs edit owed.

- 2026-08-18 — Step 2 review (fresh reviewer, capable tier): spec ✅
  Compliant, quality **Approved** — all four eval-01 release behaviors
  encoded clause-for-clause, vocabulary consistent with
  `references/step-reviewer.md` ("Approved"), commit shape respects the
  split-commit and scope constraints. Minors deferred for work-verify's
  triage:
  1. "or its fix round closes" (SKILL.md ~:95) ambiguous in isolation
     (rounds 1-3 resume the same implementer) — reconcilable via the
     paragraph's finished-ness rule; phrase inherited verbatim from
     SPEC/eval, so left as the binding wording.
  2. Optional polish: no `## Red flags` row for "I'll keep the reviewer
     around, step 4 needs one too" — out of the step's named scope,
     correctly omitted.
  3. ⚠️ `docs/how-it-works/work-lifecycle.md` owns work-run's inner loop
     but delegates this altitude to the skill and never enumerates the
     loop's terminal action — nothing becomes false; noted for the lane
     gate.
  4. ⚠️ commit order (eval before content) not verifiable from the diff
     alone — verified by the controller: `git log` shows a070e32 (eval)
     parent of 52dee9c (content).
  Step 2's implementer seat: verdict Approved recorded → seat released
  (no-op, natural end). Step 2's reviewer seat: verdict recorded → seat
  released (no-op, natural end).

## In progress

## Tried and failed

## Next

- Lane closes with this handoff (M DoD PASS above). Remaining outside
  the lane: PR open on branch `bygama/mat-56-released-runners`; the
  parent orchestrator merges after its own reviewers pass and a rebase
  onto fresh main at its request — the worker never merges. No version
  bump/CHANGELOG here; the release ritual owns those (candidate for the
  1.3.0 set).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

### 2026-08-18 — M DoD — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (`all 13 cases
  passed`); `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases
  passed`); `node tests/run-eval-checks.mjs` → exit 0 (`all eval checks
  passed`, `work-run: 4 evals well-formed`)
- L3 end-to-end: n/a: single component (`skills/work-run/` only —
  recorded in DECISIONS; range confirmed clean of anything else via
  `git diff 2696b8c..52dee9c -- . ':(exclude)skills/work-run/'` → empty)
- Fresh-context review: **PASS** — reviewer ran all four gates itself
  (all exit 0), verified commit topology (a070e32 parent of 52dee9c, one
  file each), the record → release → dispatch-next encoding with timing
  nuance, runtime neutrality (`git grep` for runtime tools → no matches),
  no bump/CHANGELOG/restamp. Three Minor wording findings, none blocking
  (eval bullet-1 trigger phrasing inherited from SPEC; eval scope drift
  toward whole-step-loop; PROGRESS line-count nit, fixed).
- Adversarial review (ballena — opencode-go/deepseek-v4-flash):
  **survived** — five attacks mounted (missing third action, missing
  timing nuance, runtime-specific tool, eval↔SKILL mismatch, commit
  order/mixing), all refuted with quoted evidence; ran all four gates
  itself, all exit 0. Two Minors confirmed as the already-triaged
  deferred ones. Report: session scratch `adversarial-report.txt`.

<!-- First read of every session. If it isn't here, it didn't happen. -->
