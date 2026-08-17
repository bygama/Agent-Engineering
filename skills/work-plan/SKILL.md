---
name: work-plan
description: Turns an approved design — a lane's SPEC.md, a tracker issue, or a direct ask — into the lane's PLAN.md shaped for relay dispatch: dispatchable steps with executable acceptance, named interfaces between dependent steps, `[batch]`-marked same-shape fixes, and role hints, opening with a constraints block when the design imposes one. At XL, produces the parent plan (the three fan-out questions plus a worker table skeleton) instead of executable steps. Use once a design is approved and a lane needs its PLAN.md, before relay executes it. Refuses S-tier asks (no lane, no plan) and requests for a standalone plan document separate from the lane files.
---

# Work plan

Completes the work-cycle family: **work-plan** (plan) → **relay**
(execute) → **work-verify** (prove) → **work-handoff** (close). This
skill turns an approved design into one artifact — the lane's
PLAN.md — shaped so a stateless relay implementer can dispatch from it
without reading anything else.

Adapted from superpowers' `writing-plans`: small self-contained tasks,
explicit global constraints, the spec as referenced authority. NOT
adapted: complete code inside the plan — steps stay one line +
acceptance; a relay implementer reads the repo and the lane, not the
plan, for detail (`reference/skills.md`).

## Workflow

Copy this checklist and tick items off:

```
Work-plan progress:
- [ ] 0. Qualify (S refuses; standalone document refuses; check shape)
- [ ] 1. Read the input design; note any global constraint
- [ ] 2. XL shape? → parent plan only, stop after step 2
- [ ] 3. Constraints block (if the design imposes one)
- [ ] 4. Draft steps: one commit, one concern, executable acceptance
- [ ] 5. Name interfaces, mark [batch], tag role hints
- [ ] 6. Write work/<slug>/PLAN.md
```

**0. Qualify.** Two refusals, one shape check — never a bare "no",
always the alternative in the same breath:

- *S-tier ask*: no plan, no lane. Ceremony is the one-line DoD plus
  the repo's existing verify command, nothing more
  (`reference/task-tiers.md`). Say the ask can escalate to a lane
  later if it grows past S.
- *Standalone heavy plan document* (a document separate from the lane
  files, "spelling out every design decision before we touch code"):
  refuse. The lane PLAN plus the lane files ARE the plan; duplicating
  them into a separate document re-creates the collision relay was
  built to remove. Point back at the lane's own PLAN.md and offer to
  enrich it instead — constraints block, named interfaces, role hints.
- *Shape*: an M/L design produces executable steps (steps 3-6 below).
  An XL design — work that cannot fit one lane — produces ONLY the
  parent plan (step 2); it never gets a flat list of executable steps
  at the parent level.

**1. Read the input.** The lane's SPEC.md, a tracker issue, or a
direct ask is the design — read it as given and do not invent scope
beyond it. Note anything the design imposes across the whole change
(an exact format, a value repeated wherever it appears) — that becomes
the constraints block, not something repeated ad hoc per step.

**2. XL shape — parent plan only.** Recognize XL from the design's
shape (a correct plan forces two or more independent lanes running at
once, `reference/task-tiers.md`) and write the parent PLAN.md:

- Answer fan-out's three questions in writing, inside the parent PLAN:
  where does each item's work happen, how do results merge, who
  resolves disagreement (`skills/fan-out`).
- Add a worker table skeleton shaped for fan-out to consume: item ·
  lane `work/<slug>/` · worktree path · branch · runner · spawn
  command.
- No executable steps with acceptance commands at the parent — each
  worker's own steps belong in that worker's own PLAN.md, written
  later inside that worker's lane by this same skill.
- Name fan-out as the mechanism that executes the parent plan;
  work-plan itself spawns no workers, worktrees, or subagents.
- If the three questions cannot be answered honestly — the "modules"
  turn out to share files, or merge order is unclear — refuse the XL
  parent-plan shape and say so. Never fabricate independence to fit
  the template.

Stop here for XL designs; steps 3-6 are for M/L.

**3. Constraints block.** When the design imposes a cross-step
constraint, PLAN.md opens with a short block naming it once — relay
carries it into every dispatch. No such constraint, no block.

**4. Draft steps.** Every PLAN line:

- Is one coherent change, one commit, one dispatchable subagent. A
  step that needs two commits or mixes two concerns is two steps.
- Carries an executable acceptance command with an expected exit —
  never "improve X" or "make sure it works". Verify the command is
  real against AGENTS.md's `## Commands` and the repo's lockfiles
  before writing it.
- Contains no complete code — one line plus acceptance; the
  implementer reads the repo and the lane for the rest.

**5. Interfaces, batching, role hints.**

- When step N produces what step N+1 consumes (a function signature, a
  file, a schema), the consuming step's line names it explicitly —
  never "use step N's output". That is what a stateless implementer
  cannot infer.
- Several small same-shape steps (the same one-line fix repeated
  across files) become ONE PLAN entry marked `[batch]` — relay sends
  them to a single implementer in one dispatch, never one dispatch
  per file.
- Role hints (`mechanical` / `integration` / `judgment`) are optional
  per plan, but once introduced apply to every step of comparable
  nature — hints on some steps and silent gaps on others defeat
  relay's model-by-role selector, which reads them instead of
  guessing.

**6. Save.** Write to `work/<slug>/PLAN.md` — the lane's own file,
the standard's location, never a suite's default folder or a
standalone document elsewhere.

## Judgment notes

- work-plan produces the plan; relay executes it. The two roles never
  blur inside one dispatch — this skill writes no code and runs no
  acceptance commands.
- At M/L, work-plan runs once, inline, before relay's first dispatch.
  At XL, it runs twice: once for the parent (step 2), and again inside
  each worker's own lane once that worker is spawned.
- A refusal is a diagnosis plus an alternative in the same response,
  never a bare no — the S-tier and standalone-document refusals above
  are the pattern for any future one.
- Suites' own planning documents are superseded the same way their
  executors are (`reference/skills.md`): one artifact set, the lane's,
  never two.
