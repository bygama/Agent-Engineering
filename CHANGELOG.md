# Changelog

All notable changes to **AE**, the agent-engineering standard. Format:
[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/); numbers:
SemVer-shaped, milestone-weighted since
[ADR-007](docs/adrs/ADR-007-milestone-versioning.md) — a deliberate
deviation from strict SemVer's MINOR/PATCH split. A version is spoken
"AE 1.0.0" and written `Standard: AE/1.0.0` in stamps, `v1.0.0` in git
tags:

- **MAJOR** — breaking shape change: a migrated repo must change to stay
  compliant.
- **MINOR** — an owner-designated milestone package: a coherent set the
  owner names as a milestone of the standard.
- **PATCH** — everything else backward compatible: fixes, errata, and
  incremental capability (new skills, templates, checks) not designated
  a milestone.

Template or check changes always land in a bump — never shipped
silently; related change sets may accumulate unreleased and ship
together, owner-paced. Docs-only refreshes never bump.
Every bump restamps the root `AGENTS.md` in the same change, lands with
its migration note (`skills/agent-init/references/migration.md`), and
tags the release (`vMAJOR.MINOR.PATCH`) — the README badge reads the
latest tag by itself.

Entries before 1.0.0 shipped under the old `AE/<major>.<minor>` naming
and keep their former name for traceability; repos still stamped with an
old name are "behind, not broken" — `agent-audit` flags them,
`agent-init` migrates them.

## [1.4.1] — 2026-08-19

Everything here was found by the standard running itself: four
orchestration waves in one day surfaced eleven defects in their own
scaffolding, and this release closes them. PATCH per ADR-007 — fixes
and incremental capability, no milestone designated.

### Added

- **`skill-authoring`** (`skills/skill-authoring/`, the eleventh
  skill): the METHOD for building skills from evidence —
  RED-GREEN-REFACTOR where the baseline is a run you perform now, the
  form matched to the failure class, micro-tests with a mandatory
  no-guidance control. The law stays in `reference/skills.md`, which
  gains the supersession table. With it, no suite skill remains in
  daily use.
- **Reference-path resolution** (`skills/using-ae/`): AE skills cite
  `reference/…`; the entry skill now states how that resolves from any
  repo — the skill's link-resolved location, then a local clone, then
  the public repo, and if none is reachable, say so instead of
  inventing. The junction trap (a `..` walk from an installed skill
  lands in `~/.claude`, not the standard) is named in the red flags.
- **Two checks for laws that had none**: the always-loaded entry
  skill's 80-line cap (whose number existed nowhere in the standard
  until this release wrote it into `reference/skills.md`), and
  fenced tool-managed blocks in pointer files.

### Changed

- **The dispatch template stops producing false refusals.** "No
  grandchildren" now names both sides — orchestration workers
  forbidden, the child's own in-session reviewers REQUIRED at their
  tiers — and forces attempt-then-classify: a rule you read is not a
  refusal, a refusal is what the runtime did once you tried. Three of
  four children in one wave had stopped at their verification gate on
  the old wording.
- **Heartbeats gain a cadence** (~10 minutes even when the phase does
  not change) and the parent gains the idle diagnosis it lacked: an
  established cadence that stops, plus a transcript that has not
  advanced, is an idle child — and the remedy is a Task to its
  terminal, since a finished turn cannot read mail.
- **Orca is named as the ledger**, with its real field names verified
  by running the commands (`task_title`, not the `title` an operator
  once guessed), plus the red flag that produced a parallel id ledger
  in the wild: keeping ids in files instead of rereading them.
- **A child needing custom runner argv** may use the two-step launch,
  with its provenance cost measured and stated rather than lost
  silently.
- **Filling dispatch specs at wave scale is expected to be
  mechanical**, and the generation must fail on any surviving
  placeholder; the template gains an optional `[REPO_CONSTRAINTS]`
  slot.

### Fixed

- `cmd-drift` no longer fails a repo for a cited command path that
  leaves the repo (correct in the owner's checkout and in CI, absent
  from a worktree) — it reports the context-dependence and keeps
  failing genuine in-repo drift.
- Machine-absolute paths are gone from shipped surfaces: three skills
  cite the resolution rule instead, and the loop templates carry the
  placeholder the operator fills.

## [1.4.0] — 2026-08-19

**AE at scale** — the owner-designated milestone (ADR-007): the
standard learns to serve deep monorepos, third-party adopters, and the
tools that share its files. Every lane in this release ran through
orchestrate (production cycles 5-8: supervised children, cross-model
ballena reviews, parent merges).

### Added

- **Deep-nesting criterion** (`reference/context.md`, monorepo
  template): AGENTS.md nest at ANY depth — a directory EARNS its file
  only when it holds non-inferable local knowledge, never by symmetry;
  nested canonical ≤30 + pointer CLAUDE.md; precedence stated: user
  prompt > nearest AGENTS.md > ancestors, matching the agents.md open
  standard and Claude Code's walk-up behavior.
- **Hierarchical tracker** (`reference/tracker.md`, ae-init, monorepo
  template): the root declaration may carry `· initiative <name>`
  (Linear's own noun); a nested AGENTS.md may carry
  `Tracker-project: <Name>`, inheriting workspace/team from the
  nearest full declaration; the respect rule compares against the
  NEAREST declaration. ae-init detects ≥3 domains and ships a
  pre-built recommendation (team · initiative · one project per
  domain), provisioning missing Linear projects on approval.
- **Browser capability criterion** (`reference/orca.md`,
  global/CLAUDE.md): Orca's embedded browser by default; heavy browser
  MCPs (Playwright, devtools) only for capabilities it lacks and only
  from owner terminals — never a supervised child. ae-init installs a
  runtime-neutral one-line browser gotcha in UI repos at init.
- **agents.md interop** (README): AE's AGENTS.md files are the
  agents.md open-standard format — migrated repos are readable by any
  standard-following agent; consumer `docs/tiers.md` now points home
  to this repo and its adoption guide.
- **Lint: fenced tool-managed blocks** (`scripts/agent-lint.mjs` + 3
  fixtures, tests first): the pointer check strips
  `<!-- BEGIN:<name> -->`…`<!-- END:<name> -->` blocks before counting
  (the Next.js agent-rules case); an unclosed fence is no exemption.

### Changed

- **using-ae role rule — the seat decides**: a session in the repo's
  MAIN worktree facing M+ work IS the parent; binding the Run is
  orchestrate step 0's own first action (`run-current` → `run-use` →
  `run-create`), no longer a precondition. Fixes the bootstrap
  circularity that sent fresh owner terminals to inline execution;
  orchestrate's discovery description aligned. Detection signal:
  `git rev-parse --path-format=absolute --git-dir --git-common-dir`.
- `reference/tracker.md` trimmed to its 120-line target; the ADR-001
  two-connectors note (Linear MCP is a second connector, never a
  no-Orca rung) kept where it binds.

### Fixed

- ae-init eval-06 Run D widened; retired "per-app" vocabulary swept
  from living surfaces (docs-sweep battery row added); the
  Linear-model paraphrase tightened to the cited Concepts page; the
  README interop claim split (aligned-with, not identical-to).

## [1.3.2] — 2026-08-18

Telemetry-vocabulary patch (PATCH per ADR-007 — a fix set, no
milestone designation).

### Changed

- The child dispatch template
  (`skills/orchestrate/references/dispatch-child.md`) fixes the
  heartbeat `--phase` vocabulary: `investigating → planning →
  implementing → reviewing → verifying → reporting`, with `blocked`
  valid only alongside a live `ask` — never free text a child invents
  (a live child's novel `waiting` read ambiguous from the parent's
  seat). The mailbox-discipline section reuses the same words.
- Root `AGENTS.md` now carries its own `Tracker:` declaration line —
  the repo applies the 1.3.1 respect rule to itself.

## [1.3.1] — 2026-08-18

The post-milestone polish and install-convention set (PATCH per
ADR-007 — capability without milestone designation). Every lane in
this release was itself built through orchestrate: supervised child,
cross-model ballena review, parent merge.

### Added

- ae-init settles the **artifacts language** as a standing default:
  agent context and technical docs come out English regardless of the
  repo's human-docs language; ae-init infers the divergence and
  auto-writes the language-split gotcha — no interview question, zero
  friction (born from a real Spanish-README install).
- The repo **declares its tracker workspace**: ae-init's interview
  gains one settled-once tracker question ("none" accepted); the
  answer lands as a one-line `Tracker:` declaration in the generated
  AGENTS.md; `reference/tracker.md` gains the respect rule — before
  any tracker write the agent compares its live binding against the
  declaration, and a mismatch (or unresolved binding) means NO write,
  the operation is emitted for the operator instead. work-handoff
  cites the rule.
- Child dispatch discipline: `references/dispatch-child.md` instructs
  children to check their orchestration mailbox at every phase
  transition (mid-flight amendments travel by mail), and to use
  Orca's embedded browser for web needs — never Playwright or Chrome
  MCPs (a driven browser is a long-lived in-session process).
- The child/implementer seat joins `reference/runners.md` as a
  registry entry (default `--agent claude`; per-dispatch override
  only with a concrete reason); orchestrate's birth command cites the
  registry.

### Changed

- orchestrate teardown and mechanics polish: the ballena two-step
  launch closes its unused fallback shell; re-engage `worker-start`
  examples carry the `--worktree` flag (live `terminal_worktree_mismatch`
  fix); reviewer retain names the literal `worker-retain` command;
  `<slug>-review` worktrees suffix per seat at N>1; feature rows flip
  from the merged tree; the no-Orca fallback emits the ready-to-run
  protocol for missing runners and closes lanes via work-handoff.
- `reference/runners.md` labels both opencode forms (headless vs TUI).

### Fixed

- "pre-dispatch" naming drift aligned to "pre-fan-out"; stale `FAN`
  mermaid node id; using-ae's red-flag row aligned with the role rule.

## [1.3.0] — 2026-08-18

The orchestration milestone (owner-designated; the number freed by the
ADR-007 renumber, reserved since, and honored here). AE goes
Orca-first for orchestration: every M+ task executes in a child
worktree that a parent dispatches, supervises, reviews, and merges —
mapped onto Orca's native primitives (Run, Task, Dispatch,
`worker_done`, decision gates), never onto invented coordination.
Gate met before this bump: one real M (MAT-56) ran the whole cycle in
production — supervised child, blocking ask/reply, cross-model review
wave, parent merge ([ADR-008](docs/adrs/ADR-008-orchestration.md)).

### Added

- `skills/orchestrate` — the parent orchestrator role end to end: Run
  binding, lane→Task with `--deps` overlap queuing, the owner dispatch
  dialogue (default 1 ballena), `worker-start`-only children with
  Linear bound at birth, mailbox supervision, review wave, fix loop
  cap 5 → decision gate, parent-only rebase merges, full
  decommissioning — plus the manual no-Orca fallback (the standard
  stays followable without Orca).
- Dispatch templates `skills/orchestrate/references/dispatch-child.md`
  and `references/reviewer.md` — filled verbatim at dispatch;
  `worker_done` command shapes probed against the live CLI.
- using-ae role rule: Run-bound session = parent (M+ routes to
  orchestrate); dispatch-bound session = child (map as written); no
  bound Run = map as written.
- `docs/adrs/ADR-008-orchestration.md`, with reciprocal amendment
  pointers in ADR-002, ADR-004, ADR-007, and SPEC Decision 7.
- how-it-works: execution.md gains the orchestration section (topology
  + 8-stage dispatch-cycle diagrams, narrated).
- work-run: released-runners discipline — once a runner's
  report/verdict is recorded, the controller releases it (record →
  release → dispatch next), with the timing nuance (implementers held
  until their verdict; reviewers released at verdict). Shipped through
  orchestrate itself as the dogfood gate (MAT-56, PR #50).

### Changed

- Tier surfaces: L names orchestrate as an executor option alongside
  work-run; XL's mandatory ceremony is orchestrate's (was fan-out's).
- The ballena reviewer seat defaults to the owner's OpenCode Go model
  (`reference/runners.md` as the per-machine seat registry); the free
  gateway model stays documented as the no-auth portability fallback.

### Removed

- `skills/fan-out` — absorbed into orchestrate (closed
  finalize-then-remove; its manual procedure survives as orchestrate's
  no-Orca fallback section, its XL ceremony as the "several children
  at once" section). Records keep the name.

## [1.2.2] — 2026-08-18

The templates + shaping package (sized PATCH per ADR-007; 1.4.0 stays
reserved for the orchestration milestone).

### Added

- `skills/shaping` — AE owns the design dialogue (ADR-006): one
  question at a time, 2-3 approaches with a recommendation, a design
  confirmed section by section under a hard approval gate, feasibility
  probes as S-tier ask-and-report; consumes the tier from using-ae and
  hands the approved design to work-plan design-first, leaving no
  artifact of its own. Supersedes superpowers' `brainstorming` for
  daily design work (installed suite remains the no-AE-setup fallback).
- Dispatch prompt templates ship with the executor skills
  (`skills/work-run/references/`: implementer, step-reviewer,
  re-reviewer; `skills/work-verify/references/`: lane-reviewer) —
  fill-in skeletons encoding the lane contracts; controllers compose
  dispatches from them instead of improvising, and the evals now
  require it.
- ADR-006: the design dialogue is AE's (narrower than ADR-005:
  supersession on observed friction, not artifact collision).

### Changed

- `reference/skills.md`: brainstorming leaves the composable examples;
  the Placement rule and the ADR-006 supersession paragraph land;
  using-ae routes design asks to shaping; work-plan's refusal invokes
  shaping instead of pointing at an external suite.
- README: "The ten skills" with shaping opening the chain.

## [1.2.1] — 2026-08-17

*(Shipped as 1.3.0; renumbered 2026-08-18 under ADR-007's retroactive
application — owner decision, tag moved to `v1.2.1` on the same
commit.)*

### Changed

- Skill renames, names now self-explanatory (owner direction): `relay`
  → `work-run` (the family reads work-plan → work-run → work-verify →
  work-handoff), `agent-init` → `ae-init`, `agent-audit` → `ae-audit`
  (AE as the proper noun reaches the replication skills). Records keep
  the old names; `ADR-004-relay.md` carries a status-line note and its
  filename stays as the citable anchor. The `agent-lint` script keeps
  its name (consumer Commands cite it).
- `reference/skills.md` gains the Placement rule: AE ships the
  fundamental skills (lifecycle + replication); complementary
  methodology skills live in the personal library; a complementary
  skill that becomes load-bearing for the standard moves upstream.

## [1.2.0] — 2026-08-17

### Added

- `skills/work-plan` — the planning phase becomes AE-owned: turns an
  approved design into a relay-shaped lane PLAN (dispatchable steps,
  executable acceptance, named interfaces, `[batch]` marks, role
  hints; XL produces the parent plan). Two modes: design-first (SPEC →
  owner gate → PLAN) and direct (SPEC + PLAN, one gate). Supersedes
  superpowers' `writing-plans`.
- `skills/using-ae` — the entry skill (≤80 lines, always-loaded):
  entry rule, the nine-skill map, and the ADR-005 precedence rule.
- `global/hooks/using-ae.ps1` — SessionStart hook emitting the entry
  skill verbatim ($PSScriptRoot-relative through the junction; silent
  and exit 0 when the skill is absent). Workstation installer applies
  it.
- ADR-005: artifact-producing phases are AE's (generalizes ADR-004).

### Changed

- `reference/skills.md`: `writing-plans` joins the superseded list;
  using-ae documented as the always-loaded entry point.
- README: "The nine skills", with work-plan and using-ae in the chain.

## [1.1.0] — 2026-08-17

### Added

- `skills/relay` — the lane executor: a fresh implementer subagent per
  PLAN step with the lane as the entire context package, per-step
  review (maker ≠ checker), a capped fix loop with model escalation,
  and rulings recorded in DECISIONS.md. Recommended default at L,
  available at M, never mandatory — a runner without subagents runs
  the same steps inline under the same ceremony (ADR-004).
- ADR-004: relay — the standard owns lane execution (amends SPEC
  Decision 7's L-tier ceremony).

### Changed

- `reference/skills.md`: process-skill suites' own executors and
  finishers are superseded in writing — suites supply the thinking
  phases; from `work/<slug>/PLAN.md` on, the standard executes.
- Consumer `docs/tiers.md` template: the L row names relay as the
  recommended executor.
- README: the skills section now documents all seven skills and how
  they chain on one unit of work.

## [1.0.0] — 2026-08-17

The standard declared stable.

### Added

- `examples/` — instantiated setups per repo type (single app, monorepo,
  machine config with the living workstation example), excluded from the
  self-lint like fixtures and from restamps (stamps show authoring time).
- README: **Installing in any repo**, **Customizing**, and **Examples**
  sections.
- ADR-003: semantic versioning and the renumbered line (amends SPEC
  Decision 3).

### Changed

- Versioning: SemVer + Keep a Changelog adopted. The predecessor
  generation is 0.1.0; the AE/2.x era is renumbered as the 0.x
  initial-development line (SemVer: "major version zero — anything may
  change"); former names preserved below.
- `agent-lint` stamp-shape accepts the three-part stamp; the two-part
  shape stays valid so pre-1.0 repos read as behind, not malformed.
- Self-lint ignore set gains `examples`.

## [0.6.1] — 2026-08-17 — formerly AE/2.6

### Fixed

- The triage-loop example now assigns S/M/L/XL per `docs/tiers.md` — it
  assigned S/M/L via `reference/task-tiers.md`, a path that only exists
  in the standard's own repo. Found by the full-repo docs drift sweep.

## [0.6.0] — 2026-08-16 — formerly AE/2.5

### Added

- Tier XL (ADR-002): consumer repos gain `docs/tiers.md` in the seed and
  the AGENTS.md tier one-liner adds XL. XL = everything L per worker
  lane + mandatory fan-out (three questions in writing, anchors, worker
  table, reducer, synthesis gate on the merged whole); the ratchet
  extends L→XL; `work-verify` owns the XL DoD.

## [0.5.0] — 2026-08-16 — formerly AE/2.4

### Changed

- Orca-first execution (ADR-001): the probe is step 0 of every executing
  skill; the no-Orca contract replaces per-capability fallbacks
  (everything that is a file still happens; Orca-only steps are declared
  NOT done); `loops/LOOP.md.template`'s trigger element is an Orca
  automation (created `--disabled`) + manual iteration — the
  cron//schedule/MCP fallback ladders are gone everywhere.

### Added

- Five primitives from the version-matched CLI survey: agent-first
  worker spawn, card comments, card status mapped to the lane lifecycle,
  `orca orchestration` mail, built-in browser as the named web e2e tool.

## [0.4.1] — 2026-08-16 — formerly AE/2.3

### Fixed

- `agent-lint` cmd-drift honors the `# not verified` honesty marker —
  found by the kitchen-sink composite fixture on its first run.

### Added

- `tests/fixtures/kitchen-sink/` (16 mechanical + 8 judgment plants,
  MANIFEST, lint cases pinned) and `tests/run-eval-checks.mjs` (the
  ≥3-evals contract made executable); failure-derived evals from real
  P2-P4 failures.

## [0.4.0] — 2026-08-16 — formerly AE/2.2

### Added

- The loop layer: `templates/repo/loops/LOOP.md.template` (five
  elements: stopping rule, verified gate, budgets, state file, trigger)
  + worked triage example; `skills/loop-setup`; `reference/loops.md`,
  `orca.md`, `tracker.md`. Loop state files are gitignored runtime
  artifacts.

## [0.3.0] — 2026-08-16 — formerly AE/2.1

### Added

- Daily-work skills: `work-verify` (tier DoD by command, three layers,
  fresh-context review at M+) and `work-handoff` (close|pause, evidence
  gate, debris sweep, finalize-then-remove lane closure).
- Template change: `PROGRESS.md` gains `## Verification`; skill prose
  de-hardcoded from version literals ("current" = newest entry here).

## [0.2.0] — 2026-08-16 — formerly AE/2.0

### Added

- The stable shape's baseline: canonical AGENTS.md (≤60, stamp, tier
  one-liner) + ≤3-line pointer CLAUDE.md; per-app files for monorepos;
  `reference/` (8 docs); `templates/repo/` (entry files, docs seed,
  four-file lane templates, feature-list schema, community pack — no
  CODE_OF_CONDUCT); `skills/agent-init` + `skills/agent-audit` (3 evals
  each); `scripts/agent-lint` + 12 fixtures + generator self-tests; the
  founding spec and `docs/how-it-works/`.

## [0.1.0] — the predecessor generation

The primitive first cut, in the retired Context-Engineering repo
(deleted 2026-08-16): canonical CLAUDE.md as the context file,
entry-stub AGENTS.md, no version stamps. `agent-init` still recognizes
this layout — the "v1 shape" — and migrates it
(`skills/agent-init/references/migration.md`).
