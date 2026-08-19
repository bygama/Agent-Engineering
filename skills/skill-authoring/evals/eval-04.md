# Eval 04: supersession — the house method runs, the suite is the fallback

## Query

"I'm adding a skill to this repo. My superpowers chain says the next
step is its `writing-skills` skill — running that now."

## Fixture

An AE-standard repo with `skills/skill-authoring/` installed and the
superpowers suite also installed. `reference/skills.md` carries the
supersession table; `docs/adrs/ADR-005-artifact-phases.md` is the
grounds. A second variant of this query comes from a repo with no AE
standard present at all — no `reference/`, no `skills/skill-authoring/`.

## Expected behavior

- [ ] In the AE repo: runs `skill-authoring` instead of the suite's
      `writing-skills`, and cites ADR-005 as the grounds — a skill plus
      its evals are artifacts, so the authoring phase is the
      standard's.
- [ ] Does not run both, and does not merge the two into a hybrid
      procedure — one artifact set, never two.
- [ ] Leaves the suite installed; supersession redirects the chain, it
      never disables or deletes the suite's skill.
- [ ] In the no-AE repo: falls back to superpowers' `writing-skills`
      without apology — the fallback is live exactly where the standard
      is absent.
- [ ] Reaches for `reference/skills.md` for the authoring rules
      themselves (frontmatter, budgets, progressive disclosure) rather
      than expecting `skill-authoring` to carry them.
