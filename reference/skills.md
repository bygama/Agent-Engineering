# Authoring skills

Source: [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).
Retrieved 2026-07-30; ported 2026-08-16.

## Frontmatter

- `name`: ≤64 chars, lowercase letters/numbers/hyphens. Gerund or
  action-oriented (`agent-init`, `tracing-root-causes`). Never vague
  (`helper`, `utils`) or reserved words (`anthropic`, `claude`).
- `description`: ≤1024 chars, **third person**, states BOTH what the skill
  does AND when to use it (triggers/key terms). Discovery depends entirely on
  this field — the model picks among 100+ skills using descriptions alone.
  - Good: "Audits a repository against the agent-engineering standard and
    reports fixes. Use when context feels bloated or after agent-init."
  - Bad: "Helps with context stuff."

## Body rules

- SKILL.md body <500 lines; split beyond that.
- Only non-inferable content — the model is already smart. Challenge every
  paragraph: does it justify its token cost?
- References exactly **one level deep** from SKILL.md (nested chains get
  partially read and information is lost).
- Reference files >100 lines start with a table of contents.
- Consistent terminology (one term per concept, always the same).
- No time-sensitive content; use an "old patterns" collapsed section instead.
- Forward slashes in all paths, even on Windows.
- Don't offer many alternatives; give one default + escape hatch.

## Degrees of freedom

Match specificity to fragility (bridge vs open field):

- **High** (text heuristics): many valid approaches, context decides.
  E.g. code review guidance.
- **Medium** (templates, pseudocode): a preferred pattern with acceptable
  variation. E.g. instantiating file templates.
- **Low** (exact scripts, no parameters): fragile or destructive sequences.
  E.g. "run exactly `python scripts/migrate.py --verify --backup`".

## Workflows and feedback loops

- Complex tasks get an explicit checklist the agent copies and ticks off.
- Quality-critical steps get a validate → fix → re-validate loop with an
  objective gate (script exit code, lint pass, checklist satisfied).
- Prefer bundled utility scripts over asking the agent to regenerate logic;
  say explicitly whether a script is to **execute** or to **read as reference**.

## Evaluation-driven development

Write evals BEFORE skill content, from observed gaps — not imagined ones:

1. Run representative tasks without the skill; document concrete failures.
2. Write 3 evals: `## Query` (verbatim request) + `## Expected behavior`
   (objective checklist).
3. Write the minimum skill content that passes them.
4. Iterate from real usage: observe where the agent stumbles, fix the skill
   (or the eval if reality proved it wrong — but evals change first, then
   content).

## Progressive disclosure patterns

1. **Overview + references**: SKILL.md holds the workflow; details live in
   `references/*.md` linked directly.
2. **Domain split**: one reference file per domain so only the relevant one
   loads.
3. **Conditional details**: "For X, see X.md" — loaded only when X arises.

## Composing with process-skill suites

`using-ae` is the always-loaded entry point (SessionStart): it carries
the precedence rule below (ADR-005) into every session so a suite chain
never has to be caught mid-drift.

Process suites (e.g. superpowers: brainstorming, test-driven-development,
systematic-debugging) supply the *how* of thinking; this standard
supplies the artifacts and gates. One rule joins them: **the standard
owns locations and lifecycle endings.**

- Design/brainstorm output → the lane's SPEC (or `docs/specs/` for
  standing designs), never the suite's default folder.
- A written plan → `work/<slug>/PLAN.md`.
- Execution runs inside the lane: WIP=1, tier ceremony applies.
- Finishing → `work-handoff` (the suite's own finishing step yields to
  it); worktrees are Orca-managed (`reference/orca.md`).

Suites that say "user preferences override defaults" (superpowers does)
are honoring exactly this. One artifact set, never two.

**Every artifact-producing phase is the standard's, not the suite's**
(ADR-004, generalized by ADR-005). Suites supply the thinking phases —
brainstorming, TDD, systematic-debugging. Planning is the standard's:
`skills/work-plan` turns an approved design into `work/<slug>/PLAN.md`,
the lane's own file. From the moment that plan lands, the standard
executes: `skills/work-run` runs the lane step-by-step (fresh subagent
per step, lane as the context package), work-verify gates it,
work-handoff ends it. A suite's own planners, executors, and finishers
(superpowers' `writing-plans`, `subagent-driven-development`,
`executing-plans`, `finishing-a-development-branch`) are not used —
their artifact machinery (a standalone plan document, workspace,
ledger, rulings) collides 1:1 with the lane's files, and two protocols
over the same information is permanent friction. The suite stays
installed; this rule is what redirects the chain.
