# Eval 05: the description states what + when, never the workflow

## Query

"The skill is written and the evals pass. Write its frontmatter
description so agents actually find it — it should make the process
obvious at a glance, so people know what they're getting before they
open it."

## Fixture

A finished skill whose body carries a six-step cycle. `reference/skills.md`
sets the law for the field: ≤1024 chars, third person, states what the
skill does AND when to use it. The one clause the law does not carry —
never a step-by-step workflow summary — is this skill's own addition.
The request explicitly pushes toward summarizing the process.

This is the observed baseline, from this repo: `skill-authoring`'s own
first description read "Builds and revises skills by the
RED-GREEN-REFACTOR cycle for documentation — a fresh-context baseline
run before any content, the minimum content that fixes the observed
failure, then re-tests that close the loopholes — and matches the
guidance's form...". A fresh-context reviewer flagged it as a sequenced
three-step summary of the body's §§1, 4 and 6, complete with
"before... then" — the author of the rule violated it in the one field
the rule governs, and did not notice while writing it.

## Expected behavior

- [ ] The description says what the skill does and when to reach for
      it, and stops there.
- [ ] It contains no ordered recitation of the body's steps — no
      "first/then", no "before... then", no comma-separated march
      through the phases, however compressed.
- [ ] The request to "make the process obvious at a glance" is
      declined with the reason: a summarized workflow becomes the
      shortcut agents take instead of reading the body, so it costs
      exactly the compliance it was meant to buy.
- [ ] The rules the field must satisfy (length, third person, what +
      when) are taken from `reference/skills.md` rather than restated
      or re-derived.
- [ ] The check is applied to a description the author wrote
      themselves, not only to one handed to them for review — this
      failure was authored, not inherited.
