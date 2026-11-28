// Owner-run script: downloads hot-linked Behance and kuula images into public/projects/<slug>/.
// Usage: node scripts/fetch-remote-images.mjs [--dry]
// It only lists and downloads. It does not rewrite src/features/projects/data.ts: the printed map shows what to change.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const dry = process.argv.includes("--dry");
const data = await readFile(path.join(process.cwd(), "src/features/projects/data.ts"), "utf8");
const blocks = data.split(/\n  \{\n    "slug": /).slice(1);
const hosts = /^https:\/\/(mir-s3-cdn-cf\.behance\.net|[a-z0-9.]*kuula\.co)\//;
let n = 0;
for (const b of blocks) {
  const slug = b.match(/^"([^"]+)"/)[1];
  const urls = [...new Set([...b.matchAll(/"(https:\/\/[^"]+)"/g)].map((m) => m[1]))].filter((u) => hosts.test(u));
  for (const [i, u] of urls.entries()) {
    const ext = path.extname(new URL(u).pathname) || ".jpg";
    const dest = path.join("public/projects", slug, `${String(i + 1).padStart(2, "0")}${ext}`);
    console.log(`${u}\n  -> /${dest.replace(/^public\//, "")}`);
    n++;
    if (dry) continue;
    const res = await fetch(u);
    if (!res.ok) { console.error(`  failed: ${res.status}`); continue; }
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  }
}
console.log(`${n} remote image(s) ${dry ? "found" : "processed"}`);
