---
name: work-verify
description: Verifies a unit of work against its tier's definition of done — static, behavioral, and end-to-end layers, with a fresh-context review at M and above — and records command evidence into the lane's PROGRESS.md or feature_list.json. Use when work claims to be done, before work-handoff closes a lane, when a feature-list row should move to passing, or whenever "it works" needs proof.
---

# Work verify

Done is a command that exited 0, with the evidence recorded — never a
self-assessment. This skill runs the tier's definition of done and refuses
"done" without it. The characteristic failure it exists to stop: a fluent
paragraph explaining why the red test doesn't matter.

## Workflow

Copy this checklist and tick items off:

```
Verify progress:
- [ ] 1. Locate the work and its tier (ratchet check)
- [ ] 2. Assemble the DoD
- [ ] 3. Run the layers in order
- [ ] 4. Fresh-context review (M and above)
- [ ] 5. Record the evidence
- [ ] 6. Verdict
```

**1. Locate.** Find what is being verified: a direct S-tier ask, a lane
`work/<slug>/`, or a `feature_list.json` row. Confirm the tier against
`reference/task-tiers.md` triage (S needs an existing flow AND an existing
verify command). If the work outgrew its tier — new flows appeared, modules
got crossed — upgrade it now and say so; the ratchet is one-way, and
verifying at a tier the work no longer fits is how sloppy work certifies
itself.

**2. Assemble the DoD.** Never invent it at verification time:

- **S** — the one-line DoD + the repo's existing verify command (from
  AGENTS.md Commands).
- **M** — the acceptance commands in the lane's PLAN.md.
- **L** — the `verification` command of each feature-list row in play.
- **XL** — the per-lane L DoD for every worker lane, plus the synthesis
  gate: the merged tree's full verification + every feature row's command
  run from the merged tree (`skills/fan-out` reducer contract).

No DoD exists → stop and write one with the owner first, then verify
against it.

**3. Run the layers, in order, stopping at the first red.**

- **S**: run the verify command. That is the whole ceremony — no lane, no
  files, no reviewer. Report command, exit code, key output line.
- **M/L**, three layers, no skipping:
  1. **Static** — lint/typecheck (or `node --check`-equivalent).
  2. **Behavioral** — the tests pass AND the thing actually starts (server
     up, CLI runs, module imports).
  3. **End-to-end** — only for cross-component changes: execute the full
     flow (click-through, real request, executed command). On an Orca
     machine (probe: `orca status --json`, `reference/orca.md`) the
     built-in browser (`orca goto/snapshot/click/wait --json`) is the
     named e2e tool for web-facing flows; without Orca, another executed
     path — never a silent skip. Unit tests are
     blind to interface mismatches and cross-layer state; if the change
     crosses components and you skip this layer, you have not verified it.
     Single-component change → record "L3 n/a: single component" as a
     decision, don't silently omit it.

A red layer ends the run: no later layer, no review, no evidence block.
At XL, per-lane green never substitutes for the synthesis gate — parts
passing is not the whole passing.

**4. Fresh-context review (M and above).** The maker never certifies its own
work — an evaluator sharing the maker's conversation is the maker in a
different font. Dispatch a reviewer with NO shared context: a subagent (on
Claude Code, the Agent tool), a second session, or another runner. Hand it
exactly three things: the lane path, the diff range, the DoD. Require it to
**act** — run the commands itself, not read the code and approve — and to
return a verdict quoting its own command outputs. No reviewer verdict, no
PASS.

**5. Record the evidence.** `## Verification` holds PASS evidence only —
failures belong under `## Tried and failed` (step 6). Append a block to the
lane's PROGRESS.md (newest on top):

```markdown
### <date> — <tier> DoD — PASS
- L1 static: `<command>` → exit <code>
- L2 behavioral: `<command>` → exit <code> (<key line>); starts: `<command>` → <observed>
- L3 end-to-end: `<command>` → <observed result> | n/a: single component
- Fresh-context review: <verdict> — <reviewer's key finding or "no findings">
```

At XL the block additionally names the synthesis gate command + exit,
run from the merged tree. At L, additionally update the feature-list row: `state` → `passing` and
`evidence` → non-null (command + exit + date) — but **only** when that row's
own verification command exited 0 in this session. `passing` is
irreversible: a regression found later gets a new row or lane, never a
state edit backward. Validate the file against the schema (or run
agent-lint) after editing.

**6. Verdict.** PASS → the work is ready for `work-handoff`. FAIL → report
in what/why/fix form (exact command, exact failure, concrete next step),
log it under `## Tried and failed` in PROGRESS.md, move the claimed-done
item out of Done, and leave the lane open. Done is binary; "mostly done"
and "just one small failure" are FAIL.

## Judgment notes

- Evidence is from THIS session: prior runs, screenshots, and "it worked
  yesterday" prove nothing about the current tree.
- Verify before refactoring, never after: refactors move the
  verified/unverified boundary.
- S-tier discipline cuts both ways: no ceremony added (no lane, no
  reviewer), and no pass given for being small — the one command still has
  to exit 0.
- The reviewer disagreeing with the maker is signal, not friction: a
  finding reopens the work, and a finding that repeats becomes a check
  (lint rule, test) instead of a paragraph.
