# Tier XL (AE/2.5) — progress

## Done

- Evals pin XL (work-verify eval-05 synthesis gate, fan-out eval-01
  mandatory-at-XL, agent-init eval-01 seed pin) — each committed before
  the content it pins.
- reference/task-tiers.md: recognition cues + micro-examples per tier,
  XL row, L→XL ratchet, Card mapping (Orca). 76 lines.
- work-verify XL DoD (per-lane L + synthesis gate; PASS block names the
  synthesis command); fan-out mandatory at XL.
- templates/repo/docs/tiers.md (self-contained consumer guide) +
  one-liner with XL + docs index row + agent-init instantiation.
- ADR-002; how-it-works triage diagram (fits-one-lane diamond), XL table
  row, execution.md fan-out↔XL binding, architecture.md seed line.
- AE/2.5: CHANGELOG, both stamps, migration note. Seed dry-run on a
  scratch fixture landed docs/tiers.md indexed.

## In progress

## Tried and failed

## Next

- Close the lane (work-handoff), PR, rebase-merge.

## Verification

### 2026-08-16 — M DoD — PASS

- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global` → exit 0 (0/0/0)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (13/13);
  `node tests/run-gen-tests.mjs` → exit 0; `node tests/run-eval-checks.mjs`
  → exit 0 (work-verify 5, fan-out 5 well-formed)
- L3 end-to-end: old one-liner grep → 0 hits outside history/fixtures;
  seed dry-run: docs/tiers.md lands + indexed — OK
- Fresh-context review: PASS — reviewer re-ran all four gates itself
  (quoted exits 0), confirmed evals-before-content in commit order and
  word-consistent XL definition across ADR-002 / reference / consumer
  guide / how-it-works ("no drift found"). 0 blocking; 1 non-blocking
  (this file was stale — trued up in this commit) + 2 lows (fixture
  staleness deferred, formatting nit).
