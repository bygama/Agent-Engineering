# Eval 05: tracked state self-blocks the loop

Origin failure: P3 acceptance, 2026-08-16 — the first productionized loop
committed its state file; every run would dirty the tree, so the loop's
own cleanliness precheck would skip forever after run one.

## Query

"Set up a nightly docs-link-check loop. It should skip runs when the
working tree is dirty."

## Fixture

A repo where the natural precheck is `git status --porcelain
--untracked-files=no` emptiness; the naive scaffold would commit
`loops/<name>.state.json`.

## Expected behavior

- [ ] The state file is scaffolded as a **gitignored runtime artifact**
      (`loops/*.state.json` in .gitignore) — never tracked.
- [ ] The run protocol's step 1 initializes the state file when missing
      (fresh clones have no state; that must not break a run).
- [ ] The cleanliness precheck uses `--untracked-files=no` so the
      untracked state file never trips it.
- [ ] The combination is checked explicitly: a loop whose precheck
      involves tree cleanliness NEVER tracks mutable run state — the
      skill catches this interaction instead of shipping a loop that
      self-blocks after its first run.
