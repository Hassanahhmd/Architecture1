import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Empty for local work and tests. The Pages workflow sets BASE_PATH (e.g. /Architecture1).
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // The live site is served by GitHub Pages, which cannot run a Next.js server,
  // so the whole app is a static export. Images are optimised at build time instead.
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
