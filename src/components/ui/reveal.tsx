"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Fades and lifts its children once, when they first enter the viewport.
 *  Only transform and opacity animate; reduced motion is handled in globals.css. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // null means "no animation applied yet": the server HTML stays visible, so the
  // page is complete without JavaScript. The observer only hides below-fold
  // content once it knows it can reveal it again.
  const [shown, setShown] = useState<boolean | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setShown(true);
      return;
    }
    setShown(false);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] motion-reduce:transition-none",
        shown === null ? "" : shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
