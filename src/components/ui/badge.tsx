import { cn } from "@/lib/cn";

export function Badge({ children, tone = "sand" }: { children: React.ReactNode; tone?: "sand" | "olive" | "brass" | "onDark" }) {
  const tones = {
    sand: "bg-sand text-ink-soft",
    olive: "bg-olive text-alabaster",
    brass: "bg-brass text-olive-dark",
    onDark: "border border-paper/30 bg-paper/10 text-paper",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-xs px-2.5 py-1 text-[0.75rem] tracking-wide", tones[tone])}>
      {children}
    </span>
  );
}
