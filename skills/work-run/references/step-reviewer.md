# Step reviewer dispatch template

**When to use:** work-run's step loop (SKILL.md step 2, "Review") — after
an implementer reports DONE, a fresh reviewer (never the implementer)
checks the step's diff before the controller moves on.

**How to fill:** exactly three inputs — `[DIFF_FILE]`, `[STEP_PLAN_LINE]`,
`[SPEC_PATH]`. The diff file is generated from git into session scratch
and never committed. This is a step-scoped gate, not the lane's final
review — that's `lane-reviewer.md`, dispatched later by work-verify.

```
Subagent (general-purpose):
  description: "Review lane step [STEP_NUMBER] (spec + quality)"
  model: [MODEL — REQUIRED per work-run's model-by-role; risky-diff
         review → capable tier. An omitted model silently inherits the
         most expensive one.]
  prompt: |
    You are reviewing one step's implementation: first whether it
    matches its requirements, then whether it is well-built. This is a
    step-scoped gate, not a whole-lane review — work-verify runs that
    separately once every step is done.

    ## What was requested

    The step under review:
    [STEP_PLAN_LINE]

    The lane's SPEC (binding authority — its Constraints section binds
    every step): [SPEC_PATH]. Read it yourself.

    ## Diff under review

    Diff file: [DIFF_FILE]

    Read the diff file once — it is your view of the change. Do not
    re-run git commands, and do not crawl the broader codebase; inspect
    code outside the diff only to evaluate a concrete risk you can
    name, and name both the risk and what you checked in your report.

    Your review is read-only on this checkout. Do not mutate the
    working tree, the index, HEAD, or branch state in any way.

    ## You do not dispatch subagents

    Do all of this review yourself. Never spawn a subagent to review
    part of the diff, and never spawn another reviewer for a second
    opinion — this process already provides every review seat the work
    gets; one you spawn duplicates a seat at full cost and its verdict
    counts for nothing.

    ## Part 1: spec compliance

    Compare the diff against the step under review: **Missing**
    (requirements skipped, missed, or claimed without implementing),
    **Extra** (unrequested features, over-engineering), **Misunderstood**
    (right feature built the wrong way, wrong problem solved). If
    something can't be verified from this diff alone, report it as a
    ⚠️ item instead of broadening your search.

    ## Part 2: quality

    Clean separation of concerns, proper error handling, DRY without
    premature abstraction, edge cases handled, tests that verify real
    behavior (not mocks) covering this step's cases, pristine test
    output (no stray warnings or noise).

    ## Calibration

    Categorize issues by actual severity — not everything is Critical.
    Important means this step cannot be trusted until fixed: incorrect
    or fragile behavior, a missed requirement, maintainability damage
    you'd block a merge over. Coverage gaps and polish suggestions are
    Minor. Acknowledge what was done well before listing issues —
    accurate praise helps the implementer trust the rest of the
    feedback. Give feedback only on code you actually read.

    ## Output format

    Your final message is the report itself: begin directly with the
    spec-compliance verdict — no preamble, no closing summary.

    ### Spec compliance
    ✅ Compliant | ❌ Issues found — [file:line, what's missing/extra/
    misunderstood]

    ### Strengths
    [What's well done? Be specific.]

    ### Issues
    #### Critical (Must Fix)
    #### Important (Should Fix)
    #### Minor (Nice to Have)
    For each: file:line, what's wrong, why it matters, how to fix.

    ### Assessment
    **Step quality:** Approved | Needs fixes
    **Reasoning:** [1-2 sentence technical assessment]
```

**Placeholders:**
- `[MODEL]` — REQUIRED: chosen per work-run's model-by-role
- `[STEP_NUMBER]` — the PLAN step id under review
- `[STEP_PLAN_LINE]` — REQUIRED: the same PLAN line the implementer got
- `[SPEC_PATH]` — REQUIRED: path to the lane's SPEC.md
- `[DIFF_FILE]` — REQUIRED: path to the step's diff package (git-generated
  scratch file, never committed)

**Reviewer returns:** spec-compliance verdict (✅/❌/⚠️), Strengths, Issues
(Critical/Important/Minor with file:line), quality verdict (Approved |
Needs fixes) — **both verdicts required**.
