# PLAN — mat-87-reference-resolution

SPEC: `work/mat-87-reference-resolution/SPEC.md` (approved by the parent
with one change, DECISIONS ruling 1). One step = one commit = one dispatch.

## Constraints (apply to every step)

- Do NOT touch, at any step: `README.md`, `reference/skills.md`,
  `skills/skill-authoring/`, `docs/how-it-works/architecture.md`,
  `CHANGELOG.md`, version stamps, `global/`, `templates/`. Sibling lanes
  own them; the README adoption line and the architecture.md line are
  REPORTED in PROGRESS.md, never written here.
- `skills/using-ae/SKILL.md` ends every step at **≤78 lines** (parent's
  ruling 1 — the standard's cap is ≤80; the margin is reserved for sibling
  lane MAT-44's map row). Verified by command before each commit.
- `## The map` in `skills/using-ae/SKILL.md` stays byte-identical to main:
  no reflow, no re-wrap, no row added — MAT-44 edits that section next.
- Evals before content: step 1's commit lands before step 2's in history.
- The ordered lookup is written ONCE canonically, in step 2, and its three
  sources are fixed vocabulary from there on: **the repo of the skill
  folder's REAL (link-resolved) path** → **a local Agent-Engineering
  clone** → **`github.com/bygama/Agent-Engineering`**. Later surfaces refer
  to the rule and never restate a variant of it.
- The public URL is the one consumers already carry
  (`templates/repo/docs/tiers.md:28`); no new canonical address.
- No script, hook, or automation performs the resolution — the rule is
  prose an agent follows, and the standard stays runtime-neutral.
- All artifacts in English.

## Steps

1. [judgment] using-ae evals FIRST: add
   `skills/using-ae/evals/eval-06.md` grading the foreign-repo case per
   SPEC §4 — a session working in a NON-AE repo (no `reference/` in the
   checkout), using-ae loaded from `~/.claude/skills/using-ae` (a junction
   into an Agent-Engineering clone), needing `reference/task-tiers.md` to
   triage. Correct behavior: resolve the skill folder's REAL path first,
   walk to that repo's root, read the file there; fall through to a local
   clone then `github.com/bygama/Agent-Engineering` when the skill is
   copy-installed instead; when none is reachable, name the unreachable
   source. Two NAMED failures: treating
   `~/.claude/skills/using-ae/../../reference/task-tiers.md` as a valid
   path, and inventing the cited file's content — including the softer
   form where the agent proceeds on a remembered tier ladder without ever
   saying the source went unread. The existing five evals are not edited.
   Acceptance: `node tests/run-eval-checks.mjs` exits 0 AND its output
   contains `ok   using-ae: 6 evals well-formed`.

2. [judgment] `skills/using-ae/SKILL.md`: add the `## Reference paths`
   section of SPEC §1 — two prose lines carrying what `reference/…` means
   (the standard's repo root), the three-source ordered lookup from the
   constraints block, and the say-so-when-none-is-reachable contract — and
   the red-flags row of SPEC §2, whose Thought is the naive
   `~/.claude/skills/<name>/../../reference/` walk and whose Reality states
   that a junction's `..` walks the LINK into `~/.claude/`, so the skill
   folder's real path is resolved first, and that an unresolvable reference
   layer is reported rather than invented. Six added lines total, per
   SPEC §3.
   Acceptance: `test "$(wc -l < skills/using-ae/SKILL.md)" -le 78` exits 0
   AND `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
   exits 0 AND `git diff main -- skills/using-ae/SKILL.md | grep -E '^[-+]- \*\*'`
   exits 1 (no map row added or removed).

3. [judgment] `docs/how-it-works/execution.md`, §"Runners: any file-reading
   agent can hold a lane": add the one sentence of SPEC §5 to the passage
   that hands a runner a skill file to follow as a procedure — the
   `reference/…` paths those skill files cite resolve against the
   standard's repo root by using-ae's `Reference paths` rule, real
   (link-resolved) skill location first, and an unreachable reference layer
   is reported rather than guessed. This is the step that satisfies the
   repo's same-change docs constraint; `architecture.md` is fenced and is
   reported in step 4 instead.
   Acceptance: `grep -q "Reference paths" docs/how-it-works/execution.md`
   exits 0 AND `git diff --name-only main -- docs/how-it-works/ | grep -q
   architecture` exits 1.

4. [mechanical] Gate sweep and lane truth: run all four gates, confirm no
   do-not-touch file is in the diff, and write into PROGRESS.md the command
   evidence, the two verified resolution paths (the `exists: False` naive
   walk and the `exists: True` link-resolved walk, quoted), plus the two
   REPORTED items for the parent — the line
   `docs/how-it-works/architecture.md` needs (its `grounds` arrow at line
   19 and §`reference/` at line 39 narrate the reference→skills edge this
   rule makes explicit) and the DEFERRED `README.md` adoption line
   (copy-installers should clone `reference/` too, or accept degraded
   citations).
   Acceptance: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
   · `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
   `node tests/run-eval-checks.mjs` all exit 0, AND `git diff --name-only
   main | grep -E '^(README\.md|CHANGELOG\.md|reference/skills\.md|skills/skill-authoring/|docs/how-it-works/architecture\.md|global/|templates/)'`
   exits 1.
