<!-- lint fixture: identical shape to lanes-accum-ok but work/ holds 6 lanes
     — the upper half of the accumulation boundary (MAT-112): 5 passes, 6
     fails. One lane sits in the design-first approval window (SPEC.md and
     a marker-carrying PROGRESS.md, no PLAN.md); it still counts toward
     accumulation — the count measures accumulation, not validity — while
     `lane-incomplete` stays quiet for it. -->
# lanes-accum-over-fixture

Standard: AE/1.4.2

Small demo repo with six lanes still open in work/, one mid design-first
approval window.

## Commands

- `make check` # not verified
