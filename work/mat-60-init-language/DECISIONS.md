# ae-init artifacts language — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-18 — SPEC approved by the parent orchestrator (design-first
  gate), including the new-eval-04 shape call — a Spanish-README
  fixture deserves its own scenario; grafting it onto eval-01's
  generic fresh-repo fixture would weaken both.
- 2026-08-18 — Lane reviewer's Important finding (SKILL.md step 3 says
  "Settle the artifacts language" but never instructs an *ask*, while
  eval-04:15 expects "Asks the language question once") resolves
  against the SPEC on the SKILL.md side: the SPEC says "one
  settled-once language question joins the interview" — the interview
  asks. Fix wording in SKILL.md; eval-04 stands unchanged.
- 2026-08-18 — L3 recorded as n/a: single component (markdown skill +
  one template comment; no cross-component flow to execute end to end).
- 2026-08-18 — Worker-side handoff keeps the lane folder: the dispatch
  brief's worker_done report-path points at this lane's PROGRESS.md,
  the parent's adversarial ballena seat runs after worker_done, and a
  parent-requested rebase may follow — lane removal belongs to the
  terminal close after the parent merges (mat-56 precedent:
  finalize-then-remove only after the ballena verdict landed).
