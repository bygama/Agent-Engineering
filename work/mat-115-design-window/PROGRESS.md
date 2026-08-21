---
issue: MAT-115
---
# The design-first approval window — progress

## Done

- **SPEC.md** written from the parent orchestrator's dispatch brief
  (work-plan design-first, step 1), then the lane **stopped** for owner
  approval.
- **The window was dogfooded, and the bug reproduced in it.** PROGRESS.md
  was written at the SPEC step carrying the marker this lane introduces —
  the exact behavior leg 1 adds to work-plan — so for the length of the
  approval wait this lane held SPEC.md + PROGRESS.md and no PLAN.md.
  During that window:

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-115-design-window
    MEDIUM work/mat-115-design-window/  lane missing PLAN.md  [lane-incomplete]
  0 high, 1 medium, 0 low — FAIL
  $ echo $?
  1
  ```

  MAT-115 observed on the lane that fixes it, not inferred from reading
  the source. It also confirms the SPEC's sharpening of the ticket's
  mitigating nuance: this lane was untracked at the time, and the finding
  fired anyway, because `agent-lint` walks the filesystem rather than the
  index.
- **Owner approval received** (parent orchestrator, 2026-08-21): SPEC
  approved as written, all judgment calls confirmed as the lane's own.
  Recorded in DECISIONS.md.
- **PLAN.md** written — six steps, every one `per-step`, with the marker
  and the fixture/case names fixed in the interface block so steps 3 and
  4 cannot drift apart. Writing PLAN.md **ends the approval window**, so
  the marker line was removed from this file: leaving it would have made
  PROGRESS.md state something untrue about the lane.
- **Reviewer seat verified live** before relying on it
  (`reference/runners.md` verify-on-install, work-run step 2): `opencode
  run --auto -m opencode/x-preview-f-free` returned the requested output
  one-shot, exit 0, in this worktree on 2026-08-21. Chain position 1 is
  alive; no degradation needed at settle time.
- **Step 1 — `skills/work-plan/evals/eval-05.md` amended, evals-first**
  (PLAN step 1): the existing design-first assertions (a) are untouched;
  gained two companions — the same SPEC.md turn also writes
  `work/<slug>/PROGRESS.md` under `## In progress` carrying the marker
  verbatim (quoted in full in the eval), and PLAN.md still does not
  appear alongside it. Added the negative for direct mode (b): it never
  writes the marker, because it has no approval window to declare.
  eval-05 was not duplicated — amended in place, per SPEC §1.

  ```
  $ grep -q 'STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md' skills/work-plan/evals/eval-05.md && echo MARKER_OK
  MARKER_OK
  $ grep -q 'direct' skills/work-plan/evals/eval-05.md && echo DIRECT_OK
  DIRECT_OK
  $ node tests/run-eval-checks.mjs
  ok   work-plan: 6 evals well-formed
  ... (all other skills ok)
  all eval checks passed
  $ echo $?
  0
  ```

- **Step 1 review — command-mode sigiloso (`opencode/x-preview-f-free`,
  chain position 1, no degradation), verdict verbatim:**

  > ### Spec compliance
  > Compliant — eval-05.md:38-48 implements exactly what the step requires:
  > amended in place (not duplicated), existing design-first assertions
  > untouched (diff context lines confirm), companion assertion added for the
  > same-turn PROGRESS.md write with the marker quoted in full under
  > `## In progress`, PLAN-absence re-asserted against the new artifact, and
  > the direct-mode negative placed correctly inside the (b) group. Marker
  > verified byte-for-byte via `cat -A`: pure ASCII, no em dash, exact match
  > to SPEC's fixed string. Acceptance command run: exit 0, all 13 eval
  > suites green ("work-plan: 6 evals well-formed"). Repo-wide grep confirms
  > the marker currently lives only in eval-05.md — no leakage into
  > unintended sites.
  >
  > ### Issues
  > #### Critical (Must Fix)
  > None.
  >
  > #### Important (Should Fix)
  > - **PLAN.md:166 (step 6 acceptance) vs this step's required content** —
  > step 6's gate counts files matching the marker under `skills`+`scripts`
  > and demands `-eq 2`. Once steps 2 and 4 land, three files will match:
  > `skills/work-plan/SKILL.md`, `skills/work-plan/evals/eval-05.md` (this
  > step, which the PLAN itself mandates quote the marker in full), and
  > `scripts/agent-lint.mjs`. The final gate is unsatisfiable as written.
  > Risk named, check made: repo-wide grep run (above) confirming eval-05.md
  > will be a third match site. Fix: this is a plan defect, not a defect in
  > this diff — route to the parent as an ask to amend step 6's accept (e.g.
  > exclude `evals/` from the grep path, since the intent "two
  > source-of-truth sites" means SKILL.md and agent-lint.mjs; the eval is an
  > assertion *about* the sites, not a site). No change to eval-05.md is
  > warranted.
  >
  > #### Minor (Nice to Have)
  > - eval-05.md:56-57 — the truncated prose reference
  > `` `STATE: design-first approval window...` `` re-types a partial marker
  > rather than pointing at the block above. Harmless today (full quote is 12
  > lines up), but a future editor skimming could mistake the truncated form
  > for the string. Could read "the marker quoted above" instead.
  >
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** The diff implements every element of the step —
  > amendment-not-duplication, preserved assertions, verbatim full-quote
  > marker (byte-verified ASCII), and the direct-mode negative — and its
  > acceptance gate exits 0. The one Important finding is an arithmetic
  > conflict in PLAN step 6's future gate caused by this step's mandated eval
  > quote; it requires a parent decision on the plan, not any change to this
  > step's output.

  **Controller response.** Approved, no fix round. The Important finding is
  a defect in this lane's own PLAN, not in the diff, and it resolves against
  the SPEC without a parent ask: the SPEC's phrase is "two **source-of-truth**
  sites", and an eval that quotes the marker to assert what "verbatim" means
  is an assertion about those sites, not a third one. Step 6's acceptance is
  amended to exclude `evals/` from the count (DECISIONS.md, 2026-08-21) —
  a correction to the gate's spelling, not to its claim. The Minor finding
  is recorded as deferred for work-verify's triage.

## In progress

- work-run executing PLAN steps 1-6 in order. Step 1 done; steps 2-6
  remain.

## Tried and failed

- The first `orca orchestration ask` for SPEC approval timed out at
  900 s with no answer (thread `msg_287612c3b824`). Resumed the **same**
  question by id rather than asking a duplicate; the parent answered on
  the resumed thread and explained the batch it had acked unread.

## Next

- Steps 1-6 per PLAN.md, then work-verify (M-tier DoD), then
  work-handoff, then the PR carrying `Closes MAT-115`.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
