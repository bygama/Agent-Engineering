# How this repo works

Living self-documentation of Agent-Engineering: what every piece is, how the
flows run end to end, and why it is built this way. This folder is exempt
from the minimalism budget on purpose — it is just-in-time human
documentation, not always-loaded agent context. The hard rule that keeps it
honest: **any change that alters structure or behavior updates the affected
chapter in the same change.**

| Chapter | Covers | Status |
|---|---|---|
| [architecture.md](architecture.md) | the directory map, what each part answers, the six layers, the phase ladder, design rules that bind the repo | current |
| [standard-lifecycle.md](standard-lifecycle.md) | install → audit → update/migrate flows, versioning | live since AE/2.0 |
| [work-lifecycle.md](work-lifecycle.md) | task tiers S/M/L/XL, lanes, the four files, the lane lifecycle (work-plan → work-run → work-verify → work-handoff), verification layers, feature list, tracker plane | live since AE/2.1 |
| [execution.md](execution.md) | loops, trigger matrix, Orca mapping, tracker connector, orchestration (the parent/child dispatch cycle, review wave, XL), runners | live (portability proof passed 2026-08-16; dogfood dispatch passed 2026-08-18) |
| [integrations.md](integrations.md) | how the planes connect: Linear ↔ GitHub ↔ Orca — wiring, events, who writes what | live (verified e2e 2026-08-17) |

Convention: every section that documents behavior not yet built carries a
`> Phase: PN` note, so this folder never claims unbuilt things exist.

Provenance notes ("live since AE/2.1") use the version names current at
ship time; since ADR-003 renumbered the line, the CHANGELOG maps each
former `AE/2.x` name to its 0.x number.
