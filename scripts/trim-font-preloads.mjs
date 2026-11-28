// Post-build step. next/font preloads every font declared in the shared locale layout,
// so /en/ downloads the Arabic files and /ar/ downloads the Latin ones. Each page only
// paints its own script, so this removes the preload hints that belong to the other
// locale. It only edits <link rel="preload" as="font"> tags in out/en and out/ar.
// CSS and @font-face rules are never touched, so any glyph that needs another file
// still loads on demand. If anything looks unexpected the script changes nothing and
// exits 0 (the site then just keeps the extra preloads).
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const out = "out";

function skip(reason) {
  console.warn(`trim-font-preloads: skipped, no changes made (${reason})`);
  process.exit(0);
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });
}

try {
  const cssDir = join(out, "_next/static/chunks");
  if (!existsSync(cssDir) || !existsSync(join(out, "en")) || !existsSync(join(out, "ar"))) skip("build output not found");

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
  if (arabic.size === 0 || latin.size === 0) skip("could not identify both font groups");

  // Plan every edit first, and only write if each locale keeps at least one preload.
  const plan = [];
  let removed = 0;
  for (const [locale, drop] of [["ar", latin], ["en", arabic]]) {
    let kept = 0;
    const edits = [];
    for (const file of walk(join(out, locale))) {
      const html = readFileSync(file, "utf8");
      const next = html.replace(/<link rel="preload"[^>]*as="font"[^>]*\/>/g, (tag) => {
        const name = /media\/([^"]+\.woff2)/.exec(tag)?.[1];
        if (name && drop.has(name)) { removed++; return ""; }
        kept++;
        return tag;
      });
      if (next !== html) edits.push([file, next]);
    }
    if (kept === 0) skip(`/${locale}/ would lose all font preloads`);
    plan.push(...edits);
  }
  for (const [file, html] of plan) writeFileSync(file, html);
  console.log(`trim-font-preloads: removed ${removed} preload hints in ${plan.length} files`);
} catch (error) {
  skip(`unexpected error: ${error instanceof Error ? error.message : String(error)}`);
}
