# skill-authoring — plan

<!-- Executed via work-run. Global constraints, carried into EVERY
     dispatch: (1) the skill ships the METHOD only — frontmatter rules,
     budgets, degrees of freedom, progressive disclosure and the
     >=3-evals skeleton stay law in `reference/skills.md` and are cited
     by pointer, never restated (SPEC §1); (2) evals change before
     content, every commit; (3) the fence (SPEC §6) is absolute —
     `skills/using-ae/**`, CHANGELOG.md, the AGENTS.md stamp,
     `global/`, `templates/`, `examples/` are untouchable, and this
     lane ships no release. -->

- [ ] S1 (judgment): record the RED baseline evidence in DECISIONS.md
  (two fresh-context runs, no skill present: authoring-under-pressure
  and form-choice-for-a-shape-failure), then write
  `skills/skill-authoring/evals/eval-01..04` per SPEC §4 — each eval's
  `## Expected behavior` checklist derived from an observed baseline
  failure, never an imagined one — accept: `node
  tests/run-eval-checks.mjs` exits 0 and reports `skill-authoring: 4
  evals well-formed`; F01 command green
- [ ] S2 (judgment): `skills/skill-authoring/SKILL.md` — GREEN, the
  minimum that passes S1's four eval checklists, house register.
  Carries the RED-GREEN-REFACTOR cycle, the match-the-form-to-the-
  failure table with its no-nuance-clauses and exemptions-don't-scope
  rules, the micro-test protocol's no-guidance control, the
  skipping-the-baseline rationalization table + red flags, and exactly
  one link one level deep to `references/testing-with-subagents.md`
  (path named here because S3 creates it) — accept: F02 command exits
  0 AND `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` exits 0
- [ ] S3 (judgment): `skills/skill-authoring/references/testing-with-subagents.md`
  — the file S2 links: pressure scenarios and pressure types, the
  skill-type → test-approach map (discipline / technique / pattern /
  reference), the micro-test protocol, meta-testing when GREEN won't
  hold, and the stop condition; table of contents at the top (>100
  lines) — accept: F03 command exits 0; lint exits 0
- [ ] S4 (integration): `reference/skills.md` — the composing section
  gains the supersession table (`writing-skills` → `skill-authoring`,
  ADR-005 grounds; plus the two forward `bygama/skills` rows) and the
  "TDD and systematic-debugging are untouched" clause at the file's end
  is amended to match; compress redundant prose in place so the file
  holds its ≤120-line budget — accept: F04 command exits 0; lint exits 0
- [ ] S5 (integration): same-change docs — `docs/how-it-works/architecture.md`
  roster ("all ten" → eleven, `skill-authoring` in the list and in the
  actors prose, and the evals-before-content passage naming the skill
  that now owns the method) + `README.md` ("The ten skills" → eleven,
  table row, chain prose) — accept: F05 command exits 0; lint exits 0
- [ ] S6 (controller): REFACTOR then close — re-run S1's two baseline
  scenarios WITH the skill present, record whether the observed
  failures are gone, plug any new hole (evals first), then the four
  gates + work-verify (fresh-context whole-lane review; feature rows to
  `passing` only on evidence) + work-handoff + push and open the PR —
  accept: F06 command exits 0; PROGRESS.md carries a current PASS
  block; PR open with `Closes MAT-44`, never merged here
