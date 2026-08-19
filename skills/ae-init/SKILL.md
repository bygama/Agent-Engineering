---
name: ae-init
description: Installs the agent-engineering standard in a repository — canonical AGENTS.md, pointer CLAUDE.md, docs tree — or migrates v1 (canonical-CLAUDE.md) and legacy (adapters, read orders) setups to it. Use when setting up agent context for a new or existing repo, when a repo lacks AGENTS.md or a version stamp, or when modernizing an outdated context setup.
---

# AE init

Instantiates the per-repo skeleton from the Agent-Engineering templates,
adapted to the target repo. Ask only what cannot be inferred; verify before
writing; never touch a v1 or legacy repo without an approved migration plan.

Templates live in the Agent-Engineering repo: `templates/repo/`,
`templates/monorepo/`, `templates/community/` — resolve that repo by
`skills/using-ae` §Reference paths.

## Workflow

Copy this checklist and tick items off:

```
Init progress:
- [ ] 1. Explore the target repo
- [ ] 2. Detect profile (ask only the gaps)
- [ ] 3. Gotcha interview
- [ ] 4. Verify commands by running them
- [ ] 5. Migration plan gate (v1 and legacy repos only)
- [ ] 6. Instantiate, audit, report
```

**1. Explore.** Stack and tooling (lockfiles, manifests, scripts), layout
(single app vs monorepo — multiple app/package manifests ⇒ monorepo),
existing context files and their shape:

- **fresh** — no AGENTS.md/CLAUDE.md;
- **v2** — stamped canonical AGENTS.md + pointer CLAUDE.md (check the stamp
  version against this repo's CHANGELOG);
- **v1** — canonical CLAUDE.md + entry-stub AGENTS.md, no stamp;
- **legacy** — per-tool adapters, read orders, contract-style AGENTS.md.

Also: `docs/`, repo skills, `work/` lanes, README — including the language the
repo's human docs are written in (README, site copy, SEO metadata).

Count the repo's **domains** while mapping the layout: every `apps/*` entry
plus every top-level directory that carries a manifest of its own. A directory
without one (`scripts/`, `docs/`) is not a domain, however many files it holds.
The count decides the shape of step 3's tracker question — 3 or more opens the
monorepo path.

**2. Detect profile.** personal / public OSS / team. Infer from the query and
repo signals (remote, contributors, license) when possible; otherwise ask
ONCE. Community files follow `templates/community/MATRIX.md` exactly — public
OSS also picks a license (MIT default).

**3. Gotcha interview.** Ask the user for the 3-5 real gotchas and hard
constraints — owner knowledge is not inferable. Always ask one explicitly:
does anything outside the repo depend on it (published package, API, sibling
repos), or is it free to break compatibility? Neither answer is inferable and
it governs every later edit. Accept "none". Never invent filler to make
blocks look complete; empty blocks are valid.

Never ask about the artifacts language, and never take it from the language
of this conversation: agent context and technical docs are always ENGLISH by
the standard's convention. When step 1 found the repo's human docs in another
language, add the split to the gotchas without asking: agent context and
technical docs English; site content/SEO/README in the project's own
language — never fix one side into the other. Language enters the interview
only if the owner raises it.

Unlike the language default above, the tracker workspace IS a real question:
ask it once, settled for the repo, but only when a tracker is in play — step
1's exploration or the workspace's own signals show Linear connected. Does
this repo track in Linear, and if so: workspace, team key, project? Accept
"none"; the tracker stays optional. Never infer the answer from this
session's live binding — the binding is exactly what can be wrong, which is
the reason the question exists (`reference/tracker.md`). Under 3 domains that
is the whole question: one turn, no proposal, nothing new to answer.

At 3 or more (step 1's count), the same single question carries a PRE-BUILT
recommendation instead of interviewing the structure domain by domain: an
initiative named after the repo at the root, one project per domain named
from its folder — title-cased, `apps/api` → `Api`, never a description of
what the folder does — and no project on the root line. That is the shape
`reference/tracker.md` ("Which workspace — the repo declares, tools obey")
defines for a deep monorepo; cite it, never restate it. Workspace and team
key stay the owner's to supply in that same answer: no layout yields them,
and the live binding never stands in for them. One answer settles the whole
thing — approved as offered, approved with edits (drop a domain, rename a
project), or "none". Edits are taken verbatim with no second approval round;
"none" declares nothing and creates nothing. Walking the owner through one
question per domain is the friction this replaces.

On approval, create only what is MISSING — the initiative and each project
that does not exist yet, reusing every one that does — and nothing else: no
issues, no status moves, nothing outside the approved structure. Writes go
through `orca linear` or a Linear MCP the session already carries. Without an
Orca session there is no tracker write whatever connector is present, and the
same holds when the live binding cannot be resolved against the declaration
(`reference/tracker.md`, respect rule and Without Orca): create nothing, say
plainly that the tracker was NOT written, and emit the exact operation
(command + payload) per missing object for the operator to run from a
correctly bound session. Step 6 writes the declaration lines either way.

**4. Verify commands.** Run each build/test/run/lint command before writing
it into AGENTS.md. Skip destructive or long-running ones — mark them
`# not verified` instead. A command that fails does not go in.

**5. Migration plan gate.** If the repo is v1 or legacy, load
[references/migration.md](references/migration.md), produce the migration
plan in its format, and STOP for explicit approval. Requires a clean git tree
before applying. Content moves, never disappears: the plan cites the origin
of every kept line. Skip this step entirely for fresh repos; for healthy v2
repos say so and change nothing (drift alone means: apply the migration notes
for the version gap, same gate).

**6. Instantiate.** Fill `{{PLACEHOLDER}}` markers from what steps 1-4
produced; delete optional sections that have no content (e.g. Map). Always:
`AGENTS.md` (stamped with the current version — newest `CHANGELOG.md` entry
in the Agent-Engineering repo — tier one-liner, 4 blocks; when step 3 named a
tracker workspace, its declaration line lands directly under that stamp, in
the canonical format defined in `reference/tracker.md` — cite it, never
restate it; an approved monorepo structure names its initiative there and
leaves the projects to the domains below; answer "none" writes no line) +
pointer `CLAUDE.md` + `docs/README.md` + `docs/tiers.md` + `adrs/` +
`specs/`.
Monorepo: one `app-AGENTS.md` (≤30 lines) + pointer per directory that earns
one (`reference/context.md`), each carrying its domain's `Tracker-project:`
line directly under the title when step 3 settled a monorepo structure —
workspace and team inherited from the root, never repeated. No directory gets
a file just to hold the line; a domain without one inherits the root
declaration whole. Every declaration line is written even when the tracker
objects were only emitted for the operator: the repo does not wait on them
existing. Keep existing README/LICENSE.
UI stack detected in step 1: offer `DESIGN.md.template` per app — opt-in, per
`reference/design-md.md`. The SAME detection also writes ONE browser bullet
into the root Gotchas: not asked, not offered, and independent of how the
DESIGN.md offer was answered — inferred and written, like step 3's language
split. It carries the three clauses of the browser criterion
(`reference/orca.md`, "The browser criterion" — your source, cited nowhere in
the line): prefer the runner's own embedded or app-managed browser; reach for
a driven-browser MCP only for a capability that browser lacks — performance
traces, heap snapshots, a11y audits, device emulation, never convenience or
"it is already installed"; never from a supervised child session. Keep it
RUNTIME-NEUTRAL — no runner, product or command in the generated text
(Playwright and chrome-devtools are examples for you, never text in the file)
— it must read true for an agent on another runner. Context, not a command:
nothing on the machine is installed, probed or configured, and the line counts
against the budget like any other. No rendering surface: no bullet, no
question.
Do NOT create `work/` lanes, `feature_list.json`, or `loops/` speculatively —
lanes and feature lists are per-effort artifacts, loops need a task that
passes the loop filter; offer them only when a concrete effort or recurring
task is starting (see `reference/task-tiers.md`, `reference/loops.md`).
Then run the `ae-audit` skill as the final gate and report: files created,
files deleted (migrations), audit score, and before/after line counts of
always-loaded context when migrating. When a tracker is connected to the
workspace, also remind the owner once to point the coding-tools prompt
template at the standard — first line `Read AGENTS.md first; tier per
docs/tiers.md.` (`reference/tracker.md`, operator setup).

## Judgment notes

- Degrees of freedom: templates are defaults, not law — adapt structure to
  the repo, never violate budgets (AGENTS.md ≤60/100, nested ≤30, pointer ≤3)
  — a declaration line counts against them like any other.
- No speculative skills: propose repo skills only for workflows evidenced in
  the repo (procedural docs, CI scripts) and let the user opt in.
- When the repo already complies at the current version, say so and change
  nothing.
