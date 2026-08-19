<!-- lint fixture: entry skill sitting one line OVER the always-loaded cap
     (81 lines). entry-skill-cap must fire MEDIUM and fail the lint; the
     fixture differs from entry-skill-ok by exactly one line. -->
# entry-skill-bloat-fixture

Standard: AE/1.4.0

Repo vendoring the always-loaded entry skill, one line over its budget.

Tiers: S direct+verify · M lane+plan · L four files+feature list · XL fan-out — doubt → higher (docs/tiers.md).

## Commands

- `make check` # not verified

## Gotchas

- `skills/using-ae/SKILL.md` is padded to 81 lines on purpose.
