# The standard's lifecycle

A consuming repo moves through four moments: it gets **installed**, it hosts
**work**, it gets **audited**, and eventually it gets **updated** when the
standard itself moves. The whole cycle hangs on one greppable line in the
repo's `AGENTS.md`:

```
Standard: AE/<major>.<minor>.<patch>
```

That stamp is the contract between a repo and this one. It says which
version of the templates and checks the repo was built against, it is what
the audit compares against the current version, and it is the only
memory the system needs about "when was this repo last touched by the
standard".

> Live since AE/2.0: `ae-init`, `ae-audit`, and `agent-lint` implement every flow in this chapter.

Since AE/1.2.0, `using-ae` is the entry skill that recognizes an
AE-standard repo and routes an arriving task to whichever flow in this
chapter owns it — install, audit, or work — before any action. The
global layer wires it as a SessionStart hook, but that wiring is
optional plumbing, not a dependency: the skill still triggers by its
own description with no hook at all (detail: `global/hooks/README.md`,
`skills/using-ae/SKILL.md`).

Ten skills carry the whole surface this doc describes: the work chain
now opens with `shaping` (the design dialogue, ADR-006) ahead of
`work-plan`, `work-run`, `work-verify`, and `work-handoff`, with
`ae-init`, `ae-audit`, `loop-setup`, `fan-out`, and `using-ae` itself
completing the set (README carries the full table and chain diagram).

## What a consuming repo carries

Always, and nothing more:

- **`AGENTS.md`** — canonical, ≤60 lines: what the repo is, verified
  commands, real gotchas, genuine hard constraints, an optional map, the
  tier one-liner, and the version stamp. Canonical means every agent — any
  model, any runtime — reads this file; nothing tool-specific forks it.
- **`CLAUDE.md`** — a pointer, ≤3 lines (`@AGENTS.md`), so Claude Code
  ingests the canonical file through its import mechanism. One canonical
  file plus one pointer; per-tool adapter files stay banned.
- **`docs/`** — decision records and rich-reference specs, indexed by a
  one-line-per-area README.

Per task — never as permanent furniture — a lane folder `work/<slug>/` with
the four files, and for the largest tier a `feature_list.json`. Those belong
to the [work lifecycle](work-lifecycle.md).

## Install (`ae-init`)

Installation is a conversation with the repo first and the human second: the
skill explores before it asks, asks only what it cannot infer, and proves
the commands it writes down by running them. An `AGENTS.md` that lists an
unverified test command is worse than none — it teaches every future agent a
lie.

```mermaid
flowchart TD
    A[explore repo] --> B{existing context files?}
    B -->|none| C[ask only non-inferable:<br/>profile · gotchas · tier defaults]
    B -->|v1 or legacy| D[produce migration plan<br/>before touching anything]
    D --> C
    C --> E[verify commands by running them]
    E --> F[instantiate templates<br/>+ stamp the current version]
    F --> G[self-check: agent-lint passes]
```

What to see: the branch at `B` is the only judgment call the diagram
makes — everything else is sequence. A repo with no existing context
files (`B -->|none|`) goes straight to asking; a v1 or legacy repo
detours through `D` first, so a migration plan exists and is shown
*before* anything is touched, then rejoins the same path at `C`. The
diagram's close is a gate, not a formality: `G` re-runs the mechanical
lint the skill itself will be judged against, so an install that fails
its own check never gets called done.

Two arrival states get special handling:

- **A v1 repo** (the previous, context-only standard): the skill recognizes
  the old shape and upgrades it — flipping the canonical file, adding the
  stamp, installing the tier one-liner — without losing repo-specific
  content (gotchas, constraints, docs).
- **A legacy repo** (per-tool adapters, mandatory read orders, rule lists):
  the skill writes a migration plan and shows it before touching anything.
  Migration is a proposal, never an ambush.

Templates are instantiated, never copied verbatim: `{{PLACEHOLDER}}` markers
are filled from what the exploration found and what the human confirmed.

## Audit (`ae-audit`)

The audit is the judgment half of enforcement; `agent-lint` is the
mechanical half and runs inside it. The lint counts (budgets, stamp present
and parseable, pointer shape, broken links, command drift, lane coherence,
feature-list schema and gating sanity); the audit judges (is the entry file
honest? do the hard constraints deserve to be hard? has knowledge decayed?).
The output is a score with concrete fixes, and fixes are applied only when
asked — an audit that silently rewrites your repo is an audit nobody runs
twice.

Run against this repo itself (the dogfooding gate), the audit additionally
checks that `docs/how-it-works/` covers every top-level directory and every
skill, and flags chapters that lag behind structural changes.

## Update and migration

The standard moves when the world does: new guidance gets published, an
article changes our mind, a check earns its keep or stops earning it. The
flow keeps consuming repos honest without making them chase every edit:

```mermaid
flowchart LR
    G[new guidance published] --> R[reference/ updated<br/>source + date header]
    R --> Q{templates or checks changed?}
    Q -->|no| N[no bump - docs refresh]
    Q -->|yes| V[bump AE version + changelog<br/>+ migration note]
    V --> S[repo stamp now behind] --> AU[next ae-audit flags drift] --> M[ae-init migrates]
```

What to see: `Q` is the only gate in the flow, and it decides whether
this round of guidance costs a consuming repo anything at all — a
docs-only refresh (`Q -->|no|`) never touches a stamp, so `N` is a dead
end with no consequence downstream. Only the `yes` branch reaches `S`,
and from there the asymmetry is the point: **repos never poll**. `AU`
and `M` fire on someone else's schedule — the next audit, the next
migration — not the moment `V` bumps the version. A consuming repo
learns it is behind the moment someone audits it, and catches up the
moment someone runs the migration. Between those moments it keeps
working on the version it was built against — stamps make drift
visible, not fatal.

The lifecycle also runs backward — **the standard improves from the
edges in**. An audit in a consuming repo labels standard-fault findings
`upstream` (excluded from the repo's score) and proposes filing them:
into the standard's tracker on machines that carry its workspace, or as
a public GitHub issue for anyone else. The triage loop sweeps those in,
the fix ships through the normal flow, the version bumps if templates
or checks changed — and the reporter receives their own fix through the
next migration.

## Versioning rules

- Stamp format: `Standard: AE/MAJOR.MINOR.PATCH` — one line, greppable,
  in the installed `AGENTS.md` (SemVer-shaped since ADR-003; two-part
  stamps from the 0.x era stay valid shapes and read as behind, not
  malformed).
- Semantics (the criterion, spelled out in the CHANGELOG header;
  milestone-weighted since ADR-007): breaking shape changes bump MAJOR;
  MINOR is an owner-designated milestone package; everything else
  backward compatible — fixes, errata, and incremental capability —
  bumps PATCH. Template or check changes always land in a bump (related
  sets may accumulate unreleased and ship together, owner-paced);
  docs-only refreshes never bump, because `reference/` files carry
  their own source+date headers.
- The line's history: 0.1.0 was the predecessor generation (canonical
  CLAUDE.md, no stamps — the retired Context-Engineering repo); the
  AE/2.x era is renumbered as the 0.x initial-development line; 1.0.0
  declared the standard stable on 2026-08-17 (ADR-003; former names kept
  per CHANGELOG entry).
- A bump restamps this repo's root `AGENTS.md` in the same change and
  tags the release (`vMAJOR.MINOR.PATCH`); the README badge reads the
  latest tag by itself, so it can never drift (the rule lives in the
  `CHANGELOG.md` header). `examples/` stamps are authoring-time
  snapshots — never restamped.
- History: `CHANGELOG.md` at this repo's root records every bump and what
  it means for consumers.
- The ritual is operationalized by the repo-local `.claude/skills/release`
  skill — sizing, entry, note, restamps, gates, tag, one procedure.
- Migration notes: `skills/ae-init/references/migration.md` records, per
  version step, exactly what changes in an installed repo — that file is what
  `ae-init` executes when the audit says "behind".
