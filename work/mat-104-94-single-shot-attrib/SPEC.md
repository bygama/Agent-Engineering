---
issue: MAT-104
---
# Single-shot worker_done + upstream attribution stance — spec

<!-- Shaped from the parent orchestrator's dispatch design (2026-08-19).
     Family: MAT-104 (closes) + MAT-94 AE-side (part of; the closing PR
     lives in bygama/skills). One lane, one PR. -->

## What done looks like

### MAT-104 — worker_done is single-shot per dispatch

Live failure 2026-08-19 (MAT-99 review seat, dispatch ctx_89d1cd83c0c2):
a backtick-heavy verdict body failed to parse, the seat test-fired the
channel with a placeholder (`--subject "t" --body "t"`), the placeholder
burned the dispatch's single-shot worker_done capability, and the real
verdict arrived only inside Orca's rejected-worker_done wrapper.

1. **`skills/orchestrate/references/reviewer.md`** — the fenced brief
   (the part the seat actually reads) warns: worker_done is SINGLE-SHOT
   per dispatch — never test-fire the channel with a placeholder; if a
   send fails to parse, fix the escaping (write the body to a file and
   use `--body "$(cat file)"`; avoid backticks in the body) and send
   ONCE.
2. **`reference/runners.md`** — near the reviewer-seat launch recipe
   (the TUI-form paragraphs), the same single-shot warning in one or
   two lines, citing the reviewer template rather than restating it
   (single-definition discipline).
3. **`skills/orchestrate/SKILL.md` step 6** — parent-side guidance: a
   degenerate worker_done (placeholder body) from a seat whose
   transcript still advances is neither idle nor a FAIL — diagnose with
   `worker-read`, ack the placeholder as noise, hold for the follow-up;
   Orca's rejected-worker_done wrapper quoting the original body
   verbatim is valid verdict evidence when pasted into the lane.
4. **`docs/how-it-works/execution.md`** — the review-wave narration
   (stage 6) gains the same lesson in the same change (house rule:
   behavior change updates the affected chapter).

### MAT-94, AE-side — evidence-based attribution classification

Owner ruling 2026-08-19, recorded in the ticket: copyright protects
expression, not ideas; notices are ADDITIVE — the repo stays MIT
(c) 2026 Mateo Garcia.

5. **Diff both candidate skills against real upstream** (superpowers
   6.3.0, cached at `C:/Users/mateo/.claude/plugins/cache/`
   `claude-plugins-official/superpowers/6.3.0/skills/` — the version
   MAT-46's provenance names):
   - `skills/shaping/SKILL.md` vs upstream `brainstorming`;
   - `skills/skill-authoring/SKILL.md` vs upstream `writing-skills`.
   If the cache path is gone, say so in DECISIONS.md and classify from
   the port records — never guess.
6. **Classify each, section by section where it matters:**
   - substantial ported expression/structure → append a short upstream
     notice to the file (upstream project, upstream skill, MIT (c) 2025
     Jesse Vincent);
   - idea-only rewrite → NO notice; the classification WITH diff
     evidence (matching phrases counted, or their absence) goes in
     DECISIONS.md.
   Priors from the dispatch (to test, not to assume): shaping was
   designed fresh in an owner dialogue; skill-authoring stole the
   METHOD (RED-GREEN for docs, form-matching) — judge whether method
   vocabulary alone crosses into expression.
7. **`reference/skills.md`** — the porting/steal guidance gains the
   stance rule in 2-4 lines: on every port, diff against upstream;
   substantial portions carry the upstream MIT notice per file;
   idea-only rewrites record their classification in the lane. The
   file sits at 119 of its 120-line budget — trim something genuinely
   redundant to make room and name the trim in DECISIONS.md.

### Evals before content

`skills/orchestrate/evals/eval-03.md` grades the review wave (it gained
the --auto and stall-clock assertions on this same stacked branch).
Where the SKILL.md/reviewer.md changes alter graded behavior — the
single-shot seat rule and the parent's degenerate-worker_done handling
— the eval line changes BEFORE the content.

## Constraints

- STACKED LANE: branch cut from `bygama/mat-100-101-ballena-auto`
  (open PR #77); the PR opens with base `bygama/mat-100-101-ballena-auto`,
  NOT main. Gates run on the stacked tree — expected and correct.
- Never touch: `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `global/`, `examples/`, `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md` (open PR #78 owns those
  last three). No version bump, no restamp, no CHANGELOG entry — this
  ships with 1.4.2 later.
- Owned files: `skills/orchestrate/**`, `reference/runners.md`,
  `reference/skills.md`, `skills/shaping/SKILL.md`,
  `skills/skill-authoring/SKILL.md`, `docs/how-it-works/execution.md`,
  this lane folder.
- All four gates exit 0 before the PR: self-lint, lint self-tests,
  gen self-tests, eval-structure suite.
- PR body carries `Closes MAT-104` and `Part of MAT-94` on separate
  lines — never "Closes MAT-94". The PR is left OPEN for the parent's
  review — the missing merge is not a stall.
- All artifacts in English.
