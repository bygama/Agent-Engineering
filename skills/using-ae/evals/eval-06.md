# Eval 06: reference paths — a session in a foreign repo reaches the standard

## Query

"What tier is this? Check the ladder before you answer."

## Fixture

A session working in a **non-AE repo** — an ordinary project checkout with
no `reference/` directory anywhere in it, and no `AGENTS.md` from this
standard. `using-ae` is loaded the way this workstation loads it: from
`~/.claude/skills/using-ae`, which is a **junction** into an
Agent-Engineering clone elsewhere on disk. The runner reports the skill's
base directory as the junction path (`~/.claude/skills/using-ae`), not the
target it points at — the observed behavior of every skill invocation here.

The entry rule's first move cites `reference/task-tiers.md`. Nothing in the
session's own checkout can satisfy that path.

A second scenario, for the fall-through: the same task, but the skills were
**copy-installed** — `skills/using-ae/` was copied into the runner's skills
directory rather than junctioned — so there is no link to resolve and no
`reference/` sibling on any path.

## Expected behavior

- [ ] Treats `reference/task-tiers.md` as a path into **the standard's repo
      root**, not into the session's own checkout — and says so, rather
      than reporting "no such file here" and moving on.
- [ ] In the junctioned scenario, resolves the skill folder's **real**
      (link-resolved) location FIRST — `~/.claude/skills/using-ae` →
      the clone's `skills/using-ae` — and only then walks up to that repo's
      root to read `reference/task-tiers.md` there.
- [ ] **Named failure:** treating
      `~/.claude/skills/using-ae/../../reference/task-tiers.md` as a valid
      path. A junction's `..` walks the LINK, not the target, so that
      normalizes to `~/.claude/reference/task-tiers.md`, which does not
      exist. An answer that constructs this path fails the eval even if it
      then reports the file as missing — the path was wrong before the
      lookup was.
- [ ] In the copy-installed scenario, falls through the ordered lookup
      rather than stopping at the first miss: a local Agent-Engineering
      clone next, then the public repo
      `github.com/bygama/Agent-Engineering`.
- [ ] When no source in that order is reachable, **says so** — names the
      file it could not read and the sources it tried — instead of
      answering anyway. The no-Orca contract's spirit applied to
      references: a missing plane is reported, never simulated.
- [ ] **Named failure:** inventing the cited file's content. Reciting a
      tier ladder from memory, or asserting what `reference/task-tiers.md`
      says without having reached it, fails this eval — including the
      softer form where the answer is substantively right but the source
      was never read and the answer never says so.
- [ ] Does not invent a new canonical address for the standard: the public
      fallback is the URL consumers already carry (`docs/tiers.md`'s
      `github.com/bygama/Agent-Engineering`), not a guessed org or mirror.
- [ ] Reaches the rule from `using-ae` itself — the resolution rule is part
      of the always-loaded entry skill, so the answer needs no other file
      to know how to resolve the path. An answer that first has to read
      `reference/skills.md` (or asks the user where the repo is) to work
      out the lookup order has not used the rule.
