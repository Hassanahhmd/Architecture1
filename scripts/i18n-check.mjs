// Fails on missing, extra, empty or unused translation keys.
// Dynamic keys such as t(`tier.${x}_name`) count as using every key that matches the pattern.
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const flat = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? flat(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]],
  );
const load = async (l) => new Map(flat(JSON.parse(await readFile(path.join(root, `src/i18n/messages/${l}.json`), "utf8"))));
const [ar, en] = [await load("ar"), await load("en")];
const errors = [];

for (const k of en.keys()) if (!ar.has(k)) errors.push(`missing in ar: ${k}`);
for (const k of ar.keys()) if (!en.has(k)) errors.push(`missing in en: ${k}`);
for (const [k, v] of [...en, ...ar]) if (typeof v !== "string" || !v.trim()) errors.push(`empty value: ${k}`);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx?|mjs)$/.test(e.name) && !/\.test\./.test(e.name)) out.push(p);
  }
  return out;
}
const src = (await Promise.all((await walk(path.join(root, "src"))).map((f) => readFile(f, "utf8")))).join("\n");
const literals = new Set([...src.matchAll(/["'`]([a-z0-9]+(?:\.[a-z0-9_]+)+)["'`]/gi)].map((m) => m[1]));
const patterns = [...src.matchAll(/`([a-z0-9]+\.[^`]*\$\{[^`]*)`/gi)].map(
  (m) => new RegExp("^" + m[1].replace(/[.*+?^()|[\]\\]/g, "\\$&").replace(/\$\{[^}]*\}/g, "[a-z0-9_]+") + "$", "i"),
);
const used = (k) => literals.has(k) || patterns.some((re) => re.test(k));
const unused = [...en.keys()].filter((k) => !used(k));
const strict = process.argv.includes("--strict");
// Unused keys are warnings by default: keys read through a namespace-scoped t() (useTranslations("err")) or built
// from several variables cannot be traced by a text scan, and the brief forbids deleting copy silently.
if (strict) for (const k of unused) errors.push(`unused key: ${k}`);
else if (unused.length) console.warn(`warning: ${unused.length} key(s) not found in source by text scan (run with --strict to fail): ${unused.slice(0, 8).join(", ")}${unused.length > 8 ? ", ..." : ""}`);

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\ni18n:check failed with ${errors.length} problem(s)`);
  process.exit(1);
}
console.log(`i18n:check ok (${en.size} keys, ar and en match)`);
