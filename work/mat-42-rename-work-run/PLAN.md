# rename relay → work-run — plan

<!-- Steps with executable acceptance. One batched work-run step (same-
     shape renames) + controller close. -->

- [x] R1 [batch] (mechanical, whole sweep): git mv + rename per SPEC —
  accept: `git grep -il relay -- ':!docs/adrs' ':!docs/plans'
  ':!CHANGELOG.md' ':!skills/agent-init/references/migration.md'
  ':!work'` exits 1 (no living hits); all four gates exit 0
- [x] R1 [batch]: DONE — review SPEC PASS / QUALITY APPROVED (ruling
  on the record-filename grep hits in DECISIONS).
- [ ] R1b [batch] (mechanical): agent-init/agent-audit → ae-init/
  ae-audit + placement rule per SPEC "Scope extension" — accept:
  `git grep -ilE "agent-init|agent-audit" -- ':!docs/adrs'
  ':!docs/plans' ':!CHANGELOG.md' ':!work'` returns only record hits
  ruled in DECISIONS; four gates exit 0
- [ ] R2 (controller): release ritual (expected MINOR) + work-verify +
  handoff + PR — accept: CHANGELOG entry; PASS block; PR opens green
  with `Closes MAT-42`
