// Structural eval suite: every skill ships >=3 evals, each well-formed
// (## Query + ## Expected behavior + at least one checklist line).
// The behavioral content of evals is judged by humans/agents; this runner
// guarantees the contract's shape can't silently rot.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(root, "skills");
let failed = 0;
const fail = (msg) => {
  console.log(`FAIL ${msg}`);
  failed++;
};

for (const name of readdirSync(skillsDir)) {
  const skill = join(skillsDir, name);
  if (!existsSync(join(skill, "SKILL.md"))) continue;
  const evalsDir = join(skill, "evals");
  if (!existsSync(evalsDir)) {
    fail(`${name}: no evals/ directory`);
    continue;
  }
  const evals = readdirSync(evalsDir).filter((f) => /^eval-\d+\.md$/.test(f));
  if (evals.length < 3) fail(`${name}: ${evals.length} evals — needs >=3`);
  let clean = true;
  for (const f of evals) {
    const text = readFileSync(join(evalsDir, f), "utf8");
    for (const section of ["## Query", "## Expected behavior"]) {
      if (!text.includes(section)) {
        fail(`${name}/${f}: missing "${section}"`);
        clean = false;
      }
    }
    if (!/- \[[ x]\] /.test(text)) {
      fail(`${name}/${f}: no checklist lines`);
      clean = false;
    }
  }
  if (clean && evals.length >= 3)
    console.log(`ok   ${name}: ${evals.length} evals well-formed`);
}

console.log(failed ? `${failed} problem(s)` : "all eval checks passed");
process.exit(failed ? 1 : 0);
