# shaping — plan

<!-- Executed via work-run; dispatches composed from
     skills/work-run/references/ templates (their first production
     use). Global constraints: SPEC §1 (narrow scope, no re-triage, no
     own artifacts) and §4 verbatim in every dispatch. -->

- [x] H1 (judgment): ALL eval work first — new
  `skills/shaping/evals/eval-01..04` per SPEC §4 + reword
  `skills/work-plan/evals/eval-05.md` scenario (c) ("points at
  brainstorming" → "invokes shaping") + one routing line in a
  `skills/using-ae/evals/` checklist — accept: `node
  tests/run-eval-checks.mjs` exits 0; F01 command green
- [x] H2 (judgment): `skills/shaping/SKILL.md` — the minimum that
  passes the evals, house register — accept: F02 command exits 0 AND
  `node tests/run-eval-checks.mjs` exits 0
- [x] H3 (integration): ADR-006 + `reference/skills.md` supersession +
  `skills/work-plan/SKILL.md` refusal reword + `skills/using-ae/SKILL.md`
  map row (≤80 lines held) — accept: F03 and F04 commands exit 0; lint
  exits 0
- [x] H4 (integration): README (ten skills + chain + adoption phrasing)
  + work-lifecycle + standard-lifecycle mentions — accept: F05 command
  exits 0; lint exits 0
- [x] H5 (controller): four gates + release ritual — the 1.3.1 package
  entry (templates + shaping, ADR-007 owner-designated small; restamp
  surfaces to AE/1.3.1; migration note) + work-verify (fresh whole-lane
  review; feature rows to passing on evidence) + handoff + PR — accept:
  F06 command exits 0; PASS block; PR opens green with `Closes MAT-45`
