// Build-time image pipeline: the original shipped a 545 KB base64 JPEG inside a
// script tag, plus 5.7 MB of unoptimised project images. This turns the poster
// into a real file and recompresses every project image to a sane size.
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const posterSource = process.env.TOUR_POSTER_SOURCE || "/tmp/arch1/assets/villa-tour-facade.js";
const posterOut = path.join(root, "public/images/tour-poster.jpg");

async function poster() {
  try {
    await stat(posterOut);
    console.log("poster exists, skipping");
    return;
  } catch {}
  const { readFile, writeFile } = await import("node:fs/promises");
  const raw = await readFile(posterSource, "utf8");
  const match = raw.match(/base64,([A-Za-z0-9+/=]+)"/);
  if (!match) throw new Error("no base64 payload in facade script");
  const buffer = Buffer.from(match[1], "base64");
  await mkdir(path.dirname(posterOut), { recursive: true });
  const out = await sharp(buffer).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 76, mozjpeg: true }).toBuffer();
  await writeFile(posterOut, out);
  console.log(`poster ${(buffer.length / 1024).toFixed(0)} KB -> ${(out.length / 1024).toFixed(0)} KB`);
}

async function projects() {
  const dir = path.join(root, "public/images/projects");
  const files = await readdir(dir);
  let before = 0;
  let after = 0;
  for (const file of files) {
    const full = path.join(dir, file);
    const info = await stat(full);
    before += info.size;
    const image = sharp(full).rotate();
    const meta = await image.metadata();
    const pipeline = meta.width && meta.width > 1600 ? image.resize({ width: 1600 }) : image;
    const out = await pipeline.jpeg({ quality: 74, mozjpeg: true }).toBuffer();
    if (out.length < info.size) {
      const { writeFile } = await import("node:fs/promises");
      await writeFile(full.replace(/\.(png|jpg|jpeg)$/i, ".jpg"), out);
      if (!/\.jpg$/i.test(full)) await import("node:fs/promises").then((fs) => fs.unlink(full));
      after += out.length;
    } else {
      after += info.size;
    }
  }
  console.log(`projects ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`);
}

await poster();
await projects();
