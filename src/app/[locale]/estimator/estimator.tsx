"use client";

import { useReducer } from "react";
import { useTranslations } from "next-intl";
import { computeEstimate, formatEGP, type Selection } from "@/features/estimator/logic";
import { areaRange, defaultSelection, tiers, units, type TierKey, type UnitKey } from "@/features/estimator/pricing";
import { buildWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/cn";

type Action =
  | { type: "unit"; value: UnitKey }
  | { type: "tier"; value: TierKey }
  | { type: "area"; value: number }
  | { type: "toggle"; key: "gypsum" | "door" | "smart" | "hvac" };

function reducer(state: Selection, action: Action): Selection {
  switch (action.type) {
    case "unit":
      return { ...state, unit: action.value };
    case "tier":
      return { ...state, tier: action.value };
    case "area":
      return { ...state, area: action.value };
    case "toggle":
      return { ...state, [action.key]: !state[action.key] };
  }
}

export function Estimator({ locale }: { locale: "ar" | "en" }) {
  const t = useTranslations();
  const [selection, dispatch] = useReducer(reducer, defaultSelection);
  const estimate = computeEstimate(selection);
  const unitKeys = Object.keys(units) as UnitKey[];
  const tierKeys = Object.keys(tiers) as TierKey[];

  const addonNames = {
    gypsum: { ar: "أسقف معلقة كناوف", en: "Gypsum Board Ceilings" },
    door: { ar: "باب مصفح تركي ونجارة", en: "Armored & Interior Doors" },
    smart: { ar: "أنظمة سمارت هوم", en: "Smart Home Automation" },
    hvac: { ar: "تجهيزات تكييف كونسيلد", en: "Concealed HVAC Prep" },
  } as const;
  const chosen = (Object.keys(addonNames) as (keyof typeof addonNames)[]).filter((key) => selection[key]).map((key) => addonNames[key][locale]);
  const addonsText = chosen.length ? chosen.join(locale === "ar" ? "، " : ", ") : locale === "ar" ? "بدون إضافات" : "Standard";
  const unitName = t(`est.unit_${selection.unit === "apartment" ? "apt" : selection.unit}`);
  const tierName = t(`tier.${selection.tier}_name`);
  const tierGift = t(`tier.${selection.tier}_gift`);
  const tierRate = formatEGP(tiers[selection.tier].rate, locale);
  const total = formatEGP(estimate.total, locale);
  const perM2 = formatEGP(estimate.ratePerM2, locale);
  const { min, max } = estimate.timeline;
  const message =
    locale === "ar"
      ? `مرحباً م. حسن أحمد،\nاستخدمت الحاسبة للحصول على تقدير أولي للميزانية. أرجو إرسال عرض سعر محدث ومكتوب للتأكيد:\n\n• نوع الوحدة: ${unitName}\n• المساحة: ${selection.area} م²\n• باقة التشطيب لعام 2027 (سعر استرشادي): ${tierName} (~${tierRate} ج.م/م²)\n• 🎁 الهدايا المشمولة مجاناً: ${tierGift}\n• البنود الإضافية: ${addonsText}\n• التكلفة الإجمالية التقديرية: ${total} جنيه مصري (~${perM2} ج.م/م²)\n• مدة التنفيذ المقترحة: ${min}-${max} أسبوع\n\nبرجاء إفادتي بإمكانية تحديد موعد لمعاينة الموقع ومناقشة تفاصيل التعاقد واستلام الهدايا المشمولة. شكراً لك!`
      : `Hello Eng. Hassan Ahmed,\nI used the estimator for an initial budget reference. Please send a current written quotation to confirm:\n\n• Property Type: ${unitName}\n• Total Area: ${selection.area} m²\n• 2027 Selected package (indicative rate): ${tierName} (~${tierRate} EGP/m²)\n• 🎁 Included Complimentary Perks: ${tierGift}\n• Selected Add-ons: ${addonsText}\n• Estimated Total: ${total} EGP (~${perM2} EGP/m²)\n• Estimated Timeline: ${min}-${max} weeks\n\nLooking forward to scheduling a site inspection and discussing contract execution and perks. Thank you!`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] print:block">
      <div className="space-y-8 print-hide">
        <fieldset>
          <legend className="text-[0.8rem] tracking-[0.16em] text-brass-ink uppercase">{t("est.unit_type_label")}</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {unitKeys.map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => dispatch({ type: "unit", value: unit })}
                aria-pressed={selection.unit === unit}
                className={cn(
                  "rounded-sm border px-3 py-2.5 text-[0.85rem]",
                  selection.unit === unit ? "border-olive bg-olive text-alabaster" : "border-hairline text-ink-soft",
                )}
              >
                {t(`est.unit_${unit === "apartment" ? "apt" : unit}`)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[0.8rem] tracking-[0.16em] text-brass-ink uppercase">{t("est.area_label")}</legend>
          <div className="mt-3 flex items-center gap-4">
            <input
              type="range"
              min={areaRange.min}
              max={areaRange.max}
              step={areaRange.step}
              value={selection.area}
              onChange={(event) => dispatch({ type: "area", value: Number(event.target.value) })}
              className="w-full accent-[#414B35]"
              aria-label={t("est.area_label")}
            />
            <output className="min-w-20 rounded-xs border border-hairline px-2 py-1 text-center text-[0.85rem]">
              {selection.area} {t("est.m2")}
            </output>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[0.8rem] tracking-[0.16em] text-brass-ink uppercase">{t("est.tier_label")}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {tierKeys.map((tier) => (
              <label
                key={tier}
                className={cn(
                  "cursor-pointer rounded-sm border px-4 py-3",
                  selection.tier === tier ? "border-orange bg-orange/15" : "border-hairline",
                )}
              >
                <input
                  type="radio"
                  name="tier"
                  value={tier}
                  checked={selection.tier === tier}
                  onChange={() => dispatch({ type: "tier", value: tier })}
                  className="sr-only"
                />
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[0.92rem] font-medium">{t(`tier.${tier}_name`)}</span>
                  <span className="text-[0.78rem] text-ink-soft" dir="ltr">
                    {formatEGP(tiers[tier].rate, locale)} / {t("est.m2")}
                  </span>
                </span>
                <span className="mt-1 block text-[0.8rem] text-ink-soft">{t(`tier.${tier}_desc`)}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 rounded-sm border border-hairline bg-sand/40 p-4" aria-live="polite">
            <p className="text-[0.78rem] tracking-[0.16em] text-brass-ink uppercase">{t("est.quotas_live_tag")}</p>
            <p className="mt-2 text-[0.82rem] font-medium">{t("est.gift_box_title")}</p>
            <p className="mt-1 text-[0.85rem]">{t(`tier.${selection.tier}_gift`)}</p>
            <ul className="mt-3 list-disc space-y-1 ps-5 text-[0.82rem] text-ink-soft">
              {(["f1", "f2", "f3", "f4"] as const).map((f) => (
                <li key={f}>{t(`tier.${selection.tier}_${f}`)}</li>
              ))}
            </ul>
            <p className="mt-3 text-[0.75rem] text-ink-soft">{t("est.gift_note")}</p>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[0.8rem] tracking-[0.16em] text-brass-ink uppercase">{t("est.addons_label")}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {([
              ["gypsum", "est.add_gypsum"],
              ["door", "est.add_door"],
              ["smart", "est.add_smart"],
              ["hvac", "est.add_hvac"],
            ] as const).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-3 rounded-sm border border-hairline px-4 py-3 text-[0.88rem]">
                <input
                  type="checkbox"
                  checked={selection[key]}
                  onChange={() => dispatch({ type: "toggle", key })}
                  className="size-4 accent-[#414B35]"
                />
                {t(label)}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="print-summary h-fit rounded-md border-t-4 border-t-orange bg-olive-dark p-6 text-paper print:bg-transparent print:text-ink lg:sticky lg:top-24 print:border-0 print:p-0">
        <p className="text-[0.78rem] tracking-[0.16em] text-orange print:text-brass-ink uppercase">{t("est.summary_tag")}</p>
        <p className="mt-2 text-[0.85rem] text-paper/80 print:text-ink-soft">{t("est.summary_title")}</p>
        <p className="mt-4 text-[length:var(--text-step-2)] font-semibold text-orange print:text-olive">
          {formatEGP(estimate.total, locale)} <span className="text-[0.9rem] font-normal text-paper/80 print:text-ink-soft">{t("est.currency")}</span>
        </p>
        <p className="mt-1 text-[0.85rem] text-paper/80 print:text-ink-soft">
          {formatEGP(estimate.ratePerM2, locale)} {t("est.currency")} / {t("est.m2")}
        </p>

        <dl className="mt-5 space-y-2 border-t border-paper/20 print:border-hairline pt-4 text-[0.85rem]">
          <div className="flex justify-between"><dt>{t("est.b_materials")}</dt><dd>{formatEGP(estimate.breakdown.materials, locale)}</dd></div>
          <div className="flex justify-between"><dt>{t("est.b_labor")}</dt><dd>{formatEGP(estimate.breakdown.labor, locale)}</dd></div>
          <div className="flex justify-between"><dt>{t("est.b_supervision")}</dt><dd>{formatEGP(estimate.breakdown.supervision, locale)}</dd></div>
        </dl>

        <dl className="mt-4 space-y-2 border-t border-paper/20 print:border-hairline pt-4 text-[0.85rem]">
          <div className="flex justify-between">
            <dt>{t("est.timeline_lbl")}</dt>
            <dd dir="ltr">{estimate.timeline.min}–{estimate.timeline.max} {t("est.weeks")}</dd>
          </div>
          <div className="flex justify-between"><dt>{t("est.warranty_lbl")}</dt><dd>{t("est.warranty_val")}</dd></div>
        </dl>

        <div className="mt-4 border-t border-paper/20 print:border-hairline pt-4">
          <p className="text-[0.85rem] font-medium">{t("est.milestones_title")}</p>
          <ol className="mt-2 space-y-2 text-[0.85rem]">
            {estimate.milestones.map((m, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span>
                  <span dir="ltr" className="me-2 text-paper/80 print:text-ink-soft">{m.percent}%</span>
                  {t(i === 1 ? "est.m2_label" : `est.m${i + 1}`)}
                </span>
                <span>{formatEGP(m.amount, locale)}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-4 text-[0.75rem] text-paper/80 print:text-ink-soft">{t("est.disclaimer")}</p>

        <div className="mt-5 flex flex-col gap-2 print-hide">
          <a
            href={buildWhatsAppUrl(message)}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-sm bg-orange px-4 py-3 text-center text-[0.9rem] font-medium text-olive-dark"
          >
            {t("est.cta_whatsapp")}
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-sm border border-paper/40 px-4 py-3 text-[0.9rem] text-paper"
          >
            {t("est.cta_print")}
          </button>
        </div>
      </aside>
    </div>
  );
}
