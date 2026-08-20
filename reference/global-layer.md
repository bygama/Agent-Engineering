# Global layer

Source: this repo's own doctrine — `reference/context.md` (placement rule,
the 40-line canon), `docs/how-it-works/architecture.md` (layer boundaries),
`docs/how-it-works/standard-lifecycle.md` (SessionStart injection).
Consolidated here 2026-08-20 (MAT-111), when the standard stopped shipping
one person's `~/.claude` content and kept only the replicable part.

## What the layer is

`~/.claude` — the runner's user-level context, read in every session of
every repo, ahead of any repo file. It carries facts about the **user**,
never about a project: language and tone, safety rules, universal working
style, cross-repo skills and agents.

Two properties make it a layer and not a folder:

- **Edited at a source, then installed.** The machine copy is an artifact.
  Nothing is edited in place under `~/.claude` — a change goes into the
  repo that owns the content and is applied from there, or the next
  install reverts it silently.
- **Owned by exactly one repo.** Machine policy is personal and belongs in
  a personal repo. The standard defines the layer; it never populates it.
  A standard that also ships a lived-in `~/.claude` makes that config look
  like a dependency and forces every consumer to strip it before use.

## What belongs in it

| Goes in | Stays out |
|---|---|
| Facts about the user: language and tone, safety, working style | Project specifics — the repo's `AGENTS.md` owns those |
| Cross-repo skills and agents (`~/.claude/skills`, `~/.claude/agents`) | Procedural workflows — those are skills |
| Machine policy no repo may assume (account/CLI selection on spawn) | Session-learned facts — auto-memory owns those |

The duplication test decides each line: would it appear in more than one
repo's `AGENTS.md`? → global. Only matters to one project? → never global.
Neither? → a skill, or nothing. Full placement rule: `reference/context.md`.

## The canon: `~/.claude/CLAUDE.md`, ≤40 lines

The one `CLAUDE.md` that is not a pointer — its own canonical file with its
own budget. `agent-lint` finds it by content, not by path: any `CLAUDE.md`
whose H1 is `# Global instructions` is held to 40 lines, wherever it sits.

Sections that earn the space: identity and language, safety, working style,
placement, and any machine policy a repo may not assume. Everything else
fails the duplication test. The budget is tight on purpose — this file is
paid for in every session of every repo, so a line that matters sometimes
is a line that costs always.

## SessionStart hook wiring

A SessionStart hook injects content into context before the first turn —
the entry skill's procedure, or a probe's one-line result
(`reference/orca.md`). Runner-generic recipe: a SessionStart entry in the
runner's `settings.json`, pointing at the script.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "pwsh -NoProfile -File \"<absolute path to>/hooks/using-ae.ps1\"",
        "timeout": 15
      }
    ]
  }
}
```

Three rules carry it to any machine:

- **The path is absolute.** Hook runners perform no shell expansion and no
  env-var substitution, so `~`, `$HOME` and `%USERPROFILE%` reach the
  command as literal characters (MAT-31).
- **The hook is optional.** Without it the entry skill still triggers on
  its own description the first time a task needs it; the hook only saves
  that first lookup. Nothing in the standard depends on a hook firing.
- **An injecting hook resolves its payload relative to its own installed
  location**, so install the script beside the content it injects — and
  keep it silent when that content is missing, so a partial install
  degrades to no hook instead of an error every session.

## The owner's living instance

[bygama/workstation](https://github.com/bygama/workstation) is canonical
for the owner's personal layer: the real `~/.claude/CLAUDE.md`, the real
hook scripts, and the installer that applies both. It is a **consumer of
this standard, never a dependency of it** — this repo says what the layer
is for and how to wire it; no file here is needed to build one, and no
consumer reads workstation to install AE.

It is worth reading as a worked example, on the same terms as anything in
`examples/`: one person's answers, not the standard's. Changes to that
machine go through workstation and are installed from there — `~/.claude`
is never edited directly, and never from this repo.
