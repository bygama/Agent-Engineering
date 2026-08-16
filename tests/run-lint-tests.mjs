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
  if (problems.length) {
    failed++;
    console.log(`FAIL ${c.name}\n  ${problems.join("\n  ")}\n  findings: ${[...codes].join(", ") || "(none)"}`);
  } else {
    console.log(`ok   ${c.name}`);
  }
}
console.log(failed ? `${failed}/${cases.length} cases failed` : `all ${cases.length} cases passed`);
process.exit(failed ? 1 : 0);
