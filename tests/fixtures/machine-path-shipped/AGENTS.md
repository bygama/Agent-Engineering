<!-- lint fixture: machine-anchored paths planted on all three shipped
     surfaces (skills/, reference/, templates/) — one per pattern class —
     plus benign lookalikes on those same surfaces that must appear in no
     finding (MAT-99). -->
# machine-path-shipped-fixture

Standard: AE/1.4.1

Small demo toolkit repo, plain Make toolchain.

Tiers: S direct+verify · M lane+plan · L four files+feature list · XL fan-out — doubt → higher (docs/tiers.md).

## Commands

- `make check` # not verified

## Gotchas

- Machine-anchored paths are planted on purpose in skills/, reference/,
  and templates/ — this fixture must fail on `machine-path` only.
