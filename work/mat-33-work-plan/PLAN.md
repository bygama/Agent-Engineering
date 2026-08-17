# work-plan — plan

<!-- Steps with executable acceptance. Executed via relay: fresh
     implementer per step, commit per step, conventional commits. -->

- [x] S1 (judgment): evals first — `skills/work-plan/evals/eval-01..04`
  per SPEC §3 — accept: all four files exist with `## Query` +
  `## Expected behavior` + checklist lines; `node
  tests/run-eval-checks.mjs` exits 0
- [x] S2 (judgment): `skills/work-plan/SKILL.md` — the minimum that
  passes the evals, house style (frontmatter description = what + when,
  third person; body mirrors fan-out/relay register) — accept: `node
  tests/run-eval-checks.mjs` exits 0 AND `node scripts/agent-lint.mjs .
  --ignore tests,templates,global,examples` exits 0
- [x] S3 (integration): ADR-005 + amendments per SPEC §2
  (reference/skills.md, README table+chain+diagram+Status,
  docs/how-it-works/work-lifecycle.md) — accept: grep finds
  "work-plan" in all four files AND `test docs/adrs/ADR-005 exists`;
  lint exits 0
- [x] S6 (judgment): eval-05 two modes per SPEC §3 amendment — accept:
  file exists with `## Query` + `## Expected behavior` + checklist;
  `node tests/run-eval-checks.mjs` exits 0
- [x] S7 (judgment): SKILL.md gains the mode fork per SPEC §1 "Two
  modes" — accept: `node tests/run-eval-checks.mjs` AND `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exit 0
- [x] S4 (controller): four gates green — accept: self-lint ·
  run-lint-tests · run-gen-tests · run-eval-checks all exit 0
- [ ] S5 (controller): release ritual (expected MINOR) + work-verify M
  DoD + handoff close + PR — accept: CHANGELOG new entry; PASS block in
  PROGRESS; PR opens green with `Closes MAT-33`
