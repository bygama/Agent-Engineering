#!/usr/bin/env node
// Runs agent-lint against the fixtures, asserting expected finding codes and
// pass/fail per case. Zero deps.
// Usage: node tests/run-lint-tests.mjs

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const lint = join(here, "..", "scripts", "agent-lint.mjs");
const fx = (name) => join(here, "fixtures", name);

const cases = [
  {
    name: "v2-clean repo passes",
    path: fx("v2-clean"),
    fail: false,
    expect: [],
    forbid: [
      "adapter", "read-order", "cmd-drift", "budget-cap", "budget", "broken-link",
      "pointer-shape", "stamp-missing", "stamp-shape", "structure",
      "lane-incomplete", "lane-location", "lane-slug", "feature-schema", "feature-regression",
    ],
  },
  {
    name: "bloated canonical AGENTS.md fails",
    path: fx("bloated"),
    fail: true,
    expect: ["budget-cap", "cmd-drift", "structure"],
  },
  {
    name: "per-tool adapters fail",
    path: fx("adapters"),
    fail: true,
    expect: ["adapter", "pointer-shape", "stamp-missing"],
  },
  {
    name: "read order + broken link fail",
    path: fx("read-order"),
    fail: true,
    expect: ["read-order", "broken-link", "pointer-shape"],
  },
  {
    name: "v1-style repo drifts (pointer + stamp)",
    path: fx("v1-style"),
    fail: true,
    expect: ["pointer-shape", "stamp-missing"],
    forbid: ["adapter", "read-order"],
  },
  {
    // Red until the pointer check strips fenced tool-managed blocks
    // (SPEC §1 / PLAN step 2). The remainder after stripping is a
    // 1-line pointer containing @AGENTS.md.
    name: "pointer-fenced repo passes (fenced tool-managed block exempted)",
    path: fx("pointer-fenced"),
    fail: false,
    expect: [],
    forbid: ["pointer-shape"],
  },
  {
    name: "pointer-unfenced repo still fails (unfenced extra content over budget)",
    path: fx("pointer-unfenced"),
    fail: true,
    expect: ["pointer-shape"],
  },
  {
    name: "pointer-unclosed repo still fails (unmatched BEGIN is not an exemption)",
    path: fx("pointer-unclosed"),
    fail: true,
    expect: ["pointer-shape"],
  },
  {
    // Red until cmd-drift stops judging an escaping path as a
    // repo-relative claim (MAT-89). `fail: false` plus the code being
    // present can only be satisfied by a `low` — that pair IS the
    // severity assertion; the present in-repo command proves the
    // downgrade did not turn the whole branch off.
    name: "cross-repo sibling path reports low, does not fail the lint",
    path: fx("cmd-escaping"),
    fail: false,
    expect: ["cmd-drift"],
    expectMatch: ["escapes the repo", "sibling checkout"],
  },
  {
    // Regression guard, green from birth: the drift cmd-drift was born
    // for (AE/2.3's lesson — a false-positive fix must not buy quiet by
    // weakening real detection). No fixture covered this branch before.
    name: "in-repo path that no longer exists still fails the lint",
    path: fx("cmd-inrepo-drift"),
    fail: true,
    expect: ["cmd-drift"],
    expectMatch: ["file not found: scripts/missing.mjs"],
  },
  {
    name: "malformed lanes fail",
    path: fx("lanes-bad"),
    fail: true,
    expect: ["lane-incomplete", "lane-slug", "lane-location"],
  },
  {
    name: "invalid feature list fails",
    path: fx("feature-bad"),
    fail: true,
    expect: ["feature-schema"],
  },
  {
    name: "global-layer CLAUDE.md passes its own canon",
    path: fx("global-layer"),
    fail: false,
    expect: [],
    forbid: ["budget", "budget-cap", "structure", "pointer-shape"],
  },
  {
    name: "clean DESIGN.md passes",
    path: fx("design-clean"),
    fail: false,
    expect: [],
    forbid: ["design-frontmatter", "design-sections", "design-ref", "design-decisions", "design-drift", "design-ungenerated"],
  },
  {
    name: "drifted/undated DESIGN.md fails",
    path: fx("design-bad-a"),
    fail: true,
    expect: ["design-decisions", "design-sections", "design-drift"],
  },
  {
    name: "dangling-ref/ungenerated DESIGN.md fails",
    path: fx("design-bad-b"),
    fail: true,
    expect: ["design-ref", "design-ungenerated"],
  },
  {
    name: "DESIGN.md with mode groups passes",
    path: fx("design-modes"),
    fail: false,
    expect: [],
    forbid: ["design-frontmatter", "design-ref", "design-drift", "design-ungenerated"],
  },
  {
    name: "kitchen-sink composite fires the planted set",
    path: fx("kitchen-sink"),
    fail: true,
    expect: [
      "adapter", "budget", "pointer-shape", "read-order", "structure",
      "broken-link", "docs-index", "naming", "skill-frontmatter",
      "lane-incomplete", "lane-slug", "lane-location", "feature-schema",
      "cmd-drift",
    ],
    forbid: ["budget-cap", "stamp-missing", "stamp-shape", "feature-regression", "skill-size"],
    // `npm run migrate  # not verified` is the standard's own honesty
    // marker (ae-init step 4) — flagging it is a lint bug.
    forbidMatch: ['npm script "migrate"'],
  },
];

let failed = 0;
for (const c of cases) {
  const r = spawnSync(process.execPath, [lint, c.path, "--json"], { encoding: "utf8" });
  let out;
  try {
    out = JSON.parse(r.stdout);
  } catch {
    failed++;
    console.log(`FAIL ${c.name}\n  lint did not emit JSON (exit ${r.status}):\n  ${r.stderr || r.stdout}`);
    continue;
  }
  const codes = new Set(out.findings.map((f) => f.code));
  const problems = [];
  if (out.fail !== c.fail) problems.push(`expected fail=${c.fail}, got ${out.fail}`);
  for (const e of c.expect) if (!codes.has(e)) problems.push(`missing expected finding "${e}"`);
  for (const e of c.forbid ?? []) if (codes.has(e)) problems.push(`unexpected finding "${e}"`);
  for (const pat of c.expectMatch ?? [])
    if (!out.findings.some((f) => f.message.includes(pat)))
      problems.push(`no finding message matched expected "${pat}"`);
  for (const pat of c.forbidMatch ?? [])
    for (const f of out.findings)
      if (f.message.includes(pat)) problems.push(`forbidden message matched "${pat}": ${f.message}`);
  if (problems.length) {
    failed++;
    console.log(`FAIL ${c.name}\n  ${problems.join("\n  ")}\n  findings: ${[...codes].join(", ") || "(none)"}`);
  } else {
    console.log(`ok   ${c.name}`);
  }
}
console.log(failed ? `${failed}/${cases.length} cases failed` : `all ${cases.length} cases passed`);
process.exit(failed ? 1 : 0);
