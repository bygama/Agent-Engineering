# MAT-6 SessionStart Orca probe hook — decisions

- 2026-08-17 — Hook identity is the exact command string; the merge adds
  and never updates or removes (the property that keeps Orca-injected
  hooks safe). The edit-site footgun (a command/timeout edit does not
  propagate) is documented in workstation `claude/README.md` instead of
  adding update-in-place logic — smallest change; revisit only if an
  edit actually hits it.
- 2026-08-17 — Review's low latent findings accepted without code
  change: wrapper-command dedupe false positive, matcher-insensitive
  dedupe, entry-granular suppression — all require repo hooks that do
  not exist today (single distinctive `pwsh` command shipped).
- 2026-08-17 — Adversarial review offered (M opt-in, high-risk merge
  logic); owner declined — fresh-context review had already verified
  merge preservation against a synthetic Orca-hook fixture.
