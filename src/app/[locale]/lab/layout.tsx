import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
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
      <p className="mb-3 text-[0.8rem] tracking-[0.18em] text-brass-ink uppercase">{t("lab.tag")}</p>
      <h1 className="text-[length:var(--text-step-3)] font-semibold">{t("lab.title")}</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">{t("lab.subtitle")}</p>
      <nav className="mt-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="rounded-xs border border-hairline px-3.5 py-2 text-[0.85rem] text-ink-soft hover:border-olive hover:text-olive"
          >
            {tab.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10">{children}</div>
    </Section>
  );
}
