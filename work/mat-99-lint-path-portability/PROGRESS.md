# PROGRESS — MAT-99

- 2026-08-19 — Lane opened (dispatched child, task_72446add29ec). Corpus
  triage done at planning time (evidence in DECISIONS.md). SPEC.md written
  design-first; parent approved via blocking ask (ruling verbatim in
  DECISIONS.md). PLAN.md shaped: 3 steps (RED fixtures → GREEN check →
  chapter).
- Steps: 1 RED ☑ · 2 GREEN ☑ · 3 chapter ☑

## Done

- 2026-08-19 — Step 1 (RED — fixtures + suite cases before the check).
  Added `tests/fixtures/machine-path-shipped/` (AGENTS.md + pointer
  CLAUDE.md, otherwise-clean; plants all three machine-path classes, one
  per shipped surface: drive-rooted `C:/Users/someone/tools/` in
  `skills/toolkit/SKILL.md`, POSIX user-home `/home/anna/configs/` in
  `reference/toolkit.md`, WSL mount `/mnt/c/repo-cache/` in
  `templates/toolkit.md` — each file also carries a benign lookalike on
  the same surface: `https://example.com` (alongside skills/, tests the
  not-preceded-by-alnum guard), `/opt/toolchain/bin` (reference/),
  `/api/v1/items` + `~/.claude/skills` (templates/)) and
  `tests/fixtures/machine-path-clean/` (same base shape; machine paths
  planted only in `docs/plans/2026-01-01-toolkit.md`,
  `docs/adrs/ADR-001-toolkit.md`, `CHANGELOG.md`, and inside a
  `<!-- BEGIN:local-devtool-cache -->`/`<!-- END:... -->` fenced block in
  `skills/toolkit/SKILL.md`; `docs/README.md` added so docs-index stays
  silent). Both fixtures verified standalone with
  `node scripts/agent-lint.mjs <fixture> --json` — zero findings each,
  confirming they are otherwise lint-clean before `machine-path` exists.
  Added two cases to `tests/run-lint-tests.mjs` (20 → 22): the fire case
  (`expect: ["machine-path"]`, `fail: true`, `expectMatch` pinning one
  message-worthy substring per class, `forbidMatch: ["/opt/", "/api/",
  "~/.claude"]`) and the clean case (`expect: []`, `fail: false`,
  `forbid: ["machine-path"]`).

  Acceptance command and output:

  ```
  $ node tests/run-lint-tests.mjs
  ... (20 prior cases: ok)
  FAIL machine-anchored paths on shipped surfaces fail (all three classes)
    expected fail=true, got false
    missing expected finding "machine-path"
    no finding message matched expected "C:/Users/someone/tools"
    no finding message matched expected "/home/anna"
    no finding message matched expected "/mnt/c/"
    findings: (none)
  ok   machine-anchored paths in dated records + a fenced block pass
  1/22 cases failed
  $ echo $?
  1
  ```

  Matches the acceptance exactly: exit 1, `1/22 cases failed`, only the
  fire case red, clean case green from birth.

  Also ran the other three gates to confirm step 1 touched nothing else:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS` (exit 0); `node tests/run-gen-tests.mjs`
  → `all gen cases passed` (exit 0); `node tests/run-eval-checks.mjs` →
  `all eval checks passed` (exit 0).

  Files changed: `tests/run-lint-tests.mjs` (2 new cases appended, nothing
  else touched); new fixtures under `tests/fixtures/machine-path-shipped/`
  and `tests/fixtures/machine-path-clean/`. No production code
  (`scripts/agent-lint.mjs`) touched — that is step 2.

  Concerns: none. The `expectMatch` substrings I pinned
  (`"C:/Users/someone/tools"`, `"/home/anna"`, `"/mnt/c/"`) are the
  interface step 2 must satisfy; they were chosen as literal path
  fragments (the same pattern the existing `cmd-drift` cases use) rather
  than guessing the check's prose, to leave step 2 free to word the
  message however it likes as long as the offending path appears in it.

- 2026-08-19 — Step 2 (GREEN — the `machine-path` check). New section in
  `scripts/agent-lint.mjs`, placed immediately before the cmd-drift section
  (the two content-drift checks adjacent, so the severity contrast reads in
  place). Scans walked files matching `^(skills|reference|templates|global|
  loops)/`; three literal-ish class regexes built from one shared path-char
  class — drive-rooted `[A-Za-z]:[\\/]`, POSIX user-home
  `/(?:home|Users)/`, WSL mount `/mnt/[A-Za-z]/` — each guarded by
  `(?<![A-Za-z0-9])`, which is exactly what keeps `https://` and
  `http://a.b/mnt/c/x` out. Emits
  `add("medium", "machine-path", "<file>:<line>", …)` quoting the offending
  path and naming the fix direction (home-relative `~/`, repo-relative, or a
  placeholder). Comment block states the four exemptions (dated records are
  history; `examples/` are authoring-time snapshots; a fenced tool-managed
  block is not ours to judge; tilde legal, never a fourth class) and the
  correct-somewhere vs correct-nowhere-but-one-machine severity rationale
  from the parent ruling. Header amended in two places: the check
  enumeration (line 3-7) now names the check, and the invariant "Only the
  pointer check strips" now says the machine-path check reuses the same
  matched-pair semantics to SKIP those lines so its `file:line` stays true.

  Two judgment calls beyond the literal step text, both small:
  (a) matches that nest are collapsed — `C:/Users/someone/tools/` is
  drive-rooted AND carries a `/Users/…` tail, so without this the fixture
  reported the same defect twice at the same location (verified: 4 findings
  before, 3 after — one per class, which is what the fixture plants);
  (b) a file containing a NUL byte is skipped, because random bytes in a
  binary payload match `[non-alnum][A-Za-z]:[/\\]` often enough to be a
  standing false positive in any consumer that ships an image under
  `skills/` (~6 expected hits per MB) — the check judges prose, not blobs.

  Acceptance command and output:

  ```
  $ node tests/run-lint-tests.mjs
  ... (20 prior cases: ok)
  ok   machine-anchored paths on shipped surfaces fail (all three classes)
  ok   machine-anchored paths in dated records + a fenced block pass
  all 22 cases passed
  $ echo $?
  0
  $ node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  0 high, 0 medium, 0 low — PASS
  $ echo $?
  0
  ```

  Other two gates, unmoved: `node tests/run-gen-tests.mjs` → `all gen cases
  passed` (exit 0); `node tests/run-eval-checks.mjs` → `all eval checks
  passed` (exit 0).

  Fixture output inspected directly, not just via the harness — exactly
  three findings, one per class, line numbers true to the file as written
  (`reference/toolkit.md:3`, `skills/toolkit/SKILL.md:10`,
  `templates/toolkit.md:3`); `machine-path-clean` reports zero.
  Also ran the whole repo with only `tests,examples` ignored, to see
  `templates/` and `global/` (which the self-lint gate hides): zero
  `machine-path` findings there too.

  Edge cases probed in a throwaway scratch fixture (deleted, not committed):
  backslash drive form `C:\Users\…` fires; `https://example.com/v1/users/42`
  and `http://a.b/mnt/c/x` do not; `~/.claude/skills`, `/opt/tool`,
  `/usr/bin`, `/dev/null`, `/api/users/1` all silent; a trailing sentence
  period is trimmed off the quoted path (`D:/work/thing`, not `thing.`); a
  path under an UNMATCHED `<!-- BEGIN: -->` is still flagged, at its true
  line number.

  Files changed: `scripts/agent-lint.mjs` only (+84/−4). No fixture, no test
  case, no doc touched — step 1 owns the first two, step 3 the chapter.
  `CHANGELOG.md`, the `AGENTS.md` stamp, `global/`, `examples/`, the sibling
  lane's files and the live case
  `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md` are all
  untouched (`git status` shows one modified file).

  Concerns: none blocking. Noting for work-verify triage: the fenced-block
  skip is still proven on `skills/` only (step 1's reviewer raised this) —
  the logic is surface-agnostic (it runs per file, before any surface
  distinction), so a `reference/` or `templates/` fixture would exercise the
  same code path, but no committed case pins it.

- 2026-08-19 — Step 3 (chapter — machine-path narration in the Audit
  section). Two edits to `docs/how-it-works/standard-lifecycle.md`, nothing
  else in the tree. (a) The section's opening parenthetical list of what
  "the lint counts" gained `machine-anchored paths on shipped surfaces`,
  placed right after `command drift` — the two content-drift checks read
  adjacent in the list the way they sit adjacent in the script (the
  paragraph was reflowed to keep the wrap even; that is the only reason
  the first hunk touches a line I did not otherwise change). (b) One new
  paragraph immediately after the cmd-drift paragraph and before the
  entry-skill-cap one, so the severity contrast lands next to the escape
  it contrasts with.

  The paragraph carries the five beats the step asked for, in house voice
  (WHY, not WHAT): the defect ("not a command that stopped being true, but
  content that was only ever true on one disk"); the five shipped surfaces
  and the three classes; why narrow rather than "no absolute path outside
  records" (the broad rule would fail the URL routes and `/dev/null`
  invocations the standard ships on purpose and catch nothing the three
  classes miss — the same argument the section already makes for the drift
  exemptions); why records and `examples/` are exempt (history, never
  restamped — "a record is allowed to name the machine the work happened
  on"); and the severity contrast, stated against the out-of-repo escape
  narrated one paragraph above (`node ../<sibling>/…` is correct
  *somewhere* → `low`; a machine path on a shipped surface is correct
  nowhere but the author's machine → `medium`).

  Step-2 minor 1 (placeholder form) carried in, and sharpened by a probe
  rather than taken on faith. I ran the check's three regexes against the
  candidate illustration forms before writing the prose:
  `X:\…` FIRES (the lookbehind is satisfied by the preceding backtick, and
  an invented drive letter is still `[A-Za-z]:[\\/]`), while
  `<drive>:\…`, `/home/<name>`, `/Users/<name>` and `/mnt/<letter>/` are
  all clean — `<` and `>` are outside `PATH_CHAR`, so an angle-bracket
  placeholder never matches. So the advisory sentence says the accurate
  thing rather than the tempting one: a shipped surface documenting this
  check "cannot write a letter, a colon and a slash — even with an
  invented letter — without firing on itself, so spell that class
  `<drive>:\…` there, or name its shape." Had I repeated the review's
  literal wording (advise `X:\…` on shipped surfaces) the advice would
  have handed a future author a guaranteed lint failure. The chapter
  itself, which the check never scans, does use `X:\…`, and says so, with
  the reason: "a real one pasted in to explain the defect is how the
  defect spreads."

  Acceptance command and output:

  ```
  $ rg -n "machine" docs/how-it-works/standard-lifecycle.md
  147:parseable, pointer shape, broken links, command drift, machine-anchored
  172:`global/`, `loops/` — have to read true on any machine, so a path anchored
  173:to one machine's disk layout is a defect there: a drive root (`X:\…`), a
  182:is allowed to name the machine the work happened on. Severity is where the
  184:*somewhere*, so its absence costs a `low`; a machine path on a shipped
  185:surface is correct nowhere but the author's machine, so it fails at
  237:into the standard's tracker on machines that carry its workspace, or as
  $ echo $?
  0
  ```

  All four gates, re-run after the reflow (not before it):
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS` (exit 0);
  `node tests/run-lint-tests.mjs` → `all 22 cases passed` (exit 0);
  `node tests/run-gen-tests.mjs` → `all gen cases passed` (exit 0);
  `node tests/run-eval-checks.mjs` → `all eval checks passed` (exit 0).

  Files changed: `docs/how-it-works/standard-lifecycle.md` only (+29/−3);
  `git status --porcelain` showed that one file and nothing else before the
  commit. Untouched, per the PLAN's never-touch list: `CHANGELOG.md`, the
  `AGENTS.md` stamp, `global/`, `examples/`, the sibling lane's files
  (`reference/runners.md`, `reference/orca.md`, `skills/orchestrate/**`,
  `docs/how-it-works/execution.md`) and the live case
  `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md`.

  Concerns: none blocking. One note for work-verify triage: the paragraph
  runs long by this section's standard (~22 lines against ~13 for the
  cmd-drift and entry-skill-cap paragraphs) because the step asked for five
  distinct beats in one paragraph; length budgets do not apply to
  `docs/how-it-works/` (AGENTS.md hard constraint), so this is a style
  observation, not a gate. Step 2's open minor (fenced-block skip pinned by
  a committed fixture on one surface only) is untouched by this step and
  still stands for triage.

## Reviews

- 2026-08-19 — Step 1 review (fresh reviewer, sonnet). Verdict verbatim:
  "### Spec compliance / ✅ Compliant" · "**Step quality:** Approved" ·
  "**Reasoning:** The fixtures and test cases precisely encode the PLAN's
  step-1 interface, the acceptance command reproduces exactly as documented
  (verified independently, not just trusted), and both fixtures are
  confirmed lint-clean standalone — a solid, honest RED baseline for step 2
  to turn green." Issues: none Critical/Important. Minor (deferred to
  work-verify triage): "tests/fixtures/machine-path-clean/ only exercises
  the fenced-block exemption on skills/ — it has no reference/ or
  templates/ files at all, so step 2's fenced-block skip logic is proven on
  one surface only." Reviewer independently re-ran the suite (1/22 red,
  exit 1) and both fixtures standalone (zero findings each).

- 2026-08-19 — Step 2 review (fresh reviewer, opus). Verdict verbatim:
  "### Spec compliance / ✅ Compliant — every element of the step is present
  and the acceptance claim reproduces." · "**Step quality:** Approved" ·
  "**Reasoning:** The check implements the SPEC's three classes exactly,
  with the skip-not-strip semantics and the severity rationale the parent
  ruling demanded, and both acceptance commands plus the two untouched
  gates reproduce green from a clean tree; independent probing of the
  false-positive surface (URLs, ~/, /opt, /api/users, /mnt/data) and of
  the fenced-block skip on a second surface found no defect. Both judgment
  calls are minimal responses to real problems in this codebase's walk
  semantics, not speculative generality." Issues: none Critical/Important;
  six Minors, verbatim in short form: (1) prose ABOUT drive paths on a
  shipped surface fires — advise placeholder `X:\…` when illustrating the
  defect (carried into step 3's chapter text); (2) single-letter-token FPs
  (`sed 's:/usr:/opt:'`) — contrived, zero corpus hits, on record only;
  (3) space-truncated quote reads oddly (`C:\Program`) — cosmetic;
  (4) whole-file read before NUL bail — cheap pre-filter if ever needed;
  (5) `/mnt/c` without trailing slash not flagged — deliberate non-hole
  per SPEC literal; (6) UTF-16 markdown skipped by NUL heuristic —
  consistent with the UTF-8-everywhere lint. Reviewer re-ran all four
  gates green from a clean tree and inspected fixture JSON directly.
  Step-1 minor (fenced-block skip pinned on one surface) answered
  empirically by the reviewer's probe on reference/ — committed-fixture
  pin still deferred to work-verify triage.

- 2026-08-19 — Step 3 review (fresh reviewer, sonnet). Verdict verbatim:
  "### Spec compliance / ✅ Compliant" · "**Step quality:** Approved" ·
  "**Reasoning:** Every narrated fact — the three classes, the exemptions,
  the severity contrast, and the carry-in placeholder-safety claim —
  checks out against the actual regexes and code comments in
  scripts/agent-lint.mjs, independently re-verified rather than trusted
  from PROGRESS.md's self-report. All four gates and the acceptance
  command pass. No scope creep, no factual drift, house voice preserved."
  Issues: none Critical/Important; one Minor (paragraph length vs
  neighbors; optional split of the authoring-advice sentences — deferred).
  Reviewer reproduced the placeholder-safety probe standalone: `X:\…`
  FIRES, `<drive>:\…` and angle-bracket forms CLEAN — implementer's
  divergence from the step-2 reviewer's literal suggestion was correct.

## Verification

### 2026-08-19 — M DoD — PASS
- L1 static: `node --check scripts/agent-lint.mjs` → exit 0; self-lint
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0
  (`all 22 cases passed`); `node tests/run-gen-tests.mjs` → exit 0
  (`all gen cases passed`); `node tests/run-eval-checks.mjs` → exit 0
  (`all eval checks passed`)
- L3 end-to-end: lint executed over both fixtures —
  `node scripts/agent-lint.mjs tests/fixtures/machine-path-shipped` →
  exit 1, exactly 3 MEDIUM `machine-path` findings, one per class, at
  true file:line; `.../machine-path-clean` → exit 0, zero findings.
  Live case byte-identical (reviewer proved blob hash `e1f850dc…` equal
  at base and HEAD); never-touch list untouched
  (`git diff main --name-only` over the forbidden set → empty)
- Fresh-context review (opus, no shared context): **PASS** — verdict
  verbatim: "PASS — all eight DoD layers reproduce from a clean tree in
  my own hands: the four gates exit 0 (`all 22 cases passed`, `0 high,
  0 medium, 0 low — PASS`), the fire fixture exits 1 with exactly three
  MEDIUM machine-path findings at line numbers I verified true against
  the files, the clean fixture exits 0 on non-vacuous exempt content,
  and the forbidden-path set is untouched with the live case proven
  byte-identical by blob hash e1f850dc…. The remaining issues are all
  Minor, and the RED baseline replayed against the pre-check script
  (0 high, 0 medium, 0 low — PASS, exit 0) confirms the test-first claim
  rather than leaving it self-reported." Reviewer additionally proved:
  all five surfaces live (global/, loops/ fire); chapter's `<drive>:\…`
  advice empirically safe while `X:\…` fires; no FPs across the probe set
  (URLs, ~/, /opt, /usr, /dev/null, /api, %USERPROFILE%, \server\share,
  /root/, 12:30); fenced-block skip works on a second surface (closes the
  step-1 minor); no lastIndex leakage; nesting collapse correct.
- Adversarial review: n/a — M tier, not requested (the parent
  orchestrator runs its own cross-model reviewer after worker_done).

Deferred-minors triage (all on record, none a gate):
- architecture.md's abbreviated lint list omits the new check — matches
  that list's existing precedent (omits DESIGN.md drift, adapters, read
  orders too); standard-lifecycle.md is the affected chapter under the
  hard constraint and was updated. Future docs-sweep material.
- Space-truncated quote (`C:\Program`), sed-idiom FP, whole-file read
  before NUL bail, `/mnt/c` without trailing slash (deliberate per SPEC
  literal), UTF-16 skip — recorded at step 2; step-1 fenced-surface pin
  closed empirically by the lane reviewer.

## Handoff (2026-08-19)

- Done: all 3 PLAN steps, per-step reviews Approved, M DoD PASS (above).
- PR: https://github.com/bygama/Agent-Engineering/pull/78 (`Closes MAT-99`)
  — OPEN by design; the parent orchestrator reviews, requests any rebase,
  and merges. This lane never merges.
- Next (parent's side): review wave → merge → terminal close of lane
  records → ships in 1.4.2 via the release ritual.
- Debris: none — `git status --porcelain` empty, `git clean -nd` empty;
  step-2 scratch fixture was deleted in-step; diff packages live in
  session scratchpad, outside the repo.
