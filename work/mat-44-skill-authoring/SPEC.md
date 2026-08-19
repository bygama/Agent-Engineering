---
issue: MAT-44
---
# skill-authoring — spec

<!-- Owner-written (work-plan design-first mode: the parent's dispatch
     brief for MAT-44 is the settled design — shaped at dispatch time,
     not re-decided here). -->

Done looks like: AE owns the skill-authoring phase. `skills/skill-authoring`
carries the METHOD for building a skill — the RED-GREEN-REFACTOR cycle for
documentation, and the rule that the guidance's *form* follows the observed
failure — while `reference/skills.md` stays the law it cites (evals-first
skeleton, description discipline, budgets, progressive disclosure).
Superpowers' `writing-skills` is superseded for our authoring (ADR-005
reasoning), fallback-only where AE isn't installed. No release in this lane.

## 1. The skill (`skills/skill-authoring/`)

Narrow — one job, the method that turns an observed failure into a skill
that fixes it. Stolen from superpowers' `writing-skills`, adapted; never
copy-pasted.

- **Input**: a skill about to be created or edited (new skill, or any
  change to an existing skill's behavior).
- **The core principle**: a skill is documentation under test. If you did
  not watch an agent fail without the skill, you do not know what the skill
  should teach. The house evals-first contract (`reference/skills.md`) is
  the test format; the baseline run is what makes those evals honest rather
  than imagined.
- **The cycle** (RED → GREEN → REFACTOR, mapped onto the house contract):
  - **RED** — run the task WITHOUT the skill, in a fresh-context subagent;
    document the observed failure and the agent's rationalizations
    verbatim. No baseline, no skill.
  - **GREEN** — write the minimum content that fixes *that* failure. No
    content for hypothetical cases.
  - **REFACTOR** — re-run; a new rationalization is a new hole; add its
    counter and re-test until the runs converge.
- **Match the form to the failure** (the evidence-backed table, adapted):
  discipline violation → prohibition + rationalization table + red flags;
  wrong-shaped output → positive recipe/contract stating what the output
  IS; omitted element → a REQUIRED structural slot; conditional behavior →
  a conditional keyed to an observable predicate. Plus the two rules that
  travel with it: no nuance clauses, exemption clauses don't scope.
- **Micro-testing wording** before full scenarios: fresh-context sample per
  rep, a no-guidance control ALWAYS (no failure in the control → nothing to
  author), 5+ reps, every flagged match read by hand, variance as a metric.
- **The law is elsewhere**: the skill points at `reference/skills.md` for
  frontmatter, budgets, degrees of freedom, progressive disclosure and the
  ≥3-evals skeleton — it never restates them. One addition the law does not
  carry: a description states what + when, never a step-by-step workflow
  summary (a summarized workflow becomes the shortcut agents take instead
  of reading the body).
- **Rationalization table + red flags** for the one discipline this skill
  itself enforces: skipping the baseline.
- One reference file, one level deep:
  `references/testing-with-subagents.md` — pressure scenarios and pressure
  types, the skill-type → test-approach map (discipline / technique /
  pattern / reference), the micro-test protocol, meta-testing when GREEN
  won't hold, and the stop condition. Table of contents (>100 lines).
- Body budget: house register like work-plan/shaping (<500 hard, ~150-200
  target); description = what + when, third person.

YAGNI'd from the source, deliberately: SDO/keyword/naming guidance and
token-efficiency targets (`reference/skills.md` law), directory-structure
and file-organization sections (law), flowchart/graphviz conventions and
the renderer (no house need), persuasion-principles as its own file (the
one actionable sentence rides inside the reference file instead),
multi-language example anti-patterns (law).

## 2. Supersession (`reference/skills.md`)

The composing section gains a compact table — this file is mine this wave:

- superpowers' `writing-skills` → superseded by `skills/skill-authoring`
  (ADR-005: a skill plus its evals ARE artifacts, so the authoring phase is
  the standard's), fallback-only where AE isn't installed.
- Two FORWARD rows for the sibling lanes landing in `bygama/skills` today:
  superpowers' `systematic-debugging` → absorbed by that library's
  `tracing-root-causes`; superpowers' `test-driven-development` → superseded
  by that library's house TDD skill. The thinking-phases clause that named
  those two as untouched is amended in the same edit.
- The file holds its ≤120-line budget: compress redundant prose in place
  rather than growing past it.

## 3. Docs (same change, hard constraint)

- `docs/how-it-works/architecture.md`: skill roster count and prose ("all
  ten" → eleven) gains `skill-authoring`; the passage narrating the
  evals-before-content contract names the skill that now owns the method.
- `README.md`: "The ten skills" → eleven, table row, and the chain prose
  where skills are enumerated.
- Any other how-it-works chapter narrating skill authorship, if the sweep
  finds one.

## 4. Evals first (≥4)

- eval-01 RED discipline: a new skill is requested with a plausible reason
  to skip the baseline → the baseline subagent run happens BEFORE any
  content, failures captured verbatim; the skip-pressure is refused.
- eval-02 form matching: a baseline whose failure is wrong-shaped output
  (not a discipline violation) → a positive recipe/contract, not a
  prohibition list; no nuance clause appended.
- eval-03 edits + evals-first: an existing skill needs a behavior change →
  evals change first, the change is driven by an observed failure rather
  than an imagined one, and the law in `reference/skills.md` is cited
  rather than restated.
- eval-04 supersession: a superpowers chain pointing at `writing-skills` →
  `skill-authoring` runs instead, citing ADR-005; the fallback holds only
  where AE isn't installed.

## 5. DoD (L)

feature_list.json rows gate on their own commands; four gates exit 0
(self-lint, lint self-tests, gen self-tests, eval-checks); fresh-context
whole-lane review; PR open with `Closes MAT-44`, never merged by this lane.

## 6. Fence (parent's, binding)

Do NOT touch: `skills/using-ae/**` (sibling lane in flight), CHANGELOG.md,
the AGENTS.md version stamp, `global/`, `templates/`, `examples/`. No
release in this lane.
