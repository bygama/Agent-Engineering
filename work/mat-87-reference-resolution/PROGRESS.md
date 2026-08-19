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

- **Step 4 DONE** — gate sweep and lane truth. All four gates exit 0 (block
  below), the fence check finds no do-not-touch file in the diff, and the
  two REPORTED items for the parent are recorded in this file.

## In progress

- Nothing. All four PLAN steps are DONE, work-verify recorded an M DoD
  **PASS** (block below), and the lane is **PAUSED for the parent's review
  wave** — not closed. The folder stays: the parent's ballena reads these
  artifacts, and the merge is the parent's action.

## Tried and failed

- A first draft of the rule targeted the standard's full ≤80-line cap
  (80/80). The parent overrode it at SPEC approval (DECISIONS ruling 1):
  sibling lane MAT-44 needs a map row this same wave, so the lane lands at
  ≤78 instead. No existing line was trimmed to get there — the addition was
  compressed from 8 lines to 6; DECISIONS records why each trim candidate
  was rejected.

## Next

For the parent, in order:

1. Dispatch the ballena (cross-model adversarial seat) against this branch.
   Everything it needs is here: SPEC (the binding authority), the four
   rulings in DECISIONS, and the PASS block's command evidence.
2. Rebase onto fresh main at your request — this lane does that, not you.
3. Merge (rebase-only). **This lane never merges**, however clean its own
   verification looks.
4. Route the three reported items: the `architecture.md` line (sibling lane
   owns the file), the deferred `README.md` adoption line, and the
   unenforced ≤80-line cap on `using-ae`.

For a cold session resuming this lane instead: read SPEC.md first, then the
PASS block below; the tree is green as recorded and needs no repair.

## Reported to the parent (not fixed here — fenced files)

- **`docs/how-it-works/architecture.md` needs a line, sibling lane owns
  the file.** It is the primary narrator of the reference→skills edge this
  rule makes explicit: the `grounds` arrow at line 19
  (`reference/ -->|grounds| skills/`) and §`reference/` at line 39 both
  describe the reference layer as what the skills stand on, without ever
  saying how a skill running outside this repo reaches it. One sentence
  pointing at using-ae's `Reference paths` rule would close it. NOT edited
  here — the parent's brief fences the file.
- **The ≤80-line cap on `using-ae` is convention, not a check** — surfaced
  by the fresh-context reviewer and confirmed: `grep -n "80"
  scripts/agent-lint.mjs` finds no line-budget rule (its only skill check is
  `skill-size` at <500 lines), and the cap lives in `CHANGELOG.md:268`
  alone. So ruling 1's ≤78 headroom for MAT-44 is protected by this lane's
  PLAN acceptance command and nothing else; the next lane can cross 80 with
  every gate green. A lint check plus a fixture is a candidate follow-up
  ticket — NOT opened here (it would touch `scripts/agent-lint.mjs`, its
  fixtures and `CHANGELOG.md`, which is outside this lane's scope and fence).
- **`README.md` adoption line — DEFERRED by the parent's brief.** The
  ticket floats it as optional: the "Adopting AE on your own machine"
  section offers copy-installing the skill folders (option 2), which leaves
  no `reference/` anywhere, so it should say copy-installers clone
  `reference/` too or accept degraded citations. NOT written here.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

### 2026-08-19 — M DoD — PASS

- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (`all 16 cases
  passed`) · `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases
  passed`) · `node tests/run-eval-checks.mjs` → exit 0 (`ok   using-ae: 6
  evals well-formed`); starts: the SessionStart hook run over this lane's
  edited `SKILL.md` → exit 0, emitted body byte-identical to source
- L3 end-to-end: the rule's ordered lookup executed from a foreign non-AE
  cwd → source 1 resolves through the junction to
  `...\Agent-Engineering\reference\task-tiers.md` (`# Task tiers`, exit 0);
  copy-install falls through to source 2 (exit 0); with neither reachable
  the probe reports the unreachable file instead of answering (exit 2)
- Per-step acceptance: `wc -l < skills/using-ae/SKILL.md` → **78** (`-le 78`
  exit 0) · map-untouched grep → exit 1 · `grep -q "Reference paths"
  docs/how-it-works/execution.md` → exit 0 · architecture-untouched grep →
  exit 1 · fence grep → exit 1
- Fresh-context review (in-session subagent, capable tier — parent's ruling
  4): **PASS**, no Critical, no Important, 5 Minor. It re-ran every gate
  itself and went past them: hashed the `## The map` section on both sides
  (`f056cc1519a3420d28d64f2f03742d44` on main and HEAD) rather than trusting
  the grep proxy; falsified the naive walk at four independent levels (.NET
  `[IO.File]::Exists`, `Test-Path`, `cmd /c if exist`, `bash ls`) plus
  `Set-Location` + `cd ..` landing in `~\.claude\skills`; and confirmed
  source 3 actually serves the layer — `gh api .../contents/reference` lists
  13 files including `task-tiers.md`. It also found the property trap in the
  opposite direction: on a *copied* folder `.ResolvedTarget` returns the
  copy's own path while `.Target` is empty, so a probe reading only
  `.ResolvedTarget` would believe source 1 resolved — the rule still lands
  right, but by the bogus root having no `reference/`.
- Adversarial review: n/a here — the parent dispatches 1 ballena after
  `worker_done` (dispatch config; ruling 4 records that this is additive to
  the fresh-context seat, not a substitute for it).

**Minors applied after the verdict** (gates re-run green above; the ballena
sees the final tree):

1. `docs/how-it-works/execution.md` — "lands in the runner's own skills
   directory" was off by one level; the naive walk normalizes to
   `~/.claude/reference/`, the config root. Corrected. The normative line in
   `SKILL.md` was already right (`that lands in ~/.claude/`).
2. `skills/using-ae/SKILL.md` — "a local clone" → "a local **AE** clone".
   The always-loaded line is the one an agent acts on; "AE" is already this
   file's vocabulary and the fix costs one column (74, vs the file's prior
   73 max), no line.
3. `skills/using-ae/SKILL.md` — the red-flags row now says "say which file
   and where you looked", closing the gap the reviewer found between the
   rule's terse "say so" and what eval-06 grades. Zero line cost: table rows
   carry no width budget.
4. `SPEC.md` §5 said the chapter "gains one sentence"; the shipped passage
   is longer. The SPEC's own estimate was corrected rather than the passage
   trimmed — chapters carry no length budget.

**Minor left open, reported to the parent** (see below): the ≤80-line cap on
`using-ae` is convention, not a check.

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

### Side finding — the trap bit the verification tooling itself

While building the L3 probe, the first version of it read only
`(Get-Item $link).ResolvedTarget` to find the skill's real path. That
property is **PowerShell 7+ only**; under Windows PowerShell 5.1 it is
empty, so the probe fell back to the link path and reported:

```
source 1 real  : C:\Users\mateo\.claude\skills\using-ae
source 1 root  : C:\Users\mateo\.claude
source 1 -> reference/task-tiers.md : False
NONE REACHABLE
```

— failure mode 1, reproduced by accident, inside the instrument written to
check for failure mode 1. Nothing in the deliverable changes (the rule is
prose an agent follows, not a script), but it is the strongest available
argument for shipping the rule: the trap catches tooling written by someone
who already knows about it. The corrected probe reads `.Target` as well and
resolves through source 1.

Gate sweep after step 3 (all four exit 0):

```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples  -> 0 (0 high, 0 medium, 0 low — PASS)
node tests/run-lint-tests.mjs                                           -> 0 (all 16 cases passed)
node tests/run-gen-tests.mjs                                            -> 0 (all gen cases passed)
node tests/run-eval-checks.mjs                                          -> 0 (all eval checks passed; using-ae: 6 evals well-formed)
wc -l < skills/using-ae/SKILL.md                                        -> 78  (<=78 per ruling 1; standard's cap is <=80)
git diff --name-only main | grep -E '^(README|CHANGELOG)\.md|^reference/skills\.md|^skills/skill-authoring/|^docs/how-it-works/architecture\.md|^global/|^templates/'
                                                                        -> exit 1 (fence clean)
```

Files changed vs main: `docs/how-it-works/execution.md`,
`skills/using-ae/SKILL.md`, `skills/using-ae/evals/eval-06.md`, and the
four lane files.

L2 "it starts" — the always-loaded skill still injects. `global/hooks/
using-ae.ps1` and this lane's edited `SKILL.md` were copied into a scratch
layout mirroring the installed one, and the hook run there:

```
hook exit=0
header: --- using-ae: AE entry skill (SessionStart) ---
"## Reference paths" present: 1 · "walks the LINK" present: 1
emitted body diffed against skills/using-ae/SKILL.md -> VERBATIM OK
```

L3 end-to-end — the rule's ordered lookup executed, not reasoned about,
from a foreign (non-AE) working directory in three scenarios:

```
(a) junctioned skill:      source 1 real  C:\Briar\repos\mine\Agent-Engineering\skills\using-ae
                           RESOLVED by source 1 -> ...\reference\task-tiers.md ("# Task tiers")   exit 0
(b) copy-install + clone:  source 1 -> False; RESOLVED by source 2 (local clone)                  exit 0
(c) copy-install, no clone: source 1 -> False; source 2 -> False;
                           "NONE REACHABLE -> say so, never invent. Unreachable: reference/task-tiers.md"  exit 2
```

Baseline gates on the lane's base commit (96da7ca, tag v1.4.0), all exit 0:

```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples  -> 0 (0 high, 0 medium, 0 low — PASS)
node tests/run-lint-tests.mjs                                           -> 0
node tests/run-gen-tests.mjs                                            -> 0
node tests/run-eval-checks.mjs                                          -> 0
```

<!-- First read of every session. If it isn't here, it didn't happen. -->
