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
- 2026-08-18 — OWNER AMENDMENT (arrived mid-flight, received with the
  parent's fix-round-1 dispatch after the adversarial reviewer's FAIL;
  SUPERSEDES the 2026-08-18 "the interview asks" ruling above): the
  language convention must add ZERO friction. No interview question at
  all — artifacts (AGENTS.md, docs, community files) are ALWAYS English
  by the standard's convention as a STANDING DEFAULT; ae-init INFERS
  the repo's human-docs language (README/site) and, when it diverges
  from English, automatically writes the language-split gotcha into
  the generated AGENTS.md without asking anyone. The interview only
  mentions language if the owner spontaneously raises it. eval-04's
  "Asks the language question once" line and SKILL.md's "Ask about the
  artifacts language" / "never inferred from the README" wording are
  the exact shipped-question behavior the amendment removes.
- 2026-08-18 — Fix-round-1 commits `c97ae30`/`ab4531b` keep their
  missing Co-Authored-By trailer (reviewer Minor): both SHAs are
  already cited across PROGRESS and review evidence, and rewriting
  unpushed history to add a soft-convention trailer would invalidate
  the recorded trail — evidence integrity outweighs the trailer.
- 2026-08-18 — PLAN.md's superseded step wording (reviewer Important,
  lane hygiene) resolved by annotation, not rewrite: a dated AMENDED
  banner atop the steps points at the DECISIONS amendment and marks
  the lines as executed history — a stateless runner reading the lane
  package now meets the amendment before the stale step text.
- 2026-08-18 — Worker-side handoff keeps the lane folder: the dispatch
  brief's worker_done report-path points at this lane's PROGRESS.md,
  the parent's adversarial ballena seat runs after worker_done, and a
  parent-requested rebase may follow — lane removal belongs to the
  terminal close after the parent merges (mat-56 precedent:
  finalize-then-remove only after the ballena verdict landed).
