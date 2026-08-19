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

## In progress

- Step 1 — RED for MAT-89 (fixtures + `expectMatch` + cases).

## Tried and failed

## Next

- Steps 1-6 per PLAN.md, then work-verify → work-handoff → PR.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
