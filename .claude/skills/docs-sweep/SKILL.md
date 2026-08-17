---
name: docs-sweep
description: Repo-local maintenance skill for the Agent-Engineering repo — sweeps every markdown surface for drift (future-tense claims, dead terminology, stale tier enumerations, hardcoded versions, missing amendment pointers) and fixes it through the house flow. Use on demand ("scan the docs for drift") or as the weekly self-audit step. Never junctioned, never installed in consumers.
---

# Docs sweep

Keeps this repo's markdown current. This skill is repo law, not portable
technique: it lives in `.claude/skills/` on purpose, travels with every
checkout and worktree, and never leaves the repo — the battery it runs
encodes decisions specific to this codebase.

The property that matters: **the skill learns**. Every real drift ever
found adds its pattern to the battery before its fix merges, so a drift
kind can happen once but never silently twice.

## Workflow

Copy this checklist and tick items off:

```
Sweep progress:
- [ ] 1. Probe Orca
- [ ] 2. Run the battery
- [ ] 3. Judge every hit
- [ ] 4. Ratchet new drift kinds
- [ ] 5. Fix through the house flow
- [ ] 6. Report
```

**1. Probe.** `ORCA status --json` (executable resolution:
`reference/orca.md`). Without Orca the sweep still runs fully — every
step below is files, greps, and judgment; only tracker writes degrade to
emit-for-operator (the no-Orca contract).

**2. Run the battery.** Load
[references/patterns.md](references/patterns.md) and run EVERY entry —
never sweep from memory or from a subset. The battery states its own
exclusions (fixture dirs, dated records).

**3. Judge every hit.** Two questions, in order: is the file a **dated
record** (plans, ADRs, CHANGELOG history, SPEC decisions) — then
annotate or leave, never rewrite; is the hit on the **deliberate-clean
list** — then it is not a finding, do not re-litigate it. Everything
else is a finding.

**4. Ratchet.** A finding no battery entry would have caught is a new
drift kind: add its pattern to `references/patterns.md` — naming the
real instance that motivated it — **in the same change as the fix**. The
fix never merges without its pattern (mirror of evals-before-content).
Existing entries are never removed to make room; the battery grows, or
is corrected with a stated reason.

**5. Fix through the house flow.** Tracker issue → branch → conventional
commits → all four gates green → rebase-merged PR. Never direct to main.
When a fix touches a template or a check, the version-bump rule applies
(`CHANGELOG.md` header): bump + restamp surfaces in the same change.
Invoked from the self-audit loop, respect the loop's Writes line
(report-only): findings become proposals in the loop report instead of
commits.

**6. Report.** Three lists, always: findings fixed, findings judged
clean (with the reason), surfaces swept. Zero findings is a valid
result — say "clean" and stop; never invent findings to look productive.

## Judgment notes

- Drift is a claim the repo no longer backs — not style, not taste. When
  a hit is merely ugly, leave it.
- The battery automates the *finding*; the *judging* stays here. A grep
  hit is a candidate, never automatically a finding.
- When the same surface drifts twice, ask why: a missing same-change
  habit, a hardcode that should be derived, a surface to add to the
  restamp list. Fix the cause, not just the text.
