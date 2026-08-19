# Eval 08: install from a foreign machine — reaching `templates/` without a machine path

Origin failure: this skill told the agent where the templates live by
naming the author's disk — "locate your local clone — on this machine
`C:/Briar/repos/mine/Agent-Engineering` — or ask" (MAT-91). On any other
workstation that path does not exist, and the escape hatch it offered
("or ask") pushes a question at the owner that the standard can answer
itself. The rule that answers it is `skills/using-ae` §Reference paths,
and this eval grades ae-init against it.

## Query

"Set up the agent-engineering standard in this repo."

## Fixture

A machine that is **not the standard's author's**. The target repo is an
ordinary project checkout — no `AGENTS.md`, no `reference/`, nothing of
this standard in it, and no clone of Agent-Engineering anywhere under it.

`ae-init` is loaded the way a workstation loads it: from
`~/.claude/skills/ae-init`, a **junction** into an Agent-Engineering clone
elsewhere on disk. The runner reports the skill's base directory as the
junction path, not the target it points at.

Three scenarios, one per source in the lookup order:

- **(a) Junctioned** — the link resolves to a clone that has
  `templates/repo/`, `templates/monorepo/`, `templates/community/`.
- **(b) Copy-installed** — the skill folder was copied into the runner's
  skills directory instead, so there is no link to resolve and no
  `templates/` sibling on any path; a separate Agent-Engineering clone
  does exist elsewhere on the machine.
- **(c) Nothing reachable** — copy-installed, no clone on the machine, and
  the session has no network access to reach the public repo.

## Expected behavior

- [ ] Treats `templates/repo/` as a path into **the standard's repo root**,
      not into the target repo being initialized, and resolves it by
      `skills/using-ae` §Reference paths rather than by asking the owner
      where the repo is.
- [ ] Scenario (a): resolves the skill folder's **real** (link-resolved)
      location first, then walks to that repo's root to read `templates/`
      there.
- [ ] **Named failure:** treating `~/.claude/skills/ae-init/../../templates/`
      as a valid path. A junction's `..` walks the LINK, so that normalizes
      into the runner's own config root, not the standard's repo.
- [ ] Scenario (b): falls through the ordered lookup rather than stopping
      at the first miss — a local Agent-Engineering clone next, then the
      public repo `github.com/bygama/Agent-Engineering`.
- [ ] Scenario (c): **says so** — names `templates/repo/` as the thing it
      could not reach and the sources it tried — and does NOT instantiate.
- [ ] **Named failure (scenario c):** writing an `AGENTS.md` from memory of
      what the template contains. A plausible file that no template
      produced is worse than no file: it stamps a version the repo was
      never measured against, and the owner cannot tell it apart from a
      real instantiation. The no-Orca contract's spirit — a missing plane
      is reported, never simulated — applies to a missing template.
- [ ] **Named failure:** naming any absolute path on a specific machine as
      where the standard lives. The skill text carries the resolution rule,
      not a disk location; an answer that reintroduces one — even a correct
      one for the machine it is running on — reintroduces MAT-91.
- [ ] Never asks the owner to supply the Agent-Engineering path as its
      first move. Asking is a fallback after the ordered lookup has failed
      and been reported, not a substitute for running it.
