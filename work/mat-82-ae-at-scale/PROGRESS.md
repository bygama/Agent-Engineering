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
  clauses later) and spent the reclaimed width on the criterion: "browsers:
  Orca's embedded one (`orca goto/snapshot/click`) — Playwright/Chrome
  MCPs only for capabilities it lacks, from an owner terminal." Still 5
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
  **Fix (review round 1, Important finding 1).** global/CLAUDE.md's last
  bullet line now reads `MCPs only for lacked capabilities, from an owner
  terminal, not a child.` — the reviewer's point stands: global still
  applies in non-AE repos where `reference/orca.md` does not exist, and a
  non-orchestrate subagent (a work-run step subagent) could have read
  "owner terminal" as "the terminal the owner started this session in",
  reopening a path the old absolute rule closed. The explicit negative
  restores it without a pointer the file cannot make. Still 5 lines, 73
  columns on that line (house max 74), file still exactly 40 (`wc -l
  global/CLAUDE.md` → `40`, run BEFORE committing, DECISIONS ruling 2);
  ruling 2 outcome A therefore still holds — no revert.
  Acceptance re-run: `grep -q "owner terminal" reference/orca.md && [ $(wc
  -l < global/CLAUDE.md) -le 40 ] && node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
  `EXIT=0`; other three gates re-run green (`run-lint-tests.mjs`=0,
  `run-gen-tests.mjs`=0, `run-eval-checks.mjs`=0); `git diff --quiet HEAD
  -- skills/orchestrate/references/dispatch-child.md` → exit 0 (still
  untouched). Only `global/CLAUDE.md` changed by this fix.

- **Step 2 review — Approved after fix round 1.** Fresh reviewer: spec ✅
  compliant, one Important (global bullet's compression dropped the "never a
  supervised child" negative — the widest-blast-radius copy of the rule).
  Fix round 1 (`a50af33`): bullet's last line now carries both gates AND
  "not a child", file still exactly 40/40; scoped re-review verdicts
  ADDRESSED, no new breakage. Minors DEFERRED to work-verify triage: (m6)
  execution.md bullet names two tools where the other surfaces name three
  (claude-in-chrome missing); (m7) orca.md "long-lived process of their own"
  reason falsifiable for claude-in-chrome (attaches to the owner's Chrome) —
  suggested "each pull in a browser outside the card's lifecycle"; (m8)
  capability-examples list triplicated (orca.md / execution.md / global
  shape) — same citation-vs-restatement decision as step 1's m3, triage
  once; (m9) global/CLAUDE.md at exactly 40/40, zero headroom — flag in
  handoff for future editors.

- **Step 3 — Feature C evals FIRST** (DECISIONS ruling 3: evals commit
  before SKILL.md content). `skills/ae-init/evals/eval-05.md` extended for
  the small-repo no-new-friction contract: the fixture now states the repo
  is a SINGLE domain (one root manifest, no `apps/`, no top-level dir with
  its own manifest) — explicitly under the ≥3 threshold — and gained a
  **third run** that pins the boundary rather than the middle (the same repo
  grown to two domains, `apps/web` + `apps/api`, still gets the single
  question). Three checklist lines added: (a) under 3 domains the question
  is EXACTLY today's single question — no pre-built recommendation, no
  proposed initiative, no per-domain project list, no approval round, no
  second turn, and the ≥3-domain path must not fire on run one or run
  three; (b) the declaration takes the small-repo shape `· project
  Agent-Engineering`, never `· initiative`, and no `Tracker-project:` line
  is written anywhere; (c) ae-init creates NOTHING in the tracker for a
  small repo — provisioning belongs to the ≥3-domain path alone.
  `skills/ae-init/evals/eval-06.md` written (108 lines, house style:
  origin-failure preamble → `## Query` → `## Fixture` → `## Expected
  behavior` checklist). Fixture: fresh monorepo `Northwind`, tracker in
  play, four domains — `apps/web`, `apps/api`, `apps/admin` (own manifests,
  own commands, own gotchas) plus top-level `infra/` (own manifest) — with
  `scripts/` and `docs/` as manifest-less negative controls, and Linear
  already holding team `MAT` + a project `Web` but no `Northwind`
  initiative. Four runs grade the whole contract: **A** approve as offered,
  **B** "none", **C** approve with edits in the same answer (drop `infra`,
  rename `Admin` → `Back-office`), **D** no Orca CLI and no Linear MCP
  (identical contract to an unresolvable binding). The checklist encodes:
  question still gated on a tracker being in play (layout alone never
  triggers it); pre-built recommendation derived from the layout — initiative
  `Northwind` + one project per domain named from the folder; the domain
  criterion (`apps/*` + top-level dirs with own manifests, so `scripts/`
  and `docs/` get nothing); ONE-answer approval with workspace/team still
  the owner's to supply and never inferred from the live binding (the
  wrong-binding trap stays eval-05's, cited, not duplicated — N+1 turns is
  the named regression); creation of only the MISSING objects with `Web`
  reused and nothing else touched; root declaration `Tracker: Linear —
  workspace bygama · team MAT · initiative Northwind` under the stamp with
  NO `· project` segment; per-domain `Tracker-project: <Name>` right under
  each nested title with workspace/team inherited, never restated; both
  forms cited from `reference/tracker.md` (no invented `Tracker-initiative:`
  line, frontmatter or config file); no AGENTS.md created just to carry the
  line (nesting stays earned, `reference/context.md` — the Feature A/C
  interaction); budgets ≤30 nested / ≤3 pointer / ≤60 root hold WITH the
  extra line; "none" leaves nothing declared or created; edits are written
  verbatim with no second approval round; the no-Orca path states plainly
  the tracker was NOT written, emits the exact operations per missing
  object, and still writes every declaration line (the repo side does not
  wait on the projects existing); rest of the fresh-install contract
  unchanged.
  These evals grade the TARGET behavior of SPEC Feature C, not today's
  SKILL.md — they are the contract step 5's edit must satisfy, so eval-06
  currently describes behavior ae-init does not yet have. That is the
  intended state of an evals-before-content commit.
  Acceptance: `node tests/run-eval-checks.mjs` → `ok   ae-init: 6 evals
  well-formed` … `all eval checks passed`, `EXIT=0`. Other three gates also
  green: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS` (exit 0), `run-lint-tests.mjs`=0,
  `run-gen-tests.mjs`=0. Files changed: `skills/ae-init/evals/eval-05.md`,
  `skills/ae-init/evals/eval-06.md` (+ this PROGRESS entry) — SKILL.md,
  `reference/tracker.md` and every other surface untouched, per the step's
  evals-only scope. No CHANGELOG, no restamp, no version bump. Concern
  (minor): eval-05's line 54 is 81 columns — pre-existing, it is the literal
  declaration line and cannot wrap; every line I added is ≤76.

## In progress

## Tried and failed

## Next

- Execute PLAN steps 1-8 via work-run (fresh subagent per step).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
