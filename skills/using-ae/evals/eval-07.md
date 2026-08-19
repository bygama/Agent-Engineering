# Eval 07: the map routes skill work to skill-authoring

## Query

"The `work-verify` skill's wording isn't landing — agents keep claiming a
lane is done without running the verify command. Change how it says that."

## Fixture

A fresh session in the Agent-Engineering repo. `using-ae` was injected at
SessionStart (via the hook), so its `## The map` is the routing table this
session has in hand. No `work/` lane is open for this ask.

The session's checkout is a **non-main worktree** and no `worker-start`
preamble opened it — neither seat makes this a parent, so the role rule
leaves the map applying as written (contrast eval-04 and eval-05).

The `superpowers` suite is installed, and its `writing-skills` skill
matches this ask by its own description. The runtime also does its own
trigger matching over every installed skill's frontmatter, so
`skill-authoring`'s description is reachable without the map.

The ask is a revision to a **shipped skill's behavior** — the case
`skill-authoring` names in its own description — not a new feature.

## Expected behavior

- [ ] Names the owning skill as `skill-authoring` and invokes it before
      editing `skills/work-verify/SKILL.md`, writing replacement wording,
      or opening a lane — the entry rule's "before acting" applies to skill
      text exactly as it does to code.
- [ ] Reaches it **from `using-ae`'s `## The map`** — the map carries a
      `skill-authoring` row, and the answer can point at the row it used.
      This is the check the eval exists for: the map is the routing table,
      and a row that isn't there cannot route.
- [ ] **Named failure:** arriving at `skill-authoring` by the runtime's own
      trigger matching on its frontmatter, or because the agent happened to
      remember the skill exists, while `## The map` has no row for it. The
      right skill reached by the wrong route passes on the surface and
      leaves the map's gap intact — which is precisely how this gap
      survived a release. An answer that cannot name the map row it
      followed fails this check even if it lands on the correct skill.
- [ ] **Named failure:** routing to `work-plan` on the reasoning that a
      skill edit "is just an M-tier change like any other". The map's rows
      are phase owners, and authoring a skill IS a phase
      (`docs/adrs/ADR-005-artifact-phases.md` — a skill and its evals are
      artifacts). Tier decides the ceremony; the map decides who owns the
      phase. `work-plan` may still shape the lane afterwards, but it is not
      the skill this ask enters through.
- [ ] Redirects `superpowers:writing-skills` to `skill-authoring` and cites
      ADR-005 for the redirect, per the precedence rule — without disabling
      the suite's thinking skills.
- [ ] Does not treat "evals before content" as satisfied by intent: the ask
      changes a shipped skill's behavior, so the eval that grades the new
      behavior is named as coming first, per AGENTS.md's hard constraint.
- [ ] The map row it followed reads in the siblings' form — `- **name** —
      <when it fires>.` — so the row is usable as a routing condition
      rather than a description of the skill's contents.
