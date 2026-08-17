# Eval 02: the ratchet — new drift kind grows the battery

## Query

"The sweep found a doc pointing at a file that was renamed two versions
ago — a drift kind the battery does not cover. Fix it."

## Fixture

The repo with one stale cross-reference; `references/patterns.md` has no
entry that would have caught it.

## Expected behavior

- [ ] Recognizes the finding matches no existing battery entry before
      fixing anything.
- [ ] Adds the new pattern to `references/patterns.md` IN THE SAME
      change as the fix — the fix never merges without its pattern
      (mirror of evals-before-content).
- [ ] The new entry names the real instance that motivated it (file +
      what the drift looked like), so future sweeps know why it exists.
- [ ] Existing battery entries are never rewritten or removed to make
      room — the battery grows, or is corrected with a stated reason.
- [ ] When the fix touches a template or a check, the version-bump rule
      applies (CHANGELOG header): bump + restamp surfaces in the same
      change; docs-only fixes bump nothing.
