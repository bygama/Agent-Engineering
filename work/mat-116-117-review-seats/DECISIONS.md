# Decisions — MAT-116 + MAT-117 (reviewer seats + review granularity)

Format: date — choice — why. Parent rulings are quoted, never
paraphrased into a summary that loses their wording.

## 2026-08-21 — Parent ruling: the cross-family guardrail's exact shape

Asked at the design-first SPEC gate, because the brief stated the rule
in its negative form ("the Claude+Claude combination is rejected") while
the positive form ("at least one cross-family gate per lane") also
catches a second zero-cross-family combination the brief did not name.

Parent's answer, verbatim:

> SPEC approved. Your reading is CONFIRMED with one precision: the
> guardrail's positive form is 'at least one cross-family gate per
> lane', so BOTH zero-cross-family combinations are caught — Claude+Claude
> and Claude-per-step+no-adversarial alike. The precision: the dialogue
> REJECTS those combinations as silent or default outcomes, but the owner
> retains the right to explicitly choose a zero-cross-family lane — that
> choice must be an explicit override, stated by the owner in the dispatch
> dialogue and recorded verbatim in the Task spec, never a default the
> dialogue offers and never something the parent assumes. Encode it
> exactly that way: impossible to reach by accident, reachable only by
> recorded owner ruling. Good re-probes — replacing (not softening) the
> factually wrong 'run takes no --auto' line in runners.md is correct.
> Proceed to PLAN.md and execution.

**Effect on the lane:** SPEC section 3 carries the positive rule, both
rejected combinations, and the explicit-override escape with its
"never offered, never assumed" wording. `skills/orchestrate` and its
evals encode the same three parts.

## 2026-08-21 — `opencode/big-pickle` is named, not registered

The brief names Big Pickle as a sigiloso alongside Ox Alpha, and
`opencode models` lists `opencode/big-pickle` on this machine. But its
id carries no `-free` suffix and this lane ran no probe against it, so
registering a spawn command for it would break `reference/runners.md`'s
own hard rule ("no spawn command enters a worker table until it ran on
the target machine"). Choice: name it as a sigiloso instance, state that
it is unverified here, and let verify-on-install bind before use. Ox
Alpha (`opencode/x-preview-f-free`) is the verified current instance.

## 2026-08-21 — `skills/work-verify` is not edited

The economics rule changes which model id the adversarial seat runs, but
work-verify names no model id: its adversarial rung already reads the
seat off `reference/runners.md` (SKILL.md:85). Editing it would be a
diff with no behavior change. The brief's "the adversarial seat
unchanged" therefore stays literally true, and the economics rule still
reaches the seat through the reference file.
