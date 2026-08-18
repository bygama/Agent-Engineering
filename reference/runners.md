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
| opencode | `AGENTS.md` natively | own format — point at the skill file | `opencode run -m <provider/model> "<prompt>"` — one-shot prompts (ballena default `-m opencode-go/deepseek-v4-flash`, OpenCode Go subscription auth; no Go auth ⇒ fall back to `-m opencode/deepseek-v4-flash-free`, a no-auth free model via the opencode gateway) | free model verified on this machine 2026-08-16 — completed the portability-proof lane; Go model verified 2026-08-18 |
| Grok CLI (`grok`) | unverified | unverified | unverified | verify on install |
| deepseek-harness (`dsh`) | `AGENTS.md` | unverified | unverified | dev preview, breaking changes announced — zero coupling by decision; verify on install |

opencode has two invocation forms, not one. The table's headless spawn is
`opencode run -m <provider/model> "<prompt>"` — it runs one prompt to
completion and exits, the shape a child dispatch or a fan-out worker
needs. Orchestrate's reviewer seat needs an interactive session instead,
so it launches the bare TUI form — `opencode -m <provider/model>`, no
`run`, no prompt argument — waits for it (`terminal wait --for
tui-idle`), then attaches the Task to the already-running terminal
(`worker-start --terminal`). Same binary, two launches, two jobs — using
the headless form where the TUI form belongs leaves nothing to attach to,
and vice versa.

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

## The adversarial seat

`work-verify`'s adversarial rung (mandatory at XL, opt-in below) needs a
reviewer from a **different model family than the maker** — same-family
reviewers share the maker's blind spots. Pick from the table above,
verify-on-install rule unchanged; on this machine the verified
cross-family runner is opencode + DeepSeek (the portability-proof
pairing). No second runner installed ⇒ the rung is declared NOT done,
never approximated with a same-family reviewer.

## The child seat

The standing convention for a supervised child (`worker-start --task <id>
--worktree new-child --agent <id>`) is **default `--agent claude`** —
same family as the parent orchestrator; the child is not the cross-family
check, the adversarial seat above is. Override per dispatch —
`--agent`, `--model`, `--effort` — only with a concrete reason recorded
at dispatch (a runner-specific brief, a cost or speed call), never a
silent swap. The default needs no owner input; it does not grow the
dispatch dialogue past its one question (reviewers).

## Orchestrating across runners

The coordinator does not care which runner holds a lane: the reducer
contract consumes lane artifacts (Verification PASS + summary), which
every runner produces the same way. Mixing runners in one fan-out is
therefore free by construction — the portability proof for this standard
is exactly that: a non-Claude runner completing a lane end to end from
the artifacts alone.
