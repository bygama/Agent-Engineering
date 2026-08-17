# using-ae — progress

## Done

- 2026-08-17 — U1 — wrote `skills/using-ae/evals/eval-01..03` per
  SPEC §4 (entry, precedence, hook) — acceptance: `node
  tests/run-eval-checks.mjs` → exit 0 (using-ae has no SKILL.md yet so
  the runner skips the dir per its own rule; manually verified via
  grep that all three files carry `## Query` + `## Expected behavior`
  + checklist lines — 5, 5, 6 checklist lines respectively). Evals pin
  behavior the not-yet-written skill/hook must induce; eval-03 says so
  explicitly and fails today by design until U2/U3 ship.

## In progress

- 2026-08-17 — Lane opened; design approved by owner in chat (with
  work-plan's two-mode amendment). Executing U1-U3 via relay.

## Tried and failed

## Next

- U1 dispatch (evals, judgment tier).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
