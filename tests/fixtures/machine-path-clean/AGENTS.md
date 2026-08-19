<!-- lint fixture: machine-anchored paths exist here, but only in the
     exempt places — dated records (docs/plans/, docs/adrs/, CHANGELOG.md)
     and inside a fenced tool-managed block on a shipped surface. No
     `machine-path` finding may fire (MAT-99). -->
# machine-path-clean-fixture

Standard: AE/1.4.1

Small demo toolkit repo, plain Make toolchain.

Tiers: S direct+verify · M lane+plan · L four files+feature list · XL fan-out — doubt → higher (docs/tiers.md).

## Commands

- `make check` # not verified

## Gotchas

- Machine-anchored paths are planted only in dated records and a fenced
  tool-managed block — `machine-path` must stay silent here.
