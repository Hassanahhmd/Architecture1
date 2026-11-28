import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

const modes = [
  { key: "morning", time: "09:00", temp: "5600K", altitude: "32°", image: "/images/projects/master-bedroom-marble.jpg" },
  { key: "sunset", time: "17:30", temp: "3200K", altitude: "8°", image: "/images/projects/luxury-bathroom.jpg" },
  { key: "night", time: "21:00", temp: "2700K", altitude: "—", image: "/images/projects/majles-luxury.jpg" },
] as const;

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
      <p className="mt-2 max-w-2xl text-[0.92rem] text-ink-soft">{t("light.desc")}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {modes.map((mode) => (
          <figure key={mode.key} className="overflow-hidden rounded-md border border-hairline bg-paper">
            <div className="relative aspect-4/3">
              <Image src={mode.image} alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
            </div>
            <figcaption className="p-4 text-[0.85rem]">
              <p className="font-medium">{t(`light.${mode.key}`)}</p>
              <dl className="mt-2 space-y-1 text-ink-soft">
                <div className="flex justify-between"><dt>Time</dt><dd dir="ltr">{mode.time}</dd></div>
                <div className="flex justify-between"><dt>Color temperature</dt><dd dir="ltr">{mode.temp}</dd></div>
                <div className="flex justify-between"><dt>Sun altitude</dt><dd dir="ltr">{mode.altitude}</dd></div>
              </dl>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-[0.78rem] text-ink-soft">{t("light.illustrative")}</p>
    </div>
  );
}
