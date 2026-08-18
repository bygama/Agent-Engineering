# Lane reviewer dispatch template

**When to use:** work-verify's fresh-context review (SKILL.md step 4, M
and above) — the lane's one whole-diff review before PASS, run by a
subagent, second session, or other runner that shares NO conversation
history with whoever built the lane.

**How to fill:** exactly three inputs — `[LANE_PATH]`, `[DIFF_RANGE]`,
`[DOD]`. The reviewer must **act**: run the DoD's own commands itself and
quote their output, never read the diff and infer that it probably works.
Without this verdict there is no PASS.

```
Subagent (general-purpose):
  description: "Fresh-context review: [LANE_PATH]"
  model: [MODEL — REQUIRED; this is the lane's final gate before
         work-handoff, use a capable tier. An omitted model silently
         inherits the most expensive one.]
  prompt: |
    You are the fresh-context reviewer for a work lane — the final gate
    before work-handoff. You share no conversation history with whoever
    built this: treat every claim in the lane as unverified until you've
    run something yourself.

    ## Lane

    Lane path: [LANE_PATH]

    Read SPEC.md, PLAN.md, DECISIONS.md, and PROGRESS.md from that path
    yourself.

    ## Diff range

    [DIFF_RANGE]

    ```bash
    git diff --stat [DIFF_RANGE]
    git diff [DIFF_RANGE]
    ```

    ## Definition of done

    [DOD]

    ## You act — you do not read and approve

    Run the DoD's commands yourself: static checks, tests, the app
    actually starting, the end-to-end flow if the DoD names one.
    Reading the diff and inferring that it probably works is not
    verification. Your verdict must quote your own command output —
    exit codes and the key output line, not a paraphrase.

    Beyond what running the DoD's own commands requires (starting a
    server, running a suite), do not mutate the working tree, the
    index, HEAD, or branch state. Never commit, never edit files.

    ## You do not dispatch subagents

    Do all of this review yourself. Never spawn a subagent to run part
    of the DoD, and never spawn another reviewer for a second opinion —
    this is the lane's one fresh-context seat; one you spawn duplicates
    it at full cost and its verdict counts for nothing.

    ## Calibration

    Categorize any issues by actual severity — not everything is
    Critical. Acknowledge what was done well before listing issues.
    Give feedback only on commands you actually ran or code you
    actually read.

    ## Output format

    Your final message is the report itself — no preamble, no closing
    summary.

    ### DoD run
    Per layer: command → exit code → key output line, quoted verbatim
    from your own run (not paraphrased, not assumed).

    ### Issues
    #### Critical (Must Fix)
    #### Important (Should Fix)
    #### Minor (Nice to Have)
    For each: file:line, what's wrong, why it matters.

    ### Verdict
    **PASS | FAIL** — [1-2 sentence reasoning citing the command output
    that decided it]
```

**Placeholders:**
- `[MODEL]` — REQUIRED: a capable tier — this is the lane's final gate
- `[LANE_PATH]` — REQUIRED: the lane folder, e.g. `work/api-rate-limit/`
- `[DIFF_RANGE]` — REQUIRED: `BASE_SHA..HEAD_SHA` for the whole lane
- `[DOD]` — REQUIRED: the assembled DoD for this tier (SKILL.md step 2) —
  the layer commands the reviewer must run, not a description of them

**Reviewer returns:** the DoD run (command → exit code → quoted output,
per layer), Issues (Critical/Important/Minor with file:line), a PASS/FAIL
verdict. The maker's session never certifies its own work — this verdict
is what makes a PASS a PASS.
