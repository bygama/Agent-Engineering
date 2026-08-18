# orchestrate — Orca-first orchestration (1.3.0) — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-18 — Milestone ships as 1.3.0, not the reserved "1.4.0" — the
  ADR-007 renumber freed the number (old v1.3.0 tag deleted, zero
  adopters); owner ruling during shaping.
- 2026-08-18 — Approach A: new skill `orchestrate` absorbs fan-out;
  child side and reviewers are dispatch templates, not skills — one
  owner per role, work-run untouched, avoids speculative child skill
  (owner-approved in shaping).
- 2026-08-18 — Reviewer verdict channel: the lane PASS/FAIL travels in
  `worker_done`'s `--body`; `--outcome succeeded|failed` means only "did
  the review task itself complete" — verified against real
  `orca orchestration send --help` on-machine (step 2 implementer).
  Step 3's SKILL.md routes FAIL-handling off the body text, never off
  `--outcome`.
- 2026-08-18 — Three CLI-verified mechanics (step 3, against `--help`
  on-machine, never recalled): (1) Linear-at-birth = `orca worktree set
  --linear-issue <KEY>` immediately after worker-start (worker-start has
  no such flag); (2) the fix loop reuses the child's own terminal via
  `worker-start --terminal <handle>` — the parent RETAINS the worker at
  `worker_done` and releases only after merge (releasing at report time
  would destroy the terminal the loop needs); (3) `--model` accepts only
  Claude/Codex/Cursor ids, so the ballena launches two-step: `worktree
  create --base-branch <lane-branch>` → `terminal create --command
  "opencode -m opencode/deepseek-v4-flash-free"` → `terminal wait --for
  tui-idle` → `worker-start --terminal`. ADR-008 and the how-it-works
  chapter must reflect all three.
- 2026-08-18 — Map AE onto Orca's native orchestration primitives
  (Run/Task/Dispatch/worker_done/gates) instead of inventing
  coordination — discovered in `orca skills get orchestration` during
  shaping; owner directed "orca-first, read its documentation".
