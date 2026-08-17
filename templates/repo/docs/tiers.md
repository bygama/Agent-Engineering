# Task tiers

The tier decides ceremony, not effort: an S can be hard, an L can be
easy — what scales is the paperwork that keeps the work honest. When in
doubt, take the higher tier. Tier changes are one-way, upward, mid-task
(S→M→L→XL); nothing downgrades mid-task.

| Tier | You are here when… | Ceremony | Verified by |
|---|---|---|---|
| S | one sentence describes the change AND an existing command proves it | none — do it | run the verify command, quote the exit |
| M | a new flow appears, or two modules meet for the first time | lane `work/<slug>/` with PLAN + PROGRESS (+ DECISIONS); WIP=1 | acceptance commands in PLAN + fresh-context review |
| L | you cannot list the affected files up front, or the work outlives a session | four lane files + `feature_list.json`; init phase | every feature row's command; `passing` is irreversible |
| XL | a correct PLAN forces ≥2 independent lanes in parallel | everything L per lane + mandatory fan-out: three questions in writing, frozen anchors, worker table, reducer contract | per-lane L DoD + the synthesis gate on the merged whole |

Rules that hold at every tier:

- **WIP=1 per agent.** Parallelism comes from isolated lanes run by
  isolated agents, never from one agent juggling.
- **Done is a command that exited 0** with evidence recorded — never a
  self-assessment. The `work-verify` skill owns the proof; the
  `work-handoff` skill owns the exit.
- **Lanes close.** `work/<slug>/` is per-effort, never furniture: the
  close commits final state, then removes the folder.
- On an Orca machine the card mirrors the lane: opens → in-progress,
  handoff → in-review, terminal → completed.
