#!/usr/bin/env node
// Runs design-md-gen against the design-clean fixture, asserting byte-exact
// output per target and error reporting for dangling references. Zero deps.
// Usage: node tests/run-gen-tests.mjs

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const { parseDesignMd, generate } = await import(
  new URL("../scripts/design-md-gen.mjs", import.meta.url)
);

const fixtureDir = join(here, "fixtures", "design-clean");
const source = readFileSync(join(fixtureDir, "DESIGN.md"), "utf8");

let failed = 0;
const check = (name, ok, detail = "") => {
  if (ok) console.log(`ok   ${name}`);
  else {
    failed++;
    console.log(`FAIL ${name}${detail ? `\n  ${detail}` : ""}`);
  }
};

const parsed = parseDesignMd(source);
check("fixture parses without errors", parsed.errors.length === 0, parsed.errors.join("; "));

for (const [target, file] of [
  ["tailwind4", "design.tokens.css"],
  ["cssvars", "expected-cssvars.css"],
]) {
  let expected;
  try {
    expected = readFileSync(join(fixtureDir, file), "utf8");
  } catch {
    check(`${target} output matches ${file}`, false, `${file} missing`);
    continue;
  }
  const actual = generate(parsed.frontmatter, target);
  check(
    `${target} output matches ${file}`,
    actual === expected,
    actual === expected ? "" : `first diff at char ${[...actual].findIndex((c, i) => c !== expected[i])}`
  );
}

const dangling = parseDesignMd(source.replace("{colors.ink}", "{colors.missing}"));
check(
  "dangling reference is reported",
  dangling.errors.some((e) => e.includes("colors.missing"))
);

const modesDir = join(here, "fixtures", "design-modes");
const modesParsed = parseDesignMd(readFileSync(join(modesDir, "DESIGN.md"), "utf8"));
check("modes fixture parses without errors", modesParsed.errors.length === 0, modesParsed.errors.join("; "));
for (const [target, file] of [
  ["tailwind4", "design.tokens.css"],
  ["cssvars", "expected-cssvars.css"],
]) {
  let expected;
  try {
    expected = readFileSync(join(modesDir, file), "utf8");
  } catch {
    check(`modes ${target} output matches ${file}`, false, `${file} missing`);
    continue;
  }
  const actual = generate(modesParsed.frontmatter, target);
  check(`modes ${target} output matches ${file}`, actual === expected);
}

console.log(failed ? `${failed} case(s) failed` : "all gen cases passed");
process.exit(failed ? 1 : 0);
