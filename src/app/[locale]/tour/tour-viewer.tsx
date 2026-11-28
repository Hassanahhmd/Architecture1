"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function TourViewer({ locale }: { locale: string }) {
  const t = useTranslations();
  const [started, setStarted] = useState(false);
  // Same file and path the original site served, so old links to /villa-tour/ keep working.
  const rememberLang = () => {
    try {
      window.localStorage.setItem("villa-lang", locale === "ar" ? "ar" : "en");
    } catch {
      /* the bundle falls back to its own default */
    }
  };
  const tourUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/villa-tour/`;

  return (
    <div>
      <div className="overflow-hidden rounded-md border border-hairline bg-ink">
        <div className="relative aspect-16/10 w-full">
          {started ? (
            <iframe
              src={tourUrl}
              title={t("tour.title")}
              allow="fullscreen; xr-spatial-tracking"
              className="absolute inset-0 h-full w-full"
              onLoad={() => {
                try {
                  window.localStorage.setItem(
                    "villa-lang",
                    locale === "ar" ? "ar" : "en",
                  );
                } catch {
                  /* the bundle falls back to its own default */
                }
              }}
            />
          ) : (
            <div className="absolute inset-0">
              <Image
                src="/images/tour-poster.jpg"
                alt=""
                fill
                sizes="90vw"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/45 text-center text-alabaster">
                <p className="max-w-md px-6 text-[0.95rem]">
                  {t("walk.introText")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      window.localStorage.setItem(
                        "villa-lang",
                        locale === "ar" ? "ar" : "en",
                      );
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
                <a
                  href={tourUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={rememberLang}
                  className="inline-flex items-center gap-1.5 text-[0.82rem] text-alabaster underline underline-offset-4"
                >
                  <ExternalLink size={14} aria-hidden />
                  {t("walk.openFull")}
                </a>
                <p className="text-[0.75rem] text-alabaster/70">
                  {t("walk.controls")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 text-[0.85rem] text-ink-soft">
        <a
          href={tourUrl}
          target="_blank"
          rel="noopener"
          onClick={() => {
            try {
              window.localStorage.setItem(
                "villa-lang",
                locale === "ar" ? "ar" : "en",
              );
            } catch {
              /* ignore */
            }
          }}
          className="inline-flex items-center gap-1.5 text-olive underline-offset-4 hover:underline"
        >
          <ExternalLink size={15} aria-hidden />
          {t("walk.openFull")}
        </a>
      </p>
    </div>
  );
}
