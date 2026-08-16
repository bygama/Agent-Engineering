# Harness layer

Sources: [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/);
[Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents);
[Anthropic: Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps).
Retrieved 2026-08-16.

## Definition

Everything in the engineering infrastructure outside the model weights:
instructions, tools, environment, state, permissions, verification. Every repo
already has one — it is whatever accumulated. The only question is whether
anyone designed it. When agent work fails, check the harness before blaming
the model: attribute the failure to a layer (task spec, context, environment,
verification, state) and fix that layer so it never fails that way again.

## Five subsystems

| Subsystem | Job | Minimum viable version |
|---|---|---|
| Instructions | what the agent is told | canonical AGENTS.md (see `context.md`) |
| Tools | what it can do | shell + files + the few tools actually used |
| Environment | where it runs | locked deps, pinned versions, reproducible setup |
| State | what survives | lane files, git checkpoints (see `task-tiers.md`) |
| Feedback | how it knows it worked | **verified commands — highest ROI of the five** |

## Repo as system of record

An agent has exactly three inputs: the prompt, the repo, and tool output.
Chat threads, tickets, and heads do not exist for it. The **fresh session
test**: a brand-new session, repo only, must answer — what is this? how is it
organized? how do I run it? how do I verify it? where are we now? Blank spots
become guesses, and guesses become bugs.

## Stopping rules

Written *before* any autonomous run, one sentence, command-verifiable:
"done means `<command>` exits 0 and `<artifact>` behaves as `<spec>`" — never
"the agent says it's done". Decide the bad-ending policy (restart with a note,
or freeze and report) and set hard caps (turns or wall-clock). If it runs
unattended, log every turn to a file.

## Tools

- Small menus beat warehouses: remove tools unused in a month; two confusable
  names cost more than one missing tool. Load on demand, not upfront.
- Errors are written for agents now: what failed + why + how to fix
  (`FIX: move file ops to preload/file-ops.ts and call window.api.readFile()`).
  Actionable errors turn failures into a self-correction loop.

## Sub-agents and custom agents

Create a custom agent ONLY when both hold: a **recurring role** needs a
distinct system prompt or tool restriction a skill cannot express, AND no
native agent type already covers it. Inventory before authoring. Otherwise use
a native subagent, optionally pointed at a skill — a skill changes *how* an
agent works; an agent changes *who* is working, and most needs are
skill-shaped.

A sub-agent exists to protect the caller's context: it may burn tokens
exploring but returns only a condensed, high-signal result. Design the return
contract first, then the prompt. Placement: global (`~/.claude/agents/`) for
roles useful anywhere; repo (`.claude/agents/`) rarely — prefer repo skills.

## Permissions

OS-level boundaries beat approval prompts: a prompt always clicked through is
a delay, not a control. Restrict writable directories and network egress at
the OS level so spawned processes inherit the boundary. Short-lived scoped
credentials only — if the agent can read a key, assume the key is in a context
window somewhere.
