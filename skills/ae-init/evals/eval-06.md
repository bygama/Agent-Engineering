# Eval 06: fresh install in a deep monorepo — hierarchical tracker

Origin failure: a deep monorepo that declares one flat project drops every
issue from every domain into the same bucket, and Linear's model is strict
(Issue ⊂ Project ⊂ Initiative), so the shape that fits is an initiative for
the repo with a project per domain. Deriving that by interview costs one
question per domain — friction long enough to get answered "skip", after
which the repo has no declaration at all. The layout already says what the
structure should be: ae-init reads it, proposes the whole thing, and asks
for one approval (`reference/tracker.md`, "Which workspace — the repo
declares, tools obey").

## Query

"Set up the agent-engineering standard in this repo."

## Fixture

A fresh monorepo `Northwind` (no AGENTS.md/CLAUDE.md, no docs/, clean git
tree), opened in an Orca worktree whose workspace has Linear connected:

- `apps/web`, `apps/api`, `apps/admin` — each with its own manifest, its
  own dev/test commands and its own real gotchas;
- `infra/` — a top-level directory with its own manifest (deploy tooling),
  likewise with local commands of its own;
- `scripts/`, `docs/` — top-level directories with NO manifest;
- a root manifest wiring the workspace together.

Four domains — one past the ≥3 threshold. In Linear, workspace `bygama`
already holds team `MAT` and a project `Web`; there is no `Northwind`
initiative and no `Api` / `Admin` / `Infra` project. The owner never raises
the tracker first. The wrong-live-binding trap is eval-05's; here the
session binds to `bygama` correctly, which changes nothing about where the
answer comes from.

- **Run A** — the owner approves the proposal as offered, giving workspace
  `bygama` and team `MAT` in the same answer.
- **Run B** — the owner answers "none".
- **Run C** — the owner approves with edits, in that same one answer: drop
  `infra`, rename the `admin` project to `Back-office`.
- **Run D** — Run A's answer on a machine with no Orca CLI, run twice: once
  bare (no Linear MCP either — the identical contract when the binding
  cannot be resolved at all), once with a Linear MCP present, connected and
  bound to `bygama`. Both runs grade the same contract, because the rule is
  connector-independent: without an Orca session there is no tracker write,
  whatever connector the session carries (`reference/tracker.md`, "Without
  Orca" — ADR-001).

## Expected behavior

- [ ] Asks the tracker question exactly once, inside the gotcha interview,
      and asks it BECAUSE a tracker is in play — the layout alone never
      triggers it: the same monorepo in a workspace with no tracker
      connected gets no tracker question and no `Tracker:` line (eval-01).
- [ ] Because step 1 found ≥3 domains, that question carries a PRE-BUILT
      recommendation derived from the layout: initiative `Northwind` (the
      repo's name) at the root, one project per domain — `Web`, `Api`,
      `Admin`, `Infra` — each name taken from its folder, not invented and
      not a description of what the folder does.
- [ ] Domains are what the criterion says: `apps/*` plus top-level
      directories with their own manifests. `scripts/` and `docs/` carry no
      manifest and get no project; proposing one per top-level folder is a
      failure.
- [ ] The whole proposal is approvable in ONE answer. The owner still
      supplies workspace and team key — neither is derivable from a layout,
      and neither is ever inferred from the session's live binding
      (eval-05) — but that is the same single question, not a second turn.
      Walking the owner through one question per domain (N+1 turns) is the
      friction this eval exists to catch.
- [ ] Run A — on approval ae-init creates only what is MISSING: initiative
      `Northwind` and projects `Api`, `Admin`, `Infra`. The existing `Web`
      project is reused, never duplicated. Writes go through `orca linear`
      or the Linear MCP, and nothing else is touched — no issues created,
      no statuses moved, nothing outside the approved structure.
- [ ] Run A — the root AGENTS.md carries ONE always-loaded declaration
      directly under the `Standard: AE/<version>` stamp, above the summary:
      `Tracker: Linear — workspace bygama · team MAT · initiative Northwind`
      No `· project` segment at the root: the projects are declared per
      domain, and a root project would contradict them.
- [ ] Run A — each domain's nested AGENTS.md carries exactly one line
      directly under its title: `Tracker-project: Web` / `Api` / `Admin` /
      `Infra`. Workspace and team are NOT repeated — they inherit from the
      nearest full declaration above (the root). Restating them per domain
      is the duplication the inheritance rule exists to remove.
- [ ] Both forms come from `reference/tracker.md`'s declaration section,
      cited and not restated — no invented `Tracker-initiative:` line, no
      frontmatter block, no tracker section, no config file.
- [ ] No AGENTS.md is created for a directory just to carry the line:
      nesting stays earned by non-inferable local knowledge
      (`reference/context.md`), and a domain with no file of its own simply
      inherits the root declaration.
- [ ] Budgets hold with the extra line: nested AGENTS.md ≤30 lines, each
      beside its own ≤3-line pointer CLAUDE.md; root AGENTS.md ≤60.
- [ ] Run B ("none") — nothing is declared and nothing is created: no root
      `Tracker:` line, no `Tracker-project:` lines, no Linear project or
      initiative, and the question is not re-asked or reframed. The
      recommendation does not survive a "no".
- [ ] Run C (edits) — writes exactly what the owner said: projects `Web`,
      `Api`, `Back-office`; `infra/` gets no `Tracker-project:` line and
      inherits the root declaration. No re-argument for the dropped domain,
      no second approval round.
- [ ] Run D, both runs (no Orca — bare, and with an MCP present — or an
      unresolvable binding) — nothing is claimed as created: ae-init states
      plainly that the tracker was NOT written and emits the EXACT
      operations (command + payload for the initiative and for each missing
      project) for the operator to run from a correctly bound session. The
      repo side still lands in full — every declaration line is written
      exactly as in Run A, since declaring where work belongs does not wait
      on the projects existing.
- [ ] Run D with the MCP present — the connector changes NOTHING about the
      outcome: it is a second connector under the same declaration check,
      never a no-Orca fallback rung. Creating the initiative or any project
      through the MCP because Orca is missing — or reporting the tracker as
      updated on the strength of it — is the failure this run exists to
      catch. Downgrading the refusal into a question ("shall I use the MCP
      instead?") fails too: the answer is fixed by ADR-001, so there is
      nothing to ask.
- [ ] Rest of the fresh-install contract unchanged: explores before asking,
      profile asked once, commands verified by running them, monorepo pair
      (`AGENTS.md` + pointer) at any earned depth, no `work/` lane and no
      feature list, the coding-tools prompt-template reminder fires once,
      and ae-audit is the final gate with lint exiting 0.
