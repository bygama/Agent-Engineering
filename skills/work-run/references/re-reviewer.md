# Re-reviewer dispatch template

**When to use:** work-run's fix loop (SKILL.md step 2, "Fix loop, cap of
5") — one scoped re-review per round, after a fix dispatch. Not a fresh
review; the full review already happened in `step-reviewer.md`.

**How to fill:** `[FINDINGS]` (the Critical/Important findings and spec
gaps from the previous review, copied verbatim, one per bullet) and
`[FIX_DIFF_FILE]` (the fix diff only, git-generated scratch, never
committed). Minor findings never reach this template — they're recorded
in PROGRESS as deferred, not looped.

```
Subagent (general-purpose):
  description: "Re-review lane step [STEP_NUMBER] fix round [ROUND]"
  model: [MODEL — REQUIRED; scoped re-reviews of small fix diffs take a
         cheap-to-mid tier. An omitted model silently inherits the most
         expensive one.]
  prompt: |
    You are re-reviewing one fix round. A previous review produced
    findings; the implementer attempted to fix them. Verdict each
    finding and inspect the fix diff — nothing else.

    ## Findings under verification

    [FINDINGS]

    ## The fix

    Fix diff file: [FIX_DIFF_FILE]

    Read the diff file once — it is the fix commits' diff with
    surrounding context. Do not re-run git commands. Your review is
    read-only on this checkout: do not mutate the working tree, the
    index, HEAD, or branch state in any way.

    ## You do not dispatch subagents

    Do all of this review yourself. Never spawn a subagent to review
    part of the diff, and never spawn another reviewer for a second
    opinion — this process already provides every review seat the work
    gets; one you spawn duplicates a seat at full cost and its verdict
    counts for nothing.

    ## Scope

    Your scope is the findings list and the fix diff, nothing wider.
    Verdict every finding — "attempted" is not addressed, the specific
    defect must no longer exist. Inspect the fix diff for new problems
    the fix itself introduced. Do NOT re-review code the fix didn't
    touch: an issue entirely outside the fix diff goes under Out-of-Scope
    Observations — it does not block this round and does not extend the
    loop (work-verify's lane gate triages it later).

    ## Output format

    Your final message is the report itself: begin directly with the
    first finding's verdict — no preamble, no process narration.

    ### Finding verdicts
    For each finding, in order: **[finding one-liner]** — ADDRESSED |
    NOT ADDRESSED, with file:line evidence.

    ### New breakage in the fix diff
    Anything the fix itself broke or introduced, with severity
    (Critical/Important/Minor) and file:line. "None" if clean.

    ### Out-of-scope observations
    Issues noticed entirely outside the fix diff. Non-blocking. "None"
    if none.

    ### Verdict
    **Fix round:** All findings addressed, no new Critical/Important
    breakage | Findings remain open — list the open ones.
```

**Placeholders:**
- `[MODEL]` — REQUIRED: chosen per work-run's model-by-role
- `[STEP_NUMBER]` — the PLAN step id whose fix is under re-review
- `[ROUND]` — the fix-loop round number (1-5)
- `[FINDINGS]` — REQUIRED: prior review's Critical/Important findings and
  spec gaps, verbatim
- `[FIX_DIFF_FILE]` — REQUIRED: path to the fix diff only (not the whole
  step diff)

**Re-reviewer returns:** per-finding verdicts (ADDRESSED / NOT ADDRESSED),
new breakage in the fix diff, out-of-scope observations, a round verdict.
