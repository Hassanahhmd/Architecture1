/** All prices live here and nowhere else. The original repeated them in three places. */

export const units = {
  apartment: 1.0,
  villa: 1.15,
  office: 1.05,
  retail: 1.2,
} as const;

export type UnitKey = keyof typeof units;

export const tiers = {
  eco: { rate: 5500 },
  med: { rate: 7000 },
  vip: { rate: 9300 },
  uvip: { rate: 11000 },
  suvip: { rate: 13000 },
  elite: { rate: 20000 },
  lux: { rate: 24000 },
} as const;

export type TierKey = keyof typeof tiers;

export const addOnsPerM2 = {
  gypsum: 550,
  smart: 750,
  hvac: 450,
} as const;

export type AddOnKey = keyof typeof addOnsPerM2;

export const flatAddOns = { door: 22000 } as const;

export const areaRange = { min: 50, max: 600, step: 5, default: 160 } as const;

export const defaultSelection = {
  unit: "apartment" as UnitKey,
  tier: "elite" as TierKey,
  area: 160,
  gypsum: true,
  door: true,
  smart: false,
  hvac: false,
};

export const breakdown = { materials: 0.6, labor: 0.25, supervision: 0.15 } as const;

export const milestones = [30, 25, 25, 20] as const;
