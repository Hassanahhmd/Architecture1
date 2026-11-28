import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Quiz } from "./quiz";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lab" });
  return { alternates: { canonical: `/${locale}/lab/quiz` }, title: t("tab_quiz"), description: `${t("tab_quiz")} — ${t("subtitle")}` };
}

export default async function QuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <Quiz locale={locale === "ar" ? "ar" : "en"} />;
}
