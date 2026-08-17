# SPEC: Agent-Engineering System (v2 of the standard)

Date: 2026-08-16
Status: Approved (design validated interactively with mateo; Linear addendum included)

## Purpose

Evolve the context-engineering standard into a six-layer **agent-engineering standard** —
context, memory, harness, loop, graph, with reducer/MCP as cross-cutting concerns — and ship
it as a new source-of-truth repo, **`Agent-Engineering`**, that succeeds
`Context-Engineering`. The new repo starts with a fresh git history and a folder
architecture designed from scratch for the six layers. The standard is runtime-neutral and
model-agnostic (Claude orchestrating opencode/codex/grok/dsh workers, or any other
combination), Orca-optimized but Orca-optional, and treats Linear as the work-intake plane
without ever requiring it.

Fresh history does not mean discarded content: the context layer remains valid as layer 1
of 6, and the old repo's proven *patterns* (reference docs with source+date headers,
templates with placeholders, skills-with-evals, mechanical lint + fixtures, dogfooding
gate) carry over — but each piece of content is ported deliberately into the new
architecture in the phase that owns it, never bulk-copied. `Context-Engineering` *evolves
into* this repo and then disappears: once porting completes it is deleted, and the new repo
never references it anywhere.

## Grounding sources

Public sources cited by `reference/` docs (the private article library at
`Desktop\Articles` — including its `_distilled/` synthesis — is working material only;
the public repo cites URLs, never local paths):

- The new rules of context engineering for Claude 5 generation models (claude.com/blog, 2026-07-24)
- OpenAI: Harness engineering — leveraging Codex in an agent-first world (openai.com)
- Anthropic: Effective harnesses for long-running agents; Harness design for long-running apps;
  Building effective agents (anthropic.com/engineering)
- walkinglabs: Learn Harness Engineering course (github.com/walkinglabs/learn-harness-engineering)
- Addy Osmani: Loop Engineering; The Orchestration Tax (addyosmani.com)
- Practitioner syntheses on loop/graph/reducer/memory engineering (X threads; treated as
  directional, numbers verified against primary sources before entering reference/)

New principles adopted alongside the existing ones (six shifts, attention budget, JIT
retrieval, "Claude is already smart" test): evidence over confidence; maker ≠ checker;
repo as system of record; WIP=1; ceremony scales with task tier; anything broken twice
becomes a check.

## Decisions (fixed)

1. **New repo, fresh history, new architecture — the old repo disappears.**
   `Agent-Engineering` (github.com/bygama) starts from `git init`, no history imported.
   Its folder architecture is designed for the six layers first; content from
   `Context-Engineering` is ported selectively into that structure, phase by phase. This
   spec is ported in P0 as the founding document. The old repo is not archived and not
   linked: it evolves into this one, so once porting completes (P1 exit) it is **deleted
   from GitHub** (destructive and irreversible — mateo confirms the deletion explicitly at
   that moment). The new repo carries zero references to it; its README tells its own
   story from scratch. Repo settings per house convention: rebase-only PR merges,
   auto-delete branches.
2. **AGENTS.md is the canonical entry file.** CLAUDE.md becomes a ≤3-line pointer using the
   `@AGENTS.md` import. This inverts the v1 arrangement and is what makes every
   AGENTS.md-reading runner (codex, opencode, grok CLI, dsh) compatible for free. The v1
   ban on per-tool adapter files stands — one canonical file plus one pointer, zero
   duplicated contracts.
3. **Versioned standard.** Installed repos carry a greppable stamp line (`Standard: AE/2.0`)
   in AGENTS.md. The repo keeps `CHANGELOG.md` (semver; v2.0 starts here, v1 = the
   context-only standard). `agent-audit` detects stamp drift and offers migration;
   `agent-init` performs it (migration machinery ported from context-init).
   *Amended by [ADR-003](../adrs/ADR-003-semantic-versioning.md): full SemVer three-part
   stamps (`Standard: AE/MAJOR.MINOR.PATCH`); the AE/2.x era is renumbered as the 0.x
   initial-development line and 1.0.0 declares the standard stable (2026-08-17).*
4. **Skill renames for scope honesty.** `context-init` → `agent-init`, `context-audit` →
   `agent-audit`. `designing-consistently` and `extracting-design-md` carry over unchanged.
   One junction event, in P1: when the evolved skills land in the new repo, the old
   junctions are removed and the new ones installed atomically, and the `workstation`
   installer reference is updated in the same change. Until then the old local clone stays
   in place so the current skills keep working (GitHub deletion does not touch local
   clones); the clone is retired only after P1 is accepted and the deletion is done.
   *Amended 2026-08-17 (v1.3.0, owner direction): a second rename generation —
   `agent-init` → `ae-init`, `agent-audit` → `ae-audit`; the executor shipped as
   `relay` (v1.1.0) is `work-run` since v1.3.0. Names in this decision's text are the
   record of the first generation (CHANGELOG 1.3.0).*
5. **Model-agnosticism lives in artifacts, not adapters.** Work state is files (four files +
   feature list), so any file-reading worker can take over a lane regardless of model or
   harness. `reference/runners.md` documents per-runner entry files, skill support, and
   spawn commands (including the Orca claude/pegasuz account cascade rule). Skills are
   readable markdown: runners without SKILL.md support are pointed at the file and follow
   it as a procedure.
6. **deepseek-harness: zero coupling.** dsh is a runtime in developer preview with announced
   breaking changes. It reads AGENTS.md, so standard-compliant repos are already
   compatible. It appears only in `reference/runners.md` and as the P4 portability-proof
   target (a non-Claude runner executes one lane end-to-end). No plugins, no dsh-specific
   files.
7. **Task tiers S/M/L with a one-way ratchet.** Ceremony scales with tier; discovery of
   hidden complexity upgrades the tier mid-task, never downgrades. Per-task artifacts live
   in `work/<slug>/` (one folder per lane) so parallel worktrees never collide on a root
   PROGRESS.md. The four files are per-effort artifacts, never permanent repo furniture.
   *Amended by [ADR-002](../adrs/ADR-002-tier-xl.md): the scale is S/M/L/XL — XL begins
   when a correct plan forces ≥2 independent parallel lanes. Further amended by
   [ADR-004](../adrs/ADR-004-relay.md): a lane executes step-by-step via the executor
   skill (shipped as `relay` in v1.1.0, named `work-run` since v1.3.0), recommended
   default at L; generalized by [ADR-005](../adrs/ADR-005-artifact-phases.md):
   artifact-producing phases (plan → run → verify → close) are AE-owned.*
8. **Linear is the intake/workflow plane; the repo is the execution plane.** They hold
   different states, so there is no double bookkeeping: Linear owns workflow state
   (Todo/In Progress/In Review/Done); the repo owns verification state
   (`not_started/active/blocked/passing` + evidence). Gate rule: an issue may move to Done
   only when the repo side is `passing`. Direction rules: intent/priority flow
   Linear → repo (triage reads the tracker); execution truth flows repo → Linear (status
   and comments update only after verification passes). The Orca CLI is the primary
   connector (`orca worktree create --linear-issue`, `orca linear issue|list|status set|
   comment add`); fallback without Orca is the official Linear MCP server or plain API +
   branch-key convention. The core standard never requires a tracker: the `issue:` field
   and key-in-slug convention are optional affordances.
   *Amended by [ADR-001](../adrs/ADR-001-orca-is-the-executor.md): the MCP/API fallback
   rung is gone — without Orca, tracker writes are emitted for the operator (no-Orca
   contract).*
9. **Orca is the preferred executor, never a dependency.** `reference/orca.md` maps standard
   concepts to Orca (lane → child worktree; long process → terminal tab; DAG/gates →
   orchestration; loops → automations) and names a no-Orca fallback for every mapping
   (git worktree, cron, `/loop`, `/schedule`).
   *Amended by [ADR-001](../adrs/ADR-001-orca-is-the-executor.md): Orca is the executor;
   the per-mapping fallbacks are replaced by the no-Orca contract — everything that is a
   file still happens, Orca-only steps are declared NOT done.*
10. **Quality gates carry over.** Every skill ships ≥3 evals written before skill content.
    Dogfooding: the repo must pass its own `agent-audit` and `agent-lint` (with the
    documented fixture exclusions).
11. **`docs/how-it-works/` — the repo's living self-documentation.** A docs folder, for
    this repo only (never installed in consumers), that explains how the entire repo
    works end to end: rich prose, Mermaid diagrams for every flow (install, audit,
    update/migration, work lifecycle S/M/L, lane + Linear flow, loop/fan-out execution),
    and the reasoning behind the architecture. It is deliberately **exempt from the
    minimalism budget** — it is just-in-time human documentation discovered on demand,
    not always-loaded agent context, so the attention-budget rules do not apply to it.
    What does apply is the anti-decay rule, stated as a hard constraint in this repo's
    AGENTS.md: **any change that alters structure or behavior must update the affected
    how-it-works doc in the same change** — a change is not complete without it. The
    dogfooding run of `agent-audit` on this repo additionally checks how-it-works
    coverage (every top-level directory and every skill has a current section) and flags
    drift. Born in P0 with the foundation chapters; every later phase extends it as part
    of that phase's definition of done.

## The standard v2 (what a consuming repo carries)

Always installed (as minimal as v1):

- `AGENTS.md` ≤60 lines: what the repo is, verified commands, real gotchas, genuine hard
  constraints, optional map, tier one-liner, `Standard: AE/2.0` stamp.
- `CLAUDE.md` pointer (≤3 lines, `@AGENTS.md`).
- `docs/` tree with ADRs and rich-reference specs, one-line-per-area README.

Per task, on demand — the tier decides the ceremony:

| Tier | Example | Ceremony | Linear mapping (optional) |
|---|---|---|---|
| S | one-file front fix | one-line DoD + run the verify command; no files | the issue is the artifact |
| M | a feature | DoD written first; `work/<slug>/` with PLAN + PROGRESS (+ DECISIONS when choices are made; SPEC when the prompt isn't the spec); WIP=1; fresh-context review; clean-state exit | 1 issue ↔ 1 lane; `issue:` in frontmatter; key in branch name |
| L | build a system | full four files + `feature_list.json` (schema-validated; states gated by verification evidence, `passing` irreversible) + init phase + staged windows; fan-out with worktree isolation + reducer when parallel | project/parent issue ↔ feature list; each row references a sub-issue key |

Triage rule (lives in `reference/task-tiers.md`): S requires an existing flow to change and
an existing verify command; anything creating new flows or crossing modules starts at M;
anything with parallel lanes, unknown scope, or multi-session horizon is L. When in doubt,
take the higher tier; mid-task discoveries ratchet upward only.

## Architecture: the Agent-Engineering repo (target state; phase in parentheses)

```
Agent-Engineering/
├── AGENTS.md                    # canonical; dogfooding: passes its own audit (P0 pointer flip, P1 content)
├── CLAUDE.md                    # ≤3-line pointer (P0)
├── README.md, CHANGELOG.md      # identity + versioned standard (P0/P1)
├── reference/                   # the standard: one doc per layer, ≤120 lines, source+date
│   ├── principles.md (P1)       ├── loops.md (P3)
│   ├── context.md (P1)          ├── graphs-and-reducers.md (P4)
│   ├── memory.md (P1)           ├── task-tiers.md (P1)
│   ├── harness.md (P1)          ├── tracker.md (P3)
│   ├── verification.md (P1)     ├── runners.md (P4)
│   ├── orca.md (P3)             └── design-md.md, skills.md (carried)
├── templates/
│   ├── repo/                    # AGENTS.md canonical {{...}} + CLAUDE.md pointer + docs/ (P1)
│   │   ├── work/                # SPEC/PLAN/PROGRESS/DECISIONS templates (P1)
│   │   └── feature_list.schema.json + example (P1)
│   ├── monorepo/, community/    # carried
├── skills/
│   ├── agent-init/ (P1)         # installs v2; migrates v1 and legacy; asks only non-inferable
│   ├── agent-audit/ (P1)        # full judgment review + version drift + migration offer
│   ├── work-verify/ (P2)        # three-layer DoD verification; maker≠checker; evidence
│   ├── work-handoff/ (P2)       # clean-state exit; PROGRESS/feature_list update; Linear status
│   ├── loop-setup/ (P3)         # stopping rule, gate, budget, state file, schedule/triggers
│   ├── fan-out/ (P4)            # lanes + worktrees + reducer contract + anchors
│   └── designing-consistently/, extracting-design-md/  # carried
├── scripts/
│   ├── agent-lint.mjs (P1)      # evolves context-lint (see lint v2)
│   └── design-md-gen.mjs        # carried
├── global/                      # canonical ~/.claude content (ported + updated in P1)
├── tests/                       # lint fixtures + runners (P1, extended each phase)
└── docs/
    ├── how-it-works/            # living self-documentation, no expense spared (P0, grows every phase)
    │   ├── README.md            # map of the chapters
    │   ├── architecture.md      # the tree, what each dir answers, Mermaid overview
    │   ├── standard-lifecycle.md# install → audit → update/migrate flows, versioning
    │   ├── work-lifecycle.md    # tiers S/M/L, lanes, four files, feature list, Linear plane
    │   └── execution.md         # loops, fan-out/reducer, runners, Orca mapping (fills in P3-P4)
    ├── specs/                   # this spec ported here in P0 as founding doc
    ├── adrs/                    # decision records
    └── plans/                   # dated implementation plans
```

## Skills (behavior contracts)

- **agent-init (P1).** Explores the repo, asks only what it cannot infer (profile, gotchas,
  tier defaults), verifies commands by running them, instantiates the v2 skeleton, stamps
  the version. Detects v1 installs and legacy architectures (adapters, read orders) and
  produces a migration plan before touching anything.
- **agent-audit (P1).** Judgment review of every installed layer against reference/, plus:
  stamp drift check, work/ coherence (no stale lanes), feature_list schema + gating sanity,
  pointer CLAUDE.md shape. Reports score + concrete fixes; applies fixes only when asked.
- **work-verify (P2).** Runs the tier's DoD: layer 1 static, layer 2 tests + app starts,
  layer 3 end-to-end flow for cross-component changes. Fresh-context review for M+.
  Refuses "done" without evidence; writes evidence into PROGRESS/feature_list.
- **work-handoff (P2).** Clean-state checklist (build, tests, progress updated, no debris,
  startup path works), commit, and — when the lane is Linear-linked — `orca linear
  status set` + `comment add` with the evidence summary (or MCP/API fallback).
- **loop-setup (P3).** Scaffolds a loop: stopping rule sentence, gate command, budget caps,
  state file, trigger (`/loop`, `/schedule`, Orca automation, on-new-issue via
  `orca linear list` triage). Refuses tasks that fail the loop filter (repeats weekly,
  automated check exists, budget absorbs waste, real tools).
- **fan-out (P4).** Plans lanes from a feature list or issue set, answers the three
  pre-fan-out questions (where does each work / how do results merge / who resolves
  disagreement), creates isolated worktrees (Orca or git), installs the reducer contract
  between workers and synthesis, names the anchors.

## Lint v2 (mechanical subset; judgment stays in agent-audit)

Carried from v1: budgets (entry ≤60 lines), adapter/read-order detection, broken links,
command drift, naming. New: CLAUDE.md pointer shape; stamp present and parseable;
`work/<slug>/` coherence (PLAN+PROGRESS present in active lanes, no orphan lanes);
`feature_list.json` schema validation + no state regressions from `passing`; issue-key slug
convention when `issue:` present. Self-test fixtures extend `tests/`.

## Versioning and updates

- Stamp: `Standard: AE/<major>.<minor>` in installed AGENTS.md.
- CHANGELOG.md in this repo; bump MAJOR/MINOR when templates or checks change, docs-only
  refreshes bump nothing (reference/ files carry their own source+date headers).
- New knowledge flow: article/guidance appears → reference/ doc updated with source+date →
  if templates/checks changed, bump + migration note in `skills/agent-init/references/
  migration.md` → consuming repos learn at next `agent-audit`.

## Phases and acceptance

- **P0 — foundation.** Fresh `git init` at `C:\Briar\repos\mine\Agent-Engineering`; root
  files: canonical AGENTS.md + pointer CLAUDE.md (the flip applied to the repo itself),
  README (identity + the architecture explained), CHANGELOG stub, community basics
  (LICENSE, SECURITY, .github — no CODE_OF_CONDUCT, dropped by decision), `docs/specs/`
  with this spec ported as
  founding doc, and `docs/how-it-works/` founding chapters (README, architecture,
  standard-lifecycle, work-lifecycle — with diagrams; execution.md waits for P3).
  Directories materialize in the phase that owns them — no empty scaffolding. GitHub repo
  created public with house conventions; memories updated. Old repo untouched in P0;
  junctions untouched (skills keep working from the old local clone). Accept: new repo
  public and conventions verified, spec + README + how-it-works present, current skills
  still fire.
- **P1 — standard v2 core.** reference/ layer docs (principles refresh, context, memory,
  harness, verification, task-tiers — ported and rewritten into the new architecture) +
  templates v2 + agent-init/agent-audit/agent-lint + tests/fixtures + global/ ported.
  Junction swap (old names out, new names in, atomically) + workstation installer update.
  how-it-works updated (standard-lifecycle + work-lifecycle become fully real). Exit
  ritual: porting complete → mateo explicitly confirms → old GitHub repo deleted → local
  clone retired. Evals first. Accept: a fresh repo can `agent-init` to v2 and pass
  `agent-audit`; a v1 repo migrates cleanly; dogfooding passes (including how-it-works
  coverage); the old repo no longer exists anywhere referenced.
- **P2 — usage skills.** work-verify + work-handoff. Accept: an M-tier task runs end-to-end
  under the standard with evidence-gated completion and clean handoff (Linear-linked case
  included).
- **P3 — loops + Orca + tracker.** reference/loops.md, orca.md, tracker.md; loop-setup.
  Accept: one real loop productionized (issue-triage candidate) with stopping rule, gate,
  budget, and state file.
- **P4 — graphs/reducers + portability.** reference/graphs-and-reducers.md, runners.md;
  fan-out. Accept: one real fan-out with reducer between workers and synthesis; one lane
  executed end-to-end by a non-Claude runner (opencode or dsh) following the artifacts.
- **P5 — evals + hardening.** Failure-derived eval tasks for the skills; migration tooling
  polish. Accept: eval suite runs; a deliberately broken fixture repo is fully diagnosed.

## Testing

Fixtures: v2-clean, v1-migratable, legacy-adapters (carried), bloated (carried), work-lane
coherent/incoherent, feature_list valid/invalid, tier-ratchet case. Lint self-tests extend
`tests/run-lint-tests.mjs`. Every skill: ≥3 evals, written before content. Dogfooding: the
repo passes its own audit and lint at every phase boundary.

## Non-goals

- No per-tool adapter files (CODEX.md/GEMINI.md-style) — the ADR stands.
- No hard dependency on Orca, Linear, or any runtime; every integration names its fallback.
- No dsh plugins or coupling to preview APIs.
- No permanent four-files furniture in consuming repos; work/ artifacts are per-effort.
- No graph execution engine — the standard ships contracts and templates, not a runtime.
- No duplication of the private Articles corpus in the public repo (URLs only).
- No `examples/` yet: worked examples land only after the structure has proven itself in
  real repos (revisit at P5). The old `nextjs-ecommerce` example is not ported — if P5
  decides examples are worth it, they get built fresh against the v2 structure.
- No references to `Context-Engineering` anywhere in the new repo — it evolves into this
  one and is deleted at P1 exit; the new repo's story starts at v2.
