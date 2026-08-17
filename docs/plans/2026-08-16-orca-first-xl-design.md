# Design: Orca-first execution + tier XL

Date: 2026-08-16 · Status: approved in chat, pending owner review of this doc
Amends the founding spec via two ADRs written at implementation time:
ADR-001 (execution, amends Decision 9) and ADR-002 (tiers, amends Decision 7).

## Goal

Make the standard **Orca-first in execution**: skills detect Orca with an
executable probe and drive it with real commands — no dual-path prose, no
parallel fallback recipes. Where Orca is absent, features trim (scheduling,
parallelism, tracker writes, card visibility) but quality never does,
because every gate and every piece of work state is already a
runner-neutral file. On top of that world, add **tier XL**: the ceremony
tier for work that cannot fit one lane.

## Decisions

**D1 — Orca is the executor (amends Decision 9).** The old rule ("Orca
preferred, never a dependency; every mapping names its no-Orca fallback")
becomes: *Orca is the executor of this standard. Artifacts and quality
gates are runner-neutral files; execution features (scheduling, managed
parallelism, tracker CLI, card visibility) are Orca's.* The per-capability
fallback columns and ladders are removed. The portability claim narrows
honestly: any file-reading agent can hold a lane (proven 2026-08-16,
opencode); only Orca orchestrates.

**D2 — The no-Orca contract.** One universal rule replaces every fallback
recipe: an agent without Orca may do everything that is a file — read and
write lanes, run gates, append PASS blocks, execute one manual iteration
of any loop. It may not schedule, parallelize with managed worktrees, or
write to the tracker. On hitting an Orca-only step it declares it
explicitly ("no Orca — X was NOT done; needs an Orca session or the
operator") and continues with what remains. Never silently skipped, never
faked.

**D3 — The probe.** Step 0 of every executing skill: run
`ORCA status --json` (executable resolved per the orca-cli stub rules:
`ORCA_CLI_COMMAND` → `orca-dev` → `orca-ide` → `orca`). Exit 0 with
`ok: true` → Orca session, single path with real commands. Anything else →
the no-Orca contract. Verified on this machine 2026-08-16 (exit 0; the
response carries a fine-grained `capabilities` array, available if a skill
ever needs feature-level detection). No new scripts, no hooks: the probe
is one existing command and a branch on its exit code. A SessionStart
hook that pre-injects the probe result is deferred until the workstation
repo (owner of `~/.claude` installation) migrates to the standard.

**D4 — Deep Orca binding.** The 2026-08-16 survey of the version-matched
CLI guide (`orca skills get orca-cli`, 295 lines) found five primitives
the standard should adopt, not just tolerate:

1. **Agent-first worker spawn** — `orca worktree create --agent <id>
   --prompt "<brief>" [--parent-worktree active]`: one command creates the
   worktree, launches the agent in its first terminal, and delivers the
   brief. This is the fan-out spawn primitive. Follow-ups use the single
   `startupTerminal.handle` with `terminal wait --for tui-idle` and
   `terminal send`; never dual-send to stale handles.
2. **Card comments** — `orca worktree set --worktree active --comment
   "<checkpoint>"`: lanes update the card at PROGRESS state changes
   (repro, fix, validated, blocked, handoff). Operator visibility for
   free.
3. **Card status** — `orca worktree set --workspace-status
   todo|in-progress|in-review|completed`: mapped to the lane lifecycle
   (lane opens → in-progress; handoff close → in-review when a PR waits,
   completed when merged).
4. **Structured orchestration** — coordinator↔worker messaging in XL runs
   through `orca orchestration` (task DAGs, dispatch, inbox/reply,
   `check --unread --inject`), per the orchestration skill — not ad-hoc
   `terminal send`. Full lane transfer (work-handoff pause mode) uses the
   full-handoff recipe (`worktree create --no-parent --agent … --prompt`,
   never `task-create`, then stop monitoring).
5. **E2E surface** — the built-in browser (`goto`/`snapshot`/`click`/
   `wait`) is the named e2e verification tool for web-facing L/XL work on
   an Orca machine.

Also adopted where they apply: `--disabled` while testing automations,
`--workspace-mode new-per-run` for mutating loops, cursor reads for long
worker output. Out of scope: artifacts publishing (human-gated device
capability; mention-only), mobile emulator.

**D5 — Tier XL (amends Decision 7).** XL is structural, not size-based:
it begins where the work cannot fit one lane and requires parallel
decomposition. Ceremony = everything L has, per lane, plus fan-out made
mandatory: the three pre-fan-out questions answered in writing, frozen
anchors, worker table in the parent PLAN, reducer contract, synthesis
gate on the merged whole. The ratchet extends: L→XL upward mid-task,
never down. On Orca: workers are child worktrees spawned agent-first,
coordinated via orchestration. Without Orca: the same lanes run
sequentially under the same ceremony — parallelism is the trimmed
feature, the ceremony is the kept quality.

**D6 — Tiers documented where they are used.** Two layers, neither
extensive: (a) `reference/task-tiers.md` deepens — per-tier recognition
cues ("you are in M when…"), one worked micro-example each, the XL row,
and the Orca card-status mapping; stays within the ≤120-line reference
budget. (b) Consumers get a compact self-contained guide,
`templates/repo/docs/tiers.md` (installed by agent-init as
`docs/tiers.md`), so a repo under the standard explains its own tiers
without this repo present. The AGENTS.md.template tier line gains the XL
tier and points at it: `Tiers: S direct+verify · M lane+plan · L four
files+feature list · XL fan-out — doubt → higher (docs/tiers.md)`.

## Delivery: two lanes, two bumps

### Lane 1 — AE/2.4 "Orca-first execution" (D1-D4)

| Surface | Change |
|---|---|
| `reference/orca.md` | Rewritten: probe + no-Orca contract + single-column mapping enriched with the five adopted primitives |
| `reference/loops.md` | Trigger element = Orca automation + manual iteration (the only fallback, and it is free); drop cron//schedule ladders |
| `reference/tracker.md` | Connector = `orca linear` or emit-for-operator (the contract applied to the tracker); drop MCP/API rungs |
| `reference/graphs-and-reducers.md` | Worker spawn = agent-first create; coordination = orchestration |
| `skills/work-handoff` | Evals first; probe step 0; card status/comment on close; full-handoff recipe in pause mode; tracker step per contract |
| `skills/loop-setup` | Evals first; probe step 0; trigger instantiation Orca-only + manual; `--disabled` while testing |
| `skills/fan-out` | Evals first; probe step 0; agent-first spawn; orchestration binding |
| `skills/work-verify` | Evals first; e2e layer names the built-in browser on Orca |
| `templates/repo/loops/LOOP.md.template` + example | Trigger element wording (automation + manual) |
| `docs/adrs/ADR-001` | First real ADR: Orca is the executor |
| `docs/how-it-works/` | execution.md (trigger matrix, mapping, no-Orca contract), work-lifecycle.md (handoff/card states) — same change |
| CHANGELOG + stamps + `skills/agent-init/references/migration.md` | AE/2.4 |

### Lane 2 — AE/2.5 "tier XL" (D5-D6)

| Surface | Change |
|---|---|
| `docs/adrs/ADR-002` | Tier XL amends Decision 7 |
| `reference/task-tiers.md` | XL row + recognition cues + micro-examples + card-status mapping + L→XL ratchet |
| `skills/work-verify` | Evals first; XL DoD = L DoD per lane + synthesis gate on the merged whole |
| `skills/fan-out` | Evals first; "available at L" → "mandatory at XL" |
| `templates/repo/docs/tiers.md` | New: compact consumer tier guide |
| `templates/repo/AGENTS.md.template` | Tier line with XL + pointer |
| `templates/repo/docs/README.md.template` | Index line for tiers.md |
| `docs/how-it-works/` | work-lifecycle.md (tier table), execution.md (XL/graph binding) — same change |
| CHANGELOG + stamps + migration.md | AE/2.5 |

Order: Lane 1 first — XL assumes the Orca-first world is already written.
Both lanes are M-tier (evals-first on every touched skill, fresh-context
review, all four gates green before merge, PR per lane).

## Acceptance

- AE/2.4: probe + contract are the only Orca/no-Orca text in skills (no
  surviving fallback ladders — grep proves it); the five primitives appear
  in the mapping with verified syntax; four gates green; fresh-context
  reviewer confirms a skill run on a no-Orca shell degrades by declaring,
  not by faking.
- AE/2.5: XL row + consumer tiers.md exist; work-verify names the XL DoD;
  fan-out refuses an XL task without the three questions in writing; a
  consumer instantiation (agent-init dry run on a fixture) lands
  docs/tiers.md; four gates green.
- Out of scope, deferred deliberately: CI jobs/bots (owner: "para lo
  último"), SessionStart probe hook (needs workstation repo migration),
  artifacts publishing (human-gated), first production XL run (wants a
  real task).
