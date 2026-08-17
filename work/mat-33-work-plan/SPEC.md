---
issue: MAT-33
---
# work-plan — spec

<!-- Owner-written. The agent never edits this file. -->

Done looks like: AE owns the planning phase. A new skill
`skills/work-plan` turns an approved design into a lane PLAN.md shaped
for relay dispatch; ADR-005 records the general principle
(artifact-producing phases are AE's); superpowers' `writing-plans`
joins the superseded list; ships as a MINOR release. Owner approved
this design in chat, 2026-08-17.

## 1. The skill

Name `work-plan` — completes the work-cycle family: work-plan (plan) →
relay (execute) → work-verify (prove) → work-handoff (close).

Input: an approved design — the lane's SPEC.md, a tracker issue, or a
direct ask. Output: the lane's PLAN.md, relay-shaped:

- **Each step = one dispatchable unit**: one coherent change, one
  commit, one subagent. A step that needs two commits or mixes two
  concerns is two steps.
- **Executable acceptance per step**: a command and its expected exit —
  never "improve X". Commands the repo can actually run (verify
  plausibility against AGENTS.md Commands / lockfiles before writing).
- **Interfaces named between steps**: when step N produces what step
  N+1 consumes (a function signature, a file, a schema), the PLAN line
  names it — that is what a stateless relay implementer cannot infer.
- **Batching marks**: several small same-shape steps (same one-line
  fix across files) are marked `[batch]` so relay sends them to ONE
  implementer in one dispatch.
- **Role hints** (optional annotation per step): `mechanical` /
  `integration` / `judgment` — relay's model-by-role selector reads
  them instead of guessing.
- **Global constraints**: when the design imposes cross-step
  constraints (exact values, formats, "matches X"), the PLAN opens
  with a short constraints block relay carries into every dispatch.
- **At XL**: work-plan produces the PARENT plan — the three fan-out
  questions answered in writing plus the worker table skeleton — never
  executable steps (those belong to each worker lane's own PLAN).

Adapted from superpowers' writing-plans: small self-contained tasks,
explicit global constraints, the spec as referenced authority. NOT
adapted: complete code inside the plan — relay implementers read the
repo and the lane, so steps stay one line + acceptance.
`templates/repo/work/PLAN.md.template` does NOT change: the skill
teaches the shape; the template stays minimal (no consumer migration).

Refusals: S-tier asks get no plan and no lane (one-line DoD + verify
command is the whole ceremony). Requests for a superpowers-style heavy
plan document are refused with the reason: the lane PLAN plus the lane
files ARE the plan; duplicating them into a standalone document
re-creates the collision relay was built to remove.

## 2. Normative changes

- **ADR-005** — "artifact-producing phases are AE's": AE owns every
  phase that produces artifacts (plan → execute → verify → close)
  because artifacts are where protocols collide; artifact-free thinking
  (brainstorming, TDD, systematic-debugging) stays composable from
  suites and is superseded on observed friction, never on principle.
  Generalizes ADR-004; governs future skill decisions (owner
  direction, 2026-08-17).
- `reference/skills.md`: `writing-plans` joins the superseded list in
  the ADR-004 paragraph (pointer gains ADR-005); the suite-example
  list drops writing-plans (thinking examples stay: brainstorming,
  test-driven-development, systematic-debugging).
- README: chain updates to eight skills — work-plan enters the table
  and the chain paragraph/diagram (think → work-plan shapes the PLAN →
  relay executes → work-verify → work-handoff).
- `docs/how-it-works/work-lifecycle.md`: the "DoD written first" /
  lane-execution passage names work-plan as the how of the M+ planning
  moment, in the same change (hard constraint).

## 3. Evals (before content, ≥4)

- eval-01 shaping: given an approved design (fixture: a small feature
  design), produces PLAN steps that are dispatchable units with
  executable acceptance; no "improve X" steps; constraints block when
  the design imposes one.
- eval-02 refusal: (a) S-tier ask → no plan, no lane, points at S
  ceremony; (b) request for a standalone heavy plan document → refuse
  with the house reason.
- eval-03 XL: a multi-lane design → parent PLAN with the three
  questions + worker table skeleton, no executable steps at the parent.
- eval-04 interfaces/batching/roles: dependent steps name the
  interface; same-shape small steps carry `[batch]`; role hints match
  the step's nature.

## 4. Order of work and DoD

1. Evals first (`skills/work-plan/evals/`), 2. SKILL.md (minimum that
passes), 3. ADR-005 + amendments (reference/skills.md, README,
work-lifecycle chapter), 4. gates green (four suites), 5. release
ritual (MINOR expected) + PR, executed via relay with MAT-37 lessons
applied (controller bookkeeping commits immediately; no lane edits
while an implementer is in flight).
