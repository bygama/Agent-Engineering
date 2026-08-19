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

## In progress

## Tried and failed

## Next

- Execute PLAN steps 2-8 via work-run (step 1 implemented, awaiting its
  review).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
