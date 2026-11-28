import type { Metadata } from "next";
import { Lighting } from "./lighting";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lab" });
  return { title: t("tab_light"), description: `${t("tab_light")} — ${t("subtitle")}` };
}

export default async function LightingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <div>
      <h2 className="text-[length:var(--text-step-1)] font-medium">{t("light.title")}</h2>
      <p className="mt-2 mb-6 max-w-2xl text-[0.92rem] text-ink-soft">{t("light.desc")}</p>
      <Lighting
        locale={locale === "ar" ? "ar" : "en"}
        labels={{ morning: t("light.morning"), sunset: t("light.sunset"), night: t("light.night") }}
        hud={{ temp: t("light.hud_temp"), angle: t("light.hud_angle"), shadow: t("light.hud_shadow"), illustrative: t("light.illustrative") }}
      />
    </div>
  );
}
