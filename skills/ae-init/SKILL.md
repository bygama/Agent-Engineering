---
name: ae-init
description: Installs the agent-engineering standard in a repository — canonical AGENTS.md, pointer CLAUDE.md, docs tree — or migrates v1 (canonical-CLAUDE.md) and legacy (adapters, read orders) setups to it. Use when setting up agent context for a new or existing repo, when a repo lacks AGENTS.md or a version stamp, or when modernizing an outdated context setup.
---

# AE init

Instantiates the per-repo skeleton from the Agent-Engineering templates,
adapted to the target repo. Ask only what cannot be inferred; verify before
writing; never touch a v1 or legacy repo without an approved migration plan.

Templates live in the Agent-Engineering repo: `templates/repo/`,
`templates/monorepo/`, `templates/community/` (locate your local clone — on
this machine `C:/Briar/repos/mine/Agent-Engineering` — or ask).

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

Also: `docs/`, repo skills, `work/` lanes, README.

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
Settle the artifacts language here too, once for the repo: agent context and
technical docs default to ENGLISH — never inferred from the README or from
the language of this conversation. When the repo's human docs are another
language, record the split as a gotcha in the generated AGENTS.md: agent
context and technical docs English; site content/SEO/README in the project's
own language — never fix one side into the other.

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
in the Agent-Engineering repo — tier one-liner, 4 blocks) + pointer
`CLAUDE.md` + `docs/README.md` + `docs/tiers.md` + `adrs/` + `specs/`.
Monorepo: one
`app-AGENTS.md` (≤30 lines) + pointer per app. Keep existing README/LICENSE.
UI stack detected in step 1: offer `DESIGN.md.template` per app — opt-in, per
`reference/design-md.md`. Do NOT create `work/` lanes, `feature_list.json`,
or `loops/` speculatively — lanes and feature lists are per-effort
artifacts, loops need a task that passes the loop filter; offer them only
when a concrete effort or recurring task is starting (see
`reference/task-tiers.md`, `reference/loops.md`).
Then run the `ae-audit` skill as the final gate and report: files created,
files deleted (migrations), audit score, and before/after line counts of
always-loaded context when migrating. When a tracker is connected to the
workspace, also remind the owner once to point the coding-tools prompt
template at the standard — first line `Read AGENTS.md first; tier per
docs/tiers.md.` (`reference/tracker.md`, operator setup).

## Judgment notes

- Degrees of freedom: templates are defaults, not law — adapt structure to
  the repo, never violate budgets (AGENTS.md ≤60/100, per-app ≤30, pointer ≤3).
- No speculative skills: propose repo skills only for workflows evidenced in
  the repo (procedural docs, CI scripts) and let the user opt in.
- When the repo already complies at the current version, say so and change
  nothing.
