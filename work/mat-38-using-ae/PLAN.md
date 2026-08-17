# using-ae — plan

<!-- Steps with executable acceptance. Executed via relay; commit per
     step; controller bookkeeping commits immediately (MAT-37). -->

- [x] U1 (judgment): evals per SPEC §4 —
  `skills/using-ae/evals/eval-01..03` — accept: three files with
  `## Query` + `## Expected behavior` + checklists; `node
  tests/run-eval-checks.mjs` exits 0
- [ ] U2 (judgment): `skills/using-ae/SKILL.md` ≤80 lines passing the
  evals — accept: `node tests/run-eval-checks.mjs` AND `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exit 0; line count ≤80
- [ ] U3 (integration): `global/hooks/using-ae.ps1` per SPEC §2 +
  amendments per SPEC §3 — accept: `powershell -NoProfile -File
  global/hooks/using-ae.ps1` exits 0; grep finds "using-ae" in
  README.md, reference/skills.md, and one docs/how-it-works chapter;
  lint exits 0
- [ ] U4 (controller, shared with mat-33): four gates + release 1.2.0 +
  work-verify + handoff + PR — accept: CHANGELOG entry; PASS blocks in
  both lanes; PR opens green closing MAT-33 and MAT-38
