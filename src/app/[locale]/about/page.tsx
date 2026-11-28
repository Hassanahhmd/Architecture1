import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { buildWhatsAppUrl, site } from "@/config/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: "nav" });
  const about = await getTranslations({ locale, namespace: "exp" });
  return {
    title: nav("about"),
    description: about("subtitle"),
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const roles = [
    { role: t("exp.r1_role"), company: t("exp.r1_comp"), points: [t("exp.r1_p1"), t("exp.r1_p2"), t("exp.r1_p3"), t("exp.r1_p4")] },
    { role: t("exp.r2_role"), company: "", points: [t("exp.r2_p1")] },
    { role: t("exp.r3_role"), company: "", points: [t("exp.r3_p1")] },
  ];
  const training = [
    { title: t("skills.t1_title"), desc: t("skills.t1_desc") },
    { title: t("skills.t2_title"), desc: t("skills.t2_desc") },
    { title: t("skills.t3_title"), desc: t("skills.t3_desc") },
  ];
  const domains = [t("domain.d1"), t("domain.d2"), t("domain.d3"), t("domain.d4"), t("domain.d5"), t("domain.d6")];

  return (
    <>
      <Section id="experience">
        <PageHero tag={t("exp.tag")} title={t("exp.title")} subtitle={t("exp.subtitle")} />
        <ol className="space-y-8">
          {roles.map((role, index) => (
            <li key={index} className="border-s-2 border-hairline ps-5">
              <p className="text-[length:var(--text-step-1)] font-medium">{role.role}</p>
              {role.company ? <p className="text-[0.88rem] text-brass-ink">{role.company}</p> : null}
              <ul className="mt-2 space-y-1.5 text-[0.92rem] text-ink-soft">
                {role.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" id="skills">
        <SectionHeading title={t("skills.title")} />
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-[0.8rem] tracking-[0.16em] text-brass-ink uppercase">{t("skills.software_title")}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2" dir="ltr">
              {[
                ["AutoCAD (2019)", "Working Drawings & Detailing"],
                ["Revit (2021)", "BIM Modeling & Documentation"],
                ["3ds Max (2021)", "High-Poly Modeling & Staging"],
                ["Lumion (2022)", "Architectural Animation & Renders"],
                ["D5 Render (2025)", "Next-Gen Real-time Raytracing"],
                ["Photoshop (2019)", "Post-Production & Mood Boards"],
                ["AI Visualization", "Concept Acceleration & Prompting"],
              ].map(([tool, note]) => (
                <li key={tool} className="rounded-xs border border-hairline px-3 py-2 text-[0.85rem]">
                  <span className="font-medium">{tool}</span>
                  <span className="block text-[0.78rem] text-ink-soft">{note}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-[0.8rem] tracking-[0.16em] text-brass-ink uppercase">{t("skills.languages_title")}</h3>
            <p className="mt-2 text-[0.9rem] text-ink-soft">
              {t("skills.lang_ar")} — {t("skills.lang_ar_lvl")} · {t("skills.lang_en")} — {t("skills.lang_en_lvl")}
            </p>
          </div>
          <div>
            <h3 className="text-[0.8rem] tracking-[0.16em] text-brass-ink uppercase">{t("skills.training_title")}</h3>
            <ul className="mt-3 space-y-4">
              {training.map((item) => (
                <li key={item.title}>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-[0.88rem] text-ink-soft">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="mt-10 text-[0.8rem] tracking-[0.16em] text-brass-ink uppercase">{t("exp.tag")}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {domains.map((domain) => (
            <li key={domain} className="rounded-xs bg-sand px-3 py-1.5 text-[0.85rem] text-ink-soft">
              {domain}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="olive" id="education">
        <SectionHeading tag={t("edu.tag")} title={t("edu.title")} dark />
        <div className="rounded-md border border-hairline bg-paper p-6 text-ink">
          <p className="text-[length:var(--text-step-1)] font-medium">{t("edu.degree")}</p>
          <p className="mt-1 text-ink-soft">{t("edu.school")}</p>
          <p className="mt-1 text-[0.86rem] text-ink-soft">{t("edu.partner")}</p>
          <p className="mt-1 text-[0.86rem] text-brass-ink">{t("edu.dates")}</p>
        </div>
      </Section>

      <Section tone="orange" id="contact">
        <SectionHeading tag={t("contact.tag")} title={t("contact.title")} subtitle={t("contact.desc")} invert />
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="rounded-sm border border-hairline bg-paper px-4 py-3">
            <a href={buildWhatsAppUrl(locale === "ar" ? "مرحبًا م. حسن، عايز أستشيرك في مشروع." : "Hi Hassan, I'd like to discuss a project.")} target="_blank" rel="noreferrer noopener" className="font-medium hover:text-olive">
              WhatsApp <span dir="ltr">{site.phoneDisplay}</span>
            </a>
          </li>
          <li className="rounded-sm border border-hairline bg-paper px-4 py-3">
            <a href={`tel:${site.phone}`} dir="ltr" className="font-medium hover:text-olive">
              {site.phoneDisplay}
            </a>
          </li>
          <li className="rounded-sm border border-hairline bg-paper px-4 py-3">
            <a href={`mailto:${site.email}`} className="font-medium hover:text-olive">
              {site.email}
            </a>
          </li>
          <li className="rounded-sm border border-hairline bg-paper px-4 py-3">
            <a href={site.behance} target="_blank" rel="noreferrer noopener" className="font-medium hover:text-olive">
              Behance
            </a>
          </li>
          <li className="rounded-sm border border-hairline bg-paper px-4 py-3 text-[0.9rem]">{t("contact.loc_val")}</li>
        </ul>
      </Section>
    </>
  );
}
