# Step 7 review — `docs/how-it-works/standard-lifecycle.md`

### Spec compliance

✅ **Compliant.** Both halves of PLAN step 7 are done as the SPEC
(`work/mat-111-deglobal/SPEC.md`, item 3 bullet 5 and item 5 bullet 2)
specifies them.

- **Half A** — `docs/how-it-works/standard-lifecycle.md:23-26`: the dead
  `global/hooks/README.md` pointer now reads `reference/global-layer.md`.
  Verified by reading the target: `reference/global-layer.md:52-91`
  (`## SessionStart hook wiring`) carries the `settings.json` entry shape
  plus both notes the SPEC required the recipe to keep — the hook is
  optional (`:85-87`) and the path must be absolute because runners do no
  expansion, MAT-31 (`:82-84`). The sentence's promise ("detail: …") is
  honored by the new target; the old one held the same material.
- **Half B** — judged, not edited, reading (ii); recorded in
  `work/mat-111-deglobal/DECISIONS.md:137-182`.
- **Scope** — the diff touches exactly two files, and the chapter's only
  hunk is the 3 lines at `:20-26`. Independently confirmed by
  `grep -n -i 'global' docs/how-it-works/standard-lifecycle.md`: three
  hits only — `:23` ("global layer", the layer's name), `:26` (the new
  pointer), `:172` (the judged enumeration). Nothing else in the chapter
  moved.
- **Gates** — I re-ran the self-lint myself rather than trusting the
  PROGRESS transcript: `node scripts/agent-lint.mjs . --ignore
  tests,templates,examples` → `0 high, 0 medium, 0 low — PASS`. The
  step's acceptance command also exits 0 (but see Minor 3 on what that
  proves).

---

### The half-B judgment — tested, and it holds

I argued the losing side first. The strongest case for **dropping**
`global/` is not the one the implementer rebutted, so here it is at full
strength:

> "The five surfaces **a consumer receives**" does not mean "directories
> a consumer repo contains" — `ae-init` installs none of `skills/`,
> `reference/`, `templates/` or `global/` into a consumer (`README.md`
> and `architecture.md:65-67` are explicit that `templates/repo/` is the
> only directory whose content ever leaves this repo). So the five must
> be **this repo's own** top-level directories, sorted by "ships
> outward" against "is a record". And the paragraph's exemption list —
> `docs/plans/`, `docs/adrs/`, `CHANGELOG.md`, `examples/`
> (`:180-183`) — is unambiguously this repo's furniture: a consumer has
> no `docs/plans/` and no `examples/`. That register drags the whole
> paragraph toward "this repo's directories", and this repo no longer
> has a `global/`.

That is a genuinely better argument than "the word *consumer* appears",
and it still loses, on three grounds:

1. **Mechanism.** `SHIPPED_SURFACE` (`scripts/agent-lint.mjs:354`) is
   matched against relative paths in *whatever repo agent-lint is
   pointed at* — and agent-lint is a shipped check, run by consumers on
   their own repos, not a self-lint-only script. Every name in the
   paragraph is a path-class predicate evaluated per-linted-repo. So the
   exemption list argues the *opposite* of what the losing side wants:
   `examples/` is skipped in any repo, by falling outside the regex, not
   because this repo happens to have one. Included classes and exempted
   classes are the same kind of thing, and that kind is "path class".
2. **Grammar.** The sentence's predicate is "have to read true on any
   machine, so a path anchored to one machine's disk layout is a defect
   there". It asserts a norm over content found at those paths. It never
   asserts that this repo contains a `global/`. Existence is not in its
   truth condition — "carrots, peas and beans must be washed" does not
   go false in a kitchen with no beans.
3. **Doc-code coupling.** The surrounding passage is the narration of
   one check's design decisions (why `medium` and not `low`, why exactly
   three classes, why records are exempt). Its fidelity target is the
   code. The code says five with `global/` in it; the SPEC fences
   `scripts/agent-lint.mjs` from change (SPEC item 5 bullet 3, and
   `DECISIONS.md:76-90`). Writing "four surfaces" would make the chapter
   contradict the check it exists to explain, and would tell a reader
   whose repo vendors a `global/` that it is not scanned, when it is.

The SPEC's own test — "drop it ONLY if the sentence enumerates *this
repo's own* directories **and would read false otherwise**" — is a
conjunction, and the second conjunct fails even if you grant the first.
Reading (ii) is correct. **Do not edit the sentence.**

The DECISIONS entry's supporting citations are accurate, not decorative
— I checked each: `agent-lint.mjs:354` is exactly the `SHIPPED_SURFACE`
line; `agent-lint.mjs:325-326` is exactly the comment with the identical
"five surfaces a consumer receives" phrasing; `README.md:289-295` and
`architecture.md:56-58` say what the entry claims they say. The quoted
sentence is verbatim, and `:170-173` is the correct span (the brief's
`:171-173` clips the leading "The" that ends `:170`).

### The one-word repair — "wires" → "can wire"

- **Necessary:** yes. With `global/` deleted, the standard ships no hook
  script, so an unqualified "the global layer **wires** it as a
  SessionStart hook" asserts plumbing this repo no longer provides. The
  chapter is the surface the house rule requires a structural change to
  update in the same change (`AGENTS.md`, Hard constraints).
- **Sufficient:** yes. I read the rest of the sentence against the new
  state: "that wiring is optional plumbing, not a dependency: the skill
  still triggers by its own description with no hook at all" is true
  independent of what this repo ships, and matches
  `reference/global-layer.md:85-87` word for word in substance. Nothing
  else in the sentence claims shipped plumbing.
- **In scope:** yes. One word, inside the sentence the step was already
  editing, repairing a falsehood this lane's own deletion created —
  smaller than leaving it and opening a follow-up. It also lands the
  chapter on the same register as the two surfaces earlier steps already
  rewrote (`README.md:289-295`, `architecture.md:56-58`), so the three
  now agree that the wiring is a recipe rather than shipped plumbing.

### Was the judgment recorded honestly?

Yes, and the record is better than the gate required. `DECISIONS.md:137`
opens `## 2026-08-20 — Step 7 judgment: the five-surface sentence STAYS
as written`, quotes the sentence in a blockquote, names reading (ii)
explicitly, gives three reasons in the order they decided it, and closes
by naming the half-A edit and the one-word repair as the only changes.
It also fills the promise left by the earlier placeholder at
`DECISIONS.md:91-98`.

The implementer did not lean on the weak acceptance grep: `PROGRESS.md`
step 7 flags the weakness unprompted — "that grep is weak — `DECISIONS.md`
already contained the word `standard-lifecycle` before this step, so
exit 0 is no evidence the judgment was recorded" — and then names the
entry that does constitute the evidence. That is the behavior the gate
was hoping for and could not enforce.

---

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

None.

#### Minor (Nice to Have)

1. **`work/mat-111-deglobal/DECISIONS.md:95-98`** — the earlier
   placeholder still says the five-surface verdict lives "in PROGRESS
   step 7". The verdict is now also a full DECISIONS entry at `:137`.
   Harmless, but a reader following the placeholder is sent to the
   thinner of the two records. Fix: append "— recorded in full below"
   to that bullet. Lane bookkeeping only; not worth a fix loop on its
   own, fold it into the next lane touch if one happens.
2. **Follow-up candidate, not a defect:** with this repo's `global/`
   gone and `bygama/workstation` carrying its personal layer under
   `claude/`, no known repo actually vendors a `global/` directory, so
   the `global` alternative in `SHIPPED_SURFACE` may now be vestigial.
   Removing it is a *check* change — version bump, explicitly out of
   scope here (SPEC "Out of scope"), and the SPEC fences the script.
   Worth a ticket, not an edit in this lane. Note that if that ticket
   ever lands, this chapter sentence moves with it — which is itself
   evidence the sentence tracks the check, i.e. reading (ii).
3. **Note for work-verify, so the lane close does not trip:** the SPEC's
   Verification line "no live (non-record, non-fenced) surface greps for
   `global/` as a path in this repo" cannot be run literally — the
   untouched `scripts/agent-lint.mjs` (a live, unfenced surface) carries
   `global/` in the regex and its comment, as does this chapter at
   `:172` by the ruling just upheld, plus the two fenced files under
   Rulings B and C. The clause's intent is "no live surface *asserts
   this repo has* a `global/` directory". Apply it with those documented
   exemptions or it will read as a failure.
4. **Outside this step, FYI for the lead:**
   `docs/how-it-works/architecture.md:47` is a single ~137-character
   line ("global layer, orca, tracker, runners, design-md, skill
   authoring). Each file is a distillation, not a mirror: ≤120 lines,
   a") — an unrewrapped join left by the architecture.md step, against
   the file's ~76-column prose wrap. Cosmetic, no gate catches it, and
   not step 7's to fix.

---

### Assessment

**Step quality:** Approved

**Reasoning:** Half A repoints at a target that genuinely carries the
wiring detail the sentence promises, the one-word truth repair is
necessary, sufficient and minimal, and the half-B ruling survives the
strongest counter-argument I could build against it — the enumeration is
a path-class narration of a check that still contains `global/`, so
editing it would add a falsehood rather than remove one. The judgment is
recorded in `DECISIONS.md` with accurate, verifiable citations, and the
implementer disclosed the acceptance grep's weakness instead of hiding
behind it.
