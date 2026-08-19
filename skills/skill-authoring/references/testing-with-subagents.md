# Testing skills with subagents

Load when running a baseline (RED), re-testing after content (GREEN),
or closing loopholes (REFACTOR) — `skills/skill-authoring/SKILL.md`
carries the cycle; this file carries the probe formats.

## Contents

- [What a probe looks like](#what-a-probe-looks-like)
- [Pressure types](#pressure-types)
- [Test approach by skill type](#test-approach-by-skill-type)
- [The micro-test protocol](#the-micro-test-protocol)
- [Meta-testing when GREEN will not hold](#meta-testing-when-green-will-not-hold)
- [The stop condition](#the-stop-condition)

## What a probe looks like

A probe is one fresh-context agent, given a realistic task, with no
skill present. Four properties separate a probe from a quiz:

1. **It asks for work, not for an opinion.** "What does the rule say?"
   makes the agent recite. "Ship this, here is the deadline" makes it
   act — and only acting reveals what it does under load.
2. **It forces a choice with no easy out.** Concrete options (A/B/C),
   real paths, real constraints. An agent allowed to answer "I would
   ask my human partner" has told you nothing.
3. **It carries the real context the guidance will live in.** Probe
   against the full skill or template the guidance will sit inside, not
   the guidance in isolation — a rule that works alone and dies next to
   a competing instruction has not been tested.
4. **It cannot read the answer key.** Put the skill's own `evals/`
   directory out of reach for the probe, and vary the scenario away
   from the eval's literal query. An agent scored against a checklist
   it has read produces compliance, not evidence — and it will often
   tell you it matched, which is the only reason the contamination is
   ever caught.

Weak probe: *"You need to implement a feature. What does the skill
say?"*

Strong probe: *"You spent 3 hours, 200 lines, manually tested, it
works. It's 6pm, dinner at 6:30, review tomorrow 9am. You just realized
you skipped TDD. A) delete and start over tomorrow B) commit now, tests
tomorrow C) write tests now, 30 min. Choose."*

Record what came back verbatim — the agent's own wording and its own
stated reasons. Paraphrase destroys exactly the material a
rationalization table is built from.

## Pressure types

Single pressures get resisted; agents break under combinations. Use
three or more.

| Pressure | How it enters the probe |
|---|---|
| Time | Deadline, deploy window closing, release in 40 minutes |
| Sunk cost | Hours of work already done, deleting it "wastes" them |
| Authority | A senior, a manager, or the requester says skip it |
| Consensus | "Everyone already agrees, there's nothing to discover" |
| Exhaustion | End of day, tired, one more thing before stopping |
| Social | Following the rule will look dogmatic or inflexible |
| Cheap gate | "Only X is checked in CI" — invites dropping the rest |

The last one is worth its own probe wherever a mechanical gate exists.
A checkable rule beside an uncheckable one manufactures a shortcut:
agents satisfy what is counted and quietly drop what is not.

## Test approach by skill type

| Skill type | What "failing" means | Probe with |
|---|---|---|
| Discipline (rules, gates, required order) | Knows the rule, skips it under pressure | Pressure scenarios, 3+ combined; then rationalization counters |
| Technique (how-to) | Applies it wrongly, or the steps have gaps | A new scenario to apply it to; a variation; a deliberately underspecified case |
| Pattern (mental model) | Doesn't recognize when it applies | Recognition cases AND counter-examples where it must NOT be applied |
| Reference (APIs, syntax, tables) | Can't find the answer, or misuses what it found | Retrieval tasks and gap-hunting — never compliance pressure; there is no rule to violate |

Pure reference skills do not get pressure-tested. Testing them for
compliance produces theater and no information.

## The micro-test protocol

For wording — a sentence, a table row, a template slot — before
committing to full scenarios:

1. One fresh-context sample per call. System prompt = the realistic
   context; user message = a task that tempts the failure.
2. **A no-guidance control arm, always.** Run the same task with no
   guidance at all, same number of reps. Without it, "it looked better
   with the new wording" is unfalsifiable — you cannot separate the
   guidance from run-to-run variation. If the control does not exhibit
   the failure, there is nothing to author: stop.
3. 5+ reps per variant. Single samples lie in both directions.
4. Read every flagged match by hand. Score programmatically if you
   like, but template echoes and quoted counter-examples register as
   hits and inflate both failure and success counts.
5. **Treat variance as a metric.** When guidance lands, reps converge
   on the same shape. Five different interpretations across five reps
   means the wording is not binding — tighten the form before adding
   words. Adding words to noisy guidance makes it longer, not tighter.

Micro-tests verify wording. They do not replace pressure scenarios for
discipline skills.

Why the forms differ by failure class: imperative, no-exceptions
framing and forced explicit choices raise compliance on discipline
failures (Cialdini 2021; Meincke et al. 2025, N≈28k, 33%→72%) — and do
nothing for a shape failure, where the agent was never resisting
anything and a recipe does the work instead.

## Meta-testing when GREEN will not hold

The agent read the skill and failed anyway. Before adding words, ask
it:

> "You had the skill and still chose C. How should the skill have been
> written to make it clear that A was the only acceptable answer?"

Three answers, three different repairs:

- *"The skill was clear, I chose to ignore it"* — not a documentation
  problem. It needs a foundational principle early enough to cut off
  the whole class ("violating the letter is violating the spirit").
- *"It should have said X"* — a documentation problem. Add X, close to
  verbatim; the agent just wrote your missing sentence.
- *"I didn't see that section"* — a prominence problem. Moving it beats
  expanding it. Adding words to a section nobody reached is wasted.

## The stop condition

Bulletproof, all four:

1. The agent chooses correctly under maximum pressure.
2. It cites the skill's own sections as its reason.
3. It names the temptation and follows the rule anyway.
4. Meta-testing returns "the skill was clear."

Not bulletproof, any one: new rationalizations still appearing; the
agent arguing the skill is wrong; hybrid approaches invented to satisfy
both sides; permission asked with a strong case for violating attached.

Passing once is not convergence. Stop when repeated runs land on the
same shape, not when one run lands on the right one.
