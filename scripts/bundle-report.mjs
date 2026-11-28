// Reports first-load JavaScript (gzip) per route from the static export in ./out.
import { readFile, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

const out = path.join(process.cwd(), "out");
const budget = Number(process.env.JS_BUDGET_KB || 210);
async function walk(dir) {
  const r = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "villa-tour" && e.name !== "_next") r.push(...(await walk(p))); }
    else if (e.name === "index.html") r.push(p);
  }
  return r;
}
const cache = new Map();
const size = async (src) => {
  if (!cache.has(src)) cache.set(src, gzipSync(await readFile(path.join(out, src.replace(/^.*?\/_next\//, "_next/")))).length);
  return cache.get(src);
};
const rows = [];
for (const f of await walk(out)) {
  const html = await readFile(f, "utf8");
  const srcs = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+\.js[^"]*)"/g)].map((m) => m[1]))];
  let total = 0;
  for (const s of srcs) total += await size(s);
  rows.push([path.relative(out, path.dirname(f)) || "/", srcs.length, total / 1024]);
}
rows.sort((a, b) => b[2] - a[2]);
let over = 0;
for (const [r, n, kb] of rows) { if (kb > budget) over++; console.log(`${kb.toFixed(1).padStart(7)} KB gzip  ${String(n).padStart(2)} files  ${r}`); }
console.log(`\nbudget ${budget} KB, routes over budget: ${over}`);
if (over) process.exitCode = 1;
