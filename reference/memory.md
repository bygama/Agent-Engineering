# Memory layer

Sources: [Anthropic: Managed Agents memory](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents);
[Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
(note-taking, compaction); Stanford/Microsoft agent-memory research as surveyed
in public practitioner writeups. Retrieved 2026-08-16.

## Context is not memory

The window is a stateless scratchpad: every call re-reads its universe from
scratch, attention degrades in the middle, and nothing survives the session.
Memory is what lives *outside* the window — files, stores, notes — and it is a
system with a metabolism: it costs on the write path, grows every session, and
rots unless something prunes it. A store you never prune will eventually serve
you a fact that was true six months ago.

## What to store

**Facts and skills, never transcripts.** Not "on May 12 the user said they
deploy through Actions after that incident…" but:

- fact: deploys go through GitHub Actions, never by hand
- skill: on deploy failure, check the Actions run before touching prod

More raw memory can make an agent *worse* — retrieval drowns in near-duplicate
history. The metric is density: decision-relevant information per token of
context it costs. A curated index of 50 atomic facts beats an unmanaged store
of 50,000 fragments.

## Write discipline (CRUD, not append)

Process events into atomic notes with an explicit decision per item:

- **ADD** — genuinely novel → new record.
- **UPDATE** — refines an existing record → merge into it, never duplicate.
- **DELETE** — contradicted by a new fact → invalidate the old record.
- **NOOP** — noise, pleasantries, transient values → discard.

Contradictions **surface, never auto-merge**: two conflicting memories may both
have been right in different contexts. The system flags; a human decides.

## Forgetting on purpose

Retention decays by relevance × access frequency × recency; below threshold,
archive or delete. Dedup and consolidate on a schedule. The failure mode of a
long-lived agent is not forgetting — it is never forgetting *on purpose*:
growth slope, not starting size, is what makes a store unusable. Prove each
maintenance pass by hand before automating it.

## Placement

- **Auto-memory** owns session-learned facts (user preferences, ongoing-work
  state that outlives a window). Entry files never restate it.
- **Repo files** own project state: lane PROGRESS/DECISIONS, feature lists,
  docs. If another agent (any model) must see it, it must be a repo file.
- **Global layer** owns durable facts about the user.

Same duplication test as `context.md`: one owner per fact, always.
