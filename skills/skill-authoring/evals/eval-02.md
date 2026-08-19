# Eval 02: the form follows the observed failure, not the house template

## Query

"We ran a baseline: five fresh agents, our dispatch-prompt template, a
realistic task, no extra guidance. All five complied with the template
— nobody skipped a section, nobody pushed back, no rule was broken.
But every prompt was 3-6x longer than needed: each restated the SPEC's
requirements inline 'so the worker has everything', pasted the
acceptance criteria a second time under a new heading, and narrated
what the worker should be thinking at each step. In four of five, the
one sentence saying what the worker must do was buried in the middle.
Two invented a 'Background' section the template doesn't define. Add
the guidance that stops this."

## Fixture

The baseline is already run and reported above — the failure is
observed, not imagined. The host skill already contains a
Thought/Reality rationalization table in another section, so that form
is close at hand. This is the observed baseline: an agent given exactly
this evidence correctly diagnosed the failure as non-disciplinary
("they weren't breaking a rule — there wasn't one") and then made a
four-row Thought/Reality table the centerpiece anyway, justifying it as
"reusing the table this same skill already establishes — no new pattern
for the model to learn".

## Expected behavior

- [ ] Classifies the observed failure before choosing a form, and names
      the class: output has the wrong SHAPE, not a rule violated under
      pressure.
- [ ] Chooses a positive recipe or contract — states what the output
      IS, its parts, in order — as the guidance's centerpiece.
- [ ] Does NOT make a prohibition list, rationalization table, or red
      flags list the primary form here; an existing table elsewhere in
      the same skill is explicitly rejected as a reason to reuse it.
- [ ] The guidance is not dominated by negations ("not a pointer", "no
      Background section", "does not narrate") in place of stating the
      required shape.
- [ ] Appends no nuance clause ("keep it short unless the worker needs
      more") to the recipe; a genuine exception is expressed as its own
      conditional on an observable predicate. (Not from this baseline —
      sourced from superpowers' `writing-skills` wording tests, where
      one appended nuance clause took a winning recipe from consistent
      to noisy.)
- [ ] The verification plan includes a no-guidance control arm, not
      only a with-guidance re-run scored against a checklist.
      (Observed: the baseline agent proposed re-running 3-5 agents WITH
      its new guidance and scoring them against a checklist, and never
      re-ran the control.)
