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

- **Step 3 review — Approved** (fresh reviewer, spec ✅ compliant, no
  Critical/Important; reviewer re-ran the acceptance and self-lint himself,
  both 0). Two interpretive deltas resolved as controller rulings against
  the SPEC — DECISIONS rulings 5 (initiative creation included as coherent
  completion) and 6 (workspace/team stay owner-supplied; recommendation
  covers what the layout derives). Minors DEFERRED to work-verify triage:
  (m10) eval-06 live-binding clause ungradable in its own fixture (binding
  = correct answer) — cite eval-05 or bind to acme; (m11) Feature A×C
  interaction stated but not exercised — a domain earning a project but no
  AGENTS.md would pin it; (m12) name-derivation rule implied (title-case
  unstated); (m13) FLAG FOR STEP 4: tracker.md "Without Orca: tracker
  writes are Orca-only" must reconcile with the SPEC's "orca linear or the
  Linear MCP" connector set that eval-06 grades; (m14) eval-06:105 uses the
  retired flat per-app framing — suggest "pair per earning directory";
  (m15) exactly-3-domains threshold ungraded (must-not-fire side pinned
  at 2).

- **Step 4 — Feature C contract in `reference/tracker.md`.** The declaration
  section ("Which workspace — the repo declares, tools obey", title kept so
  every existing citation still resolves) now defines the extended grammar
  `Tracker: Linear — workspace <slug> · team <KEY> [· project <name>][·
  initiative <name>]` — both trailing segments optional and independent, one
  the repo has no answer for omitted entirely; the shape follows the repo
  because Linear nests one way (single-domain repo → `· project`, the common
  case; deep monorepo → `· initiative` at the root with the projects left to
  the domains below; team single either way). The nested form is defined
  right after it: one `Tracker-project: <Name>` line directly under a nested
  AGENTS.md's title, meaning issues filed or read anywhere in that subtree
  belong to that project, with workspace and team inherited from the nearest
  full `Tracker:` declaration above and never repeated; no line ⇒ inherit
  everything, project included; and the line never earns a directory a file
  of its own (nesting stays earned, `reference/context.md` — the Feature A×C
  interaction eval-06 grades). Respect rule: the write now resolves the
  declaration by walking UP from the file being worked on (nearest
  `Tracker-project:` names the project, nearest full `Tracker:` above it
  supplies workspace and team) and compares the live binding against THAT
  declaration — mechanism untouched (same slug-in-`url` comparison, same
  mismatch/unresolved ⇒ no write + emit-for-operator). The inert bullet now
  keys on the full `Tracker:` line, which also settles the orphan case (a
  `Tracker-project:` with no declaration above it names no workspace, so
  there is nothing to compare). tracker.md stays the single definition — no
  other file restates the format (verified by grep: only the lane files, the
  evals and the how-it-works chapters mention it, all as citations).
  **m13 reconciled — DECISIONS ruling 7.** The Connector section gains one
  sentence: a Linear MCP the session already carries writes the same plane
  under the same declaration check — a second connector, not a second rung —
  and "Without Orca" now reads "without an Orca session there is no tracker
  write, whatever connector the session carries (ADR-001 — the MCP is a
  connector, not a fallback rung)" instead of "tracker writes are
  Orca-only". That grounds eval-06's "`orca linear` or the Linear MCP" while
  keeping the SPEC's literal fallback trigger ("no-Orca or unresolvable
  binding ⇒ emit") and leaving ADR-001 intact, so `reference/orca.md` and
  `docs/how-it-works/execution.md` stay untouched and non-contradictory —
  reinstating the MCP as a no-Orca rung would amend an accepted ADR and is
  not this lane's change.
  Also: the stale flat bullet in "Linking affordances" (workspace groups
  repos as one project per repo) was removed — the declaration section now
  owns both shapes, and leaving it would have been the retired flat framing;
  the operator-facing version of that fact survives in integrations.md.
  Sources header gained Linear's [Concepts](https://linear.app/docs/conceptual-model)
  page (an issue sits in at most one project; initiatives group projects),
  read live 2026-08-18 via the Linear MCP docs search — the grounding for
  "Linear nests one way". Deliberately phrased as what the doc states rather
  than "strict Issue ⊂ Project ⊂ Initiative", which the page does not say in
  those words.
  Same change, both mapped chapters (DECISIONS ruling 4):
  `docs/how-it-works/work-lifecycle.md` — respect rule → nearest
  declaration, plus a "nearest, not root" paragraph explaining the hierarchy
  and stating that a flat repo's walk lands on the root line and nothing
  changes; `docs/how-it-works/integrations.md` — the Orca↔Linear binding
  check → nearest declaration, and operator-setup item 5 notes the deep
  monorepo splits the per-repo project view one level down (initiative for
  the repo, project per domain). Both cite tracker.md, neither restates the
  format.
  Acceptance: `grep -q "Tracker-project:" reference/tracker.md && grep -qi
  "initiative" reference/tracker.md && node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
  `EXIT=0`. Other three gates green: `run-lint-tests.mjs`=0,
  `run-gen-tests.mjs`=0, `run-eval-checks.mjs`=0. `git diff --quiet HEAD --
  skills/orchestrate/references/dispatch-child.md` → 0. Files changed:
  `reference/tracker.md`, `docs/how-it-works/work-lifecycle.md`,
  `docs/how-it-works/integrations.md` (+ DECISIONS ruling 7 and this entry).
  `skills/ae-init/SKILL.md` and `templates/` untouched (step 5). No
  CHANGELOG, no restamp, no version bump. This repo's own root declaration
  (`· project Agent-Engineering`) and eval-05's small-repo shape both stay
  valid verbatim under the extended grammar.
  Concerns: (1) **budget** — tracker.md is 178 lines against the ≤120 house
  budget for `reference/` (`docs/specs/SPEC-agent-engineering.md:173`); it
  was already 149 before this step, and the +29 is the mandated definition
  (grammar, nested form, walk-up rule, connector reconciliation) after two
  compression passes and one deletion. A trim pass — the 31-line "The GitHub
  plane" section is the obvious candidate to move to a chapter — is
  follow-up material, outside this step's surfaces. (2) eval-05:57 still
  writes the segment as `· project <project>` while the grammar now uses
  `· project <name>`; placeholder wording only, no contract difference,
  eval-05 is step 3's surface.

- **Step 4 review — Approved** (fresh reviewer, spec ✅ compliant, no
  Critical/Important; acceptance + self-lint re-run independently, 0).
  Both DONE_WITH_CONCERNS items judged acceptable: (concern 1) the 178/120
  overrun is pre-existing (149 before), unenforced by any gate, new prose
  tight, trim correctly deferred; (concern 2) ruling 7 verified internally
  consistent and actually implemented — no contradiction with orca.md,
  execution.md, ADR-001, or eval-06 Run D. Minors DEFERRED to work-verify
  triage: (m16) Sources header's "issue sits in at most one project" may
  not be on the cited Concepts page — re-check, drop or re-cite; (m17)
  walk-up sentence under-specifies the flat case — add "and, absent a
  nested line, the project"; (m18) "compare the live binding against THAT
  declaration" over-promises — say "the binding's workspace against THAT
  declaration's workspace"; (m19) root-only vs nearest-full stated three
  ways — pick one reading in tracker.md; (m20) work-lifecycle wording
  reads project/initiative as exclusive while the grammar says
  independent; (m21) FOR PARENT: eval-06 Run D doesn't grade ruling 7's
  stricter case (no Orca, MCP present ⇒ still emit) — consider widening;
  (m22) FOR PARENT: GitHub-plane trim of tracker.md (31 lines) + the
  ADR-001 two-connectors tension deserve a filed follow-up so they survive
  lane close.

- **Step 5 — Feature C installer (`skills/ae-init/SKILL.md`).** Step 1
  (Explore) now counts the repo's **domains** — every `apps/*` entry plus
  every top-level directory carrying a manifest of its own; a directory
  without one (`scripts/`, `docs/`) is not a domain however many files it
  holds — and states that the count decides the shape of step 3's tracker
  question (≥3 opens the monorepo path). Step 3's existing tracker paragraph
  is untouched verbatim, gaining only the closing clause "Under 3 domains
  that is the whole question: one turn, no proposal, nothing new to answer"
  (eval-05's no-new-friction check; the boundary run at two domains falls on
  the same side). Two new paragraphs follow it, both still inside the
  tracker-in-play gate so the layout alone never triggers anything: (a) at
  ≥3 the SAME single question carries a PRE-BUILT recommendation —
  initiative named after the repo at the root, one project per domain named
  from its folder, title-cased (`apps/api` → `Api`, resolving step-3 review
  minor m12), never a description of what the folder does, and no project on
  the root line — declared as the shape `reference/tracker.md` ("Which
  workspace — the repo declares, tools obey") defines for a deep monorepo,
  cited and never restated; workspace and team key stay the owner's to
  supply in that same answer (DECISIONS ruling 6), the live binding never
  standing in for them; one answer settles it — approved as offered,
  approved with edits (drop a domain, rename a project) taken verbatim with
  no second approval round, or "none", which declares and creates nothing;
  (b) on approval ae-init creates only what is MISSING (the initiative —
  DECISIONS ruling 5 — and each absent project, reusing every one that
  exists) and nothing else: no issues, no status moves, nothing outside the
  approved structure; writes go through `orca linear` or a Linear MCP the
  session already carries, and **without an Orca session there is no tracker
  write whatever connector is present** (DECISIONS ruling 7 — eval-06 Run D
  passes under the stricter reading), same contract when the binding cannot
  be resolved: create nothing, say plainly the tracker was NOT written, emit
  the exact operation (command + payload) per missing object.
  Step 6 (Instantiate): the root sentence gains "an approved monorepo
  structure names its initiative there and leaves the projects to the
  domains below"; the monorepo sentence now reads "+ pointer per directory
  that earns one (`reference/context.md`)" — retiring the flat per-app
  framing (step-3 review m14) — with each such file carrying its domain's
  `Tracker-project:` line directly under the title, workspace and team
  inherited from the root and never repeated, no directory getting a file
  just to hold the line (the Feature A×C interaction), and every declaration
  line written even when the tracker objects were only emitted for the
  operator. Judgment notes: budget list "per-app ≤30" → "nested ≤30" plus
  "a declaration line counts against them like any other" (eval-06's budget
  check).
  `templates/monorepo/app-AGENTS.md.template`: optional
  `{{APP_TRACKER_PROJECT}}` marker directly under the title with an inline
  OPTIONAL comment (format and inheritance per `reference/tracker.md`;
  delete the marker when the domain inherits the root declaration whole) —
  same inline-comment style as `templates/repo/AGENTS.md.template`'s Map
  section; comments are authoring guidance and instantiated files drop them,
  so the ≤30 budget is untouched.
  Same change: `docs/how-it-works/standard-lifecycle.md` Install section
  gained a paragraph before "Templates are instantiated" — the one question
  that scales with the repo, the ≥3-domain drafted answer, one-answer
  approval with workspace/team still the owner's, missing-objects-only
  creation with the emit-for-operator path, declaration lines landing
  regardless, and below three domains the single question it has always
  been; cites `reference/tracker.md` by name (house style in these chapters
  is the backticked path, not a markdown link).
  Acceptance: `node tests/run-eval-checks.mjs && node scripts/agent-lint.mjs
  . --ignore tests,templates,global,examples` → `ok   ae-init: 6 evals
  well-formed` … `all eval checks passed`, then `0 high, 0 medium, 0 low —
  PASS`, `EXIT=0`. Other two gates green: `run-lint-tests.mjs` → `all 13
  cases passed` (0), `run-gen-tests.mjs` → `all gen cases passed` (0).
  SKILL.md is 154 lines (lint's skill-size check is <500). Files changed:
  `skills/ae-init/SKILL.md`, `templates/monorepo/app-AGENTS.md.template`,
  `docs/how-it-works/standard-lifecycle.md` (+ this entry) — `reference/`,
  the evals, `examples/` and `dispatch-child.md` untouched. No CHANGELOG, no
  restamp, no version bump.
  Concern (minor): the template's marker is a `{{APP_TRACKER_PROJECT}}`
  placeholder while the root template carries no tracker placeholder at all
  (ae-init inserts the root line from step 6's instruction) — an asymmetry
  the PLAN's "optional `Tracker-project:` marker" asked for on the nested
  side only; harmless, but a future pass may want the root template to carry
  the same kind of marker.

- **Step 5 review — Approved** (fresh reviewer, spec ✅ compliant, no
  Critical/Important; eval-05/eval-06 checked item by item with each item
  traced to specific SKILL.md prose; accept command re-run, 0; SKILL.md
  154 lines). Rulings 5-7 verified encoded in strict form. Minors DEFERRED
  to work-verify triage: (m23) "On approval" should say "of that
  recommendation" — three-word scoping so small-repo installs can't read
  provisioning into their path; (m24) ambiguous pronoun in "a domain
  without one" — suggest "a domain the approved structure gives no project
  inherits the root declaration whole"; (m25) reuse step names no read —
  add "list what exists first"; (m26) standard-lifecycle wrapping artifact;
  (m27) template marker deletion leaves a double blank line — comment
  could say "delete the marker and its blank line".

- **Step 6 — Feature D, README interop statement.** One short paragraph added
  to `README.md`'s "Installing in any repo" section, between the install
  flow's item 4 and `### Customizing` — the natural home: that is where the
  reader has just been told what they end up with (a stamped `AGENTS.md`),
  so the interop fact is the payoff of the same sentence rather than a
  section of its own. It states that the file is no AE-private format —
  `AGENTS.md` **is** the [agents.md](https://agents.md) open standard,
  stewarded by the Agentic AI Foundation (Linux Foundation) — so a repo AE
  installs or migrates is read as-is by Codex, Gemini CLI, Cursor and any
  other standard-following agent, with no adapters and no second copy
  (tying back to the README's own per-tool-adapter ban two paragraphs
  later); and that AE's nesting rule is the spec's own: nest at any depth,
  nearest-wins, linking `reference/context.md` where step 1 wrote the rule.
  Voice and provenance match step 1 deliberately: same steward attribution,
  same `https://agents.md` URL, same `nearest-wins` term, so README and
  `reference/context.md` cite one source in one vocabulary. Seven lines,
  all ≤73 columns (README prose norm); link discipline kept — the local
  link resolves (agent-lint's broken-link check covers it) and the external
  one is skipped by the lint (`scripts/agent-lint.mjs:147`).
  Acceptance: `grep -qi "nearest-wins" README.md && node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  `0 high, 0 medium, 0 low — PASS`, `EXIT=0`. Other three gates green:
  `run-lint-tests.mjs`=0, `run-gen-tests.mjs`=0, `run-eval-checks.mjs`=0.
  Files changed: `README.md` (+ this entry) — `git status --porcelain`
  showed `M README.md` alone before the PROGRESS write. No CHANGELOG, no
  restamp, no version bump.
  Concern (minor, not fixed on purpose): `README.md:244` still writes the
  budget as "per-app ≤30", the flat vocabulary Feature A retired — that is
  step-1 review minor **m4**, which the controller DEFERRED to work-verify
  triage. This step's scope is Feature D only, so I left it standing rather
  than preempting the triage; it is a one-word fix ("nested ≤30") whenever
  the controller wants it.

- **Step 6 review — Approved** (fresh reviewer, spec ✅ compliant, no
  Critical/Important; acceptance re-run, 0; all four Feature D elements
  present, provenance matched against context.md directly). Minor DEFERRED
  to work-verify triage: (m28) "AE's nesting rule is the spec's own"
  over-bundles — only nearest-wins is the spec's; suggest "aligns with the
  spec's own"; reviewer also re-flagged m4's README:252 "per-app ≤30" as
  now sitting close to the new any-depth wording (already tracked).

- **Step 7 — Feature E, `templates/repo/docs/tiers.md` points home.** One
  closing paragraph (4 lines) added after the last "Rules that hold at
  every tier" bullet: the ceremony the file describes belongs to the AE
  standard, source at `github.com/bygama/Agent-Engineering` (skills —
  `work-run`, `orchestrate` — plus the README's adoption guide), and
  without those skills installed the ceremony runs by hand.
  First draft said `"AE" above names the standard…`, but "AE" never
  actually occurs earlier in this file (the acronym only surfaces once
  the file is instantiated, inside the consumer's `AGENTS.md` header via
  `templates/repo/AGENTS.md.template:5`, `Standard: AE/{{VERSION}}` — this
  file is what that header's tier line points to). Reworded to introduce
  the term rather than falsely backreference it: "This ceremony belongs
  to the AE standard, source at …". `reference/task-tiers.md` untouched
  — this step's only surface is the template.
  Acceptance: `grep -q "bygama/Agent-Engineering"
  templates/repo/docs/tiers.md && git diff --quiet HEAD --
  reference/task-tiers.md` → `EXIT=0`. All four gates also re-run green:
  self-lint `0 high, 0 medium, 0 low — PASS` (exit 0),
  `run-lint-tests.mjs` → all 13 cases passed (0), `run-gen-tests.mjs` →
  all gen cases passed (0), `run-eval-checks.mjs` → all eval checks
  passed (0). Files changed: `templates/repo/docs/tiers.md` (+ this
  entry) — `git status --porcelain` showed only that file modified before
  the PROGRESS write. No CHANGELOG, no restamp, no version bump. PLAN.md's
  step-7 checkbox left unflipped, matching steps 3-6's existing state in
  this lane (checkbox-flipping is not part of the individual-step
  convention here — only steps 1-2 carry `[x]`). No concerns.

- **Step 7 review — Approved** (fresh reviewer, spec ✅ compliant, no
  Critical/Important; absolute-URL-from-a-consumer-repo requirement
  correctly reasoned and satisfied). Minor DEFERRED: (m29) "the README's
  adoption guide" is a paraphrase — README's actual headings are
  "Installing in any repo" / "Adopting AE on your own machine".
- **Ruling 8 recorded** — step 8 runs gates + evidence only; the
  feature_list flip belongs to work-verify (work-run never flips a row).

- **Step 8 — Full gate sweep + evidence** (per DECISIONS ruling 8: this
  step runs gates and records evidence only — it does NOT flip
  `feature_list.json` rows; that is work-verify's, later, and
  `feature_list.json` was not edited).
  Four-gate chain run in sequence, Git Bash semantics:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  && node tests/run-lint-tests.mjs && node tests/run-gen-tests.mjs &&
  node tests/run-eval-checks.mjs` → `EXIT_CHAIN=0`.
  - `agent-lint` → `0 high, 0 medium, 0 low — PASS`
  - `run-lint-tests.mjs` → `all 13 cases passed`
  - `run-gen-tests.mjs` → `all gen cases passed`
  - `run-eval-checks.mjs` → `all eval checks passed` (10 skills + 2
    repo-local skills, incl. `ok   ae-init: 6 evals well-formed`)

  Each feature row's verification command from
  `work/mat-82-ae-at-scale/feature_list.json` (F1-F5), run individually:
  - **F1** — `grep -q 'nearest-wins' reference/context.md && grep -qi
    'non-inferable' templates/monorepo/app-AGENTS.md.template && grep -qi
    'nearest' docs/how-it-works/standard-lifecycle.md` → `F1_EXIT=0`
  - **F2** — `grep -q 'owner terminal' reference/orca.md && git diff
    --quiet HEAD -- skills/orchestrate/references/dispatch-child.md &&
    [ $(wc -l < global/CLAUDE.md) -le 40 ] && grep -qi 'browser'
    docs/how-it-works/execution.md` → `F2_EXIT=0`
  - **F3** — `grep -q 'Tracker-project:' reference/tracker.md && grep -qi
    'initiative' reference/tracker.md && grep -qi 'nearest'
    docs/how-it-works/work-lifecycle.md && test -f
    skills/ae-init/evals/eval-06.md && node tests/run-eval-checks.mjs` →
    `F3_EXIT=0` (eval-checks output identical to the chain run above)
  - **F4** — `grep -qi 'nearest-wins' README.md && grep -qi 'Gemini CLI'
    README.md` → `F4_EXIT=0`
  - **F5** — `grep -q 'bygama/Agent-Engineering'
    templates/repo/docs/tiers.md && git diff --quiet HEAD --
    reference/task-tiers.md` → `F5_EXIT=0`

  Accept: four-gate chain exits 0 AND every F-row command exits 0 — both
  hold. `feature_list.json` untouched by this step (verified: only
  `PROGRESS.md` modified for step 8). No CHANGELOG, no restamp, no
  version bump. No concerns.

## In progress

## Tried and failed

## Next

(Child side complete: 8/8 steps done+reviewed, work-verify PASS, F1-F5
passing. What remains is the PARENT's: adversarial wave on the open PR,
any fix-loop findings back to this lane, rebase onto fresh main on the
parent's request, merge, terminal lane close. Follow-ups surfaced for
the parent to file: ae-audit checklist.md:59 monorepo row (ruling 10),
tracker.md GitHub-plane trim + ADR-001 two-connectors note (m22),
eval-06 Run D widening (m21), retired per-app vocabulary sweep (m4),
workstation installer re-run to propagate global/CLAUDE.md.)

## Verification

### 2026-08-18 — L DoD — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (`all 13 cases passed`); `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases passed`); `node tests/run-eval-checks.mjs` → exit 0 (`ok ae-init: 6 evals well-formed` / `all eval checks passed`)
- L2 feature rows: F1-F5 verification commands each → exit 0 (controller run + reviewer's independent run, this session)
- L3 end-to-end: n/a — documentation standard, no runtime flow; the four gates + F-rows are the executable surface (recorded as a decision, not a silent skip)
- Hard constraints: CHANGELOG untouched (git diff --quiet base..HEAD exit 0); AGENTS.md diff empty (no restamp); `wc -l global/CLAUDE.md` = 40; dispatch-child.md / examples/ / task-tiers.md / templates/community/ / scripts/ untouched base-relative (exit 0)
- Fresh-context review: **PASS** — reviewer ran every gate, every F-row, and every spot check itself and quoted exits; re-verified rulings 1 and 7 against primary sources; one Important finding (ae-audit checklist.md:59 grades by the retired per-app rule) ruled out-of-lane (DECISIONS ruling 10: outside SPEC surfaces + MAT-68 contention) → surfaced to the parent as a follow-up to file; new minors recorded: eval-06 preamble's "strict" phrasing vs tracker.md's careful citation; F2/F5's HEAD-relative git-diff clauses prove little on a clean tree (base-relative proof recorded in evidence instead); tracker.md 178/120 with the trim deferred (m22)
- Adversarial review: n/a here — dispatch config assigns the adversarial wave (1 reviewer) to the PARENT after worker_done; the child runs work-verify only

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
