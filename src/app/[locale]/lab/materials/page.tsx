import type { Metadata } from "next";
import { Materials } from "./materials";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
      <p className="mt-2 mb-6 max-w-2xl text-[0.92rem] text-ink-soft">{t("mat.desc")}</p>
      <Materials locale={locale === "ar" ? "ar" : "en"} heading={t("mat.choose_palette")} stylePrefix={t("mat.style_prefix")} />
    </div>
  );
}
