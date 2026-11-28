import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { Estimator } from "./estimator";
import { tiers, type TierKey } from "@/features/estimator/pricing";
import { formatEGP } from "@/features/estimator/logic";

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
      <section className="mt-16" aria-labelledby="matrix-title">
        <p className="text-[0.78rem] tracking-[0.16em] text-brass-ink uppercase">{t("matrix.badge")}</p>
        <h2 id="matrix-title" className="mt-2 font-display text-[1.6rem]">{t("matrix.title")}</h2>
        <p className="mt-2 max-w-2xl text-[0.9rem] text-ink-soft">{t("matrix.desc")}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-start text-[0.85rem]">
            <thead>
              <tr className="border-b border-hairline text-ink-soft">
                <th scope="col" className="py-2 pe-4 text-start font-medium">{t("est.tier_label")}</th>
                <th scope="col" className="py-2 pe-4 text-start font-medium">{t("est.rate_label")}</th>
                <th scope="col" className="py-2 text-start font-medium">{t("est.gift_box_title")}</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(tiers) as TierKey[]).map((tier) => (
                <tr key={tier} className="border-b border-hairline align-top">
                  <th scope="row" className="py-3 pe-4 text-start font-medium">{t(`tier.${tier}_name`)}</th>
                  <td className="py-3 pe-4" dir="ltr">{formatEGP(tiers[tier].rate, locale === "ar" ? "ar" : "en")} {t("est.currency")}</td>
                  <td className="py-3">{t(`tier.${tier}_gift`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Section>
  );
}
