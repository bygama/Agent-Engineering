---
name: work-plan
description: Turns a design — a settled conversation, a tracker issue, or a direct ask — into a lane's SPEC.md and PLAN.md shaped for work-run dispatch: dispatchable steps with executable acceptance, named interfaces between dependent steps, `[batch]`-marked same-shape fixes, role hints, and a review class on every step, opening with a constraints block when the design imposes one. Two modes: design-first writes SPEC.md and stops for owner approval before shaping PLAN.md; direct writes both in one pass when the owner states certainty or a tracker issue stands in as the spec. At XL, produces the parent plan (the three questions plus a worker table skeleton, orchestrate's XL ceremony) instead of executable steps. Use once a lane needs its SPEC and PLAN shaped, before work-run executes the PLAN. Refuses S-tier asks (no lane, no plan), requests for a standalone plan document separate from the lane files, and asks with no design and genuine scope uncertainty.
---

# Work plan

Completes the work-cycle family: **work-plan** (plan) → **work-run**
(execute) → **work-verify** (prove) → **work-handoff** (close). This
skill turns a design into the lane's SPEC.md and PLAN.md — design-first
with an owner-approval gate between the two files, direct in one pass —
so a stateless work-run implementer can dispatch from PLAN.md without
reading anything else.

Adapted from superpowers' `writing-plans`: small self-contained tasks,
explicit global constraints, the spec as referenced authority. NOT
adapted: complete code inside the plan — steps stay one line +
acceptance; a work-run implementer reads the repo and the lane, not the
plan, for detail (`reference/skills.md`).

## Workflow

Copy this checklist and tick items off:

```
Work-plan progress:
- [ ] 0. Qualify (S refuses; standalone document refuses; no design +
      uncertainty refuses; check shape)
- [ ] 1. Pick the mode (design-first writes SPEC.md + PROGRESS.md's
      marker and stops; direct writes SPEC.md + PLAN.md together); read
      the input, note any global constraint
- [ ] 2. XL shape? → parent plan only, stop after step 2
- [ ] 3. Constraints block (if the design imposes one)
- [ ] 4. Draft steps: one commit, one concern, executable acceptance
- [ ] 5. Name interfaces, mark [batch], tag role hints, class every
      step for review
- [ ] 6. Write work/<slug>/PLAN.md
```

**0. Qualify.** Three refusals, one shape check — never a bare "no",
always the alternative in the same breath:

- *S-tier ask*: no plan, no lane. Ceremony is the one-line DoD plus
  the repo's existing verify command, nothing more
  (`reference/task-tiers.md`). Say the ask can escalate to a lane
  later if it grows past S.
- *Standalone heavy plan document* (a document separate from the lane
  files, "spelling out every design decision before we touch code"):
  refuse. The lane PLAN plus the lane files ARE the plan; duplicating
  them into a separate document re-creates the collision work-run was
  built to remove. Point back at the lane's own PLAN.md and offer to
  enrich it instead — constraints block, named interfaces, role hints.
- *No design, genuine uncertainty*: no prior conversation settled the
  approach and the ask itself is still open on real scope (where it
  hooks in, which strategy) — not just missing paperwork. Refuse to
  write SPEC.md or PLAN.md and open no `work/` lane; name what's
  missing and invoke `shaping` as the next step. Never invent scope —
  no guessed strategy, no assumed shape — to force the ask into
  design-first or direct.
- *Shape*: an M/L design produces executable steps (steps 3-6 below).
  An XL design — work that cannot fit one lane — produces ONLY the
  parent plan (step 2); it never gets a flat list of executable steps
  at the parent level.

**1. Pick the mode, then read the input.** Two ways in, chosen by what
already exists before this skill runs:

- *design-first* (default: the requirements emerged from a
  conversation, or no SPEC.md exists yet): write the lane's SPEC.md
  from the settled design, then STOP — ask the owner to approve the
  SPEC explicitly, the same turn does not also shape PLAN.md. The same
  turn **does** write `work/<slug>/PROGRESS.md`, under `## In progress`,
  carrying this marker verbatim:

  ```
  STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md
  ```

  `scripts/agent-lint.mjs`'s work-lanes section reads this exact
  string as the content of its own line (only leading whitespace and
  an optional `- `/`* ` bullet allowed around it) to recognize the
  window — change both together, a quote inside prose or a transcript
  does not count. PLAN.md starts only once that approval is on record,
  in a later turn, back at this same step. Whichever tier that later
  turn takes — step 6's M/L plan or step 2's XL parent plan — saving
  PLAN.md there ends the window: the marker line comes out of
  `PROGRESS.md` the same turn, so the file does not go on declaring a
  wait that is already over.
- *direct* (the owner states the requirements are settled, or a
  tracker issue stands in as the spec): write SPEC.md and PLAN.md in
  one pass — one approval gate at the end, covering both files
  together, never one gate per file.

Whichever mode, read the input — the settled conversation, the tracker
issue, or the direct ask — as given and do not invent scope beyond it.
Note anything the design imposes across the whole change (an exact
format, a value repeated wherever it appears) — that becomes the
constraints block, not something repeated ad hoc per step.

**2. XL shape — parent plan only.** Recognize XL from the design's
shape (a correct plan forces two or more independent lanes running at
once, `reference/task-tiers.md`) and write the parent PLAN.md:

- Answer orchestrate's three questions in writing, inside the parent
  PLAN: where does each item's work happen, how do results merge, who
  resolves disagreement (`skills/orchestrate`).
- Add a worker table skeleton shaped for orchestrate to consume: item ·
  lane `work/<slug>/` · worktree path · branch · runner · spawn
  command.
- No executable steps with acceptance commands at the parent — each
  worker's own steps belong in that worker's own PLAN.md, written
  later inside that worker's lane by this same skill.
- Name orchestrate as the mechanism that executes the parent plan;
  work-plan itself spawns no workers, worktrees, or subagents.
- If the three questions cannot be answered honestly — the "modules"
  turn out to share files, or merge order is unclear — refuse the XL
  parent-plan shape and say so. Never fabricate independence to fit
  the template.

Stop here for XL designs; steps 3-6 are for M/L.

**3. Constraints block.** When the design imposes a cross-step
constraint, PLAN.md opens with a short block naming it once — work-run
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

**5. Interfaces, batching, role hints, review classes.**

- When step N produces what step N+1 consumes (a function signature, a
  file, a schema), the consuming step's line names it explicitly —
  never "use step N's output". That is what a stateless implementer
  cannot infer.
- Same-shape steps are ONE step. The same one-line fix repeated across
  files becomes a single PLAN entry marked `[batch]`, which work-run
  sends to one implementer in one dispatch. This is a requirement, not
  an option, and it binds even when the design listed the files
  separately: MAT-111 ran 9 steps where ~5 were right, and every one of
  those 9 was individually well-formed. Splitting by file is how a plan
  buys ceremony it does not need.
- Role hints (`mechanical` / `integration` / `judgment`) are optional
  per plan, but once introduced apply to every step of comparable
  nature — hints on some steps and silent gaps on others defeat
  work-run's model-by-role selector, which reads them instead of
  guessing.
- **A review class on every step**, beside the role hint. Unlike role
  hints, this one is never optional: work-run reads the class to decide
  how many reviewer seats the lane buys, so a step without one is a
  silent downgrade.

| Class | For | What it buys |
|---|---|---|
| `per-step` | code, checks, templates, skill content — anything expensive to redo or irreversible | its own dedicated reviewer |
| `grouped` | cheap-to-redo doc or mechanical steps | one pass per contiguous group, at a natural boundary |
| `covered-by-batch` | a `[batch]` entry | the sweep's single review, nothing extra |

Notation: the role hint and the class travel in one trailing
parenthetical, role first — `*(judgment · per-step)*`,
`*(mechanical · covered-by-batch)*`. A plan using no role hints writes
the class alone, `*(per-step)*`. One form on every step of the plan, so
work-run's reader never has to guess which half it is looking at.

The class comes from **rework cost**, never from step size and never
from a cost preference: `per-step` is a floor, mandatory and not
overridable downward — not by the owner, not by the plan's author, and
not to save a pass at execution time. An owner asking for fewer reviewer passes
gets them where the work is cheap to redo and a stated refusal where it
is not — grouping a code step to honor the ask is the failure this class
exists to prevent. `grouped` steps must be **contiguous** so work-run has
a boundary to review at; a lone `grouped` step between two `per-step`
steps buys a group of one and is a planning error.

**6. Save.** Write PLAN.md to `work/<slug>/PLAN.md`; SPEC.md (step 1,
either mode) goes to `work/<slug>/SPEC.md` — the lane's own files, the
standard's location, never a suite's default folder or a standalone
document elsewhere. (Marker removal on save is step 1's rule, and binds
here the same as at step 2 — not restated per step.)

## Judgment notes

- work-plan produces the lane's artifacts; work-run executes the plan.
  The two roles never blur inside one dispatch — this skill writes no
  code and runs no acceptance commands.
- At M/L, work-plan runs before work-run's first dispatch: once, inline,
  in direct mode; across two turns, split by the owner's SPEC
  approval, in design-first mode. At XL, it runs twice regardless of
  mode: once for the parent (step 2), and again inside each worker's
  own lane once that worker is spawned.
- A refusal is a diagnosis plus an alternative in the same response,
  never a bare no — the S-tier, standalone-document, and no-design
  refusals above are the pattern for any future one. Refusing to
  downgrade a `per-step` class is the same shape: say which steps could
  not be grouped and why, in the same breath as the ones that could.
- The XL parent plan (step 2) carries no review classes, because it
  carries no executable steps — classes belong to the worker lanes'
  own PLANs, written later by this same skill.
- Suites' own planning documents are superseded the same way their
  executors are (`reference/skills.md`): one artifact set, the lane's,
  never two.
