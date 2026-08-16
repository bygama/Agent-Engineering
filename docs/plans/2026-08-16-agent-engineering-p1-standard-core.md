# Agent-Engineering P1 (Standard v2 Core) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the v2 standard installable and auditable: reference layer docs, templates
v2 (AGENTS.md-canonical flip), `agent-lint` + fixtures, `agent-init`/`agent-audit` with
evals first, machine junction swap, workstation update — ending with the old repo's
deletion ritual (explicit human gate).

**Architecture:** All repo work on branch `p1/standard-core`, merged via rebase PR at the
end (house convention). Content is ported *selectively* from the old repo's local clone
and transformed to v2; new docs argue from the founding spec and the how-it-works
chapters. Machine-level steps (junctions, workstation, deletion) run only after the PR
merges.

**Tech Stack:** Markdown, zero-dep Node (`.mjs`), PowerShell, `gh`.

**Spec:** `docs/specs/SPEC-agent-engineering.md`. Normative companions:
`docs/how-it-works/standard-lifecycle.md`, `docs/how-it-works/work-lifecycle.md`.

## Global Constraints

- Technical English everywhere; no `Context-Engineering` mentions in authored content
  (exceptions: the ported founding spec/plans, and this plan's own port-source paths).
  Migration docs describe legacy patterns generically ("the v1 standard", "2025-style").
- Budgets: root AGENTS.md ≤60 target/100 cap · CLAUDE.md pointer ≤3 lines containing
  `@AGENTS.md` · per-app AGENTS.md ≤30 · global CLAUDE.md ≤40 (H1 `# Global instructions`)
  · reference docs ≤120 lines · SKILL.md <500 lines · reference files >100 lines start
  with a TOC.
- Reference docs carry source+date headers (public URLs only).
- **Evals change BEFORE skill content** — always write/commit evals first.
- Any structure/behavior change updates the affected how-it-works chapter in the same
  branch (Task 11 consolidates).
- Commits on `p1/standard-core`; conventional one-line subjects; both trailers
  (`Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`,
  `Claude-Session: https://claude.ai/code/session_01253fTnEmyEpdHv2B5XPEHM`).
- Old clone (read-only source): `C:\Briar\repos\mine\Context-Engineering`. New repo:
  `C:\Briar\repos\mine\Agent-Engineering`. Workstation: `C:\Briar\repos\mine\workstation`.
- Self-lint target (from Task 8 on): `node scripts/agent-lint.mjs . --ignore tests,templates,global` exits 0.

## Fixed design decisions (locked here, argued from spec)

1. **Canonical flip in lint:** budgets + 4-block structure + command drift move from
   CLAUDE.md to AGENTS.md. Root CLAUDE.md (and nested, non-global) must be a pointer:
   ≤3 lines AND contain `@AGENTS.md` → else `pointer-shape` (high). Old `agents-size`
   (~12-line entry stub) and `per-app-agents` checks are REMOVED (inverted world).
2. **Per-app pattern:** per-app AGENTS.md ≤30 (medium >30, high >60) + per-app CLAUDE.md
   pointer (Claude Code auto-loads nested CLAUDE.md; the pointer bridges it).
3. **Stamp:** root AGENTS.md requires `Standard: AE/<major>.<minor>` on its own line →
   `stamp-missing` (medium) / malformed `stamp-shape` (medium). Only the root.
4. **Lanes:** work artifacts live in `work/<slug>/`; each lane needs PLAN.md + PROGRESS.md
   minimum (`lane-incomplete`, medium); four-file names at repo root → `lane-location`
   (medium); slug kebab-case (`lane-slug`, low).
5. **Feature list:** `feature_list.json` anywhere → hand-rolled schema validation
   (`feature-schema`, high): array of `{id:/^F\d+$/, behavior:string, verification:string,
   state: not_started|active|blocked|passing, evidence:string|null}`, `passing` ⇒ evidence
   non-null. If the file is git-tracked, compare against `git show HEAD:<path>`: any
   `passing` → non-`passing` transition → `feature-regression` (high); skip silently when
   git/HEAD unavailable.
6. **Kept checks (retargeted where noted):** adapters · read-orders (AGENTS.md+CLAUDE.md)
   · block structure (AGENTS.md) · broken links (+AGENTS/CLAUDE/README) · docs index +
   naming · skill hygiene · DESIGN.md suite (via ported `design-md-gen.mjs`) · command
   drift (AGENTS.md `## Commands`) · global-layer CLAUDE.md canon unchanged.
7. **Community pack:** CODE_OF_CONDUCT dropped (file + MATRIX row) per owner decision.
8. **Skills naming:** `agent-init`, `agent-audit`. Old skills stay untouched in the old
   clone until the machine swap task.

---

### Task 1: Plan on branch

- [ ] **Step 1:** This file exists at `docs/plans/2026-08-16-agent-engineering-p1-standard-core.md`.
- [ ] **Step 2:** `git add docs/plans/... && git commit -m "docs: add P1 standard-core implementation plan"`

### Task 2: reference/principles.md + reference/context.md

**Files:** Create `reference/principles.md`, `reference/context.md`.
**Interfaces:** Produces the normative base every later doc/skill cites. Sources: old
`reference/principles.md` (evolve), old `claude-md.md` + `global-vs-repo.md` (fold into
context.md), spec, how-it-works chapters, `_distilled` corpus (private; cite public URLs:
claude.com new-rules post, anthropic effective-context-engineering).

- [ ] **Step 1: principles.md** (≤120): evolve the old file — keep: attention budget,
  six shifts, context stack table, right altitude, JIT retrieval + diagram criterion,
  naming-as-metadata, long-horizon (subagents/compaction/note-taking), "Claude is already
  smart" test. Add a `## v2 additions` section with the six new principles, one short
  paragraph each: evidence over confidence · maker ≠ checker · repo as system of record ·
  WIP=1 · ceremony scales with tier (ratchet up only) · anything broken twice becomes a
  check. Update stack table row "CLAUDE.md" → "AGENTS.md (canonical) / CLAUDE.md pointer".
- [ ] **Step 2: context.md** (≤120): the entry-file architecture. Sections: `## Budgets`
  (table: root AGENTS.md ≤60/100 · per-app AGENTS.md ≤30 · CLAUDE.md pointer ≤3 ·
  global ≤40); `## The canonical file` (AGENTS.md 4-block structure ported from old
  claude-md.md §4-blocks with examples, + stamp line + tier one-liner); `## The pointer`
  (CLAUDE.md = `@AGENTS.md`, why: cross-runtime canonical + Claude import; nested pattern);
  `## What never goes in` (ported list + skill-list/auto-memory/procedures rules);
  `## Global vs repo` (ported criterion + duplication test from global-vs-repo.md);
  `## Legacy anti-patterns` (ported table, generic wording, add "v1: CLAUDE.md-canonical
  without stamp" row).
- [ ] **Step 3:** Verify: both ≤120 lines (`Measure-Object -Line`), old-name grep clean.
  Commit `docs(reference): principles and context layer docs`.

### Task 3: reference/memory.md + reference/harness.md

**Files:** Create `reference/memory.md`, `reference/harness.md`. Sources: corpus (cite
anthropic memory/managed-agents URLs, openai harness-engineering, anthropic
effective-harnesses), old `agents.md` (folds into harness.md).

- [ ] **Step 1: memory.md** (≤120): `## Context is not memory` (window = stateless
  scratchpad); `## What to store` (facts + skills, never transcripts; density metric:
  decision-relevant info per token); `## Write discipline` (CRUD: ADD/UPDATE/DELETE/NOOP,
  atomic notes; contradictions surface — never auto-merge); `## Forgetting on purpose`
  (decay by relevance × frequency × recency; growth slope kills long-lived agents);
  `## Placement` (auto-memory = session-learned; repo files = project state; global =
  user; the duplication test).
- [ ] **Step 2: harness.md** (≤120): `## Definition` (everything outside the weights; you
  already have one); `## Five subsystems` (instructions/tools/environment/state/feedback
  table + "feedback = highest ROI"); `## Repo as system of record` (three inputs; fresh
  session test: 5 questions); `## Stopping rules` (write done-means before the run; bad
  ending policy; hard caps); `## Tools` (small menus, actionable errors with FIX steps,
  remove unused, naming matters); `## Sub-agents and custom agents` (ported decision rule
  from old agents.md: recurring role + no native coverage; return-contract-first;
  placement); `## Permissions` (OS-level boundaries beat approval prompts; short-lived
  scoped credentials).
- [ ] **Step 3:** Verify budgets + grep. Commit `docs(reference): memory and harness layer docs`.

### Task 4: reference/verification.md + reference/task-tiers.md

**Files:** Create both. Sources: how-it-works/work-lifecycle.md (normative), corpus.

- [ ] **Step 1: verification.md** (≤120): `## Evidence over confidence` (models
  systematically overconfident; done = command exit 0); `## Three layers` (static →
  behavioral+starts → end-to-end; unit tests blind to boundary defects; no skipping);
  `## Maker ≠ checker` (fresh context, acts on artifact, assumes broken; decorative vs
  real evaluator table); `## Error messages carry the fix` (WHAT/WHY/FIX format, example);
  `## Broken twice becomes a check` (review-feedback promotion; lint over prose);
  `## Evals` (from real failures; 3 runs judge the worst).
- [ ] **Step 2: task-tiers.md** (≤120): `## The rule` (S: existing flow + existing verify
  command, single-file-ish · M: new flows or cross-module · L: parallel lanes/unknown
  scope/multi-session; doubt → higher); `## The ratchet` (upgrades only, never mid-task
  downgrades); `## Ceremony per tier` (table from work-lifecycle: S = one-line DoD +
  verify · M = lane + DoD-first + PLAN/PROGRESS + WIP=1 + fresh review + clean exit · L =
  four files + feature_list + init phase + staged windows); `## Lanes` (`work/<slug>/`,
  issue-key slugs, per-lane isolation rationale); `## WIP=1` (attention C/k; lines of code
  anti-correlate with completion).
- [ ] **Step 3:** Verify budgets + grep. Commit `docs(reference): verification and task-tier docs`.

### Task 5: carried reference + global layer

**Files:** Create `reference/design-md.md`, `reference/skills.md`, `global/CLAUDE.md`.

- [ ] **Step 1:** Copy old `reference/design-md.md` and `reference/skills.md`; grep each
  for the old repo name and rewrite those lines (e.g. "templates live in the
  Agent-Engineering repo"); keep everything else verbatim.
- [ ] **Step 2:** Copy old `global/CLAUDE.md`; replace the 3-line HTML comment with:
  `<!-- Canonical source: Agent-Engineering/global/CLAUDE.md. Applied to ~/.claude/CLAUDE.md by the workstation installer. -->`
  Body content unchanged.
- [ ] **Step 3:** Verify: skills.md/design-md.md old-name grep clean; global body diff
  vs old shows only the comment change. Commit `feat: carried reference docs and global layer content`.

### Task 6: templates v2

**Files:** Create under `templates/`: `repo/AGENTS.md.template`, `repo/CLAUDE.md.template`,
`repo/docs/README.md.template`, `repo/docs/adrs/ADR-template.md`,
`repo/docs/specs/SPEC-template.md`, `repo/DESIGN.md.template`,
`repo/work/SPEC.md.template`, `repo/work/PLAN.md.template`,
`repo/work/PROGRESS.md.template`, `repo/work/DECISIONS.md.template`,
`repo/feature_list.schema.json`, `repo/feature_list.example.json`,
`monorepo/app-AGENTS.md.template`, `monorepo/app-CLAUDE.md.template`,
`community/*` (ported minus CODE_OF_CONDUCT + MATRIX row edit).

- [ ] **Step 1: repo/AGENTS.md.template** — old CLAUDE.md.template's 4 blocks with the
  stamp + tier line inserted after the summary:

```markdown
# {{REPO_NAME}}

Standard: AE/2.0

{{REPO_SUMMARY}}
<!-- 2-3 lines: what + stack. Nothing the filesystem already says. -->

Tiers: S direct+verify · M lane+plan · L four files+feature list — doubt → higher.

## Commands

{{COMMANDS}}
<!-- build / test / run / lint. Only ones that matter. VERIFIED by running them. -->

## Gotchas

{{GOTCHAS}}
<!-- Only non-inferable facts. If an agent could discover it by reading code, delete it. -->

## Hard constraints

{{HARD_CONSTRAINTS}}
<!-- Only genuine safety rules. If violating it doesn't hurt, it doesn't belong here. -->

## Map

{{MAP}}
<!-- OPTIONAL, ≤8 lines, only non-obvious locations. Delete section if nothing qualifies. -->
```

- [ ] **Step 2: repo/CLAUDE.md.template** — exactly:

```markdown
@AGENTS.md
```

- [ ] **Step 3: work/ templates** — each starts with optional issue frontmatter:

`SPEC.md.template`:
```markdown
---
issue: {{ISSUE_KEY_OR_DELETE}}
---
# {{LANE_TITLE}} — spec

<!-- Owner-written. The agent never edits this file. -->
{{WHAT_DONE_LOOKS_LIKE}}
```
`PLAN.md.template`:
```markdown
# {{LANE_TITLE}} — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0". -->
- [ ] {{STEP}} — accept: `{{COMMAND}}`
```
`PROGRESS.md.template`:
```markdown
# {{LANE_TITLE}} — progress

## Done
## In progress
## Tried and failed
## Next
<!-- First read of every session. If it isn't here, it didn't happen. -->
```
`DECISIONS.md.template`:
```markdown
# {{LANE_TITLE}} — decisions

<!-- Append-only: date — choice — why. -->
- {{YYYY-MM-DD}} — {{CHOICE}} — {{WHY}}
```

- [ ] **Step 4: feature_list.schema.json** (draft-07, matches lint decision 5) +
  `feature_list.example.json` (two rows: one `passing` with evidence string, one
  `not_started` with `"evidence": null`).
- [ ] **Step 5: monorepo** — `app-AGENTS.md.template` = old app-CLAUDE template renamed
  (comment says "Per-app context, ≤30 lines... Root AGENTS.md covers everything shared");
  `app-CLAUDE.md.template` = `@AGENTS.md`.
- [ ] **Step 6: docs + community + DESIGN ports** — copy old `repo/docs/*` templates and
  `repo/DESIGN.md.template` verbatim (grep-fix old-name mentions); copy `community/*`
  EXCEPT `CODE_OF_CONDUCT.md.template`; edit MATRIX.md: delete the CODE_OF_CONDUCT row.
- [ ] **Step 7:** Old-name grep over `templates/` clean. Commit
  `feat: v2 repo templates - canonical AGENTS.md, work lanes, feature list schema`.

### Task 7: scripts (agent-lint + design generator)

**Files:** Create `scripts/agent-lint.mjs`, `scripts/design-md-gen.mjs`.

- [ ] **Step 1:** Copy `design-md-gen.mjs` verbatim from the old clone.
- [ ] **Step 2:** Write `agent-lint.mjs` starting from old `context-lint.mjs`, applying
  the locked decisions: header comment rewritten (v2, no old names); canonical flip
  (budgets/structure/cmd-drift on AGENTS.md; `--budget/--cap` apply to root AGENTS.md);
  pointer check; stamp checks; per-app rules; lane checks; feature-list schema +
  regression (spawnSync git); REMOVE `agents-size` + `per-app-agents`; keep everything in
  decision 6. Global-layer CLAUDE.md branch unchanged. Exit semantics unchanged.
- [ ] **Step 3:** Smoke: `node scripts/agent-lint.mjs . --ignore tests,templates,global`
  → expect PASS, 0 findings (root AGENTS.md has stamp; CLAUDE.md is pointer). Commit
  `feat: agent-lint - mechanical checks for the v2 standard`.

### Task 8: tests (fixtures + runners) and real Commands

**Files:** Create `tests/run-lint-tests.mjs`, `tests/run-gen-tests.mjs`, fixtures under
`tests/fixtures/`. Modify `AGENTS.md` (Commands section becomes real).

- [ ] **Step 1: Port fixtures** from old `tests/fixtures/`: `adapters/`, `read-order/`,
  `global-layer/`, `design-clean/`, `design-bad-a/`, `design-bad-b/`, `design-modes/`
  verbatim; port `run-gen-tests.mjs` + its fixture deps verbatim.
- [ ] **Step 2: Rework/new fixtures** (small, authored):
  - `bloated/` — AGENTS.md >100 lines w/ unknown H2s + a dead `npm run nope` →
    expect `budget-cap`,`cmd-drift`,`structure`.
  - `v2-clean/` — minimal compliant repo (stamped AGENTS.md ≤60, pointer CLAUDE.md,
    docs/README.md, one `work/demo-lane/` with PLAN+PROGRESS, valid feature_list.json) →
    the new "clean passes" case; forbid all v2 codes.
  - `v1-style/` — old-standard repo (60-line canonical CLAUDE.md, 10-line AGENTS.md
    stub, no stamp) → expect `pointer-shape`,`stamp-missing`.
  - `lanes-bad/` — `work/Bad_Slug/` with only PROGRESS.md + root PLAN.md → expect
    `lane-incomplete`,`lane-slug`,`lane-location`.
  - `feature-bad/` — stamped root + feature_list.json with bad state value and a
    `passing` row with `"evidence": null` → expect `feature-schema`.
- [ ] **Step 3:** Write `run-lint-tests.mjs` = old runner shape, cases: v2-clean (pass) ·
  bloated · adapters · read-order · v1-style · lanes-bad · feature-bad · global-layer ·
  4 design cases. Point lint binary at `scripts/agent-lint.mjs`.
- [ ] **Step 4:** Run `node tests/run-lint-tests.mjs` → all pass; `node tests/run-gen-tests.mjs`
  → all pass. Iterate lint/fixtures until green.
- [ ] **Step 5:** Update root `AGENTS.md` `## Commands` to the three real commands
  (self-lint incl. `--ignore tests,templates,global`, both test runners) and drop the
  "No build/test tooling yet" line. Re-run self-lint → PASS. Commit
  `feat: lint fixtures and self-tests; real verification commands`.

### Task 9: agent-audit (evals FIRST, then skill)

**Files:** Create `skills/agent-audit/evals/eval-0{1,2,3}.md`, then
`skills/agent-audit/SKILL.md`, `skills/agent-audit/references/checklist.md`.

- [ ] **Step 1: evals** (old audit evals as base, retargeted to v2):
  - eval-01 legacy repo report-only (port old eval-01; add expectations: flags missing
    stamp + non-pointer CLAUDE.md; still never flags ADRs; changes nothing).
  - eval-02 v1 repo drift: fixture = `tests/fixtures/v1-style`; expects lint run first,
    findings `stamp-missing`+`pointer-shape` surfaced, report recommends `agent-init`
    migration, score reflects mediums.
  - eval-03 self-audit (dogfooding): fixture = this repo; expects how-it-works coverage
    check (every top-level dir + every skill has a current chapter/section; flags lagging
    chapters), lint executed with the documented ignore list, PASS verdict reported.
  Commit `test(agent-audit): v2 evals`.
- [ ] **Step 2: SKILL.md** — old audit SKILL.md evolved: name `agent-audit`; description
  (3rd person, what+when: audits a repo against the agent-engineering standard — context
  files, lanes, feature lists, version stamp — reports score + fixes; triggers: after
  agent-init, drift checks, "audit this repo"). Workflow: inventory (adds: stamp, work/
  lanes, feature_list) → run `scripts/agent-lint.mjs` from this repo's clone → load
  checklist → judge → report (same format/scoring) → fixes only on request. Dogfooding
  section: when target == this repo, additionally check how-it-works coverage/freshness.
- [ ] **Step 3: references/checklist.md** — old checklist with: CLAUDE.md checks table
  retitled "AGENTS.md checks" (budgets updated, stamp row added); new "Pointer checks"
  table (root+nested CLAUDE.md = `@AGENTS.md` ≤3 lines; global exempt); new "Lane checks"
  table (lanes complete, no root four-files, slugs; PROGRESS current = judgment); new
  "Feature list checks" (schema, passing⇒evidence, regression); duplication table:
  AGENTS.md-scope row replaced by pointer rule; keep structure/skills/docs/design tables.
- [ ] **Step 4:** Self-check the three evals' expected behaviors against SKILL.md text
  (each expectation traceable to an instruction). Commit
  `feat(agent-audit): v2 audit skill and checklist`.

### Task 10: agent-init (evals FIRST, then skill)

**Files:** Create `skills/agent-init/evals/eval-0{1,2,3}.md`, then
`skills/agent-init/SKILL.md`, `skills/agent-init/references/migration.md`.

- [ ] **Step 1: evals**:
  - eval-01 fresh repo (port old init eval-01; expectations updated: instantiates
    AGENTS.md (stamped, 4-block, tier line) + pointer CLAUDE.md + docs seed; community
    per MATRIX (no CoC); runs agent-audit at the end).
  - eval-02 v1 → v2 migration: fixture = repo shaped like `tests/fixtures/v1-style` with
    real content in its CLAUDE.md; expects migration plan BEFORE mutation (clean tree
    required), content moved (gotchas/constraints preserved verbatim into AGENTS.md),
    CLAUDE.md becomes pointer, stamp added, audit re-run, before/after line counts.
  - eval-03 legacy → v2 (port old eval-03 concept: adapters/read-orders repo): expects
    the migration.md plan format, adapters deleted, rules dispositioned one-line each,
    per-app AGENTS.md ≤30 + pointer, nothing touched without approval.
  Commit `test(agent-init): v2 evals`.
- [ ] **Step 2: SKILL.md** — old init SKILL.md evolved: name `agent-init`; description
  (installs the agent-engineering standard (AE/2.0) in a repo or migrates v1/legacy
  setups; triggers: new repo setup, missing AGENTS.md, modernizing context). Template
  source path: the Agent-Engineering local clone. Workflow (6 steps kept) with v2 deltas:
  explore also detects v1 (canonical CLAUDE.md, no stamp); instantiate writes AGENTS.md +
  pointer + docs seed + stamp, offers work/ templates + feature_list only when a concrete
  L-tier effort exists (never speculative), DESIGN.md offer unchanged; final gate runs
  `agent-audit`. Judgment notes ported (budgets updated).
- [ ] **Step 3: references/migration.md** — old file + new first section `## v1 → v2`
  (table: canonical CLAUDE.md → AGENTS.md content move · AGENTS.md stub → replaced by
  canonical · add stamp · CLAUDE.md → pointer · per-app CLAUDE.md → per-app AGENTS.md +
  pointer; content never lost, plan cites each moved line's origin). Legacy table kept
  with destinations updated (CLAUDE.md blocks → AGENTS.md blocks).
- [ ] **Step 4:** Trace evals ↔ SKILL.md as in Task 9. Commit
  `feat(agent-init): v2 install/migration skill`.

### Task 11: how-it-works + root updates (same-change rule, consolidated)

**Files:** Modify `docs/how-it-works/README.md`, `architecture.md`,
`standard-lifecycle.md`, `work-lifecycle.md`, `README.md`, `AGENTS.md`, `CHANGELOG.md`.

- [ ] **Step 1:** architecture.md — directory sections + README table: P1 dirs → live
  (reference, templates, skills partial `P1 done · P2-P4 pending`, scripts, global,
  tests); six-layers phase tags for context/memory/harness/verification → live.
- [ ] **Step 2:** standard-lifecycle.md — flip "> Phase: P1" notes to live wording
  ("shipped in P1"); work-lifecycle.md — templates/schema notes → live, skills notes stay
  "> Phase: P2".
- [ ] **Step 3:** how-it-works/README.md table "Fills in" column: architecture P0-P1;
  standard-lifecycle "P1 (live)"; work-lifecycle "P1 templates · P2 skills".
- [ ] **Step 4:** Root README Status → P1; AGENTS.md Status/Map updated (dirs exist);
  CHANGELOG: `## AE/2.0 — 2026-08-16` entry (standard installable: reference, templates,
  init/audit/lint) replacing Unreleased.
- [ ] **Step 5:** Final self-lint + both test runners green. Commit
  `docs: how-it-works and root files reflect the shipped v2 core`.

### Task 12: PR + rebase merge

- [ ] **Step 1:** `git push -u origin p1/standard-core`; `gh pr create --title "P1: standard v2 core" --body` (What/Why/Verification per template, listing the three green commands).
- [ ] **Step 2:** `gh pr merge --rebase --delete-branch`; `git checkout main && git pull`.
  Verify `gh pr view --json state` → MERGED; local `git log --oneline -3` shows tasks.

### Task 13: machine integration (junctions + workstation)

**Files:** Modify `workstation/claude/install.ps1` (line ~229 `$skillSources`),
`workstation/claude/CLAUDE.md` (sync copy), `workstation/CLAUDE.md` (gotcha line),
`workstation/dev/repos/mine.md` (repo row). Machine: `~/.claude/skills` junctions.

- [ ] **Step 1:** workstation branch `chore/agent-engineering-swap`: in `install.ps1`
  replace the skills source `mine\Context-Engineering\skills` →
  `mine\Agent-Engineering\skills`; sync `claude/CLAUDE.md` byte-identical to new
  `global/CLAUDE.md`; update the workstation root CLAUDE.md gotcha ("canonical source is
  `Agent-Engineering/global/CLAUDE.md`... junction-linked from the `Agent-Engineering`
  and `skills` repos"); update `dev/repos/mine.md` row (name + URL). Old-name grep over
  changed files clean (except historical docs).
- [ ] **Step 2:** Run `pwsh workstation/tests/run.ps1` → green; `pwsh workstation/claude/install.ps1 -WhatIfOnly`
  → shows would-link agent-init/agent-audit, no destructive surprises.
- [ ] **Step 3:** Commit, push, PR, rebase-merge (workstation follows same house flow).
- [ ] **Step 4:** Apply: `pwsh workstation/claude/install.ps1` (no -Secrets) → junctions
  agent-init/agent-audit created. Remove stale ones:
  `Remove-Item ~\.claude\skills\context-init, ~\.claude\skills\context-audit -Force`
  (junction removal only touches the link). Verify:
  `Get-Item ~\.claude\skills\agent-* | Select Name,LinkType,Target` → 2 junctions into
  Agent-Engineering; context-* gone; tracing-root-causes/reviewing-plans untouched.

### Task 14: acceptance (the spec's P1 gates)

- [ ] **Step 1: fresh-repo gate.** Scratch repo under the session scratchpad (`git init`
  + package.json with one script + src file). Follow `skills/agent-init/SKILL.md` as
  written (self-exercise), instantiate, then run the audit per `agent-audit/SKILL.md` +
  lint. Expect: stamped AGENTS.md ≤60, pointer, docs seed; lint PASS; audit score 10.
- [ ] **Step 2: v1-migration gate.** Copy `tests/fixtures/v1-style` to scratchpad, add a
  real gotcha line to its CLAUDE.md, follow agent-init's migration path: plan produced
  first, then applied; verify content moved verbatim, lint PASS after.
- [ ] **Step 3: dogfooding gate.** agent-audit self-run on Agent-Engineering (eval-03
  procedure) → reported PASS incl. how-it-works coverage.
- [ ] **Step 4:** Report results in chat with command outputs.

### Task 15: deletion ritual (HARD HUMAN GATE)

- [ ] **Step 1:** Verify porting complete: old-clone inventory vs new repo — every
  reference/template/skill/script/test concept either ported, reworked, or explicitly
  not-ported per spec (examples, CoC). Present the inventory to mateo.
- [ ] **Step 2:** **STOP.** Ask mateo to confirm, explicitly, the irreversible deletion of
  `github.com/bygama/Context-Engineering` (stars/issues/history die; examples die; the
  local clone dies). Proceed ONLY on explicit yes.
- [ ] **Step 3:** `gh auth refresh -h github.com -s delete_repo` (if scope missing) →
  `gh repo delete bygama/Context-Engineering --yes` → verify 404 via `gh repo view`.
- [ ] **Step 4:** Check old clone for uncommitted/unpushed work (`git status`,
  `git log --branches --not --remotes`) — spec branch is expected unpushed-but-ported;
  then `Remove-Item -Recurse -Force C:\Briar\repos\mine\Context-Engineering`.
- [ ] **Step 5:** Memories: rewrite `context-engineering-repo-status.md` to a tombstone
  (deleted 2026-08-16, evolved into [[agent-engineering-repo]]) or fold into the AE
  memory and delete the file + index line; update `agent-engineering-repo.md` (P1 done,
  junctions live, next P2) + MEMORY.md. Final chat report.
