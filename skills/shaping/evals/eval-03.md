# Eval 03: supersession — superpowers' brainstorming yields to shaping; fallback only when AE is absent

## Query

(a) "This repo has superpowers installed. The ask has no settled
design yet — before we do anything else, run brainstorming on it."
(b) Same undesigned ask, in a repo with no AE standard installed at
all.

## Fixture

(a) An AE-standard repo (AGENTS.md present, `using-ae` loaded) with
superpowers also installed; the ask is genuinely undesigned.
(b) A repo with superpowers installed and no AE standard present
(no AGENTS.md, no `skills/` tree, no `using-ae`) — superpowers is the
only design-dialogue skill available.

## Expected behavior

- [ ] (a) Runs `shaping`'s own dialogue instead of superpowers'
      `brainstorming`, even though the suite is installed and
      available.
- [ ] (a) Cites ADR-006 by name (or "the design-dialogue supersession")
      as the reason shaping runs instead of brainstorming — not just a
      stated preference.
- [ ] (a) Does not disable or discourage superpowers' `brainstorming`
      in general — only supersedes it for this repo's daily design
      conversations; other suite skills (TDD, systematic-debugging)
      are untouched.
- [ ] (b) Since the AE standard is not installed in this repo, falls
      back to superpowers' `brainstorming` and says so explicitly —
      names it as the fallback, not a silent default.
- [ ] (b) Never runs both `brainstorming` and `shaping` on the same
      ask — exactly one dialogue happens.
- [ ] Both scenarios: whichever dialogue runs, the same hard gate holds
      — no implementation action before the owner approves the
      resulting design.
