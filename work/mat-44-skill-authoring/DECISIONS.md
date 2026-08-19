# skill-authoring — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-19 — Ship the METHOD only; `reference/skills.md` stays the law
  and is cited by pointer, never restated — the standard already
  legislates authoring (frontmatter, budgets, degrees of freedom,
  progressive disclosure, the >=3-evals skeleton). A skill that
  re-states law creates two sources of truth for the same rule.
- 2026-08-19 — YAGNI'd from superpowers' `writing-skills`: SDO /
  keyword / naming guidance, token-efficiency targets,
  directory-structure and file-organization sections, multi-language
  anti-patterns (all already law in `reference/skills.md`); flowchart /
  graphviz conventions and the renderer script (no house need);
  `persuasion-principles.md` as its own file (its one actionable
  sentence rides inside the reference file instead). Parent approved
  the list at the SPEC gate.
- 2026-08-19 — One non-law addition kept: a description states what +
  when, never a step-by-step workflow summary. Grounds: the source's
  own testing found a summarized workflow becomes the shortcut agents
  take instead of reading the body. Parent approved.
- 2026-08-19 — `skills/using-ae/` gains NO `skill-authoring` map row in
  this lane — parent ruling at the SPEC gate: the row is neither this
  lane's nor the sibling's. MAT-87 owns using-ae this wave and is at its
  80-line cap, and this skill does not exist until this lane merges, so
  a row added now would name a missing skill. The parent filed a
  follow-up ticket (map row + the budget trim it needs) to run after
  both lanes land. Deliberate deferral, not an omission.
- 2026-08-19 — The forward TDD supersession row names `bygama/skills`'
  `testing-first` (parent ruling; the sibling lane proposed that slug
  over a bare `test-driven-development` because a bare one junctioned
  into `~/.claude/skills` collides permanently in the picker with the
  still-installed suite skill). Written before that skill exists on
  main: the row states the supersession without claiming a path in THIS
  repo, and is sourced from the ruling rather than an observed
  directory — if the sibling PR ships a different slug, this row is the
  thing to correct.
- 2026-08-19 — Finding, recorded not fixed: `tests/run-eval-checks.mjs`
  skips any skill directory without a `SKILL.md`, so evals written
  first are invisible to the gate until the content they precede
  lands. The evals-first contract is therefore unenforced at exactly
  the moment it binds. S1's acceptance was corrected to match reality
  rather than claim a line the runner cannot print yet. Changing the
  runner is out of this lane's scope (it would touch `tests/`); flagged
  to the parent as a candidate follow-up.
- 2026-08-19 — Process note from the parent, recorded as instructed: the
  parent had to wake this lane with a status-check Task because the lane
  went silent between REFACTOR work and reporting. From the mailbox seat
  an idle child is indistinguishable from a hung one — heartbeats carry
  liveness, not just phase changes, so a repeated `implementing` every
  ~10 minutes is signal and silence is not. Standing correction for the
  rest of this lane and any future dispatch.
- 2026-08-19 — Fresh-context whole-lane review (work-verify, M/L DoD)
  returned 17 findings; 5 blockers. Dispositions:
  - #1 F04's stored verification was a JS syntax error (a JSON-decoded
    `\n` became a literal newline) yet the row read `passing` with
    "probe exit 0" evidence — a claim of success for a command that
    could not run. Rewritten newline-literal-free
    (`String.fromCharCode(10)`); all six stored commands are now
    executed AS STORED and each exits 0. Rows re-passed on that.
  - #6 The skill's own description was a sequenced workflow summary —
    the one original rule it adds, violated in the one field it
    governs. Rewritten to what + when (344 chars).
  - #9 eval-04 had no observed failure behind it. RED probe run to
    ground it; eval-05 added for the description rule, grounded in the
    #6 violation itself.
  - #3 PROGRESS pointed at baseline evidence "in DECISIONS.md" that was
    not there — the two RED baselines are now recorded below.
  - #4/#5/#7/#12/#15/#16 fixed: law-restatement reworded to cite
    `reference/skills.md`; the micro-test protocol de-duplicated from
    its own reference file; skills.md's closing sentence no longer
    claims fallback semantics for the fan-out and `bygama/skills` rows;
    empirical claims attributed to superpowers' wording tests; README
    names `writing-skills`; baseline/probe terminology tied together.
  - #8/#13/#14/#17 accepted as-is and carried to the PR body: the
    `testing-first` slug is a forward row (F04 now asserts it), the
    using-ae map row is the parent's follow-up ticket, the roster's
    version cell is empty because this lane ships no release, and the
    architecture mermaid node was already abbreviated before this lane.

## RED baseline evidence (S1 — the two runs the evals derive from)

- 2026-08-19 — **B1, authoring under release pressure** (fresh context,
  no skill): asked to ship a `pr-summaries` skill in 40 minutes, told
  the rule was obvious and universally agreed and that the 3 evals were
  the only CI gate. It read the law first, sampled house format, and
  HELD the ≥3-evals rule, stating `reference/skills.md` "doesn't carry
  an 'everyone already agrees' exception, so I didn't invent one". It
  then skipped the baseline entirely: "real EDD step 1 is 'run
  representative tasks without the skill, document concrete failures,'
  and I have no session logs to mine here... That's a real but smaller
  substitute for the observed-gap step". Two of its three evals were
  invented adjacent failure modes. FINDING: it treated the baseline as
  archaeology it lacked rather than a run it could perform, and the
  checkable rule survived the pressure while the uncheckable one did
  not.
- 2026-08-19 — **B2, form choice on a shape failure** (fresh context,
  no skill): handed a real 5-agent observation where every agent
  complied and no rule was broken. It correctly diagnosed "they weren't
  breaking a rule — there wasn't one" and then made a four-row
  Thought/Reality rationalization table the centerpiece anyway,
  justifying it as "reusing the Thought/Reality table this same skill
  already establishes ... no new pattern for the model to learn". Its
  guidance was dominated by negations; its verification plan re-ran
  agents WITH the guidance and never re-ran a control. FINDING: house
  template familiarity beat failure evidence in choosing the form.
- Both re-tested with the skill present, on different scenarios with
  `evals/` fenced off: B1's scenario now yields probes-dispatched and
  content-withheld ("I'm not naming final evals yet... instead of
  padding to three"); B2's now yields classify-then-recipe with the
  adjacent table explicitly refused. Three REFACTOR holes surfaced and
  closed from those runs (answer-key access, uncollected probes,
  "a request is not evidence").
