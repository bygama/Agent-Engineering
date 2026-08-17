# MAT-27 SemVer 1.0.0 rework — plan (all accepts met — see PROGRESS)

Owner-approved 2026-08-17. Conventions verified at source today:
SemVer 2.0.0 (MAJOR breaking / MINOR capability / PATCH fix; 0.x =
initial development) and Keep a Changelog 1.1.0 (Added/Changed/Fixed
sections, ISO dates, newest first, humans first).

- [x] CHANGELOG reworked: criterion in the header, 1.0.0 entry,
      0.x renumbered history with former AE/2.x names, 0.1.0
      predecessor — accept: header cites both specs with dates
- [x] agent-lint stamp-shape accepts `AE/MAJOR.MINOR.PATCH` (two-part
      stays valid shape) — accept: all four gates exit 0
- [x] Restamp surfaces at `AE/1.0.0` (root AGENTS.md, README badge,
      AGENTS.md.template, v2-clean fixture) — accept:
      `rg "AE/2\." <live surfaces>` empty
- [x] README gains Installing / Customizing / Examples — accept:
      sections exist, links resolve
- [x] examples/ (single-app, monorepo, machine-config) — accept:
      self-lint with `--ignore tests,templates,global,examples` exit 0
- [x] Ignore lists updated (AGENTS.md, gates.yml, self-audit loop,
      CONTRIBUTING) — accept: grep shows the new ignore everywhere
- [x] ADR-003 + SPEC Decision 3 amendment pointer — accept: files exist,
      SPEC cites ADR-003
- [x] migration.md renumbered + 0.6.1→1.0.0 note — accept: note present
- [x] docs-sweep battery updated (version patterns, examples on the
      deliberate-clean list) — accept: file reflects the new scheme
- [x] workstation restamped `AE/1.0.0` — accept: its CI green
- [x] Fresh-context review — accept: PASS verdict
