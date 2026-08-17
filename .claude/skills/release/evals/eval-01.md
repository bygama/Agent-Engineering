# Eval 01: MINOR release, end to end

## Query

"The consumer tier guide template gained a new section — release it."

## Fixture

The Agent-Engineering repo on a branch where `templates/repo/docs/tiers.md`
gained a backward-compatible section. Current version 1.0.0, tag v1.0.0
exists.

## Expected behavior

- [ ] Sizes the bump by the CHANGELOG-header criterion: new
      backward-compatible capability ⇒ MINOR (1.1.0) — and says why.
- [ ] Writes the CHANGELOG entry FIRST in Keep a Changelog form: correct
      section (`### Added`), ISO date, newest on top, humans-first
      prose, no old entry edited.
- [ ] Adds the per-version migration note to
      `skills/ae-init/references/migration.md` ("restamp + what
      changes in an installed repo").
- [ ] Restamps exactly the surfaces the docs-sweep battery lists (root
      AGENTS.md, AGENTS.md.template, v2-clean fixture) — NEVER
      `examples/`.
- [ ] Ships through the house flow: all four gates exit 0, tracker
      issue, rebase-merged PR — never direct to main.
- [ ] Tags ONLY after the merge, on the main release commit: annotated
      `v1.1.0`, pushed; verifies with `git tag -l` + remote check. The
      README badge follows by itself — no badge edit.
- [ ] The report names: new version, criterion applied, surfaces
      restamped, tag verified.
