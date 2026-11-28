import {
  addOnsPerM2,
  areaRange,
  breakdown,
  flatAddOns,
  milestones,
  tiers,
  units,
  type AddOnKey,
  type TierKey,
  type UnitKey,
} from "./pricing";

export type Selection = {
  unit: UnitKey;
  tier: TierKey;
  area: number;
  gypsum: boolean;
  door: boolean;
  smart: boolean;
  hvac: boolean;
};

export type Estimate = {
  effectiveRate: number;
  variable: number;
  total: number;
  ratePerM2: number;
  breakdown: { materials: number; labor: number; supervision: number };
  timeline: { min: number; max: number };
  milestones: { percent: number; amount: number }[];
};

export function computeEstimate(selection: Selection): Estimate {
  const area = clampArea(selection.area);
  const tierRate = tiers[selection.tier].rate;
  const effectiveRate = tierRate * units[selection.unit];

  const perM2: AddOnKey[] = [];
  if (selection.gypsum) perM2.push("gypsum");
  if (selection.smart) perM2.push("smart");
  if (selection.hvac) perM2.push("hvac");
  const addOnRate = perM2.reduce((sum, key) => sum + addOnsPerM2[key], 0);

  const variable = (effectiveRate + addOnRate) * area;
  const flat = selection.door ? flatAddOns.door : 0;
  const total = variable + flat;

  return {
    effectiveRate,
    variable,
    total,
    ratePerM2: Math.round(total / area),
    breakdown: {
      materials: Math.round(total * breakdown.materials),
      labor: Math.round(total * breakdown.labor),
      supervision: Math.round(total * breakdown.supervision),
    },
    timeline: computeTimeline(area, tierRate),
    milestones: milestones.map((percent) => ({ percent, amount: Math.round((total * percent) / 100) })),
  };
}

export function computeTimeline(area: number, tierRate: number) {
  let base = Math.ceil(clampArea(area) / 18);
  if (tierRate >= 13000) base += 3;
  if (tierRate >= 20000) base += 3;
  const min = Math.max(8, base);
  return { min, max: min + 3 };
}

export function clampArea(area: number) {
  if (Number.isNaN(area)) return areaRange.default;
  return Math.min(areaRange.max, Math.max(areaRange.min, Math.round(area / areaRange.step) * areaRange.step));
}

export function formatEGP(value: number, locale: "ar" | "en") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG-u-nu-latn" : "en-EG", {
    maximumFractionDigits: 0,
  }).format(value);
}
