---
issue: MAT-112, MAT-113
---

# DECISIONS — mat-112-113-lane-hygiene

- 2026-08-21 — **Mode: design-first.** The dispatch brief mandates it
  ("run work-plan in design-first mode using the parent's design as the
  design input"); the approval gate is the parent's, exercised through a
  blocking `orca orchestration ask`, never skipped or downgraded to
  direct mode.
- 2026-08-21 — **Accumulation threshold N=5, strict (`> 5` fires).**
  The ticket proposes 5 and the reasoning holds: XL child lanes live in
  their own worktrees, so a single checkout legitimately holds very few
  lanes; 5 concurrent lanes in one checkout is already generous for
  M/L work, and the check is MEDIUM (a nudge to close, not a build
  breaker). The worker owns this call per the brief; recorded here.
- 2026-08-21 — **SPEC approved by the parent (ask msg_ed930a16487b).**
  Ruling verbatim: "APPROVED — shape PLAN.md. Ruling detail, record in
  DECISIONS.md: (1) N=5 strict >5 approved as your call; (2) the
  boundary-pair fixture design (5 passes / 6 fails) with a design-window
  lane planted among the 6 is exactly right — it encodes the interplay
  judgment (window lanes COUNT toward accumulation, the count measures
  accumulation not validity); (3) MERGED-not-verified criterion with
  owner scenarios [a]/[b] as evals stands as specced. All fences
  confirmed. Proceed."
- 2026-08-21 — **Reviewer mode: command (settled once, work-run step 1).**
  From the parent's dispatch config: per-step reviewer = command-mode
  sigiloso (`opencode run --auto -m opencode/x-preview-f-free`),
  degradation chain per reference/runners.md (sigiloso → free ratón →
  paid Go → in-session Claude subagent), engine recorded per review,
  liveness check before relying on a seat. The adversarial ratón
  chispeante seat after worker_done is the parent's, not this lane's.
- 2026-08-21 — **Boundary-pair fixtures.** The self-test lands as a pair
  — exactly 5 lanes passes, 6 fails — mirroring
  `entry-skill-ok`/`entry-skill-bloat`: the pair proves the boundary
  without pinning a live count. The over-limit fixture plants one
  design-first-window lane among the 6 to encode the interplay judgment
  (window lanes COUNT toward accumulation — the count measures
  accumulation, not validity — while `lane-incomplete` stays quiet for
  them).
