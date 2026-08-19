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

## In progress

- Step 2 — GREEN for MAT-89 (escaping-path classification in the lint).

## Tried and failed

## Next

- Steps 1-6 per PLAN.md, then work-verify → work-handoff → PR.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
