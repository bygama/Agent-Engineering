# relay — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-17 — Own the executor, keep the thinking suite — superpowers
  SDD's artifact machinery (workspace, ledger, rulings, spec) collides
  1:1 with the lane; composing two protocols over the same information
  costs more than owning one. Brainstorming/TDD/debugging/writing-plans
  keep composing under the existing rule.
- 2026-08-17 — Unit of dispatch = one PLAN step, not a whole lane —
  preserves SDD's fine granularity (per-step review, per-step model
  choice), which is its main strength.
- 2026-08-17 — Scope: recommended default at L, available at M, usable
  inside XL worker lanes, never mandatory — the standard is
  runtime-neutral and not every runner has subagents.
- 2026-08-17 — No extracted briefs or scratch workspace — the lane is
  the context package; subagents read SPEC/PLAN/DECISIONS/PROGRESS
  themselves. Superpowers needs briefs because its plans embed complete
  code; our PLAN steps are one-liners with executable acceptance.
- 2026-08-17 — Per-step review internal; work-verify stays the lane
  gate — superpowers' final whole-branch review maps to work-verify's
  fresh-context review at M+; shipping a second final review would
  duplicate the gate.
- 2026-08-17 — Name `relay` — fresh runner per leg, lane as baton;
  avoids trigger collision with superpowers' subagent-driven-development
  and pairs stylistically with fan-out.
- 2026-08-17 — Supersession written into reference/skills.md, nothing
  modified on superpowers' side — their skill chain pushes toward their
  own executor; only a written house rule redirects future sessions.
- 2026-08-17 — README gains a section documenting every skill and the
  chain — owner ask during design (2026-08-17).
