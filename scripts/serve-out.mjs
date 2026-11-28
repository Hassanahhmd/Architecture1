// Minimal static server for the ./out export (used by Playwright). Usage: node scripts/serve-out.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), "out");
const port = Number(process.argv[2] || 4173);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml" };
createServer(async (req, res) => {
  let p = path.normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = path.join(root, p);
  try { if ((await stat(file)).isDirectory()) file = path.join(file, "index.html"); } catch { file = path.join(root, "404.html"); res.statusCode = 404; }
  try { res.setHeader("content-type", types[path.extname(file)] || "application/octet-stream"); res.end(await readFile(file)); }
  catch { res.statusCode = 404; res.end("not found"); }
}).listen(port, () => console.log(`serving out on ${port}`));
