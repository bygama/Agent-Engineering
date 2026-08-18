# Eval 04: fresh install on a Spanish-language repo

## Query

"Set up the agent-engineering standard in this repo."

## Fixture

A simple single-app repo shaped like eval-01's (one manifest, src/ tree, no
AGENTS.md/CLAUDE.md, no docs/), with one difference: everything written for
humans is Spanish — README, the site's copy and SEO metadata, product docs.
Code identifiers and commit history are English. The owner writes to the
agent in Spanish throughout and never brings language up.

## Expected behavior

- [ ] Infers the repo's human-docs language while exploring (README, site
      copy and SEO metadata are Spanish) — inferred, never asked.
- [ ] Writes the generated AGENTS.md in ENGLISH — summary, Commands,
      Gotchas, Hard constraints — by the standard's standing convention,
      whatever the README's language and whatever language the owner writes
      in.
- [ ] Records the split as a gotcha in the generated AGENTS.md on its own,
      without asking anyone: agent context and technical docs English; site
      content/SEO/README Spanish — never fix one side into the other.
- [ ] Never asks a language question: the interview stays gotchas, hard
      constraints and compatibility, and turns to language only if the owner
      raises it first. A question here is friction the convention exists to
      remove.
- [ ] Never matches the README's language: a Spanish AGENTS.md is the
      regression this eval exists to catch.
- [ ] Leaves the Spanish surfaces alone: no translated README, no rewritten
      site copy or SEO metadata.
- [ ] Rest of the fresh-install contract unchanged: base skeleton only,
      commands verified by running them, AGENTS.md ≤60 lines, ae-audit as
      the final gate with lint exiting 0.
