# Orca-first execution (AE/2.4) — progress

## Done

- Evals pin probe + contract + primitives (6 files, committed before any
  skill content).
- reference/orca.md rewritten: probe, no-Orca contract, single-column
  mapping with the five adopted primitives.
- loops/tracker/graphs references pruned of fallback ladders.
- loop-setup, work-handoff, fan-out, work-verify on the single path
  (probe step 0, card sync, transfer recipe, agent-first spawn, browser
  e2e).
- LOOP template + example + both live loops: trigger = automation
  (`--disabled`) + manual iteration.
- ADR-001 written; docs index gains adrs/ row.
- how-it-works execution + work-lifecycle updated same-change.
- AE/2.4: CHANGELOG, both stamps, migration note.
- Reviewer low findings 1/3/4/5 fixed (registration notes, probe
  citation, worker-table spawn column, ORCA placeholder note).

## In progress

## Tried and failed

## Next

- Close the lane (work-handoff), PR, rebase-merge; then Lane 2 (tier XL).

## Verification

### 2026-08-16 — M DoD — PASS

- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global` → exit 0 (0/0/0)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (13/13);
  `node tests/run-gen-tests.mjs` → exit 0; `node tests/run-eval-checks.mjs`
  → exit 0 (fan-out 5, loop-setup 5, work-handoff 6, work-verify 4)
- L3 end-to-end: acceptance grep `Task Scheduler|/schedule|Linear MCP|plain API`
  across reference/skills/loops/how-it-works/templates → 1 hit, the eval
  line asserting absence (the permitted hit)
- Fresh-context review: PASS — reviewer re-ran all four gates itself
  (quoted exits 0), confirmed evals-before-content in commit order,
  probe/contract coherence across the four skills, stamps AE/2.4.
  0 blocking findings; 5 lows — 4 fixed in-lane, 1 recorded as
  deliberate in DECISIONS.
