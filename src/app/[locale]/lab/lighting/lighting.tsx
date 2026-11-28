"use client";

import Image from "next/image";
import { useState } from "react";
import { Moon, Sunrise, Sunset } from "lucide-react";

const icons = { morning: Sunrise, sunset: Sunset, night: Moon } as const;

type Mode = "morning" | "sunset" | "night";

const modes: { key: Mode; time: string; temp: { en: string; ar: string }; angle: { en: string; ar: string }; shadow: { en: string; ar: string } }[] = [
  { key: "morning", time: "09:00 AM", temp: { en: "5500K (Daylight)", ar: "5500K (ضوء النهار)" }, angle: { en: "45° East", ar: "45° شرقاً" }, shadow: { en: "Crisp / Natural", ar: "حادة / طبيعية" } },
  { key: "sunset", time: "05:30 PM", temp: { en: "3200K (Golden Glow)", ar: "3200K (وهج ذهبي)" }, angle: { en: "18° West", ar: "18° غرباً" }, shadow: { en: "Long / Dramatic", ar: "طويلة / درامية" } },
  { key: "night", time: "09:00 PM", temp: { en: "2700K (Warm LED)", ar: "2700K (LED دافئ)" }, angle: { en: "Cove & Accent", ar: "كوف وإضاءة موجهة" }, shadow: { en: "Soft Ambient", ar: "ناعمة محيطة" } },
];

const filters: Record<Mode, string> = {
  morning: "brightness(1.08) contrast(1.06) saturate(1.1)",
  sunset: "brightness(0.96) contrast(1.18) sepia(0.38) saturate(1.45) hue-rotate(-15deg)",
  night: "brightness(0.55) contrast(1.45) saturate(0.85) hue-rotate(210deg)",
};
const overlays: Record<Mode, string> = {
  morning: "linear-gradient(135deg, rgba(255,240,190,0.18) 0%, transparent 60%)",
  sunset: "linear-gradient(180deg, rgba(255,100,30,0.28) 0%, rgba(240,160,40,0.18) 60%, rgba(35,10,0,0.45) 100%)",
  night: "radial-gradient(circle at 50% 60%, rgba(255,200,100,0.22) 0%, rgba(10,15,25,0.82) 80%)",
};

export function Lighting({ locale, labels, hud }: { locale: "en" | "ar"; labels: Record<Mode, string>; hud: { temp: string; angle: string; shadow: string; illustrative: string } }) {
  const [mode, setMode] = useState<Mode>("morning");
  const current = modes.find((m) => m.key === mode)!;
  return (
    <div>
      <p data-testid="light-badge" className="mb-4 inline-flex rounded-full border border-hairline bg-paper px-4 py-1.5 text-[0.82rem]" dir="auto">
        <span className="inline-flex items-center gap-2">{(() => { const I = icons[mode]; return <I size={15} aria-hidden />; })()}{current.time} — {labels[mode]}</span>
      </p>
      <div className="relative aspect-16/10 overflow-hidden rounded-md border border-hairline bg-ink/90">
        <Image
          src="/images/projects/facade.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-contain transition-[filter] duration-700"
          style={{ filter: filters[mode] }}
        />
        <div className="pointer-events-none absolute inset-0 transition-all duration-700" style={{ background: overlays[mode] }} />
        <div className="absolute start-3 bottom-3 flex flex-wrap gap-x-5 gap-y-1 rounded-sm border border-hairline bg-white/95 px-4 py-2 text-[0.78rem]">
          <span>{hud.temp}: <strong>{current.temp[locale]}</strong></span>
          <span>{hud.angle}: <strong>{current.angle[locale]}</strong></span>
          <span>{hud.shadow}: <strong>{current.shadow[locale]}</strong></span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            aria-pressed={mode === m.key}
            onClick={() => setMode(m.key)}
            className={`flex flex-col items-center gap-1 rounded-md border px-3 py-3 text-[0.86rem] ${mode === m.key ? "border-orange bg-orange text-olive-dark" : "border-hairline bg-paper text-ink-soft"}`}
          >
            {(() => { const I = icons[m.key]; return <I size={18} aria-hidden />; })()}
            <span className="font-medium">{labels[m.key]}</span>
            <span className="text-[0.75rem]" dir="ltr">{m.time}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-[0.78rem] text-ink-soft">{hud.illustrative}</p>
    </div>
  );
}
