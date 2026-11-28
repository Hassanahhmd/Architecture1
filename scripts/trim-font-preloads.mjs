// Post-build step. next/font preloads every font declared in the shared locale layout,
// so /en/ downloads the Arabic files and /ar/ downloads the Latin ones. The visual
// result does not need them (each page only paints its own script), so this removes
// the preload hints that belong to the other locale. @font-face rules are untouched,
// so any glyph that does need another file still loads on demand.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const out = "out";
const cssDir = join(out, "_next/static/chunks");
const arabic = new Set();
const latin = new Set();
for (const f of readdirSync(cssDir).filter((n) => n.endsWith(".css"))) {
  const css = readFileSync(join(cssDir, f), "utf8");
  for (const m of css.matchAll(/@font-face\{([^}]*)\}/g)) {
    const family = /font-family:([^;]*)/.exec(m[1])?.[1] ?? "";
    const file = /media\/([^)"']+\.woff2)/.exec(m[1])?.[1];
    if (!file || /Fallback/.test(family)) continue;
    (/Plex/.test(family) ? arabic : latin).add(file);
  }
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });
}
let removed = 0;
for (const [locale, drop] of [["ar", latin], ["en", arabic]]) {
  const dir = join(out, locale);
  for (const file of walk(dir)) {
    const html = readFileSync(file, "utf8");
    const next = html.replace(/<link rel="preload"[^>]*as="font"[^>]*\/>/g, (tag) => {
      const name = /media\/([^"]+\.woff2)/.exec(tag)?.[1];
      if (name && drop.has(name)) { removed++; return ""; }
      return tag;
    });
    if (next !== html) writeFileSync(file, next);
  }
}
console.log(`trim-font-preloads: removed ${removed} preload hints`);
