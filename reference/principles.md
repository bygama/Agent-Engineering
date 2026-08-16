# Agent engineering principles

Sources: [The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
(2026-07-24); [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents);
[OpenAI: Harness engineering](https://openai.com/index/harness-engineering/);
[Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).
Retrieved 2026-08-16.

## Attention budget

Context is a finite public good. The goal is always the **smallest possible set
of high-signal tokens** that maximizes the likelihood of the desired outcome.
Every line in an always-loaded file (AGENTS.md, skill descriptions) competes
with conversation history and task content. Anthropic removed >80% of Claude
Code's system prompt for Claude 5 models with no measurable eval loss.

## The six shifts

1. **Rules → judgment.** State intent and let the model judge. Hard rules only
   for genuine safety ("never commit .env"), not taste.
2. **Examples → interface design.** Self-describing interfaces (enums, typed
   parameters, good names) communicate intended use without examples.
3. **Upfront context → progressive disclosure.** Short always-loaded core +
   skills and reference files loaded when relevant.
4. **Duplication → single source.** Each instruction lives in exactly one
   place — the file, tool, or skill definition that owns it.
5. **Manual memory → auto-memory.** Session-learned facts belong to memory;
   context files never store what memory handles.
6. **Prose specs → rich references.** Tests, mockups, rubrics, and code as
   specification — executable or inspectable artifacts beat prose.

## The context stack

One request assembles several layers; each fact belongs to exactly one:

| Layer | Owns |
|---|---|
| Prompt | The task at hand |
| References (@-mentions) | High-fidelity detail: specs, mockups, code |
| System prompt | The product/harness |
| AGENTS.md (canonical) / CLAUDE.md (pointer) | Repo facts: commands, gotchas, hard constraints |
| Skills | Opinionated recurring workflows, loaded on trigger |
| Auto-memory | Session-learned facts about the user and ongoing work |

## v2 additions

- **Evidence over confidence.** Models are systematically overconfident; "the
  agent says it's done" is never a completion state. Done = a command exited 0
  and the evidence is recorded.
- **Maker ≠ checker.** The author is the worst judge of its own work: it
  re-reads its reasoning, not the result. Verification happens in fresh
  context, acting on the artifact.
- **Repo as system of record.** An agent has three inputs: prompt, repo, tool
  output. Knowledge outside the repo does not exist for it — write it down or
  accept the guessing.
- **WIP=1.** One lane of work in progress at a time. Attention divides as C/k;
  five half-features are worth less than one finished one.
- **Ceremony scales with tier.** Small, medium, and large work get exactly
  their own paperwork (see `task-tiers.md`); mid-task discoveries ratchet the
  tier up, never down.
- **Anything broken twice becomes a check.** Prose rules get skimmed; failing
  checks don't. Promote repeated failures into lint rules and tests.

## Right altitude

System-level guidance must be specific enough to guide behavior and flexible
enough to leave heuristics to the model. Two failure modes: brittle hardcoded
logic and vague platitudes. Write the constraint that survives both tests, or
write nothing.

## Just-in-time retrieval

Agents discover context at runtime through the filesystem. Folder hierarchy
and naming conventions are **signals** — never mandatory read orders. A map
(short pointer list) is acceptable; a toll ("read X before doing anything") is
not. Diagrams earn a place only when they encode topology the filesystem
cannot show (cross-service flows, deploy layout, state machines) — written in
Mermaid and kept under `docs/` for just-in-time discovery.

## Naming as metadata

A name should teach before the file is opened — signal at zero token cost.
Conventions: skills are kebab-case verb phrases; decision records are
`ADR-NNN-<topic>.md`; specs are `SPEC-<feature>.md`; dated working documents
carry `YYYY-MM-DD`; lanes are `work/<kebab-slug>/`. When a file needs a
comment to explain what it is, the name failed first.

## Long-horizon techniques

- **Sub-agents**: isolate exploration in a separate context; return only a
  condensed, high-signal result.
- **Compaction**: when nearing the window limit, summarize preserving
  decisions and open issues, discard stale tool output.
- **Note-taking**: persistent lane files (PROGRESS, DECISIONS) survive context
  resets; the repo remembers what the window forgets.

## The "the model is already smart" test

Challenge every line of every context file: could the model infer this from
the filesystem, the code, or common sense? If yes, delete it. Only
non-inferable knowledge (owner intent, tribal gotchas, genuine constraints)
earns tokens.
