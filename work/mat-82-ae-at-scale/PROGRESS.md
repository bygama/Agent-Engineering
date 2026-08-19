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

## In progress

## Tried and failed

## Next

- Execute PLAN steps 1-8 via work-run (fresh subagent per step).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
