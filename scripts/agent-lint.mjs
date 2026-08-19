#!/usr/bin/env node
// agent-lint — mechanical checks for the agent-engineering standard (AE).
// Automates the countable subset of skills/ae-audit: entry-file budgets,
// the canonical/pointer split, the version stamp, per-tool adapters, read
// orders, block structure, broken local links, docs naming, skill hygiene,
// work-lane coherence, feature-list schema and regression, DESIGN.md drift,
// machine-anchored paths on shipped surfaces, and static command drift.
// Judgment checks (inferable content, rules-vs-taste) remain in the
// ae-audit skill.
//
// v2 model: AGENTS.md is the canonical entry file (budgets, structure,
// commands live there); CLAUDE.md must be a ≤3-line pointer containing
// `@AGENTS.md`. A CLAUDE.md titled "# Global instructions" is the global
// layer and is checked against its own canon (≤40 lines, free-form).
//
// Pointer exemption: a fenced tool-managed block — matched
// `<!-- BEGIN:<name> -->` / `<!-- END:<name> -->` marker lines, as `next dev`
// upserts into whichever file hosts it — is not the repo's own content, so
// it is stripped before the pointer is measured (see
// stripToolManagedBlocks). Only the pointer check strips; the machine-path
// check reuses the same matched-pair semantics to SKIP those lines while it
// scans, so its `file:line` stays true to the file as written. Every other
// check reads the file as written.
//
// cmd-drift exemption: a cited `node <path>` whose path resolves OUTSIDE the
// repo root (`../<sibling>/…`, or absolute) is not a claim about this repo's
// contents — it is correct wherever that path exists outside the repo (the
// owner's sibling checkout, CI) and absent elsewhere (a worktree). Missing,
// it is reported `low` naming that context-dependence instead of failing the
// lint; present, nothing is reported. In-repo paths — including a directory
// whose NAME begins with two dots — keep their MEDIUM `file not found`.
//
// Usage: node scripts/agent-lint.mjs [path] [options]
//   --budget N     root AGENTS.md target lines (default 60)
//   --cap N        root AGENTS.md hard cap (default 100)
//   --ignore a,b   extra dir names to skip (any depth); defaults always
//                  skipped: node_modules .git .next dist build coverage
//   --json         machine-readable output
//
// Line counts are raw file lines, blanks included, trailing newline ignored
// (the pointer check counts the remainder after stripping tool-managed blocks).
// Exit code: 1 when any high or medium finding, 0 otherwise.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";
import { generate, parseDesignMd } from "./design-md-gen.mjs";

// ---------- args ----------
const argv = process.argv.slice(2);
let root = ".";
// Budget defaults mirror reference/context.md — change both together.
let budget = 60;
let cap = 100;
let json = false;
const ignore = new Set(["node_modules", ".git", ".next", "dist", "build", "coverage"]);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--budget") budget = Number(argv[++i]);
  else if (a === "--cap") cap = Number(argv[++i]);
  else if (a === "--ignore") argv[++i].split(",").forEach((d) => ignore.add(d.trim()));
  else if (a === "--json") json = true;
  else root = a;
}
root = resolve(root);
if (!existsSync(root)) {
  console.error(`agent-lint: path not found: ${root}`);
  process.exit(2);
}

// ---------- walk ----------
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(root, full).replaceAll("\\", "/");
    if (rel.split("/").some((seg) => ignore.has(seg))) continue;
    if (statSync(full).isDirectory()) walk(full);
    else files.push(rel);
  }
})(root);

const findings = [];
const add = (severity, code, file, message) => findings.push({ severity, code, file, message });
const read = (rel) => readFileSync(join(root, rel), "utf8");
const fileLines = (rel) => read(rel).split(/\r?\n/);
const countLines = (lines) => (lines.at(-1) === "" ? lines.length - 1 : lines.length);
const rawCount = (rel) => countLines(fileLines(rel));

// ---------- per-tool adapters ----------
const ADAPTERS = new Set([
  "CODEX.md", "GEMINI.md", "CURSOR.md", "COPILOT.md", "CLINE.md", "WINDSURF.md",
  ".cursorrules", ".windsurfrules", ".clinerules",
]);
for (const f of files) {
  if (ADAPTERS.has(basename(f)))
    add("high", "adapter", f, "per-tool adapter file — one canonical AGENTS.md plus a pointer replaces these");
}

// ---------- AGENTS.md (canonical) budgets + stamp ----------
const agents = files.filter((f) => basename(f) === "AGENTS.md");
for (const f of agents) {
  const n = rawCount(f);
  if (f === "AGENTS.md") {
    if (n > cap) add("high", "budget-cap", f, `${n} lines — over the hard cap (${cap})`);
    else if (n > budget) add("medium", "budget", f, `${n} lines — over target (${budget})`);
    const stampLines = fileLines(f).filter((l) => l.startsWith("Standard:"));
    if (!stampLines.length) add("medium", "stamp-missing", f, "no `Standard: AE/MAJOR.MINOR.PATCH` stamp line");
    else if (!stampLines.some((l) => /^Standard: AE\/\d+\.\d+(\.\d+)?\s*$/.test(l)))
      add("medium", "stamp-shape", f, `malformed stamp: "${stampLines[0].trim()}"`);
  } else {
    if (n > 60) add("high", "budget-cap", f, `${n} lines — nested AGENTS.md far over the cap (30)`);
    else if (n > 30) add("medium", "budget", f, `${n} lines — over the nested cap (30)`);
  }
}

// ---------- CLAUDE.md (pointer) ----------
// A tool-managed block is a matched pair of marker lines whose trimmed
// content is exactly `<!-- BEGIN:<name> -->` and `<!-- END:<name> -->`, with
// the same kebab-case <name>. The markers, everything between them and the
// blank lines padding them are removed; a BEGIN closes at the first matching
// END, and an unmatched BEGIN is no exemption — it strips nothing.
const BLOCK_BEGIN = /^<!-- BEGIN:([a-z0-9]+(?:-[a-z0-9]+)*) -->$/;
const isBlank = (l) => l.trim() === "";
const stripToolManagedBlocks = (lines) => {
  const kept = [];
  for (let i = 0; i < lines.length; i++) {
    const name = lines[i].trim().match(BLOCK_BEGIN)?.[1];
    const end = name === undefined
      ? -1
      : lines.findIndex((l, j) => j > i && l.trim() === `<!-- END:${name} -->`);
    if (end === -1) {
      kept.push(lines[i]);
      continue;
    }
    while (kept.length && isBlank(kept.at(-1))) kept.pop();
    i = end;
    while (i + 1 < lines.length && isBlank(lines[i + 1])) i++;
  }
  return kept;
};

// The global layer (H1 "# Global instructions") keeps its own canon.
const claudes = files.filter((f) => basename(f) === "CLAUDE.md");
const globals = new Set(claudes.filter((f) => fileLines(f)[0]?.trim() === "# Global instructions"));
for (const f of claudes) {
  if (globals.has(f)) {
    const n = rawCount(f);
    if (n > 40) add("medium", "budget", f, `${n} lines — global CLAUDE.md cap is 40`);
    continue;
  }
  // Both halves of the rule read the remainder, not the file as written.
  const kept = stripToolManagedBlocks(fileLines(f));
  const n = countLines(kept);
  if (n > 3 || !/@AGENTS\.md/.test(kept.join("\n"))) {
    const of = n === rawCount(f) ? "" : " outside tool-managed blocks";
    add("high", "pointer-shape", f, `must be a ≤3-line pointer containing \`@AGENTS.md\` (has ${n} lines${of})`);
  }
}

// ---------- read orders ----------
const READ_ORDER = [
  /\bread\b[^.\n]{0,50}\bbefore\b/i,
  /\bbefore (doing|starting|touching) anything\b/i,
  /\b(must|always) read\b/i,
  /\bstart by reading\b/i,
  /\bfirst,? read\b/i,
];
for (const f of [...agents, ...claudes]) {
  fileLines(f).forEach((line, i) => {
    if (READ_ORDER.some((re) => re.test(line)))
      add("high", "read-order", `${f}:${i + 1}`, `mandatory read order: "${line.trim().slice(0, 60)}"`);
  });
}

// ---------- block structure (canonical AGENTS.md) ----------
const CANON = ["Commands", "Gotchas", "Hard constraints", "Map"];
for (const f of agents) {
  const h2 = fileLines(f)
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3).trim());
  for (const u of h2.filter((h) => !CANON.includes(h)))
    add("low", "structure", f, `non-canonical section "## ${u}"`);
  const known = h2.filter((h) => CANON.includes(h));
  const sorted = [...known].sort((a, b) => CANON.indexOf(a) - CANON.indexOf(b));
  if (known.join() !== sorted.join()) add("low", "structure", f, "canonical sections out of order");
}

// ---------- broken local links ----------
for (const f of files.filter((f) => /(^|\/)(CLAUDE|AGENTS|README)\.md$/.test(f))) {
  for (const m of read(f).matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    if (!existsSync(join(root, dirname(f), target.split("#")[0])))
      add("medium", "broken-link", f, `link target missing: ${target}`);
  }
}

// ---------- docs index + naming ----------
if (files.some((f) => f.startsWith("docs/")) && !files.includes("docs/README.md"))
  add("low", "docs-index", "docs/", "docs/ has no README.md index");
for (const f of files) {
  if (/^docs\/adrs\/(?!README\.md$)/.test(f) && !/^docs\/adrs\/ADR-\d{3}-[a-z0-9-]+\.md$/.test(f))
    add("low", "naming", f, "expected ADR-NNN-<topic>.md");
  if (/^docs\/specs\/(?!README\.md$)/.test(f) && !/^docs\/specs\/SPEC-[A-Za-z0-9-]+\.md$/.test(f))
    add("low", "naming", f, "expected SPEC-<feature>.md");
}

// ---------- skills ----------
// The entry skill is injected at SessionStart into every conversation, so
// it carries the tightest budget in the standard. Path and cap mirror
// reference/skills.md ("always-loaded entry point (SessionStart), capped
// at 80 lines") — change both together. Repos that do not vendor it are unaffected.
const ENTRY_SKILL = "skills/using-ae/SKILL.md";
const ENTRY_SKILL_CAP = 80;
for (const f of files.filter((f) => basename(f) === "SKILL.md")) {
  const n = rawCount(f);
  if (f === ENTRY_SKILL && n > ENTRY_SKILL_CAP)
    add("medium", "entry-skill-cap", f, `${n} lines — the always-loaded entry skill must stay ≤${ENTRY_SKILL_CAP}`);
  if (n >= 500) add("medium", "skill-size", f, `${n} lines — SKILL.md must stay <500`);
  if (!/^---[\s\S]{0,400}?\bdescription:/.test(read(f)))
    add("medium", "skill-frontmatter", f, "missing frontmatter description (what + when)");
}

// ---------- work lanes ----------
const laneFiles = files.filter((f) => f.startsWith("work/"));
const lanes = new Map();
for (const f of laneFiles) {
  const parts = f.split("/");
  if (parts.length < 3) {
    add("medium", "lane-location", f, "file directly under work/ — every lane is a folder: work/<slug>/");
    continue;
  }
  const slug = parts[1];
  if (!lanes.has(slug)) lanes.set(slug, []);
  lanes.get(slug).push(parts.slice(2).join("/"));
}
for (const [slug, contents] of lanes) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
    add("low", "lane-slug", `work/${slug}/`, "lane slug is not kebab-case");
  for (const required of ["PLAN.md", "PROGRESS.md"])
    if (!contents.includes(required))
      add("medium", "lane-incomplete", `work/${slug}/`, `lane missing ${required}`);
}
for (const name of ["SPEC.md", "PLAN.md", "PROGRESS.md", "DECISIONS.md"])
  if (files.includes(name))
    add("medium", "lane-location", name, "work artifact at repo root — it belongs in work/<slug>/");

// ---------- feature list: schema + regression ----------
const validateFeatureList = (rows) => {
  const errs = [];
  if (!Array.isArray(rows)) return ["not a JSON array"];
  const STATES = new Set(["not_started", "active", "blocked", "passing"]);
  rows.forEach((r, i) => {
    const at = r?.id ?? `row ${i}`;
    if (typeof r !== "object" || r === null) return errs.push(`${at}: not an object`);
    for (const k of ["id", "behavior", "verification", "state", "evidence"])
      if (!(k in r)) errs.push(`${at}: missing "${k}"`);
    if (typeof r.id === "string" && !/^F\d+$/.test(r.id)) errs.push(`${at}: id must match F<number>`);
    for (const k of ["behavior", "verification"])
      if (k in r && (typeof r[k] !== "string" || !r[k].length)) errs.push(`${at}: "${k}" must be a non-empty string`);
    if ("state" in r && !STATES.has(r.state)) errs.push(`${at}: invalid state "${r.state}"`);
    if ("evidence" in r && r.evidence !== null && typeof r.evidence !== "string")
      errs.push(`${at}: evidence must be string or null`);
    if (r.state === "passing" && (typeof r.evidence !== "string" || !r.evidence.length))
      errs.push(`${at}: passing requires non-null evidence`);
    const extras = Object.keys(r).filter((k) => !["id", "behavior", "verification", "state", "evidence"].includes(k));
    for (const e of extras) errs.push(`${at}: unknown key "${e}"`);
  });
  return errs;
};
for (const f of files.filter((f) => basename(f) === "feature_list.json")) {
  let rows;
  try { rows = JSON.parse(read(f)); }
  catch (e) { add("high", "feature-schema", f, `invalid JSON: ${e.message}`); continue; }
  for (const e of validateFeatureList(rows)) add("high", "feature-schema", f, e);
  // Regression: any HEAD-passing row that left passing. Skipped silently when
  // git/HEAD/the file's history is unavailable.
  const git = spawnSync("git", ["-C", root, "show", `HEAD:./${f}`], { encoding: "utf8" });
  if (git.status === 0 && Array.isArray(rows)) {
    try {
      const before = new Map(JSON.parse(git.stdout).map((r) => [r.id, r.state]));
      for (const r of rows)
        if (before.get(r.id) === "passing" && r.state !== "passing")
          add("high", "feature-regression", f, `${r.id} regressed from passing to ${r.state} — passing is irreversible`);
    } catch { /* unparseable HEAD version: schema check already covers the present */ }
  }
}

// ---------- DESIGN.md checks (reference/design-md.md) ----------
const DESIGN_SECTIONS = ["Overview", "Colors", "Typography", "Layout", "Elevation & Depth", "Shapes", "Components", "Do's and Don'ts"];
for (const f of files.filter((f) => basename(f) === "DESIGN.md")) {
  const parsed = parseDesignMd(read(f));
  const fm = parsed.frontmatter;
  const refErrors = parsed.errors.filter((e) => e.includes("reference"));
  if (parsed.errors.length > refErrors.length || !fm.name)
    add("medium", "design-frontmatter", f, "frontmatter missing/unparseable or lacks `name`");
  for (const e of refErrors) add("medium", "design-ref", f, e);
  const knownIdx = parsed.sections.filter((s) => DESIGN_SECTIONS.includes(s.title)).map((s) => DESIGN_SECTIONS.indexOf(s.title));
  if (knownIdx.some((v, i) => i > 0 && v < knownIdx[i - 1]))
    add("low", "design-sections", f, "known sections out of spec order");
  const titles = parsed.sections.map((s) => s.title);
  for (const dup of new Set(titles.filter((t, i) => titles.indexOf(t) !== i)))
    add("high", "design-sections", f, `duplicate section "## ${dup}"`);
  for (const d of parsed.decisions)
    if (!/^- \d{4}-\d{2}-\d{2} — /.test(d.text))
      add("medium", "design-decisions", `${f}:${d.lineNo}`, "Decisions entry without a leading YYYY-MM-DD date");
  const genRel = join(dirname(f), "design.tokens.css").replaceAll("\\", "/");
  const hasTokens = ["colors", "typography", "spacing", "rounded", "components"].some((g) => fm[g] && Object.keys(fm[g]).length);
  if (!files.includes(genRel)) {
    if (hasTokens) add("medium", "design-ungenerated", f, "frontmatter has tokens but no adjacent design.tokens.css");
  } else if (!parsed.errors.length) {
    const genText = read(genRel);
    const m = genText.match(/GENERATED from DESIGN\.md \(target: (\w+)\)/);
    let fresh = null;
    try { fresh = m ? generate(fm, m[1]) : null; } catch { /* unknown target */ }
    const norm = (s) => s.replaceAll("\r\n", "\n");
    if (!fresh) add("high", "design-drift", genRel, "missing or unknown GENERATED header target");
    else if (norm(fresh) !== norm(genText))
      add("high", "design-drift", genRel, "design.tokens.css differs from a fresh generation — regenerate");
  }
}

// ---------- machine-anchored paths on shipped surfaces ----------
// Shipped content must read true on any machine, so on the five surfaces a
// consumer receives — skills/, reference/, templates/, global/, loops/ — a
// path anchored to one machine's disk layout is a portability defect.
// Exactly three classes count (a narrow rule, not "no absolute path": the
// broad one buys no true positive here and fails legitimate URL routes and
// device paths the standard wants shipped).
//
// The exemptions are decisions, not gaps:
//   - Dated records are history. docs/plans/, docs/adrs/ and CHANGELOG.md
//     say what was true on the day they were written and are never
//     restamped, so they are out of scope by construction — the check reads
//     only the five shipped surfaces.
//   - examples/ are authoring-time snapshots, never restamped either, so
//     they are not a shipped surface and are never scanned.
//   - A path inside a fenced tool-managed block is not ours to judge — a
//     tool upserts that block. Those lines are skipped (not stripped), so
//     the line numbers reported stay true to the file as written; an
//     unmatched BEGIN exempts nothing, same as in the pointer check.
//   - Tilde paths stay legal, never a fourth class: `~/…` is user-relative,
//     hence portable, and is the standard's own convention for the agent
//     home. Illustrative absolute Unix paths (`/opt/…`, `/usr/…`), URL
//     routes (`/api/…`) and `/dev/null` are not machine-anchored either.
//
// MEDIUM, not LOW: the cmd-drift LOW covers a path that is correct
// SOMEWHERE (the owner's sibling checkout, CI — it just is not a claim
// about this repo). A machine-anchored path on a shipped surface is correct
// nowhere but the author's machine, so it fails the lint, like broken-link.
// Not high: highs mark structural breaks of the standard; this is content
// drift.
const SHIPPED_SURFACE = /^(skills|reference|templates|global|loops)\//;
const PATH_CHAR = "[^\\s`'\"<>()\\[\\]{},;]"; // runs to the first delimiter no path can contain
const MACHINE_PATH = [
  // Drive-rooted (`C:\…`, `D:/…`). The lookbehind is what keeps a URL
  // scheme out: in `https://`, the `s` is preceded by an alphanumeric.
  new RegExp(`(?<![A-Za-z0-9])[A-Za-z]:[\\\\/]${PATH_CHAR}*`, "g"),
  // POSIX user-home. `/Users` keeps its macOS capitalization so an API
  // route spelled `/users/<id>` is not read as somebody's home directory.
  new RegExp(`(?<![A-Za-z0-9])/(?:home|Users)/${PATH_CHAR}+`, "g"),
  // WSL drive mount — a drive root in POSIX spelling, same defect.
  new RegExp(`(?<![A-Za-z0-9])/mnt/[A-Za-z]/${PATH_CHAR}*`, "g"),
];
const toolManagedLineNos = (lines) => {
  const inside = new Set();
  for (let i = 0; i < lines.length; i++) {
    const name = lines[i].trim().match(BLOCK_BEGIN)?.[1];
    if (name === undefined) continue;
    const end = lines.findIndex((l, j) => j > i && l.trim() === `<!-- END:${name} -->`);
    if (end === -1) continue;
    for (let j = i; j <= end; j++) inside.add(j);
    i = end;
  }
  return inside;
};
for (const f of files.filter((f) => SHIPPED_SURFACE.test(f))) {
  const text = read(f);
  // A binary payload (a diagram, a font) has no prose to judge, and random
  // bytes match a drive letter often enough to matter. A NUL byte is the tell.
  if (text.includes("\0")) continue;
  const lines = text.split(/\r?\n/);
  const skip = toolManagedLineNos(lines);
  lines.forEach((line, i) => {
    if (skip.has(i)) return;
    // The classes nest: `C:/Users/someone/` is drive-rooted AND carries a
    // `/Users/…` tail. One path is one defect, so a match starting inside
    // an already-reported one is dropped — leftmost, longest wins.
    let reportedTo = -1;
    for (const m of MACHINE_PATH.flatMap((re) => [...line.matchAll(re)]).sort((a, b) => a.index - b.index)) {
      if (m.index < reportedTo) continue;
      reportedTo = m.index + m[0].length;
      const hit = m[0].replace(/[.,;:]+$/, "");
      add("medium", "machine-path", `${f}:${i + 1}`,
        `\`${hit}\` is anchored to one machine's disk layout — shipped content must read true on any machine; use a home-relative (\`~/\`), repo-relative, or placeholder path`);
    }
  });
}

// ---------- static command drift (root AGENTS.md, ## Commands) ----------
if (files.includes("AGENTS.md")) {
  const ls = fileLines("AGENTS.md");
  const start = ls.findIndex((l) => l.trim() === "## Commands");
  if (start !== -1) {
    let end = ls.findIndex((l, i) => i > start && l.startsWith("## "));
    if (end === -1) end = ls.length;
    const pkg = files.includes("package.json") ? JSON.parse(read("package.json")) : null;
    const deps = pkg ? { ...pkg.dependencies, ...pkg.devDependencies } : {};
    const COMPOSE = ["docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"];
    for (let i = start; i < end; i++) {
      // `# not verified` is the standard's honesty marker (ae-init
      // step 4) — the line opted out of verification, so drift is silent.
      if (ls[i].includes("# not verified")) continue;
      for (const m of ls[i].matchAll(/`([^`]+)`/g)) {
        const cmd = m[1].trim();
        const at = `AGENTS.md:${i + 1}`;
        let mm;
        if ((mm = cmd.match(/^(?:npm|pnpm|yarn|bun) run (\S+)/))) {
          if (!pkg) add("medium", "cmd-drift", at, `"${cmd}" but repo has no package.json`);
          else if (!pkg.scripts?.[mm[1]]) add("medium", "cmd-drift", at, `npm script "${mm[1]}" not in package.json`);
        } else if ((mm = cmd.match(/^(?:npm|pnpm|yarn|bun) (test|start)\b/))) {
          if (!pkg?.scripts?.[mm[1]]) add("medium", "cmd-drift", at, `npm script "${mm[1]}" not in package.json`);
        } else if ((mm = cmd.match(/^npx (\S+)/))) {
          if (pkg && !deps[mm[1]] && !Object.keys(deps).some((d) => d.endsWith(`/${mm[1]}`)))
            add("medium", "cmd-drift", at, `npx package "${mm[1]}" not in dependencies`);
        } else if ((mm = cmd.match(/^node (\S+)/))) {
          const abs = resolve(root, mm[1]);
          if (!existsSync(abs)) {
            const rel = relative(root, abs);
            // Segment compare, not a prefix test: an in-repo directory
            // NAMED `..config` starts with two dots and escapes nothing.
            if (rel.split(/[\\/]/)[0] === ".." || isAbsolute(rel))
              add("low", "cmd-drift", at, `${mm[1]} escapes the repo — context-dependent, true only where that path exists outside it (a sibling checkout, CI)`);
            else add("medium", "cmd-drift", at, `file not found: ${mm[1]}`);
          }
        } else if (/^docker compose\b/.test(cmd)) {
          if (!COMPOSE.some((c) => files.includes(c)))
            add("medium", "cmd-drift", at, "no compose file in repo root");
        }
      }
    }
  }
}

// ---------- report ----------
const order = { high: 0, medium: 1, low: 2 };
findings.sort((a, b) => order[a.severity] - order[b.severity] || a.file.localeCompare(b.file));
const count = (s) => findings.filter((f) => f.severity === s).length;
const fail = count("high") + count("medium") > 0;
if (json) {
  console.log(JSON.stringify({ root, findings, fail }, null, 2));
} else {
  console.log(`agent-lint ${root}`);
  for (const f of findings)
    console.log(`  ${f.severity.toUpperCase().padEnd(6)} ${f.file}  ${f.message}  [${f.code}]`);
  console.log(`${count("high")} high, ${count("medium")} medium, ${count("low")} low — ${fail ? "FAIL" : "PASS"}`);
}
process.exit(fail ? 1 : 0);
