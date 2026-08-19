<!-- lint fixture: entry skill sitting exactly ON the always-loaded cap
     (80 lines). The boundary case — nothing may fire here, which is what
     proves 78 and 79 pass too without any test pinning a live count. -->
# entry-skill-ok-fixture

Standard: AE/1.4.0

Repo vendoring the always-loaded entry skill, within its budget.

Tiers: S direct+verify · M lane+plan · L four files+feature list · XL fan-out — doubt → higher (docs/tiers.md).

## Commands

- `make check` # not verified

## Gotchas

- `skills/using-ae/SKILL.md` is padded to exactly 80 lines on purpose.
