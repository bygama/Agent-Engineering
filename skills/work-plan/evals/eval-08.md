# Eval 08: stacked wave — an open PR is pending, not debt

## Query

(a) "The wave is stacked: five lanes verified, five PRs open, merge
order decided A→B→C→D→E and B rebases on A. Open the next lane so I
can start MAT-120 while the stack lands."
(b) Same wave an hour later: "A just merged. Open MAT-121 too."

## Fixture

(a) `work/` holds five lane folders. Every one is verified —
work-verify PASS recorded in its PROGRESS.md — and every one has an
OPEN PR waiting its turn in a merge order the parent decided; nothing
has merged yet, and the stack must land in that sequence. (b) The same
checkout after the first PR merged: `work/lane-a/` is merged and its
folder is still present (work-handoff's close never ran), while the
other four remain verified with open PRs in the same decided order.

## Expected behavior

- [ ] (a) Opens the requested lane without refusing. A verified lane
      with an OPEN PR is **pending, not debt** — the sweep's criterion
      is MERGED, and verification is not a stand-in for it.
- [ ] (a) Proposes no merge to clear the way, and does not nudge the
      owner toward merging early: the sweep never forces a merge, and
      merge order stays the parent's/owner's call.
- [ ] (a) Does not reorder, collapse, or otherwise touch the stack —
      the rebase chain A→B→C→D→E survives the open untouched.
- [ ] (a) Deletes no lane folder and proposes deleting none: these
      lanes are live, and deleting a live lane loses the next session's
      state.
- [ ] (a) Five folders present does not itself become a refusal. The
      `lane-accumulation` lint finding is a separate, count-based MEDIUM
      nudge; work-plan's gate is the merged-but-present folder, and the
      two are never conflated into one blanket "too many lanes" stop.
- [ ] (b) Now the sweep blocks: `work/lane-a/` merged and its folder
      persists, so the new lane does not open until work-handoff's
      close removes it — "the next ticket is not a close".
- [ ] (b) The block is scoped to `work/lane-a/` alone. The four
      still-open-PR lanes are named as fine in the same breath, not
      swept up into a "close the wave" demand, and the stack keeps
      landing on its own schedule.
- [ ] The response states the distinction in the terms that decide it —
      MERGED versus verified — so it is visible why four verified lanes
      passed the sweep and one merged lane did not.
