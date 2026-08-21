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
| opencode | `AGENTS.md` natively | own format — point at the skill file | `opencode run --auto -m <provider/model> "<prompt>"` — one-shot prompts (default `-m opencode/x-preview-f-free`, the sigiloso; then `-m opencode/muse-spark-1.2-contributor-free`; the Go ids are the paid fallback, never the default — the economics rule below) | both free seats verified on this machine 2026-08-21 in run mode, CLI 1.18.18; free deepseek completed the portability-proof lane 2026-08-16 before its id was retired; Go models verified 2026-08-18 |
| Grok CLI (`grok`) | unverified | unverified | unverified | verify on install |
| deepseek-harness (`dsh`) | `AGENTS.md` | unverified | unverified | dev preview, breaking changes announced — zero coupling by decision; verify on install |

opencode has two invocation forms, not one. **Command mode** is the
table's headless spawn, `opencode run --auto -m <provider/model>
"<prompt>"` — it runs one prompt to completion and exits, the shape a
child dispatch, a fan-out worker, or work-run's per-step reviewer in
`command` mode needs. The seat has tools and reads the checkout itself,
so the prompt carries the brief, not the code. **TUI mode** is what
orchestrate's reviewer seat needs instead: the bare form — no `run`, no
prompt argument — waited for (`terminal wait --for tui-idle`), then the
Task attached to the already-running terminal (`worker-start
--terminal`). Same binary, two launches, two jobs — using the headless
form where the TUI form belongs leaves nothing to attach to, and vice
versa. Verified in command mode on this machine 2026-08-21, CLI 1.18.18:
both free seats returned correct output one-shot.

**Every opencode seat launches with `--auto` — TUI and `run` alike**
(owner rule, 2026-08-21). Not a tip, and no longer TUI-only: `opencode
run --help` at CLI 1.18.18 lists the flag, and a tool-using review in
command mode stalls on a permission prompt without it exactly as a TUI
seat does — with the extra cost that a stalled `run` returns nothing, so
the caller degrades to the next seat for the wrong reason. Verified on
this machine 2026-08-19: `--auto` auto-approves permissions not
explicitly denied; without it the reviewer hangs at a permission prompt
nobody watches — a 78-minute live stall on the MAT-91 review,
undiagnosable from the parent's seat (worker `ready`, terminal
`running`, transcript EMPTY, `latestCursor: 0`). It is safe for THESE
seats only because the review brief forbids commit/push/merge and any
file edit; the same flag on a WRITING seat is a different decision —
not this one.

The reviewer's `worker_done` report is single-shot per dispatch, too —
see `skills/orchestrate/references/reviewer.md`'s fenced brief
("Reporting your verdict") for the send-once discipline; this file only
launches the seat, it does not restate that rule.

## The economics rule

While the free windows last, **every seat defaults to its free
variant** (owner, 2026-08-21). The adversarial ratón runs as
`opencode/muse-spark-1.2-contributor-free`, not the paid Go id; the
OpenCode Go plan is the fallback a dead or throttled free seat falls
through to, never the default anything starts at. A paid id written as a
default anywhere in this standard is a bug, not a preference.

## Sigilosos

**Sigiloso** (pl. sigilosos) is the house name (owner, 2026-08-21) for
the stealth free models on the Zen gateway. The verified current
instance is **Ox Alpha**, `opencode/x-preview-f-free` — the Zen docs
table maps that id to "Ox Alpha Free" (announced 2026-08-20: 1M context,
multimodal, generous limits, zero-retention). Verified here 2026-08-21
in command mode: `opencode run --auto -m opencode/x-preview-f-free
"<prompt>"` returned correct output one-shot. `opencode/big-pickle` is
another sigiloso in the live model list; it is **named, not registered**
— no probe has run against it here, so verify-on-install binds before
any seat uses it.

**Sigilosos are free "for a limited time" and can vanish, or start
charging, without notice.** That is why the chain below is law rather
than advice: a seat verifies its model responds before relying on it,
and a dead model falls through the chain — never silently blocking a
lane, never quietly becoming a paid call.

## The degradation chain

Every reviewer seat in this standard reads its model off this order,
top first, and stops at the first one that answers:

1. **sigiloso** — `opencode/x-preview-f-free` (command mode) or the
   two-step TUI launch, per the seat.
2. **free ratón** — `opencode/muse-spark-1.2-contributor-free`, the
   no-auth Muse Spark route, verified here 2026-08-21 in command mode.
3. **paid Go seat** — `opencode-go/muse-spark-1.2-contributor`,
   OpenCode Go subscription auth. The fallback, never the default.
4. **in-session Claude subagent** — the runtime-neutral floor, always
   available where the runner has subagents.

A step whose seat fell through records **which engine produced its
verdict**. Falling through is normal operation, not an incident; what is
never acceptable is a step that blocks because the seat at the top of
the chain stopped existing.

**Ratón chispeante** (pl. ratones chispeantes) is the adversarial seat
the dispatch dialogue offers by default, launched by the two-step
pattern above: `opencode --auto -m
opencode/muse-spark-1.2-contributor-free`, bare TUI form, `terminal wait
--for tui-idle`, then `worker-start --terminal`. No-auth via the
opencode gateway, so it needs no subscription; the Go id
(`opencode-go/muse-spark-1.2-contributor`) is the same model on paid
auth and is chain position 3, not the default. Same `--auto` rationale
as above, on the same read-only-seat condition. It holds the default on
cost: two production reviews on this machine — the MAT-104 and MAT-94
waves, verified 2026-08-19 on the Go id, both PASS at ballena grade —
for ~$0.01 all-in, against the ballena's price.

The **ballena** is the owner-selectable alternative, fully registered:
`opencode -m opencode-go/deepseek-v4-flash --auto`, the same two-step
launch, the same `--auto` rationale. Its old no-auth fallback,
`opencode/deepseek-v4-flash-free`, **no longer exists in the live model
list** (checked 2026-08-21) — a ballena without Go auth takes the
degradation chain above instead. It is still the portability-proof
pairing — the free deepseek model completed that lane here 2026-08-16,
before the id was retired; the Go model verified 2026-08-18 — and the
grade the ratón is measured against. The dialogue names it beside the
default; the owner picks between ratones chispeantes and ballenas at
dispatch, never silently.

Any opencode seat can stop at opencode's DATA-COLLECTION consent prompt
on a fresh machine or a fresh model — ratón or ballena, the no-auth
fallback included — and `--auto` does NOT cover it: a different prompt
class from the permission prompts it auto-approves. Acceptance is manual
and one-time per machine/model (the owner cleared it live on the MAT-94
seat); check it first when a new seat never reaches `tui-idle`.

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
pairing, the ballena), opencode + Muse Spark (the ratón chispeante) and
opencode + the sigiloso (Ox Alpha, verified in command mode 2026-08-21).
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
