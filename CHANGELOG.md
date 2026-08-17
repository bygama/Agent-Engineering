# Changelog

All notable changes to **AE**, the agent-engineering standard. Format:
[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/); versions:
[Semantic Versioning 2.0.0](https://semver.org/) — both verified at
source 2026-08-17. A version is spoken "AE 1.0.0" and written
`Standard: AE/1.0.0` in stamps, `v1.0.0` in git tags:

- **MAJOR** — breaking shape change: a migrated repo must change to stay
  compliant.
- **MINOR** — new capability, backward compatible: a new template piece,
  check, or skill surface.
- **PATCH** — fixes and errata, backward compatible.

Template or check changes always bump; docs-only refreshes never do.
Every bump restamps the root `AGENTS.md` in the same change, lands with
its migration note (`skills/agent-init/references/migration.md`), and
tags the release (`vMAJOR.MINOR.PATCH`) — the README badge reads the
latest tag by itself.

Entries before 1.0.0 shipped under the old `AE/<major>.<minor>` naming
and keep their former name for traceability; repos still stamped with an
old name are "behind, not broken" — `agent-audit` flags them,
`agent-init` migrates them.

## [1.3.0] — 2026-08-17

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
