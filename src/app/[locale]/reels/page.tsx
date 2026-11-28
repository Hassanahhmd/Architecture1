import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { ReelsGrid } from "./reels-grid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tiktok" });
  return { title: t("title"), description: t("subtitle"), alternates: { canonical: `/${locale}/reels` } };
}

export default async function ReelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <Section>
      <SectionHeading tag={t("reel.tag")} title={t("tiktok.title")} subtitle={t("tiktok.subtitle")} />
      <ReelsGrid />
    </Section>
  );
}
