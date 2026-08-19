# AE at scale — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0". -->

## Constraints (every step)

- NO CHANGELOG.md edits, NO restamp, NO version bump — changes
  accumulate unreleased (owner paces releases).
- Budgets: root AGENTS.md ≤60/100, nested AGENTS.md ≤30, pointer ≤3,
  global/CLAUDE.md ≤40 — `wc -l` on global BEFORE committing it.
- `docs/how-it-works/` chapters update in the SAME commit as the
  behavioral change they describe (mapping fixed in DECISIONS.md).
- `skills/orchestrate/references/dispatch-child.md`, `examples/`,
  `reference/task-tiers.md`, `templates/community/`, `scripts/` stay
  untouched.
- All artifacts in English; commit style follows the repo's history
  (`feat(scope):`, `docs(scope):`, `test(scope):`).
- Self-lint command (used in acceptances below): `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples`.

## Steps

- [ ] 1. [judgment] Feature A — nesting criterion: rework
  `reference/context.md` (budget-table row "Per-app AGENTS.md
  (monorepo)" → nested AGENTS.md at any depth; a directory EARNS its
  file only via non-inferable local knowledge, never symmetry; nested
  ≤30 + own ≤3-line pointer; explicit precedence: user prompt > nearest
  AGENTS.md > ancestors, nearest-wins, citing the agents.md standard +
  Claude Code walk-up; research grounding in the Sources header) +
  `templates/monorepo/app-AGENTS.md.template` header comment (earned
  nesting, any depth) + same-change
  `docs/how-it-works/standard-lifecycle.md` "What a consuming repo
  carries" (nested-file rule) — accept: `grep -q "nearest-wins"
  reference/context.md && grep -qi "non-inferable"
  templates/monorepo/app-AGENTS.md.template && node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0
- [ ] 2. [judgment] Feature B — browser criterion: add the criterion to
  `reference/orca.md` (default = embedded `orca
  goto/snapshot/click/wait --json`; Playwright/chrome-devtools ONLY for
  capabilities Orca's browser lacks — performance traces, heap
  snapshots, a11y audits, device emulation — AND from an owner
  terminal, never a supervised child) + same-change
  `docs/how-it-works/execution.md` Orca-mapping browser line +
  conditional `global/CLAUDE.md` browser-bullet rework gated on `wc -l`
  ≤40 (else global untouched; DECISIONS.md ruling 2) + verify
  dispatch-child.md untouched (`git diff --quiet HEAD --
  skills/orchestrate/references/dispatch-child.md`) — accept: `grep -q
  "owner terminal" reference/orca.md && [ $(wc -l < global/CLAUDE.md)
  -le 40 ] && node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` exits 0
- [ ] 3. [judgment] Feature C evals FIRST (DECISIONS.md ruling 3):
  extend `skills/ae-init/evals/eval-05.md` (small repo <3 domains keeps
  the EXACT current single question — no recommendation, no extra
  prompt, no new friction) + write `skills/ae-init/evals/eval-06.md`
  (≥3-domain monorepo fixture: pre-built recommendation derived from
  the layout — team <KEY> · initiative <RepoName> · one project per
  domain named from folder names — one-answer approval; on approval
  creates missing Linear projects, no-Orca/unresolvable binding ⇒ emits
  exact operations for the operator; writes root declaration with
  initiative + per-domain `Tracker-project:` lines) — these evals are
  the contract step 5's SKILL.md edit must satisfy — accept: `node
  tests/run-eval-checks.mjs` exits 0
- [ ] 4. [judgment] Feature C contract: `reference/tracker.md` — root
  declaration format gains both optional segments (`Tracker: Linear —
  workspace <slug> · team <KEY> [· project <name>][· initiative
  <name>]`; small repo = project, deep monorepo = initiative at root +
  per-domain projects), nested `Tracker-project: <Name>` line defined
  (right under a nested AGENTS.md title; inherits workspace/team from
  nearest full declaration; no line ⇒ inherit everything), respect rule
  compares against the NEAREST declaration walking up from the working
  file (mechanism unchanged: mismatch/unresolved ⇒ no write,
  emit-for-operator); tracker.md stays the single definition — +
  same-change `docs/how-it-works/work-lifecycle.md` (respect rule →
  nearest declaration) and `docs/how-it-works/integrations.md` (binding
  check → nearest declaration) — accept: `grep -q "Tracker-project:"
  reference/tracker.md && grep -qi "initiative" reference/tracker.md &&
  node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` exits 0
- [ ] 5. [judgment] Feature C installer: `skills/ae-init/SKILL.md` —
  step-3 tracker question ships the pre-built recommendation when
  step-1 exploration finds ≥3 domains (apps or top-level dirs with own
  manifests), citing tracker.md's "Which workspace — the repo declares,
  tools obey" (never restating the format); on approval creates the
  missing Linear projects (orca linear or the Linear MCP; no-Orca or
  unresolvable binding ⇒ emit the exact operations) and step-6
  instantiation writes every declaration line (root + nested
  `Tracker-project:`); <3 domains keeps the exact current single
  question — + `templates/monorepo/app-AGENTS.md.template` optional
  `Tracker-project:` marker + same-change
  `docs/how-it-works/standard-lifecycle.md` install section — behavior
  must satisfy step 3's eval-05/eval-06 checklists — accept: `node
  tests/run-eval-checks.mjs && node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` exits 0
- [ ] 6. [judgment] Feature D — README interop statement: AE's AGENTS.md
  files ARE the agents.md open-standard format (Agentic AI Foundation),
  so migrated repos are automatically readable by Codex, Gemini CLI,
  Cursor and other standard-following agents; AE's nesting rule aligned
  with the spec's nearest-wins — accept: `grep -qi "nearest-wins"
  README.md && node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` exits 0
- [ ] 7. [mechanical] Feature E — `templates/repo/docs/tiers.md` one
  closing line pointing home (standard lives at
  github.com/bygama/Agent-Engineering: skills + the README's adoption
  guide; without the skills installed the ceremony runs by hand);
  `reference/task-tiers.md` untouched — accept: `grep -q
  "bygama/Agent-Engineering" templates/repo/docs/tiers.md && git diff
  --quiet HEAD -- reference/task-tiers.md` exits 0
- [ ] 8. [mechanical] Full gate sweep + feature list: all four gates in
  sequence and flip feature_list.json rows on their verification
  commands — accept: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples && node tests/run-lint-tests.mjs &&
  node tests/run-gen-tests.mjs && node tests/run-eval-checks.mjs`
  exits 0
