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

- **Step 2 DONE** — `skills/using-ae/SKILL.md` gains the `## Reference
  paths` section (2 prose lines: what `reference/…` means, the three-source
  ordered lookup, the say-so contract) placed right after `## Entry rule`,
  whose first move is the `reference/task-tiers.md` citation; plus one
  red-flags row carrying the junction trap, the resolve-real-path-first
  correction and the never-invent clause. Exactly 6 added lines.
  Wording note: "link-resolved" replaced a first draft's "REAL-path" — same
  budget (73/71 columns, the file's existing 73 max), and it matches the
  vocabulary the SPEC and eval-06 already use.
  Acceptance: `wc -l` → **78** (`-le 78` exit 0) · lint exit 0 ·
  `git diff main -- skills/using-ae/SKILL.md | grep -E '^[-+]- \*\*'`
  → exit 1, `## The map` byte-identical for sibling lane MAT-44.

- **Step 3 DONE** — `docs/how-it-works/execution.md`, §"Runners: any
  file-reading agent can hold a lane" gains the passage the repo's
  same-change docs constraint requires: a skill file handed to a runner as
  a procedure still cites the standard by repo-relative path, so the entry
  skill's `Reference paths` rule resolves it — link-resolved skill location
  first (with the junction trap named), then a local clone, then the public
  repo; an unreachable reference layer is reported, never guessed.
  `architecture.md` is fenced and is REPORTED below instead.
  Acceptance: `grep -q "Reference paths" docs/how-it-works/execution.md`
  → exit 0 · `git diff --name-only main -- docs/how-it-works/ | grep -q
  architecture` → exit 1 · lint exit 0.

## In progress

- Step 4: gate sweep and lane truth.

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
