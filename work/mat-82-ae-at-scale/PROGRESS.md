# AE at scale — progress

## Done

- SPEC.md written from the parent's brief and approved by the parent
  (blocking ask, 2026-08-18); four rulings recorded in DECISIONS.md.
- PLAN.md shaped (8 steps, constraints block, evals-before-content
  ordering for ae-init).
- **Step 1 — Feature A, nesting criterion.** `reference/context.md`: budget
  row "Per-app AGENTS.md (monorepo)" → "Nested AGENTS.md (any depth)" (and
  the pointer row → "root or nested"); the flat per-app sentence in "The
  pointer" section replaced by a new "## Nesting: a directory earns its own
  file" section — earned only via non-inferable local knowledge, never
  symmetry; nested ≤30 + own ≤3-line pointer, noting `agent-lint` already
  applies both budgets at any depth (DECISIONS ruling 1, re-verified against
  `scripts/agent-lint.mjs:84-113`); explicit precedence **user prompt >
  nearest AGENTS.md > ancestors** (nearest-wins), citing the agents.md
  standard's wording and Claude Code's walk-up mechanics. Sources header
  gained the research grounding: agents.md (Agentic AI Foundation / Linux
  Foundation, nearest file wins, 88 nested files in OpenAI's main repo) and
  Claude Code memory — both URLs fetched live 2026-08-18 (the docs.claude.com
  memory page 301s to `code.claude.com/docs/en/memory`; the live URL is the
  one cited). File is 108 lines, inside the ≤120 house budget.
  `templates/monorepo/app-AGENTS.md.template` header comment restates earned
  nesting at any depth (the comment is authoring guidance only — instantiated
  files drop it, so the ≤30 budget is untouched, cf. `examples/monorepo/`).
  Same change: `docs/how-it-works/standard-lifecycle.md` "What a consuming
  repo carries" gained the nested-file paragraph (earned pair, no privileged
  level, nearest-wins, lint covers it).
  Acceptance: `grep -q "nearest-wins" reference/context.md && grep -qi
  "non-inferable" templates/monorepo/app-AGENTS.md.template && node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  `0 high, 0 medium, 0 low — PASS`, `EXIT=0`. Other three gates also run
  clean: `run-lint-tests.mjs`=0, `run-gen-tests.mjs`=0,
  `run-eval-checks.mjs`=0. Files changed: `reference/context.md`,
  `templates/monorepo/app-AGENTS.md.template`,
  `docs/how-it-works/standard-lifecycle.md` — nothing else in the worktree.
  No concerns.

- **Step 1 review — Approved** (fresh reviewer, spec ✅ compliant, no
  Critical/Important). Reviewer verified the external citations against the
  live sources (agents.md quote verbatim; 88-files figure and AAF/Linux
  Foundation stewardship accurate; Claude Code walk-up mechanics match) and
  the no-lint-change claim against agent-lint's source. Minors DEFERRED to
  work-verify triage: (m1) precedence paragraph's "deliberate contradiction"
  slightly ahead of the Claude Code source — one-clause hedge suggested;
  (m2) Sources header dates two of the three new sources — third inherits
  the old blanket date; (m3) verbatim duplication of the criterion clause
  between context.md and standard-lifecycle.md; (m4) retired "per-app"
  vocabulary lingers elsewhere (agent-lint messages, README:244, ae-audit
  checklist, ae-init SKILL/migration, architecture.md:144) — follow-up /
  docs-sweep material, out of this lane's named surfaces; (m5) monorepo
  template comment vs {{APP_*}} placeholder register — logged residual.

- **Step 2 — Feature B, browser criterion.** `reference/orca.md` gained a
  `## The browser criterion` section between the mapping table and the
  automation notes: default = Orca's embedded browser (`orca
  goto/snapshot/click/wait --json`), which lives in the app and so is not a
  long-lived process the session owns; Playwright / chrome-devtools /
  claude-in-chrome are justified only when BOTH hold — the need is a
  capability Orca's browser lacks (performance traces, heap snapshots, a11y
  audits, device emulation) AND the session is an owner terminal that can
  afford a long-lived process, never a supervised child (pointing at
  `dispatch-child.md`, whose discipline stays absolute); closing line rules
  out convenience/habit/"already installed" as lacked capabilities. The
  `E2E surface (web)` mapping row now says `(criterion below)` so the table
  leads to it. Same change: `docs/how-it-works/execution.md` "The Orca
  mapping" shape list gained a **browser / web E2E** bullet carrying the
  same default + both gates, placed right after the long-lived-process
  bullet it qualifies.
  **global/CLAUDE.md: the citation LANDED** (DECISIONS ruling 2 outcome A).
  The file sat at exactly 40/40, so the existing browser bullet was
  reflowed rather than extended: dropped the now-redundant `(dev server,
  driven browser)` parenthetical (both cases are named explicitly two
  clauses later) and spent the reclaimed width on the criterion — `browsers:
  Orca's embedded one (\`orca goto/snapshot/click\`) — Playwright/Chrome
  MCPs only for capabilities it lacks, from an owner terminal.` Still 5
  lines, file still exactly 40 (`wc -l` run BEFORE committing: `40
  global/CLAUDE.md`), all prose ≤74 cols (the house max in this file and in
  orca.md). The capability examples were deliberately left out of global —
  they exceed the 40-line cap and live in `reference/orca.md`; the three
  operative gates (default embedded, only for lacked capabilities, only
  from an owner terminal) all fit.
  `dispatch-child.md` verified untouched: `git diff --quiet HEAD --
  skills/orchestrate/references/dispatch-child.md` → exit 0.
  Acceptance: `grep -q "owner terminal" reference/orca.md && [ $(wc -l <
  global/CLAUDE.md) -le 40 ] && node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
  `EXIT=0`. Other three gates green too: `run-lint-tests.mjs`=0,
  `run-gen-tests.mjs`=0, `run-eval-checks.mjs`=0. Files changed:
  `reference/orca.md`, `docs/how-it-works/execution.md`,
  `global/CLAUDE.md` (+ this PROGRESS entry). No CHANGELOG, no restamp, no
  version bump. Concern (minor, for the parent): global/CLAUDE.md is
  content only — the workstation installer applies it to `~/.claude`, so
  the live machine keeps the old absolute "never Playwright or Chrome MCPs"
  wording until the installer is re-run; out of this lane's scope.

## In progress

## Tried and failed

## Next

- Execute PLAN steps 1-8 via work-run (fresh subagent per step).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
