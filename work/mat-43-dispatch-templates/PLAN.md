# dispatch templates — plan

<!-- Executed via work-run; controller bookkeeping commits immediately.
     Global constraints: SPEC "Constraints" section verbatim in every
     dispatch. -->

- [x] T1 (judgment): eval edits per SPEC "Evals first" — work-run
  eval-01/eval-02 + the work-verify eval covering the fresh-context
  seat — accept: `node tests/run-eval-checks.mjs` exits 0; edited
  checklists name the template files by path
- [ ] T2 (judgment): the four templates per SPEC "Constraints" —
  interface: file paths exactly as SPEC "Files" lists them (T1's eval
  edits already name those paths) — accept: all four files exist;
  `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` exits 0
- [ ] T3 (integration): SKILL.md pointer lines (work-run ×3,
  work-verify ×1) + the work-lifecycle.md sentence — accept: grep
  finds "references/implementer.md" in skills/work-run/SKILL.md and
  "references/lane-reviewer.md" in skills/work-verify/SKILL.md; lint
  AND `node tests/run-eval-checks.mjs` exit 0
- [ ] T4 (controller): four gates + work-verify (fresh whole-diff
  review) + handoff + PR; release per owner's packaging call — accept:
  PASS block; PR opens green with `Closes MAT-43`
