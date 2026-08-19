# PLAN — mat-91-portability

SPEC: `work/mat-91-portability/SPEC.md` (approved by the parent, both open
calls ruled — DECISIONS rulings 1 and 2). One step = one commit = one
dispatch. Closes MAT-91 and MAT-88.

## Constraints (apply to every step)

- Do NOT touch, at any step: `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md`, `skills/orchestrate/**`,
  `reference/orca.md`, `reference/runners.md`,
  `docs/how-it-works/execution.md`, `CHANGELOG.md`, the AGENTS.md stamp,
  `global/`, `templates/`, `examples/`, `README.md`,
  `docs/plans/**`. Sibling lanes own the first group; the rest are
  out of scope by SPEC. The `docs/plans/` machine-path hit and the
  README/framing no-ops are REPORTED in PROGRESS.md, never edited.
- `skills/using-ae/SKILL.md` ends every step at **≤80 lines** — the hard
  cap for the SessionStart-injected entry skill, and sibling lane B is
  making it executable this wave. Verified by command before each commit.
- **Fixed vocabulary — the citation.** The three skills of step 3 point at
  the resolution rule; they never restate its lookup order. The pointer is
  byte-identical at all three sites: `skills/using-ae` §Reference paths.
  Single definition, one home, N pointers.
- **Fixed vocabulary — the placeholder.** The loops of step 4 use exactly
  `--repo path:<repo>`, byte-for-byte the token
  `templates/repo/loops/issue-triage.example.md:41` already ships
  (parent's ruling 1). Not `<repo-path>`, not `<path>`, not a filled path.
- Evals before content: step 1 lands before step 5; step 2 lands before
  steps 3 and 4.
- Every eval of steps 1-2 grades BOTH halves of the rule: reaching the
  standard's repo by the ordered lookup, AND **saying so when it cannot**
  reach any of the three sources (parent's ruling 2 — that second half is
  the part most likely to rot, so it is graded explicitly, never implied).
- No new file outside `work/mat-91-portability/` and the four `evals/`
  directories. In particular no operator-local note file: the disk a loop
  was registered against is per-machine runtime state (SPEC §2).
- All artifacts in English.

## Steps

1. [judgment] using-ae eval FIRST: add `skills/using-ae/evals/eval-07.md`
   grading that an ask to create a skill or change a shipped skill's
   behavior routes through `## The map` to `skill-authoring`. Fixture: a
   session with using-ae injected at SessionStart, in the AE repo, asked to
   change an existing skill's guidance; `superpowers` is installed. Two
   NAMED failures: (a) reaching `skill-authoring` by the runtime's own
   trigger matching or by suite habit (`superpowers:writing-skills`)
   rather than from the map — it reads as a pass while leaving the map's
   gap intact, so the eval must require the map as the route; (b) routing
   to `work-plan` on the reasoning that a skill edit "is just an M-tier
   change" — the map's rows are phase owners and authoring is a phase
   (ADR-005). The existing six evals are not edited.
   Acceptance: `node tests/run-eval-checks.mjs` exits 0 AND its output
   contains `ok   using-ae: 7 evals well-formed`.

2. [batch] [judgment] Portability evals FIRST, one per skill whose behavior
   step 3 changes — same shape, one dispatch:
   `skills/ae-init/evals/eval-08.md` (reaching `templates/repo/` to
   instantiate), `skills/ae-audit/evals/eval-05.md` (reaching
   `scripts/agent-lint.mjs` to run the mechanical checks), and
   `skills/loop-setup/evals/eval-06.md` (reaching
   `templates/repo/loops/LOOP.md.template`). Common fixture: the skill is
   invoked on a machine that is NOT the author's, loaded through a junction
   into an AE clone, with the target repo unrelated to the standard. Each
   grades: resolve the standard's repo by `skills/using-ae` §Reference
   paths — link-resolved skill location, then a local AE clone, then
   `github.com/bygama/Agent-Engineering` — and, when none of the three is
   reachable, NAME the unreachable source instead of proceeding (ae-init:
   never invent template content; ae-audit: report the mechanical checks as
   NOT run rather than hand-wave or silently drop them; loop-setup: do not
   scaffold from a remembered template). loop-setup's carries a second
   half: the registration command it writes leaves `--repo path:<repo>`
   unfilled for the operator, and substituting the authoring machine's own
   path is a NAMED failure — the exact defect step 4 removes.
   Acceptance: `node tests/run-eval-checks.mjs` exits 0 AND its output
   contains all three of `ok   ae-init: 8 evals well-formed`,
   `ok   ae-audit: 5 evals well-formed`,
   `ok   loop-setup: 6 evals well-formed`.

3. [batch] [mechanical] Replace the machine path with the citation in all
   three skills — same one-line substitution, one dispatch:
   `skills/ae-init/SKILL.md:12-14` (the "locate your local clone" clause of
   the templates sentence), `skills/ae-audit/SKILL.md:31-33` (the "from the
   Agent-Engineering repo clone" clause of the lint sentence), and
   `skills/loop-setup/SKILL.md:63-65` (the same clause of the
   `LOOP.md.template` sentence). Each parenthetical names the standard's
   repo as resolved by the constraints block's fixed citation and nothing
   more — no local paraphrase of the three-source order, no machine path,
   no "or ask" remnant that implies the reader is on the author's box.
   `<repo-path>` on `ae-audit/SKILL.md:31` is the lint's own argument (the
   repo being audited) and stays untouched.
   Acceptance: `grep -rn "C:/Briar" skills/` exits 1 AND
   `grep -lF '§Reference paths' skills/ae-init/SKILL.md
   skills/ae-audit/SKILL.md skills/loop-setup/SKILL.md | wc -l` prints 3
   AND `grep -c "locate/ask\|or ask)\|on this machine" skills/ae-init/SKILL.md
   skills/ae-audit/SKILL.md skills/loop-setup/SKILL.md` prints 0 for each
   AND `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
   exits 0.

4. [batch] [mechanical] Replace the machine path with the operator
   placeholder inside both registration commands — same substitution, one
   dispatch: `loops/issue-triage.md:41` and `loops/self-audit.md:45`, each
   `--repo path:C:/Briar/repos/mine/Agent-Engineering` ⇒ `--repo
   path:<repo>` per the constraints block. Only the `--repo` argument
   changes: the surrounding Trigger prose — including "registered enabled
   2026-08-16", which is the registration fact worth keeping — is left as
   is, and no operator-local note file is created (SPEC §2).
   Acceptance: `grep -rn "C:/Briar" loops/` exits 1 AND
   `grep -c -- "--repo path:<repo>" loops/issue-triage.md
   loops/self-audit.md` prints 1 for each file AND
   `grep -q "registered enabled 2026-08-16" loops/issue-triage.md` exits 0.

5. [judgment] `skills/using-ae/SKILL.md` §`The map`: append the row
   `- **skill-authoring** — creating a skill or changing its behavior.`
   as the LAST row, after `ae-audit` — `README.md`'s own ordering, the
   siblings' exact `- **name** — <when it fires>.` form, 66 columns. This
   is the only line added; nothing else in the file is trimmed, reflowed,
   or re-wrapped, because at 79 the row fits and the SPEC's trim clause
   does not fire.
   Acceptance: `test "$(wc -l < skills/using-ae/SKILL.md)" -le 80` exits 0
   AND `grep -q "^- \*\*skill-authoring\*\* — " skills/using-ae/SKILL.md`
   exits 0 AND `git diff main --numstat -- skills/using-ae/SKILL.md`
   shows exactly `1` added and `0` deleted.

6. [mechanical] Gate sweep and lane truth: run all four gates, confirm no
   fenced file is in the diff, and write into PROGRESS.md the command
   evidence plus the four REPORTED items for the parent — (a) the sixth
   machine-path hit at `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md:37`,
   left unedited because a dated plan is a record; (b) `README.md` checked
   and needing nothing (already "The eleven skills" with a
   `skill-authoring` row); (c) the MAT-88 framing-sentence check resolved
   as a verified no-op (`## The map` is a bare heading with no count
   anywhere in the file); (d) the follow-up worth a ticket — a lint check
   banning machine-absolute paths on shipped surfaces, not built here
   because `scripts/agent-lint.mjs` is sibling lane B's file this wave.
   Record rulings 1 and 2 in DECISIONS.md with the parent's reasons.
   Acceptance: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
   · `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
   `node tests/run-eval-checks.mjs` all exit 0, AND `git diff --name-only
   main | grep -E '^(scripts/|tests/|templates/|global/|examples/|README\.md|CHANGELOG\.md|docs/plans/|docs/how-it-works/|skills/orchestrate/|reference/)'`
   exits 1.
