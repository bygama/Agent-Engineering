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

- **2026-08-19 — Round 2 dispatch dialogue answered EXPLICITLY by the
  owner**: reviewer seat = "raton chispeante" =
  `opencode --auto -m opencode-go/muse-spark-1.2-contributor` (verified
  present in `opencode models`; owner said "muse spark 1.2
  contributing", the real id ends in `-contributor`). Ballena is the
  owner-named fallback if the seat cannot launch or misbehaves. If the
  seat performs well, the owner wants a Linear ticket encoding it in
  AE (runners.md registry) for compatibility.
- **2026-08-19 — MAT-94 owner ruling: evidence-based classification.**
  Diff each candidate against real upstream; substantial expression →
  per-file additive notice (repos stay MIT (c) 2026 Mateo Garcia);
  idea-only rewrite → no notice, classification recorded. Verified
  before dispatch: tracing-root-causes' BASE is owner-original
  (Context-Engineering salvage, 57 lines pre-9d1b574); only MAT-46's
  absorbed sections are candidates.
- **2026-08-19 — STACKED lanes**: MAT-104 edits the exact surfaces PR
  #77 rewrote, and MAT-94-skills edits the file PR #12 edits — both
  round-2 worktrees are cut FROM those open-PR branches and their PRs
  target those branches. On 1.4.2 completion, merge order is
  #77 → its stack, #12 → its stack (rebase the stacked PR onto main
  after the base merges).
- **2026-08-19 — One lane, two tickets (again)**: MAT-104 + MAT-94's
  AE side share the AE lane (same repo, disjoint surfaces); MAT-94
  closes from the skills-repo PR, the AE PR says "Part of MAT-94".
