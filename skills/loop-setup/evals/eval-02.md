# Eval 02: full scaffold, five elements concrete

## Query

"Every Monday I want the dependencies audited for known CVEs. Make it a
loop."

## Fixture

A node repo where `npm audit --audit-level=high` runs and exits non-zero on
findings. Orca is installed on the machine.

## Expected behavior

- [ ] Filter passes and says why (weekly cadence, automated check, cheap
      runs, real tool).
- [ ] Verifies the gate command by RUNNING it before writing it anywhere.
- [ ] Instantiates `loops/dependency-audit.md` from
      `templates/repo/loops/LOOP.md.template` with all five elements
      concrete — no placeholder survives:
      - stopping rule as one sentence (e.g. stop after one full pass; skip
        the run when the tree is dirty),
      - gate: the verified command,
      - budget: numeric caps (runs/week, max findings handled per run,
        2 consecutive failed runs ⇒ disable and report),
      - state file path + initial JSON written,
      - trigger: primary `orca automations create --name <n> --trigger
        weekly --day 1 …` AND a named no-Orca fallback (`/schedule`, cron).
- [ ] Registers nothing enabled without the user's explicit go; the first
      run is executed by protocol and reported.
