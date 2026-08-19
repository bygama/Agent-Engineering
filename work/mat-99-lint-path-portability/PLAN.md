# PLAN — MAT-99: machine-path check

SPEC: work/mat-99-lint-path-portability/SPEC.md (approved by the parent
2026-08-19, ruling in DECISIONS.md).

## Constraints (every step)

- Four gates exit 0 before the PR:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` ·
  `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
  `node tests/run-eval-checks.mjs`.
- Never touch: `CHANGELOG.md`, the `AGENTS.md` version stamp, `global/`,
  `examples/`, sibling-lane files (`reference/runners.md`,
  `reference/orca.md`, `skills/orchestrate/**`,
  `docs/how-it-works/execution.md`),
  `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md` (live case,
  stays byte-identical).
- No version bump, no restamp, no CHANGELOG entry — ships later in 1.4.2.
- Finding code `machine-path`, severity `medium`. The check's comment states
  the parent's distinction verbatim: MAT-89's LOW is for paths
  correct-somewhere; this is correct-nowhere-but-one-machine (parent
  ruling). Tilde `~/` paths stay legal — never a fourth class.
- Tool-managed blocks (`<!-- BEGIN:<name> -->`/`<!-- END:<name> -->`): skip
  their lines; finding line numbers stay true to the file as written.
- All artifacts in English; conventional commits.

## Steps

1. [integration] RED — fixtures + suite cases before the check.
   `tests/fixtures/machine-path-shipped/`: minimal passing consumer repo
   (AGENTS.md with stamp, pointer CLAUDE.md) planting all three classes on
   three shipped surfaces — drive-rooted (e.g. `C:/Users/someone/tools/`) in
   `skills/<x>/SKILL.md`, `/home/<seg>/` in `reference/<x>.md`,
   `/mnt/c/` in `templates/<x>.md` — plus benign lookalikes on the same
   surfaces (`/opt/toolchain/bin`, `/api/v1/items`, `https://example.com`,
   `~/.claude/skills`) that must appear in no finding.
   `tests/fixtures/machine-path-clean/`: same base shape; machine paths
   planted ONLY in `docs/plans/2026-01-01-<x>.md`, `docs/adrs/ADR-001-<x>.md`,
   `CHANGELOG.md`, and inside a fenced tool-managed block in a shipped
   `skills/<x>/SKILL.md`. Two new cases in `tests/run-lint-tests.mjs`
   (interface for step 2): fire case `expect: ["machine-path"]`,
   `fail: true`, `expectMatch` pinning one message per class and
   `forbidMatch: ["/opt/", "/api/", "~/.claude"]`; clean case `fail: false`,
   `forbid: ["machine-path"]`.
   Acceptance: `node tests/run-lint-tests.mjs` exits 1 reporting exactly
   `1/22 cases failed` (the fire case red — code `machine-path` not yet
   emitted; the clean case green from birth).

2. [judgment] GREEN — the check in `scripts/agent-lint.mjs`. New section
   scanning walked files under `skills/`, `reference/`, `templates/`,
   `global/`, `loops/`; regexes for the three classes of SPEC §The rule;
   skips lines inside matched tool-managed marker pairs; emits
   `add("medium", "machine-path", "<file>:<line>", ...)` with a message
   naming the portability defect and the fix direction. Comment block states
   the exemptions (dated records are history; examples/ are authoring-time
   snapshots; fenced blocks not ours to judge; tilde legal) and the
   correct-somewhere vs correct-nowhere severity rationale. Amend the header
   invariant (line ~19: "Only the pointer check strips") to name this
   check's line-skip.
   Acceptance: `node tests/run-lint-tests.mjs` exits 0 with
   `all 22 cases passed`; self-lint gate exits 0.

3. [judgment] Chapter — `docs/how-it-works/standard-lifecycle.md` Audit
   section gains the machine-path narration: what the lint now counts, the
   three classes, why records and examples are exempt, and the severity
   contrast with the cmd-drift escape exemption already narrated there.
   Acceptance: `rg -n "machine" docs/how-it-works/standard-lifecycle.md`
   non-empty; all four gates exit 0.
