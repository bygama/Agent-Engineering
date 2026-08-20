# Remove `global/`; global-layer doctrine to `reference/` — progress

## Done

- 2026-08-20 — Lane opened. SPEC.md written in design-first mode;
  parent approved at the SPEC gate and ruled on the three fence
  collisions (A=repoint, B=leave/MAT-114, C=leave/next sweep). Rulings
  quoted in DECISIONS.md. PLAN.md shaped: 11 steps.
- 2026-08-20 — Precondition verified: workstation `main` @ `22f3619`
  carries the canonical header and both hook scripts (MAT-110 merged).
- 2026-08-20 — Baseline gate green before any edit:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`.

## In progress

- PLAN step 1.

## Tried and failed

## Next

- Execute PLAN steps 1-11 under work-run, then work-verify, then
  work-handoff + PR.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
