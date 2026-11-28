"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export function Panorama({ rooms }: { rooms: { src: string; label: string }[] }) {
  const t = useTranslations();
  const [room, setRoom] = useState(0);
  const [auto, setAuto] = useState(false);
  const [offset, setOffset] = useState(0);
  const dragging = useRef<{ x: number; start: number } | null>(null);
  const frame = useRef<number | null>(null);
  const viewport = useRef<HTMLDivElement | null>(null);
  const strip = useRef<HTMLDivElement | null>(null);
  const [loopWidth, setLoopWidth] = useState(1600);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Measure the real width of one image so the second copy joins it exactly.
  useEffect(() => {
    const node = strip.current?.firstElementChild as HTMLElement | null;
    if (!node || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => setLoopWidth(node.offsetWidth || 1600));
    observer.observe(node);
    return () => observer.disconnect();
  }, [room]);

  // Animate only while on screen.
  useEffect(() => {
    const node = viewport.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const rotating = auto && visible && !reduced;
  useEffect(() => {
    if (!rotating) return;
    const tick = () => {
      setOffset((value) => value - 0.6);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [rotating]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {rooms.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => {
              setRoom(index);
              setOffset(0);
            }}
            aria-pressed={room === index}
            className={`rounded-xs border px-3 py-1.5 text-[0.84rem] ${
              room === index ? "border-olive bg-olive text-alabaster" : "border-hairline text-ink-soft"
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setAuto((value) => !value)}
          aria-pressed={auto && !reduced}
          disabled={reduced}
          className="rounded-xs border border-hairline px-3 py-1.5 text-[0.84rem] text-ink-soft"
        >
          {t("lab.auto_rotate")}
        </button>
        <button
          type="button"
          onClick={() => setOffset(0)}
          className="rounded-xs border border-hairline px-3 py-1.5 text-[0.84rem] text-ink-soft"
        >
          {t("lab.reset")}
        </button>
      </div>
      <div
        ref={viewport}
        className="relative aspect-16/9 cursor-grab touch-pan-y select-none overflow-hidden rounded-md border border-hairline bg-ink active:cursor-grabbing"
        onPointerDown={(event) => {
          dragging.current = { x: event.clientX, start: offset };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragging.current) return;
          setOffset(dragging.current.start + (event.clientX - dragging.current.x));
        }}
        onPointerUp={() => {
          dragging.current = null;
        }}
        onPointerCancel={() => {
          dragging.current = null;
        }}
      >
        <div
          ref={strip}
          className="absolute inset-y-0 flex"
          style={{ transform: `translate3d(${-((((-offset) % loopWidth) + loopWidth) % loopWidth)}px, 0, 0)` }}
        >
          <div className="relative h-full w-[1600px] shrink-0">
            <Image src={rooms[room].src} alt={rooms[room].label} fill sizes="1600px" className="object-cover" draggable={false} />
          </div>
          <div className="relative h-full w-[1600px] shrink-0">
            <Image src={rooms[room].src} alt="" fill sizes="1600px" className="object-cover" draggable={false} />
          </div>
        </div>
        <p className="pointer-events-none absolute bottom-3 start-3 rounded-xs bg-ink/60 px-2 py-1 text-[0.72rem] text-alabaster">
          {t("light.illustrative")}
        </p>
      </div>
      <p className="mt-2 text-[0.8rem] text-ink-soft">{t("tour.drag_hint")}</p>
    </div>
  );
}
