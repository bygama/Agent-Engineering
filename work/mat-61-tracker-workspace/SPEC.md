---
issue: MAT-61
---
# Repo declares its tracker workspace — spec

<!-- Formalized from the parent orchestrator's shaped design (dispatch
     brief, 2026-08-18). The design was decided at dispatch; this file
     records it, it does not re-open it. -->

Born from a real multi-workspace discrepancy: the owner works two Linear
workspaces (own + a client's), tool bindings (Linear MCP OAuth,
`orca linear` API key) are per-workspace, and a write from a session bound
to the wrong workspace lands invisibly in the wrong place. The fix is
declarative and per-repo: the repo declares its tracker workspace once;
every tool obeys the declaration before writing. Three layers plus one
citation.

## Layer 1 — ae-init gotcha interview (`skills/ae-init/SKILL.md`)

- Step 3 (gotcha interview) gains ONE settled-once tracker question,
  asked only when a tracker is in play (step-1 exploration or workspace
  signals show a tracker connected): "does this repo track in Linear?
  workspace / team key / project?" — "none" accepted; the tracker stays
  optional in the standard.
- Unlike the artifacts-language item (MAT-60), this IS a real question:
  which workspace a repo tracks in is genuinely non-inferable owner
  knowledge. It is never guessed from the session's live binding — the
  binding is exactly what can be wrong.
- Step 6 (instantiate): when the answer names a workspace, ONE
  always-loaded line lands in the generated AGENTS.md, directly under the
  version stamp:

  `Tracker: Linear — workspace <workspace> · team <KEY> · project <project>`

  (`· project <project>` omitted when the repo has none). Answer "none" →
  no line, nothing else changes. The repo declares; tools obey.

## Layer 2 — the declaration line

The line's canonical format is defined once in `reference/tracker.md`
(Layer 3's home) and cited by ae-init — one source of truth for both the
writer (ae-init) and the readers (the respect rule, work-handoff).
`templates/repo/AGENTS.md.template` is NOT touched (out of fence; the
line is instantiated by ae-init, matching the MAT-60 precedent).

## Layer 3 — the respect rule (`reference/tracker.md`)

New section in the existing reference:

- Before ANY tracker write, the agent compares its LIVE binding — the
  workspace its MCP/API key actually resolves, e.g. the workspace field
  of an `orca linear … --json` read or the workspace slug in a resolved
  issue URL — against the repo's `Tracker:` declaration.
- Mismatch → NO write. State the mismatch plainly and emit the exact
  operation (command + payload) for the operator instead — the same
  pattern as the no-Orca contract (`reference/orca.md`). Nothing lands in
  the wrong workspace silently.
- No declaration line in the repo → the rule is inert; pre-declaration
  repos behave exactly as today (the tracker stays optional; absence
  degrades cleanly).

## Citation — work-handoff (`skills/work-handoff/SKILL.md`)

Step 6's tracker part cites the rule with one line: live binding checked
against the repo's `Tracker:` declaration before the calls; mismatch →
emit the operations, no write (`reference/tracker.md`).

## Evals (before content, split commits)

- `skills/ae-init/evals/eval-05.md` (new): fresh install in a
  tracker-connected workspace — question asked exactly once, "none"
  accepted, declaration line format + placement graded, line written in
  English, no line on "none".
- `skills/ae-init/evals/eval-01.md`: one added checklist line — no
  tracker in play → no tracker question.
- `skills/work-handoff/evals/eval-03.md`: one added checklist line — the
  binding check runs before the tracker calls; mismatch → operations
  emitted, no write.

## Constraints

- Scope fence: `skills/ae-init/**`, `reference/tracker.md`,
  `skills/work-handoff/**` (one line + eval touch at most).
- PROPOSED fence addition, parent to ratify or strike: one sentence in
  `docs/how-it-works/integrations.md` (Orca ↔ Linear section) naming the
  respect rule — the repo's hard constraint requires the affected
  how-it-works chapter to move in the same change as a behavior change,
  and that chapter distills `reference/tracker.md`.
- NO version bump, NO CHANGELOG entry, NO restamp — the release ritual
  owns those (ships in 1.3.1).
- Evals before content on every skill touched; split commits.
- All four gates green before the PR: self-lint, lint self-tests, gen
  self-tests, eval-structure suite (AGENTS.md `## Commands`).
- The argpiscinas retrofit named in MAT-61's ticket is OUT of this lane
  (different repo; ticket is context, the dispatch brief is binding).
