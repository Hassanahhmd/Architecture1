import { cn } from "@/lib/cn";

export function Section({
  id,
  children,
  className,
  tone = "alabaster",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "alabaster" | "paper" | "sand" | "olive" | "orange";
}) {
  const tones = { alabaster: "bg-alabaster", paper: "bg-paper", sand: "bg-sand", olive: "bg-olive-dark text-paper", orange: "bg-orange text-olive-dark" } as const;
  return (
    <section id={id} className={cn("scroll-mt-24 px-5 py-16 md:px-10 md:py-24", tones[tone], className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  tag,
  title,
  subtitle,
  align = "start",
  invert = false,
  dark = false,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  invert?: boolean;
  dark?: boolean;
}) {
  return (
    <header className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {tag ? (
        <p
          className={cn(
            "mb-4 inline-block rounded-full border px-3 py-1 text-[0.76rem] tracking-[0.16em] uppercase",
            dark ? "border-orange bg-orange font-medium text-olive-dark" : invert ? "border-olive-dark/50 bg-transparent font-medium text-olive-dark" : "border-orange/40 bg-orange/15 text-brass-ink",
          )}
        >
          {tag}
        </p>
      ) : null}
      <h2 className={cn("text-[length:var(--text-step-3)] font-semibold", dark ? "text-paper" : invert ? "text-olive-dark" : "text-ink")}>{title}</h2>
      {subtitle ? <p className={cn("mt-4 text-[length:var(--text-step-0)]", dark ? "text-paper/85" : invert ? "text-olive-dark" : "text-ink-soft")}>{subtitle}</p> : null}
    </header>
  );
}
