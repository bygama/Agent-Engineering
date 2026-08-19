# agent-lint accuracy (MAT-89 + MAT-92) — plan

## Constraints (every step)

- **Grader before check.** Each fixture and its `run-lint-tests` case is
  committed BEFORE the check change that turns it green, and the RED
  output is quoted in PROGRESS.md. Provable in `git log --oneline`.
- **`reference/skills.md` stays at exactly 119 lines** (parent ruling
  2026-08-19): the cap statement is FOLDED into the existing sentence at
  :79-80, never added as a new line — the file is 119 of its 120 cap and
  a sibling may touch it.
- **No test pins the entry skill's current line count.** The boundary
  fixture sits at the cap (80); 78, 79 and 80 all pass.
- **Fence** (SPEC §Out of scope): this lane writes only
  `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md`, `reference/skills.md` (by
  the ruling below) and its own lane files.
  `skills/using-ae/**`, `skills/orchestrate/**`, `skills/ae-init/**`,
  `skills/ae-audit/**`, `skills/loop-setup/**`, `loops/**`,
  `reference/orca.md`, `reference/runners.md`,
  `docs/how-it-works/execution.md`, `CHANGELOG.md`, the AGENTS.md stamp,
  `global/`, `templates/`, `examples/` are untouchable.
- **No version bump.** Check changes accumulate unreleased and ride the
  next release (both tickets say so).

## Steps

- [ ] 1. `[mechanical]` **RED for MAT-89** — add fixtures
      `tests/fixtures/cmd-escaping/` (AGENTS.md citing an absent
      `node ../sibling-repo/scripts/tool.mjs` plus a present in-repo
      `node scripts/present.mjs`; pointer CLAUDE.md; stamped) and
      `tests/fixtures/cmd-inrepo-drift/` (AGENTS.md citing an absent
      `node scripts/missing.mjs`); teach `tests/run-lint-tests.mjs` an
      `expectMatch` array (mirror of the existing `forbidMatch`: assert a
      finding message contains each pattern) and add both cases —
      `cmd-escaping` expects `fail: false` + code `cmd-drift` +
      `expectMatch` on the context-dependence wording; `cmd-inrepo-drift`
      expects `fail: true` + `expectMatch: ["file not found: scripts/missing.mjs"]`.
      — accept: `node tests/run-lint-tests.mjs` exits 1 and names
      `cmd-escaping` failing on `expected fail=false, got true`
      (RED quoted in PROGRESS.md)

- [ ] 2. `[mechanical]` **GREEN for MAT-89** — in `scripts/agent-lint.mjs`,
      the `node (\S+)` branch of the cmd-drift block resolves the cited
      path against `root` once and classifies before judging: a path whose
      `relative(root, abs)` starts with `..` or is absolute escapes the
      repo → when it does not exist, `add("low", "cmd-drift", …)` with a
      message naming the context-dependence; when it exists, nothing.
      In-repo paths keep the unchanged MEDIUM `file not found: <path>`.
      Header comment block gains the rule (the file documents its own
      exemptions, as the pointer exemption already does).
      — accept: `node tests/run-lint-tests.mjs` exits 0, all cases pass

- [ ] 3. `[judgment]` **RED for MAT-92, law first** — fold the cap into the
      existing statement in `reference/skills.md` :79-80 so the sentence
      reads that `using-ae` is the always-loaded entry point
      (SessionStart) hard-capped at 80 lines, file still exactly 119
      lines; then add fixtures `tests/fixtures/entry-skill-ok/`
      (`skills/using-ae/SKILL.md` at exactly 80 lines, with frontmatter
      `description:`) and `tests/fixtures/entry-skill-bloat/` (the same
      file at 81) and their cases — `entry-skill-ok` expects
      `fail: false` + `forbid: ["entry-skill-cap"]`; `entry-skill-bloat`
      expects `fail: true` + `expect: ["entry-skill-cap"]`.
      — accept: `node tests/run-lint-tests.mjs` exits 1 naming
      `entry-skill-bloat` missing expected finding `entry-skill-cap`, and
      `wc -l reference/skills.md` prints 119 (RED quoted in PROGRESS.md)

- [ ] 4. `[mechanical]` **GREEN for MAT-92** — `scripts/agent-lint.mjs`
      gains, beside the existing `skill-size`/`skill-frontmatter` loop,
      the constants `ENTRY_SKILL = "skills/using-ae/SKILL.md"` and
      `ENTRY_SKILL_CAP = 80` carrying a pointer comment citing
      `reference/skills.md` (the statement step 3 wrote), in the shape of
      the file's existing `// Budget defaults mirror reference/context.md
      — change both together.`; the check adds
      `medium` / `entry-skill-cap` when that exact path exceeds the cap.
      — accept: `node tests/run-lint-tests.mjs` exits 0 and
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
      exits 0 (this repo's own entry skill is under the cap)

- [ ] 5. `[judgment]` **Docs** — `docs/how-it-works/standard-lifecycle.md`:
      the audit section's enumeration of what the lint counts (:145-147)
      names the entry-skill cap, and the command-drift clause states that
      a cited path escaping the repo is reported but not failed. Hard
      constraint of this repo: structure/behavior change updates the
      chapter in the same change.
      — accept: all four gates exit 0 —
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`,
      `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
      `node tests/run-eval-checks.mjs`

- [ ] 6. `[integration]` **Close** — re-run the SPEC §Problem 1 repro
      against the fixed lint (escaping `low`, in-repo `medium`, escaping-only
      repo exits 0), record evidence, then `work-verify` → `work-handoff`,
      push and open the PR with `Closes MAT-89` / `Closes MAT-92` on
      separate lines.
      — accept: four gates green in PROGRESS.md with command output, PR
      open, `git log --oneline` shows grader-before-check ordering
