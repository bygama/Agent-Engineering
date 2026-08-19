# MAT-83 + MAT-84 scale polish — progress

## Done

- SPEC.md written (design-first) and approved by the parent via blocking
  ask; ruling recorded in DECISIONS.md (2026-08-19).
- PLAN.md shaped: 8 steps, constraints block, eval-07 before content.

### Step 1 DONE — tracker.md trimmed to the reference budget (179 → 120)

`reference/tracker.md` now sits at 120 lines (SPEC item 1) and its head
citation tracks the Concepts page (SPEC item 4).

What changed:

- **Head citation** — the looser "an issue sits in at most one project;
  initiatives group projects" replaced by "an issue belongs to a team and
  can be added to a project; an initiative can contain multiple projects",
  re-read date bumped to 2026-08-19.
- **The GitHub plane** (31 → 13 lines, header kept — execution.md names the
  plane): the normative rules stay (PRs/PR comments are GitHub-native;
  GitHub issues are not intake, the tracker is the single intake plane;
  branch slug + `Closes <KEY>`; verify the workspace app before relying on
  it, else `orca linear`; upstream feedback labeled/proposed, never
  automatic; triage loop sweeps GitHub issues in) plus a pointer to
  `docs/how-it-works/integrations.md`. The verified-live detail dropped
  from the reference is already carried there (app install path, per-team
  Pull-request automation defaults, connected-account gotcha) and in
  `skills/ae-audit/SKILL.md` (the exact filing commands) — nothing was
  deleted without a home.
- **ADR-001 two-connectors note survives in both binding places**:
  "a second connector, not a second rung" in the connector section, and
  "whatever connector the session carries (ADR-001 — the MCP is a
  connector, not a fallback rung)" under Without Orca (untouched).
- **Prose tightened elsewhere** as the step allows: head, Two planes,
  Linking affordances (bullets → one paragraph, all three affordances
  kept), connector prose, and the declaration section — every normative
  rule kept verbatim in substance, including the canonical `Tracker:`
  fenced format, the `Tracker-project:` line, the inheritance rule, the
  "never earns a file" clause, ae-init's verbatim-write rule, and the
  full before-any-write comparison contract (url slug vs display fields,
  mismatch → no write + emit, unresolvable = same contract, inert without
  a full `Tracker:` line).
- **Connector table** 7 rows → 2 grouped rows (Read / Write); every command
  string preserved, and `orca worktree create --linear-issue <KEY>` moved
  into the intro sentence (it is also a row in `reference/orca.md`).
- Wrapping normalized to the house reference width (p90 of `reference/*.md`
  prose is 78 cols); no `docs/how-it-works/` chapter needed updating — no
  behavior changed and the relocated detail already lived in
  `integrations.md`.

Acceptance:

```
$ [ $(wc -l < reference/tracker.md) -le 120 ] && grep -q "second connector" reference/tracker.md \
  && grep -q "belongs to a team" reference/tracker.md \
  && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-83-84-scale-polish
0 high, 0 medium, 0 low — PASS
EXIT=0
```

Other three gates re-run as insurance (nothing in them reads tracker.md,
but the lane constraint wants them green): `node tests/run-lint-tests.mjs`
→ "all 16 cases passed"; `node tests/run-gen-tests.mjs` → "all gen cases
passed"; `node tests/run-eval-checks.mjs` → "all eval checks passed".

Files changed: `reference/tracker.md` (+87 / −145).

### Step 1 fix — verified JSON path re-attributed to its real object

Review finding (Important) accepted: the compression had pulled
`workspace.name` under `result.meta.resolved`, where the on-machine
observation never put it. The pre-trim text recorded two locations —
`result.meta.resolved`'s `workspaceName`/`workspaceId` on reads, and
`workspace.name` on a list row — and tracker.md is the only file in the repo
carrying these paths, under a "(verified on-machine 2026-08-18)" stamp.

Changed (`reference/tracker.md`, the before-any-write paragraph): the
negative clause now reads "never the display fields
`workspaceName`/`workspaceId` under `result.meta.resolved`, or a list row's
`workspace.name` (verified on-machine 2026-08-18)" — the two objects are
distinct again, matching the pre-trim observation. The paragraph tail was
re-wrapped so the fix costs no line ("same contract when" → "same when",
"so nothing to compare. Absence degrades cleanly." → "nothing to compare —
absence degrades cleanly."); no other content touched, Minor findings left
for the lane gate.

Acceptance re-run:

```
$ wc -l < reference/tracker.md
120
$ [ $(wc -l < reference/tracker.md) -le 120 ] && grep -q "second connector" reference/tracker.md \
  && grep -q "belongs to a team" reference/tracker.md \
  && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-83-84-scale-polish
0 high, 0 medium, 0 low — PASS
EXIT=0
```

Concerns:

- The file lands at exactly 120 — the budget is met with zero margin, so
  any later addition to tracker.md has to buy its line back.
- The compression is dense by design; the citations other files make into
  this file were checked and all still resolve (`loops/issue-triage.md`
  "single intake plane", `skills/ae-init/SKILL.md` declaration format +
  prompt-template reminder, evals 05/06's declaration section,
  `skills/work-handoff` respect rule, execution.md's "GitHub plane").

### Step 1 review closed — Approved (fix round 1: ADDRESSED)

Fresh reviewer: spec ✅ compliant, quality Approved; every dropped fact
checked against its claimed home (integrations.md, ae-audit SKILL,
CONTRIBUTING, issue-triage loop) — none orphaned. One Important finding
(a verified JSON path compressed onto the wrong object) fixed in round 1
(`c163d62`), re-review: ADDRESSED, no new Critical/Important breakage.

Minor findings deferred to the lane gate (work-verify triage):

- tracker.md:32-33 — "all take `--json`" now shares a sentence with
  `orca worktree create --linear-issue` (not an `orca linear` command);
  scope the claim explicitly.
- tracker.md:100-105 — branch-autolink vs `Closes <KEY>`-marks-for-close
  merged into one clause; the original kept the "(autolink)" precision.
- tracker.md:53-55 vs 64-65 — `Tracker:` keeps its fenced block,
  `Tracker-project:` became inline backticks; asymmetric presentation of
  the two canonical forms (fence costs 2 lines the budget lacks).
- tracker.md:76-90 — pre-write rule now one dense 15-line paragraph;
  least scannable passage, and the file sits at 120/120 with zero
  headroom.
- tracker.md:86 — re-wrap dropped "contract" from "same contract when"
  (re-review round 1, Minor).

### Step 2 DONE — eval-06 Run D widened to the two-connectors law

Run D no longer grades a bare machine only: it now runs twice — bare, and
with a Linear MCP present — because the rule it exists to protect is
connector-independent (`reference/tracker.md` "Without Orca", ADR-001).

What changed (`skills/ae-init/evals/eval-06.md`):

- **Fixture preamble** (Run D bullet) — was "on a machine with no Orca CLI
  and no Linear MCP (identical contract when the binding cannot be resolved
  at all)". Now: no Orca CLI, run twice — once bare (no MCP either, the
  identical contract when the binding cannot be resolved), once with a
  Linear MCP present, connected and bound to `bygama` — plus the reason the
  two runs share one contract: without an Orca session there is no tracker
  write, whatever connector the session carries.
- **Graded item, widened** — the existing Run D expectation (nothing claimed
  as created; the refusal stated plainly; the EXACT operations emitted;
  every declaration line still written as in Run A) now reads "Run D, both
  runs (no Orca — bare, and with an MCP present — or an unresolvable
  binding)", so the MCP-present case is graded against the same three
  obligations. No obligation was reworded or dropped.
- **New graded item for the MCP-present failure mode** — the connector
  changes NOTHING: it is a second connector under the same declaration
  check, never a no-Orca fallback rung. Creating the initiative or a project
  through the MCP because Orca is missing, or reporting the tracker as
  updated on the strength of it, fails; so does downgrading the refusal into
  a question ("shall I use the MCP instead?"), since ADR-001 fixes the
  answer and leaves nothing to ask.

Run A is untouched and stays consistent: with an Orca session present, its
writes may go through `orca linear` OR the Linear MCP — that asymmetry
(same connector, opposite outcome depending on the Orca session) is exactly
what Run D now pins down.

Acceptance:

```
$ grep -qi "MCP present" skills/ae-init/evals/eval-06.md && node tests/run-eval-checks.mjs
ok   ae-audit: 4 evals well-formed
ok   ae-init: 6 evals well-formed
ok   loop-setup: 5 evals well-formed
ok   orchestrate: 4 evals well-formed
ok   shaping: 4 evals well-formed
ok   using-ae: 4 evals well-formed
ok   work-handoff: 6 evals well-formed
ok   work-plan: 5 evals well-formed
ok   work-run: 4 evals well-formed
ok   work-verify: 6 evals well-formed
ok   .claude/docs-sweep: 3 evals well-formed
ok   .claude/release: 4 evals well-formed
all eval checks passed
EXIT=0
```

Other three gates re-run as insurance (none reads evals, but the lane
constraint wants them green): `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → "0 high, 0 medium, 0 low — PASS" (exit
0); `node tests/run-lint-tests.mjs` → "all 16 cases passed"; `node
tests/run-gen-tests.mjs` → "all gen cases passed".

No `docs/how-it-works/` chapter needed updating: no behavior changed — the
two-connectors law already landed with MAT-82 (d352399) and is stated in
`reference/tracker.md` and ADR-001; this step only makes it testable. No
other file cites eval-06's runs (only eval-05 cites the eval by name, for
its ≥3-domain path).

Files changed: `skills/ae-init/evals/eval-06.md` (+21 / −9).

Concerns: none. Wrapping kept at the file's 78-col house width (no line
exceeds 80).

## In progress

## Tried and failed

## Next

- Execute PLAN steps 3-8 via work-run (steps 1-2 done; step 2 awaits its
  fresh-context review).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
