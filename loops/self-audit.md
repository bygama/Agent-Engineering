# Loop: self-audit

Weekly dogfooding audit of this repo: the standard must keep passing its
own checks, on a cadence, not just at merge time.

## Loop filter (why this qualifies)

- Repeats: weekly (Monday 09:00)
- Automated check: self-lint + every test suite (exit codes)
- Waste absorbed: one read-only run per week; empty findings cost minutes
- Real tools: node, git — both required by the repo anyway

## Stopping rule

Stop after one full pass (gate + dogfooding checks + report); skip the run
when the working tree is dirty or not on `main`.

## Gate

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` — verified 2026-08-17, exit 0
- `node tests/run-lint-tests.mjs` — verified 2026-08-16, exit 0
- `node tests/run-gen-tests.mjs` — verified 2026-08-16, exit 0
- `node tests/run-eval-checks.mjs` — verified 2026-08-16, exit 0

## Budget

- Runs: 1/week
- Items per run: report all findings; propose at most 1 fix (report-only —
  this loop never commits or merges)
- Failure budget: 2 consecutive failed runs ⇒ disable + report to a human

## State

- File: `loops/self-audit.state.json` — runtime artifact, gitignored;
  missing ⇒ the run initializes it.
- Shape: `{ "last_run": null, "processed": [], "consecutive_failures": 0 }`
- `processed` holds fingerprints of findings already reported; a finding
  seen again is flagged "reported before, still open", never re-reported
  as new.

## Trigger

- Primary: `orca automations create --name ae-self-audit --trigger weekly
  --day 1 --time 09:00 --prompt "Follow loops/self-audit.md in this repo"
  --provider claude --repo path:C:/Briar/repos/mine/Agent-Engineering`
  (registered enabled 2026-08-16; a fresh registration adds `--disabled`
  until the owner enables)
- Manual fallback: "run one iteration of `loops/self-audit.md`" to any
  agent — works with or without Orca (the gate and the checks are files
  and commands)
- Writes: report-only (this loop proposes fixes; humans and lanes apply
  them)

## Run protocol

1. Read the state file (missing ⇒ initialize with the shape above).
2. Precheck: `git status --porcelain --untracked-files=no` non-empty, or
   branch ≠ `main` ⇒ skip.
3. Run the gate commands; collect any findings.
4. Dogfooding checks per `skills/ae-audit` dogfooding mode: stamp ==
   newest CHANGELOG entry; how-it-works coverage (every top-level dir and
   skill has a current section); phase-tag honesty.
5. Docs sweep: run one iteration of `.claude/skills/docs-sweep` (its
   battery lives in `references/patterns.md`). Report-only here per the
   Writes line — sweep findings join the report as proposals.
6. Report findings (new vs "reported before, still open" via `processed`);
   propose at most 1 fix as a lane suggestion.
7. Update state (`last_run`, fingerprints, failure count); stop.
