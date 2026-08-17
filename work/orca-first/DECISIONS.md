# Orca-first execution (AE/2.4) — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-16 — No SPEC.md in this lane — the approved design doc
  (`docs/plans/2026-08-16-orca-first-xl-design.md`) is the spec; duplicating
  it would create two sources of truth.
- 2026-08-16 — Lane branch `feat/orca-first` continues from
  `design/orca-first-xl` — the PR carries design + plan + implementation as
  one linear story under rebase-merge.
- 2026-08-16 — Kept illustrative cron//loop mentions in
  `reference/loops.md` ("any runner executes the same contract") and
  `execution.md` ("a cron job fires it on a bare machine") — reviewer low
  finding 2 — because they state the artifact-neutrality property, not a
  maintained recipe; ADR-001 keeps artifacts neutral by design.
- 2026-08-16 — Probe step 0 added to the three orchestrating skills
  (loop-setup, work-handoff, fan-out); work-verify cites the probe inside
  its L3 note instead — its only Orca touchpoint.
