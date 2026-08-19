# PROGRESS — MAT-99

- 2026-08-19 — Lane opened (dispatched child, task_72446add29ec). Corpus
  triage done at planning time (evidence in DECISIONS.md). SPEC.md written
  design-first; parent approved via blocking ask (ruling verbatim in
  DECISIONS.md). PLAN.md shaped: 3 steps (RED fixtures → GREEN check →
  chapter).
- Steps: 1 RED ☑ · 2 GREEN ☑ · 3 chapter ☐

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
