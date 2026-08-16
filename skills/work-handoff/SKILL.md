---
name: work-handoff
description: Closes or pauses a unit of work with a clean-state exit — verification evidence gated, debris swept, PROGRESS truthful, lane committed, and tracker status/comment posted when the lane is Linear-linked. Use when finishing a task, ending a session mid-work, handing a lane to another agent or person, or when a verified lane is ready to close.
---

# Work handoff

A handoff with red tests is not a handoff — it is a trap for the next
session. This skill has exactly two honest exits: **close** (the work is
done and proven) and **pause** (the work continues, and the lane says
exactly where it stands). Everything else is a fake close, and it refuses
those.

## Workflow

Copy this checklist and tick items off:

```
Handoff progress:
- [ ] 1. Pick the mode (close | pause)
- [ ] 2. Debris sweep
- [ ] 3. State check (mode-specific)
- [ ] 4. PROGRESS + DECISIONS truthful
- [ ] 5. Commit (close: remove the lane)
- [ ] 6. Tracker step (only when Linear-linked)
- [ ] 7. Report
```

**1. Mode.** Close requires the gate: the lane's PROGRESS.md has a
`## Verification` block, current for the final state of the work, verdict
PASS (written by `work-verify`). No block, or work changed since it →
either run work-verify now (its own step, its own reviewer seat — never
self-certified inline) or take the pause path. When the user insists on
closing without evidence, refuse and offer the pause handoff instead.

**2. Debris sweep (both modes).** Remove what this effort scattered: debug
files and logs, commented-out blocks, stray TODOs, scratch files, dead
feature flags, leftover `{{PLACEHOLDER}}` text. List what was checked. If
something must stay, the user says so explicitly and PROGRESS records why.

**3. State check.**

- **Close:** build green, tests green, and the repo's documented startup
  path works (run them — quote the evidence, never assume from the earlier
  verify run if files changed since).
- **Pause:** red is allowed only as a *recorded blocker* — the failing
  command named in PROGRESS as part of "in progress", never silently.

**4. Truthful lane files.** PROGRESS.md sections reflect reality: Done only
what is proven done, In progress names the actual current state (including
any red test as the blocker), Next is concrete enough for a cold session to
resume. DECISIONS.md contains every choice made this effort (append-only).

**5. Commit.**

- **Close:** one closing commit that *removes the lane folder* — git
  history preserves the four files and the evidence; no orphan `work/`
  directory survives. Message names the outcome. (A repo convention may
  prefer archiving over deletion; deletion is the default.)
- **Pause:** commit the WIP on the lane's branch with an honest
  progress message. The lane folder SURVIVES — deleting a live lane loses
  the next session's state.

**6. Tracker step — only when Linear-linked.** Linked means `issue: <KEY>`
in a lane file's frontmatter or the key in the lane slug
(`work/dem-101-…/`). Runs strictly AFTER the repo side is clean: execution
truth flows repo → tracker, never ahead of it.

- **Close** — comment, then status (verified syntax):

  ```
  orca linear comment add <KEY> --body "<evidence summary: what shipped, commands + exits, commit hash>"
  orca linear status set <KEY> --to "In Review"
  ```

  Inside an Orca worktree created with `--linear-issue`, `--current`
  replaces the key. Multiline summaries: `--body-file -` from stdin.
  Target state: `"In Review"` when a human review/merge step follows;
  `"Done"` only when the lane is terminal AND the repo says passing — an
  issue never reaches Done ahead of the repo (the gate rule). State names
  must match the team's workflow exactly (`orca linear team states` lists
  them).
- **Pause** — no status change. An optional comment with the current state
  is fine; a state move is not.
- **Fallback ladder**, honest at every rung: no `orca` on PATH → the Linear
  MCP server's comment/status tools; no MCP either → emit the exact calls
  and payloads for the operator and state plainly that the tracker was NOT
  updated. Never report a post or a status move without a confirmed call
  (exit code or API response).

**7. Report.** What closed (or where it paused), the evidence summary, the
commit hash, and exactly what the tracker received — or the emitted calls
if nothing did.

## Judgment notes

- Refusal output is a list of blockers with file/line, not a lecture: the
  missing Verification block, each debris item, each red command.
- Pause is not failure — it is the honest state. The failure is a close
  that lies, or a pause that deletes the lane.
- WIP=1: a close frees the seat for the next lane; never open the next lane
  in the same breath without the handoff finishing first.
