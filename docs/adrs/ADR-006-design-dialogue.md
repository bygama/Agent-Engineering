# ADR-006: AE owns the design dialogue

Date: 2026-08-18
Status: Accepted

## Context

work-plan's own refusal case ("no design, genuine uncertainty") named
the way out of that refusal in writing: "point back at brainstorming as
the next step." That is friction the standard should not be producing
on its own: the one moment a raw ask most needs an AE-owned home —
before a lane even opens — pointed straight at an external suite
instead, contradicting the files-only adoption story (any agent that
reads files can follow the standard, without a suite as a hard
dependency). ADR-005 already established that AE owns every phase that
produces a durable artifact; the design dialogue produces none — its
output is the conversation itself, confirmed section by section, that
work-plan later turns into SPEC.md. That is exactly why it had stayed
composable so far. The friction here is different from ADR-004/005's:
not an artifact collision, but a phase the standard depends on (every
work-plan design-first call needs a design to start from) with no house
answer of its own.

## Decision

Add `skills/shaping`: the raw-ask-to-approved-design dialogue, adapted
from superpowers' `brainstorming` (questions one at a time, approaches
before design, sections confirmed one at a time) but consuming the tier
using-ae already triaged rather than re-deriving it, and writing no
artifact of its own — the approved design goes straight to work-plan
design-first. `brainstorming` joins the superseded list for daily design
work in an AE-standard repo, cited by name; it stays installed and is
the explicit fallback where no AE standard is present. This is narrower
than ADR-005: it supersedes one specific suite skill on observed
friction, not a category, and it does not extend to TDD or
systematic-debugging — those stay composable, untouched by this
decision (their eventual replacements, if any, are MAT-46/47's
question, not this one's).

## Consequences

- `reference/skills.md`: the intro's suite-example list drops
  `brainstorming` (TDD and systematic-debugging remain as the examples
  of thinking a suite still supplies); a new paragraph names the
  supersession and points here.
- `skills/work-plan/SKILL.md`'s "no design, genuine uncertainty"
  refusal now points at `shaping`, not `brainstorming`.
- `skills/using-ae/SKILL.md`'s map gains a `shaping` row for the design
  phase, alongside `work-plan`.
- `skills/shaping/evals/` and `skills/work-plan/evals/eval-05.md`
  encode the redirect and the fallback case (MAT-45, H1).

## Alternatives considered

- Leave `brainstorming` composable and only add `shaping` as an
  alternative agents could choose — rejected: two live dialogues for
  the same phase reproduces the exact ambiguity ADR-005 exists to
  remove; a suite's chain would still sometimes win by default.
- Supersede the whole suite the way ADR-005 could have but chose not to
  — rejected: TDD and systematic-debugging have no observed friction
  and no AE counterpart yet; superseding them now would be supersession
  by category, the thing ADR-005 explicitly rejected.
