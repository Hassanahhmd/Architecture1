"use client";

import Image from "next/image";
import { useState } from "react";

type L = { en: string; ar: string };
const presets: { img: string; name: L; title: L; desc: L; specs: L[]; swatches: [string, string][] }[] = [
  {
    img: "/images/projects/double-height-reception.jpg",
    name: { ar: "نيوكلاسيك فخم (Calacatta Gold)", en: "Neoclassical Luxury (Calacatta)" },
    title: { ar: "نيوكلاسيك ملكي (Calacatta & Brass)", en: "Royal Neoclassical (Calacatta & Brass)" },
    desc: { ar: "رخام كلكتا إيطالي متصل العروق مع إكسسوارات برونزية ذهبية وإضاءة وورم.", en: "Italian bookmatched Calacatta marble with golden brass accents and warm lighting." },
    specs: [
      { en: "Marble: Bookmatched Calacatta Gold", ar: "Marble: Bookmatched Calacatta Gold" },
      { en: "Lighting: Linear Profile LED 3000K", ar: "Lighting: Linear Profile LED 3000K" },
      { en: "Accents: Brushed Brass Cladding", ar: "Accents: Brushed Brass Cladding" },
    ],
    swatches: [["#e8e4de", "Calacatta Marble"], ["#c5a880", "Brushed Brass"], ["#252830", "Shadow Gray"]],
  },
  {
    img: "/images/projects/majles-luxury.jpg",
    name: { ar: "مودرن دافئ (Walnut & Stone)", en: "Warm Modern (Walnut & Stone)" },
    title: { ar: "مودرن دافئ (American Walnut)", en: "Warm Modern (American Walnut)" },
    desc: { ar: "أخشاب جوز أمريكي طبيعية مدمجة مع حجر ترافنتينو بيج ومخمل فاخر.", en: "Natural American walnut combined with beige travertine stone and luxurious velvet." },
    specs: [
      { en: "Wood: Natural American Walnut", ar: "Wood: Natural American Walnut" },
      { en: "Stone: Beige Travertine", ar: "Stone: Beige Travertine" },
      { en: "Lighting: 2700K Ambient", ar: "Lighting: 2700K Ambient" },
    ],
    swatches: [["#5d4037", "American Walnut"], ["#d7ccc8", "Beige Travertine"], ["#bcaaa4", "Warm Linen"]],
  },
  {
    img: "/images/projects/boss-desk.jpg",
    name: { ar: "تنفيذي صناعي (Executive Matte)", en: "Executive Industrial (Matte Black)" },
    title: { ar: "تنفيذي عصري (Smoked Oak & Charcoal)", en: "Modern Executive (Smoked Oak & Charcoal)" },
    desc: { ar: "ألواح أكوستيك فحمية داكنة، أخشاب بلوط مدخن، وخطوط إضاءة ماجنتيك حادة.", en: "Dark charcoal acoustic panels, smoked oak wood and sharp magnetic lighting lines." },
    specs: [
      { en: "Panels: Matte Charcoal Acoustic", ar: "Panels: Matte Charcoal Acoustic" },
      { en: "Accents: Smoked Oak", ar: "Accents: Smoked Oak" },
      { en: "Lighting: 4000K Task Linear", ar: "Lighting: 4000K Task Linear" },
    ],
    swatches: [["#1e2126", "Charcoal Acoustic"], ["#3e2723", "Smoked Oak"], ["#90a4ae", "Brushed Steel"]],
  },
];

export function Materials({ locale, heading, stylePrefix }: { locale: "en" | "ar"; heading: string; stylePrefix: string }) {
  const [i, setI] = useState(0);
  const p = presets[i];
  return (
    <div>
      <p data-testid="mat-badge" className="mb-4 inline-flex rounded-full border border-hairline bg-paper px-4 py-1.5 text-[0.82rem]">
        {stylePrefix} {p.name[locale]}
      </p>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-4/3 overflow-hidden rounded-md border border-hairline">
          <Image key={p.img} src={p.img} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" priority />
          <div className="absolute start-3 bottom-3 flex flex-col gap-1.5" dir="ltr">
            {p.specs.map((s) => (
              <span key={s.en} className="w-fit rounded-sm border border-hairline bg-white/95 px-3 py-1 text-[0.76rem] font-semibold">{s[locale]}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-[0.95rem] font-medium">{heading}</h2>
          {presets.map((preset, index) => (
            <button
              key={preset.img}
              type="button"
              aria-pressed={i === index}
              onClick={() => setI(index)}
              className={`rounded-md border p-4 text-start ${i === index ? "border-olive bg-olive/10" : "border-hairline bg-paper"}`}
            >
              <strong className="block text-[0.95rem]">{preset.title[locale]}</strong>
              <span className="mt-1 block text-[0.82rem] text-ink-soft">{preset.desc[locale]}</span>
              <span className="mt-2 flex gap-2">
                {preset.swatches.map(([c, n]) => (
                  <span key={c} title={n} className="size-5 rounded-full border border-hairline" style={{ background: c }} />
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
