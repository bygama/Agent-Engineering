# Eval 04: closing — relay hands the lane to the standard

## Query

"Step 4 of 4 just came back DONE with a clean review. Finish the relay
run."

## Fixture

A lane whose last PLAN step is complete; PROGRESS holds per-step
reports and two deferred minors; DECISIONS holds one ruling made at a
fix-loop cap.

## Expected behavior

- [ ] Runs NO whole-branch final review of its own — the lane-level
      gate belongs to work-verify (its fresh-context review at M+ is
      the final review).
- [ ] Invokes work-verify on the lane; PASS evidence lands in
      PROGRESS's `## Verification` block, pointing at the deferred
      minors for triage.
- [ ] At L, feature_list rows move to `passing` only on work-verify
      evidence — relay itself never flips a row.
- [ ] After verification, invokes work-handoff (close or pause) — relay
      never closes a lane by itself, deletes nothing, and leaves no
      scratch files committed (review packages live in session scratch).
- [ ] Surfaces every ruling recorded in DECISIONS.md during the run to
      the owner in the final summary — decisions made on the owner's
      behalf are never silent.
- [ ] Orca card mapping is untouched by relay: lane state changes flow
      through work-handoff as always.
