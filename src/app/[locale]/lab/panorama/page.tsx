import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Panorama } from "./panorama";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lab" });
  return { alternates: { canonical: `/${locale}/lab/panorama` }, title: t("tab_360"), description: `${t("tab_360")} — ${t("subtitle")}` };
}

export default async function PanoramaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <div>
      <h2 className="text-[length:var(--text-step-1)] font-medium">{t("tour.title")}</h2>
      <p className="mt-2 max-w-2xl text-[0.92rem] text-ink-soft">{t("tour.desc")}</p>
      <div className="mt-6">
        <Panorama
          rooms={[
            { src: "/images/projects/modern-kitchen-360.jpg", label: t("tour.r1") },
            { src: "/images/projects/double-height-reception.jpg", label: t("tour.r2") },
          ]}
        />
      </div>
    </div>
  );
}
