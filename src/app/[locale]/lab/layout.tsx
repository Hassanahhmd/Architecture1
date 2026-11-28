import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";

export default async function LabLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const tabs = [
    { href: `/${locale}/lab/quiz`, label: t("lab.tab_quiz") },
    { href: `/${locale}/lab/lighting`, label: t("lab.tab_light") },
    { href: `/${locale}/lab/panorama`, label: t("lab.tab_360") },
    { href: `/${locale}/lab/materials`, label: t("lab.tab_mat") },
  ];
  return (
    <Section>
      <PageHero tag={t("lab.tag")} title={t("lab.title")} subtitle={t("lab.subtitle")}>
      <nav className="mt-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="rounded-xs border border-paper/35 px-3.5 py-2 text-[0.85rem] text-paper hover:border-orange hover:text-orange"
          >
            {tab.label}
          </Link>
        ))}
      </nav>
      </PageHero>
      <div className="mt-10">{children}</div>
    </Section>
  );
}
