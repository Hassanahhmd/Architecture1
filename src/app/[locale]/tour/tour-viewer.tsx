"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function TourViewer({ locale }: { locale: string }) {
  const t = useTranslations();
  const [started, setStarted] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-ink">
      <div className="relative aspect-16/10 w-full">
        {started ? (
          <iframe
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/tour/index.html`}
            title={t("tour.title")}
            allow="fullscreen; xr-spatial-tracking"
            className="absolute inset-0 h-full w-full"
            onLoad={() => {
              try {
                window.localStorage.setItem("villa-lang", locale === "ar" ? "ar" : "en");
              } catch {
                /* the bundle falls back to its own default */
              }
            }}
          />
        ) : (
          <div className="absolute inset-0">
            <Image src="/images/tour-poster.jpg" alt="" fill sizes="90vw" className="object-cover opacity-90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/45 text-center text-alabaster">
              <p className="max-w-md px-6 text-[0.95rem]">{t("walk.introText")}</p>
              <button
                type="button"
                onClick={() => {
                  try {
                    window.localStorage.setItem("villa-lang", locale === "ar" ? "ar" : "en");
                  } catch {
                    /* ignore */
                  }
                  setStarted(true);
                }}
                className="inline-flex items-center gap-2 rounded-sm bg-alabaster px-5 py-3 text-[0.9rem] font-medium text-ink"
              >
                <Play size={17} aria-hidden />
                {t("walk.start")}
              </button>
              <p className="text-[0.75rem] text-alabaster/70">{t("walk.controls")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
