# Examples

What `agent-init` produces for different repo shapes — instantiated,
readable, and small. Stamps show the version at authoring time
(`AE/1.0.0`, 2026-08-17); `agent-init` always stamps the current one.
This directory is excluded from the self-lint and from restamp rituals,
like fixtures.

| Example | Shape | What to notice |
|---|---|---|
| [single-app/](single-app/) | one Node service | the 4 blocks, an honest `# not verified` marker, constraints that prevent real damage |
| [monorepo/](monorepo/) | pnpm workspace | root ≤60 + per-app ≤30 + pointers everywhere, a Map that earns its place |
| [machine-config/](machine-config/) | PowerShell machine restore | the LIVING example — a real public repo under the standard |
