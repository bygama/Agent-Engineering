# Parent plan — canonical flip of the personal machine layer (MAT-110/111)

Owner ruling 2026-08-20: personal machine content (claude/CLAUDE.md,
hooks) is canonical in the workstation repo; AE keeps only replicable
doctrine (new reference/ doc) and deletes `global/`.

## Worker table

| Lane | Repo | Task | Dispatch | Worktree | Branch | Reviewer |
|---|---|---|---|---|---|---|
| mat-110-claude-canonical | workstation | task_301e12499ae2 | ctx_b1048e896146 | mat-110-claude-canonical | bygama/mat-110-claude-canonical | 1 raton chispeante |
| mat-111-deglobal | Agent-Engineering | task_05169992206d (deps: task_301e12499ae2) | ctx_dcf5f63126cb | mat-111-deglobal | bygama/mat-111-deglobal | 1 raton chispeante |
| mat-116-117-review-seats | Agent-Engineering | task_ad31f09e8c10 (deps: task_05169992206d; supersedes task_1189ca062b89/task_dec407a53832 — spec revisions: --auto run-mode law, free-first economics) | — pending | — | — | 1 raton chispeante |
| mat-115-design-window | Agent-Engineering | task_4c44b7f5ae65 (supersedes task_6976160d5e71) | ctx_f3c25c7dae40 | mat-115-design-window | bygama/mat-115-design-window | sigiloso per-step + free raton adversarial |

## Merge order

1. MAT-110 (workstation) — canonical flip must be true before AE claims it. MERGED (PR #22).
2. MAT-111 (AE) — depends on 1; in flight.
3. MAT-116+117 (AE, one lane) — review-efficiency package, dispatched
   FIRST after MAT-111 by owner priority ("asi los tickets se hacen mas
   rapidos"): later lanes execute under the new cheap-reviewer machinery
   (skills are junctioned — live at merge).
4. MAT-115 (AE) — design-window contradiction fix; HELD until 116/117
   merges (both touch work-plan — never in flight together). Check change
   => release proposed to the owner at wave close, not per-merge.

After both merges: parent applies workstation/claude/ content to
~/.claude (installer role, manual until MAT-32/50), verifies identical.
