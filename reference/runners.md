# Runners

Sources: machine verification (2026-08-16, noted per row);
[Codex CLI docs](https://developers.openai.com/codex/cli),
[OpenAI: Harness engineering](https://openai.com/index/harness-engineering/) (AGENTS.md-first);
[Gemini CLI docs](https://github.com/google-gemini/gemini-cli) (`contextFileName`);
[opencode docs](https://opencode.ai/docs) (AGENTS.md rules);
[deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) (dev preview).
Retrieved 2026-08-16.

## The premise

Work state is files — canonical AGENTS.md plus `work/<slug>/` lanes — so
**any file-reading agent can take over any lane**. A runner needs three
things: the entry file, the lane, the DoD. Nothing else transfers, and no
runner-specific adapter file is ever created (the ban stands mid-fan-out).

## Per-runner table

| Runner | Entry file | Skills | Headless spawn | Status |
|---|---|---|---|---|
| Claude Code (`claude`) | `CLAUDE.md` → imports `AGENTS.md` via the pointer | native (SKILL.md) | `claude -p "<prompt>"` in the worktree | verified on this machine 2026-08-16 |
| Codex CLI (`codex`) | `AGENTS.md` natively | none — point at the skill file | `codex exec "<prompt>"` | docs-cited; verify on install |
| Gemini CLI (`gemini`) | `GEMINI.md` by default — set `contextFileName: "AGENTS.md"` in settings; never create a GEMINI.md adapter | none — point at the skill file | `gemini -p "<prompt>"` | docs-cited; verify on install |
| opencode | `AGENTS.md` natively | own format — point at the skill file | `opencode run -m <provider/model> "<prompt>"` (e.g. `-m opencode/deepseek-v4-flash-free`, a no-auth free model via the opencode gateway) | verified on this machine 2026-08-16 — completed the portability-proof lane |
| Grok CLI (`grok`) | unverified | unverified | unverified | verify on install |
| deepseek-harness (`dsh`) | `AGENTS.md` | unverified | unverified | dev preview, breaking changes announced — zero coupling by decision; verify on install |

"Verify on install" is a hard rule: no spawn command enters a worker table
until it ran on the target machine (`--help` at minimum). Install gotcha:
with npm `ignore-scripts=true`, opencode's platform binary never arrives —
install `opencode-<os>-<arch>` explicitly and run the package's
`postinstall.mjs` once by hand.

## Runners without skill support

Skills are plain markdown procedures. A runner that doesn't load SKILL.md
files is told, in its prompt: "read `<path>/SKILL.md` and follow it as a
procedure" — same contract, no adapter.

## Spawn inheritance

A spawned worker inherits the spawner's account and configuration unless
told otherwise. On machines with multiple accounts or config dirs, the
spawn command must select explicitly (e.g. Orca terminals take
`--command`); the machine-specific selector rules live in the **global
layer** (`~/.claude/CLAUDE.md`), never in a repo — repos stay
machine-agnostic.

## Orchestrating across runners

The coordinator does not care which runner holds a lane: the reducer
contract consumes lane artifacts (Verification PASS + summary), which
every runner produces the same way. Mixing runners in one fan-out is
therefore free by construction — the portability proof for this standard
is exactly that: a non-Claude runner completing a lane end to end from
the artifacts alone.
