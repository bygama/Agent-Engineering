# SPEC — using-ae role rule: parenthood comes from the seat, not the binding

Ticket: MAT-85 · Tier: M · Lane: `work/mat-85-role-rule-bootstrap/`
Design input: parent's shaped brief (dispatch ctx_40bdbd033954). Base: fresh
main (1ee598e). Sibling lane `mat-83-84-scale-polish` in flight on disjoint
files.

## Problem

Reported live by the owner, third occurrence. A fresh session in a repo's
MAIN worktree faces an M+ task, runs `orca orchestration run-current`, gets
`{"run": null}`, concludes "not a parent", and executes the lane INLINE in
the owner's main checkout instead of routing to `orchestrate`.

The bug is a bootstrap circularity in `skills/using-ae/SKILL.md`'s Role rule
(line 37): *"No bound Run ⇒ not a parent ⇒ the map applies as written too."*

- Parenthood is defined by a live Run binding.
- The binding is per terminal, so **every** fresh owner terminal lacks one.
- The action that creates it (`run-create`) lives in `orchestrate` step 0 —
  reachable only once already classified a parent.

The rule demands as a PRECONDITION what should be its first ACTION. The
failure mode it produces is the exact one `orchestrate` exists to prevent:
M+ work executing in the parent's own checkout.

## Design (settled by the parent — formalized here, not re-decided)

### 1. Detection signal — how a session knows its checkout is the main worktree

Chosen: **git**, verified on this machine (see DECISIONS ruling 1).

```bash
git rev-parse --path-format=absolute --git-dir --git-common-dir
```

Two identical paths ⇒ the main worktree. Different ⇒ a linked worktree.
Verified in all four positions (main root, main subdir, child root, child
subdir) on git 2.55.0; the naive `--git-dir` vs `--git-common-dir` form
without `--path-format=absolute` is NOT reliable (mixes absolute and
relative output from a subdirectory).

Rejected alternatives and why: DECISIONS ruling 1. No new CLI surface is
invented; the signal is runtime-neutral, matching the standard's premise
that any file-reading agent can follow it, with or without Orca.

### 2. `skills/using-ae/SKILL.md` — Role rule rewritten around three seats

Evals change before content (repo hard constraint). The section becomes:

- **Dispatch-bound** — the session opened with a `worker-start` preamble:
  it is the child `orchestrate` births. Map as written, tier by tier; it
  dispatches nothing. (Unchanged in substance.)
- **Main worktree** — the signal of §1: this session **IS** the parent
  orchestrator, bound or not. At M+ its first orchestration action is to
  **bind** — `run-current` → `run-use` the repo's live Run if one exists →
  `run-create` if none — and then route to `orchestrate`. An unbound fresh
  terminal is the normal starting state, not a disqualification.
- **Non-main worktree, not dispatch-bound** — not a parent: map as written.
  (This is what line 37 was reaching for; it stays, correctly scoped.)

Budget: `using-ae` is injected at SessionStart (`reference/skills.md`
names it the always-loaded entry point) and capped at ≤80 lines
(`CHANGELOG.md`, the 1.2.0 entry that shipped it). The file is 60 lines
today; the line count is verified by command before the commit.

### 3. `skills/using-ae/SKILL.md` — red-flags table names the bug

A row whose Thought is the reported reasoning verbatim in spirit —
"`run-current` returned null, so I'm not a parent; I'll run this lane
here" — with a Reality cell stating that the seat decides, not the binding:
in the main worktree, M+ binds first, then orchestrates, never inline in
the owner's checkout.

### 4. `skills/orchestrate/SKILL.md` — step 0 clause + frontmatter description

Step 0's commands stay exactly as they are. Its prose gains one clause
saying the binding is step 0's own job, not a precondition for arriving
here: the seat makes the parent (`skills/using-ae` role rule), and a fresh
main-worktree terminal arrives unbound and binds here.

Per DECISIONS ruling 2 (parent, at SPEC approval), the frontmatter
`description` is aligned in the same change: "Use in a Run-bound parent
session when an M+ task must go to a child" is the same precondition bug at
the discovery layer — a fresh unbound session may never load orchestrate
precisely in the case the new rule exists for. The replacement follows the
seat rule while keeping the description's what+when form
(`reference/skills.md`).

`orchestrate`'s evals change before both land (repo hard constraint):
eval-01's fixture and one expected-behavior line cover the unbound
arrival.

### 5. `docs/how-it-works/execution.md` — the chapter that narrates the rule

Repo hard constraint: structure/behavior change updates the affected
chapter in the same change. The role rule's binding is narrated at
`docs/how-it-works/execution.md:207` ("Binding the Run … happens once per
parent session, before any lane exists"), inside *§The 8-stage dispatch
cycle*. That passage gains the seat statement: what makes a session a
parent is its checkout being the repo's main worktree, not a pre-existing
binding; the binding is the parent's first action, and a fresh terminal
arriving unbound is the normal case. `standard-lifecycle.md` is a sibling
lane's file and is NOT touched.

### 6. Evals — the reported failure is graded

- **New `skills/using-ae/evals/eval-05.md`** — the exact reported failure:
  fresh session, main worktree, M+ ask, `run-current` returns null. Correct
  behavior: name the tier, detect the main-worktree seat, bind
  (`run-current` → `run-use` → `run-create`), then invoke `orchestrate`.
  Executing the lane inline in the main checkout is a **named failure**, and
  so is treating the null Run as proof of non-parenthood.
- **`skills/using-ae/evals/eval-01.md` updated** — its fixture currently
  says only "No Orca Run is bound … this is not a parent orchestrator
  session", which under the new rule is ambiguous and, read literally, now
  wrong. It is pinned to a **non-main worktree** (a linked worktree, not
  dispatch-bound), and grades that the map still applies as written — no
  false parenthood — with the contrast against eval-05 stated.
- **`skills/orchestrate/evals/eval-01.md` updated** — fixture covers the
  unbound main-worktree arrival; one expected-behavior line grades that
  arriving unbound is normal and binding happens here, not before.

## Out of scope (recorded, not forgotten)

- CHANGELOG.md, restamp, version bump — this rides the owner's 1.4.0
  release with the rest of the set.
- Sibling lane's files: `reference/tracker.md`, `skills/ae-init/**`,
  `README.md`, `docs/how-it-works/standard-lifecycle.md`,
  `.claude/skills/docs-sweep/**` — untouched.
- Any automation that runs the detection command for the agent (no hook, no
  script): the rule is prose an agent follows, like the rest of the map.
- `README.md`'s skill-table gloss for orchestrate ("a Run-bound parent
  session takes M+ work") carries the same stale reading, but README is on
  this lane's do-not-touch list — reported to the parent for routing
  (DECISIONS ruling 3), never edited across the lane boundary.

## Definition of done

- Evals-before-content visible in history: the eval commits land before the
  SKILL.md commits they grade.
- `skills/using-ae/SKILL.md` stays ≤80 lines, verified by command.
- All four gates exit 0: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` · `node tests/run-lint-tests.mjs` ·
  `node tests/run-gen-tests.mjs` · `node tests/run-eval-checks.mjs`.
- No file from the do-not-touch list appears in `git diff --stat` vs main.
- Branch pushed, PR open with `Closes MAT-85` in the body; no merge by this
  lane.
