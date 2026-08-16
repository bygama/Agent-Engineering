# Task tiers

Source: `docs/specs/SPEC-agent-engineering.md` (Decision 7, tier table);
normative walk-through in `docs/how-it-works/work-lifecycle.md`.
Retrieved 2026-08-16.

## The rule

- **S** — an existing flow to change AND an existing verify command;
  single-file-ish scope. (A one-line fix in a repo with tests.)
- **M** — anything creating new flows or crossing modules. (A feature.)
- **L** — parallel lanes, unknown scope, or a multi-session horizon.
  (Building a system.)

When in doubt, take the higher tier.

## The ratchet

Tier changes are one-way, upward, mid-task: an S that reveals hidden
complexity becomes M; an M that sprawls becomes L. Nothing downgrades
mid-task — downgrading is how half-done work gets declared simple
retroactively.

## Ceremony per tier

| Tier | Ceremony |
|---|---|
| S | one-line definition of done + run the verify command. No files. |
| M | DoD written **first** · lane `work/<slug>/` with PLAN + PROGRESS (+ DECISIONS when choices are made; SPEC when the prompt isn't the spec) · WIP=1 · fresh-context review · clean-state exit |
| L | full four files + `feature_list.json` (schema-validated, states gated by verification evidence, `passing` irreversible) + dedicated init phase + staged context windows |

The tier decides *ceremony*, not effort: an S can be hard, an L can be easy —
what scales is the paperwork that keeps the work honest.

## Lanes

One unit of work = one folder: `work/<kebab-slug>/`, the slug carrying the
tracker issue key when one exists (`work/sta-123-checkout-fix/`). Lanes are
per-effort artifacts, never permanent furniture — the handoff closes them.
Per-lane folders exist so parallel worktrees never collide on a shared root
file, and a lane travels intact when its worktree moves between machines or
runners.

The four files (templates in `templates/repo/work/`):

- **SPEC.md** — owner-written; the agent never edits it.
- **PLAN.md** — steps with executable acceptance criteria.
- **PROGRESS.md** — done / in progress / tried-and-failed / next; the first
  read of every session.
- **DECISIONS.md** — append-only: date — choice — why.

## WIP=1

One lane active at a time per agent. Attention divides as C/k: activate five
tasks and each gets a fifth of the reasoning. Lines of code produced
anti-correlate with features completed. Parallelism comes from isolated lanes
run by isolated agents — never from one agent juggling.
