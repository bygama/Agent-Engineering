---
name: skill-authoring
description: Builds and revises skills from evidence: what an agent actually does without the skill decides what the skill teaches, and the class of failure decides what form the guidance takes. Use when creating a skill, when changing an existing skill's behavior, or when a shipped skill is not landing and its wording needs testing before it ships again.
---

# skill-authoring

## What this owns

The METHOD. The rules live in `reference/skills.md` — frontmatter,
description discipline, body budgets, degrees of freedom, progressive
disclosure, the ≥3-evals skeleton — and are cited from here, never
restated: law with two homes drifts. AE owns this phase because a skill
and its evals are artifacts (`docs/adrs/ADR-005-artifact-phases.md`);
superpowers' `writing-skills` is the fallback where AE isn't installed.

## Core principle

**A skill is documentation under test. If you did not watch an agent
fail without the skill, you do not know what the skill should teach.**

The house contract already puts evals before content. The baseline is
what makes those evals honest — without it the count is satisfied and
the evals themselves are guesses.

## Workflow

Copy this checklist and tick items off:

```
skill-authoring progress:
- [ ] 1. RED — run the baseline, capture failures verbatim
- [ ] 2. Classify the failure, pick the form it dictates
- [ ] 3. Evals from the observed failures (reference/skills.md shape)
- [ ] 4. GREEN — minimum content that fixes THOSE failures
- [ ] 5. Micro-test the wording against a no-guidance control
- [ ] 6. REFACTOR — re-run, plug new holes, stop when runs converge
```

### 1. RED — the baseline

**A baseline is a run you perform now, not logs you must already
have.** Dispatch a fresh-context agent — a *probe* — at a realistic
version of the task with no skill present, and read what it produces;
a baseline is one or more probes. "There are no
session logs" and "nobody has recorded this failing" are the normal
starting state — they are the reason to run the probe, never grounds to
skip it.

- The requester's description of the failure is what makes the probe
  worth running. It is not the evidence.
- Give the probe the real pressures and the real context the guidance
  will live in — the full template or skill, not the guidance alone.
- Capture what the agent did **verbatim**: its wording, its stated
  reasons. "The agent was wrong" tells you nothing to write against.
- **Collect what you dispatch.** Size the batch to what you can read
  back in this same turn — two probes collected beat six left running.
  A probe you never collect is a probe you did not run, and the cycle
  is still at RED.
- No failure in the baseline → there is nothing to author. Stop.

Pressure scenarios, pressure types and the probe formats:
`references/testing-with-subagents.md`.

### 2. Classify the failure, then pick the form

The form that bulletproofs one failure class measurably backfires on
another. Classify first; never let a form already sitting in the file
pick itself.

| Observed failure | Form it dictates | Wrong form |
|---|---|---|
| Knows the rule, breaks it under pressure | Prohibition + rationalization table + red flags | Soft guidance ("prefer", "consider") |
| Complies, but the output has the wrong shape (bloated, buried, restated) | Positive recipe or contract: state what the output IS — its parts, in order | Prohibition list ("don't restate", "never narrate") |
| Omits an element from something it already produces | Structural: a REQUIRED slot in the template it fills | Prose reminders near the template |
| Behavior should depend on a condition | Conditional keyed to an observable predicate | Unconditional rule + exemption clauses |

**Why prohibitions backfire on shape failures:** under a competing
incentive ("make it self-contained"), an agent negotiates with "don't
X". In head-to-head wording tests, the prohibition arm produced clearly
more of the unwanted content than the recipe arm — and trended worse
than the no-guidance control (source: superpowers' `writing-skills`
wording tests, here and below). A recipe leaves nothing to negotiate: the
output matches the stated shape or it doesn't.

Two rules, whichever form you pick:

- **No nuance clauses.** "Don't X unless it matters" reopens the
  negotiation — one nuance clause appended to a winning recipe degraded
  it from consistent to noisy. Express a real exception as its own
  conditional on an observable predicate.
- **Exemption clauses don't scope.** "This limit doesn't apply to code
  blocks" still suppresses code blocks. If part of the output must be
  exempt, restructure so the rule cannot reach it.

### 3. Evals from what you observed

Shape and count are law (`reference/skills.md`). The method's one
demand: **every checklist line traces to something an agent was
observed doing.** An "adjacent failure mode for the same root cause"
that was reasoned about rather than seen is not an eval — it is content
for a hypothetical case, arriving early.

### 4. GREEN — the minimum

Write the least content that fixes the observed failures. A section
nobody failed at is a section nobody needed.

**Nothing for cases you imagine — and a request is not evidence.** An
addition the baseline never showed is unevidenced whether you invented
it or the requester asked for it by name; "while you're in there, also
add..." is the most common way unevidenced content enters a skill.
Decline it with the diagnosis and the alternative: run a probe, and it
gets written from what the probe shows. Edit what the failure touches;
do not rewrite the file around it.

One clause the law does not carry (`reference/skills.md` already sets
what + when): **never a step-by-step workflow summary.** A summarized
workflow becomes the shortcut agents take instead of reading the body —
a description naming two review stages produced one review, and
removing the summary produced both (source: superpowers'
`writing-skills` wording tests).

### 5. Micro-test the wording

Full pressure scenarios are the final gate, but they are slow per
iteration. Test the wording first:

- **Always include a no-guidance control.** A with-guidance re-run
  scored against a checklist is not a test — without the control arm
  you cannot tell guidance from regression to the mean.
- **Variance is a metric.** Five different interpretations across five
  reps means the wording isn't binding — tighten the form before adding
  words.

Reps, sampling and how to read the matches:
`references/testing-with-subagents.md`.

### 6. REFACTOR — until the runs converge

Re-run the same scenarios with the skill present. A new rationalization
is a new hole: add its counter and re-test. Stop when the agent follows
the rule under maximum pressure and cites the skill's own sections —
not when it passes once. When it fails while holding the skill, ask it
how the skill should have been written instead; its answer is either
your missing sentence or proof the problem is prominence, not content
(`references/testing-with-subagents.md`).

## Red flags — stop and run the baseline

- "The rule is obvious, everyone agrees" — obvious to you ≠ what agents
  actually do. The baseline is 10 minutes.
- "I have no logs to mine" — then run one now. That is what a baseline is.
- "The requester already told me the failure" — that is the probe's
  subject, not its result.
- "I'll reuse the table this skill already has" — the failure picks the
  form, not the file's habits.
- "Only the eval count is checked in CI" — the count is the part that
  can be gamed; the baseline is the part that makes it worth counting.
- "It's just an edit / just a section" — behavior changed, so the cycle
  applies. Evals change first.

## Rationalization table

| Excuse | Reality |
|---|---|
| "Testing is overkill for something this clear" | Clear to the author ≠ clear to a fresh agent. Untested skills have gaps. Always. |
| "No time before the release window" | A skill that doesn't land costs more than the probe that would have caught it. |
| "I'll ship it and iterate from real usage" | Real usage is other agents failing in production work. Fail them in a probe instead. |
| "I extended to adjacent failure modes for the same root cause" | You invented them. GREEN forbids content for hypothetical cases. |
| "They asked for it while I was in there" | A request is not a baseline. Unevidenced is unevidenced whoever proposed it. |
| "I re-ran it with the guidance and it looked better" | Better than what? Without a control arm that sentence has no content. |
| "The description should summarize the workflow so it's discoverable" | Then agents follow the summary instead of the body. What + when, never how. |

## Judgment notes

- This skill carries no authoring rules of its own. When a rule is
  wanted — a budget, a frontmatter field, a disclosure pattern — the
  answer is a pointer to `reference/skills.md`, not a copy.
- Refusals are a diagnosis plus the alternative in the same breath: "no
  observed failure behind it — run the probe and I'll write what it
  shows", never a bare no.
- The cycle binds edits exactly as it binds new skills. Any change to a
  skill's behavior is a change under test.
- Skill type decides what "failing" even means; a pure reference skill
  has no rule to violate (`references/testing-with-subagents.md`).
