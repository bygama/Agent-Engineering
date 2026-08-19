---
issue: MAT-87
---
# SPEC — using-ae: how `reference/*.md` citations resolve outside the AE repo

Ticket: MAT-87 · Tier: M · Lane: `work/mat-87-reference-resolution/`
Design input: parent's shaped brief (dispatch ctx_1c6e97dfee7b). Base: fresh
main (96da7ca, tag v1.4.0). Sibling lanes in flight — fence in §Out of scope.

## Problem

AE skills cite the reference layer by bare repo-relative path: 36 citations
across 8 distinct `reference/*.md` files in `skills/*/SKILL.md`
(`reference/task-tiers.md` and `reference/orca.md` 9 each,
`reference/tracker.md` and `reference/runners.md` 6 each), plus 1 in
`.claude/skills/`. Nothing in the standard says how those paths resolve from
a session working in ANOTHER repo. It works on this machine by operator
knowledge; only `ae-init` states a locate-or-ask pattern, and it does so
with a hardcoded machine path (`skills/ae-init/SKILL.md:13-14`).

Two failure modes, both verified on this workstation today:

**(1) The naive relative walk breaks silently.** The runner hands a skill
its junction path, not its real one — this very session's `work-plan`
invocation reported `Base directory for this skill:
C:\Users\mateo\.claude\skills\work-plan`. Walking `../../reference/` from
there normalizes through the LINK, not the target:

```
C:\Users\mateo\.claude\skills\using-ae\..\..\reference\task-tiers.md
  -> C:\Users\mateo\.claude\reference\task-tiers.md      exists: False
```

The correct walk resolves the skill folder's REAL path FIRST, then goes up
to the repo root:

```
link  C:\Users\mateo\.claude\skills\using-ae
real  C:\Briar\repos\mine\Agent-Engineering\skills\using-ae
root  C:\Briar\repos\mine\Agent-Engineering
ref   C:\Briar\repos\mine\Agent-Engineering\reference\task-tiers.md   True
```

The failure is silent: the naive path simply does not exist, and an agent
that reads "file not found" as "no such rule" proceeds by invention.

**(2) Copy-installed adopters have no `reference/` at all.** README's
adoption guide offers three ways to get the skills into a runner, and
option 2 is "copy the skill folders into the runner's own skills
directory". A copied `skills/<name>/` folder has no `reference/` sibling on
any path — link-resolved or not. The citations dangle by construction, for
a route the README itself blesses.

## Design (settled by the parent — formalized here, not re-decided)

### 1. `skills/using-ae/SKILL.md` — one compact resolution rule

A new `## Reference paths` section stating, in the standard's own voice:
`reference/…` in an AE skill means the standard's **repo root**, found in
this order —

1. the repo holding the skill folder's **REAL (link-resolved)** location;
2. a local Agent-Engineering clone;
3. the public repo `github.com/bygama/Agent-Engineering`.

When none is reachable, **say so instead of guessing** — the no-Orca
contract's spirit applied to references: the agent names the source it
could not read rather than inventing what the cited file says.

The ordering is not arbitrary. (1) is the only source guaranteed to be the
same version as the skill being followed; (2) is any checkout that happens
to be on the machine; (3) is always current-main and never version-matched,
which is why it is last and not first.

The URL is the one consumers already carry
(`templates/repo/docs/tiers.md:28`); no new canonical address is invented
here.

### 2. `skills/using-ae/SKILL.md` — red-flags row for the junction trap

The junction mechanism is failure *reasoning*, which is what the red-flags
table is for. One row: Thought = walking `../../reference/` from
`~/.claude/skills/<name>/`; Reality = a junction's `..` walks the link, so
that lands in `~/.claude/`, not the standard's repo — resolve the skill
folder's real path first, and if nothing resolves say so rather than invent
the file's content.

Splitting it this way keeps the rule itself declarative (what the path
means, where to look, what to do when it is absent) and puts the trap where
this skill already puts traps.

### 3. Budget — ≤78 lines, headroom left for the sibling lane

`using-ae` is injected at SessionStart and capped at ≤80 lines (CHANGELOG
1.2.0). The file is **72 lines today**.

The parent's ruling at SPEC approval (DECISIONS ruling 1) tightens this
lane's target to **≤78**: sibling lane MAT-44 ships a new skill in this same
wave and its `## The map` row needs a line, and arriving at 80/80 would
force that lane to trim under time pressure.

The addition is therefore **6 lines** — blank + heading + blank + 2 prose
(§1) + 1 table row (§2) — landing at **78**. Nothing existing is trimmed and
no existing section is reflowed: `## The map` in particular is left
byte-identical, since that is the section MAT-44 edits. Prose wraps at the
file's existing ~70-73 columns; the line count is verified by command before
every commit.

Distribution of the rule across those 6 lines follows the parent's own
suggestion: the prose carries what the path means, the ordered lookup, and
the say-so contract; the red-flags row carries the junction trap together
with the resolve-real-path-first correction and the never-invent clause.

### 4. Evals — the foreign-repo case is graded (evals before content)

**New `skills/using-ae/evals/eval-06.md`.** Fixture: a session working in a
NON-AE repo (no `reference/` in the checkout), using-ae loaded from
`~/.claude/skills/using-ae` — a junction into an Agent-Engineering clone —
faces a task whose triage needs `reference/task-tiers.md`. Correct
behavior: resolve the skill folder's REAL path first, walk to the repo
root, read the file there; if the skill were copy-installed instead, fall
through to a local clone, then the public repo, and if none is reachable
say the source is unreachable and name what it could not read.

Two **named failures**, per the parent's brief:

- treating `~/.claude/skills/using-ae/../../reference/task-tiers.md` as a
  valid path — the junction trap;
- inventing the cited file's content (reciting tiers from memory, or
  asserting a rule the file was never read for), including the softer
  version where the agent proceeds on a remembered tier ladder without ever
  saying the source went unread.

The existing five evals are NOT rewritten: none of them turns on reference
resolution, and eval-01/04/05's fixtures already pin the seat contrast the
MAT-85 work established.

### 5. `docs/how-it-works/execution.md` — the chapter this change touches

Repo hard constraint: a structural change updates the affected chapter in
the same change. §"Runners: any file-reading agent can hold a lane" is the
passage that narrates a runner being handed a skill file to follow as a
procedure ("runners without SKILL.md support are told to read the skill
file and follow it as a procedure"). That is exactly the reader who then
hits a `reference/…` citation with no repo-relative anchor. It gains one
sentence: the paths those skill files cite resolve against the standard's
repo root by using-ae's ordered lookup — real (link-resolved) skill
location first — and an unreachable reference layer is reported, never
guessed.

`docs/how-it-works/architecture.md` is the other affected narrator — its
`grounds` arrow (line 19) and §`reference/` (line 39) carry the
reference→skills edge this rule makes explicit. A **sibling lane owns that
file**: per the parent's brief the needed line is REPORTED in PROGRESS.md,
not edited.

## Out of scope (recorded, not forgotten)

- **`README.md`** — the ticket's optional adoption-section line
  (copy-installers should clone `reference/` too, or accept degraded
  citations) is **DEFERRED by the parent's brief**: reported in PROGRESS,
  not written here.
- **`docs/how-it-works/architecture.md`** — sibling lane's file; the line it
  needs is reported, per §5.
- **`reference/skills.md`** and **`skills/skill-authoring/`** — sibling
  lanes' files. Untouched.
- **CHANGELOG.md, version stamps, any bump** — this rides the owner's next
  release with the rest of the wave.
- **`global/`, `templates/`** — untouched.
- Any script, hook, or automation that performs the resolution for the
  agent: the rule is prose an agent follows, like the rest of the map. No
  new CLI surface and no new runtime dependency — the standard stays
  runtime-neutral.
- Retro-fitting the other nine skills with a per-skill copy of the rule:
  `using-ae` is always loaded, so stating it once there covers the suite.

## Definition of done

- Evals-before-content visible in history: the eval-06 commit lands before
  the `SKILL.md` commit it grades.
- `skills/using-ae/SKILL.md` is **≤78** lines (parent's ruling 1; the
  standard's own cap is ≤80), verified by command.
- `## The map` in `skills/using-ae/SKILL.md` is byte-identical to main —
  sibling lane MAT-44 owns the next edit there.
- All four gates exit 0: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` · `node tests/run-lint-tests.mjs` ·
  `node tests/run-gen-tests.mjs` · `node tests/run-eval-checks.mjs`.
- No do-not-touch file appears in `git diff --name-only main`.
- `architecture.md`'s needed line and the deferred README line are both
  recorded in PROGRESS.md for the parent.
- Branch pushed, PR open with `Closes MAT-87` in the body; this lane never
  merges.
