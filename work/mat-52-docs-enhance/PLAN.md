# README + how-it-works enhance — plan

<!-- Executed via work-run; one implementer per step; controller
     bookkeeping commits immediately. Constraints: SPEC quality bar
     binds every step; records and unshipped features stay out. -->

Global constraints: SPEC "Quality bar" section, verbatim, in every
dispatch.

- [x] E1 (judgment): README.md full pass + "Adopting AE on your own
  machine" section (SPEC scope bullet 1) — accept: section exists
  (`git grep -q "Adopting AE" README.md`); `node scripts/agent-lint.mjs
  . --ignore tests,templates,global,examples` exits 0
- [x] E2 (mechanical): `global/hooks/README.md` canonical wiring
  snippet (SPEC bullet 2) — accept: file exists, names both hooks,
  contains a SessionStart settings example; lint exits 0. Interface:
  E1's README section links to this file's path — keep the path
  `global/hooks/README.md`
- [x] E3 (judgment): how-it-works README index + architecture.md per
  the bar — accept: index rows match chapter contents (reviewer
  judgment); lint exits 0
- [x] E4 (judgment): work-lifecycle.md woven per the bar — accept:
  reviewer confirms every diagram placed+explained; lint exits 0
- [x] E5 (judgment): execution.md per the bar — accept: same; lint
  exits 0
- [ ] E6 (judgment): standard-lifecycle.md + integrations.md per the
  bar — accept: same; lint exits 0
- [ ] E7 (controller): four gates + docs-sweep battery over touched
  files + work-verify (fresh whole-diff review) + handoff + PR —
  accept: PASS block; PR opens green closing MAT-51 and MAT-52
