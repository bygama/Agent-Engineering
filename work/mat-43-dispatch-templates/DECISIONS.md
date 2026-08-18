# dispatch templates — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-18 — Four templates, not one generic — implementer,
  step-reviewer, re-reviewer, lane-reviewer have different contracts
  (4-state report vs both-verdicts vs ADDRESSED-scoping vs act-and-
  quote); one generic template would blur exactly the distinctions the
  evals pin.
- 2026-08-18 — lane-reviewer.md lives under work-verify, not work-run —
  the fresh-context seat is work-verify's (relay ships no final
  review, ADR-004); reference-depth rule keeps each template one level
  from ITS skill.
- 2026-08-18 — Ruling (T2 review minor): re-reviewer.md ships without
  a Calibration/Strengths section by design — a scoped re-review
  verdicts pre-identified findings, it is not a fresh review;
  strengths-first there would be filler. file:line + mandatory verdict
  are present. Deferred to the whole-lane review's triage. Cost if
  wrong: one section added later.
- 2026-08-18 — Release packaging deferred to the owner's call: solo
  MINOR (1.4.0) recommended vs one package with shaping — templates
  merge either way; only the bump timing differs.
