// Static export on GitHub Pages: the site lives under /Architecture1, and next/image
// does not add the base path when images are unoptimised. Images are already
// optimised at build time (scripts/images.mjs), so the loader only prefixes the path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string }): string {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return `${basePath}${src}`;
}
