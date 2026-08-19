# DECISIONS — v1.4.2 prep wave

- **2026-08-19 — Dispatch dialogue resolved by standing ruling.** The
  owner's batch answer has been identical across 12 production cycles
  (default: 1 ballena per lane) and the owner directed autonomous
  continuation this session ("podes continuar, estamos en contacto").
  Applied: 1 ballena per lane, `opencode --auto -m
  opencode-go/deepseek-v4-flash` — `--auto` per the owner's MAT-100
  directive (ballenas always launch in auto; read-only seat, so the
  flag grants no authority the brief didn't). Reported in the wave
  summary for override before the review wave fires.
- **2026-08-19 — PRs stay OPEN.** Owner directive: the 1.4.2 set is
  prepared, reviewed and left unmerged for later completion. Step 7
  (merge) is deliberately NOT run this wave; step 8 releases workers
  and removes worktrees (branches persist on origin).
- **2026-08-19 — MAT-100 + MAT-101 share one lane.** Both edit
  `reference/runners.md` + `skills/orchestrate/SKILL.md` (the tickets
  declare themselves family); two lanes would need `--deps` serialization
  for two one-file edits — one lane, one PR closing both (MAT-91/88
  precedent).
