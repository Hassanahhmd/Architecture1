import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ProjectsGrid } from "./projects-grid";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), description: t("subtitle"), alternates: { canonical: `/${locale}/projects` } };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const initial = "all" as const;

  return (
    <Section>
      <PageHero tag={t("projects.tag")} title={t("projects.title")} subtitle={t("projects.subtitle")} />
      <ProjectsGrid locale={locale as Locale} initialFilter={initial} />
      <p className="mt-10">
        <a
          href="https://www.behance.net/Hassan_ahhmd"
          target="_blank"
          rel="noreferrer noopener"
          className="text-[0.9rem] text-olive hover:underline"
        >
          {t("projects.behance_cta")}
        </a>
      </p>
    </Section>
  );
}
