---
name: shaping
description: Turns a raw ask with no settled design into an approved design through dialogue — one question at a time establishing purpose, constraints, and success criteria; then 2-3 approaches with a recommendation; then a design in sections, each confirmed before the next — before handing it to work-plan design-first. Consumes the tier using-ae already triaged; never re-derives or re-classifies it, and runs no spike/bounded/architectural ladder of its own. A feasibility question ("can we even...?") is treated as an S-tier probe: answer it, report it, keep nothing. Supersedes superpowers' `brainstorming` for daily design work in an AE-standard repo (ADR-006), falling back to it only where AE isn't installed. Use whenever using-ae or work-plan hits its no-settled-design refusal case, or an ask needs shape before a lane opens. Writes no SPEC.md, PLAN.md, or file of its own — the conversation is the output; hard gate: no implementation action of any kind until the owner approves the design, at every tier.
---

# shaping

Completes the front of the work-cycle family: **shaping** (design) →
**work-plan** (plan) → **work-run** (execute) → **work-verify** (prove)
→ **work-handoff** (close). This skill turns a raw ask with no settled
design into an approved design through dialogue, then hands it to
work-plan design-first — the design phase work-plan's own refusal case
points at, now with an AE-owned home instead of a suite's
(`reference/skills.md`).

Adapted from superpowers' `brainstorming`: the dialogue shape —
questions one at a time, approaches before design, sections confirmed
one at a time. NOT adopted: the spike/bounded/architectural ladder —
using-ae already triaged the tier before invoking shaping, and
re-deriving it here would produce a second, shaping-owned
classification alongside using-ae's (`reference/task-tiers.md`); the
written spec file — the approved design lives in the conversation and
goes straight to work-plan, which is the one that writes SPEC.md.

## Workflow

Copy this checklist and tick items off:

```
Shaping progress:
- [ ] 0. Qualify (tier already triaged; feasibility probe → probe path)
- [ ] 1. Understand: purpose, constraints, success criteria — one
      question at a time
- [ ] 2. Propose 2-3 approaches, recommendation first
- [ ] 3. Present the design in sections, confirm each before the next
- [ ] 4. Owner approves → hand to work-plan design-first
```

**0. Qualify.**

- *Tier consumption*: using-ae triaged the tier before invoking
  shaping — never re-derive or re-classify it here, and run no
  independent spike/bounded/architectural ladder of shaping's own.
  Exactly one artifact set reaches work-plan at handoff — never a
  second, shaping-owned classification or spec.
- *Feasibility probe* ("can we even...?" — a question about a
  constraint, not a request to build something): treat it as an
  S-tier probe, not a design ask. Answer the question and report it;
  keep nothing — no lane opened, no code kept, no design artifact
  written.
- Everything else proceeds through steps 1-4, scaled to the tier the
  owner already has — ceremony shrinks toward S, the gate in step 3
  never does.

**1. Understand.** Ask exactly one question at a time — never a
bundled list — framed as multiple choice wherever that's possible. The
sequence establishes purpose, constraints, and success criteria before
any approach is proposed.

**2. Approaches.** Once those are settled, offer 2-3 approaches with
trade-offs. Lead with a recommendation and the reasoning, rather than
listing them neutrally and waiting to be asked. YAGNI ruthlessly — drop
speculative generality the ask never asked for, rather than padding
approaches to look thorough.

**3. Design.** Present the design in sections scaled to the ask's
complexity — never one padded section for a small ask, never a single
monolithic dump for a complex one. Confirm each section with the owner
before drafting the next.

<HARD-GATE>
No implementation action of any kind — no code, no file edit, no lane
creation — happens anywhere in this exchange before the owner approves
the finished design. This holds at every tier: what scales with
simplicity is the artifact, never the approval. The approval itself is
a discrete stop — never folded into a description of what's about to
happen next.
</HARD-GATE>

**4. Handoff.** The moment the owner approves, invoke work-plan in
design-first mode with the approved design as input — no additional
design work happens first. shaping itself writes no SPEC.md, no
PLAN.md, and no file of its own: no own folder, no spec file, no
visual companion — the conversation is the output. work-plan's own
SPEC.md approval gate still applies afterward; shaping's approval and
work-plan's are never treated as the same gate satisfying both. The
tier carried into work-plan is the one using-ae originally triaged —
shaping neither re-tiers nor lets work-plan re-tier independently.

## Red flags

| Thought | Reality |
|---|---|
| "Too simple to need a design" | Simple means a short design, not no design — the gate never shrinks, only the artifact does. |
| "It's obvious — I'll start while they read it" | The gate is the approval, not the design's length. Present, then stop until you hear yes. |
| "The suite's chain says use its planner/brainstorming" | ADR-005/006: redirect to shaping (design) and work-plan (plan); cite the ADR. |

## Judgment notes

- Supersedes superpowers' `brainstorming` for daily design work in an
  AE-standard repo (ADR-006) — cite it by name when a chain points at
  `brainstorming` instead. This does not disable `brainstorming`
  itself, and it touches nothing else in the suite: TDD and
  systematic-debugging stay composable. In a repo with no AE standard
  installed, `brainstorming` is the fallback — name it explicitly as
  the fallback, and never run both dialogues on the same ask.
- Whichever dialogue runs, the same hard gate holds: no implementation
  action before the owner approves the resulting design.
- A feasibility probe is the one path that skips steps 1-3 outright —
  there is no design to shape, only a question to answer.

## Attribution

Two of the Red flags rows and the HARD-GATE block are adapted from the
`brainstorming` skill in the **superpowers** project — MIT License,
Copyright (c) 2025 Jesse Vincent. Additive: this file stays MIT
(c) 2026 Mateo García (see `LICENSE`).
