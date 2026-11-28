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
  tone?: "alabaster" | "paper" | "sand";
}) {
  const tones = { alabaster: "bg-alabaster", paper: "bg-paper", sand: "bg-sand" } as const;
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
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
}) {
  return (
    <header className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {tag ? <p className="mb-3 text-[0.8rem] tracking-[0.18em] text-brass-ink uppercase">{tag}</p> : null}
      <h2 className="text-[length:var(--text-step-3)] font-semibold text-ink">{title}</h2>
      {subtitle ? <p className="mt-4 text-[length:var(--text-step-0)] text-ink-soft">{subtitle}</p> : null}
    </header>
  );
}
