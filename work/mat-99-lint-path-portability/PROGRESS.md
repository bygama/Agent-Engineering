# PROGRESS — MAT-99

- 2026-08-19 — Lane opened (dispatched child, task_72446add29ec). Corpus
  triage done at planning time (evidence in DECISIONS.md). SPEC.md written
  design-first; parent approved via blocking ask (ruling verbatim in
  DECISIONS.md). PLAN.md shaped: 3 steps (RED fixtures → GREEN check →
  chapter).
- Steps: 1 RED ☑ · 2 GREEN ☐ · 3 chapter ☐

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
