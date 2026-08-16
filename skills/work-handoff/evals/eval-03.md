# Eval 03: Linear-linked close + fallback ladder

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
- [ ] Posts the evidence summary:
      `orca linear comment add DEM-101 --body "<evidence summary>"`
      (or `--current` inside an Orca worktree linked to the issue).
- [ ] Moves status with an exact state name:
      `orca linear status set DEM-101 --to "In Review"` — "In Review"
      because a human review step follows; Done only when the lane is
      terminal AND the repo says passing (the gate rule).
- [ ] When `orca` is unavailable: falls back to the Linear MCP server
      tools; when neither exists: emits the exact calls + payloads for the
      operator and says the tracker was NOT updated.
- [ ] Never claims a status moved or a comment posted without a confirmed
      call (exit code / API response).
