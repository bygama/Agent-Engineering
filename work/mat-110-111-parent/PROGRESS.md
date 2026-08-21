# Progress — MAT-110/111 wave

- 2026-08-20: MAT-109 context: language rules merged (PRs #87/#88),
  applied to ~/.claude; this wave follows the owner's canonicity ruling.
- 2026-08-20: MAT-110/MAT-111 created; tasks task_301e12499ae2 (ready)
  and task_05169992206d (pending, deps on 110). Workstation child born:
  dispatch ctx_b1048e896146, worktree mat-110-claude-canonical bound to
  MAT-110. Supervising by mailbox.
- 2026-08-20 ~23:5x: MAT-110 worker_done — PR #22 open (HEAD bc3d24f,
  Closes MAT-110 + MAT-50). Verification PASS: lint 0/0/0, 27 tests,
  install dry-run clean (found real dangling reviewing-plans junction,
  spared all 6 foreign links), ~/.claude untouched. Guard test survived
  mutation testing after fix round 1 (fails all 8 mutations). Child
  terminal retained. Review wave: raton chispeante r1 dispatched
  (task_72c115217f2c, ctx_8ed4fe83beb4, worktree mat-110-review-r1 cut
  from lane branch; fallback shell closed). MAT-110 In Review.
- 2026-08-21 ~00:1x: raton r1 verdict PASS verbatim: "PASS - Reran all
  DoD layers and per-step predicates on bc3d24f: lint 0 high/medium/low,
  tests 27 passed, install claude -WhatIfOnly exit 0 with single
  reviewing-plans sweep and zero writes. Verified SPEC 1-4 bodies,
  headers, tiers template, AGENTS 59/60 and CLAUDE 40/40, no
  out-of-scope edits, and mutation-tested guard (M1-M9). Minor findings
  remain (unguarded GetFullPath at claude/install.ps1:310, DECISIONS
  table pipe escaping and long cells, AGENTS comma, CLAUDE at cap) but
  none block merge; lane is merge-ready." Base unmoved -> no rebase
  needed; PR #22 merged --rebase (workstation main 22f3619). MAT-110 +
  MAT-50 Done. Child + reviewer released, both worktrees removed.
  ~/.claude applied in place (CLAUDE.md header via hardlink-preserving
  edit, both hook headers, dangling reviewing-plans junction removed) —
  verified content-identical vs merged canonical.
- 2026-08-21: MAT-111 deps satisfied -> AE child born: ctx_dcf5f63126cb,
  worktree mat-111-deglobal bound to MAT-111 (In Progress).
- 2026-08-21: MAT-111 worker_done — PR #89 (Closes MAT-111), 12/12 steps,
  verify PASS, CI green with new ignore form. Review caught 2 real bugs
  pre-ship: flat hook snippet Claude Code would not load (doc publishes
  nested shape) + eval false-finding (fence-lift ruling). Reported for
  wave close: workstation claude/README.md stale at :32 AND :52-54 (an
  instruction pointing at deleted AE global/), examples/machine-config
  gotcha count 9->10. MAT-118 filed (eval enumeration omits loops/,
  examples/). Child retained. Review wave: FREE raton dispatched
  (ctx_2a509d806939, task_a56d1e8b74aa, worktree mat-111-review-r1;
  npm opencode shim broken -> winget binary full path; fallback shell +
  broken terminal closed). First run of the free model id — consent
  prompt possible.
- 2026-08-21: MAT-116/117 worker_done — PR #90 (head 34a8e3b, 16
  commits, Closes both). Both tickets in one lane; evals-first verified
  3x; ADR-008/ADR-004 additive notes; 2 chapters updated, 4 no-change
  judgments; gates green; L3 exercised the chain against the live model
  list. Sigiloso engine field report: caught 3 FAILs + 1 Critical (all
  the change-falsified-its-own-claims class); weakness operational not
  analytical — on the 3 heaviest briefs Ox read everything then ended
  with NO report, chain fell to free raton 3x, never blocked; liveness
  check confirmed as law. Both issues In Review. Review wave: FREE
  raton adversarial dispatched (ctx_0788196b54b4, task_348f39cab0c1,
  worktree mat-116-117-review-r1, fallback shell closed).
- 2026-08-21: raton r1 PASS on PR #90 (re-ran 4 gates + PLAN acceptance
  greps on 34a8e3b, verified the seven runners.md laws, both knobs, the
  dialogue/guardrail, review classes, chapter/ADR amendments; no
  surviving dead-fallback spawn targets). Base unmoved, gates green,
  merged --rebase. MAT-116 + MAT-117 Done. Child + reviewer released,
  worktrees removed. MACHINERY LIVE via junctions (own session's skill
  listing refreshed with the new descriptions). MAT-115 dispatched
  under the new regime: ctx_f3c25c7dae40 (task_4c44b7f5ae65 supersedes
  task_6976160d5e71 — spec revised to the two-seat config), worktree
  bound to MAT-115, In Progress.
- 2026-08-21: MAT-115 worker_done — PR #92, 8 steps (2 gate-discovered:
  the XL marker-removal binding, the marker-as-LINE fix after a fresh
  reviewer REVOKED a recorded PASS on the quoting exemption — reproduced
  against this repo's own lane files, re-verified from layer 1). Meta:
  the lane reproduced MAT-115 on itself during its own approval window.
  Gates green (lint suite now 25/25 cases). Sigiloso died mid-lane;
  steps 6-8 + gate ran on ratones — child flagged the adversarial-seat
  model-independence concern. Parent ruling: adversarial seat for THIS
  lane = opencode/nemotron-3-ultra-free (free, non-muse, 1M ctx) —
  free-first economics kept, diversity restored. Reviewer dispatched:
  ctx_2b77ccac6545 (task_1412ebc95fd0, worktree mat-115-review-r1,
  fallback shell closed).
- 2026-08-21 (wave close): nemotron-3-ultra-free adversarial PASS verbatim
  on PR #92: "PASS — All four gates exit 0 (agent-lint: 0 findings;
  lint-tests: 25/25 ok including 3 new MAT-115 cases; gen-tests: 7/7 ok;
  eval-checks: 13/13 ok). Marker byte-identical in exactly 2
  source-of-truth sites ... Red-before-green transcripts recorded ...
  SPEC DoD fully satisfied." PR #92 merged --rebase; MAT-115 Done; child
  + reviewer released, worktrees removed. Whole-tree gates re-run on
  merged main: lint 0/0/0, 25/25, gen ok, evals ok. Wave complete:
  MAT-110 (workstation canonical + AE/1.4.2 migration + MAT-50 sweep),
  MAT-111 (deglobal), MAT-116/117 (review machinery), MAT-115
  (design-window fix), MAT-119 (bullet restore). Terminal close follows:
  lane records removed post-merge; release proposal to the owner.
