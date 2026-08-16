<!-- lint fixture: minimal repo fully compliant with AE/2.0. -->
# v2-clean-fixture

Standard: AE/2.0

Small demo service, plain Make toolchain.

Tiers: S direct+verify · M lane+plan · L four files+feature list — doubt → higher.

## Commands

- `make check` # not verified

## Gotchas

- First boot takes ~40s while models load; don't assume a hang.

## Hard constraints

- Never run the destructive reset script without explicit human approval.
