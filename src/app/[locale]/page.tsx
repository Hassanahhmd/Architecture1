import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, BadgeCheck, MessageCircle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { SectionCard } from "@/components/layout/section-card";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { buildWhatsAppUrl, site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `${t("name")} — ${t("subtitle")}`,
    description: t("desc"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en" },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent locale={locale as Locale} />;
}

function HomeContent({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const wa = buildWhatsAppUrl(
    locale === "ar"
      ? "مرحبًا م. حسن، شفت موقعك وعايز نتكلم في مشروع."
      : "Hi Hassan, I saw your site and I'd like to talk about a project.",
  );

  const stats = [
    { value: "50+", title: t("stats.p1_title"), desc: t("stats.p1_desc") },
    { value: "0", title: t("stats.p2_title"), desc: t("stats.p2_desc") },
    { value: "4", title: t("stats.p3_title"), desc: t("stats.p3_desc") },
    { value: "6+", title: t("stats.p4_title"), desc: t("stats.p4_desc") },
  ];

  const cards = [
    { href: `/${locale}/projects`, title: t("projects.title"), blurb: t("projects.subtitle"), image: "/images/projects/luxe-villa.jpg" },
    { href: `/${locale}/tour`, title: t("tour.title"), blurb: t("tour.desc"), image: "/images/tour-poster-card.jpg" },
    { href: `/${locale}/lab`, title: t("lab.title"), blurb: t("lab.subtitle"), image: "/images/projects/master-bedroom-marble.jpg" },
    { href: `/${locale}/estimator`, title: t("est.title"), blurb: t("est.subtitle"), image: "/images/projects/neoclassical-apartment.jpg" },
    { href: `/${locale}/reels`, title: t("tiktok.title"), blurb: t("tiktok.subtitle"), image: "/images/projects/kitchen-design.jpg" },
  ];

  return (
    <>
      <section id="top" className="relative px-3 pt-4 pb-10 md:px-10 md:pt-8 md:pb-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 overflow-hidden rounded-lg bg-[radial-gradient(ellipse_at_85%_10%,rgba(255,143,58,0.16),transparent_38%),linear-gradient(160deg,#4a5439_0%,#343d2e_70%)] px-5 py-9 text-paper shadow-[0_24px_55px_rgba(45,49,37,0.14)] md:px-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Badge tone="onDark">{t("hero.badge")}</Badge>
            <h1 className="mt-5 text-[length:var(--text-step-4)] font-semibold text-paper">{t("hero.name")}</h1>
            <p className="mt-2 text-[length:var(--text-step-1)] text-orange">{t("hero.subtitle")}</p>
            <p className="mt-5 max-w-xl text-[length:var(--text-step-0)] text-paper/80">{t("hero.desc")}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {[t("hero.specialty.architecture"), t("hero.specialty.interiors"), t("hero.specialty.visualization")].map(
                (item) => (
                  <li key={item} className="rounded-xs border border-paper/25 px-3 py-1.5 text-[0.82rem] text-paper/85">
                    {item}
                  </li>
                ),
              )}
            </ul>

            <ul className="mt-5 flex flex-wrap items-center gap-4 text-[0.82rem] text-paper/80">
              <li className="inline-flex items-center gap-1.5">
                <BadgeCheck size={16} className="text-orange" aria-hidden /> {t("edu.validation")}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <BadgeCheck size={16} className="text-orange" aria-hidden /> {t("hero.zero_violations")}
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/lab/quiz`}>{t("hero.quiz")}</ButtonLink>
              <ButtonLink href={`/${locale}/projects`} variant="paper">
                {t("hero.view_work")}
              </ButtonLink>
              <ButtonLink href={wa} variant="light" external>
                <MessageCircle size={17} aria-hidden />
                {t("hero.whatsapp")}
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[14rem] sm:max-w-sm">
            <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-paper/20 bg-olive">
              <Image
                src="/images/profile.jpg"
                alt={t("hero.name")}
                fill
                priority
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 start-4 rounded-sm bg-paper px-3.5 py-2 text-[0.78rem] text-ink shadow-sm ring-1 ring-hairline">
              <span className="font-semibold text-olive">50+</span> {t("hero.floating_projects")}
            </div>
            <div className="absolute top-4 end-4 rounded-sm bg-paper px-3.5 py-2 text-[0.78rem] text-ink shadow-sm ring-1 ring-hairline">
              {t("hero.floating_satisfaction")}
            </div>
          </div>
        </div>
      </section>

      <Section tone="olive" className="!py-10 md:!py-24">
        <dl className="grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <Reveal key={stat.title} delay={index * 60}>
              <dt className="text-[length:var(--text-step-2)] font-semibold text-orange md:text-[length:var(--text-step-3)]" dir="ltr">{stat.value}</dt>
              <dd className="mt-1 text-[0.88rem] font-medium text-paper md:text-[0.95rem]">{stat.title}</dd>
              <dd className="mt-1 text-[0.76rem] leading-snug text-paper/80 md:text-[0.84rem]">{stat.desc}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeading tag={t("exp.tag")} title={t("exp.title")} subtitle={t("exp.subtitle")} />
        <ol className="space-y-6">
          {[
            { role: t("exp.r1_role"), company: t("exp.r1_comp"), text: t("exp.r1_p1") },
            { role: t("exp.r2_role"), company: "", text: t("exp.r2_p1") },
            { role: t("exp.r3_role"), company: "", text: t("exp.r3_p1") },
          ].map((role, index) => (
            <li key={index} className="grid gap-2 border-s-2 border-hairline ps-5 md:grid-cols-[220px_1fr] md:gap-6">
              <div>
                <p className="font-medium text-ink">{role.role}</p>
                {role.company ? <p className="text-[0.85rem] text-brass-ink">{role.company}</p> : null}
              </div>
              <p className="text-[0.92rem] text-ink-soft">{role.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <ButtonLink href={`/${locale}/about`} variant="outline">
            {t("nav.about")}
            <ArrowUpRight size={16} className="rtl:-scale-x-100" aria-hidden />
          </ButtonLink>
        </p>
      </Section>

      <Section tone="sand">
        <SectionHeading tag={t("edu.tag")} title={t("edu.title")} />
        <div className="rounded-md border border-hairline bg-paper p-6">
          <p className="text-[length:var(--text-step-1)] font-medium">{t("edu.degree")}</p>
          <p className="mt-1 text-ink-soft">{t("edu.school")}</p>
          <p className="mt-1 text-[0.86rem] text-ink-soft">{t("edu.partner")}</p>
          <p className="mt-1 text-[0.86rem] text-brass-ink">{t("edu.dates")}</p>
        </div>
      </Section>

      <Section>
        <SectionHeading tag={t("projects.tag")} title={t("projects.title")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.href} delay={index * 60} className={index === 0 ? "sm:col-span-2" : ""}>
              <SectionCard {...card} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="orange">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <SectionHeading tag={t("contact.tag")} title={t("contact.title")} subtitle={t("contact.desc")} invert />
          </div>
          <ul className="space-y-3 text-[0.92rem]">
            <li className="rounded-sm border border-hairline bg-paper px-4 py-3">
              <span className="block text-[0.75rem] tracking-wide text-brass-ink uppercase">{t("contact.phone_label")}</span>
              <a href={`tel:${site.phone}`} dir="ltr" className="font-medium hover:text-olive">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="rounded-sm border border-hairline bg-paper px-4 py-3">
              <span className="block text-[0.75rem] tracking-wide text-brass-ink uppercase">{t("contact.email_label")}</span>
              <a href={`mailto:${site.email}`} className="font-medium hover:text-olive">
                {site.email}
              </a>
            </li>
            <li className="rounded-sm border border-hairline bg-paper px-4 py-3">
              <span className="block text-[0.75rem] tracking-wide text-brass-ink uppercase">{t("contact.loc_label")}</span>
              <span className="font-medium">{t("contact.loc_val")}</span>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
