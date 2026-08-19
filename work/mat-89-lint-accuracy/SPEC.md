---
issue: MAT-89
---
# SPEC — agent-lint accuracy: escaping command paths, and the entry-skill cap

Tickets: MAT-89 + MAT-92 · Tier: M · Lane: `work/mat-89-lint-accuracy/`
Design input: parent's shaped brief (dispatch ctx_8d4eb986a262). Base: fresh
main (9fc4bda). Two sibling lanes in flight — fence in §Out of scope.
One lane, two check changes, one PR closing both tickets.

## Problem

Two accuracy defects in `scripts/agent-lint.mjs`, opposite in kind: one
check fires where it should not, one law has no check at all.

### 1. cmd-drift judges cross-repo paths as repo-relative claims (MAT-89)

The `node <path>` branch resolves every cited path against the repo root
and flags a miss as MEDIUM (`scripts/agent-lint.mjs:332`) — MEDIUM fails
the lint (`fail = high + medium > 0`). A path that *escapes* the repo is
not a claim about this repo's contents: `bygama/skills` AGENTS.md cites
`node ../Agent-Engineering/scripts/agent-lint.mjs .`, correct in the
owner's checkout (sibling repos) and correct in CI (the `standard`
workflow checks AE out at exactly that sibling position, on purpose), but
absent from an Orca worktree. Both skills-repo children of the 2026-08-19
wave hit it independently, from clean main, before touching anything —
a finding no lane caused and no lane can fix.

Reproduced on this workstation today against clean main, with a scratch
repo citing one escaping path and one in-repo path, both absent:

```
agent-lint …\scratchpad\repro
  MEDIUM AGENTS.md:7  file not found: ../Agent-Engineering/scripts/agent-lint.mjs  [cmd-drift]
  MEDIUM AGENTS.md:8  file not found: scripts/missing.mjs                          [cmd-drift]
0 high, 2 medium, 0 low — FAIL
```

Line 7 is the false positive. Line 8 is the check doing its job — the
drift it was born for, kept intact by this lane (AE/2.3's lesson: a
false-positive fix must not buy quiet by weakening real detection).

No fixture covers the `node <path>` branch at all today
(`grep -rn "node " tests/fixtures/*/AGENTS.md` → no matches): the branch
that carries both the bug and the behavior worth protecting is untested
in either direction.

### 2. The always-loaded entry-skill cap is law with no check (MAT-92)

`skills/using-ae/SKILL.md` is injected at SessionStart into every
conversation — the tightest attention budget in the standard — and is
held to 80 lines. `agent-lint` budgets AGENTS.md files (root ≤60/100,
nested ≤30), the pointer shape, and SKILL.md size (<500), but nothing
measures the entry skill. The cap held last night only because each
lane's own acceptance happened to run `wc -l`: discipline, exactly the
class of thing this standard turns into checks. It is live cost already —
MAT-87 landed at 78/80 under a parent ruling, and MAT-88 exists solely to
manage the remaining line.

The cap's stated source does not exist. `reference/skills.md:79` names
`using-ae` as "the always-loaded entry point (SessionStart)" but states
no number, and the number appears nowhere else in the standard:

```
grep -rn "\b80\b" reference/ docs/how-it-works/ docs/specs/ skills/using-ae/
  reference/principles.md:14: … removed >80% of Claude …   (unrelated)
```

The value survives only in lane records (`git log -S"80 lines"` → lane
commits, all since removed). So "read the cap from the standard's own
statement" has nothing to read.

## Design (settled by the parent — formalized here, not re-decided)

### 1. An escaping command path is not a repo-relative file claim

In the `node <path>` branch, classify the cited path before judging it.
A path whose resolution against the repo root lands *outside* the root
(`../<sibling>/…`, or an absolute path) is context-dependent by
construction. When such a path does not resolve, the finding is **`low`**
with a message naming the context-dependence; when it does resolve
(the owner's checkout, CI), nothing is emitted at all. In-repo paths keep
their MEDIUM `file not found` unchanged.

Downgrade, not exemption — of the three options the ticket lists, this is
the only one that fixes the exit code without discarding the signal. A
genuinely broken sibling path still appears in the report; it just stops
failing a lane that cannot fix it. `low` does not enter the `fail`
computation, so the lint's exit code stops being wrong. The third option
(resolve against a declared sibling root) is refused: it needs a new
declaration in every consumer repo to fix a two-line defect, and that
declaration would be invisible environment state of exactly the kind the
parent already refused for the machine-local junction.

### 2. A narrow, path-specific entry-skill cap check

New finding code `entry-skill-cap`, severity **medium** (the cap is law,
and law that does not fail the lint is discipline again). It fires when
`skills/using-ae/SKILL.md` exists in the linted repo and exceeds 80
lines. Repos without that path — every consumer — are unaffected; a
consumer that vendors the entry skill gets the cap for free.

Narrow, not generalized: generalizing means a machine-readable
declaration (`always-loaded: true`, `max-lines: N`) in the entry skill's
own frontmatter, and `skills/using-ae/**` is fenced to sibling lane C for
this wave — a generic check whose only declaration site is untouchable
would ship dead. The narrow version is the ticket's own "defensible and
cheaper" option and generalizes later without a rewrite.

The cap value is a constant in `agent-lint.mjs` with a pointer comment,
mirroring the house precedent already in the file for the AGENTS.md
budgets (`// Budget defaults mirror reference/context.md — change both
together.`). Reading the number out of prose was ruled out on evidence:
the standard states no number today (§Problem 2), so there is nothing to
read, and `reference/` does not ship to consumers. Whether this lane also
writes the statement into `reference/skills.md` is the parent's call —
that file is outside the surfaces this lane was given — recorded in
DECISIONS.md either way.

### 3. Fixtures and self-test cases land before the check changes

Both changes are check changes, so the house pattern applies: the fixture
and its self-test case are committed BEFORE the check that turns them
green, provable in `git log`. Four new fixtures, each single-purpose:

| Fixture | Cites / carries | Expected after the fix |
|---|---|---|
| `cmd-escaping` | absent `../sibling/…` path + a present in-repo path | `cmd-drift` low, lint PASSES |
| `cmd-inrepo-drift` | absent in-repo `node scripts/missing.mjs` | `cmd-drift` medium, lint FAILS |
| `entry-skill-ok` | `skills/using-ae/SKILL.md` at exactly 80 lines | no `entry-skill-cap`, lint PASSES |
| `entry-skill-bloat` | `skills/using-ae/SKILL.md` at 81 lines | `entry-skill-cap` medium, lint FAILS |

`cmd-inrepo-drift` is the regression guard for the AE/2.3 lesson: it
pins the detection the downgrade must not weaken, and it is new coverage
— that branch has none today.

The boundary fixture sits at exactly 80, the cap itself, so the case
proves the whole passing range (78 today, 79 if sibling lane C adds its
line) without pinning any current count.

The runner (`tests/run-lint-tests.mjs`) gains `expectMatch`, the mirror of
the `forbidMatch` it already carries — message-level assertion is how a
severity claim is pinned without new machinery: a case that expects
`cmd-drift` AND `fail: false` can only be satisfied by a `low`.

## Acceptance

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → exit 0
- `node tests/run-lint-tests.mjs` → exit 0, 4 new cases named in the output
- `node tests/run-gen-tests.mjs` → exit 0
- `node tests/run-eval-checks.mjs` → exit 0
- `git log --oneline` shows each fixture+case commit BEFORE the check
  change it grades
- The MAT-89 repro (§Problem 1) re-run after the fix: escaping path `low`,
  in-repo path `medium`, and a repo carrying only the escaping path exits 0
- `docs/how-it-works/standard-lifecycle.md` describes both check changes
- PR body carries `Closes MAT-89` and `Closes MAT-92` on separate lines

## Out of scope (fence)

- **Sibling lane A:** `skills/orchestrate/**`, `reference/orca.md`,
  `reference/runners.md`, `docs/how-it-works/execution.md`
- **Sibling lane C:** `skills/ae-init/**`, `skills/ae-audit/**`,
  `skills/loop-setup/**`, `skills/using-ae/**`, `loops/**`
- **Release machinery:** `CHANGELOG.md`, the AGENTS.md stamp — check
  changes accumulate unreleased and ride the next release (both tickets)
- `global/`, `templates/`, `examples/`
- Fixing `bygama/skills` itself: its AGENTS.md line is already correct;
  this lane makes the lint agree
