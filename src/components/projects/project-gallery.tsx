"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/cn";

const GalleryFullscreen = dynamic(() => import("./gallery-fullscreen"), { ssr: false });

/** Gallery viewer for a project page: one large frame, thumbnails, arrow keys
 *  (mirrored in RTL) and a full-screen view closed with Escape. Thumbnails are
 *  real links to the image, so the page still works with JavaScript disabled. */
export function ProjectGallery({
  images,
  alt,
  labels,
}: {
  images: string[];
  alt: string;
  labels: { close: string; previous: string; next: string; expand: string; thumbnails: string };
}) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const list = images.length ? images : [""];

  const step = useCallback(
    (direction: 1 | -1) => setIndex((current) => (current + direction + list.length) % list.length),
    [list.length],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const rtl = document.documentElement.dir === "rtl";
      if (event.key === "ArrowRight") step(rtl ? -1 : 1);
      if (event.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <div>
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-sand">
        <Image
          src={list[index]}
          alt={`${alt} ${index + 1}`}
          fill
          sizes="(min-width: 1024px) 60vw, 92vw"
          className="object-contain"
          priority={index === 0}
        />
        <button
          ref={opener}
          type="button"
          onClick={() => setExpanded(true)}
          aria-label={labels.expand}
          className="absolute end-3 top-3 rounded-xs bg-alabaster/90 p-2 text-ink"
        >
          <Expand size={16} aria-hidden />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button type="button" onClick={() => step(-1)} aria-label={labels.previous} className="rounded-sm border border-hairline p-2">
          <ChevronLeft size={18} className="rtl:-scale-x-100" aria-hidden />
        </button>
        <ul aria-label={labels.thumbnails} className="flex flex-1 gap-2 overflow-x-auto">
          {list.map((src, i) => (
            <li key={src + i} className="shrink-0">
              <a
                href={src}
                onClick={(event) => {
                  event.preventDefault();
                  setIndex(i);
                }}
                aria-current={i === index}
                aria-label={`${alt} ${i + 1}`}
                className={cn(
                  "relative block h-14 w-20 overflow-hidden rounded-xs border",
                  i === index ? "border-olive" : "border-hairline",
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </a>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => step(1)} aria-label={labels.next} className="rounded-sm border border-hairline p-2">
          <ChevronRight size={18} className="rtl:-scale-x-100" aria-hidden />
        </button>
      </div>

      {expanded && (
        <GalleryFullscreen
          list={list}
          index={index}
          alt={alt}
          labels={labels}
          step={step}
          onClose={() => setExpanded(false)}
          opener={opener}
        />
      )}
    </div>
  );
}
