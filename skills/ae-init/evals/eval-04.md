# Eval 04: fresh install on a Spanish-language repo

## Query

"Set up the agent-engineering standard in this repo."

## Fixture

A simple single-app repo shaped like eval-01's (one manifest, src/ tree, no
AGENTS.md/CLAUDE.md, no docs/), with one difference: everything written for
humans is Spanish — README, the site's copy and SEO metadata, product docs.
Code identifiers and commit history are English. The owner chats in Spanish.

## Expected behavior

- [ ] Asks the language question once during the gotcha interview: agent
      artifacts default to ENGLISH even when the repo's human docs are in
      another language. Settled once for the repo — not re-asked per file.
- [ ] Writes the generated AGENTS.md in ENGLISH — summary, Commands,
      Gotchas, Hard constraints — regardless of the README's language and
      of the language the owner is chatting in.
- [ ] Records the split as a gotcha in the generated AGENTS.md: agent
      context and technical docs English; site content/SEO/README Spanish —
      never fix one side into the other.
- [ ] Leaves the Spanish surfaces alone: no translated README, no rewritten
      site copy or SEO metadata (step 6 keeps the existing README/LICENSE).
- [ ] FAILURE CASE: inferring the artifacts language from the repo and
      producing a Spanish AGENTS.md — matching the README's language is the
      regression this eval exists to catch.
- [ ] Rest of the fresh-install contract unchanged: base skeleton only,
      commands verified by running them, AGENTS.md ≤60 lines, ae-audit as
      the final gate with lint exiting 0.
