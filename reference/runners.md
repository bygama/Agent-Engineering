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
so it launches the bare TUI form — `opencode -m opencode-go/deepseek-v4-flash
--auto`, no-auth fallback `opencode -m opencode/deepseek-v4-flash-free
--auto` — no `run`, no prompt argument — waits for it (`terminal wait
--for tui-idle`), then attaches the Task to the already-running terminal
(`worker-start --terminal`). Same binary, two launches, two jobs — using
the headless form where the TUI form belongs leaves nothing to attach to,
and vice versa.

`--auto` is required on every opencode TUI reviewer launch — the
ballena's Go default and free fallback, and the ratón below — not a
tip; the headless
`run` form above takes no `--auto`. Verified on this machine
2026-08-19: `--auto` auto-approves permissions not explicitly denied;
without it the reviewer hangs at a permission prompt nobody watches — a
78-minute live stall on the MAT-91 review, undiagnosable from the
parent's seat (worker `ready`, terminal `running`, transcript EMPTY,
`latestCursor: 0`). It is safe for THIS seat only because the filled
`reviewer.md` forbids commit/push/merge and any file edit; the same flag
on a WRITING seat is a different decision — not this one.

The reviewer's `worker_done` report is single-shot per dispatch, too —
see `skills/orchestrate/references/reviewer.md`'s fenced brief
("Reporting your verdict") for the send-once discipline; this file only
launches the seat, it does not restate that rule.

The ballena is the dispatch dialogue's default seat, not the only one.
**Ratón chispeante** is this machine's second verified cross-family
reviewer — `opencode --auto -m opencode-go/muse-spark-1.2-contributor`,
picked by the owner per lane rather than offered by default, launched
exactly like the ballena: bare TUI form, `terminal wait --for tui-idle`,
then `worker-start --terminal`. Same `--auto` rationale as above, on the
same read-only-seat condition. Verified 2026-08-19 across two production
reviews — the MAT-104 and MAT-94 waves, both PASS at ballena grade.

A fresh seat can stop at opencode's DATA-COLLECTION consent prompt,
which `--auto` does NOT cover — a different prompt class from the
permission prompts it auto-approves. Acceptance is manual and one-time
per machine/model (the owner cleared it live on the MAT-94 seat); check
it first when a new seat never reaches `tui-idle`.

Known behavior, not a rule: one ratón seat's `worker_done` printed
"(no output)" and never registered in the ledger — the verdict was read
off the transcript rather than re-sent, the single-shot rule above
holding wherever the verdict surfaces. Cause unattributed, model or CLI.

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
cross-family pairings are opencode + DeepSeek (the portability-proof
pairing, the ballena) and opencode + Muse Spark (the ratón chispeante).
No second runner installed ⇒ the rung is declared NOT done, never
approximated with a same-family reviewer.

## The child seat

The standing convention for a supervised child (`worker-start --task <id>
--worktree new-child --agent <id>`) is **default `--agent claude`** —
same family as the parent orchestrator; the child is not the cross-family
check, the adversarial seat above is. Override per dispatch —
`--agent`, `--model`, `--effort` — only with a concrete reason recorded
at dispatch (a runner-specific brief, a cost or speed call), never a
silent swap. The default needs no owner input; it does not grow the
dispatch dialogue past its one question (reviewers).

Stock is the default, not a requirement. A child that genuinely needs
argv those three flags cannot express — a wrapper binary, custom flags —
takes the reviewer seat's two-step launch instead, in the runner's TUI
form, with the argv reason recorded in the Task spec like any other
override. Worktree first: a terminal is created *in* one.

`reference/orca.md` calls bare `worktree create` + a later `terminal
create --command <agent>` the anti-pattern; as the default it is — this
section is its one named exception, on the conditions above and below.

```bash
orca worktree create --name <slug> --base-branch <base> \
  --parent-worktree active --setup run --linear-issue <KEY> --json
orca terminal create --worktree id:<new_worktree_id> \
  --command "<runner argv>" --json
orca terminal wait --terminal <handle> --for tui-idle --timeout-ms 60000 --json
orca orchestration worker-start --task <task_id> --terminal <handle> --json
```

`--setup run` belongs on the create because the dispatch will not run
setup; that, and the rest of what this path trades away, is the cost list
in `skills/orchestrate/SKILL.md` step 4 — read it before choosing it.

Closing the fallback shell is a **required step here**, not advice: the
bare create can leave a startup shell of its own; observed both ways on
this repo's own Run (2026-08-19: present on some launches, absent on the
MAT-91 review seats) — the runner lives in a second terminal (`orca
terminal list --worktree <sel> --json` shows both). Confirm that shell
is actually unused before closing it (`orca terminal close --terminal
<handle>`) — never close it blindly, never leave it running as debris.

## Orchestrating across runners

The coordinator does not care which runner holds a lane: the reducer
contract consumes lane artifacts (Verification PASS + summary), which
every runner produces the same way. Mixing runners in one fan-out is
therefore free by construction — the portability proof for this standard
is exactly that: a non-Claude runner completing a lane end to end from
the artifacts alone.
