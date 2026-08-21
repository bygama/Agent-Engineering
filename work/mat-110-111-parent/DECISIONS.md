# Decisions — MAT-110/111 wave

- 2026-08-20 (owner): personal machine layer canonical in workstation
  ("eso que vaya a workstation porque es personal"); AE global/ removed.
- 2026-08-20 (owner, AskUserQuestion): design approved — doctrine to
  reference/, global/ deleted; reviewers: 1 raton chispeante per lane;
  workstation AE/1.0.0 -> 1.4.2 migration INCLUDED in the MAT-110 lane.
- 2026-08-20 (parent): no version bump — no template or check changes;
  scripts/agent-lint.mjs untouched (machine-path check keeps covering
  global/ as a vendored-dir class in consumers).
- 2026-08-20 (parent): workstation repo was not Orca-registered;
  registered via `orca repo add` before dispatch (repo_not_found on
  first worker-start).
- 2026-08-20 (parent ruling, child question msg_28f0e8814b52): MAT-110
  SPEC approved. (A) dangling-only junction sweep APPLIED in
  claude/install.ps1 + guard test — matches backlog MAT-50, child adds
  Closes MAT-50 to the PR. (B) optional Tracker line SKIPPED (AGENTS.md
  at 59/60 lines); judgment recorded in the child's DECISIONS.md.
- 2026-08-20 (parent ruling, child question msg_9e5426e2a044): sweep
  refinements approved. (1) $skillSources PREFIX narrowing adopted —
  restores MAT-50's original design; six foreign junctions
  (accounts-owned + 5 Orca-owned) survive even when dangling; cost
  (renamed source repo not swept) accepted. (2) Sweep SKIPPED for the
  run when any declared source is missing (prevents mass-delete of a
  source's junctions on a missing clone), unreachable-target caveat
  documented. Guard-test Important finding already in fix round 1.
  Live find: reviewing-plans junction in ~/.claude/skills is genuinely
  dangling (target gone from both source repos) — real MAT-50 instance.
- 2026-08-20 (parent ruling, child question msg_b0f201d4d00f): lane
  folder KEPT on the branch through review and merge — work-handoff
  close is for terminal lanes; this one is in-review (MAT-113's
  merge-aware semantics). Parent removes lane records at wave close
  post-merge. Child moves MAT-110 to In Review + evidence comment +
  PR attach; parent owns Done transitions (MAT-110, MAT-50) post-merge.
  Lane verified PASS; PR #22 open (bygama/workstation).
- 2026-08-21 (parent ruling, child question msg_8110bd5fac70): MAT-111
  SPEC approved; A=yes B=1 C=1. (A) reference/orca.md repoints to the
  new reference/global-layer.md, generic probe wording. (B) stale
  using-ae eval-03 left untouched — accepted debt, follow-up MAT-114
  (rewrite against the doctrine, never against workstation). (C)
  docs-sweep battery entry left — next sweep corrects with stated
  reason per the battery's own law. Corrections accepted: 4 ignore-
  string sites (gates.yml, AGENTS.md, CONTRIBUTING.md, self-audit) +
  re-stamp of the self-audit verified date. Reported-not-edited:
  workstation claude/README.md still names AE global/hooks as canonical
  — parent folds into wave close on the workstation side.
- 2026-08-21 (parent ruling, child question msg_311fff3e9933): fourth
  fence collision — skills/ae-audit/evals/eval-03.md. Ruling: option 2,
  fence lifted for this file only, BOTH lines fixed in-lane: (b) the
  global/ enumeration (damage this lane causes to the live dogfooding
  gate — false finding every future run) and (a) the stale ignore
  string (pre-existing, one word, fixed opportunistically). Differs
  from Ruling B by CLASS: using-ae eval-03 needs a design rewrite
  (MAT-114); both lines here have one unambiguously correct value.
  Conditions: two lines only, full fresh-reviewer ceremony, fence-lift
  rationale in the child's DECISIONS.md.
- 2026-08-21 (owner rules, applied to spec + immediate ops): (1) --auto
  on EVERY opencode seat, TUI and run-mode alike. (2) Free-first
  economics: while the giveaway windows last, all seats default to free
  variants (adversarial raton = opencode/muse-spark-1.2-contributor-free,
  per-step = sigiloso/Ox Alpha); the Go plan is the fallback, never the
  default. MAT-111's adversarial seat launches on the FREE raton — first
  use of that model id on this machine may hit the one-time
  data-collection consent prompt (--auto does not cover it; watch the
  stall clock).
- 2026-08-21 (parent ruling, msg_cfec8547aed6): MAT-116/117 SPEC
  approved. Guardrail reading confirmed + precision: zero-cross-family
  combinations (Claude+Claude, Claude+none) are rejected as silent or
  default outcomes; an explicit owner override, recorded verbatim in
  the Task spec, is the only path to a zero-cross-family lane.
- 2026-08-21 (owner directive, applied mid-flight): the MAT-116/117 lane
  RUNS the machinery it builds — per-step reviews on the sigiloso
  command-mode engine (Ox Alpha free) effective immediately, frequency
  unchanged (skill content = per-step class), verdicts pasted verbatim,
  degradation chain raton-free -> Claude subagent, engine recorded per
  review. The lane is its own first production test.
- 2026-08-21 (parent ruling + process lesson): MAT-115 SPEC approved
  via reply to the resumed ask (msg_287612c3b824). LESSON, recorded
  against this parent: the child's original gate question was
  acknowledged UNREAD — a deliveryId-only ack one-liner during a
  concurrent owner exchange swallowed the batch without printing
  bodies. The ask timed out; the child correctly resumed the same
  question instead of duplicating. Rule going forward: never ack a
  delivery whose messages were not printed and processed — the ack
  one-liner must always render bodies first.
