# agent-lint accuracy (MAT-89 + MAT-92) — progress

<!-- First read of every session. If it isn't here, it didn't happen. -->

## Done

- Investigated both tickets against clean main (9fc4bda) before touching
  anything. MAT-89 reproduced with a scratch repo citing one escaping and
  one in-repo `node` path, both absent:

  ```
  MEDIUM AGENTS.md:7  file not found: ../Agent-Engineering/scripts/agent-lint.mjs  [cmd-drift]
  MEDIUM AGENTS.md:8  file not found: scripts/missing.mjs  [cmd-drift]
  0 high, 2 medium, 0 low — FAIL
  ```

  Line 7 is the false positive; line 8 is the behavior to protect.
- MAT-92 investigated: the 80-line cap is stated nowhere in the standard
  (evidence and greps in DECISIONS.md, entry 4). `reference/skills.md:79`
  names the entry skill without a number.
- SPEC.md written from the parent's shaped design; design-first gate sent
  as a blocking `ask` with the `reference/skills.md` fence question.
- Parent ruled: SPEC approved; `reference/skills.md` may be MODIFIED (fold
  the number into :79-80, file stays at 119 lines), not extended.
- PLAN.md shaped: 6 steps, grader-before-check ordering as a lane-wide
  constraint.

- **Step 1 DONE — RED for MAT-89.** Added `tests/fixtures/cmd-escaping/`
  (absent `node ../sibling-toolchain/scripts/agent-lint.mjs .` plus a
  present `node scripts/present.mjs`) and
  `tests/fixtures/cmd-inrepo-drift/` (absent `node scripts/missing.mjs`);
  `tests/run-lint-tests.mjs` gained `expectMatch`, the mirror of
  `forbidMatch`, and both cases. Acceptance — `node
  tests/run-lint-tests.mjs` exits 1, RED for the right reason:

  ```
  FAIL cross-repo sibling path reports low, does not fail the lint
    expected fail=false, got true
    no finding message matched expected "escapes the repo"
    no finding message matched expected "sibling checkout"
    findings: cmd-drift
  ok   in-repo path that no longer exists still fails the lint
  1/18 cases failed
  ```

  The guard case is green from birth by design (it grades behavior that
  already works). Declared as a regression guard and proven to bite with
  a throwaway mutation probe — the `node <path>` existence branch
  commented out, runner re-run, then `git checkout --` restored the file:

  ```
  FAIL in-repo path that no longer exists still fails the lint
    expected fail=true, got false
    missing expected finding "cmd-drift"
    no finding message matched expected "file not found: scripts/missing.mjs"
  ```

- **Step 2 DONE — GREEN for MAT-89.** `scripts/agent-lint.mjs` resolves the
  cited `node <path>` against the root once and classifies before judging:
  escaping (`relative()` starts with `..`, or absolute) and missing → `low`
  naming the context-dependence; escaping and present → nothing; in-repo and
  missing → the unchanged MEDIUM. Header comment documents the exemption
  beside the pointer one. Acceptance — `node tests/run-lint-tests.mjs`
  exits 0, `all 18 cases passed`, including both step-1 cases.

  Real-world re-run of the §Problem 1 repro, same scratch repo:

  ```
  MEDIUM AGENTS.md:8  file not found: scripts/missing.mjs  [cmd-drift]
  LOW    AGENTS.md:7  ../Agent-Engineering/scripts/agent-lint.mjs escapes the repo
                      — context-dependent, resolves only where the sibling
                      checkout exists  [cmd-drift]
  ```

- **Step 3 DONE — RED for MAT-92, law first.** `reference/skills.md` :79-80
  now states the cap inside the sentence that already named the entry skill
  ("…always-loaded entry point (SessionStart), hard-capped at 80 lines…"),
  folded per the parent's ruling — the file is still exactly 119 lines of
  its 120 cap. Added `tests/fixtures/entry-skill-ok/`
  (`skills/using-ae/SKILL.md` at exactly 80) and
  `tests/fixtures/entry-skill-bloat/` (the same file at 81, differing by one
  line) plus both cases. Acceptance — `node tests/run-lint-tests.mjs`
  exits 1, RED for the right reason, boundary case already green:

  ```
  ok   entry skill exactly at the always-loaded cap passes
  FAIL entry skill one line over the always-loaded cap fails
    expected fail=true, got false
    missing expected finding "entry-skill-cap"
    no finding message matched expected "81 lines"
    findings: (none)
  1/20 cases failed
  ```

  `wc -l reference/skills.md` → 119.

- **Step 4 DONE — GREEN for MAT-92.** `scripts/agent-lint.mjs` gained
  `ENTRY_SKILL` / `ENTRY_SKILL_CAP` beside the existing skill loop, with a
  pointer comment citing the `reference/skills.md` statement step 3 wrote —
  the shape the file already uses for the AGENTS.md budgets. Fires
  `medium` / `entry-skill-cap` when that exact path exceeds the cap; repos
  that do not vendor the entry skill are unaffected. Acceptance:

  ```
  ok   entry skill exactly at the always-loaded cap passes
  ok   entry skill one line over the always-loaded cap fails
  all 20 cases passed                                    (exit 0)

  agent-lint …\mat-89-lint-accuracy
  0 high, 0 medium, 0 low — PASS                         (exit 0)
  ```

  The live entry skill measures 78 lines and stays silent; the constant is
  a single shared string, so the fixtures grade the path itself — a typo
  would turn both entry-skill cases red rather than dying silently.

## In progress

- Step 5 — docs/how-it-works/standard-lifecycle.md.

## Tried and failed

## Next

- Steps 1-6 per PLAN.md, then work-verify → work-handoff → PR.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
