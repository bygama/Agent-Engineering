# mat-85-role-rule-bootstrap — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-19 — Ruling 1: main-worktree detection is `git rev-parse
  --path-format=absolute --git-dir --git-common-dir`, two identical paths ⇒
  main worktree — chosen over the Orca signals because the standard is
  runtime-neutral (any file-reading agent must be able to follow the rule,
  with or without Orca) and this invents no CLI surface. Verified on this
  machine in all four positions: main root and main subdir print the same
  path twice; child root and child subdir print
  `…/.git/worktrees/<name>` vs `…/.git` (git 2.55.0.windows.3). Rejected:
  (a) `ORCA_WORKTREE_ID` alone — it is set in the main checkout too
  (`<repoId>::<path>`), so it does not discriminate; (b) `orca worktree
  list --json` → `isMainWorktree: true` — correct and verified, but Orca-only
  and a second process call; kept as the corroborating signal where Orca is
  present, not as the rule; (c) bare `--git-dir` vs `--git-common-dir`
  without `--path-format=absolute` — REJECTED as unreliable: from a
  subdirectory of the main worktree git prints an absolute `--git-dir` and a
  relative `--git-common-dir`, so the string compare reports NO for a main
  checkout (measured, not assumed).
- 2026-08-19 — Ruling 2 (parent, at SPEC approval): SPEC approved as
  written, AND `skills/orchestrate/SKILL.md`'s frontmatter `description`
  is aligned too, not only step 0's prose — "Use in a Run-bound parent
  session when an M+ task must go to a child" is the same precondition bug
  at the DISCOVERY layer: a fresh unbound session may never load
  orchestrate precisely in the case the new rule exists for, so fixing the
  rule while leaving the description keeps the symptom at the door. New
  wording follows the seat rule while keeping the description's what+when
  form (`reference/skills.md`). Same file is already a lane surface — no
  sibling conflict.
- 2026-08-19 — Ruling 3 (lane, recorded not acted on): `README.md`'s skill
  table glosses orchestrate as "a Run-bound parent session takes M+ work",
  which the seat rule makes inaccurate in the same way as the frontmatter.
  README is on this lane's do-not-touch list (sibling lane
  `mat-83-84-scale-polish` in flight), so the row is left alone and
  reported to the parent in `worker_done` for routing — never silently
  edited across a lane boundary.
- 2026-08-19 — Ruling 4: work-run executes this lane under its documented
  inline fallback ("work-run is never mandatory — the standard is
  runtime-neutral"), not by dispatching implementer subagents: this
  session's harness forbids the Agent tool unless explicitly requested, so
  the subagent seat is unavailable to it. Ceremony is unchanged — PLAN
  steps in order, one commit per step, the step's acceptance command run
  and its output recorded in PROGRESS.md before the next step opens. No
  dispatch is simulated. The lane-level fresh-context review still runs
  (work-verify), and the adversarial review is the parent's after
  `worker_done`, per the dispatch config.
