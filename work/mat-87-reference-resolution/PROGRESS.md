# mat-87-reference-resolution — progress

## Done

- Ticket MAT-87 read; tier M confirmed from the parent's brief.
- Both failure modes re-verified on this workstation before any file was
  written (evidence below, quoted verbatim from the run).
- SPEC.md written from the parent's shaped design (design-first mode) and
  APPROVED by the parent with one change — ruling 1, ≤78 lines.
- PLAN.md shaped: 4 steps, constraints block, evals before content.
- **Step 1 DONE** — `skills/using-ae/evals/eval-06.md` added: foreign-repo
  fixture (non-AE checkout, using-ae loaded through a junction), plus the
  copy-installed fall-through scenario. Grades the real-path-first walk,
  the ordered fall-through, and the say-so contract; names both failures
  (the `../../reference/` path, and inventing the cited content including
  its softer form). The existing five evals were not edited.
  Acceptance: `node tests/run-eval-checks.mjs` → exit 0,
  output `ok   using-ae: 6 evals well-formed`.

## In progress

- Step 2: the `## Reference paths` rule in `skills/using-ae/SKILL.md`.

## Tried and failed

- Nothing yet.

## Next

- Steps 1-4 of PLAN.md, then work-verify, then push + PR (`Closes MAT-87`).

## Reported to the parent (not fixed here — fenced files)

- **`docs/how-it-works/architecture.md` needs a line, sibling lane owns
  the file.** It is the primary narrator of the reference→skills edge this
  rule makes explicit: the `grounds` arrow at line 19
  (`reference/ -->|grounds| skills/`) and §`reference/` at line 39 both
  describe the reference layer as what the skills stand on, without ever
  saying how a skill running outside this repo reaches it. One sentence
  pointing at using-ae's `Reference paths` rule would close it. NOT edited
  here — the parent's brief fences the file.
- **`README.md` adoption line — DEFERRED by the parent's brief.** The
  ticket floats it as optional: the "Adopting AE on your own machine"
  section offers copy-installing the skill folders (option 2), which leaves
  no `reference/` anywhere, so it should say copy-installers clone
  `reference/` too or accept degraded citations. NOT written here.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

### Finding evidence — both failure modes, verified 2026-08-19

Failure mode 1, the naive relative walk (junctions do not re-resolve `..`
through the target):

```
C:\Users\mateo\.claude\skills\using-ae\..\..\reference\task-tiers.md
normalized: C:\Users\mateo\.claude\reference\task-tiers.md
exists: False
```

The correct walk — resolve the skill folder's REAL path first, then up to
the repo root:

```
real: C:\Briar\repos\mine\Agent-Engineering\skills\using-ae
repo root: C:\Briar\repos\mine\Agent-Engineering
ref: C:\Briar\repos\mine\Agent-Engineering\reference\task-tiers.md
exists: True
```

Corroborating live evidence that the runner hands a skill its LINK path,
not its real one: this session's `work-plan` invocation announced
`Base directory for this skill: C:\Users\mateo\.claude\skills\work-plan`.

Failure mode 2 is structural: README's adoption option 2 copies
`skills/<name>/` into the runner's skills directory, which has no
`reference/` sibling on any path, link-resolved or not.

Baseline gates on the lane's base commit (96da7ca, tag v1.4.0), all exit 0:

```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples  -> 0 (0 high, 0 medium, 0 low — PASS)
node tests/run-lint-tests.mjs                                           -> 0
node tests/run-gen-tests.mjs                                            -> 0
node tests/run-eval-checks.mjs                                          -> 0
```

<!-- First read of every session. If it isn't here, it didn't happen. -->
