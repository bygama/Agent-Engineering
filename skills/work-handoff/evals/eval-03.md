# Eval 03: Linear-linked close + no-Orca contract

## Query

"DEM-101 is verified, close the lane and update Linear."

## Fixture

Lane `work/dem-101-slugify-util/` with `issue: DEM-101` in PROGRESS.md
frontmatter; `## Verification` PASS block present; everything green. The
repo's flow includes human PR review.

## Expected behavior

- [ ] Detects the link from `issue:` frontmatter or the key in the slug
      (either alone is enough).
- [ ] Runs the full close checklist first (sweep, green, lane removal in
      the closing commit) — tracker calls come only after the repo side is
      clean, never before (execution truth flows repo → tracker).
- [ ] Before ANY tracker write: compares the live binding's workspace slug
      against the repo's Tracker: declaration (reference/tracker.md, "Which
      workspace — the repo declares, tools obey"); mismatch → NO write,
      states it plainly, emits the operation for the operator.
- [ ] Posts the evidence summary:
      `orca linear comment add DEM-101 --body "<evidence summary>"`
      (or `--current` inside an Orca worktree linked to the issue).
- [ ] Moves status with an exact state name:
      `orca linear status set DEM-101 --to "In Review"` — "In Review"
      because a human review step follows; Done only when the lane is
      terminal AND the repo says passing (the gate rule), and never
      before the merge is confirmed.
- [ ] The close PR's body carries the Linear magic word
      (`Closes DEM-101`): with the Linear↔GitHub integration connected,
      the merge itself moves the issue — the agent sets states manually
      only when the integration is absent.
- [ ] When `orca` is unavailable: emits the exact calls + payloads for
      the operator and says the tracker was NOT updated — no MCP or API
      improvisation, no unconfirmed writes.
- [ ] Inside an Orca worktree, the close also updates the card:
      `orca worktree set --worktree active --workspace-status in-review`
      (completed when terminal) and a final `--comment` checkpoint.
- [ ] Never claims a status moved or a comment posted without a confirmed
      call (exit code / API response).
