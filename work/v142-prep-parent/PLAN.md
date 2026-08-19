# PLAN — v1.4.2 prep wave (parent orchestrator)

Objective: ship the 1.4.2 ticket set as OPEN PRs — reviewed, verified,
deliberately unmerged — per the owner's directive (2026-08-19): "lo poco
que haya para que despues completemos la 1.4.2 dejalo en pr asi lo
completamos mas tarde".

Run: `run_fafc4f70d4ac` (rebound this session via `run-use`).

## Worker table

| Lane | Tickets | Repo | Worktree | Task | Dispatch | Terminal | Reviewer |
|---|---|---|---|---|---|---|---|
| mat-99-lint-path-portability | MAT-99 | Agent-Engineering | orca/workspaces/Agent-Engineering/mat-99-lint-path-portability | task_72446add29ec | ctx_3d53e731152a | term_713b434c | 1 ballena (--auto) |
| mat-100-101-ballena-auto | MAT-100, MAT-101 | Agent-Engineering | orca/workspaces/Agent-Engineering/mat-100-101-ballena-auto | task_a22b9029ffc3 | ctx_6a0116b471c9 | term_e49a1210 | 1 ballena (--auto) |
| mat-93-ask-for-help-leg | MAT-93 | bygama/skills (cross-repo, `--repo path:`) | orca/workspaces/skills/mat-93-ask-for-help-leg | task_4d1e5ddcfc81 | ctx_77a45e0fa5a7 | term_f0827cac | 1 ballena (--auto) |

No `--deps`: the three lanes are file-disjoint (lane fences written into
each spec's repo-constraints block). MAT-100+101 share one lane by the
same-files rule (MAT-91/88 precedent).

## Exit contract

Per lane: worker_done → ballena review PASS (fix loop cap 5) → PR left
OPEN → worker released, worktree removed (branch lives on origin).
No merges, no version bump, no CHANGELOG edit — the 1.4.2 release
ritual owns those later.
