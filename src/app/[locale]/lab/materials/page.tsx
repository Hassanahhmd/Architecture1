import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

const presets = [
  { key: "mat.preset1", image: "/images/projects/luxe-villa.jpg" },
  { key: "mat.preset2", image: "/images/projects/neoclassical-apartment.jpg" },
  { key: "mat.preset3", image: "/images/projects/master-suite-dressing.jpg" },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lab" });
  return { title: t("tab_mat"), description: `${t("tab_mat")} — ${t("subtitle")}` };
}

export default async function MaterialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <div>
      <h2 className="text-[length:var(--text-step-1)] font-medium">{t("mat.title")}</h2>
      <p className="mt-2 max-w-2xl text-[0.92rem] text-ink-soft">{t("mat.desc")}</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {presets.map((preset) => (
          <li key={preset.key} className="overflow-hidden rounded-md border border-hairline bg-paper">
            <div className="relative aspect-4/3">
              <Image src={preset.image} alt="" fill sizes="(min-width: 640px) 30vw, 90vw" className="object-cover" />
            </div>
            <div className="p-4">
              <p className="font-medium">{t(preset.key)}</p>
              <p className="mt-1 text-[0.82rem] text-ink-soft">{t("mat.choose_palette")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
