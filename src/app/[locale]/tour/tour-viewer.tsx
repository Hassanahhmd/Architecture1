"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2, Minimize2, Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function TourViewer({ locale }: { locale: string }) {
  const t = useTranslations();
  const [started, setStarted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const nativeFullscreen = useRef(false);

  // "Expanded" is a fixed full-viewport layer, so it works on every phone (iPhone Safari
  // cannot fullscreen a normal element). Where the browser supports the Fullscreen API
  // we also ask for real fullscreen, which hides the browser bars.
  const enter = useCallback(() => {
    setExpanded(true);
    const box = boxRef.current;
    if (box?.requestFullscreen) {
      box
        .requestFullscreen()
        .then(() => {
          nativeFullscreen.current = true;
        })
        .catch(() => {
          nativeFullscreen.current = false;
        });
    }
  }, []);

  const exit = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    nativeFullscreen.current = false;
    setExpanded(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") exit();
    };
    const onFullscreenChange = () => {
      // The user left native fullscreen (browser Esc or gesture): leave expanded mode too.
      if (nativeFullscreen.current && !document.fullscreenElement) exit();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [expanded, exit]);
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
      <div
        ref={boxRef}
        className={
          expanded
            ? "fixed inset-0 z-100 bg-ink"
            : "overflow-hidden rounded-md border border-hairline bg-ink"
        }
      >
        <div
          className={
            expanded
              ? "relative h-dvh w-full"
              : "relative h-[72dvh] min-h-[22rem] w-full md:h-auto md:aspect-16/10"
          }
        >
          <button
            ref={toggleRef}
            type="button"
            onClick={expanded ? exit : enter}
            aria-pressed={expanded}
            className="absolute bottom-3 end-3 z-10 inline-flex items-center gap-2 rounded-sm bg-alabaster/90 px-3 py-2 text-[0.8rem] font-medium text-ink shadow-sm backdrop-blur"
            style={expanded ? { bottom: "max(0.75rem, env(safe-area-inset-bottom))" } : undefined}
          >
            {expanded ? <Minimize2 size={15} aria-hidden /> : <Maximize2 size={15} aria-hidden />}
            {expanded ? t("walk.exitFullscreen") : t("walk.fullscreen")}
          </button>
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
