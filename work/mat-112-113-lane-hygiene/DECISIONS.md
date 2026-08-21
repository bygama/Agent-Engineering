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
- 2026-08-21 — **Narration sweep: `work-lifecycle.md` and
  `architecture.md` both change; `standard-lifecycle.md` joins them.**
  work-lifecycle.md asserted lane ephemerality with nothing mechanical
  behind it, narrated work-plan's two modes with no pre-open gate, and
  narrated the handoff's close without its per-lane timing — three
  claims this lane completes, so three minimal insertions land.
  architecture.md and standard-lifecycle.md each enumerate the lint
  battery check by check (`… command drift, lane coherence, feature
  list schema`); an enumeration that ships a battery missing a live
  check is exactly the drift class the house battery names
  (`.claude/skills/docs-sweep/references/patterns.md`, directory-roster
  row), so each gains one clause. standard-lifecycle.md was not a
  named candidate — it earned the edit by narrating the battery, not
  by being listed.
- 2026-08-21 — **No change: `docs/how-it-works/README.md`,
  `integrations.md`, `execution.md`.** README.md's table row for
  work-lifecycle.md names the chapter's subjects at one level of
  abstraction above any check or gate ("lanes, the four files, the lane
  lifecycle") — still exhaustive and still true. integrations.md is
  about who writes what across Linear/GitHub/Orca; its one lane-lifecycle
  sentence is the card-status mirror, which this lane leaves untouched.
  execution.md is the closest call: its XL diagram ends `handoff closes
  lanes + parent` after the synthesis gate, which reads batch-shaped.
  It is not the refused batch — an XL wave merges in item order and gates
  as one whole, so each lane still closes at that wave's merge, whereas
  the red flag refuses deferring closes across a serial run of unrelated
  tickets ("the end of the run"). No claim is falsified; adding the
  distinction there would be new doctrine, not narration catching up.
- 2026-08-21 — **Took the step-4 deferred Minor: work-plan's frontmatter
  `description`.** It enumerated three refusals while the skill now
  carries four, and the description is the triggering surface an agent
  routes on — a stale enumeration there loses the refusal at the moment
  it should fire, which is narration debt on a live surface rather than
  polish. One clause added, naming the merged-lane refusal and that
  work-handoff's close lands first. evals-before-content is already
  satisfied (eval-07/08 landed in step 3), and no eval text changes.
- 2026-08-21 — **Close shape: lane folder survives until merge.** The
  work-handoff default close removes the lane folder; this repo's
  convention (main history: `1307530 chore(lanes): terminal close —
  wave lane records removed post-merge`) and the very doctrine this
  lane ships (close is per-lane AT each ticket's MERGE; a verified lane
  with an open PR is pending, not debt) both put folder removal at
  merge time. As a supervised child that never merges, this session
  commits the finalized lane state and opens the PR; the terminal
  close — the folder-removing commit — is the parent's post-merge
  action.
