# Single-shot worker_done + upstream attribution stance — progress

## Done

- Lane opened on branch `bygama/mat-104-94-single-shot-attrib` (cut
  from `bygama/mat-100-101-ballena-auto`, stacked on PR #77).
- SPEC.md written from the parent's dispatch brief (design-first);
  approved by the parent 2026-08-19 (see DECISIONS.md).
- PLAN.md shaped: 6 steps, evals first.
- Step 1: `skills/orchestrate/evals/eval-03.md` gained the
  degenerate-worker_done assertions before any content edit — a new
  Fixture paragraph (the ballena's real PASS body fails to parse, the
  seat test-fires `--subject "t" --body "t"` which lands as the one
  `worker_done` and burns the single shot, transcript keeps advancing,
  Orca's rejection of the earlier send quotes the original body
  verbatim) plus two new `## Expected behavior` bullets: (a) the
  degenerate worker_done with an advancing transcript is neither idle
  nor a FAIL — diagnose with `worker-read`, ack the placeholder as
  noise, hold for the follow-up; (b) worker_done is single-shot, so the
  real verdict surfaces only inside Orca's rejected-worker_done wrapper
  quoting the original body verbatim — valid verdict evidence once it
  reaches the lane, routed on like any PASS/FAIL body. Inserted between
  the existing stall-clock bullet and the FAIL-routing bullet
  (chronological fit: verdict-arrival handling before verdict-routing).
  Acceptance: `node tests/run-eval-checks.mjs` exits 0 (all 13 skills'
  evals well-formed); `grep -c 'worker-read'
  skills/orchestrate/evals/eval-03.md` = 2 (≥ 1 required). No other file
  touched.

## In progress

## Tried and failed

## Next

- work-run the PLAN, step 2 (seat-side single-shot warning in
  `skills/orchestrate/references/reviewer.md` and
  `reference/runners.md`).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
