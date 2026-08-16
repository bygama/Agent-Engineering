#!/usr/bin/env node
// design-md-gen — compiles DESIGN.md frontmatter tokens to design.tokens.css.
// Convention: reference/design-md.md. Tokens are edited only in DESIGN.md;
// code consumes the generated file, which carries a DO-NOT-EDIT header.
//
// Parses the token-schema subset of YAML (2-space indented nested maps,
// scalar values, single/double-quoted strings) — not full YAML. Resolves
// full-value `{path.to.token}` references; unresolved ones are hard errors.
//
// Usage: node scripts/design-md-gen.mjs <DESIGN.md> --target tailwind4|cssvars
// Exit codes: 0 ok, 1 parse/reference error, 2 usage error.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const GROUP_ORDER = ["colors", "typography", "spacing", "rounded", "components"];
const TARGETS = { tailwind4: "@theme", cssvars: ":root" };

const kebab = (s) => s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
const unquote = (v) =>
  (v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))
    ? v.slice(1, -1)
    : v;

// ---------- parse ----------
export function parseDesignMd(text) {
  const lines = text.split(/\r?\n/);
  const errors = [];
  let frontmatter = {};
  let bodyStart = 0;

  if (lines[0]?.trim() === "---") {
    const end = lines.findIndex((l, i) => i > 0 && l.trim() === "---");
    if (end === -1) errors.push("frontmatter never closes");
    else {
      frontmatter = parseYamlSubset(lines.slice(1, end), errors);
      bodyStart = end + 1;
    }
  } else {
    errors.push("missing frontmatter");
  }

  resolveRefs(frontmatter, errors);

  const sections = [];
  const decisions = [];
  let inDecisions = false;
  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      sections.push({ lineNo: i + 1, title });
      inDecisions = title === "Decisions";
    } else if (inDecisions && line.startsWith("- ")) {
      decisions.push({ lineNo: i + 1, text: line });
    }
  }
  return { frontmatter, sections, decisions, errors };
}

function parseYamlSubset(yamlLines, errors) {
  const root = {};
  const stack = [{ indent: -1, node: root }];
  for (const raw of yamlLines) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indent = raw.length - raw.trimStart().length;
    const line = raw.trim();
    const colon = line.indexOf(":");
    if (colon === -1) {
      errors.push(`not a key: value line: "${line}"`);
      continue;
    }
    const key = unquote(line.slice(0, colon).trim());
    const value = line.slice(colon + 1).trim();
    while (stack.length > 1 && indent <= stack.at(-1).indent) stack.pop();
    const parent = stack.at(-1).node;
    if (value === "") {
      parent[key] = {};
      stack.push({ indent, node: parent[key] });
    } else {
      parent[key] = unquote(value);
    }
  }
  return root;
}

function resolveRefs(frontmatter, errors) {
  const lookup = (path) =>
    path.split(".").reduce((node, seg) => (node && typeof node === "object" ? node[seg] : undefined), frontmatter);
  const resolve = (value, seen) => {
    const m = typeof value === "string" && value.match(/^\{([^}]+)\}$/);
    if (!m) return value;
    const path = m[1];
    if (seen.has(path)) {
      errors.push(`circular reference {${path}}`);
      return value;
    }
    const target = lookup(path);
    if (target === undefined || typeof target === "object") {
      errors.push(`unresolved reference {${path}}`);
      return value;
    }
    return resolve(target, new Set(seen).add(path));
  };
  const walk = (node) => {
    for (const k of Object.keys(node)) {
      if (typeof node[k] === "object") walk(node[k]);
      else node[k] = resolve(node[k], new Set());
    }
  };
  walk(frontmatter);
}

// ---------- generate ----------
function collectVars(node) {
  const vars = [];
  for (const group of GROUP_ORDER) {
    const tokens = node[group];
    if (!tokens || typeof tokens !== "object") continue;
    for (const [name, value] of Object.entries(tokens)) {
      if (group === "colors") vars.push([`--color-${name}`, value]);
      else if (group === "spacing") vars.push([`--spacing-${name}`, value]);
      else if (group === "rounded") vars.push([`--radius-${name}`, value]);
      else if (group === "typography" && typeof value === "object") {
        for (const [prop, v] of Object.entries(value)) {
          if (prop === "fontFamily") vars.push([`--font-${name}`, v]);
          else if (prop === "fontSize") vars.push([`--text-${name}`, v]);
          else vars.push([`--text-${name}--${kebab(prop)}`, v]);
        }
      } else if (group === "components" && typeof value === "object") {
        for (const [prop, v] of Object.entries(value)) vars.push([`--${name}-${kebab(prop)}`, v]);
      }
    }
  }
  return vars;
}

const block = (selector, vars) =>
  `${selector} {\n` + vars.map(([k, v]) => `  ${k}: ${v};`).join("\n") + "\n}\n";

export function generate(frontmatter, target) {
  const wrapper = TARGETS[target];
  if (!wrapper) throw new Error(`unknown target: ${target}`);
  const header =
    `/* GENERATED from DESIGN.md (target: ${target}) — do not edit.\n` +
    `   Regenerate: node scripts/design-md-gen.mjs DESIGN.md --target ${target} */\n`;
  let out = header + block(wrapper, collectVars(frontmatter));
  // Mode groups re-assign the same variables under a selector (dark mode,
  // scope-widening modes like a "mixto" chrome). Emitted AFTER the main
  // block — for tailwind4 these are runtime overrides, not @theme entries.
  const modes = frontmatter.modes;
  if (modes && typeof modes === "object") {
    for (const [modeName, mode] of Object.entries(modes)) {
      if (!mode || typeof mode !== "object") continue;
      const vars = collectVars(mode);
      if (!vars.length) continue;
      out += block(mode.selector || `:root[data-theme="${modeName}"]`, vars);
    }
  }
  return out;
}

// ---------- CLI ----------
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2);
  const targetIdx = argv.indexOf("--target");
  const input = argv.find((a) => !a.startsWith("--") && a !== argv[targetIdx + 1]);
  const target = targetIdx === -1 ? null : argv[targetIdx + 1];
  if (!input || !TARGETS[target]) {
    console.error("usage: node scripts/design-md-gen.mjs <DESIGN.md> --target tailwind4|cssvars");
    process.exit(2);
  }
  const parsed = parseDesignMd(readFileSync(input, "utf8"));
  if (parsed.errors.length) {
    for (const e of parsed.errors) console.error(`design-md-gen: ${e}`);
    process.exit(1);
  }
  const out = join(dirname(input), "design.tokens.css");
  writeFileSync(out, generate(parsed.frontmatter, target));
  console.log(`wrote ${out} (${target})`);
}
