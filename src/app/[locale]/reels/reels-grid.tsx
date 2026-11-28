"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

const reels = [
  "7711057361452043541",
  "7711025198228720916",
  "7631296010379103508",
  "7627161276568931605",
  "7626809988186410261",
  "7619866596579839253",
];

export function ReelsGrid() {
  const t = useTranslations();
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reels.map((id) => (
          <li key={id} className="overflow-hidden rounded-md border border-hairline bg-paper">
            <div className="relative aspect-9/16 bg-ink/90">
              {playing === id ? (
                <iframe
                  src={`https://www.tiktok.com/player/v1/${id}?controls=1&autoplay=1&loop=0&rel=0`}
                  title={t("tiktok.title")}
                  allow="encrypted-media; fullscreen; picture-in-picture"
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(id)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-alabaster"
                  aria-label={`${t("tiktok.title")} — ${id}`}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-alabaster/15">
                    <Play size={22} aria-hidden />
                  </span>
                  <span className="text-[0.8rem] text-alabaster/80">{t("reel.kicker")}</span>
                </button>
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-3 text-[0.82rem]">
              <a
                href={`https://www.tiktok.com/@designscape_art/video/${id}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-olive hover:underline"
              >
                {t("reel.title")}
              </a>
              <span className="text-ink-soft">{t("tiktok.profile")}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <a
          href="https://www.tiktok.com/@designscape_art"
          target="_blank"
          rel="noreferrer noopener"
          className="text-[0.9rem] text-olive hover:underline"
        >
          {t("tiktok.profile")} — @designscape_art
        </a>
      </p>
    </>
  );
}
