---
issue: MAT-82
---
# AE at scale — spec

<!-- Formalized from the parent's owner-approved shaping design (2026-08-18)
     by the dispatched child; the design was approved through shaping, this
     file formalizes it and does not re-decide it. Absorbs MAT-81. -->

## Goal

Make the standard hold at deep-monorepo scale: nesting earned at any
depth, a browser-tool criterion, a hierarchical tracker declaration, and
an explicit interop statement — plus the tiers.md pointer-home line
(MAT-81). Research grounding to cite where provenance helps: the
agents.md open standard (Agentic AI Foundation / Linux Foundation;
nearest-wins; OpenAI's Codex repo runs 88 nested files), Claude Code's
official nested-CLAUDE.md guidance, Linear's conceptual model (Issue ⊂
Project ⊂ Initiative, strict), Anthropic's effective-context-engineering
(smallest high-signal token set).

## Feature A — deep-nesting criterion

Surfaces: `reference/context.md`, `templates/monorepo/app-AGENTS.md.template`.

- AGENTS.md files nest at ANY depth, not only `apps/*`: a directory EARNS
  its own file only when it holds non-inferable local knowledge (local
  commands, local gotchas) — never by symmetry with sibling dirs.
- Nested canonical files ≤30 lines, each with its own ≤3-line pointer
  CLAUDE.md (budgets unchanged; `agent-lint` already enforces both at any
  depth — no lint change).
- Precedence stated explicitly in context.md: user prompt > nearest
  AGENTS.md > ancestors (nearest-wins), matching the agents.md standard
  and Claude Code's walk-up behavior.
- `templates/monorepo/` template comments restate the earned-nesting
  criterion instead of the flat "per-app" framing.
- Same-change chapter: `docs/how-it-works/standard-lifecycle.md` ("What a
  consuming repo carries" gains the nested-file rule).

## Feature B — browser criterion

Surfaces: `reference/orca.md`, conditionally `global/CLAUDE.md`.

- orca.md gains the criterion: default browser = Orca's embedded one
  (`orca goto/snapshot/click/wait --json`). Playwright / chrome-devtools
  MCPs are justified ONLY when the need is a capability Orca's browser
  lacks (performance traces, heap snapshots, a11y audits, device
  emulation) AND the session is an owner terminal that can afford a
  long-lived process — never a supervised child.
- `skills/orchestrate/references/dispatch-child.md` Browser discipline
  stays strict exactly as written — verified unchanged, no edit.
- `global/CLAUDE.md` may gain a citation of the criterion ONLY within its
  40-line hard cap, verified by `wc -l` BEFORE committing (it sits at
  40/40 today, so the citation lands only if a rework of the existing
  browser bullet stays ≤40); if it does not fit, global stays as-is and
  the criterion lives in orca.md alone.
- Same-change chapter: `docs/how-it-works/execution.md` (Orca mapping
  section gains the browser line).

## Feature C — hierarchical tracker

Surfaces: `reference/tracker.md`, `skills/ae-init/` (evals BEFORE
content), `templates/monorepo/app-AGENTS.md.template`.

1. Root declaration format (tracker.md stays the single definition;
   other files cite it, never restate): `Tracker: Linear — workspace
   <slug> · team <KEY> [· project <name>][· initiative <name>]` — both
   segments optional. Typical small repo = project (today, unchanged);
   typical deep monorepo = initiative at root with projects declared per
   domain.
2. Nested declaration: a nested AGENTS.md may carry one line
   `Tracker-project: <Name>` (right under its title) meaning: work in
   this subtree files/reads issues in that Linear project; workspace and
   team inherit from the nearest full declaration above. No line ⇒
   inherit everything.
3. Respect rule update: before ANY tracker write, compare the live
   binding against the NEAREST declaration walking up from the working
   file. Mismatch/unresolved ⇒ no write, emit-for-operator (mechanism
   unchanged).
4. ae-init (evals change before skill content): exploration already
   detects monorepos; when ≥3 domains are detected (apps or top-level
   dirs with their own manifests), the settled-once tracker question
   ships a PRE-BUILT recommendation derived from the layout (team <KEY>
   · initiative <RepoName> · one project per domain, named from the
   folder names) so the owner can approve in one answer; on approval
   ae-init creates the missing Linear projects (orca linear or the
   Linear MCP; no-Orca or unresolvable binding ⇒ emit the exact
   operations for the operator) and writes every declaration line.
   Small repos (<3 domains) keep the exact current single question — an
   eval must grade that no new friction appears for them.
   Eval work: extend eval-05 with the small-repo no-new-friction check;
   add eval-06 (≥3-domain monorepo: pre-built recommendation, one-answer
   approval, project creation with the no-Orca fallback, every
   declaration line written).
- Same-change chapters: `docs/how-it-works/work-lifecycle.md` (respect
  rule → nearest declaration), `docs/how-it-works/integrations.md`
  (binding check → nearest declaration), `docs/how-it-works/standard-lifecycle.md`
  (ae-init install flow: pre-built tracker recommendation for ≥3-domain
  monorepos).

## Feature D — interop

Surface: `README.md`. A short statement: AE's AGENTS.md files ARE the
agents.md open-standard format (Agentic AI Foundation), so migrated
repos are automatically readable by Codex, Gemini CLI, Cursor and other
standard-following agents; AE's nesting rule is aligned with the spec's
nearest-wins.

## Feature E — tiers.md points home (absorbs MAT-81)

Surface: `templates/repo/docs/tiers.md`. One closing line: the standard
lives at github.com/bygama/Agent-Engineering (skills + the README's
adoption guide); without the skills installed, the ceremony the file
describes runs by hand. `reference/task-tiers.md` stays untouched.

## Hard constraints

- Do NOT touch CHANGELOG.md, do NOT restamp, no version bump — the owner
  paces releases; these changes accumulate unreleased.
- Budgets unchanged and enforced: root AGENTS.md ≤60/100, nested ≤30,
  pointer ≤3, global/CLAUDE.md ≤40.
- `docs/how-it-works/` chapters affected by any structural/behavioral
  change update in the SAME change.
- Evals before content for every ae-init change.
- All four gates exit 0 before the PR: self-lint (`node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples`),
  `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
  `node tests/run-eval-checks.mjs`.
- PR body carries both `Closes MAT-82` and `Closes MAT-81` on separate
  lines. Child pushes and opens the PR; never merges.

## Non-goals

- No `agent-lint` rule changes (existing budgets already cover nested
  files at any depth).
- No changes to `dispatch-child.md`, `examples/` (authoring-time
  snapshots), `reference/task-tiers.md`, or `templates/community/`.
- No new skills, no new evals beyond ae-init's, no loop changes.

## Done looks like

Every feature above landed on its named surfaces, feature_list.json rows
F1-F5 passing with command evidence, the four gates exit 0, and the PR
is open with both Closes lines.
