import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { TourViewer } from "./tour-viewer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tour" });
  return { title: t("title"), description: t("desc"), alternates: { canonical: `/${locale}/tour` } };
}

export default async function TourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <Section>
      <PageHero tag={t("walk.type")} title={t("tour.title")} subtitle={t("tour.desc")} />
      <TourViewer locale={locale} />
      <p className="mt-6 text-[0.82rem] text-ink-soft">{t("walk.note")}</p>
    </Section>
  );
}
