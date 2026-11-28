import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { projects } from "@/features/projects/data";

export const dynamic = "force-static";

const base = "https://hassanahhmd.github.io/Architecture1";
const paths = ["", "/about", "/projects", "/tour", "/reels", "/estimator", "/lab/quiz", "/lab/lighting", "/lab/panorama", "/lab/materials"];

export default function sitemap(): MetadataRoute.Sitemap {
  const all = [...paths, ...projects.map((p) => `/projects/${p.slug}`)];
  return all.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}/`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}/`])) },
    })),
  );
}
