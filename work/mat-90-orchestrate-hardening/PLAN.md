# PLAN — mat-90-orchestrate-hardening

SPEC: `work/mat-90-orchestrate-hardening/SPEC.md` (approved by the parent,
DECISIONS ruling 1). One step = one commit = one dispatch.

## Constraints (apply to every step)

- **Evals before content**: step 1's commit lands before steps 2-6, and
  step 4's eval additions land before step 5 — in history, not just in
  intent. No content step may be committed ahead of the eval that grades
  it.
- **The two templates stay FILLABLE.** `dispatch-child.md` and
  `reviewer.md` keep their fenced body with `[PLACEHOLDER]` markers; new
  clauses are written as instructions to the child *inside* the fence, and
  every new placeholder is declared in the **Placeholders:** list below
  the fence. Never convert a clause into prose about the template.
- **No claim about Orca's CLI enters any file unless it was run here.**
  The verified field names, flags and ids are fixed in SPEC §§8-9, 11-12
  and 15; a step that needs a new one runs the command first.
- Do NOT touch, at any step: `scripts/agent-lint.mjs`, `tests/**`,
  `skills/ae-init/**`, `skills/ae-audit/**`, `skills/loop-setup/**`,
  `skills/using-ae/**`, `loops/**`,
  `docs/how-it-works/standard-lifecycle.md`, `CHANGELOG.md`, the
  AGENTS.md version stamp, `global/`, `templates/`, `examples/` — two
  sibling lanes are in flight on them.
- No version bump, no restamp — this rides the owner's next release.
- `reference/` files hold ≤120 lines. When trimming to fit, **tightening
  duplication is free; losing a verified fact is not** — if a
  non-duplicate must go, stop and ask the parent (DECISIONS ruling 1).
- All artifacts in English.

## Steps

1. [judgment] **Evals first — all three, one commit.**
   `skills/orchestrate/evals/eval-01.md` gains expected-behavior lines
   that the filled `dispatch-child.md` spec (a) names BOTH sides of the
   fence — orchestration workers forbidden, work-run per-step reviewers
   and work-verify step-4 REQUIRED, the parent's adversarial reviewer
   additional and never a substitute — and carries no absolute
   "spawn nothing" phrasing; (b) requires the in-session reviewer's
   verdict TEXT recorded verbatim in PROGRESS/DECISIONS; (c) carries the
   cadence rule (phase transitions AND at least every ~10 minutes in a
   long phase, a repeated phase being a valid signal).
   `skills/orchestrate/evals/eval-04.md` gains the CONTRAST on its
   existing case (3): the same child that is refused a worker of its own
   is still expected to run its work-verify step-4 reviewer in-session,
   and reading the fence as blocking that rung is the graded failure —
   with the genuine-runtime-refusal branch (step 4 recorded NOT RUN,
   refusal quoted, reported) as the only alternative to running it.
   New `skills/orchestrate/evals/eval-05.md` grades the parent side at
   wave scale: idle-child diagnosis (stopped cadence + non-advancing
   `worker-read` across two reads) and its Task-to-terminal remedy
   (never a raw `terminal send`); Orca-as-ledger against a parallel id
   file, with the read commands named; the mechanical fill that must fail
   on a surviving placeholder; and the non-stock child runner stance.
   SPEC §§17-19.
   Acceptance: `node tests/run-eval-checks.mjs` exits 0 and its output
   contains `ok   orchestrate: 5 evals well-formed`.

2. [judgment] **`skills/orchestrate/references/dispatch-child.md` — the
   child-side clauses.** Inside the fence: rewrite § No grandchildren per
   SPEC §§1-3 (both sides named; the absolute closing clause dropped;
   fence-vs-runtime-refusal with the NOT-RUN branch; verdict text recorded
   verbatim), and extend § Heartbeat phases with SPEC §5's cadence line.
   Outside the fence: add the table of contents the standard requires of
   skill reference files past 100 lines (`reference/skills.md`).
   `reviewer.md` is NOT touched by this step.
   Acceptance: `node -e "const s=require('fs').readFileSync('skills/orchestrate/references/dispatch-child.md','utf8');process.exit(!/never spawning anything yourself/.test(s) && /in-session/.test(s) && /verbatim/.test(s) && /10 minutes/.test(s) && /\[LANE_PATH\]/.test(s) && /\[TASK_BRIEF\]/.test(s) ? 0 : 1)"` exits 0
   AND `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` exits 0.

3. [judgment] **`dispatch-child.md` — the `[REPO_CONSTRAINTS]` slot.**
   SPEC §16: an OPTIONAL section inside the fence carrying the shared
   per-repo block, declared in the **Placeholders:** list as optional with
   the omit-the-whole-section rule (an empty section is a placeholder that
   survived). Separate commit from step 2 because it is a template
   interface change, not a wording fix.
   Acceptance: `node -e "const s=require('fs').readFileSync('skills/orchestrate/references/dispatch-child.md','utf8');const f=s.split('\n\`\`\`')[1]||'';process.exit(/\[REPO_CONSTRAINTS\]/.test(f) && /OPTIONAL/.test(s) ? 0 : 1)"` exits 0
   AND `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` exits 0.

4. [judgment] **`reference/orca.md` — the ledger read path.** SPEC §§11-12:
   a new section carrying the verified field-name table for `task-list
   --brief --json`, `worker-list --json`, `worktree list --json` and
   `worker-show --dispatch <ctx_id> --json`, the explicit "there is no
   `title` field — it is `task_title`" note, and the plain statement that
   `ctx_` ids are valid for show/retain/release with the on-machine
   evidence dated. Fit the ≤120-line budget by tightening the duplicated
   worktree/terminal bullets only (the fallback-shell and decommission
   rules are already stated in `skills/orchestrate/SKILL.md`); no verified
   fact is dropped.
   Acceptance: `node -e "const fs=require('fs');const s=fs.readFileSync('reference/orca.md','utf8');const a=s.split('\n');const n=a.at(-1)===''?a.length-1:a.length;process.exit(/task_title/.test(s)&&/agentTerminalHandle/.test(s)&&/ctx_/.test(s)&&n<=120?0:1)"` exits 0.

5. [judgment] **`reference/runners.md` § The child seat.** SPEC §§8, 10:
   the stance — stock runner by default, two-step legitimate for children
   when argv genuinely demands it — how a non-stock child runner is
   launched (the `terminal create --command …` + `worker-start --terminal`
   pair, mirroring the adversarial seat's recipe), the reason recorded at
   dispatch, the fallback-shell close as a REQUIRED step, and a citation
   of SKILL.md's cost list rather than a second copy of it.
   Acceptance: `node -e "const fs=require('fs');const s=fs.readFileSync('reference/runners.md','utf8');const a=s.split('\n');const n=a.at(-1)===''?a.length-1:a.length;process.exit(/--terminal/.test(s)&&/fallback shell/i.test(s)&&n<=120?0:1)"` exits 0.

6. [judgment] **`skills/orchestrate/SKILL.md` — the four parent-side
   clauses, one commit.** (a) Step 4 gains the child-runner stance with
   the FOUR MEASURED COSTS of SPEC §9 written out (parent's ruling: the
   cost is visible where the parent decides), citing
   `reference/runners.md` for the launch recipe. (b) Step 5 gains SPEC
   §§6-7: the idle-child diagnosis and the Task-to-terminal remedy, with
   the structural reason (an idle agent does not read its mailbox). (c) A
   new short "Orca is the ledger" passage per SPEC §13 — read commands
   cited to `reference/orca.md`, the stateless-shell line, and the parent
   lane gets committed like any other lane. (d) SPEC §§14-15: at wave
   scale the fill is mechanical, generation must fail on a surviving
   placeholder, and `--spec "$(cat <file>)"` is the documented shape
   because `task-create` takes `--spec <text>` only. Plus the two red-flag
   rows: the misread fence (SPEC §4) and "keeping a parallel file of ids"
   (SPEC §13).
   Acceptance: `node -e "const fs=require('fs');const s=fs.readFileSync('skills/orchestrate/SKILL.md','utf8');const a=s.split('\n');const n=a.at(-1)===''?a.length-1:a.length;process.exit(/ledger/i.test(s)&&/idle/i.test(s)&&/ownershipState/.test(s)&&/spec-file|--spec \"\$\(cat/.test(s)&&/placeholder/i.test(s)&&n<500?0:1)"` exits 0
   AND `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` exits 0.

7. [judgment] **`docs/how-it-works/execution.md` — the chapter follows the
   behavior** (repo hard constraint, same change). In §"The 8-stage
   dispatch cycle": stage 4 gains the child-runner stance and why the
   two-step costs provenance; stage 5 gains the idle-child diagnosis and
   its remedy; and the section gains the ledger + mechanical-fill
   narration. `standard-lifecycle.md` is NOT touched (lane B owns it).
   Acceptance: `grep -qi "idle" docs/how-it-works/execution.md` exits 0
   AND `grep -qi "ledger" docs/how-it-works/execution.md` exits 0
   AND `git diff --name-only main -- docs/how-it-works/ | grep -q standard-lifecycle` exits 1.

8. [mechanical] **Gate sweep and fence check.** Run all four gates,
   confirm no do-not-touch path appears in the diff, and record the
   command evidence in PROGRESS.md.
   Acceptance: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` ·
   `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
   `node tests/run-eval-checks.mjs` all exit 0, AND
   `git diff --name-only main | grep -E '^(scripts/agent-lint\.mjs|tests/|skills/(ae-init|ae-audit|loop-setup|using-ae)/|loops/|docs/how-it-works/standard-lifecycle\.md|CHANGELOG\.md|global/|templates/|examples/)'`
   exits 1.
