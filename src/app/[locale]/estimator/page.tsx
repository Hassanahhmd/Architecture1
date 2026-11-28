import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { Estimator } from "./estimator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "est" });
  return { title: t("title"), description: t("subtitle"), alternates: { canonical: `/${locale}/estimator` } };
}

export default async function EstimatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <Section>
      <SectionHeading tag={t("est.tag")} title={t("est.title")} subtitle={t("est.subtitle")} />
      <Estimator locale={locale === "ar" ? "ar" : "en"} />
    </Section>
  );
}
